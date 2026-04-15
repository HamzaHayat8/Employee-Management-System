import React from "react";
import { LEAVE_COLUMNS } from "../../config/leaveColumns";
import EmptyState from "./EmptyState";

function LeaveTable({ data, role }) {
  const visibleColumns = LEAVE_COLUMNS.filter((col) =>
    col.showFor.includes(role),
  );

  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200 shadow-sm">
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

        <tbody className="divide-y divide-gray-100">
          {data.length ? (
            data.map((row) => (
              <tr key={row.id}>
                {visibleColumns.map((col) => (
                  <td key={col.key} className="px-6 py-4 text-sm text-gray-600">
                    {col.render ? col.render(row) : row[col.key]}
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
  );
}

export default LeaveTable;
