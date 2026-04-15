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

export function AddLeaveDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-6 py-3  bg-[#4831E2] hover:bg-[#4831E2]/90 flex items-center gap-2">
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

        <form className="space-y-4">
          <FieldGroup>
            <Field>
              <Label>Leave Type</Label>
              <select
                name="leaveType"
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
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
                <Input type="date" name="fromDate" />
                <Input type="date" name="toDate" />
              </div>
            </Field>

            <Field>
              <Label>Reason</Label>
              <textarea
                rows={3}
                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-gray-300"
              />
            </Field>
          </FieldGroup>

          <DialogFooter className="flex">
            <DialogClose asChild>
              <Button variant="outline" className="w-36">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" className="w-1/2 bg-[#4831E2]">
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
