'use client';

import React, { useState, useEffect } from "react";
import Calendar from "../components/Calendar";
import EventModal from "../components/EventModal";

export interface Event {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
}

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // 从localStorage加载事件
  useEffect(() => {
    const stored = localStorage.getItem('calendar-events');
    if (stored) setEvents(JSON.parse(stored));
  }, []);

  // 事件变更时保存到localStorage
  useEffect(() => {
    localStorage.setItem('calendar-events', JSON.stringify(events));
  }, [events]);

  function handleDateClick(date: Date) {
    setSelectedDate(date);
    setModalOpen(true);
  }

  function handleSave(event: Event) {
    setEvents([...events, event]);
  }

  function handleDelete(id: string) {
    setEvents(events.filter((e) => e.id !== id));
  }

  function handleClose() {
    setModalOpen(false);
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
      <h1 className="text-2xl font-bold mb-4">日历APP</h1>
      <Calendar events={events} onDateClick={handleDateClick} />
      <EventModal
        open={modalOpen}
        date={selectedDate}
        events={events}
        onClose={handleClose}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </main>
  );
}