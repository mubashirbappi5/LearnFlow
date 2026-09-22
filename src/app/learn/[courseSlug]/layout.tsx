import { Lock, Award, FileText, FolderOpen } from 'lucide-react';
import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import { Status } from '@prisma/client';
import { getLockedModuleIds } from '@/lib/courseProgress';

export default async function LearnLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ courseSlug: string }>;
}) {
  const resolvedParams = await params;
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }

  const course = await prisma.course.findUnique({
    where: { slug: resolvedParams.courseSlug },
    include: {
      modules: {
        where: { status: Status.PUBLISHED },
        orderBy: { order: 'asc' },
        include: {
          lessons: {
            where: { status: Status.PUBLISHED },
            orderBy: { order: 'asc' }
          },
          quizzes: {
            where: { status: Status.PUBLISHED }
          },
          assignments: {
            where: { status: Status.PUBLISHED }
          }
        }
      }
    }
  });

  if (!course) {
    notFound();
  }

  // Check enrollment
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: session.user.id,
        courseId: course.id,
      }
    }
  });

  if (!enrollment && session.user.role !== 'ADMIN') {
    redirect('/dashboard');
  }

  const completedLessons = session ? await prisma.lessonProgress.findMany({
    where: { userId: session.user.id, lesson: { module: { courseId: course.id } } },
    select: { lessonId: true }
  }) : [];
  const completedLessonIds = new Set(completedLessons.map(p => p.lessonId));

  const completedAssignments = session ? await prisma.assignmentSubmission.findMany({
    where: { userId: session.user.id, assignment: { module: { courseId: course.id } }, status: 'COMPLETED' },
    select: { assignmentId: true }
  }) : [];
  const completedAssignmentIds = new Set(completedAssignments.map(a => a.assignmentId));

  const quizAttempts = session ? await prisma.quizAttempt.findMany({
    where: { 
      userId: session.user.id, 
      quiz: { module: { courseId: course.id } },
      passed: true
    },
    include: { quiz: true }
  }) : [];
  const passedQuizModuleIds = new Set(quizAttempts.map(a => a.quiz.moduleId));

  const lockedModuleIds = await getLockedModuleIds(session.user.id, course.id, session.user.role);

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: 'var(--color-bg-primary)', overflow: 'hidden' }}>
      
      {/* Course Sidebar */}
      <aside style={{ width: '340px', backgroundColor: '#0d0d10', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '32px 24px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <Link href="/dashboard" className="hover-white" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', transition: 'color 0.2s' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Back to Dashboard
          </Link>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1.4 }}>{course.title}</h2>
        </div>
        
        <div className="sleek-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '24px 16px' }}>
          {course.modules.map((module, mIndex) => {
            const isLocked = lockedModuleIds.has(module.id);

            return (
            <div key={module.id} style={{ marginBottom: '32px', opacity: isLocked ? 0.5 : 1, pointerEvents: isLocked ? 'none' : 'auto' }}>
              <h3 style={{ 
                fontSize: '0.75rem', 
                fontWeight: 700, 
                color: 'var(--color-text-secondary)', 
                textTransform: 'uppercase', 
                letterSpacing: '0.1em', 
                marginBottom: '16px', 
                paddingLeft: '8px',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between' 
              }}>
                <span>MODULE {mIndex + 1} — {module.title}</span>
                {isLocked && <span title="Pass the previous module's quiz to unlock" style={{ fontSize: '1rem' }}><Lock size={16} className="inline" /></span>}
              </h3>
              
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {module.lessons.map((lesson, lIndex) => {
                  const isCompleted = completedLessonIds.has(lesson.id);
                  return (
                  <li key={lesson.id}>
                    <Link 
                      href={isLocked ? '#' : `/learn/${course.slug}/lesson/${lesson.id}`}
                      style={{ 
                        display: 'flex', 
                        padding: '12px', 
                        borderRadius: '8px', 
                        fontSize: '0.9rem', 
                        color: isCompleted ? 'var(--color-text-secondary)' : 'var(--color-text-primary)',
                        transition: 'all 0.2s ease',
                        alignItems: 'center'
                      }}
                      className={isLocked ? "" : "hover-bg"}
                    >
                      <span style={{ 
                        width: '24px',
                        marginRight: '12px', 
                        color: isCompleted ? 'var(--color-success)' : 'var(--color-text-muted)', 
                        fontSize: '0.875rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {isCompleted ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg> : `${lIndex + 1}.`}
                      </span>
                      <span style={{ textDecoration: isCompleted ? 'line-through' : 'none', opacity: isCompleted ? 0.7 : 1 }}>
                        {lesson.title}
                      </span>
                    </Link>
                  </li>
                )})}
                
                {module.quizzes.map((quiz) => {
                  const isPassed = passedQuizModuleIds.has(module.id);
                  return (
                  <li key={quiz.id} style={{ marginTop: '8px' }}>
                    <Link 
                      href={isLocked ? '#' : `/learn/${course.slug}/quiz/${quiz.id}`}
                      style={{ 
                        display: 'flex', 
                        padding: '12px', 
                        borderRadius: '8px', 
                        fontSize: '0.9rem', 
                        color: isPassed ? 'var(--color-text-secondary)' : 'var(--color-brand-primary)',
                        backgroundColor: isPassed ? 'transparent' : 'rgba(99, 102, 241, 0.08)',
                        border: isPassed ? '1px solid transparent' : '1px solid rgba(99, 102, 241, 0.2)',
                        transition: 'all 0.2s ease',
                        alignItems: 'center',
                        fontWeight: 500
                      }}
                      className={isLocked ? "" : "hover-lift"}
                    >
                      <span style={{ 
                        width: '24px',
                        marginRight: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {isPassed ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg> : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>}
                      </span>
                      <span style={{ textDecoration: isPassed ? 'line-through' : 'none', opacity: isPassed ? 0.7 : 1 }}>
                        {quiz.title}
                      </span>
                    </Link>
                  </li>
                )})}
                
                {module.assignments.map((assignment) => {
                  const isCompleted = completedAssignmentIds.has(assignment.id);
                  return (
                  <li key={assignment.id} style={{ marginTop: '8px' }}>
                    <Link 
                      href={isLocked ? '#' : `/learn/${course.slug}/assignment/${assignment.id}`}
                      style={{ 
                        display: 'flex', 
                        padding: '12px', 
                        borderRadius: '8px', 
                        fontSize: '0.9rem', 
                        color: isCompleted ? 'var(--color-text-secondary)' : 'var(--color-brand-secondary)',
                        backgroundColor: isCompleted ? 'transparent' : 'rgba(139, 92, 246, 0.08)',
                        border: isCompleted ? '1px solid transparent' : '1px solid rgba(139, 92, 246, 0.2)',
                        transition: 'all 0.2s ease',
                        alignItems: 'center',
                        fontWeight: 500
                      }}
                      className={isLocked ? "" : "hover-lift"}
                    >
                      <span style={{ 
                        width: '24px',
                        marginRight: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {isCompleted ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg> : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>}
                      </span>
                      <span style={{ textDecoration: isCompleted ? 'line-through' : 'none', opacity: isCompleted ? 0.7 : 1 }}>
                        {assignment.title}
                      </span>
                    </Link>
                  </li>
                )})}
              </ul>
            </div>
          )})}
        </div>
      </aside>
      
      {/* Main Learning Content Area */}
      <main className="sleek-scrollbar" style={{ flex: 1, overflowY: 'auto', backgroundColor: 'var(--color-bg-primary)', position: 'relative' }}>
        {children}
      </main>
      
    </div>
  );
}
