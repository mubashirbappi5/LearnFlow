'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ProgressStatus } from '@prisma/client';

import { updateStreak } from '@/lib/streak';

export async function markLessonComplete(lessonId: string, courseSlug: string, nextLessonId?: string) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  // Update streak whenever a lesson is completed
  await updateStreak(session.user.id);

  // Check if already completed
  const existingProgress = await prisma.lessonProgress.findUnique({
    where: {
      userId_lessonId: {
        userId: session.user.id,
        lessonId: lessonId,
      }
    }
  });

  if (!existingProgress || existingProgress.status !== ProgressStatus.COMPLETED) {
    // Wrap in transaction to award XP and mark progress
    await prisma.$transaction([
      prisma.lessonProgress.upsert({
        where: {
          userId_lessonId: {
            userId: session.user.id,
            lessonId: lessonId,
          }
        },
        update: {
          status: ProgressStatus.COMPLETED,
          completedAt: new Date(),
        },
        create: {
          userId: session.user.id,
          lessonId: lessonId,
          status: ProgressStatus.COMPLETED,
        }
      }),
      prisma.user.update({
        where: { id: session.user.id },
        data: { xp: { increment: 10 } }
      })
    ]);
  }

  // Revalidate learning layout
  revalidatePath(`/learn/${courseSlug}`);
  revalidatePath('/dashboard');

  // Navigate to next lesson if available
  if (nextLessonId) {
    redirect(`/learn/${courseSlug}/lesson/${nextLessonId}`);
  } else {
    // End of course or module
    redirect(`/dashboard`);
  }
}
