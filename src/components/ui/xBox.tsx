"use client";

import { useState } from "react";

export function XBox({
  date,
  day,
  description,
}: {
  date: string;
  day: string;
  description: string;
}) {
  return (
    <div className="flex flex-row max-w-[400px] max-h-[400px]">
      <div className="w-[5px] h-auto flex flex-col justify-center">
        <div className="w-auto h-[20px] bg-[#f84c0a] translate-y-[-30px]"></div>
      </div>
      <div className="flex flex-col gap-2 min-h-[200px] w-full h-auto bg-[#2b2b2b] p-3">
        <div className="flex flex-row gap-2">
          <h1 className="text-4xl">{date}</h1>
          <b className="text-[25px]">{day}</b>
        </div>
        <p className="text-[16px] text-left leading-none wrap-break-word">
          {description}
        </p>
      </div>
    </div>
  );
}

export function XBoxEditable({
  date,
  desc,
  onCustomClickAction: onCustomClick,
}: {
  date: number;
  desc: string | undefined;
  onCustomClickAction: () => void;
}) {
  const event = new Date(date);

  const [description, setDescription] = useState<string>(desc ? desc : "");
  const dayNames = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleSumbit = (e: React.SubmitEvent) => {
    e.preventDefault();
    fetch("./api/task", {
      method: "POST",
      body: JSON.stringify({
        description,
        date: new Date(
          Date.UTC(
            event.getUTCFullYear(),
            event.getUTCMonth(),
            event.getUTCDate(),
          ),
        ).toISOString(),
      }),
    }).then(() => {
      onCustomClick();
    });
  };

  return (
    <div className="flex flex-col min-w-3/5 min-h-4/5 w-auto h-auto bg-[#171717] p-10 gap-2 border-white outline-solid">
      <form onSubmit={handleSumbit}>
        <h1 className="text-[36px] text-center">Editing Task</h1>
        <p className="text-[20px] text-center">{event.toDateString()}</p>
        <div className="flex flex-row justify-center align-middle items-center">
          <div className="min-w-[5px] min-h-[50px] w-auto h-auto bg-[#f84c0a]"></div>
          <div className="flex flex-col gap-2 min-w-[400px] min-h-[400px] bg-[#2b2b2b] pt-10 pl-3 pr-3">
            <div className="flex flex-row gap-2">
              <h1 className="text-7xl">{event.getUTCDate()}</h1>
              <b className="text-[25px]">{dayNames[event.getUTCDay()]}</b>
            </div>
            <input
              type="text"
              className="text-[16px] leading-none wrap-break-word focus:outline-hidden"
              onChange={handleChange}
              value={description}
              placeholder="What need to be done"
              autoFocus
              required
            ></input>
          </div>
        </div>
        <div className="flex flex-row justify-evenly">
          <button type="button" onClick={onCustomClick}>
            <h1 className="">Discrad</h1>
          </button>
          <button type="submit">
            <h1 className="text-[16px] text-[#f84c0a]">Save</h1>
          </button>
        </div>
      </form>
    </div>
  );
}
