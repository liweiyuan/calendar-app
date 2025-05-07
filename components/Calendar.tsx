"use client";

import React, { useState } from 'react';
import { getDaysInMonth, getToday, isSameDay } from '../utils/date';

export interface Event {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
}

interface CalendarProps {
  events: Event[];
  onDateClick: (date: Date) => void;
}

export default function Calendar({ events, onDateClick }: CalendarProps) {
  const today = getToday();
  const [year, setYear] = useState(today.year);
  const [month, setMonth] = useState(today.month);

  const days = getDaysInMonth(year, month);

  function prevMonth() {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  }
  function nextMonth() {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  }

  function getEventForDay(date: Date) {
    const dateStr = date.toISOString().slice(0, 10);
    return events.filter((e) => e.date === dateStr);
  }

  // 计算本月1号是星期几，前面补空格
  const firstDay = new Date(year, month, 1).getDay();

  return (
    <div className="w-full max-w-xl mx-auto p-4 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="px-2 py-1 rounded hover:bg-gray-100">&lt;</button>
        <h2 className="text-lg font-bold">
          {year}年 {month + 1}月
        </h2>
        <button onClick={nextMonth} className="px-2 py-1 rounded hover:bg-gray-100">&gt;</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center font-semibold">
        {['日','一','二','三','四','五','六'].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 text-center mt-2">
        {[...Array(firstDay)].map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {days.map((date) => {
          const isToday = isSameDay(date, new Date());
          const events = getEventForDay(date);
          return (
            <button
              key={date.toISOString()}
              className={`h-16 flex flex-col items-center justify-start border rounded hover:bg-blue-50 relative ${
                isToday ? 'border-blue-500' : 'border-gray-200'
              }`}
              onClick={() => onDateClick(date)}
            >
              <span className={isToday ? 'text-blue-600 font-bold' : ''}>
                {date.getDate()}
              </span>
              {events.length > 0 && (
                <span className="w-2 h-2 bg-red-400 rounded-full absolute top-2 right-2"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
