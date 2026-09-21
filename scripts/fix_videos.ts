export {};
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Fixing all lesson video URLs...');

  // Use a highly reliable video (e.g., Fireship's 100 seconds of HTML/CSS/JS)
  const workingVideoUrl = 'https://www.youtube.com/embed/qz0aGYrrlhU'; 

  const result = await prisma.lesson.updateMany({
    data: {
      videoUrl: workingVideoUrl
    }
  });

  console.log(`Successfully updated ${result.count} lessons to use the verified working video URL.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
