'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';

export default function CourseLoading() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg-primary)', position: 'relative' }}>
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Navbar />
      </div>
      
      <main style={{ flex: 1, padding: '40px 24px', maxWidth: '800px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: '40px' }}>
          <div className="animate-pulse-glow" style={{ width: '120px', height: '24px', backgroundColor: 'var(--color-bg-tertiary)', borderRadius: '4px', marginBottom: '16px' }}></div>
          <div className="animate-pulse-glow" style={{ width: '100%', height: '48px', backgroundColor: 'var(--color-bg-tertiary)', borderRadius: '8px', marginBottom: '16px' }}></div>
          <div className="animate-pulse-glow" style={{ width: '100%', height: '80px', backgroundColor: 'var(--color-bg-tertiary)', borderRadius: '8px' }}></div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-panel" style={{ padding: '32px', borderRadius: '24px', backgroundColor: 'var(--color-bg-secondary)' }}>
              <div className="animate-pulse-glow" style={{ width: '180px', height: '28px', backgroundColor: 'var(--color-bg-tertiary)', borderRadius: '6px', marginBottom: '12px' }}></div>
              <div className="animate-pulse-glow" style={{ width: '250px', height: '20px', backgroundColor: 'var(--color-bg-tertiary)', borderRadius: '4px', marginBottom: '24px' }}></div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="animate-pulse-glow" style={{ width: '100%', height: '64px', backgroundColor: 'var(--color-bg-tertiary)', borderRadius: '12px' }}></div>
                <div className="animate-pulse-glow" style={{ width: '100%', height: '64px', backgroundColor: 'var(--color-bg-tertiary)', borderRadius: '12px' }}></div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
