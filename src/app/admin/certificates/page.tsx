import React from 'react';
import { prisma } from '@/lib/prisma';

export default async function AdminCertificatesPage() {
  const certificates = await prisma.certificate.findMany({
    orderBy: { issuedAt: 'desc' },
    include: {
      user: true,
      course: true,
    }
  });

  return (
    <div>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '8px' }}>Certificates Dashboard</h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>Track issued certificates and preview certificate designs.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '48px' }}>
        {/* Certificate Preview Section */}
        <div style={{ gridColumn: '1 / -1' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '24px' }}>Premium Certificate Design Preview</h2>
          
          <div style={{ 
            background: 'linear-gradient(135deg, #111827 0%, #0f172a 100%)', 
            padding: '24px', 
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.05)',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            position: 'relative'
          }}>
            {/* Background Glows */}
            <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '300px', height: '300px', background: '#fbbf24', filter: 'blur(150px)', opacity: 0.15, borderRadius: '50%' }} />
            <div style={{ position: 'absolute', bottom: '-100px', right: '-100px', width: '300px', height: '300px', background: 'var(--color-brand-primary)', filter: 'blur(150px)', opacity: 0.15, borderRadius: '50%' }} />

            {/* Certificate Canvas */}
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
              {/* Inner Gold Border */}
              <div style={{ position: 'absolute', top: '16px', bottom: '16px', left: '16px', right: '16px', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '4px', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: '24px', bottom: '24px', left: '24px', right: '24px', border: '2px solid rgba(251, 191, 36, 0.6)', borderRadius: '2px', pointerEvents: 'none' }} />

              {/* Header */}
              <div style={{ textAlign: 'center', marginBottom: 'auto', position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'inline-block', marginBottom: '24px' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '4px', color: '#fbbf24', textTransform: 'uppercase' }}>LearnFlow</span>
                </div>
                <h1 style={{ fontSize: '3.5rem', fontFamily: 'serif', color: 'white', margin: '0 0 16px 0', fontWeight: 400 }}>Certificate of Completion</h1>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem', letterSpacing: '1px' }}>This is to certify that</p>
              </div>

              {/* Student Name */}
              <div style={{ textAlign: 'center', marginBottom: 'auto', position: 'relative', zIndex: 1 }}>
                <h2 style={{ fontSize: '4rem', fontFamily: 'serif', color: '#fbbf24', margin: 0, fontStyle: 'italic', borderBottom: '1px solid rgba(255,255,255,0.2)', display: 'inline-block', padding: '0 40px 16px 40px' }}>
                  John Doe
                </h2>
              </div>

              {/* Course details */}
              <div style={{ textAlign: 'center', marginBottom: 'auto', position: 'relative', zIndex: 1 }}>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem', marginBottom: '16px' }}>has successfully completed the course</p>
                <h3 style={{ fontSize: '2rem', color: 'white', margin: 0, fontWeight: 600 }}>Backend Engineering Masterclass</h3>
              </div>

              {/* Footer signatures */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto', position: 'relative', zIndex: 1, padding: '0 40px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ borderBottom: '1px solid rgba(255,255,255,0.3)', width: '200px', marginBottom: '8px', paddingBottom: '8px' }}>
                    <span style={{ fontFamily: 'serif', fontStyle: 'italic', fontSize: '1.5rem', color: 'white' }}>Sept 22, 2026</span>
                  </div>
                  <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Date Issued</span>
                </div>

                {/* Seal */}
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'radial-gradient(circle, #fbbf24 0%, #b45309 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.5), inset 0 0 10px rgba(255,255,255,0.5)', position: 'relative' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px dashed rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ borderBottom: '1px solid rgba(255,255,255,0.3)', width: '200px', marginBottom: '8px', paddingBottom: '8px' }}>
                    <span style={{ fontFamily: 'serif', fontStyle: 'italic', fontSize: '1.5rem', color: 'white' }}>LearnFlow Admin</span>
                  </div>
                  <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Lead Instructor</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card glass-panel" style={{ padding: '32px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '24px' }}>Issued Certificates History</h3>
        
        {certificates.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-secondary)' }}>
            No certificates have been issued yet.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <th style={{ padding: '12px 16px', color: 'var(--color-text-secondary)', fontWeight: 500, fontSize: '0.875rem' }}>Certificate ID</th>
                  <th style={{ padding: '12px 16px', color: 'var(--color-text-secondary)', fontWeight: 500, fontSize: '0.875rem' }}>Student</th>
                  <th style={{ padding: '12px 16px', color: 'var(--color-text-secondary)', fontWeight: 500, fontSize: '0.875rem' }}>Course</th>
                  <th style={{ padding: '12px 16px', color: 'var(--color-text-secondary)', fontWeight: 500, fontSize: '0.875rem' }}>Date Issued</th>
                </tr>
              </thead>
              <tbody>
                {certificates.map((cert) => (
                  <tr key={cert.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '16px', fontFamily: 'monospace', color: 'var(--color-brand-primary)' }}>
                      {cert.certificateId}
                    </td>
                    <td style={{ padding: '16px', fontWeight: 500, color: 'white' }}>
                      {cert.user.name || cert.user.email}
                    </td>
                    <td style={{ padding: '16px', color: 'var(--color-text-secondary)' }}>
                      {cert.course.title}
                    </td>
                    <td style={{ padding: '16px', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                      {new Date(cert.issuedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
