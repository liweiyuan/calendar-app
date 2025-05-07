"use client";

import React, { useState, useEffect } from 'react';

export interface Event {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
}

interface EventModalProps {
  open: boolean;
  date: Date | null;
  events: Event[];
  onClose: () => void;
  onSave: (event: Event) => void;
  onDelete: (id: string) => void;
}

export default function EventModal({
  open,
  date,
  events,
  onClose,
  onSave,
  onDelete,
}: EventModalProps) {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (open) {
      setTitle('');
    }
  }, [date, open]);

if (!open || !date) return null;

const dateStr = date.toISOString().slice(0, 10);
const dayEvents = events.filter((e) => e.date === dateStr);

function handleSave() {
  if (title.trim()) {
    onSave({
      id: Math.random().toString(36).slice(2),
      date: dateStr,
      title,
    });
    setTitle('');
  }
}

return (
  <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
    <div className="bg-white p-4 rounded shadow w-80">
      <h3 className="font-bold mb-2">
        {dateStr} 的事件
      </h3>
      <ul className="mb-2">
        {dayEvents.map((e) => (
          <li key={e.id} className="flex justify-between items-center py-1">
            <span>{e.title}</span>
            <button
              className="text-xs text-red-500 hover:underline"
              onClick={() => onDelete(e.id)}
            >
              删除
            </button>
          </li>
        ))}
      </ul>
      <input
        className="border rounded w-full px-2 py-1 mb-2"
        placeholder="添加新事件"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="flex justify-end gap-2">
        <button
          className="px-2 py-1 rounded bg-blue-500 text-white"
          onClick={handleSave}
        >
          添加
        </button>
        <button
          className="px-2 py-1 rounded bg-gray-200"
          onClick={onClose}
        >
          关闭
        </button>
      </div>
    </div>
  </div>
);
}
