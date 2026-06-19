"use client";
import Image from "next/image";
import DateWidget from "../ui/date";
import { Module } from "../ui/module";
import { useState } from "react";

const monthsArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function HeaderSection({
  date,
  setDateAction,
}: {
  date: number;
  setDateAction: (date: number) => void;
}) {
  const [isShowing, setIsShowing] = useState(false);
  const paramDate = new Date(date);

  return (
    <div className="flex flex-row justify-between p-2">
      <Image src={"./Logo.svg"} width={100} height={100} alt="logo.svg" />
      <button onClick={() => setIsShowing((prev) => !prev)}>
        <h1 className="text-white text-4xl underline">{`${monthsArray[paramDate.getMonth()]} ${paramDate.getFullYear()}`}</h1>
      </button>
      <Module isShowing={isShowing}>
        <DateWidget
          date={date}
          setDate={(d) => {
            setDateAction(d);
            setIsShowing(false);
          }}
        />
      </Module>
    </div>
  );
}
