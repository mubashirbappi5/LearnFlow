'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { updateStreak } from '@/lib/streak';

export async function submitQuizAttempt(quizId: string, score: number, passed: boolean, answers: Record<string, string[]>, courseSlug: string) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  // Update streak whenever a quiz is attempted
  await updateStreak(session.user.id);

  // Check if they already passed this quiz before
  const previouslyPassed = await prisma.quizAttempt.findFirst({
    where: {
      userId: session.user.id,
      quizId: quizId,
      passed: true
    }
  });

  // Use a transaction to save the attempt and award XP if applicable
  if (passed && !previouslyPassed) {
    await prisma.$transaction([
      prisma.quizAttempt.create({
        data: {
          userId: session.user.id,
          quizId: quizId,
          score,
          passed,
          answers: JSON.stringify(answers),
        }
      }),
      prisma.user.update({
        where: { id: session.user.id },
        data: { xp: { increment: 50 } }
      })
    ]);
  } else {
    await prisma.quizAttempt.create({
      data: {
        userId: session.user.id,
        quizId: quizId,
        score,
        passed,
        answers: JSON.stringify(answers),
      }
    });
  }

  // Since it's a quiz, if they passed, we could mark the module as complete or just record the attempt.
  // For now, logging the attempt is sufficient. The progress tracking logic usually revolves around lesson completion.

  revalidatePath(`/learn/${courseSlug}`);
  // We do not redirect here, the client will show the results screen, and provide a "Back to Course" button.
}
