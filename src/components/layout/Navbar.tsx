import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

import UserNavDropdown from './UserNavDropdown';
import { ThemeToggle } from '../ThemeToggle';

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      padding: '16px 24px',
      borderBottom: '1px solid var(--color-border)',
      backgroundColor: 'var(--color-nav-bg)',
      backdropFilter: 'blur(12px)',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Image src="/logo.png" alt="LearnFlow Icon" width={40} height={40} style={{ objectFit: 'contain', borderRadius: '8px' }} />
        <span className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
          LearnFlow
        </span>
      </Link>
      
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        
        <form action="/search" method="GET" style={{ position: 'relative' }}>
          <input 
            type="text" 
            name="q"
            placeholder="Search courses..." 
            style={{ 
              padding: '8px 16px', 
              borderRadius: '20px', 
              border: '1px solid var(--color-border)', 
              backgroundColor: 'var(--color-bg-secondary)', 
              color: 'var(--color-text-primary)',
              fontSize: '0.875rem',
              outline: 'none',
              width: '200px'
            }} 
          />
        </form>

        <ThemeToggle />

        <Link href="/careers" style={{ color: 'var(--color-text-secondary)', fontWeight: 500 }} className="hover-white">
          Explore Careers
        </Link>
        {session ? (
          <UserNavDropdown user={session.user} />
        ) : (
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link href="/login" style={{ color: 'var(--color-text-secondary)', fontWeight: 500, alignSelf: 'center' }} className="hover-white">
              Log in
            </Link>
            <Link href="/register" className="btn btn-primary">
              Sign up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
