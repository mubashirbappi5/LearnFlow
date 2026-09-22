'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateProfile(formData: FormData) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    throw new Error('Unauthorized');
  }

  const name = formData.get('name') as string;
  const username = formData.get('username') as string;
  const careerGoalId = formData.get('careerGoalId') as string;
  const skillLevel = formData.get('skillLevel') as string;
  const dailyStudyHours = parseInt(formData.get('dailyStudyHours') as string) || 0;
  const learningGoal = formData.get('learningGoal') as string;
  const targetTimeline = formData.get('targetTimeline') as string;
  const preferredLanguage = formData.get('preferredLanguage') as string || 'en';

  // Update user name and username
  if (name || username) {
    try {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { 
          ...(name ? { name } : {}),
          ...(username ? { username } : {})
        }
      });
    } catch (error) {
      // Ignore unique constraint error for username for now
      console.error('Failed to update user', error);
    }
  }

  // Update or create profile
  await prisma.profile.upsert({
    where: { userId: session.user.id },
    update: {
      careerGoalId: careerGoalId || null,
      skillLevel,
      dailyStudyHours,
      learningGoal,
      targetTimeline,
      preferredLanguage
    },
    create: {
      userId: session.user.id,
      careerGoalId: careerGoalId || null,
      skillLevel,
      dailyStudyHours,
      learningGoal,
      targetTimeline,
      preferredLanguage
    }
  });

  revalidatePath('/dashboard');
  revalidatePath('/settings');
  
  return { success: true };
}
