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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg-primary)', overflow: 'hidden' }}>
      <Navbar />
      
      {/* Premium Immersive Hero Section */}
      <div style={{
        position: 'relative',
        padding: '120px 24px 160px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      }}>
        {/* Deep Glowing Background */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(180deg, rgba(15,15,20,0.2) 0%, var(--color-bg-primary) 100%)', zIndex: 0 }}></div>
        <div className="animate-pulse-glow" style={{ position: 'absolute', top: '-10%', left: '20%', width: '60vw', height: '40vw', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 60%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }}></div>
        <div style={{ position: 'absolute', bottom: '0', right: '10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 60%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }}></div>

        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 20px', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--color-text-secondary)', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '32px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-brand-primary)', boxShadow: '0 0 10px var(--color-brand-primary)' }}></span>
            Career Path
          </div>
          
          <h1 style={{ fontSize: '4.5rem', fontWeight: 800, marginBottom: '24px', lineHeight: 1.1, letterSpacing: '-0.02em', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }} className="text-gradient">
            {career.title}
          </h1>
          
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto 48px', lineHeight: 1.7 }}>
            {career.overview}
          </p>

          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            {isEnrolled ? (
              <Link href="/dashboard" className="btn btn-primary hover-lift" style={{ padding: '16px 48px', fontSize: '1.125rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 10px 30px rgba(99, 102, 241, 0.3)' }}>
                Continue Learning <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </Link>
            ) : (
              <form action={async () => {
                'use server';
                const { enrollInCareer } = await import('@/actions/learning/enrollment');
                await enrollInCareer(career.id);
              }}>
                <button type="submit" className="btn btn-primary hover-lift" style={{ padding: '16px 48px', fontSize: '1.125rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 10px 30px rgba(99, 102, 241, 0.3)' }}>
                  Enroll in Career Path <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Floating Stats Panel */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px', margin: '-80px auto 0', width: '100%', padding: '0 24px' }}>
        <div className="glass-panel hover-glow" style={{ 
          padding: '40px',
          background: 'linear-gradient(135deg, rgba(30,30,36,0.8) 0%, rgba(15,15,20,0.95) 100%)',
          borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '32px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.4)'
        }}>
          <div style={{ textAlign: 'center', flex: 1, minWidth: '120px' }}>
            <svg style={{ margin: '0 auto 12px', color: 'var(--color-brand-primary)' }} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'white', lineHeight: 1 }}>{career.estimatedDuration}</div>
            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '8px' }}>Timeline</div>
          </div>
          
          <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.08)' }}></div>
          
          <div style={{ textAlign: 'center', flex: 1, minWidth: '120px' }}>
            <svg style={{ margin: '0 auto 12px', color: 'var(--color-brand-secondary)' }} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'white', lineHeight: 1 }}>{totalCourses}</div>
            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '8px' }}>Courses</div>
          </div>
          
          <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.08)' }}></div>
          
          <div style={{ textAlign: 'center', flex: 1, minWidth: '120px' }}>
            <svg style={{ margin: '0 auto 12px', color: 'var(--color-brand-primary)' }} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'white', lineHeight: 1 }}>{totalModules}</div>
            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '8px' }}>Modules</div>
          </div>
          
          <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.08)' }}></div>
          
          <div style={{ textAlign: 'center', flex: 1, minWidth: '120px' }}>
            <svg style={{ margin: '0 auto 12px', color: 'var(--color-brand-secondary)' }} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'white', lineHeight: 1 }}>{totalLessons}</div>
            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '8px' }}>Lessons</div>
          </div>
        </div>
      </div>

      <main style={{ flex: 1, padding: '120px 24px', maxWidth: '1000px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        
        {/* Core Skills section */}
        <div style={{ marginBottom: '100px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '40px', textAlign: 'center' }}>Skills You Will Master</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
            {career.coreSkills?.split(',').map((skill, i) => (
              <div key={i} className="hover-lift" style={{ 
                padding: '14px 28px', 
                backgroundColor: 'rgba(255,255,255,0.03)', 
                color: 'var(--color-text-primary)', 
                borderRadius: '100px', 
                fontSize: '1.125rem',
                fontWeight: 500,
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.3s',
                cursor: 'default'
              }}>
                <span style={{ color: 'var(--color-brand-primary)' }}>✦</span>
                {skill.trim()}
              </div>
            ))}
          </div>
        </div>

        {/* Roadmap Tech Tree Timeline */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '16px' }}>The Learning Roadmap</h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.25rem' }}>A structured, step-by-step path from beginner to professional.</p>
          </div>
          
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '64px', paddingLeft: '16px' }}>
            {/* Glowing Vertical Line */}
            <div style={{ position: 'absolute', left: '46px', top: '32px', bottom: '0', width: '4px', background: 'linear-gradient(180deg, var(--color-brand-primary) 0%, rgba(99,102,241,0.1) 100%)', zIndex: 0, borderRadius: '4px' }}></div>

            {career.courses.map((course, index) => (
              <div key={course.id} style={{ position: 'relative', display: 'flex', gap: '48px', zIndex: 1 }}>
                
                {/* Tech Node */}
                <div style={{ 
                  width: '64px', height: '64px', borderRadius: '50%', 
                  backgroundColor: 'var(--color-bg-primary)', 
                  border: '4px solid var(--color-brand-primary)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  fontWeight: 800, fontSize: '1.5rem', flexShrink: 0,
                  boxShadow: '0 0 20px rgba(99, 102, 241, 0.4), inset 0 0 10px rgba(99, 102, 241, 0.2)',
                  color: 'var(--color-brand-primary)'
                }}>
                  {index + 1}
                </div>
                
                {/* Content Card */}
                <div className="card hover-glow" style={{ flex: 1, padding: '40px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)', backgroundColor: 'var(--color-bg-secondary)', transition: 'all 0.3s' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                    <div style={{ flex: 1, minWidth: '250px' }}>
                      <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '12px', lineHeight: 1.2 }}>{course.title}</h3>
                      <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem', lineHeight: 1.6 }}>{course.description}</p>
                    </div>
                    {isEnrolled && (
                      <Link href={`/learn/${course.slug}`} className="btn btn-secondary hover-lift" style={{ padding: '12px 28px', whiteSpace: 'nowrap', borderRadius: '12px' }}>
                        Start Course <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '8px' }}><polyline points="9 18 15 12 9 6"></polyline></svg>
                      </Link>
                    )}
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginTop: '32px' }}>
                    {course.modules.map((module, mIndex) => (
                      <div key={module.id} style={{ 
                        padding: '20px', 
                        backgroundColor: 'rgba(255,255,255,0.02)', 
                        borderRadius: '16px', 
                        border: '1px solid rgba(255,255,255,0.05)',
                        borderLeft: '4px solid var(--color-brand-secondary)',
                        transition: 'transform 0.2s',
                      }} className="hover-lift">
                        <h4 style={{ fontWeight: 600, fontSize: '1.125rem', marginBottom: '8px', lineHeight: 1.4 }}>
                          <span style={{ color: 'var(--color-brand-secondary)', marginRight: '8px', fontSize: '0.875rem' }}>M{mIndex + 1}</span> 
                          {module.title}
                        </h4>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                          {module.lessons.length} lessons
                        </p>
                      </div>
                    ))}
                    {course.modules.length === 0 && (
                      <div style={{ padding: '20px', color: 'var(--color-text-muted)', fontStyle: 'italic', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '16px' }}>
                        Modules are currently being developed.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {career.courses.length === 0 && (
              <div style={{ textAlign: 'center', padding: '64px', color: 'var(--color-text-secondary)', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '24px' }}>
                <svg style={{ margin: '0 auto 16px', color: 'var(--color-text-muted)' }} width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                Courses are being actively developed for this path.
              </div>
            )}
          </div>
        </div>
        
      </main>
    </div>
  );
}
