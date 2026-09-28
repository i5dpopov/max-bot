const API_BASE = import.meta.env.VITE_API_BASE || 'http://178.21.11.91';

export interface Tenant {
  code: string;
  name: string;
  type: string;
  address?: string;
  phone?: string;
}

export interface Slot {
  employeeId: string;
  employeeName: string;
  time: string;
  clientName?: string;
}

export interface BookingRequest {
  employee_id: string;
  date: string;
  time: string;
  client_name: string;
  client_phone: string;
  tenant_code: string;
}

export async function fetchTenants(): Promise<Tenant[]> {
  const res = await fetch(`${API_BASE}/health`);
  const data = await res.json();
  return data.tenants || [];
}

export async function fetchSlots(date: string, tenantCode: string, employee?: string) {
  const res = await fetch(`${API_BASE}/api/slots`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date, tenant_code: tenantCode, employee }),
  });
  return res.json();
}

export async function createBooking(req: BookingRequest) {
  const res = await fetch(`${API_BASE}/api/booking`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  return res.json();
}