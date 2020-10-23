import React from 'react';
import { getDaysInYear, getDayOfYear } from 'date-fns';
import { NextPage } from 'next';

const Index: NextPage = () => {
  const now = new Date();
  const daysInYear = getDaysInYear(new Date(now.getFullYear()));
  const currentDay = getDayOfYear(now);
  return <h1>{Math.round((currentDay / daysInYear) * 100)}</h1>;
};

export default Index;
