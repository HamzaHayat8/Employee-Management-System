import { IoIosAddCircle } from "react-icons/io";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "../common/dialog";

import { Field, FieldGroup } from "../common/field";
import { Input } from "../common/input";
import { Label } from "../common/label";
import { Button } from "../common/button";
import { FaRegCalendar } from "react-icons/fa";
import { useAddLeaveMutation } from "../../services/leave/leave.api";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export function AddLeaveDialog() {
  const [addLeave, { isLoading }] = useAddLeaveMutation();

  const [formData, setFormData] = useState({
    type: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addLeave(formData).unwrap();

      toast.success("Leave applied successfully");

      // optional: reset form
      setFormData({
        type: "",
        startDate: "",
        endDate: "",
        reason: "",
      });
    } catch (err) {
      toast.error(err?.data?.message || "Failed to apply leave ❌");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-6 py-3 bg-[#4831E2] flex items-center gap-2">
          <IoIosAddCircle />
          Add Leave
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Apply for Leave</DialogTitle>
          <DialogDescription>
            Submit your leave request for approval
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <Label>Leave Type</Label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              >
                <option value="">Select leave type</option>
                <option value="sick">Sick Leave</option>
                <option value="casual">Casual Leave</option>
                <option value="annual">Annual Leave</option>
              </select>
            </Field>

            <Field>
              <Label className="flex items-center gap-2">
                <FaRegCalendar />
                Duration
              </Label>

              <div className="flex gap-3">
                <Input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                />
                <Input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </div>
            </Field>

            <Field>
              <Label>Reason</Label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                rows={3}
                className="w-full border rounded-md p-2"
              />
            </Field>
          </FieldGroup>

          <DialogFooter className="flex">
            <DialogClose asChild>
              <Button variant="outline" className="w-36">
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="submit"
              className="w-1/2 bg-[#4831E2]"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
