'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function submitQuizAttempt(quizId: string, score: number, passed: boolean, answers: Record<string, string[]>, courseSlug: string) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  // Log the quiz attempt
  await prisma.quizAttempt.create({
    data: {
      userId: session.user.id,
      quizId: quizId,
      score,
      passed,
      answers: JSON.stringify(answers),
    }
  });

  // Since it's a quiz, if they passed, we could mark the module as complete or just record the attempt.
  // For now, logging the attempt is sufficient. The progress tracking logic usually revolves around lesson completion.

  revalidatePath(`/learn/${courseSlug}`);
  // We do not redirect here, the client will show the results screen, and provide a "Back to Course" button.
}
