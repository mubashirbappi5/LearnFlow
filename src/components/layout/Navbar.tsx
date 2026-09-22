import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

import UserNavDropdown from './UserNavDropdown';
import { ThemeToggle } from '../ThemeToggle';
import NavbarSearch from './NavbarSearch';
import StreakWidget from './StreakWidget';

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
        
        <NavbarSearch />

        <ThemeToggle />
        
        <Suspense fallback={<div style={{ width: '60px', height: '30px', borderRadius: '999px', backgroundColor: 'var(--color-glass)' }} className="animate-pulse-glow" />}>
          <StreakWidget />
        </Suspense>

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
