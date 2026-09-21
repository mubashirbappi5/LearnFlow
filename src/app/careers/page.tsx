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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <main style={{ flex: 1, padding: '40px 24px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Explore Careers</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem' }}>
            Choose a career path below to view its complete learning roadmap.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
          {careers.map((career) => (
            <Link key={career.id} href={`/careers/${career.slug}`} className="card" style={{ display: 'block' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '12px', color: 'var(--color-text-primary)' }}>{career.title}</h2>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: '24px', flex: 1 }}>{career.description}</p>
              
              <div style={{ display: 'flex', gap: '16px', fontSize: '0.875rem', color: 'var(--color-text-muted)', borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
                <span>⏱ {career.estimatedDuration}</span>
                <span>📚 {career._count.courses} Courses</span>
              </div>
            </Link>
          ))}
          {careers.length === 0 && (
            <p style={{ color: 'var(--color-text-secondary)' }}>No career paths are currently available.</p>
          )}
        </div>
      </main>
    </div>
  );
}
