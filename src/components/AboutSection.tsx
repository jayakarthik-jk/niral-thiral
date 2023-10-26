"use client";

import { type FC, useEffect, useState } from "react";
import Container from "./Container";

const End = new Date("2023-11-02").valueOf();

export default function AboutSection() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const distance = End - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (60 * 60 * 1000),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (60 * 1000));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section>
      <Container>
        <Counter
          days={days}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />
      </Container>
    </section>
  );
}

interface CounterProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Counter: FC<CounterProps> = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="counter flex w-full items-center justify-center gap-3 rounded-md text-2xl md:gap-5 md:p-5 md:text-6xl">
      <ClockTile digits={days} type={"Days"} />
      <ClockTile digits={hours} type={"Hours"} />
      <ClockTile digits={minutes} type={"Minutes"} />
      <ClockTile digits={seconds} type={"Seconds"} />
    </div>
  );
};

interface ClockTileProps {
  digits: number;
  type: string;
}

const ClockTile: FC<ClockTileProps> = ({ digits, type }) => {
  return (
    <p className="counter-tile flex w-56 min-w-[40] flex-col items-center justify-center rounded-md border p-5 text-3xl shadow-sm">
      <span className="font-extrabold">
        {digits < 10 ? "0" + digits : digits}
      </span>
      <span className="text-xs font-light md:text-sm">{type}</span>
    </p>
  );
};
