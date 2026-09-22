export {};
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// A pool of high-quality, generic tutorial videos matching topics
const videoPool = [
  // Frontend
  { keywords: ['html', 'web', 'dom'], url: 'https://www.youtube.com/embed/qz0aGYrrlhU' }, 
  { keywords: ['css', 'style', 'flexbox', 'grid', 'responsive'], url: 'https://www.youtube.com/embed/1Rs2ND1ryYc' }, 
  { keywords: ['javascript', 'js', 'es6', 'async', 'promise', 'fetch'], url: 'https://www.youtube.com/embed/W6NZfCO5SIk' }, 
  { keywords: ['typescript', 'ts', 'type', 'interface'], url: 'https://www.youtube.com/embed/BwuLxPH8IDs' }, 
  { keywords: ['react', 'jsx', 'hook', 'state', 'effect'], url: 'https://www.youtube.com/embed/w7ejDZ8SWv8' }, 
  { keywords: ['next.js', 'nextjs', 'ssr', 'ssg', 'server component'], url: 'https://www.youtube.com/embed/wm5gMKuwSYk' }, 
  { keywords: ['git', 'github', 'version control', 'commit', 'branch'], url: 'https://www.youtube.com/embed/8JJ101D3knE' }, 
  
  // Backend & APIs
  { keywords: ['api', 'rest', 'graphql', 'postman'], url: 'https://www.youtube.com/embed/WXsD0ZgxjRw' }, 
  { keywords: ['node', 'backend', 'express', 'server'], url: 'https://www.youtube.com/embed/Oe421EPjeBE' }, 
  { keywords: ['database', 'sql', 'postgres', 'prisma', 'mongodb'], url: 'https://www.youtube.com/embed/HXV3zeQKqGY' },
  { keywords: ['docker', 'container', 'kubernetes', 'deploy'], url: 'https://www.youtube.com/embed/gAkwW2tuIqE' },
  { keywords: ['architecture', 'system design', 'microservices'], url: 'https://www.youtube.com/embed/m8Icp_Cid5o' },
  
  // Cyber Security
  { keywords: ['security', 'cyber', 'threat', 'vulnerability', 'owasp'], url: 'https://www.youtube.com/embed/inWWhr5tnEA' },
  { keywords: ['network', 'tcp', 'ip', 'wireshark', 'dns'], url: 'https://www.youtube.com/embed/qiQR5rTSshw' },
  { keywords: ['linux', 'windows', 'os', 'bash', 'powershell'], url: 'https://www.youtube.com/embed/v_1aBZPBhE' },
  { keywords: ['crypto', 'hash', 'encryption', 'pki'], url: 'https://www.youtube.com/embed/jhXCTbFnK8o' },
  { keywords: ['pentest', 'hack', 'exploitation', 'burp'], url: 'https://www.youtube.com/embed/3Kq1MIfTWCE' },
  { keywords: ['malware', 'forensics', 'incident', 'soc'], url: 'https://www.youtube.com/embed/6_H1_e7cKzI' },
  { keywords: ['cloud', 'aws', 'azure', 'iam'], url: 'https://www.youtube.com/embed/a9__D53WsZA' },
  { keywords: ['ai security', 'prompt', 'llm'], url: 'https://www.youtube.com/embed/zHjIks5tUvk' },
  
  // General Tech
  { keywords: ['performance', 'optimization', 'testing'], url: 'https://www.youtube.com/embed/04wGqO6oRj4' }, 
];

// Fallback pool for random assignment if no keyword matches
const fallbackPool = [
  'https://www.youtube.com/embed/qz0aGYrrlhU',
  'https://www.youtube.com/embed/1Rs2ND1ryYc',
  'https://www.youtube.com/embed/W6NZfCO5SIk',
  'https://www.youtube.com/embed/w7ejDZ8SWv8',
  'https://www.youtube.com/embed/Oe421EPjeBE',
  'https://www.youtube.com/embed/HXV3zeQKqGY',
  'https://www.youtube.com/embed/inWWhr5tnEA',
  'https://www.youtube.com/embed/qiQR5rTSshw'
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
