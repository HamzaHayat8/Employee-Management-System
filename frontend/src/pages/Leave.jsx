import React, { useMemo } from "react";
import { leaveData, userdata } from "../assets/data";

import { getTotalDays } from "../utils/leaveUtils";
import MainTable from "../components/LeaveComp/LeaveTable";
import LeaveCards from "../components/LeaveComp/LeaveCards";
import { AddLeaveDialog } from "../components/LeaveComp/AddLeaveDialog";

function Leave() {
  const user = userdata.find((u) => u.id === 1);
  const userRole = user?.role || "employee";

  const totalDays = useMemo(() => {
    return leaveData.reduce(
      (total, row) => total + getTotalDays(row.duration.from, row.duration.to),
      0,
    );
  }, []);

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-medium">Leave Management</h1>
          <p className="text-xs text-zinc-600">
            Your leave history and requests
          </p>
        </div>

        <AddLeaveDialog />
      </div>

      {/* Cards */}
      <LeaveCards totalDays={totalDays} />

      {/* Table */}
      <MainTable data={leaveData} role={userRole} />
    </div>
  );
}

export default Leave;
