import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { Status } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getLockedModuleIds } from '@/lib/courseProgress';
import { redirect } from 'next/navigation';
import BookmarkButton from '@/components/learning/BookmarkButton';
import NotesSection from '@/components/learning/NotesSection';

export default async function LessonPage({ params }: { params: Promise<{ courseSlug: string, lessonId: string }> }) {
  const resolvedParams = await params;
  const session = await getServerSession(authOptions);
  
  const lesson = await prisma.lesson.findUnique({
    where: { id: resolvedParams.lessonId },
    include: {
      module: true,
      resources: {
        where: { status: Status.PUBLISHED }
      },
      notes: {
        where: { userId: session?.user?.id || '' }
      },
      bookmarks: {
        where: { userId: session?.user?.id || '' }
      }
    }
  });

  if (!lesson) {
    notFound();
  }

  // Server-side lock enforcement
  if (session) {
    const lockedModuleIds = await getLockedModuleIds(session.user.id, lesson.module.courseId, session.user.role);
    if (lockedModuleIds.has(lesson.moduleId)) {
      redirect(`/learn/${resolvedParams.courseSlug}`);
    }
  }

  return (
    <div style={{ padding: '64px 48px', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Premium Header */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <span style={{ 
            color: 'var(--color-brand-primary)', 
            fontWeight: 700, 
            fontSize: '0.875rem', 
            textTransform: 'uppercase', 
            letterSpacing: '0.1em',
            padding: '6px 16px',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            borderRadius: '9999px',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            alignSelf: 'flex-start'
          }}>
            Module {lesson.module.order} — {lesson.module.title}
          </span>
          {session && (
            <BookmarkButton 
              lessonId={lesson.id} 
              isBookmarked={lesson.bookmarks.length > 0} 
            />
          )}
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '24px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>{lesson.title}</h1>
        {lesson.description && (
          <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, maxWidth: '800px' }}>{lesson.description}</p>
        )}
      </div>
      
      {/* Premium Video Player */}
      {lesson.videoUrl && (
        <div className="hover-glow" style={{ 
          marginBottom: '64px', 
          borderRadius: '24px', 
          overflow: 'hidden', 
          backgroundColor: 'var(--color-bg-primary)', 
          border: '1px solid var(--color-glass-strong)', 
          boxShadow: '0 30px 60px rgba(0,0,0,0.6), 0 0 40px rgba(99, 102, 241, 0.15)',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
            <iframe 
              src={lesson.videoUrl} 
              title={lesson.title}
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            ></iframe>
          </div>
        </div>
      )}
      
      {/* Markdown Content */}
      <div 
        className="markdown-body" 
        style={{ 
          fontSize: '1.125rem', 
          color: 'var(--color-text-primary)', 
          lineHeight: 1.8,
          backgroundColor: 'transparent',
          border: 'none',
          padding: 0
        }}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {lesson.content || '*No text content provided for this lesson.*'}
        </ReactMarkdown>
      </div>

      {/* External Resources / Embeds */}
      {lesson.resources.length > 0 && (
        <div style={{ marginTop: '80px', borderTop: '1px solid var(--color-border)', paddingTop: '48px' }}>
          <h3 style={{ fontSize: '1.75rem', marginBottom: '32px', fontWeight: 600 }}>Additional Resources</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {lesson.resources.map((resource) => (
              <a 
                key={resource.id} 
                href={resource.originalUrl || '#'} 
                target="_blank" 
                rel="noreferrer"
                className="card hover-lift glass-panel"
                style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '24px', textDecoration: 'none' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h4 style={{ color: 'var(--color-brand-primary)', fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.4 }}>{resource.title}</h4>
                  <span style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '9999px', backgroundColor: 'var(--color-glass-strong)', color: 'var(--color-text-secondary)' }}>
                    {resource.resourceType}
                  </span>
                </div>
                {resource.creator && (
                  <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    {resource.creator}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Notes Section */}
      {session && (
        <NotesSection 
          lessonId={lesson.id} 
          initialNote={lesson.notes.length > 0 ? lesson.notes[0].content : ''} 
        />
      )}

      {/* Actions (Mark as complete) */}
      <div style={{ marginTop: '80px', display: 'flex', justifyContent: 'center', borderTop: '1px solid var(--color-border)', paddingTop: '64px', paddingBottom: '64px' }}>
        <form action={async () => {
          'use server';
          const { markLessonComplete } = await import('@/actions/learning/progress');
          
          // Determine next lesson
          const allLessons = await prisma.lesson.findMany({
            where: { module: { course: { slug: resolvedParams.courseSlug } } },
            orderBy: [{ module: { order: 'asc' } }, { order: 'asc' }],
            select: { id: true }
          });
          const currentIndex = allLessons.findIndex(l => l.id === lesson.id);
          const nextLessonId = currentIndex >= 0 && currentIndex < allLessons.length - 1 
            ? allLessons[currentIndex + 1].id 
            : undefined;

          await markLessonComplete(lesson.id, resolvedParams.courseSlug, nextLessonId);
        }}>
          <button type="submit" className="btn btn-primary hover-lift" style={{ 
            padding: '16px 48px', 
            fontSize: '1.25rem', 
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(99, 102, 241, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Mark as Complete & Continue
          </button>
        </form>
      </div>

    </div>
  );
}
