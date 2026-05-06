
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Card, CardContent, CardHeader, CardTitle } from "../common/card";
import { getTileClassName } from "../../utils/attendanceHelpers";

export function AttendanceCalendar({ records = [] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance calendar</CardTitle>

        {/* Legend */}
        <div className="flex gap-4 mt-2">
          {[
            { label: "Present", cls: "bg-green-500" },
            { label: "Late",    cls: "bg-yellow-400" },
            { label: "Absent",  cls: "bg-red-400" },
          ].map(({ label, cls }) => (
            <span key={label} className="flex items-center gap-1 text-xs text-gray-500">
              <span className={`inline-block w-2.5 h-2.5 rounded-full ${cls}`} />
              {label}
            </span>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        <Calendar
          tileClassName={({ date }) => getTileClassName(records, date)}
        />
      </CardContent>
    </Card>
  );
}
