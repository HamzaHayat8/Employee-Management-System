import Time_Tracking from "../../components/dashboard/employeeDashboard/Time_Tracking";
import Cards from "../../components/common/cards";
import React from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { FaRegCalendar, FaRegClipboard } from "react-icons/fa6";
import { LiaTasksSolid } from "react-icons/lia";
import MyTaks from "../../components/dashboard/employeeDashboard/MyTaks";
import Quick_Stats from "../../components/dashboard/employeeDashboard/Quick_Stats";
import { useGetMyAttendanceQuery } from "../../services/attendance/attendanceApi";
import { useGetEmployeeTasksQuery } from "../../services/taskes/task.api";
import { useGetemployeeLeavesQuery } from "../../services/leave/leave.api";
import { useGetPayslipQuery } from "../../services/payslip/payslip.api";
import { getPayslipAmount } from "../../utils/PayslipAmount";

function EmployeeDashboard({ data }) {
  const {
    data: attendanceHistory,
    isLoading: historyLoading,
    refetch,
  } = useGetMyAttendanceQuery();
  const { data: employeeTasks } = useGetEmployeeTasksQuery();
  const { data: employeeLeaves } = useGetemployeeLeavesQuery();
  const { data: latestPayslip } = useGetPayslipQuery();

  // Attendance summary
  const filteredPresentDays = attendanceHistory?.data.filter(
    (record) => record.status === "present" || record.status === "late",
  ).length;
  // Attendance summary

  // Tasks summary
  const [tasks, setTasks] = React.useState([]);
  const [leave, setLeave] = React.useState([]);
  const [checkedIn, setCheckedIn] = React.useState([]);

  React.useEffect(() => {
    if (employeeTasks?.tasks) {
      setTasks(employeeTasks.tasks);
    }
    if (employeeLeaves?.leaves) {
      setLeave(employeeLeaves.leaves);
    }
    if (attendanceHistory?.data) {
      setCheckedIn(attendanceHistory.data);
    }
  }, [employeeTasks, employeeLeaves, attendanceHistory]);

  const filteredActiveTasks = employeeTasks?.tasks.filter(
    (task) => task.status === "in-progress",
  ).length;
  // Tasks summary

  // Leaves summary
  const filteredPendingLeaves = employeeLeaves?.leaves.filter(
    (leave) => leave.status === "pending",
  ).length;
  // Leaves summary

  // Latest Payslip summary
  const latestPayslipAmount = getPayslipAmount(latestPayslip?.payslips[0]);
  // Latest Payslip summary

  // console.log("Latest  attendanceHistory:", attendanceHistory);

  const Carddata = [
    {
      id: 1,
      name: "Days Present",
      number: filteredPresentDays ?? 0,
      icon: <FaRegCalendar />,
    },
    {
      id: 2,
      name: "Active Tasks",
      number: filteredActiveTasks ?? 0,
      icon: <LiaTasksSolid />,
    },
    {
      id: 3,
      name: "Pending Leaves",
      number: filteredPendingLeaves ?? 0,
      icon: <FaRegClipboard />,
    },
    {
      id: 4,
      name: "Latest Payslip",
      number: `$${latestPayslipAmount.toLocaleString()}`,
      icon: <BsCurrencyDollar />,
    },
  ];

  return (
    <div className="w-ful">
      <h1 className="text-xl font-medium tracking-tight">
        Welcome, {data?.first_name} {data?.last_name} !
      </h1>
      <p className="text-zinc-600 text-[12px]">{data?.position}</p>

      {/* Cards */}
      <div className="grid grid-cols-4 gap-4 mt-6 w-full">
        <Cards Carddata={Carddata} />
      </div>

      {/* Task section */}
      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 space-y-8">
            {/* My Tasks */}
            <MyTaks tasks={tasks} />
            {/* My Tasks */}

            {/* Time Tracking */}
            <Time_Tracking checkedIn={checkedIn} />
            {/* Time Tracking */}
          </div>

          {/* Quick Stats */}
          <Quick_Stats tasks={tasks} leaves={leave} checkedIn={checkedIn} />
          {/* Quick Stats */}
        </div>
      </div>
      {/* Task section */}
    </div>
  );
}

export default EmployeeDashboard;
