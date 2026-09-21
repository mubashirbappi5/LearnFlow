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

export default async function LessonPage({ params }: { params: Promise<{ courseSlug: string, lessonId: string }> }) {
  const resolvedParams = await params;
  const lesson = await prisma.lesson.findUnique({
    where: { id: resolvedParams.lessonId },
    include: {
      module: true,
      resources: {
        where: { status: Status.PUBLISHED }
      }
    }
  });

  if (!lesson) {
    notFound();
  }

  // Server-side lock enforcement
  const session = await getServerSession(authOptions);
  if (session) {
    const lockedModuleIds = await getLockedModuleIds(session.user.id, lesson.module.courseId, session.user.role);
    if (lockedModuleIds.has(lesson.moduleId)) {
      redirect(`/learn/${resolvedParams.courseSlug}`);
    }
  }

  return (
    <div style={{ padding: '64px 48px', maxWidth: '900px', margin: '0 auto' }}>
      
      <div style={{ marginBottom: '40px' }}>
        <span style={{ color: 'var(--color-brand-primary)', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {lesson.module.title}
        </span>
        <h1 style={{ fontSize: '2.5rem', marginTop: '8px', marginBottom: '16px' }}>{lesson.title}</h1>
        {lesson.description && (
          <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)' }}>{lesson.description}</p>
        )}
      </div>
      
      {/* Video System Player */}
      {lesson.videoUrl && (
        <div style={{ marginBottom: '48px', borderRadius: '16px', overflow: 'hidden', backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
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
          lineHeight: 1.7,
        }}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {lesson.content || 'No content provided for this lesson.'}
        </ReactMarkdown>
      </div>

      {/* External Resources / Embeds */}
      {lesson.resources.length > 0 && (
        <div style={{ marginTop: '64px', borderTop: '1px solid var(--color-border)', paddingTop: '40px' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Additional Resources</h3>
          <div style={{ display: 'grid', gap: '16px' }}>
            {lesson.resources.map((resource) => (
              <a 
                key={resource.id} 
                href={resource.originalUrl || '#'} 
                target="_blank" 
                rel="noreferrer"
                className="card"
                style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '24px', textDecoration: 'none' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h4 style={{ color: 'var(--color-brand-primary)', fontSize: '1.125rem', fontWeight: 600 }}>{resource.title}</h4>
                  <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,0.1)' }}>
                    {resource.resourceType}
                  </span>
                </div>
                {resource.creator && (
                  <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>By {resource.creator}</span>
                )}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Actions (Mark as complete) */}
      <div style={{ marginTop: '64px', display: 'flex', justifyContent: 'flex-end' }}>
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
          <button type="submit" className="btn btn-primary" style={{ padding: '12px 32px' }}>
            Mark as Complete & Continue
          </button>
        </form>
      </div>

    </div>
  );
}
