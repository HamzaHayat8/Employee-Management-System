import React from "react";
import { Search } from "lucide-react";
import { Input } from "../components/common/input";
import { AddEmployeeModal } from "../components/employee/AddEmployeeModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/common/select";
import { useGetEmployeesQuery } from "../services/employees/employee.api";
import Loader from "../components/common/Loading";
import EmployeeCard from "../components/employee/EmployeeCard";

function Employee() {
  const { data: userdata, isLoading } = useGetEmployeesQuery();

  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterDept, setFilterDept] = React.useState("all");

  // Filtering Logic
  const filteredData = (userdata?.data || []).filter((user) => {
    const fullName = `${user?.first_name || ""} ${user?.last_name || ""}`;

    const matchesSearch = fullName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesDept = filterDept === "all" || user?.department === filterDept;

    return matchesSearch && matchesDept;
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900">Employees</h1>
          <p className="text-sm text-zinc-500">Manage your team members</p>
        </div>
        <AddEmployeeModal />
      </div>

      {/* Search Bar & Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <Input
            className="pl-10 bg-white"
            placeholder="Search by employee name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select onValueChange={(value) => setFilterDept(value)}>
          <SelectTrigger className="w-50 bg-white">
            <SelectValue placeholder="All Departments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="Engineering">Engineering</SelectItem>
            <SelectItem value="Marketing">Marketing</SelectItem>
            <SelectItem value="sales">Sales</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredData.length > 0 ? (
          filteredData.map((user) => <EmployeeCard key={user.id} user={user} />)
        ) : (
          <div className="col-span-full py-20 flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-semibold text-center text-zinc-900">
              No Employees Found.
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Employee;
