import { prisma } from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import { Status } from '@prisma/client';

export default async function LearnCourseRootPage({ params }: { params: Promise<{ courseSlug: string }> }) {
  const resolvedParams = await params;
  const course = await prisma.course.findUnique({
    where: { slug: resolvedParams.courseSlug },
    include: {
      modules: {
        where: { status: Status.PUBLISHED },
        orderBy: { order: 'asc' },
        include: {
          lessons: {
            where: { status: Status.PUBLISHED },
            orderBy: { order: 'asc' },
            take: 1
          }
        },
        take: 1
      }
    }
  });

  if (!course) {
    notFound();
  }

  // Redirect to the first lesson if available
  const firstModule = course.modules[0];
  if (firstModule && firstModule.lessons.length > 0) {
    redirect(`/learn/${course.slug}/lesson/${firstModule.lessons[0].id}`);
  }

  return (
    <div style={{ padding: '64px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>{course.title}</h1>
      <p style={{ color: 'var(--color-text-secondary)' }}>Welcome to the course. Content is being prepared.</p>
    </div>
  );
}
