export {};
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// A pool of high-quality, generic tutorial videos matching topics
const videoPool = [
  { keywords: ['html', 'web', 'dom'], url: 'https://www.youtube.com/embed/qz0aGYrrlhU' }, // HTML crash course
  { keywords: ['css', 'style', 'flexbox', 'grid', 'responsive'], url: 'https://www.youtube.com/embed/1Rs2ND1ryYc' }, // CSS crash course
  { keywords: ['javascript', 'js', 'es6', 'async', 'promise', 'fetch'], url: 'https://www.youtube.com/embed/W6NZfCO5SIk' }, // JS crash course
  { keywords: ['typescript', 'ts', 'type', 'interface'], url: 'https://www.youtube.com/embed/BwuLxPH8IDs' }, // TS crash course
  { keywords: ['react', 'jsx', 'hook', 'state', 'effect'], url: 'https://www.youtube.com/embed/w7ejDZ8SWv8' }, // React crash course
  { keywords: ['next.js', 'nextjs', 'ssr', 'ssg', 'server component'], url: 'https://www.youtube.com/embed/wm5gMKuwSYk' }, // Next.js crash course
  { keywords: ['git', 'github', 'version control', 'commit', 'branch'], url: 'https://www.youtube.com/embed/8JJ101D3knE' }, // Git crash course
  { keywords: ['api', 'rest', 'graphql', 'postman'], url: 'https://www.youtube.com/embed/WXsD0ZgxjRw' }, // API crash course
  { keywords: ['node', 'backend', 'express', 'database', 'sql'], url: 'https://www.youtube.com/embed/Oe421EPjeBE' }, // Node crash course
  { keywords: ['performance', 'optimization', 'security', 'testing'], url: 'https://www.youtube.com/embed/04wGqO6oRj4' }, // Perf crash course
];

// Fallback pool for random assignment if no keyword matches
const fallbackPool = [
  'https://www.youtube.com/embed/qz0aGYrrlhU',
  'https://www.youtube.com/embed/1Rs2ND1ryYc',
  'https://www.youtube.com/embed/W6NZfCO5SIk',
  'https://www.youtube.com/embed/w7ejDZ8SWv8'
];

async function main() {
  console.log('Fixing all lesson video URLs with diverse content...');

  const lessons = await prisma.lesson.findMany();
  let updatedCount = 0;

  for (let i = 0; i < lessons.length; i++) {
    const lesson = lessons[i];
    const title = lesson.title.toLowerCase();
    
    let assignedUrl = null;

    // Try to match keyword
    for (const pool of videoPool) {
      if (pool.keywords.some(kw => title.includes(kw))) {
        assignedUrl = pool.url;
        break;
      }
    }

    // Fallback to rotating random videos
    if (!assignedUrl) {
      assignedUrl = fallbackPool[i % fallbackPool.length];
    }

    await prisma.lesson.update({
      where: { id: lesson.id },
      data: { videoUrl: assignedUrl }
    });
    
    updatedCount++;
    if (updatedCount % 50 === 0) {
      console.log(`Updated ${updatedCount}/${lessons.length} lessons...`);
    }
  }

  console.log(`Successfully updated ${updatedCount} lessons with diverse video URLs.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
