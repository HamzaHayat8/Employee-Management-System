
import { format, parseISO } from "date-fns";
import { Card, CardContent } from "../common/card";


export function TodayStatus({ todayStatus }) {
  if (!todayStatus) return null;

  const checkInFormatted = format(parseISO(todayStatus.checkInTime), "hh:mm a");
  const checkOutFormatted = todayStatus.checkOutTime
    ? format(parseISO(todayStatus.checkOutTime), "hh:mm a")
    : null;

  return (
    <Card className="border-green-500 bg-green-50">
      <CardContent className="pt-4 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <p className="text-green-700 font-semibold text-sm">
            ✅ Checked in today at {checkInFormatted}
          </p>

          {checkOutFormatted ? (
            <p className="text-green-600 text-sm">
              Checked out at {checkOutFormatted}
            </p>
          ) : (
            <p className="text-yellow-600 text-sm">Not yet checked out</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
