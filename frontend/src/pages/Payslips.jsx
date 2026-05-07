import React from "react";
import { formatCurrency } from "../utils/formatCurrency";
import EmptyState from "../components/LeaveComp/EmptyState";
import { Button } from "../components/common/button";
import { Generatepayslip } from "../components/payslip/Generatepayslip";
import {
  useGetAllPayslipsQuery,
  useGetPayslipQuery,
} from "../services/payslip/payslip.api";
import { useSelector } from "react-redux";
import {  Link } from "react-router-dom";
import { getPayslipAmount } from "../utils/PayslipAmount";

const TABLE_COLUMNS = [
  {
    header: "Name",
    key: "name",
    showFor: ["admin"],
    render: (row) => `${row.employeeId?.first_name}`,
  },
  { header: "Period", key: "period", showFor: ["admin", "employee"] },

  {
    header: "Basic Salary",
    key: "basicSalary",
    showFor: ["admin", "employee"],
  },

  {
    header: "Net Salary",
    key: "netSalary",
    render: (row) => getPayslipAmount(row),
    showFor: ["admin", "employee"],
  },

  { header: "Action", key: "action", showFor: ["admin", "employee"] },
];

function Payslips() {
  const [month, setMonth] = React.useState("");
  // const { data: employee } = useGetbyIdQuery();

  const userRole = useSelector((state) => state.auth.user.role);

  // ✅ Conditional API Calls
  const { data: employeePayslips, isLoading: empLoading } = useGetPayslipQuery(
    undefined,
    {
      skip: userRole !== "employee",
    },
  );

  const { data: allPayslips, isLoading: adminLoading } = useGetAllPayslipsQuery(
    undefined,
    {
      skip: userRole !== "admin",
    },
  );

  // ✅ Normalize Data
  const payslips =
    userRole === "admin"
      ? allPayslips?.payslips || []
      : employeePayslips?.payslips || [];

  const isLoading = empLoading || adminLoading;

  // ✅ Filter Months
  const months = [...new Set(payslips.map((p) => p.month + " " + p.year))];

  const filteredPayslips = month
    ? payslips.filter((p) => p.month + " " + p.year === month)
    : payslips;

  const visibleColumns = TABLE_COLUMNS.filter((col) =>
    col.showFor.includes(userRole),
  );

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-medium tracking-tight">Payslips</h1>
          <p className="text-zinc-600 text-[12px]">
            {userRole === "admin"
              ? "All employees payslips"
              : "Your payslip history"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm"
          >
            <option value="">All</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          {/* ✅ Only admin can generate */}
          {userRole === "admin" && <Generatepayslip />}
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-hidden mt-6 rounded-lg border shadow-sm">
        <table className="w-full text-left bg-white">
          <thead className="bg-gray-50">
            <tr>
              {visibleColumns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-4 text-xs font-bold text-slate-500 uppercase"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y">
            {isLoading ? (
              <tr>
                <td
                  colSpan={visibleColumns.length}
                  className="text-center py-6"
                >
                  Loading...
                </td>
              </tr>
            ) : filteredPayslips.length ? (
              filteredPayslips.map((row) => (
                <tr key={row.id}>
                  {visibleColumns.map((col) => {
                    let value;

                    // ✅ Use render if exists
                    if (col.render) {
                      value = col.render(row);
                    }
                    // ✅ Default fields
                    else if (col.key === "period") {
                      value = `${row.month} ${row.year}`;
                    } else if (col.key === "basicSalary") {
                      value = formatCurrency(Number(row.basicSalary));
                    } else if (col.key === "action") {
                      value = (
                        <Button variant="link">
                          <Link
                            to={`/payroll/print/${row._id}`}
                            target="_blank"
                          >
                            Download
                          </Link>
                        </Button>
                      );
                    } else {
                      value = row[col.key];
                    }
                    return (
                      <td key={col.key} className="px-6 py-4 text-sm">
                        {/* Format currency for numbers */}
                        {col.key === "netSalary"
                          ? formatCurrency(Number(value))
                          : value}
                      </td>
                    );
                  })}
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
