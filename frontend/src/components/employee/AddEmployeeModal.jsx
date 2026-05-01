import React, { useState, useRef, useEffect } from "react";
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
import { useRegisterMutation } from "../../services/auth/authApi";
import { toast } from "react-hot-toast";

// Face Recognition
import { captureFace, loadModels, startWebcam } from "../../utils/loadModels";
export function AddEmployeeModal() {
  const [register, { isLoading }] = useRegisterMutation();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    bio: "",
    department: "",
    position: "",
    basic_salary: "",
    allowances: "",
    deductions: "",
    role: "employee",
    allowedRadius: 100,
    officeCoordinates: {
      type: "Point",
      coordinates: [74.3587, 31.5204], // Default: Lahore (Lng, Lat)
    },
  });

  // Face Recognition States
  const [faceDescriptor, setFaceDescriptor] = useState(null);
  const [faceImage, setFaceImage] = useState(null);
  const [isLoadingModels, setIsLoadingModels] = useState(true);
  const [isCapturing, setIsCapturing] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // Load Face-API Models
  useEffect(() => {
    loadModels().then(() => setIsLoadingModels(false));
    // Cleanup webcam stream on unmount
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Update Office Coordinates
  const handleOfficeLocation = (lng, lat) => {
    setFormData((prev) => ({
      ...prev,
      officeCoordinates: {
        type: "Point",
        coordinates: [parseFloat(lng) || 0, parseFloat(lat) || 0],
      },
    }));
  };

  // Form Submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!faceDescriptor || faceDescriptor.length === 0) {
      toast.error(
        "Please capture the employee's face before creating account!",
      );
      return;
    }

    try {
      const payload = {
        ...formData,
        faceDescriptor,
        officeCoordinates: formData.officeCoordinates,
        allowedRadius: Number(formData.allowedRadius),
      };

      const res = await register(payload).unwrap();

      toast.success(res.message || "Employee created successfully!");

      // Reset form after success
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        phone: "",
        bio: "",
        department: "",
        position: "",
        basic_salary: "",
        allowances: "",
        deductions: "",
        role: "employee",
        allowedRadius: 100,
        officeCoordinates: { type: "Point", coordinates: [74.3587, 31.5204] },
      });
      setFaceDescriptor(null);
      setFaceImage(null);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to create employee");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#4831E2] hover:bg-[#4831E2]/90 py-5 flex items-center gap-2">
          <IoIosAddCircle className="text-lg" />
          Add New Employee
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-225 w-full max-h-[95vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-bold">
            Add New Employee
          </DialogTitle>
          <DialogDescription>
            Create a new employee account with face recognition for attendance
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6 pt-2 space-y-6">
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Face Recognition Section */}
            <div className="p-4 border rounded-lg bg-white">
              <h3 className="font-semibold text-sm text-gray-700 mb-3">
                Face Registration (Required)
              </h3>

              {isLoadingModels ? (
                <p className="text-amber-600">
                  Loading face recognition models...
                </p>
              ) : (
                <div className="flex flex-col md:flex-row gap-6">
                  <div>
                    <Button
                      type="button"
                      onClick={() =>
                        startWebcam(videoRef, streamRef, setIsCapturing)
                      }
                      className="mb-3"
                    >
                      Start Camera
                    </Button>
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      className="w-72 border rounded-lg shadow-sm"
                    />
                    <Button
                      type="button"
                      onClick={() =>
                        captureFace(
                          videoRef,
                          canvasRef,
                          setFaceDescriptor,
                          setFaceImage,
                        )
                      }
                      disabled={!isCapturing}
                      className="mt-3 w-full bg-green-600 hover:bg-green-700"
                    >
                      Capture Face
                    </Button>
                  </div>

                  <div>
                    {faceImage && (
                      <>
                        <p className="text-green-600 font-medium mb-2">
                          Captured Face:
                        </p>
                        <img
                          src={faceImage}
                          alt="Captured Face"
                          className="w-72 border rounded-lg shadow-sm"
                        />
                      </>
                    )}
                  </div>
                </div>
              )}
              <canvas ref={canvasRef} className="hidden" />
            </div>

            {/* Personal Information */}
            <div className="space-y-4 p-4 border rounded-lg bg-white">
              <h3 className="font-semibold text-sm text-gray-700 border-b pb-2">
                Personal Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    placeholder="Enter first name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    placeholder="Enter last name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio (Optional)</Label>
                <Textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Brief description..."
                />
              </div>
            </div>

            {/* Employment Details */}
            <div className="space-y-4 p-4 border rounded-lg bg-white">
              <h3 className="font-semibold text-sm text-gray-700 border-b pb-2">
                Employment Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(val) =>
                      handleSelectChange("department", val)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IT_Department">
                        IT Department
                      </SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    placeholder="Enter position"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="basic_salary">Basic Salary</Label>
                  <Input
                    name="basic_salary"
                    value={formData.basic_salary}
                    onChange={handleInputChange}
                    type="number"
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allowedRadius">Allowed Radius (meters)</Label>
                  <Input
                    name="allowedRadius"
                    value={formData.allowedRadius}
                    onChange={handleInputChange}
                    type="number"
                    min="50"
                    max="500"
                  />
                </div>
              </div>
            </div>

            {/* Account Setup */}
            <div className="space-y-4 p-4 border rounded-lg bg-white">
              <h3 className="font-semibold text-sm text-gray-700 border-b pb-2">
                Account Setup
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Work Email</Label>
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    type="email"
                    placeholder="employee@company.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Temporary Password</Label>
                  <Input
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    type="password"
                    placeholder="Enter temporary password"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>System Role</Label>
                <Select
                  value={formData.role}
                  onValueChange={(val) => handleSelectChange("role", val)}
                >
                  <SelectTrigger>
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

            {/* Office Location */}
            <div className="space-y-4 p-4 border rounded-lg bg-white">
              <h3 className="font-semibold text-sm text-gray-700 border-b pb-2">
                Office GPS Location
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Longitude</Label>
                  <Input
                    type="number"
                    step="0.000001"
                    value={formData.officeCoordinates.coordinates[0]}
                    onChange={(e) =>
                      handleOfficeLocation(
                        e.target.value,
                        formData.officeCoordinates.coordinates[1],
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Latitude</Label>
                  <Input
                    type="number"
                    step="0.000001"
                    value={formData.officeCoordinates.coordinates[1]}
                    onChange={(e) =>
                      handleOfficeLocation(
                        formData.officeCoordinates.coordinates[0],
                        e.target.value,
                      )
                    }
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="flex gap-2 sm:justify-end border-t pt-6">
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={isLoading || !faceDescriptor}
                className="bg-[#4831E2] hover:bg-[#4831E2]/90 px-8"
              >
                {isLoading ? "Creating..." : "Create Employee"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
