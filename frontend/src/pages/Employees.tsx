import { useEffect, useState } from 'react';
import { fetchSlots, type Tenant, type Slot } from '../api/client';

interface EmployeesProps {
  tenant: Tenant;
  date: string;
  onSelect: (slot: Slot) => void;
  onBack: () => void;
}

export function Employees({ tenant, date, onSelect, onBack }: EmployeesProps) {
  const [employees, setEmployees] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSlots(date, tenant.code).then((data) => {
      // API возвращает { employees: [{employeeId, employeeName, slots}] }
      const list = data.employees || [];
      setEmployees(list);
      setLoading(false);
    });
  }, [date, tenant]);

  if (loading) return <div className="loading">Загрузка...</div>;

  return (
    <div>
      <div className="screen-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h2>Выберите специалиста</h2>
      </div>
      <p className="card-subtitle" style={{ marginBottom: '16px' }}>{date}</p>
      <div className="card-list">
        {employees.map((e: any) => (
          <div
            key={e.employeeId}
            className="card"
            onClick={() => onSelect({ employeeId: e.employeeId, employeeName: e.employeeName, time: '' })}
          >
            <div className="card-title">{e.employeeName}</div>
            <div className="card-subtitle">Свободно слотов: {e.slots?.length || 0}</div>
          </div>
        ))}
      </div>
    </div>
  );
}