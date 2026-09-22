import React from 'react';
import Navbar from '@/components/layout/Navbar';
import AssessmentFlow from '@/components/assessment/AssessmentFlow';
import { prisma } from '@/lib/prisma';
import { Status } from '@prisma/client';

export default async function AssessmentPage() {
  const careers = await prisma.careerPath.findMany({
    where: { status: Status.PUBLISHED }
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg-primary)', overflow: 'hidden' }}>
      {/* Background glow effects */}
      <div style={{ position: 'fixed', top: '10%', right: '-10%', width: '40vw', height: '40vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, rgba(10,10,11,0) 70%)', zIndex: 0, pointerEvents: 'none' }} className="animate-pulse-glow" />
      <div style={{ position: 'fixed', bottom: '-20%', left: '-10%', width: '50vw', height: '50vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, rgba(10,10,11,0) 70%)', zIndex: 0, pointerEvents: 'none', animationDelay: '2s' }} className="animate-pulse-glow" />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Navbar />
        
        <main style={{ flex: 1, padding: '60px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="animate-slide-up-fade" style={{ textAlign: 'center', marginBottom: '40px', maxWidth: '600px' }}>
            <div style={{ 
                display: 'inline-block',
                padding: '6px 16px', 
                borderRadius: '9999px',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                color: 'var(--color-brand-primary)',
                fontSize: '0.875rem',
                fontWeight: 600,
                marginBottom: '16px',
                border: '1px solid rgba(99, 102, 241, 0.2)'
              }}>
                Personalized Roadmap
            </div>
            <h1 style={{ fontSize: '3rem', marginBottom: '16px', lineHeight: 1.2 }}>Discover Your Ideal <br/> <span className="text-gradient">Tech Career</span></h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.25rem' }}>
              Answer a few quick questions and we'll build a custom learning path tailored to your goals.
            </p>
          </div>

          <div className="animate-slide-up-fade" style={{ width: '100%', display: 'flex', justifyContent: 'center', animationDelay: '0.2s' } as any}>
            <AssessmentFlow careers={careers} />
          </div>
        </main>
      </div>
    </div>
  );
}
