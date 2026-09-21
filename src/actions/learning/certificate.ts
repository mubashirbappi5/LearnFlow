'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function issueCourseCertificate(courseId: string) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  // Verify they don't already have it
  const existing = await prisma.certificate.findFirst({
    where: {
      userId: session.user.id,
      courseId
    }
  });

  if (existing) {
    return existing.id;
  }

  // Issue the certificate
  const certId = `CERT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  const certificate = await prisma.certificate.create({
    data: {
      userId: session.user.id,
      courseId,
      certificateId: certId,
      verificationUrl: `/certificates/${certId}`,
    }
  });

  revalidatePath('/dashboard');
  return certificate.id;
}
