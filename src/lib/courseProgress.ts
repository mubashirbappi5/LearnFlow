import { prisma } from '@/lib/prisma';

/**
 * Calculates which modules are locked for a given user in a given course.
 * Returns a Set of locked module IDs.
 */
export async function getLockedModuleIds(userId: string, courseId: string, userRole: string = 'USER'): Promise<Set<string>> {
  if (userRole === 'ADMIN') {
    return new Set<string>(); // Admins bypass all locks
  }

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      modules: {
        where: { status: 'PUBLISHED' },
        orderBy: { order: 'asc' },
        include: {
          quizzes: { where: { status: 'PUBLISHED' } }
        }
      }
    }
  });

  if (!course) return new Set<string>();

  const quizAttempts = await prisma.quizAttempt.findMany({
    where: { 
      userId: userId, 
      quiz: { module: { courseId: course.id } },
      passed: true
    },
    include: { quiz: true }
  });
  
  const passedQuizModuleIds = new Set(quizAttempts.map(a => a.quiz.moduleId));
  const lockedModuleIds = new Set<string>();
  
  let isNextUnlocked = true; // The first module is always unlocked

  for (const module of course.modules) {
    if (!isNextUnlocked) {
      lockedModuleIds.add(module.id);
    }
    
    if (module.quizzes.length > 0) {
      isNextUnlocked = passedQuizModuleIds.has(module.id);
    } else {
      isNextUnlocked = true;
    }
  }

  return lockedModuleIds;
}
