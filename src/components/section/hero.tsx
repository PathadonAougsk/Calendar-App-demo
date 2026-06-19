"use client";
import { useRouter } from "next/navigation";
import { XBox, XBoxEditable } from "../ui/xBox";
import { useState } from "react";
import { Module } from "../ui/module";

interface Task {
  description: string;
  date: Date;
}

type QueryDict = Record<string, Task | null>;

// assume pass using Date.now()
export default function HeroSection({
  data,
  date: paramDate,
}: {
  data: QueryDict;
  date: number;
}) {
  const event = new Date(paramDate);
  const dayNames = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];

  const [isShowing, setIsShowing] = useState(false);
  const rounter = useRouter();

  const [selectDescription, setSelectDescription] = useState<
    undefined | string
  >(undefined);
  const [selectDate, setSelectDate] = useState<number>(paramDate);

  const switchShowing = () => {
    setIsShowing((prev) => !prev);
    rounter.refresh();
  };

  const handleClick = (desc: string | undefined, date: number) => {
    switchShowing();
    setSelectDescription(desc);
    setSelectDate(date);
  };

  const firstDayOffset =
    (new Date(event.getFullYear(), event.getMonth(), 1).getDay() + 6) % 7;

  const Objects = Object.entries(data).map(([key, value]) => (
    <button
      key={key}
      onClick={() => {
        handleClick(
          value?.description,
          value
            ? new Date(value.date).getTime()
            : Date.UTC(event.getFullYear(), event.getMonth(), parseInt(key)),
        );
      }}
    >
      <XBox
        date={key}
        day={
          dayNames[
            new Date(
              event.getFullYear(),
              event.getMonth(),
              parseInt(key),
            ).getDay()
          ]
        }
        description={
          value
            ? value?.description
            : "Some super cool task to do on this particular day"
        }
      ></XBox>
    </button>
  ));
  return (
    <>
      <div className="grid grid-cols-7 gap-4 p-3 text-left">
        <div>Monday</div>
        <div>Tuesday</div>
        <div>Wednesday</div>
        <div>Thursday</div>
        <div>Friday</div>
        <div>Saturday</div>
        <div>Sunday</div>
        {Array.from({ length: firstDayOffset }, (_, i) => (
          <div key={`offset-${i}`} />
        ))}
        {Objects}
      </div>
      <Module isShowing={isShowing}>
        <XBoxEditable
          date={selectDate}
          desc={selectDescription}
          onCustomClickAction={switchShowing}
        ></XBoxEditable>
      </Module>
    </>
  );
}
