
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import {
  useCheckInMutation,
  useCheckOutMutation,
} from "../services/attendance/attendanceApi";
import { getCurrentLocation } from "../utils/geolocation";

export function useAttendanceActions(onSuccess) {
  const [checkIn, { isLoading: checkInLoading }] = useCheckInMutation();
  const [checkOut, { isLoading: checkOutLoading }] = useCheckOutMutation();

  const handleCheckIn = useCallback(
    async (faceDescriptor) => {
      if (!faceDescriptor) {
        toast.error("Please capture your face before checking in.");
        return;
      }

      try {
        const location = await getCurrentLocation();

        await checkIn({
          latitude: location.latitude,
          longitude: location.longitude,
          faceDescriptor,
        }).unwrap();

        toast.success("Checked in successfully!");
        onSuccess?.();
      } catch (err) {
        toast.error(err?.data?.message || "Check-in failed. Please try again.");
      }
    },
    [checkIn, onSuccess]
  );

  const handleCheckOut = useCallback(async () => {
    try {
      await checkOut({}).unwrap();
      toast.success("Checked out successfully!");
      onSuccess?.();
    } catch (err) {
      toast.error(err?.data?.message || "Check-out failed. Please try again.");
    }
  }, [checkOut, onSuccess]);

  return {
    handleCheckIn,
    handleCheckOut,
    checkInLoading,
    checkOutLoading,
  };
}
