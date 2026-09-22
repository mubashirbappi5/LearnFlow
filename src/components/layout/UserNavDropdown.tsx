'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

interface UserNavDropdownProps {
  user: {
    name?: string | null;
    email?: string | null;
    role?: string;
  };
}

export default function UserNavDropdown({ user }: UserNavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const initials = user.name ? user.name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || 'U';

  return (
    <div className="relative" ref={dropdownRef} style={{ position: 'relative' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: 'var(--color-glass)',
          border: '1px solid var(--color-glass-strong)',
          padding: '6px 16px 6px 6px',
          borderRadius: '999px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        className="hover-lift"
      >
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          color: '#ffffff',
          fontSize: '0.875rem'
        }}>
          {initials}
        </div>
        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
          {user.name || 'Account'}
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}>
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 12px)',
          right: 0,
          width: '240px',
          background: 'var(--color-bg-secondary)',
          backdropFilter: 'blur(16px)',
          border: '1px solid var(--color-glass-strong)',
          borderRadius: '16px',
          padding: '8px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-glass)', marginBottom: '8px' }}>
            <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', fontSize: '0.875rem', marginBottom: '2px' }}>{user.name}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</div>
          </div>
          
          {user.role === 'ADMIN' && (
            <Link href="/admin" onClick={() => setIsOpen(false)} style={{ display: 'block', padding: '10px 16px', borderRadius: '8px', color: 'var(--color-text-primary)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }} className="hover-bg">
              Admin Dashboard
            </Link>
          )}

          <Link href="/dashboard" onClick={() => setIsOpen(false)} style={{ display: 'block', padding: '10px 16px', borderRadius: '8px', color: 'var(--color-text-primary)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }} className="hover-bg">
            My Dashboard
          </Link>
          
          <Link href="/leaderboard" onClick={() => setIsOpen(false)} style={{ display: 'block', padding: '10px 16px', borderRadius: '8px', color: 'var(--color-text-primary)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }} className="hover-bg">
            Leaderboard
          </Link>
          
          <Link href="/dashboard/library" onClick={() => setIsOpen(false)} style={{ display: 'block', padding: '10px 16px', borderRadius: '8px', color: 'var(--color-text-primary)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }} className="hover-bg">
            My Library (Notes)
          </Link>

          <Link href="/settings" onClick={() => setIsOpen(false)} style={{ display: 'block', padding: '10px 16px', borderRadius: '8px', color: 'var(--color-text-primary)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }} className="hover-bg">
            Settings
          </Link>

          <div style={{ height: '1px', background: 'var(--color-glass)', margin: '8px 0' }} />

          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            style={{ 
              display: 'block', 
              width: '100%', 
              textAlign: 'left', 
              padding: '10px 16px', 
              borderRadius: '8px', 
              color: '#ef4444', 
              background: 'transparent', 
              border: 'none', 
              fontSize: '0.875rem', 
              fontWeight: 500, 
              cursor: 'pointer' 
            }} 
            className="hover-bg"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
