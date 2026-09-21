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
          width: '100%', maxWidth: '900px', 
          backgroundColor: 'white', 
          color: '#1a1a1a',
          padding: '64px',
          borderRadius: '4px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          border: '1px solid #e5e7eb',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center'
        }}>
          {/* Decorative Elements */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '16px', background: 'linear-gradient(90deg, #8b5cf6, #3b82f6)' }}></div>
          <div style={{ position: 'absolute', top: '16px', left: '16px', right: '16px', bottom: '16px', border: '2px solid #f3f4f6', pointerEvents: 'none' }}></div>
          
          <div style={{ marginBottom: '48px', marginTop: '24px' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.05em', color: '#8b5cf6' }}>
              LearnFlow
            </span>
          </div>

          <h2 style={{ fontSize: '3rem', fontFamily: 'Georgia, serif', marginBottom: '48px', color: '#111827' }}>
            Certificate of Completion
          </h2>

          <p style={{ fontSize: '1.25rem', color: '#4b5563', marginBottom: '16px' }}>This is to certify that</p>
          
          <h3 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '32px', color: '#111827', borderBottom: '2px solid #e5e7eb', display: 'inline-block', paddingBottom: '8px', minWidth: '400px' }}>
            {certificate.user.name || 'Student'}
          </h3>

          <p style={{ fontSize: '1.25rem', color: '#4b5563', marginBottom: '16px' }}>has successfully completed the {type}</p>
          
          <h4 style={{ fontSize: '2rem', fontWeight: 600, color: '#3b82f6', marginBottom: '48px' }}>
            {title}
          </h4>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '64px', padding: '0 48px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ borderBottom: '1px solid #9ca3af', width: '200px', marginBottom: '8px', paddingBottom: '4px', fontSize: '1.125rem', fontWeight: 500 }}>
                {issueDate}
              </div>
              <span style={{ fontSize: '0.875rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date Issued</span>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ borderBottom: '1px solid #9ca3af', width: '200px', marginBottom: '8px', paddingBottom: '4px', fontSize: '1.125rem', fontWeight: 500, fontFamily: 'cursive' }}>
                LearnFlow Team
              </div>
              <span style={{ fontSize: '0.875rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Instructor</span>
            </div>
          </div>
          
          {/* Verification ID */}
          <div style={{ position: 'absolute', bottom: '32px', left: 0, right: 0, textAlign: 'center' }}>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Verification ID: {certificate.id}</p>
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
