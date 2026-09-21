import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import QuizClient from '@/components/learning/QuizClient';
import { Status } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getLockedModuleIds } from '@/lib/courseProgress';
import { redirect } from 'next/navigation';

export default async function QuizPage({ params }: { params: Promise<{ courseSlug: string, quizId: string }> }) {
  const resolvedParams = await params;
  const quiz = await prisma.quiz.findUnique({
    where: { id: resolvedParams.quizId },
    include: {
      questions: {
        orderBy: { order: 'asc' }
      },
      module: true
    }
  });

  if (!quiz || quiz.status !== Status.PUBLISHED) {
    notFound();
  }

  // Server-side lock enforcement
  const session = await getServerSession(authOptions);
  if (session) {
    const lockedModuleIds = await getLockedModuleIds(session.user.id, quiz.module.courseId, session.user.role);
    if (lockedModuleIds.has(quiz.moduleId)) {
      redirect(`/learn/${resolvedParams.courseSlug}`);
    }
  }

  return (
    <div>
      <div style={{ padding: '40px 48px 0', borderBottom: '1px solid var(--color-border)' }}>
        <span style={{ color: 'var(--color-brand-primary)', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {quiz.module.title}
        </span>
        <h1 style={{ fontSize: '2rem', marginTop: '8px', marginBottom: '8px' }}>{quiz.title}</h1>
        {quiz.description && (
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px' }}>{quiz.description}</p>
        )}
      </div>
      
      <QuizClient quiz={quiz} courseSlug={resolvedParams.courseSlug} />
    </div>
  );
}
