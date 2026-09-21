export {};
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding REAL Full-Stack Content with Video System...');

  // 1. WIPE OLD DATA
  console.log('Wiping old data...');
  await prisma.careerPath.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.module.deleteMany({});
  await prisma.lesson.deleteMany({});

  // ==========================================
  // FRONTEND DEVELOPER PATH
  // ==========================================
  console.log('Seeding Frontend Developer Path...');
  const frontendCareer = await prisma.careerPath.create({
    data: {
      title: 'Frontend Developer',
      slug: 'frontend-developer',
      description: 'Learn to build modern, responsive, and interactive web interfaces.',
      overview: 'Frontend developers are responsible for everything a user sees and interacts with on a website.',
      coreSkills: 'HTML, CSS, JavaScript, React, Git',
      tools: 'VS Code, Chrome DevTools',
      estimatedDuration: '4 Months',
      status: 'PUBLISHED'
    }
  });

  const c1 = await prisma.course.create({
    data: {
      title: 'Web Fundamentals (HTML & CSS)',
      slug: 'web-fundamentals',
      description: 'Master the core building blocks of the web.',
      careerPathId: frontendCareer.id,
      status: 'PUBLISHED',
      order: 1
    }
  });

  const m1 = await prisma.module.create({
    data: { title: 'HTML Core', courseId: c1.id, order: 1, status: 'PUBLISHED' }
  });

  await prisma.lesson.create({
    data: {
      moduleId: m1.id,
      title: 'What is HTML?',
      videoUrl: 'https://www.youtube.com/embed/qz0aGYrrlhU',
      content: `# What is HTML?\n\nHTML is the most basic building block of the Web. It defines the meaning and structure of web content.\n\n### Key Takeaways:\n- Elements are the building blocks.\n- Tags wrap content to give it meaning.\n- Attributes provide extra information about elements.`,
      order: 1,
      status: 'PUBLISHED'
    }
  });

  await prisma.lesson.create({
    data: {
      moduleId: m1.id,
      title: 'Semantic HTML',
      videoUrl: 'https://www.youtube.com/embed/kG7k86hS_kM',
      content: `# Semantic HTML\n\nSemantic HTML introduces meaning to the web page rather than just presentation.\n\n### Why use Semantic Tags?\n- Better SEO\n- Better Accessibility\n- Easier to read code`,
      order: 2,
      status: 'PUBLISHED'
    }
  });

  const m2 = await prisma.module.create({
    data: { title: 'CSS Mastery', courseId: c1.id, order: 2, status: 'PUBLISHED' }
  });

  await prisma.lesson.create({
    data: {
      moduleId: m2.id,
      title: 'CSS Basics',
      videoUrl: 'https://www.youtube.com/embed/1Rs2ND1ryYc',
      content: `# CSS Basics\n\nCSS (Cascading Style Sheets) is used to style and layout web pages.\n\n### Core Concepts\n- Selectors (Class, ID, Tag)\n- Box Model (Margin, Border, Padding, Content)\n- Colors and Typography`,
      order: 1,
      status: 'PUBLISHED'
    }
  });


  // ==========================================
  // BACKEND DEVELOPER PATH
  // ==========================================
  console.log('Seeding Backend Developer Path...');
  const backendCareer = await prisma.careerPath.create({
    data: {
      title: 'Backend Developer',
      slug: 'backend-developer',
      description: 'Build robust APIs and manage databases for scalable web applications.',
      overview: 'Backend developers handle the server-side logic, databases, and APIs that power the web.',
      coreSkills: 'Node.js, Express, SQL, Prisma, REST APIs',
      tools: 'VS Code, Postman, Docker',
      estimatedDuration: '5 Months',
      status: 'PUBLISHED'
    }
  });

  const c2 = await prisma.course.create({
    data: {
      title: 'Node.js Fundamentals',
      slug: 'nodejs-fundamentals',
      description: 'Learn the runtime that allows JavaScript to run on the server.',
      careerPathId: backendCareer.id,
      status: 'PUBLISHED',
      order: 1
    }
  });

  const m3 = await prisma.module.create({
    data: { title: 'Node Basics', courseId: c2.id, order: 1, status: 'PUBLISHED' }
  });

  await prisma.lesson.create({
    data: {
      moduleId: m3.id,
      title: 'What is Node.js?',
      videoUrl: 'https://www.youtube.com/embed/ENrzD9HAZK4', // Fireship Node.js
      content: `# What is Node.js?\n\nNode.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.\n\n### Concepts\n- Event Loop\n- Non-blocking I/O\n- npm (Node Package Manager)`,
      order: 1,
      status: 'PUBLISHED'
    }
  });

  await prisma.lesson.create({
    data: {
      moduleId: m3.id,
      title: 'Express.js Crash Course',
      videoUrl: 'https://www.youtube.com/embed/SccSCuHhOw0', // Web Dev Simplified Express
      content: `# Express.js\n\nExpress is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.\n\n### Routing\nRouting refers to determining how an application responds to a client request to a particular endpoint.`,
      order: 2,
      status: 'PUBLISHED'
    }
  });

  console.log('Successfully seeded completely Real Data with Dedicated Video URLs!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
