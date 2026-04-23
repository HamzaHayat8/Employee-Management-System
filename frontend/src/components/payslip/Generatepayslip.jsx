import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "../../components/common/dialog";
import { Button } from "../../components/common/button";
import { Input } from "../../components/common/input";
import { Label } from "../../components/common/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/common/select";
import { IoIosAddCircle } from "react-icons/io";
import { toast } from "react-hot-toast";
import { useGetEmployeesQuery } from "../../services/employees/employee.api";
import { useGeneratePayslipMutation } from "../../services/payslip/payslip.api";

export function Generatepayslip() {
  const { data: userdata, isLoading } = useGetEmployeesQuery();

  const [generatePayslip, { isLoading: loading }] =
    useGeneratePayslipMutation();

  const initialState = {
    employeeId: "",
    month: "",
    year: "",
    basicSalary: "",
    allowances: "",
    deductions: "",
  };

  const [data, setData] = React.useState(initialState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmployeeChange = (value) => {
    const selected = userdata?.data?.find((e) => e._id === value);
    if (selected) {
      setData((prev) => ({
        ...prev,
        employeeId: selected._id,
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...data,
      basicSalary: Number(data.basicSalary),
      allowances: Number(data.allowances),
      deductions: Number(data.deductions),
      net_salary:
        Number(data.basicSalary) +
        Number(data.allowances) -
        Number(data.deductions),
    };

    try {
      const res = await generatePayslip(payload).unwrap();
      console.log("Payslip generated:", res);
      toast.success(res.message);
      setData(initialState);
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = ["2023", "2024", "2025", "2026"];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#4831E2] py-5 flex items-center gap-2">
          <IoIosAddCircle className="text-lg" />
          Generate Payslip
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-150 w-full max-h-[95vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-bold">
            Generate Monthly Payslip
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Employee */}
            <div className="space-y-2">
              <Label>Employee</Label>
              <Select onValueChange={handleEmployeeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Employee" />
                </SelectTrigger>
                <SelectContent>
                  {userdata?.data?.map((employee) => (
                    <SelectItem key={employee._id} value={employee._id}>
                      {employee.first_name} {employee.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Month & Year */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Month</Label>
                <Select
                  onValueChange={(value) =>
                    setData((prev) => ({ ...prev, month: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Year</Label>
                <Select
                  onValueChange={(value) =>
                    setData((prev) => ({ ...prev, year: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((y) => (
                      <SelectItem key={y} value={y}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Salary */}
            <div>
              <Label>Basic Salary</Label>
              <Input
                name="basicSalary"
                type="number"
                value={data.basicSalary}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Allowances</Label>
                <Input
                  name="allowances"
                  type="number"
                  value={data.allowances}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label>Deductions</Label>
                <Input
                  name="deductions"
                  type="number"
                  value={data.deductions}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Footer */}
            <DialogFooter className="border-t pt-4">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>

              <Button type="submit" disabled={loading}>
                {loading ? "Generating..." : "Generate Payslip"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
