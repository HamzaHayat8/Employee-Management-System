import React from "react";
import { userdata, payslipData } from "../assets/data";
import { formatCurrency } from "../utils/formatCurrency";
import EmptyState from "../components/LeaveComp/EmptyState";
import { Button } from "../components/common/button";

const TABLE_COLUMNS = [
  { header: "Period", key: "period", showFor: ["admin", "employee"] },
  {
    header: "Basic Salary",
    key: "basicSalary",
    showFor: ["admin", "employee"],
  },
  { header: "Net Salary", key: "netSalary", showFor: ["admin", "employee"] },
  { header: "Action", key: "action", showFor: ["admin", "employee"] },
];

function Payslips() {
  const [month, setMonth] = React.useState(null);

  const user = userdata.find((u) => u.id === 1);
  const userRole = user?.role || "employee";

  const visibleColumns = TABLE_COLUMNS.filter((col) =>
    col.showFor.includes(userRole),
  );

  const months = [...new Set(payslipData.map((p) => p.period))].sort(
    (a, b) => new Date(a) - new Date(b),
  );

  const filteredPayslips = month
    ? payslipData.filter((p) => p.period === month)
    : payslipData;


  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-medium tracking-tight">Payslips</h1>
          <p className="text-zinc-600 text-[12px]">Your payslip history</p>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="month" className="text-sm font-medium text-gray-600">
            Filter by month
          </label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border  rounded-md px-3 py-2 text-sm"
          >
            <option value="">All</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-hidden mt-6 rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full text-left border-collapse bg-white">
          {/* Table Head */}
          <thead className="bg-gray-50">
            <tr>
              {visibleColumns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-4 text-xs font-bold tracking-wider text-slate-500 uppercase"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-100">
            {filteredPayslips.length ? (
              filteredPayslips.map((row) => (
                <tr key={row.id}>
                  {visibleColumns.map((col) => (
                    <td
                      key={col.key}
                      className="px-6 py-4 text-sm text-gray-500"
                    >
                      {col.key === "basicSalary" || col.key === "netSalary"
                        ? formatCurrency(row[col.key])
                        : row[col.key]}

                      {col.key === "action" && (
                        <Button variant="link" className="text-primary">
                          Download
                        </Button>
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <EmptyState colSpan={visibleColumns.length} />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Payslips;
