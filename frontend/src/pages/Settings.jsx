// pages/Settings.jsx

import React, { useEffect, useState } from "react";
import { User, Lock, Save } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { updateUser } from "../features/auth/authSlice";
import { useUpdateEmployeeMutation } from "../services/employees/employee.api";

import { Button } from "../components/common/button";
import { Input } from "../components/common/input";
import { Label } from "../components/common/label";
import { Textarea } from "../components/common/textarea";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/common/card";

import { ChangePasswordModal } from "../components/dashboard/Changepassword";

function Settings() {
  const dispatch = useDispatch();

  const userdata = useSelector((state) => state.auth.user);

  const [updateEmployee, { isLoading }] = useUpdateEmployeeMutation();

  const [formData, setFormData] = useState({
    first_name: "",
    email: "",
    position: "",
    bio: "",
  });

  useEffect(() => {
    if (userdata) {
      setFormData({
        first_name: userdata.first_name || "",
        email: userdata.email || "",
        position: userdata.position || "",
        bio: userdata.bio || "",
      });
    }
  }, [userdata]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await updateEmployee({
        id: userdata._id,
        ...formData,
      }).unwrap();

      // only update user
      dispatch(updateUser(res.data));

      toast.success(res.message || "Profile Updated");
    } catch (error) {
      toast.error(error?.data?.message || "Update Failed");
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <header>
        <h1 className="text-xl font-semibold">Settings</h1>
        <p className="text-slate-500">Manage your account</p>
      </header>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User size={18} />
            <CardTitle>Public Profile</CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <Label>First Name</Label>

              <Input
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label>Email</Label>

              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <Label>Position</Label>

            <Input
              name="position"
              value={formData.position}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label>Bio</Label>

            <Textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex justify-end">
            <Button onClick={handleFormSubmit} loading={isLoading}>
              <Save size={16} />
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="max-w-md">
        <CardContent className="p-4 flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <Lock size={18} />

            <div>
              <h3 className="font-medium">Password</h3>

              <p className="text-sm text-slate-500">Change account password</p>
            </div>
          </div>

          <ChangePasswordModal />
        </CardContent>
      </Card>
    </div>
  );
}

export default Settings;
