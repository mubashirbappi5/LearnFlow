'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { SubmissionStatus, SubmissionType } from '@prisma/client';

export async function submitAssignment(assignmentId: string, content: string, type: SubmissionType, courseSlug: string) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  await prisma.assignmentSubmission.upsert({
    where: {
      userId_assignmentId: {
        userId: session.user.id,
        assignmentId,
      }
    },
    update: {
      content,
      submissionType: type,
      status: SubmissionStatus.SUBMITTED,
      updatedAt: new Date(),
    },
    create: {
      userId: session.user.id,
      assignmentId,
      content,
      submissionType: type,
      status: SubmissionStatus.SUBMITTED,
    }
  });

  revalidatePath(`/learn/${courseSlug}`);
}
