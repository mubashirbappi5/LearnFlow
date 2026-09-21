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
            orderBy: { order: 'asc' },
            include: {
              lessons: { where: { status: Status.PUBLISHED } }
            }
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

  const totalCourses = career.courses.length;
  const totalModules = career.courses.reduce((acc, c) => acc + c.modules.length, 0);
  const totalLessons = career.courses.reduce((acc, c) => acc + c.modules.reduce((mAcc, m) => mAcc + m.lessons.length, 0), 0);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg-primary)' }}>
      <Navbar />
      
      {/* Premium Hero Section */}
      <div style={{
        position: 'relative',
        padding: '100px 24px',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)'
      }}>
        {/* Background glow effects */}
        <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '50%', height: '100%', background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '50%', height: '100%', background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }}></div>

        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ display: 'inline-block', padding: '6px 16px', borderRadius: '24px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--color-text-secondary)', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '24px' }}>
            Career Path
          </div>
          <h1 style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '24px', lineHeight: 1.1 }} className="text-gradient">
            {career.title}
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto 40px', lineHeight: 1.6 }}>
            {career.overview}
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            {isEnrolled ? (
              <Link href="/dashboard" className="btn btn-primary" style={{ padding: '16px 40px', fontSize: '1.125rem' }}>Continue Learning &rarr;</Link>
            ) : (
              <form action={async () => {
                'use server';
                const { enrollInCareer } = await import('@/actions/learning/enrollment');
                await enrollInCareer(career.id);
              }}>
                <button type="submit" className="btn btn-primary" style={{ padding: '16px 40px', fontSize: '1.125rem' }}>Enroll in Career Path</button>
              </form>
            )}
          </div>

          {/* Stats Glass Card */}
          <div style={{ 
            marginTop: '64px',
            padding: '32px',
            background: 'rgba(20, 20, 25, 0.6)',
            backdropFilter: 'blur(16px)',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: '24px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>{career.estimatedDuration}</div>
              <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>Timeline</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>{totalCourses}</div>
              <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>Courses</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>{totalModules}</div>
              <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>Modules</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>{totalLessons}</div>
              <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>Lessons</div>
            </div>
          </div>
        </div>
      </div>

      <main style={{ flex: 1, padding: '80px 24px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        
        {/* Core Skills section */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '32px', textAlign: 'center' }}>What you will master</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {career.coreSkills?.split(',').map((skill, i) => (
              <span key={i} style={{ 
                padding: '12px 24px', 
                backgroundColor: 'rgba(59, 130, 246, 0.1)', 
                color: 'var(--color-brand-secondary)', 
                borderRadius: '100px', 
                fontSize: '1.125rem',
                border: '1px solid rgba(59, 130, 246, 0.2)'
              }}>
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>

        {/* Roadmap Timeline */}
        <div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '48px', textAlign: 'center' }}>The Learning Roadmap</h2>
          
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {/* Vertical Line */}
            <div style={{ position: 'absolute', left: '32px', top: '24px', bottom: '0', width: '2px', backgroundColor: 'rgba(255,255,255,0.1)', zIndex: 0 }}></div>

            {career.courses.map((course, index) => (
              <div key={course.id} style={{ position: 'relative', display: 'flex', gap: '48px', zIndex: 1 }}>
                
                {/* Node */}
                <div style={{ 
                  width: '64px', height: '64px', borderRadius: '32px', 
                  backgroundColor: 'var(--color-bg-primary)', 
                  border: '4px solid var(--color-brand-primary)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  fontWeight: 'bold', fontSize: '1.5rem', flexShrink: 0,
                  boxShadow: '0 0 20px rgba(59,130,246,0.3)'
                }}>
                  {index + 1}
                </div>
                
                {/* Content Card */}
                <div className="card" style={{ flex: 1, padding: '32px', border: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'var(--color-bg-secondary)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.75rem', marginBottom: '8px' }}>{course.title}</h3>
                      <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem' }}>{course.description}</p>
                    </div>
                    {isEnrolled && (
                      <Link href={`/learn/${course.slug}`} className="btn btn-secondary" style={{ padding: '8px 24px', whiteSpace: 'nowrap' }}>
                        Start Course &rarr;
                      </Link>
                    )}
                  </div>
                  
                  <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {course.modules.map((module, mIndex) => (
                      <div key={module.id} style={{ 
                        padding: '16px 24px', 
                        backgroundColor: 'rgba(0,0,0,0.2)', 
                        borderRadius: '12px', 
                        borderLeft: '4px solid var(--color-brand-secondary)'
                      }}>
                        <h4 style={{ fontWeight: 600, fontSize: '1.125rem', marginBottom: '4px' }}>
                          <span style={{ color: 'var(--color-brand-secondary)', marginRight: '8px' }}>M{mIndex + 1}</span> 
                          {module.title}
                        </h4>
                        <p style={{ color: 'var(--color-text-muted)' }}>{module.lessons.length} lessons</p>
                      </div>
                    ))}
                    {course.modules.length === 0 && (
                      <div style={{ padding: '16px', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>Modules are currently being developed.</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {career.courses.length === 0 && (
              <div style={{ textAlign: 'center', padding: '48px', color: 'var(--color-text-secondary)' }}>
                Courses are being developed for this path.
              </div>
            )}
          </div>
        </div>
        
      </main>
    </div>
  );
}
