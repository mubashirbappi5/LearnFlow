const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Real Frontend Content...');

  // Find the Frontend Developer career path
  const career = await prisma.careerPath.findUnique({
    where: { slug: 'frontend-developer' }
  });

  if (!career) {
    console.error('Frontend Developer career path not found! Run the main seed first.');
    return;
  }

  // WIPE existing courses for this career to start clean
  await prisma.course.deleteMany({
    where: { careerPathId: career.id }
  });
  console.log('Wiped old dummy courses for Frontend Developer.');

  // ==========================================
  // COURSE 1: Web Fundamentals (HTML & CSS)
  // ==========================================
  const c1 = await prisma.course.create({
    data: {
      title: 'Web Fundamentals (HTML & CSS)',
      slug: 'web-fundamentals-real',
      description: 'Master the core building blocks of the web. Learn to structure your pages with HTML and style them beautifully with CSS.',
      careerPathId: career.id,
      status: 'PUBLISHED',
      order: 1
    }
  });

  // Module 1: HTML Core
  const m1 = await prisma.module.create({
    data: {
      title: 'HTML Core',
      description: 'Learn the structure and semantics of web pages.',
      courseId: c1.id,
      order: 1,
      status: 'PUBLISHED'
    }
  });

  await prisma.lesson.create({
    data: {
      moduleId: m1.id,
      title: 'What is HTML?',
      content: `# What is HTML?\n\nHTML (HyperText Markup Language) is the most basic building block of the Web. It defines the meaning and structure of web content.\n\n<iframe width="100%" height="500" src="https://www.youtube.com/embed/qz0aGYrrlhU" title="HTML Tutorial for Beginners" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>\n\n### Key Takeaways:\n- Elements are the building blocks.\n- Tags wrap content to give it meaning.\n- Attributes provide extra information about elements.`,
      order: 1,
      status: 'PUBLISHED'
    }
  });

  await prisma.lesson.create({
    data: {
      moduleId: m1.id,
      title: 'Semantic HTML & Forms',
      content: `# Semantic HTML\n\nSemantic HTML introduces meaning to the web page rather than just presentation.\n\n<iframe width="100%" height="500" src="https://www.youtube.com/embed/kG7k86hS_kM" title="Semantic HTML" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>\n\n### Why use Semantic Tags?\n- Better SEO\n- Better Accessibility\n- Easier to read code\n\n*Examples: \`<header>\`, \`<nav>\`, \`<main>\`, \`<footer>\`*`,
      order: 2,
      status: 'PUBLISHED'
    }
  });

  // Module 2: CSS Mastery
  const m2 = await prisma.module.create({
    data: {
      title: 'CSS Mastery',
      description: 'Make your web pages look beautiful and responsive.',
      courseId: c1.id,
      order: 2,
      status: 'PUBLISHED'
    }
  });

  await prisma.lesson.create({
    data: {
      moduleId: m2.id,
      title: 'CSS Basics & Selectors',
      content: `# CSS Basics\n\nCSS (Cascading Style Sheets) is used to style and layout web pages.\n\n<iframe width="100%" height="500" src="https://www.youtube.com/embed/1Rs2ND1ryYc" title="CSS Tutorial for Beginners" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>\n\n### Core Concepts\n- Selectors (Class, ID, Tag)\n- Box Model (Margin, Border, Padding, Content)\n- Colors and Typography`,
      order: 1,
      status: 'PUBLISHED'
    }
  });

  await prisma.lesson.create({
    data: {
      moduleId: m2.id,
      title: 'Flexbox & Grid',
      content: `# Modern Layouts\n\nLearn how to position elements perfectly using modern CSS layouts.\n\n<iframe width="100%" height="500" src="https://www.youtube.com/embed/fYq5JZgSks0" title="Learn Flexbox in 15 Minutes" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>\n\nFlexbox is designed for 1-dimensional layouts (rows or columns), while CSS Grid is designed for 2-dimensional layouts.`,
      order: 2,
      status: 'PUBLISHED'
    }
  });

  // ==========================================
  // COURSE 2: JavaScript Essentials
  // ==========================================
  const c2 = await prisma.course.create({
    data: {
      title: 'JavaScript Essentials',
      slug: 'javascript-essentials-real',
      description: 'Learn the programming language of the web. Make your static pages interactive.',
      careerPathId: career.id,
      status: 'PUBLISHED',
      order: 2
    }
  });

  const m3 = await prisma.module.create({
    data: {
      title: 'JS Basics',
      description: 'Variables, Types, and Functions',
      courseId: c2.id,
      order: 1,
      status: 'PUBLISHED'
    }
  });

  await prisma.lesson.create({
    data: {
      moduleId: m3.id,
      title: 'Variables, Types, & Functions',
      content: `# Introduction to JavaScript\n\nJavaScript in 100 seconds by Fireship!\n\n<iframe width="100%" height="500" src="https://www.youtube.com/embed/upDLs1sn7g4" title="JavaScript in 100 Seconds" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>\n\nJavaScript is a high-level, often just-in-time compiled language that conforms to the ECMAScript standard.`,
      order: 1,
      status: 'PUBLISHED'
    }
  });

  await prisma.lesson.create({
    data: {
      moduleId: m3.id,
      title: 'Array Methods',
      content: `# Map, Filter, and Reduce\n\nMastering array methods is critical for modern frontend frameworks.\n\n<iframe width="100%" height="500" src="https://www.youtube.com/embed/R8rmfD9Y5-c" title="8 Must Know Array Methods" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
      order: 2,
      status: 'PUBLISHED'
    }
  });

  const m4 = await prisma.module.create({
    data: {
      title: 'The DOM',
      description: 'Interact with HTML using JavaScript.',
      courseId: c2.id,
      order: 2,
      status: 'PUBLISHED'
    }
  });

  await prisma.lesson.create({
    data: {
      moduleId: m4.id,
      title: 'DOM Manipulation',
      content: `# Manipulating the DOM\n\nThe Document Object Model (DOM) connects web pages to scripts.\n\n<iframe width="100%" height="500" src="https://www.youtube.com/embed/y17RuWUpcgk" title="DOM Manipulation Crash Course" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
      order: 1,
      status: 'PUBLISHED'
    }
  });

  await prisma.quiz.create({
    data: {
      title: 'JavaScript Basics Quiz',
      moduleId: m4.id,
      passingScore: 70,
      status: 'PUBLISHED',
      questions: {
        create: [
          {
            type: 'MULTIPLE_CHOICE',
            question: 'Which method adds an element to the end of an array?',
            options: JSON.stringify(['push()', 'pop()', 'shift()', 'unshift()']),
            correctOptions: JSON.stringify(['push()']),
            order: 1
          },
          {
            type: 'MULTIPLE_CHOICE',
            question: 'What does DOM stand for?',
            options: JSON.stringify(['Document Object Model', 'Data Object Model', 'Document Oriented Model']),
            correctOptions: JSON.stringify(['Document Object Model']),
            order: 2
          }
        ]
      }
    }
  });


  // ==========================================
  // COURSE 3: React.js
  // ==========================================
  const c3 = await prisma.course.create({
    data: {
      title: 'React.js Fundamentals',
      slug: 'react-fundamentals-real',
      description: 'Build fast, modern Single Page Applications using the most popular UI library.',
      careerPathId: career.id,
      status: 'PUBLISHED',
      order: 3
    }
  });

  const m5 = await prisma.module.create({
    data: {
      title: 'React Basics',
      description: 'Components, JSX, and State',
      courseId: c3.id,
      order: 1,
      status: 'PUBLISHED'
    }
  });

  await prisma.lesson.create({
    data: {
      moduleId: m5.id,
      title: 'Components & JSX',
      content: `# Introduction to React\n\n<iframe width="100%" height="500" src="https://www.youtube.com/embed/Tn6-PIqc4UM" title="React in 100 Seconds" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>\n\nReact allows you to build encapsulated components that manage their own state, then compose them to make complex UIs.`,
      order: 1,
      status: 'PUBLISHED'
    }
  });

  await prisma.lesson.create({
    data: {
      moduleId: m5.id,
      title: 'State & Hooks',
      content: `# Learn React Hooks\n\n<iframe width="100%" height="500" src="https://www.youtube.com/embed/O6P86uwfdR0" title="Learn useState In 15 Minutes" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
      order: 2,
      status: 'PUBLISHED'
    }
  });

  const m6 = await prisma.module.create({
    data: {
      title: 'Final Project',
      description: 'Build your final portfolio.',
      courseId: c3.id,
      order: 2,
      status: 'PUBLISHED'
    }
  });

  await prisma.assignment.create({
    data: {
      title: 'Build a Personal Portfolio using React',
      moduleId: m6.id,
      instructions: 'Using React and CSS, build a personal portfolio showcasing the skills you have learned. It must contain at least 3 distinct components (e.g., Header, ProjectList, Footer).',
      requirements: 'Submit a GitHub repository URL containing your React code.',
      allowedTypes: ['GITHUB_URL', 'LIVE_URL'],
      status: 'PUBLISHED'
    }
  });

  console.log('Successfully seeded real Frontend content with YouTube videos!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
