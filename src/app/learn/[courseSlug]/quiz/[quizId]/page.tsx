import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import QuizClient from '@/components/learning/QuizClient';
import { Status } from '@prisma/client';

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
