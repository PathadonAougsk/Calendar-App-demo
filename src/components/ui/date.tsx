"use client";

import { useState } from "react";

const monthsArray = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];

export default function DateWidget({
  date,
  setDate,
}: {
  date: number;
  setDate: (date: number) => void;
}) {
  const current = new Date(date);
  const [selectedYear, setSelectedYear] = useState(current.getFullYear());
  const currentMonth = current.getMonth();

  return (
    <div className="bg-[#171717] border border-white/10 rounded-xl p-4 w-72 flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <button
          type="button"
          className="text-white/50 hover:text-white text-xl px-2 transition-colors"
          onClick={() => setSelectedYear((y) => y - 1)}
        >
          ‹
        </button>
        <input
          type="number"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="w-20 text-center bg-transparent text-white text-lg font-semibold focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button
          type="button"
          className="text-white/50 hover:text-white text-xl px-2 transition-colors"
          onClick={() => setSelectedYear((y) => y + 1)}
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-4 gap-1">
        {monthsArray.map((month, index) => {
          const isActive = index === currentMonth && selectedYear === current.getFullYear();
          return (
            <button
              type="button"
              key={month}
              onClick={() => setDate(new Date(selectedYear, index).getTime())}
              className={`py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-[#f84c0a] text-white font-semibold"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {month.slice(0, 3)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
