import { getDaysInYear, getDayOfYear } from 'date-fns';
import { NextPage } from 'next';

const formatter = new Intl.NumberFormat(undefined, { style: 'percent' });

const Index: NextPage = () => {
  const now = new Date();
  const year = now.getFullYear();
  const daysInYear = getDaysInYear(new Date(year));
  const currentDay = getDayOfYear(now);
  const percent = currentDay / daysInYear;

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-screen-sm px-4 mx-auto space-y-4 sm:px-0">
      <h2 className="text-xl">{year} Year Progress</h2>
      <h1 className="text-2xl font-medium">{formatter.format(percent)}</h1>
      <div
        role="progressbar"
        aria-valuenow={percent * 100}
        aria-valuemin={0}
        aria-valuemax={100}
        className="w-full h-6 bg-gray-300 rounded-full"
      >
        <div
          className="h-full bg-purple-500 rounded-full"
          style={{ width: formatter.format(percent) }}
        />
      </div>
    </div>
  );
};

export default Index;
