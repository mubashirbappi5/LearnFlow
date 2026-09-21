import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import { Status } from '@prisma/client';

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
    // If not enrolled and not admin, send them to the career page to enroll
    // For now, redirect to dashboard
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

  // Quizzes passing threshold could be checked via quizAttempts, but for MVP we skip quiz checkmarks for now 
  // or just show them without checkmarks.

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: 'var(--color-bg-primary)', overflow: 'hidden' }}>
      
      {/* Course Sidebar */}
      <aside style={{ width: '320px', backgroundColor: 'var(--color-bg-secondary)', borderRight: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '24px 16px', borderBottom: '1px solid var(--color-border)' }}>
          <Link href="/dashboard" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', display: 'inline-block', marginBottom: '12px' }}>
            &larr; Back to Dashboard
          </Link>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>{course.title}</h2>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          {course.modules.map((module, mIndex) => (
            <div key={module.id} style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                Module {mIndex + 1}: {module.title}
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {module.lessons.map((lesson, lIndex) => {
                  const isCompleted = completedLessonIds.has(lesson.id);
                  return (
                  <li key={lesson.id}>
                    <Link 
                      href={`/learn/${course.slug}/lesson/${lesson.id}`}
                      style={{ 
                        display: 'flex', 
                        padding: '10px 12px', 
                        borderRadius: '6px', 
                        fontSize: '0.875rem', 
                        color: isCompleted ? 'var(--color-text-secondary)' : 'var(--color-text-primary)',
                        transition: 'background-color 0.2s',
                        alignItems: 'center'
                      }}
                      className="hover-white"
                    >
                      <span style={{ marginRight: '12px', color: isCompleted ? 'var(--color-success)' : 'var(--color-text-muted)', fontSize: isCompleted ? '1rem' : '0.875rem' }}>
                        {isCompleted ? '✓' : `${lIndex + 1}.`}
                      </span>
                      <span style={{ textDecoration: isCompleted ? 'line-through' : 'none', opacity: isCompleted ? 0.7 : 1 }}>
                        {lesson.title}
                      </span>
                    </Link>
                  </li>
                )})}
                {module.quizzes.map((quiz) => (
                  <li key={quiz.id} style={{ marginTop: '8px' }}>
                    <Link 
                      href={`/learn/${course.slug}/quiz/${quiz.id}`}
                      style={{ 
                        display: 'flex', 
                        padding: '10px 12px', 
                        borderRadius: '6px', 
                        fontSize: '0.875rem', 
                        color: 'var(--color-brand-primary)',
                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                        transition: 'background-color 0.2s',
                        alignItems: 'center',
                        fontWeight: 500
                      }}
                      className="hover-white"
                    >
                      <span style={{ marginRight: '12px' }}>🎯</span>
                      {quiz.title}
                    </Link>
                  </li>
                ))}
                {module.assignments.map((assignment) => {
                  const isCompleted = completedAssignmentIds.has(assignment.id);
                  return (
                  <li key={assignment.id} style={{ marginTop: '8px' }}>
                    <Link 
                      href={`/learn/${course.slug}/assignment/${assignment.id}`}
                      style={{ 
                        display: 'flex', 
                        padding: '10px 12px', 
                        borderRadius: '6px', 
                        fontSize: '0.875rem', 
                        color: isCompleted ? 'var(--color-text-secondary)' : 'var(--color-brand-secondary)',
                        backgroundColor: isCompleted ? 'transparent' : 'rgba(139, 92, 246, 0.1)',
                        transition: 'background-color 0.2s',
                        alignItems: 'center',
                        fontWeight: 500
                      }}
                      className="hover-white"
                    >
                      <span style={{ marginRight: '12px' }}>{isCompleted ? '✓' : '📝'}</span>
                      <span style={{ textDecoration: isCompleted ? 'line-through' : 'none', opacity: isCompleted ? 0.7 : 1 }}>
                        {assignment.title}
                      </span>
                    </Link>
                  </li>
                )})}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Learning Content Area */}
      <main style={{ flex: 1, overflowY: 'auto', backgroundColor: 'var(--color-bg-primary)', position: 'relative' }}>
        {children}
      </main>
      
    </div>
  );
}
