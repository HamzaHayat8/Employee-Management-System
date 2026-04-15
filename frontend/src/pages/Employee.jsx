import { Search, Pencil, Trash2 } from "lucide-react";
import { Input } from "../components/common/input";
import { AddEmployeeModal } from "../components/employee/AddEmployeeModal";
import React from "react";
import { userdata } from "../assets/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/common/select";
import { Button } from "../components/common/button";

function Employee() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterDept, setFilterDept] = React.useState("all");

  // Filtering Logic
  const filteredData = userdata.filter((user) => {
    const matchesSearch = `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === "all" || user.department === filterDept;
    return matchesSearch && matchesDept;
  });

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
            <SelectItem value="Sales">Sales</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredData.length > 0 ? (
          filteredData.map((user) => <EmployeeCard key={user.id} user={user} />)
        ) : (
          <h1>No employees found</h1>
        )}
      </div>
    </div>
  );
}

// Sub-component for the Card
function EmployeeCard({ user }) {
  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();

  return (
    <div className="group relative bg-white border border-zinc-100 rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md">
      {/* Top Section with Badge and Avatar */}
      <div className="p-6 flex flex-col items-center justify-center space-y-4 relative bg-slate-50/50">
        <span className="absolute top-4 left-4 px-3 py-1 bg-white border rounded-full text-[10px] font-bold text-zinc-600 shadow-sm uppercase tracking-wider">
          {user.department}
        </span>

        <div className="w-20 h-20 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#4831E2] text-xl font-bold">
          {initials}
        </div>
      </div>

      {/* Info Section */}
      <div className="p-5 border-t border-zinc-50 bg-white group-hover:bg-[#F4F2FF] transition-colors relative">
        <h3 className="font-semibold text-zinc-900 truncate">
          {user.firstName} {user.lastName}
        </h3>
        <p className="text-xs text-zinc-500 truncate">{user.position}</p>

        {/* Floating Action Buttons (Visible only on hover) */}
        <div className="absolute right-4 -top-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <Button
            size="icon"
            variant="secondary"
            className="h-9 w-9 rounded-lg shadow-lg bg-white hover:bg-zinc-50 text-zinc-600"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-9 w-9 rounded-lg shadow-lg bg-white hover:bg-red-50 text-red-500 border-red-100"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Employee;
