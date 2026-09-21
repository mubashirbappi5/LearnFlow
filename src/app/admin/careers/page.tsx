import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { deleteCareer } from '@/actions/admin/careers';

export default async function AdminCareersPage() {
  const careers = await prisma.careerPath.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { courses: true }
      }
    }
  });

  return (
    <div className="space-y-6 animate-fade-in" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Manage Career Paths</h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>Create, edit, and organize the learning paths available to students.</p>
        </div>
        <Link href="/admin/careers/new" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '1.125rem' }}>
          + New Career Path
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
        {careers.map(career => (
          <div key={career.id} className="card hover-glow" style={{ padding: '24px', display: 'flex', flexDirection: 'column', border: '1px solid rgba(255,255,255,0.05)', transition: 'all 0.3s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'white' }}>{career.title}</h2>
              <span style={{ 
                padding: '4px 12px', 
                fontSize: '0.75rem', 
                fontWeight: 'bold', 
                borderRadius: '100px', 
                backgroundColor: career.status === 'PUBLISHED' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                color: career.status === 'PUBLISHED' ? '#4ade80' : 'var(--color-text-secondary)',
                border: career.status === 'PUBLISHED' ? '1px solid rgba(34, 197, 94, 0.2)' : '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                {career.status}
              </span>
            </div>
            
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '24px', flex: 1 }}>
              {career.description || 'No description provided.'}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                📚 {career._count.courses} Courses attached
              </div>
              
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <Link href={`/admin/careers/${career.id}`} style={{ color: 'var(--color-brand-primary)', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none' }} className="hover-white">
                  Edit &rarr;
                </Link>
                <form action={deleteCareer.bind(null, career.id)} style={{ margin: 0 }}>
                  <button type="submit" style={{ color: 'var(--color-error)', fontWeight: 600, fontSize: '0.875rem', background: 'none', border: 'none', cursor: 'pointer' }} className="hover-white">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}

        {careers.length === 0 && (
          <div style={{ gridColumn: '1 / -1', padding: '64px', textAlign: 'center', backgroundColor: 'var(--color-bg-secondary)', borderRadius: '16px' }}>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem' }}>No career paths found. Create one to get started!</p>
          </div>
        )}
      </div>
    </div>
  )
}
