import { useState } from 'react';

interface CalendarProps {
  onSelect: (date: string) => void;
  onBack: () => void;
}

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

function getMonday(d: Date): Date {
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
}

function formatDate(d: Date): string {
  return d.toISOString().split('T')[0];
}

export function Calendar({ onSelect, onBack }: CalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [weekStart, setWeekStart] = useState(getMonday(new Date(today)));

  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    days.push(d);
  }

  const prevWeek = () => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() - 7);
    if (d >= getMonday(new Date(today))) setWeekStart(d);
  };

  const nextWeek = () => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + 7);
    setWeekStart(d);
  };

  const monthLabel = `${String(weekStart.getMonth() + 1).padStart(2, '0')}.${String(weekStart.getFullYear()).slice(-2)}`;

  return (
    <div>
      <div className="screen-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h2>Выберите дату</h2>
      </div>
      <div className="calendar">
        <div className="calendar-header">
          <button className="calendar-nav" onClick={prevWeek}>◀</button>
          <div className="calendar-month">{monthLabel}</div>
          <button className="calendar-nav" onClick={nextWeek}>▶</button>
        </div>
        <div className="calendar-weekdays">
          {WEEKDAYS.map((d) => (
            <div key={d} className="calendar-weekday">{d}</div>
          ))}
        </div>
        <div className="calendar-days">
          {days.map((d) => {
            const isPast = d < today;
            return (
              <button
                key={formatDate(d)}
                className="calendar-day"
                disabled={isPast}
                onClick={() => onSelect(formatDate(d))}
              >
                {d.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}