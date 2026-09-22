'use client';

import React from 'react';

export default function Loading() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: 'var(--color-bg-primary)' 
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
        <div style={{ position: 'relative', width: '80px', height: '80px' }}>
          <div className="animate-spin" style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '4px solid rgba(99, 102, 241, 0.2)',
            borderTopColor: 'var(--color-brand-primary)',
            borderRightColor: 'var(--color-brand-secondary)',
          }}></div>
        </div>
        <div style={{
          fontSize: '1.25rem',
          fontWeight: 600,
          background: 'linear-gradient(to right, var(--color-brand-primary), var(--color-brand-secondary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }}>
          Loading LearnFlow...
        </div>
      </div>
    </div>
  );
}
