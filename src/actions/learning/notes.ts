'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function saveNote(lessonId: string, content: string) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    throw new Error('Unauthorized');
  }

  await prisma.userNote.upsert({
    where: {
      userId_lessonId: {
        userId: session.user.id,
        lessonId: lessonId
      }
    },
    update: {
      content
    },
    create: {
      userId: session.user.id,
      lessonId,
      content
    }
  });

  revalidatePath(`/learn/[courseSlug]/lesson/${lessonId}`, 'page');
  revalidatePath('/dashboard/notes');
  return { success: true };
}

export async function deleteNote(lessonId: string) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    throw new Error('Unauthorized');
  }

  try {
    await prisma.userNote.delete({
      where: {
        userId_lessonId: {
          userId: session.user.id,
          lessonId: lessonId
        }
      }
    });
    revalidatePath(`/learn/[courseSlug]/lesson/${lessonId}`, 'page');
    revalidatePath('/dashboard/notes');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Note not found' };
  }
}
