import { format } from "date-fns";
import { Button } from "../common/button";

export function AttendanceActions({
  onCheckIn,
  onCheckOut,
  checkInLoading,
  checkOutLoading,
  faceDescriptor,
}) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-xl font-semibold">My attendance</h1>
        <p className="text-sm text-gray-500">
          {format(new Date(), "EEEE, MMMM dd, yyyy")}
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          onClick={onCheckIn}
          disabled={checkInLoading || !faceDescriptor}
          className="bg-green-600 hover:bg-green-700 disabled:opacity-50"
        >
          {checkInLoading ? "Checking in…" : "Check in"}
        </Button>

        <Button
          onClick={onCheckOut}
          disabled={checkOutLoading}
          className="bg-red-600 hover:bg-red-700 disabled:opacity-50"
        >
          {checkOutLoading ? "Checking out…" : "Check out"}
        </Button>
      </div>
    </div>
  );
}
