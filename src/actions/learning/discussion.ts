'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function createDiscussion(lessonId: string, title: string, content: string, courseSlug: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error('Unauthorized');

  if (!title.trim() || !content.trim()) {
    throw new Error('Title and content are required');
  }

  await prisma.discussion.create({
    data: {
      lessonId,
      userId: session.user.id,
      title,
      content,
    }
  });

  revalidatePath(`/learn/${courseSlug}/lesson/${lessonId}`);
  return { success: true };
}

export async function addComment(discussionId: string, content: string, lessonId: string, courseSlug: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error('Unauthorized');

  if (!content.trim()) {
    throw new Error('Content is required');
  }

  await prisma.comment.create({
    data: {
      discussionId,
      userId: session.user.id,
      content,
    }
  });

  revalidatePath(`/learn/${courseSlug}/lesson/${lessonId}`);
  return { success: true };
}

export async function markAsAnswer(commentId: string, discussionId: string, lessonId: string, courseSlug: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error('Unauthorized');

  const discussion = await prisma.discussion.findUnique({
    where: { id: discussionId }
  });

  if (!discussion || discussion.userId !== session.user.id) {
    throw new Error('Unauthorized or discussion not found');
  }

  // Unmark any existing answers
  await prisma.comment.updateMany({
    where: { discussionId, isAnswer: true },
    data: { isAnswer: false }
  });

  // Mark the selected comment as answer
  await prisma.comment.update({
    where: { id: commentId },
    data: { isAnswer: true }
  });

  revalidatePath(`/learn/${courseSlug}/lesson/${lessonId}`);
  return { success: true };
}
