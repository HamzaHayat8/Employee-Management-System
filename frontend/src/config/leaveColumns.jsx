import { getStatusStyles } from "../utils/leaveUtils";

export const LEAVE_COLUMNS = [
  {
    header: "Employee",
    key: "first_name",
    showFor: ["admin"],
    render: (row) => row.employeeId?.first_name || "N/A",
  },
  {
    header: "Type",
    key: "type",
    showFor: ["admin", "employee"],
  },
  {
    header: "Leave Duration",
    key: "leaveDuration",
    showFor: ["employee", "admin"],
    render: (row) => {
      const start = new Date(row.createdAt).toLocaleDateString();
      const end = new Date(row.endDate).toLocaleDateString();

      return (
        <div className="flex flex-col">
          <span>Start: {start}</span>
          <span>End: {end}</span>
        </div>
      );
    },
  },
  {
    header: "Reason",
    key: "reason",
    showFor: ["admin", "employee"],
  },
  {
    header: "Status",
    key: "status",
    showFor: ["admin", "employee"],
    render: (row) => (
      <span className={getStatusStyles(row.status)}>{row.status}</span>
    ),
  },
  {
    header: "Action",
    key: "action",
    showFor: ["admin"],
  },
];
