import { Lock, Award, FileText, FolderOpen } from 'lucide-react';
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Status } from '@prisma/client';

export default async function StudentDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  // Fetch user profile and enrolled career
  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
    include: { careerGoal: true }
  });

  const firstCourseId = profile?.careerGoal ? (await prisma.course.findFirst({ where: { careerPathId: profile.careerGoal.id }, orderBy: { order: 'asc' } }))?.id : undefined;

  const certificate = firstCourseId ? await prisma.certificate.findFirst({
    where: { userId: session.user.id, courseId: firstCourseId }
  }) : null;

  // Gamification Metrics Fetch
  const completedLessons = await prisma.lessonProgress.findMany({ where: { userId: session.user.id } });
  const completedAssignments = await prisma.assignmentSubmission.findMany({ where: { userId: session.user.id } }); // Treat submitted as points for now, or require COMPLETED
  const passedQuizzes = await prisma.quizAttempt.findMany({ where: { userId: session.user.id, passed: true } });

  const xp = (completedLessons.length * 10) + (passedQuizzes.length * 50) + (completedAssignments.length * 100);
  const completedLessonIds = new Set(completedLessons.map(l => l.lessonId));

  // Compute Career Progress & Find Next Lesson
  let totalItems = 0;
  let completedItems = 0;
  let nextActionUrl = profile?.careerGoal ? `/careers/${profile.careerGoal.slug}` : '';
  let foundNext = false;
  let nextActionLabel = 'Continue Learning';
  let recentActivity: any[] = [];

  if (profile?.careerGoal) {
    const career = await prisma.careerPath.findUnique({
      where: { id: profile.careerGoal.id },
      include: {
        courses: {
          where: { status: Status.PUBLISHED },
          orderBy: { order: 'asc' },
          include: {
            modules: {
              where: { status: Status.PUBLISHED },
              orderBy: { order: 'asc' },
              include: {
                lessons: { where: { status: Status.PUBLISHED }, orderBy: { order: 'asc' } }
              }
            }
          }
        }
      }
    });

    if (career) {
      for (const course of career.courses) {
        for (const module of course.modules) {
          for (const lesson of module.lessons) {
            totalItems++;
            if (completedLessonIds.has(lesson.id)) {
              completedItems++;
            } else if (!foundNext) {
              nextActionUrl = `/learn/${course.slug}/lesson/${lesson.id}`;
              nextActionLabel = `Continue: ${lesson.title}`;
              foundNext = true;
            }
          }
        }
      }
    }
  }

  const progressPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  // Recent Activity Feed
  const recentLessons = await prisma.lessonProgress.findMany({
    where: { userId: session.user.id },
    include: { lesson: { include: { module: { include: { course: true } } } } },
    orderBy: { completedAt: 'desc' },
    take: 3
  });

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      background: 'var(--color-bg-primary)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background glowing orbs */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 10 }}>
        <Navbar />
      </div>
      
      <main style={{ flex: 1, padding: '40px 24px', maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <h1 style={{ 
              fontSize: '3rem', 
              fontWeight: 800, 
              marginBottom: '12px',
              background: 'linear-gradient(to right, #fff, #a5b4fc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em'
            }}>
              Welcome back, {session.user.name || session.user.email?.split('@')[0]}
            </h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem', fontWeight: 500 }}>
              Track your progress and continue your learning journey.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div className="hover-lift" style={{ 
              textAlign: 'center', 
              padding: '20px 32px', 
              background: 'var(--color-bg-secondary)', 
              backdropFilter: 'blur(12px)',
              borderRadius: '20px', 
              border: '1px solid var(--color-glass)',
              boxShadow: '0 8px 32px var(--color-input-bg)',
              transition: 'transform 0.2s',
              cursor: 'default'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#60a5fa', textShadow: '0 0 20px rgba(96,165,250,0.4)' }}>{xp}</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginTop: '4px' }}>Total XP</div>
            </div>
            <div className="hover-lift" style={{ 
              textAlign: 'center', 
              padding: '20px 32px', 
              background: 'var(--color-bg-secondary)', 
              backdropFilter: 'blur(12px)',
              borderRadius: '20px', 
              border: '1px solid var(--color-glass)',
              boxShadow: '0 8px 32px var(--color-input-bg)',
              transition: 'transform 0.2s',
              cursor: 'default'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#a78bfa', textShadow: '0 0 20px rgba(167,139,250,0.4)' }}>{completedItems}</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginTop: '4px' }}>Lessons Done</div>
            </div>
          </div>
        </div>

        {!profile?.careerGoal ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '80px 24px', 
            background: 'var(--color-bg-secondary)',
            backdropFilter: 'blur(12px)',
            borderRadius: '24px',
            border: '1px solid var(--color-glass)'
          }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '16px', fontWeight: 700 }}>You haven't enrolled in a Career Path yet.</h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px', fontSize: '1.125rem' }}>
              Take our career assessment to get a personalized recommendation, or explore our career paths manually.
            </p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
              <Link href="/assessment" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.125rem', borderRadius: '12px', background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', boxShadow: '0 4px 14px rgba(59,130,246,0.4)' }}>Take Assessment</Link>
              <Link href="/careers" className="btn btn-secondary" style={{ padding: '16px 32px', fontSize: '1.125rem', borderRadius: '12px', background: 'var(--color-glass)', border: '1px solid var(--color-glass-strong)' }}>Explore Careers</Link>
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '32px' }}>
            {/* Main Content Area */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              
              {/* Career Goal Card */}
              <section style={{ 
                padding: '40px', 
                background: 'linear-gradient(145deg, rgba(30,30,40,0.8) 0%, rgba(20,20,25,0.9) 100%)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Subtle top border glow */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.5), transparent)' }} />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                  <div>
                    <span style={{ fontSize: '0.875rem', color: '#60a5fa', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.1em' }}>Current Career Path</span>
                    <h2 style={{ fontSize: '2.25rem', marginTop: '12px', fontWeight: 800, letterSpacing: '-0.02em' }}>{profile.careerGoal.title}</h2>
                  </div>
                  <div style={{ 
                    width: '80px', height: '80px', borderRadius: '40px', 
                    border: '6px solid var(--color-glass)', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `conic-gradient(#3b82f6 ${progressPercent}%, transparent 0)`,
                    boxShadow: '0 0 20px rgba(59,130,246,0.2)'
                  }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '32px', backgroundColor: '#18181b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.125rem', fontWeight: 800 }}>
                      {progressPercent}%
                    </div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div style={{ marginBottom: '40px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.875rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                    <span>{completedItems} of {totalItems} modules completed</span>
                    <span style={{ color: '#60a5fa' }}>{100 - progressPercent}% remaining</span>
                  </div>
                  <div style={{ width: '100%', height: '10px', backgroundColor: 'var(--color-glass)', borderRadius: '5px', overflow: 'hidden' }}>
                    <div style={{ 
                      height: '100%', 
                      width: `${progressPercent}%`, 
                      background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', 
                      transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: '0 0 10px rgba(59,130,246,0.5)'
                    }}></div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  {progressPercent === 100 ? (
                    certificate ? (
                      <Link href={`/certificates/${certificate.id}`} className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.125rem', borderRadius: '12px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: 'none', boxShadow: '0 4px 14px rgba(16,185,129,0.4)', fontWeight: 600 }}>
                        View Certificate <Award size={16} className="inline" />
                      </Link>
                    ) : (
                      <form action={async () => {
                        'use server';
                        const { issueCourseCertificate } = await import('@/actions/learning/certificate');
                        const certId = await issueCourseCertificate(firstCourseId!);
                        redirect(`/certificates/${certId}`);
                      }}>
                        <button type="submit" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.125rem', borderRadius: '12px', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', border: 'none', boxShadow: '0 4px 14px rgba(245,158,11,0.4)', fontWeight: 600, cursor: 'pointer' }}>
                          Claim Certificate 🎓
                        </button>
                      </form>
                    )
                  ) : (
                    <Link href={nextActionUrl} className="btn btn-primary" style={{ 
                      padding: '16px 32px', 
                      fontSize: '1.125rem', 
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                      border: 'none',
                      boxShadow: '0 4px 14px rgba(59,130,246,0.4)',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      {nextActionLabel} 
                      <span style={{ transition: 'transform 0.2s' }}>&rarr;</span>
                    </Link>
                  )}
                </div>
              </section>

              {/* Recent Activity */}
              <section style={{ 
                padding: '32px', 
                background: 'var(--color-bg-secondary)',
                backdropFilter: 'blur(12px)',
                borderRadius: '24px',
                border: '1px solid var(--color-glass)'
              }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', fontWeight: 700 }}>Recent Activity</h3>
                {recentLessons.length === 0 ? (
                  <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-secondary)', background: 'var(--color-input-bg)', borderRadius: '16px' }}>
                    You haven't completed any lessons yet. Time to get started!
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {recentLessons.map((progress) => (
                      <div key={progress.id} className="hover-bg" style={{ 
                        padding: '20px 24px', 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: '16px',
                        border: '1px solid var(--color-glass)',
                        transition: 'background 0.2s'
                      }}>
                        <div>
                          <div style={{ fontSize: '0.875rem', color: '#a78bfa', marginBottom: '6px', fontWeight: 600 }}>
                            {progress.lesson.module.course.title}
                          </div>
                          <div style={{ fontSize: '1.125rem', fontWeight: 600 }}>
                            {progress.lesson.title}
                          </div>
                        </div>
                        <div style={{ 
                          color: '#10b981', 
                          fontWeight: 700, 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '8px',
                          background: 'rgba(16,185,129,0.1)',
                          padding: '8px 16px',
                          borderRadius: '20px'
                        }}>
                          <span>+10 XP</span>
                          <span>✓</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>

            {/* Sidebar Area */}
            <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ 
                padding: '32px', 
                background: 'var(--color-bg-secondary)',
                backdropFilter: 'blur(12px)',
                borderRadius: '24px',
                border: '1px solid var(--color-glass)'
              }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '24px', fontWeight: 700 }}>Your Gamification</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ 
                      width: '48px', height: '48px', borderRadius: '12px', 
                      background: 'linear-gradient(135deg, rgba(239,68,68,0.2), rgba(245,158,11,0.2))', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem',
                      border: '1px solid rgba(239,68,68,0.1)'
                    }}>🔥</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '1.125rem' }}>{passedQuizzes.length} Quizzes</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>50 XP each</div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ 
                      width: '48px', height: '48px', borderRadius: '12px', 
                      background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(59,130,246,0.2))', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem',
                      border: '1px solid rgba(139,92,246,0.1)'
                    }}><FolderOpen size={16} className="inline" /></div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '1.125rem' }}>{completedAssignments.length} Assignments</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>100 XP each</div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ 
                padding: '32px', 
                background: 'var(--color-bg-secondary)',
                backdropFilter: 'blur(12px)',
                borderRadius: '24px',
                border: '1px solid var(--color-glass)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Your Profile</h3>
                  <Link href="/settings" style={{ fontSize: '0.875rem', color: '#60a5fa', fontWeight: 500 }} className="hover-white">Edit</Link>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.875rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--color-glass)' }}>
                    <span style={{ color: 'var(--color-text-secondary)', fontWeight: 500 }}>Email</span>
                    <span style={{ fontWeight: 600 }}>{session.user.email}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--color-glass)' }}>
                    <span style={{ color: 'var(--color-text-secondary)', fontWeight: 500 }}>Role</span>
                    <span style={{ 
                      fontWeight: 700, 
                      color: session.user.role === 'ADMIN' ? '#f59e0b' : '#3b82f6',
                      background: session.user.role === 'ADMIN' ? 'rgba(245,158,11,0.1)' : 'rgba(59,130,246,0.1)',
                      padding: '4px 12px',
                      borderRadius: '12px'
                    }}>{session.user.role}</span>
                  </div>
                  
                  <Link href="/dashboard/library" className="btn btn-secondary hover-lift" style={{ width: '100%', textAlign: 'center', marginTop: '8px' }}>
                    View My Library (Notes & Bookmarks)
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
