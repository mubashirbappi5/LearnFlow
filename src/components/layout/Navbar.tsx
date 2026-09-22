import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      padding: '16px 24px',
      borderBottom: '1px solid var(--color-border)',
      backgroundColor: 'rgba(10, 10, 11, 0.8)',
      backdropFilter: 'blur(12px)',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
        <Image src="/logo.png" alt="LearnFlow" width={180} height={40} style={{ objectFit: 'contain', backgroundColor: 'white', borderRadius: '8px', padding: '4px' }} />
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

        <Link href="/careers" style={{ color: 'var(--color-text-secondary)', fontWeight: 500 }} className="hover-white">
          Explore Careers
        </Link>
        {session ? (
          <Link href={session.user.role === 'ADMIN' ? '/admin' : '/dashboard'} className="btn btn-secondary">
            Dashboard
          </Link>
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
