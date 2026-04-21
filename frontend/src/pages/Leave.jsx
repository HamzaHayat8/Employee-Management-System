import React, { useEffect, useMemo } from "react";

import { getTotalDays } from "../utils/leaveUtils";
import MainTable from "../components/LeaveComp/LeaveTable";
import LeaveCards from "../components/LeaveComp/LeaveCards";
import { AddLeaveDialog } from "../components/LeaveComp/AddLeaveDialog";
import {
  useGetAllLeavesQuery,
  useGetemployeeLeavesQuery,
} from "../services/leave/leave.api";
import { useSelector } from "react-redux";
import Loader from "../components/common/Loading";

function Leave() {
  const getrole = useSelector((state) => state.auth.user?.role);
  const isAdmin = getrole === "admin";

  const { data: allLeaves, isLoading } = useGetAllLeavesQuery(undefined, {
    skip: !isAdmin,
  });

  const { data: leaveData, isLoading: leaveLoading } =
    useGetemployeeLeavesQuery(undefined, {
      skip: isAdmin,
    });

  const leaves = isAdmin ? allLeaves?.leaves : leaveData?.leaves;

  const totalDays = (leaves || []).reduce((total, leave) => {
    return total + getTotalDays(leave.createdAt, leave.endDate);
  }, 0);

  const sickleave = leaves?.filter((leave) => leave.type === "sick");
  const casualleave = leaves?.filter((leave) => leave.type === "casual");
  const annualleave = leaves?.filter((leave) => leave.type === "annual");
  const pendingLeaves = leaves?.filter((leave) => leave.status === "pending");
  const allLeave = leaves?.length || 0;
  const approvedLeaves = leaves?.filter(
    (leave) => leave.status === "approved",
  ).length;

  if (isLoading || leaveLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-medium">Leave Management</h1>
          <p className="text-xs text-zinc-600">
            {isAdmin
              ? "All employee leave records"
              : "Your leave history and requests"}
          </p>
        </div>

        {isAdmin ? null : <AddLeaveDialog />}
      </div>

      <LeaveCards
        totalDays={totalDays}
        sickleave={sickleave}
        casualleave={casualleave}
        annualleave={annualleave}
        pendingLeaves={pendingLeaves}
        allLeave={allLeave}
        role={getrole}
        approvedLeaves={approvedLeaves}
      />

      <MainTable data={leaves} role={getrole} />
    </div>
  );
}

export default Leave;
