import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { prisma } from '@/lib/prisma';
import { Status } from '@prisma/client';
import Link from 'next/link';

export default async function CareersExplorerPage() {
  const careers = await prisma.careerPath.findMany({
    where: { status: Status.PUBLISHED },
    include: {
      _count: {
        select: { courses: true }
      }
    }
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg-primary)' }}>
      <Navbar />
      
      {/* Hero Section */}
      <div style={{
        padding: '100px 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100vw', height: '100%', background: 'radial-gradient(ellipse at top, rgba(59,130,246,0.1) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
        
        <h1 style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '24px', position: 'relative' }}>
          Discover Your <span className="text-gradient">Future</span>
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto', position: 'relative', lineHeight: 1.6 }}>
          Explore our expertly curated career paths. Complete the courses, submit real-world projects, and earn your verified certificate.
        </p>
      </div>

      <main style={{ flex: 1, padding: '40px 24px 100px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '32px' }}>
          {careers.map((career) => (
            <Link key={career.id} href={`/careers/${career.slug}`} style={{ textDecoration: 'none' }}>
              <div className="card hover-glow" style={{ 
                display: 'flex', 
                flexDirection: 'column',
                height: '100%',
                padding: '32px',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(59,130,246,0.1)', color: 'var(--color-brand-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', fontSize: '1.5rem' }}>
                  🚀
                </div>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '16px', color: 'var(--color-text-primary)' }}>{career.title}</h2>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px', flex: 1, lineHeight: 1.5 }}>
                  {career.description}
                </p>
                
                <div style={{ display: 'flex', gap: '16px', fontSize: '0.875rem', color: 'var(--color-text-muted)', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: 'var(--color-brand-primary)' }}>⏱</span> {career.estimatedDuration}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: 'var(--color-brand-secondary)' }}>📚</span> {career._count.courses} Courses
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {careers.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '64px', backgroundColor: 'var(--color-bg-secondary)', borderRadius: '16px' }}>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem' }}>No career paths are currently available.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
