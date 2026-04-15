import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "../../components/common/dialog";
import { Button } from "../../components/common/button";
import { Input } from "../../components/common/input";
import { Label } from "../../components/common/label";
import { Textarea } from "../../components/common/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/common/select";
import { IoIosAddCircle } from "react-icons/io";

export function AddEmployeeModal() {
  const [data, setData] = React.useState({
    firstName: "",
    lastName: "",
    phone: "",
    joiningDate: "",
    bio: "",
    department: "",
    position: "",
    basicSalary: "",
    allowances: "",
    deductions: "",
    email: "",
    password: "",
    role: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#4831E2] hover:bg-[#4831E2]/90 py-5 flex items-center gap-2">
          <IoIosAddCircle className="text-lg" />
          Add New Employee
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-150 w-full max-h-[95vh] flex flex-col p-0 overflow-hidden">
        {" "}
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-bold">
            Add New Employee
          </DialogTitle>
          <DialogDescription>
            Create a user account and employee profile
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto p-6 pt-2 space-y-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <form onSubmit={handleFormSubmit} className="space-y-6 pt-4">
            {/* Section 1: Personal Information */}
            <div className="space-y-4 p-4 border rounded-lg bg-white">
              <h3 className="font-semibold text-sm text-gray-700 border-b pb-2">
                Personal Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    onChange={handleInputChange}
                    name="firstName"
                    id="firstName"
                    placeholder="Enter first name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    onChange={handleInputChange}
                    name="lastName"
                    id="lastName"
                    placeholder="Enter last name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    onChange={handleInputChange}
                    name="phone"
                    id="phone"
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="joinDate">Join Date</Label>
                  <Input
                    onChange={handleInputChange}
                    name="joinDate"
                    id="joinDate"
                    type="date"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio (Optional)</Label>
                <Textarea
                  onChange={handleInputChange}
                  name="bio"
                  id="bio"
                  placeholder="Brief description..."
                  className="resize-none"
                />
              </div>
            </div>

            {/* Section 2: Employment Details */}
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
                      <SelectItem value="Itdepartment">
                        IT Department
                      </SelectItem>
                      <SelectItem value="humanresources">
                        Human Resources
                      </SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    name="position"
                    onChange={handleInputChange}
                    id="position"
                    placeholder="Enter position"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary">Basic Salary</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500 text-sm">
                      $
                    </span>
                    <Input
                      id="salary"
                      className="pl-7"
                      placeholder="0"
                      type="number"
                      onChange={handleInputChange}
                      name="basicSalary"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="allowances">Allowances</Label>
                  <Input
                    name="allowances"
                    onChange={handleInputChange}
                    id="allowances"
                    placeholder="0"
                    type="number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deductions">Deductions</Label>
                  <Input
                    name="deductions"
                    onChange={handleInputChange}
                    id="deductions"
                    placeholder="0"
                    type="number"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Account Setup */}
            <div className="space-y-4 p-4 border rounded-lg bg-white">
              <h3 className="font-semibold text-sm text-gray-700 border-b pb-2">
                Account Setup
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Work Email</Label>
                  <Input
                    onChange={handleInputChange}
                    name="email"
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    className="bg-blue-50/50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Temporary Password</Label>
                    <Input
                      name="password"
                      onChange={handleInputChange}
                      id="password"
                      type="password"
                      value="••••"
                      readOnly
                      className="bg-blue-50/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>System Role</Label>
                    <Select
                      value={data.role}
                      onValueChange={(value) =>
                        setData((prev) => ({ ...prev, role: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Role" />
                        <SelectValue />
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
            </div>

            <DialogFooter className="flex gap-2 sm:justify-end border-t pt-4">
              <DialogClose asChild>
                <Button variant="outline" type="button" className="px-8">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-[#4831E2] hover:bg-[#4831E2]/90 px-8"
              >
                Create Employee
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
