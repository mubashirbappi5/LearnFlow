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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <main style={{ flex: 1, padding: '40px 24px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Welcome back, {session.user.name || session.user.email?.split('@')[0]}</h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem' }}>
              Track your progress and continue your learning journey.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div style={{ textAlign: 'center', padding: '16px 24px', backgroundColor: 'var(--color-bg-secondary)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-brand-primary)' }}>{xp}</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total XP</div>
            </div>
            <div style={{ textAlign: 'center', padding: '16px 24px', backgroundColor: 'var(--color-bg-secondary)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-brand-secondary)' }}>{completedItems}</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Lessons Done</div>
            </div>
          </div>
        </div>

        {!profile?.careerGoal ? (
          <div className="card" style={{ textAlign: 'center', padding: '64px 24px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>You haven't enrolled in a Career Path yet.</h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
              Take our career assessment to get a personalized recommendation, or explore our career paths manually.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <Link href="/assessment" className="btn btn-primary">Take Assessment</Link>
              <Link href="/careers" className="btn btn-secondary">Explore Careers</Link>
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '32px' }}>
            {/* Main Content Area */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              
              {/* Career Goal Card */}
              <section className="card" style={{ padding: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                  <div>
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-brand-primary)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>Current Career Path</span>
                    <h2 style={{ fontSize: '2rem', marginTop: '8px' }}>{profile.careerGoal.title}</h2>
                  </div>
                  <div style={{ 
                    width: '64px', height: '64px', borderRadius: '32px', 
                    border: '4px solid var(--color-bg-tertiary)', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `conic-gradient(var(--color-brand-primary) ${progressPercent}%, transparent 0)`
                  }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '24px', backgroundColor: 'var(--color-bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', fontWeight: 'bold' }}>
                      {progressPercent}%
                    </div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div style={{ marginBottom: '32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                    <span>{completedItems} of {totalItems} completed</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--color-bg-tertiary)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${progressPercent}%`, backgroundColor: 'var(--color-brand-primary)', transition: 'width 1s ease-in-out' }}></div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <Link href={nextActionUrl} className="btn btn-primary" style={{ padding: '12px 32px', fontSize: '1.125rem' }}>
                    {nextActionLabel} &rarr;
                  </Link>
                </div>
              </section>

              {/* Recent Activity */}
              <section>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Recent Activity</h3>
                {recentLessons.length === 0 ? (
                  <div className="card" style={{ padding: '32px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                    You haven't completed any lessons yet. Time to get started!
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {recentLessons.map((progress) => (
                      <div key={progress.id} className="card" style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '0.875rem', color: 'var(--color-brand-secondary)', marginBottom: '4px' }}>
                            {progress.lesson.module.course.title}
                          </div>
                          <div style={{ fontSize: '1.125rem', fontWeight: 500 }}>
                            {progress.lesson.title}
                          </div>
                        </div>
                        <div style={{ color: 'var(--color-success)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
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
              <div className="card">
                <h3 style={{ fontSize: '1.25rem', marginBottom: '24px' }}>Your Gamification</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>🔥</div>
                    <div>
                      <div style={{ fontWeight: 600 }}>{passedQuizzes.length} Quizzes Passed</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>50 XP each</div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>📁</div>
                    <div>
                      <div style={{ fontWeight: 600 }}>{completedAssignments.length} Assignments</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>100 XP each</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Your Profile</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.875rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>Email</span>
                    <span>{session.user.email}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>Role</span>
                    <span>{session.user.role}</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
