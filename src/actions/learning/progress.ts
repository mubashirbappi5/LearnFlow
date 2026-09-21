'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ProgressStatus } from '@prisma/client';

export async function markLessonComplete(lessonId: string, courseSlug: string, nextLessonId?: string) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  // Mark lesson as complete
  await prisma.lessonProgress.upsert({
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
  });

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
