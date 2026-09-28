import { useState } from 'react';
import { Home } from './pages/Home';
import { Tenants } from './pages/Tenants';
import { Calendar } from './pages/Calendar';
import { Employees } from './pages/Employees';
import { Times } from './pages/Times';
import { Confirm } from './pages/Confirm';
import type { Tenant, Slot } from './api/client';

type Screen = 'home' | 'tenants' | 'calendar' | 'employees' | 'times' | 'confirm';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [date, setDate] = useState<string>('');
  const [employee, setEmployee] = useState<Slot | null>(null);
  const [time, setTime] = useState<string>('');

  return (
    <div className="app">
      {screen === 'home' && (
        <Home onBook={() => setScreen('tenants')} />
      )}
      {screen === 'tenants' && (
        <Tenants
          onSelect={(t) => { setTenant(t); setScreen('calendar'); }}
          onBack={() => setScreen('home')}
        />
      )}
      {screen === 'calendar' && (
        <Calendar
          onSelect={(d) => { setDate(d); setScreen('employees'); }}
          onBack={() => setScreen('tenants')}
        />
      )}
      {screen === 'employees' && (
        <Employees
          tenant={tenant!}
          date={date}
          onSelect={(e) => { setEmployee(e); setScreen('times'); }}
          onBack={() => setScreen('calendar')}
        />
      )}
      {screen === 'times' && (
        <Times
          tenant={tenant!}
          date={date}
          employee={employee!}
          onSelect={(t) => { setTime(t); setScreen('confirm'); }}
          onBack={() => setScreen('employees')}
        />
      )}
      {screen === 'confirm' && (
        <Confirm
          tenant={tenant!}
          date={date}
          employee={employee!}
          time={time}
          onBack={() => setScreen('times')}
          onDone={() => setScreen('home')}
        />
      )}
    </div>
  );
}