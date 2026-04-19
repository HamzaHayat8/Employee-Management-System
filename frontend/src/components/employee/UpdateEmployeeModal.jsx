import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../common/dialog";
import { Button } from "../common/button";
import { Input } from "../common/input";
import { Label } from "../common/label";
import { Textarea } from "../common/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../common/select";

import { toast } from "react-hot-toast";
import { useUpdateEmployeeMutation } from "../../services/employees/employee.api";

export function UpdateEmployeeModal({ openupdate, setOpenUpdate, employee }) {
  const [updateEmployee, { isLoading }] = useUpdateEmployeeMutation();

  const [data, setData] = React.useState({
    first_name: "",
    last_name: "",
    phone: "",
    joining_date: "",
    bio: "",
    department: "",
    position: "",
    basic_salary: "",
    allowances: "",
    deductions: "",
    email: "",
    role: "",
  });

  React.useEffect(() => {
    if (employee) {
      setData({
        first_name: employee.first_name || "",
        last_name: employee.last_name || "",
        phone: employee.phone || "",
        joining_date: employee.joining_date || "",
        bio: employee.bio || "",
        department: employee.department || "",
        position: employee.position || "",
        basic_salary: employee.basic_salary || "",
        allowances: employee.allowances || "",
        deductions: employee.deductions || "",
        email: employee.email || "",
        role: employee.role || "",
      });
    }
  }, [employee]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await updateEmployee({
        id: employee._id,
        ...data,
      }).unwrap();

      toast.success(res.message || "Employee updated");
      setOpenUpdate(false);
    } catch (err) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  return (
    <Dialog open={openupdate} onOpenChange={setOpenUpdate}>
      <DialogContent className="sm:max-w-150 w-full max-h-[95vh] flex flex-col p-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-bold">
            Update Employee
          </DialogTitle>
          <DialogDescription>Edit employee details</DialogDescription>
        </DialogHeader>

        {/* Body */}
        <div className="flex-1  overflow-y-auto p-6 pt-2 space-y-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <form onSubmit={handleSubmit} className="space-y-6 pt-4">
            {/* Personal Info */}
            <div className="space-y-4 p-4 border rounded-lg bg-white">
              <h3 className="font-semibold text-sm text-gray-700 border-b pb-2">
                Personal Information
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    value={data.first_name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    value={data.last_name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={data.phone}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="joining_date">Joining Date</Label>
                  <Input
                    type="date"
                    id="joining_date"
                    name="joining_date"
                    value={data.joining_date}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={data.bio}
                  onChange={handleInputChange}
                  className="resize-none"
                />
              </div>
            </div>

            {/* Employment */}
            <div className="space-y-4 p-4 border rounded-lg bg-white">
              <h3 className="font-semibold text-sm text-gray-700 border-b pb-2">
                Employment Details
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Select
                    value={data.department}
                    onValueChange={(value) =>
                      setData((prev) => ({ ...prev, department: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Itdepartment">IT</SelectItem>
                      <SelectItem value="humanresources">HR</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    name="position"
                    value={data.position}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="basic_salary">Basic Salary</Label>
                  <Input
                    id="basic_salary"
                    name="basic_salary"
                    type="number"
                    value={data.basic_salary}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allowances">Allowances</Label>
                  <Input
                    id="allowances"
                    name="allowances"
                    type="number"
                    value={data.allowances}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deductions">Deductions</Label>
                  <Input
                    id="deductions"
                    name="deductions"
                    type="number"
                    value={data.deductions}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Account */}
            <div className="space-y-4 p-4 border rounded-lg bg-white">
              <h3 className="font-semibold text-sm text-gray-700 border-b pb-2">
                Account
              </h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    value={data.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select
                    value={data.role}
                    onValueChange={(value) =>
                      setData((prev) => ({ ...prev, role: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="employee">Employee</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Footer */}
            <DialogFooter className="border-t pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Employee"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateEmployeeModal;
