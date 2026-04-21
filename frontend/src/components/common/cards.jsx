import React from "react";

function Cards({ Carddata, addcolor }) {
  return (
    <>
      {Carddata.map((item) => (
        <div
          key={item.id}
          className="flex border-r-5 flex-col gap-2 p-4 rounded-xl border hover:shadow-md hover:border-[#1E1A4D] transition-all duration-200"
        >
          <h2 className="text-base sm:text-lg font-medium">{item.name}</h2>
          <div className="flex items-center justify-between">
            <span
              className={
                item.name === "Total Days"
                  ? `text-sm font-semibold ${addcolor} px-2 py-1 rounded`
                  : "text-xl font-semibold"
              }
            >
              {item.number}
            </span>
            <span className="p-2 text-xl  bg-zinc-200/50 rounded-sm">
              {item.icon}
            </span>
          </div>
        </div>
      ))}
    </>
  );
}

export default Cards;
