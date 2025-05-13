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
  const [editId, setEditId] = useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTitle('');
      setEditId(null);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [date, open]);

  if (!open || !date) return null;

  const dateStr = date.toISOString().slice(0, 10);
  const dayEvents = events.filter((e) => e.date === dateStr);

  function handleSave() {
    if (!title.trim()) return;
    if (editId) {
      // 编辑：只在内容有变化时才保存
      const old = dayEvents.find(e => e.id === editId);
      if (old && old.title === title.trim()) return;
      onSave({ id: editId, date: dateStr, title: title.trim() });
    } else {
      // 新增
      onSave({
        id: Math.random().toString(36).slice(2),
        date: dateStr,
        title: title.trim(),
      });
    }
    setTitle('');
    setEditId(null);
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  function handleEdit(event: Event) {
    setTitle(event.title);
    setEditId(event.id);
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  function handleCancelEdit() {
    setTitle('');
    setEditId(null);
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleSave();
    }
    if (e.key === 'Escape' && editId) {
      handleCancelEdit();
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow w-80">
        <h3 className="font-bold mb-2">
          {dateStr} 的事件
        </h3>
        <ul className="mb-2 min-h-[32px]">
          {dayEvents.length === 0 && (
            <li className="text-gray-400 text-sm">暂无事件</li>
          )}
          {dayEvents.map((e) => (
            <li key={e.id} className="flex justify-between items-center py-1 gap-2 group">
              <span className="flex-1 truncate cursor-pointer hover:underline" onClick={() => handleEdit(e)} title="点击编辑">{e.title}</span>
              <button
                className="text-xs text-red-500 hover:underline hidden group-hover:inline"
                onClick={() => onDelete(e.id)}
              >
                删除
              </button>
            </li>
          ))}
        </ul>
        <input
          ref={inputRef}
          className="border rounded w-full px-2 py-1 mb-2"
          placeholder={editId ? '编辑事件内容' : '添加新事件'}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="flex justify-end gap-2">
          {editId && (
            <button
              className="px-2 py-1 rounded bg-gray-100 border border-gray-300 text-gray-600"
              onClick={handleCancelEdit}
              type="button"
            >
              取消编辑
            </button>
          )}
          <button
            className={`px-2 py-1 rounded ${title.trim() && (!editId || (editId && dayEvents.find(e=>e.id===editId)?.title!==title.trim())) ? 'bg-blue-500 text-white' : 'bg-blue-200 text-white cursor-not-allowed'}`}
            onClick={handleSave}
            disabled={
              Boolean(
                !title.trim() || (editId && dayEvents.find(e=>e.id===editId)?.title===title.trim())
              )
            }
          >
            {editId ? '保存' : '添加'}
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
