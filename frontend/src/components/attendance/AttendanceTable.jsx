
import { format, parseISO } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "../common/card";
import { Badge } from "../common/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../common/table";
import { statusVariant } from "../../utils/attendanceHelpers";

const safeFormat = (dateStr, fmt) => {
  try {
    return format(parseISO(dateStr), fmt);
  } catch {
    return "--";
  }
};

export function AttendanceTable({ records = [] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent history</CardTitle>
        <p className="text-xs text-gray-400">{records.length} records found</p>
      </CardHeader>

      <CardContent className="max-h-96 overflow-auto">
        {records.length === 0 ? (
          <p className="text-sm text-gray-400 py-4 text-center">
            No attendance records yet.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Check in</TableHead>
                <TableHead>Check out</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {records.map((record) => (
                <TableRow key={record._id ?? record.id}>
                  <TableCell>
                    {safeFormat(record.date, "dd MMM yyyy")}
                  </TableCell>

                  <TableCell>
                    <Badge variant={statusVariant(record.status)}>
                      {record.status?.toUpperCase() ?? "UNKNOWN"}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {record.checkInTime
                      ? safeFormat(record.checkInTime, "hh:mm a")
                      : "--"}
                  </TableCell>

                  <TableCell>
                    {record.checkOutTime
                      ? safeFormat(record.checkOutTime, "hh:mm a")
                      : "--"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
