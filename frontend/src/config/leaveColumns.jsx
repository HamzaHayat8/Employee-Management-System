import { getStatusStyles } from "../utils/leaveUtils";

export const LEAVE_COLUMNS = [
  {
    header: "From",
    key: "from",
    showFor: ["admin"],
    render: (row) => row.duration.from,
  },
  {
    header: "Type",
    key: "type",
    showFor: ["admin", "employee"],
  },
  {
    header: "Dates",
    key: "dates",
    showFor: ["admin", "employee"],
    render: (row) => `${row.duration.from} - ${row.duration.to}`,
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
      <span className={getStatusStyles(row.status)}>
        {row.status}
      </span>
    ),
  },
];