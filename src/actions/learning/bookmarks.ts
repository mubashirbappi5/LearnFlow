'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function toggleBookmark(lessonId: string) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    throw new Error('Unauthorized');
  }

  // Check if bookmark exists
  const existingBookmark = await prisma.bookmark.findFirst({
    where: {
      userId: session.user.id,
      lessonId: lessonId
    }
  });

  if (existingBookmark) {
    await prisma.bookmark.delete({
      where: { id: existingBookmark.id }
    });
  } else {
    await prisma.bookmark.create({
      data: {
        userId: session.user.id,
        lessonId: lessonId
      }
    });
  }

  revalidatePath(`/learn/[courseSlug]/lesson/${lessonId}`, 'page');
  revalidatePath('/dashboard/bookmarks');
  return { success: true, bookmarked: !existingBookmark };
}
