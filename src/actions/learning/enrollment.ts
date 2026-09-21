'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function enrollInCareer(careerId: string) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  // Find career to get its courses
  const career = await prisma.careerPath.findUnique({
    where: { id: careerId },
    include: { courses: true }
  });

  if (!career) throw new Error('Career path not found');

  // 1. Update user profile's active career goal
  await prisma.profile.upsert({
    where: { userId: session.user.id },
    update: { careerGoalId: careerId },
    create: {
      userId: session.user.id,
      careerGoalId: careerId,
    }
  });

  // 2. Enroll user in all courses of this career
  const enrollmentPromises = career.courses.map((course) => 
    prisma.enrollment.upsert({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId: course.id,
        }
      },
      update: {}, // if already enrolled, do nothing
      create: {
        userId: session.user.id,
        courseId: course.id,
      }
    })
  );

  await Promise.all(enrollmentPromises);

  revalidatePath(`/careers/${career.slug}`);
  revalidatePath('/dashboard');
  redirect('/dashboard');
}
