import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Status } from '@prisma/client';

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || '';
  
  // Search for Career Paths
  const careers = await prisma.careerPath.findMany({
    where: {
      status: Status.PUBLISHED,
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { overview: { contains: query, mode: 'insensitive' } },
        { coreSkills: { contains: query, mode: 'insensitive' } }
      ]
    },
    take: 10
  });

  // Search for Courses
  const courses = await prisma.course.findMany({
    where: {
      status: Status.PUBLISHED,
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } }
      ]
    },
    take: 10
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <main style={{ flex: 1, padding: '40px 24px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Search Results</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem', marginBottom: '48px' }}>
          Showing results for "{query}"
        </p>

        {careers.length === 0 && courses.length === 0 && (
          <div className="card" style={{ padding: '48px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>No results found</h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>Try adjusting your search terms.</p>
          </div>
        )}

        {careers.length > 0 && (
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '24px', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>Career Paths</h2>
            <div style={{ display: 'grid', gap: '24px' }}>
              {careers.map((career) => (
                <div key={career.id} className="card" style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{career.title}</h3>
                  <p style={{ color: 'var(--color-text-secondary)', marginBottom: '16px' }}>{career.overview}</p>
                  <Link href={`/careers/${career.slug}`} className="btn btn-secondary">
                    View Career Path
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {courses.length > 0 && (
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '24px', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>Courses</h2>
            <div style={{ display: 'grid', gap: '24px' }}>
              {courses.map((course) => (
                <div key={course.id} className="card" style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{course.title}</h3>
                  <p style={{ color: 'var(--color-text-secondary)', marginBottom: '16px' }}>{course.description}</p>
                  <Link href={`/learn/${course.slug}`} className="btn btn-secondary">
                    Start Course
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
