import { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import {
  getDaysInYear,
  getDayOfYear,
  differenceInSeconds,
  startOfYear,
  endOfYear,
} from 'date-fns';
import useInterval from 'react-useinterval';

const formatter = new Intl.NumberFormat(undefined, { style: 'percent' });

interface TimeDiff {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
}

const getTimeDiff = (inputSeconds: number): TimeDiff => {
  let remaining = inputSeconds;
  const seconds = Math.floor(remaining % 60);
  remaining = Math.floor(remaining / 60);
  const minutes = remaining % 60;
  remaining = Math.floor(remaining / 60);
  const hours = remaining % 24;
  remaining = Math.floor(remaining / 24);
  const days = remaining;
  return { seconds, minutes, hours, days };
};

const useNow = (): {
  formatted: string;
  year: number;
  percent: number;
  now: Date;
  past: TimeDiff;
  remaining: TimeDiff;
} => {
  const [now, setNow] = useState<Date>(new Date());

  useInterval(() => setNow(new Date()), 1000);

  const year = now.getFullYear();
  const start = startOfYear(now);
  const end = endOfYear(now);
  const daysInYear = getDaysInYear(new Date(year));
  const currentDay = getDayOfYear(now);
  const percent = currentDay / daysInYear;

  const formatted = formatter.format(percent ?? 0);

  const pastSeconds = differenceInSeconds(now, start);
  const remainingSeconds = differenceInSeconds(end, now);

  const past = getTimeDiff(pastSeconds);
  const remaining = getTimeDiff(remainingSeconds);

  return {
    formatted,
    year: now.getFullYear(),
    percent: percent * 100,
    now,
    past,
    remaining,
  };
};

const Index: NextPage = () => {
  const { year, formatted, percent, now, past, remaining } = useNow();

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-screen-sm px-4 mx-auto space-y-4 sm:px-0">
      <Head>
        <title>{year} Year Progress</title>
      </Head>

      <h1 className="text-4xl font-semibold">{year} Year Progress</h1>
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        className="w-full h-6 bg-gray-300 rounded-full"
      >
        <div
          className="relative h-full bg-purple-500 rounded-full"
          style={{ width: formatted }}
        >
          <span className="absolute text-sm text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 transform-gpu">
            {formatted}
          </span>
        </div>
      </div>

      <h2 className="font-mono tabular-nums">
        Current: {now.toLocaleString()}
      </h2>
      <h2 className="font-mono tabular-nums">
        Past: {past.days} day
        {past.days === 1 ? '' : 's'}, {past.hours} hour
        {past.hours === 1 ? '' : 's'}, {past.minutes} minute
        {past.minutes === 1 ? '' : 's'}, {past.seconds} second
        {past.seconds === 1 ? '' : 's'}.
      </h2>
      <h2 className="font-mono tabular-nums">
        Remaining: {remaining.days} day
        {remaining.days === 1 ? '' : 's'}, {remaining.hours} hour
        {remaining.hours === 1 ? '' : 's'}, {remaining.minutes} minute
        {remaining.minutes === 1 ? '' : 's'}, {remaining.seconds} second
        {remaining.seconds === 1 ? '' : 's'}.
      </h2>
    </div>
  );
};

export default Index;
