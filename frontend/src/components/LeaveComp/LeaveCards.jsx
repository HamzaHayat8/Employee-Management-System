import React from "react";
import Cards from "../common/cards";
import { IoIosUmbrella } from "react-icons/io";
import { PiTreePalm } from "react-icons/pi";
import { FaRegNewspaper, FaTemperatureEmpty } from "react-icons/fa6";

function LeaveCards({ totalDays }) {
  const cardData = [
    { id: 1, name: "Sick Leave", number: 5, icon: <FaTemperatureEmpty /> },
    { id: 2, name: "Casual Leave", number: 1, icon: <IoIosUmbrella /> },
    { id: 3, name: "Annual Leave", number: 0, icon: <PiTreePalm /> },
    { id: 4, name: "Total Days", number: totalDays, icon: <FaRegNewspaper /> },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      <Cards Carddata={cardData} />
    </div>
  );
}

export default LeaveCards;
