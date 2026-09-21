import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Status } from '@prisma/client';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function CareerRoadmapPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const session = await getServerSession(authOptions);
  
  const career = await prisma.careerPath.findUnique({
    where: { slug: resolvedParams.slug },
    include: {
      courses: {
        where: { status: Status.PUBLISHED },
        orderBy: { order: 'asc' },
        include: {
          modules: {
            where: { status: Status.PUBLISHED },
            orderBy: { order: 'asc' }
          }
        }
      }
    }
  });

  if (!career) {
    notFound();
  }

  // If user is logged in, check if they are enrolled
  let isEnrolled = false;
  if (session) {
    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id }
    });
    if (profile?.careerGoalId === career.id) {
      isEnrolled = true;
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <main style={{ flex: 1, padding: '40px 24px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        
        {/* Career Header */}
        <div style={{ marginBottom: '64px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>{career.title}</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto 32px' }}>
            {career.overview}
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            {isEnrolled ? (
              <Link href="/dashboard" className="btn btn-primary">Continue Learning</Link>
            ) : (
              <form action={async () => {
                'use server';
                const { enrollInCareer } = await import('@/actions/learning/enrollment');
                await enrollInCareer(career.id);
              }}>
                <button type="submit" className="btn btn-primary">Enroll Now</button>
              </form>
            )}
          </div>
          
          <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginTop: '32px', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            <span>⏱ {career.estimatedDuration}</span>
            <span>🛠 {career.coreSkills}</span>
          </div>
        </div>

        {/* Roadmap Roadmap */}
        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '32px' }}>Learning Roadmap</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {career.courses.map((course, index) => (
              <div key={course.id} className="card" style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-12px', left: '-12px', width: '32px', height: '32px', borderRadius: '16px', backgroundColor: 'var(--color-brand-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                  {index + 1}
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '16px', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '1.5rem' }}>{course.title}</h3>
                  {isEnrolled && (
                    <Link href={`/learn/${course.slug}`} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.875rem' }}>
                      Start Course &rarr;
                    </Link>
                  )}
                </div>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '24px', marginLeft: '16px' }}>{course.description}</p>
                
                <div style={{ marginLeft: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {course.modules.map((module) => (
                    <div key={module.id} style={{ padding: '16px', backgroundColor: 'var(--color-bg-primary)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                      <h4 style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{module.title}</h4>
                      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{module.description}</p>
                    </div>
                  ))}
                  {course.modules.length === 0 && (
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Modules are being added.</p>
                  )}
                </div>
              </div>
            ))}
            
            {career.courses.length === 0 && (
              <p style={{ color: 'var(--color-text-secondary)' }}>Courses are being developed for this path.</p>
            )}
          </div>
        </div>
        
      </main>
    </div>
  );
}
