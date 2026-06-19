"use client";
import HeaderSection from "@/components/section/header";
import HeroSection from "@/components/section/hero";
import { useEffect, useState } from "react";

type QueryDict = Record<string, { description: string; date: Date } | null>;

const now = Date.now();
export default function Home() {
  const [date, setDate] = useState<number>(now);
  const [data, setData] = useState<QueryDict | null>(null);

  const changeDate = (paramDate: number) => {
    setDate(paramDate);
  };

  useEffect(() => {
    const event = new Date(date);
    fetch(`./api/task/${event.getUTCFullYear()}/${event.getUTCMonth() + 1}`)
      .then((res) => res.json())
      .then((body) => setData(body));
  }, [date]);
  return (
    <div>
      <main className="m-3">
        <HeaderSection date={date} setDateAction={changeDate}></HeaderSection>
        {data && <HeroSection data={data} date={date}></HeroSection>}
      </main>
    </div>
  );
}
