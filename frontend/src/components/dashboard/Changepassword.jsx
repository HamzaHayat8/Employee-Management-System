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
import { IoIosAddCircle } from "react-icons/io";
import { toast } from "react-hot-toast";
import { useChangePasswordMutation } from "../../services/auth/authApi";

export function ChangePasswordModal() {
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const [data, setData] = React.useState({
    currentPassword: "",
    newPassword: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await changePassword(data).unwrap();
      toast.success(res.message);
      setData({
        currentPassword: "",
        newPassword: "",
      });
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#4831E2] hover:bg-[#4831E2]/90 py-5 flex items-center gap-2">
          <IoIosAddCircle className="text-lg" />
          Change Password
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-150 w-full max-h-[95vh] flex flex-col p-0 overflow-hidden">
        {" "}
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-bold">
            Change Password
          </DialogTitle>
          <DialogDescription>Update your account password</DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto p-6 pt-2 space-y-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <form onSubmit={handleFormSubmit} className="space-y-6 pt-4">
            {/* Section 1: Personal Information */}
            <div className="space-y-4 p-4 border rounded-lg bg-white">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">current Password</Label>
                  <Input
                    onChange={handleInputChange}
                    name="currentPassword"
                    id="currentPassword"
                    placeholder="Enter current password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    onChange={handleInputChange}
                    name="newPassword"
                    id="newPassword"
                    placeholder="Enter new password"
                  />
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
                disabled={isLoading}
                className="bg-[#4831E2] hover:bg-[#4831E2]/90 px-8"
              >
                {isLoading ? "Changing..." : "Change Password"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
