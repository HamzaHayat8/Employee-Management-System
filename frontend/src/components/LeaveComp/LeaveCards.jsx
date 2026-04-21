import React from "react";
import Cards from "../common/cards";
import { IoIosUmbrella } from "react-icons/io";
import { PiTreePalm } from "react-icons/pi";
import { FaRegNewspaper, FaTemperatureEmpty } from "react-icons/fa6";

function LeaveCards({
  totalDays,
  sickleave,
  casualleave,
  annualleave,
  pendingLeaves,
  allLeave,
  role,
  approvedLeaves,
}) {
  const addcolor =
    totalDays > 5 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600";

  const cardData = [
    {
      id: 1,
      name: "Sick Leave",
      number: sickleave?.length || 0,
      icon: <FaTemperatureEmpty />,
    },
    {
      id: 2,
      name: "Casual Leave",
      number: casualleave?.length || 0,
      icon: <IoIosUmbrella />,
    },
    {
      id: 3,
      name: "Annual Leave",
      number: annualleave?.length || 0,
      icon: <PiTreePalm />,
    },
    { id: 4, name: "Total Days", number: totalDays, icon: <FaRegNewspaper /> },
  ];

  const admindata = [
    {
      id: 1,
      name: "All Leaves",
      number: allLeave,
      icon: <FaRegNewspaper />,
    },
    {
      id: 2,
      name: "Pending Requests",
      number: pendingLeaves?.length || 0,
      icon: <FaRegNewspaper />,
    },
    {
      id: 3,
      name: "Approved Leaves",
      number: approvedLeaves || 0,
      icon: <FaRegNewspaper />,
    },
    {
      id: 4,
      name: "Total Days",
      number: totalDays,
      icon: <FaRegNewspaper />,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      <Cards
        Carddata={role === "admin" ? admindata : cardData}
        addcolor={addcolor}
      />
    </div>
  );
}

export default LeaveCards;
