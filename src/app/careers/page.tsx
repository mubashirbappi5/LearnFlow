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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg-primary)', overflow: 'hidden' }}>
      <Navbar />
      
      {/* Immersive Premium Hero Section */}
      <div style={{
        padding: '120px 24px 80px',
        textAlign: 'center',
        position: 'relative'
      }}>
        {/* Background glow effects */}
        <div className="animate-pulse-glow" style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '100vw', height: '100%', background: 'radial-gradient(ellipse at top, rgba(99,102,241,0.15) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40vw', height: '40vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '50vw', height: '50vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }}></div>
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', padding: '6px 16px', borderRadius: '9999px', backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--color-brand-primary)', fontSize: '0.875rem', fontWeight: 600, marginBottom: '24px', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
            Future-Proof Your Career
          </div>
          <h1 style={{ fontSize: '4.5rem', fontWeight: 800, marginBottom: '24px', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            Discover Your <br/> <span className="text-gradient">True Potential</span>
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.25rem', lineHeight: 1.6 }}>
            Explore our expertly curated career paths. Master the skills, complete real-world projects, and launch your dream career.
          </p>
        </div>
      </div>

      <main style={{ flex: 1, padding: '40px 24px 120px', maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '32px' }}>
          {careers.map((career) => (
            <Link key={career.id} href={`/careers/${career.slug}`} style={{ textDecoration: 'none' }}>
              <div className="card hover-lift hover-glow glass-panel" style={{ 
                display: 'flex', 
                flexDirection: 'column',
                height: '100%',
                padding: '40px 32px',
                borderRadius: '24px',
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                background: 'linear-gradient(145deg, rgba(30,30,36,0.7) 0%, rgba(20,20,25,0.9) 100%)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
              }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.1))', color: 'var(--color-brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                </div>
                
                <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '16px', color: 'var(--color-text-primary)', lineHeight: 1.3 }}>{career.title}</h2>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '40px', flex: 1, lineHeight: 1.6, fontSize: '1.0625rem' }}>
                  {career.description}
                </p>
                
                <div style={{ display: 'flex', gap: '24px', fontSize: '0.875rem', color: 'var(--color-text-muted)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500 }}>
                    <span style={{ color: 'var(--color-brand-primary)' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    </span> 
                    {career.estimatedDuration}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500 }}>
                    <span style={{ color: 'var(--color-brand-secondary)' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                    </span> 
                    {career._count.courses} Courses
                  </div>
                </div>
              </div>
            </Link>
          ))}
          
          {careers.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '80px', backgroundColor: 'var(--color-bg-secondary)', borderRadius: '24px', border: '1px dashed rgba(255,255,255,0.1)' }}>
              <svg style={{ margin: '0 auto 16px', color: 'var(--color-text-muted)' }} width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.25rem' }}>No career paths are currently available.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
