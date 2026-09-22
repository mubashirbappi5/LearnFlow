'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';

export default function DashboardLoading() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg-primary)', position: 'relative' }}>
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Navbar />
      </div>
      
      <main style={{ flex: 1, padding: '40px 24px', maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
          <div>
            <div className="animate-pulse-glow" style={{ width: '300px', height: '48px', backgroundColor: 'var(--color-bg-tertiary)', borderRadius: '8px', marginBottom: '12px' }}></div>
            <div className="animate-pulse-glow" style={{ width: '400px', height: '24px', backgroundColor: 'var(--color-bg-tertiary)', borderRadius: '6px' }}></div>
          </div>
          <div className="animate-pulse-glow" style={{ width: '140px', height: '140px', borderRadius: '50%', backgroundColor: 'var(--color-bg-tertiary)' }}></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div className="glass-panel" style={{ padding: '32px', borderRadius: '24px', backgroundColor: 'var(--color-bg-secondary)' }}>
              <div className="animate-pulse-glow" style={{ width: '200px', height: '32px', backgroundColor: 'var(--color-bg-tertiary)', borderRadius: '6px', marginBottom: '24px' }}></div>
              <div className="animate-pulse-glow" style={{ width: '100%', height: '120px', backgroundColor: 'var(--color-bg-tertiary)', borderRadius: '16px' }}></div>
            </div>
            
            <div className="glass-panel" style={{ padding: '32px', borderRadius: '24px', backgroundColor: 'var(--color-bg-secondary)' }}>
              <div className="animate-pulse-glow" style={{ width: '250px', height: '32px', backgroundColor: 'var(--color-bg-tertiary)', borderRadius: '6px', marginBottom: '24px' }}></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="animate-pulse-glow" style={{ width: '100%', height: '80px', backgroundColor: 'var(--color-bg-tertiary)', borderRadius: '12px' }}></div>
                <div className="animate-pulse-glow" style={{ width: '100%', height: '80px', backgroundColor: 'var(--color-bg-tertiary)', borderRadius: '12px' }}></div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div className="glass-panel" style={{ padding: '24px', borderRadius: '24px', backgroundColor: 'var(--color-bg-secondary)' }}>
              <div className="animate-pulse-glow" style={{ width: '150px', height: '28px', backgroundColor: 'var(--color-bg-tertiary)', borderRadius: '6px', marginBottom: '20px' }}></div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div className="animate-pulse-glow" style={{ width: '60px', height: '60px', borderRadius: '12px', backgroundColor: 'var(--color-bg-tertiary)' }}></div>
                <div className="animate-pulse-glow" style={{ width: '60px', height: '60px', borderRadius: '12px', backgroundColor: 'var(--color-bg-tertiary)' }}></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
