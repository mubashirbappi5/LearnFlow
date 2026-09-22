import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';

export default async function CertificatePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const certificate = await prisma.certificate.findUnique({
    where: { id: resolvedParams.id },
    include: {
      user: true,
      course: true
    }
  });

  if (!certificate) {
    notFound();
  }

  const title = certificate.course.title;
  const type = 'Course';
  const issueDate = certificate.issuedAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg-primary)' }}>
      <Navbar />
      
      <main style={{ flex: 1, padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Certificate of Completion</h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>Verify the authenticity of this LearnFlow certificate.</p>
        </div>

        {/* Certificate Visual Rendering */}
        <div style={{
          width: '100%',
          maxWidth: '800px',
          aspectRatio: '1.414 / 1', // A4 aspect ratio (landscape)
          background: 'linear-gradient(180deg, #1e293b, #0f172a)',
          border: '2px solid #334155',
          borderRadius: '8px',
          position: 'relative',
          boxShadow: '0 0 0 10px rgba(255,255,255,0.02), 0 0 40px rgba(0,0,0,0.8)',
          display: 'flex',
          flexDirection: 'column',
          padding: '40px',
          overflow: 'hidden'
        }}>
          {/* Inner Brand Border */}
          <div style={{ position: 'absolute', top: '16px', bottom: '16px', left: '16px', right: '16px', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '4px', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '24px', bottom: '24px', left: '24px', right: '24px', border: '2px solid rgba(99, 102, 241, 0.6)', borderRadius: '2px', pointerEvents: 'none' }} />

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 'auto', position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-block', marginBottom: '24px' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '4px', color: 'var(--color-brand-primary)', textTransform: 'uppercase' }}>LearnFlow</span>
            </div>
            <h1 style={{ fontSize: '3.5rem', fontFamily: 'serif', color: 'white', margin: '0 0 16px 0', fontWeight: 400 }}>Certificate of Completion</h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem', letterSpacing: '1px' }}>This is to certify that</p>
          </div>

          {/* Student Name */}
          <div style={{ textAlign: 'center', marginBottom: 'auto', position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: '4rem', fontFamily: 'serif', color: 'var(--color-brand-secondary)', margin: 0, fontStyle: 'italic', borderBottom: '1px solid rgba(255,255,255,0.2)', display: 'inline-block', padding: '0 40px 16px 40px' }}>
              {certificate.user.name || 'Student'}
            </h2>
          </div>

          {/* Course details */}
          <div style={{ textAlign: 'center', marginBottom: 'auto', position: 'relative', zIndex: 1 }}>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem', marginBottom: '16px' }}>has successfully completed the {type}</p>
            <h3 style={{ fontSize: '2rem', color: 'white', margin: 0, fontWeight: 600 }}>{title}</h3>
          </div>

          {/* Footer signatures */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto', position: 'relative', zIndex: 1, padding: '0 40px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.3)', width: '200px', marginBottom: '8px', paddingBottom: '8px' }}>
                <span style={{ fontFamily: 'serif', fontStyle: 'italic', fontSize: '1.5rem', color: 'white' }}>{issueDate}</span>
              </div>
              <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Date Issued</span>
            </div>

            {/* Seal */}
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-brand-primary) 0%, var(--color-brand-secondary) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.5), inset 0 0 10px rgba(255,255,255,0.5)', position: 'relative' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px dashed rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.3)', width: '200px', marginBottom: '8px', paddingBottom: '8px' }}>
                <span style={{ fontFamily: 'serif', fontStyle: 'italic', fontSize: '1.5rem', color: 'white' }}>LearnFlow Team</span>
              </div>
              <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Instructor</span>
            </div>
          </div>
          
          {/* Verification ID */}
          <div style={{ position: 'absolute', bottom: '16px', left: 0, right: 0, textAlign: 'center' }}>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>Verification ID: {certificate.id}</p>
          </div>
        </div>

        <div style={{ marginTop: '48px', display: 'flex', gap: '16px' }}>
          <button className="btn btn-primary">
            Download PDF
          </button>
          <Link href="/dashboard" className="btn btn-secondary">
            Back to Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
