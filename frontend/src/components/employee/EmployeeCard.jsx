import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../common/button";
import { useDeleteEmployeeMutation } from "../../services/employees/employee.api";
import React, { useState } from "react";
import { ConfirmDialog } from "../dashboard/ConfirmDialog";
import { UpdateEmployeeModal } from "./UpdateEmployeeModal";

function EmployeeCard({ user }) {
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const [deleteEmployee, { isLoading: isDeleting }] =
    useDeleteEmployeeMutation();
  const handleDelete = (id) => {
    deleteEmployee(id);
  };

  const initials = `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();

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
          {user.first_name} {user.last_name}
        </h3>
        <p className="text-xs text-zinc-500 truncate">{user.position}</p>

        {/* Floating Action Buttons (Visible only on hover) */}
        <div className="absolute right-4 -top-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <Button
            size="icon"
            variant="secondary"
            onClick={() => setOpenUpdate(true)}
            className="h-9 w-9 rounded-lg shadow-lg bg-white hover:bg-zinc-50"
          >
            <Pencil className="h-4 w-4" />
          </Button>

          <UpdateEmployeeModal
            openupdate={openUpdate}
            setOpenUpdate={setOpenUpdate}
            employee={user}
          />

          <Button
            size="icon"
            onClick={() => setOpen(true)}
            variant="secondary"
            className="h-9 w-9 rounded-lg shadow-lg bg-white hover:bg-red-50 text-red-500 border-red-100"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          {/* delete dialog */}
          <ConfirmDialog
            open={open}
            onOpenChange={setOpen}
            onConfirm={() => handleDelete(user._id)}
            title="Delete this item?"
            description="This will permanently remove your data."
          />
          {/* delete dialog */}
        </div>
      </div>
    </div>
  );
}

export default EmployeeCard;
