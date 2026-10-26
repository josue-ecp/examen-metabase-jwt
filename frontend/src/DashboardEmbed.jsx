import React, { useEffect, useState } from 'react';

export default function DashboardEmbed() {
    const [dashboardUrl, setDashboardUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        
        fetch('http://localhost:5000/api/metabase-token')
            .then((res) => {
                if (!res.ok) throw new Error('No se pudo conectar con el servidor backend');
                return res.json();
            })
            .then((data) => {
                setDashboardUrl(data.url);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div style={{ textAlign: 'center', padding: '50px', fontSize: '18px' }}>Cargando dashboard seguro...</div>;
    if (error) return <div style={{ color: 'red', textAlign: 'center', padding: '50px' }}>Error: {error}</div>;

    return (
        <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <header style={{ padding: '15px 20px', background: '#111827', color: '#fff', fontFamily: 'sans-serif' }}>
                <h2 style={{ margin: 0, fontSize: '20px' }}>Dashboard de Rendimiento Estudiantil (Embebido JWT Seguro)</h2>
            </header>
            <iframe
                src={dashboardUrl}
                frameBorder="0"
                width="100%"
                height="100%"
                allowTransparency
                title="Metabase Dashboard Embebed"
            />
        </div>
    );
}