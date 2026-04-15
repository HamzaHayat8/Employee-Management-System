import React from "react";
import { User, Lock, Save } from "lucide-react";
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

function Settings() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Section */}
      <header className="mb-8">
        <h1 className="text-xl font-medium tracking-tight">Settings</h1>
        <p className="text-slate-500">Manage your account and preferences</p>
      </header>

      {/* Public Profile Card */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100 mb-6">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-slate-400" />
            <CardTitle className="text-base font-semibold">
              Public Profile
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Name
              </Label>
              <Input
                id="name"
                defaultValue="Admin"
                className="bg-slate-50/50"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue="admin@example.com"
                className="bg-slate-50/50"
              />
            </div>
          </div>

          {/* Position Field */}
          <div className="space-y-2">
            <Label htmlFor="position" className="text-sm font-medium">
              Position
            </Label>
            <Input id="position" className="bg-slate-50/50" />
          </div>

          {/* Bio Field */}
          <div className="space-y-2">
            <Label htmlFor="bio" className="text-sm font-medium">
              Bio
            </Label>
            <Textarea
              id="bio"
              placeholder="Write a brief bio..."
              className="min-h-25 bg-slate-50/50"
            />
            <p className="text-[12px] text-slate-400">
              This will be displayed on your profile.
            </p>
          </div>

          {/* Save Button Container */}
          <div className="flex justify-end pt-4">
            <Button className="bg-[#6366f1] hover:bg-[#4f46e5] text-white px-6 py-2 h-auto gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Password Card */}
      <Card className="max-w-md border-slate-200 shadow-sm">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 border rounded-lg bg-white">
              <Lock className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold">Password</h3>
              <p className="text-xs text-slate-500">
                Update your account password
              </p>
            </div>
          </div>
          <Button variant="outline" className="text-sm border-slate-200">
            Change
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Settings;
