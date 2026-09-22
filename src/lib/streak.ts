import { prisma } from '@/lib/prisma';

export async function updateStreak(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { currentStreak: true, longestStreak: true, lastStudyDate: true }
  });

  if (!user) return;

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const lastStudy = user.lastStudyDate 
    ? new Date(user.lastStudyDate.getFullYear(), user.lastStudyDate.getMonth(), user.lastStudyDate.getDate())
    : null;

  let newCurrentStreak = user.currentStreak;
  let newLongestStreak = user.longestStreak;

  if (!lastStudy) {
    // First time studying
    newCurrentStreak = 1;
    newLongestStreak = 1;
  } else {
    const diffTime = Math.abs(today.getTime() - lastStudy.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    if (diffDays === 0) {
      // Already studied today, do nothing
      return;
    } else if (diffDays === 1) {
      // Studied yesterday, increment streak
      newCurrentStreak += 1;
      if (newCurrentStreak > newLongestStreak) {
        newLongestStreak = newCurrentStreak;
      }
    } else {
      // Missed a day or more, reset streak
      newCurrentStreak = 1;
    }
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      currentStreak: newCurrentStreak,
      longestStreak: newLongestStreak,
      lastStudyDate: now
    }
  });
}
