import { useEffect, useState } from 'react';
import { fetchSlots, type Tenant, type Slot } from '../api/client';

interface TimesProps {
  tenant: Tenant;
  date: string;
  employee: Slot;
  onSelect: (time: string) => void;
  onBack: () => void;
}

export function Times({ tenant, date, employee, onSelect, onBack }: TimesProps) {
  const [slots, setSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSlots(date, tenant.code, employee.employeeId).then((data) => {
      setSlots(data.slots || []);
      setLoading(false);
    });
  }, [date, tenant, employee]);

  if (loading) return <div className="loading">Загрузка...</div>;

  return (
    <div>
      <div className="screen-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h2>Выберите время</h2>
      </div>
      <p className="card-subtitle" style={{ marginBottom: '16px' }}>
        {employee.employeeName} · {date}
      </p>
      <div className="card-list">
        {slots.map((t) => (
          <div key={t} className="card" onClick={() => onSelect(t)}>
            <div className="card-title">{t}</div>
          </div>
        ))}
      </div>
    </div>
  );
}