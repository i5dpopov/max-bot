import { useEffect, useState } from 'react';
import { fetchTenants, type Tenant } from '../api/client';

interface TenantsProps {
  onSelect: (tenant: Tenant) => void;
  onBack: () => void;
}

export function Tenants({ onSelect, onBack }: TenantsProps) {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTenants().then((data) => {
      setTenants(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="loading">Загрузка...</div>;

  return (
    <div>
      <div className="screen-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h2>Выберите заведение</h2>
      </div>
      <div className="card-list">
        {tenants.map((t) => (
          <div key={t.code} className="card" onClick={() => onSelect(t)}>
            <div className="card-title">{t.name}</div>
            {t.address && <div className="card-subtitle">📍 {t.address}</div>}
            {t.phone && <div className="card-subtitle">📞 {t.phone}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}