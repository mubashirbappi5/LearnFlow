export {};
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const syllabus = [
  {
    title: "MILESTONE 01 — Backend & Internet Foundation",
    description: "Learn how the web, HTTP, and REST APIs work.",
    modules: [
      {
        title: "Module 01 — How Backend Works",
        topics: ["Client", "Server", "Backend", "Frontend", "Database", "API", "Request/Response", "Server architecture", "Reverse proxy", "Application server"],
        quiz: 20
      },
      {
        title: "Module 02 — HTTP & Web Protocols",
        topics: ["HTTP", "HTTPS", "HTTP methods", "Status codes", "Headers", "Cookies", "CORS", "Content types", "HTTP/2", "HTTP/3 basics"],
        quiz: 25
      },
      {
        title: "Module 03 — REST API Fundamentals",
        topics: ["REST", "Resources", "Endpoints", "CRUD", "REST conventions", "API versioning", "JSON", "API responses"],
        quiz: 25
      },
      {
        title: "Module 04 — Backend Development Environment",
        topics: ["Node.js installation", "npm", "pnpm", "Environment variables", ".env", "Project structure", "Debugging", "VS Code"],
        quiz: 20
      }
    ],
    project: {
      title: "Backend API Fundamentals",
      requirements: "Build a Client to REST API flow returning JSON responses."
    }
  },
  {
    title: "MILESTONE 02 — JavaScript for Backend",
    description: "Master Node.js runtime and asynchronous programming.",
    modules: [
      { title: "Module 05 — Node.js Fundamentals", topics: ["Node.js runtime", "V8", "Global objects", "Process", "Environment", "npm"], quiz: 25 },
      { title: "Module 06 — Node.js Modules & Packages", topics: ["CommonJS", "ES Modules", "package.json", "npm packages", "Dependency management"], quiz: 20 },
      { title: "Module 07 — Async Programming", topics: ["Callback", "Promise", "Async/Await", "Error handling", "Event loop"], quiz: 30 },
      { title: "Module 08 — File System & Streams", topics: ["fs", "Buffers", "Streams", "Readable", "Writable", "File upload concepts"], quiz: 25 },
      { title: "Module 09 — Events & Event Loop", topics: ["EventEmitter", "Event loop", "Non-blocking I/O", "Timers", "Microtasks"], quiz: 25 }
    ],
    project: {
      title: "Node.js File Management API",
      requirements: "Upload, Download, Delete, Rename, File Metadata, Streaming, Error Handling"
    }
  },
  {
    title: "MILESTONE 03 — TypeScript Backend Engineering",
    description: "Add static typing and robust architecture with TypeScript.",
    modules: [
      { title: "Module 10 — TypeScript for Backend", topics: ["TS Setup", "Configuring tsconfig.json"], quiz: 25 },
      { title: "Module 11 — Advanced Types", topics: ["Unions", "Intersections", "Mapped Types"], quiz: 30 },
      { title: "Module 12 — Interfaces & Architecture", topics: ["Interfaces", "Classes", "OOP in TS"], quiz: 25 },
      { title: "Module 13 — Generics & Utility Types", topics: ["Generics", "Partial", "Omit", "Pick"], quiz: 25 },
      { title: "Module 14 — Type-Safe Backend Project", topics: ["Project Setup", "Type Safety across layers"], quiz: 20 }
    ],
    project: {
      title: "Type-Safe REST API",
      requirements: "TypeScript, Strict Mode, Interfaces, DTOs, Typed Responses, Typed Errors, Typed Services"
    }
  },
  {
    title: "MILESTONE 04 — Express.js & API Development",
    description: "Build robust APIs with Express.js.",
    modules: [
      { title: "Module 15 — Express Fundamentals", topics: ["Express server", "Request and Response objects"], quiz: 25 },
      { title: "Module 16 — Routing", topics: ["Express Router", "Dynamic params", "Query strings"], quiz: 20 },
      { title: "Module 17 — Middleware", topics: ["Custom Middleware", "Third-party middleware", "body-parser"], quiz: 25 },
      { title: "Module 18 — Controllers & Services", topics: ["MVC Pattern", "Separation of concerns"], quiz: 25 },
      { title: "Module 19 — Error Handling", topics: ["Global error handler", "CatchAsync wrapper"], quiz: 25 },
      { title: "Module 20 — REST API Project", topics: ["Putting it all together"], quiz: 20 }
    ],
    project: {
      title: "Production REST API",
      requirements: "Routes, Controllers, Services, Middleware, Validation, Error Handling, CRUD, Pagination, Filtering"
    }
  },
  {
    title: "MILESTONE 05 — Database Engineering",
    description: "Master SQL databases with PostgreSQL and Prisma ORM.",
    modules: [
      { title: "Module 21 — Database Fundamentals", topics: ["Database", "Tables", "Rows", "Columns", "Primary key", "Foreign key", "Index"], quiz: 25 },
      { title: "Module 22 — PostgreSQL", topics: ["PostgreSQL installation", "pgAdmin", "psql"], quiz: 30 },
      { title: "Module 23 — SQL", topics: ["SELECT", "INSERT", "UPDATE", "DELETE", "JOIN", "GROUP BY", "ORDER BY", "HAVING", "Subqueries", "Transactions"], quiz: 35 },
      { title: "Module 24 — Database Relationships", topics: ["One-to-One", "One-to-Many", "Many-to-Many"], quiz: 30 },
      { title: "Module 25 — Prisma / ORM", topics: ["Prisma Schema", "Prisma Client", "Migrations"], quiz: 25 },
      { title: "Module 26 — Database Project", topics: ["Schema design phase", "Implementation phase"], quiz: 20 }
    ],
    project: {
      title: "E-commerce Database",
      requirements: "Design Users, Products, Categories, Orders, OrderItems, Payments, Reviews"
    }
  },
  {
    title: "MILESTONE 06 — MongoDB & NoSQL",
    description: "Learn NoSQL database concepts and Mongoose.",
    modules: [
      { title: "Module 27 — NoSQL Fundamentals", topics: ["Document databases", "Collections vs Tables"], quiz: 20 },
      { title: "Module 28 — MongoDB", topics: ["MongoDB Atlas", "CRUD in Mongo Shell"], quiz: 30 },
      { title: "Module 29 — Mongoose", topics: ["Schemas", "Models", "Validation in Mongoose"], quiz: 25 },
      { title: "Module 30 — Data Modeling", topics: ["Embedding vs Referencing", "Populate"], quiz: 30 },
      { title: "Module 31 — MongoDB Project", topics: ["Building a NoSQL API"], quiz: 20 }
    ],
    project: {
      title: "Social Media Backend",
      requirements: "Users, Posts, Comments, Likes, Followers, Following, Notifications"
    }
  },
  {
    title: "MILESTONE 07 — Authentication & Authorization",
    description: "Secure your backend with passwords, JWTs, and RBAC.",
    modules: [
      { title: "Module 32 — Authentication Fundamentals", topics: ["Auth concepts", "Stateful vs Stateless"], quiz: 25 },
      { title: "Module 33 — Password Security", topics: ["Hashing", "bcrypt", "Argon2", "Password policies", "Password reset"], quiz: 30 },
      { title: "Module 34 — JWT", topics: ["Access token", "Refresh token", "Token expiration", "Token rotation", "JWT security"], quiz: 30 },
      { title: "Module 35 — Sessions & Cookies", topics: ["Session IDs", "HttpOnly Cookies", "Secure flag"], quiz: 25 },
      { title: "Module 36 — RBAC & Permissions", topics: ["Roles", "Permissions", "Admin", "User", "Moderator", "Resource-based access"], quiz: 30 },
      { title: "Module 37 — Auth System Project", topics: ["Integrating Auth into Express"], quiz: 20 }
    ],
    project: {
      title: "Production Authentication System",
      requirements: "Register, Login, Logout, Email Verification, Forgot Password, Reset Password, JWT, Refresh Token, Sessions, RBAC, Protected Routes"
    }
  },
  {
    title: "MILESTONE 08 — Advanced Backend Engineering",
    description: "Advanced techniques for production-grade backends.",
    modules: [
      { title: "Module 38 — API Architecture", topics: ["Advanced design patterns", "Modular monolith"], quiz: 25 },
      { title: "Module 39 — Validation", topics: ["Zod", "Joi", "DTO", "Schema Validation"], quiz: 25 },
      { title: "Module 40 — Pagination & Filtering", topics: ["Cursor pagination", "Offset pagination", "Sorting API"], quiz: 25 },
      { title: "Module 41 — File Upload", topics: ["Multipart", "Storage", "Cloud storage", "Image processing"], quiz: 25 },
      { title: "Module 42 — Email & Notifications", topics: ["Email service", "Templates", "Verification emails", "Transactional emails", "Notifications"], quiz: 25 },
      { title: "Module 43 — Background Jobs", topics: ["Workers", "Job queues", "Scheduled jobs", "Retry", "Failed jobs"], quiz: 30 }
    ],
    project: {
      title: "Business Management Backend",
      requirements: "Users, Companies, Projects, Tasks, Files, Emails, Notifications, Background Jobs, Reports"
    }
  },
  {
    title: "MILESTONE 09 — Caching, Queues & Real-Time",
    description: "Scale applications with Redis and WebSockets.",
    modules: [
      { title: "Module 44 — Redis", topics: ["Redis basics", "In-memory datastores"], quiz: 25 },
      { title: "Module 45 — Caching", topics: ["Cache", "Cache invalidation", "TTL", "Cache-aside"], quiz: 25 },
      { title: "Module 46 — Message Queues", topics: ["Queue", "Producer", "Consumer", "Worker", "Retry", "Dead-letter queue"], quiz: 30 },
      { title: "Module 47 — WebSockets", topics: ["Socket.io", "WebSocket Protocol"], quiz: 25 },
      { title: "Module 48 — Real-Time Systems", topics: ["Presence", "Notifications", "Live updates", "Pub/Sub"], quiz: 25 },
      { title: "Module 49 — Real-Time Project", topics: ["Building real-time features"], quiz: 20 }
    ],
    project: {
      title: "Real-Time Collaboration Platform",
      requirements: "Authentication, Chat, Online Users, Typing Indicator, Notifications, Real-time Updates, Message History, Redis, WebSockets"
    }
  },
  {
    title: "MILESTONE 10 — Backend Security & Testing",
    description: "Learn to test and secure your backend from vulnerabilities.",
    modules: [
      { title: "Module 50 — Backend Security", topics: ["Security auditing", "Vulnerability scanning"], quiz: 30 },
      { title: "Module 51 — OWASP", topics: ["Injection", "Broken Authentication", "Broken Access Control", "Security Misconfiguration", "SSRF", "XSS", "CSRF"], quiz: 35 },
      { title: "Module 52 — API Security", topics: ["Rate limiting", "Input validation", "CORS", "Headers", "API keys", "Authentication"], quiz: 30 },
      { title: "Module 53 — Unit Testing", topics: ["Jest", "Mocking", "Test suites"], quiz: 25 },
      { title: "Module 54 — Integration Testing", topics: ["Supertest", "Test databases"], quiz: 25 },
      { title: "Module 55 — E2E & Security Testing", topics: ["E2E testing flows", "Automated security tests"], quiz: 30 }
    ],
    project: {
      title: "Secure Production API",
      requirements: "Authentication, Authorization, Validation, Rate Limiting, Security Headers, Logging, Unit Tests, Integration Tests, E2E Tests, Security Tests"
    }
  },
  {
    title: "MILESTONE 11 — Docker, DevOps & Deployment",
    description: "Deploy and manage backend services in the cloud.",
    modules: [
      { title: "Module 56 — Linux for Backend", topics: ["Basic commands", "Permissions", "SSH"], quiz: 25 },
      { title: "Module 57 — Docker", topics: ["Images", "Containers", "Dockerfile", "Docker Compose", "Volumes", "Networks"], quiz: 30 },
      { title: "Module 58 — CI/CD", topics: ["GitHub Actions", "Pipelines"], quiz: 25 },
      { title: "Module 59 — Cloud Deployment", topics: ["VPS Deployment", "PaaS vs IaaS"], quiz: 25 },
      { title: "Module 60 — AWS Fundamentals", topics: ["EC2", "S3", "RDS", "IAM", "CloudWatch", "VPC basics"], quiz: 30 },
      { title: "Module 61 — Production Backend", topics: ["Monitoring", "Logging systems"], quiz: 25 }
    ],
    project: {
      title: "Production Deployment Pipeline",
      requirements: "GitHub -> Pull Request -> Tests -> Docker Build -> CI/CD -> Cloud -> Production API -> Monitoring"
    }
  },
  {
    title: "MILESTONE 12 — Backend Architecture & System Design",
    description: "Architecting large scale distributed systems.",
    modules: [
      { title: "Module 62 — Clean Architecture", topics: ["Domain driven design", "Use cases"], quiz: 30 },
      { title: "Module 63 — Design Patterns", topics: ["Repository", "Service", "Factory", "Strategy", "Adapter", "Observer", "Dependency Injection"], quiz: 30 },
      { title: "Module 64 — Scalability", topics: ["Horizontal scaling", "Vertical scaling", "Load balancing", "Database scaling", "Caching", "CDN"], quiz: 30 },
      { title: "Module 65 — Microservices", topics: ["Monolith", "Microservices", "Service communication", "API Gateway", "Service discovery", "Event-driven architecture"], quiz: 35 },
      { title: "Module 66 — System Design", topics: ["URL Shortener", "Chat Application", "E-commerce", "Social Media", "Ride Sharing", "Video Platform", "Notification System"], quiz: 35 },
      { title: "Module 67 — Distributed Systems", topics: ["CAP theorem", "Consistency", "Availability", "Partition tolerance", "Distributed transactions", "Eventual consistency", "Idempotency"], quiz: 35 }
    ],
    project: {
      title: "Scalable E-commerce Backend",
      requirements: "Microservices Architecture (Product, Order, Payment, User, Notification) connected via Message Queue and API Gateway."
    }
  },
  {
    title: "MILESTONE 13 — AI Backend Engineering",
    description: "Integrate LLMs and build intelligent backends.",
    modules: [
      { title: "Module 68 — AI API Integration", topics: ["LLM APIs", "API keys", "Prompts", "Responses", "Structured outputs", "Error handling"], quiz: 25 },
      { title: "Module 69 — LLM Backend Architecture", topics: ["AI service layer", "Prompt management", "Token management", "Cost control", "Rate limiting", "Model selection"], quiz: 30 },
      { title: "Module 70 — RAG Backend", topics: ["Documents", "Chunking", "Embeddings", "Vector Database", "Retrieval", "LLM", "Response"], quiz: 30 },
      { title: "Module 71 — AI Agents & Tool Calling", topics: ["Agents", "Tools", "Function calling", "Tool execution", "Agent loops", "Guardrails"], quiz: 30 },
      { title: "Module 72 — AI Streaming", topics: ["Streaming", "Server-Sent Events", "WebSockets", "Real-time AI responses"], quiz: 25 },
      { title: "Module 73 — Production AI Backend", topics: ["Authentication", "Database", "AI", "RAG", "Caching", "Rate Limiting", "Security", "Monitoring", "Logging", "Deployment"], quiz: 35 }
    ],
    project: {
      title: "🔥 AI-Powered Backend Platform",
      requirements: "Authentication -> User Management -> AI Gateway -> LLM Service -> RAG Service -> Vector Database -> Tool Calling -> Background Jobs -> Redis Cache -> PostgreSQL -> Monitoring"
    }
  }
];

async function seedBackendMasterclass() {
  console.log('Seeding Backend Engineering Masterclass (13 Milestones)...');

  // Check if career already exists
  let career = await prisma.careerPath.findUnique({
    where: { slug: 'backend-engineering-2026' }
  });

  if (!career) {
    career = await prisma.careerPath.create({
      data: {
        title: 'Backend Engineering Masterclass',
        slug: 'backend-engineering-2026',
        description: 'The ultimate zero-to-hero backend engineering bootcamp. Master Node.js, Express, SQL, NoSQL, DevOps, and AI Integrations.',
        overview: 'This comprehensive 13-milestone career path is designed to take you from backend fundamentals to architecting distributed systems and AI-powered platforms.',
        coreSkills: 'Node.js, Express, TypeScript, PostgreSQL, MongoDB, Redis, Docker, System Design, AI APIs',
        tools: 'VS Code, Postman, Docker, AWS, Vercel',
        estimatedDuration: '8-10 Months',
        status: 'PUBLISHED'
      }
    });
  } else {
    // Delete existing courses for this career to avoid duplicates on re-run
    await prisma.course.deleteMany({ where: { careerPathId: career.id } });
  }

  // Iterate over Milestones (Courses)
  for (let cIdx = 0; cIdx < syllabus.length; cIdx++) {
    const milestoneData = syllabus[cIdx];
    
    console.log("Creating " + milestoneData.title + "...");
    
    const course = await prisma.course.create({
      data: {
        careerPathId: career.id,
        title: milestoneData.title,
        slug: "milestone-" + (cIdx + 1) + "-backend",
        description: milestoneData.description,
        status: 'PUBLISHED',
        order: cIdx + 1
      }
    });

    // Iterate over Modules
    for (let mIdx = 0; mIdx < milestoneData.modules.length; mIdx++) {
      const modData = milestoneData.modules[mIdx];
      
      const module = await prisma.module.create({
        data: {
          courseId: course.id,
          title: modData.title,
          status: 'PUBLISHED',
          order: mIdx + 1
        }
      });

      // Iterate over Topics (Lessons)
      for (let tIdx = 0; tIdx < modData.topics.length; tIdx++) {
        const topicName = modData.topics[tIdx];
        
        await prisma.lesson.create({
          data: {
            moduleId: module.id,
            title: topicName,
            content: "# " + topicName + "\n\nWelcome to the lesson on **" + topicName + "**.\n\nThis lesson covers the core concepts, syntax, and real-world applications of " + topicName + " in modern backend engineering. More detailed video content and interactive exercises will be added soon.\n\n### Key Takeaways:\n- Understand the fundamentals.\n- Learn best practices.\n- Apply to real projects.",
            videoUrl: 'https://www.youtube.com/embed/ENrzD9HAZK4', // Default placeholder video (Fireship Node)
            status: 'PUBLISHED',
            order: tIdx + 1
          }
        });
      }

      // Add a Quiz if specified
      if (modData.quiz) {
        // Create a dummy quiz with 1 question just to populate the structure
        const quiz = await prisma.quiz.create({
          data: {
            moduleId: module.id,
            title: modData.title + " Quiz",
            description: "Test your knowledge with " + modData.quiz + " questions based on this module.",
            passingScore: 70,
            status: 'PUBLISHED'
          }
        });
        
        // Add one dummy question so the quiz is playable
        await prisma.quizQuestion.create({
          data: {
            quizId: quiz.id,
            type: 'MULTIPLE_CHOICE',
            question: "Which of the following concepts was covered in " + modData.title + "?",
            options: JSON.stringify(["Concept A", "Concept B", "All topics listed in the syllabus", "None of the above"]),
            correctOptions: JSON.stringify(["All topics listed in the syllabus"]),
            explanation: "Review the module content to understand all the concepts thoroughly.",
            order: 1
          }
        });
      }
    }

    // Add Milestone Project (Assignment) at the end of the Course (attached to the last module for now)
    if (milestoneData.project && milestoneData.modules.length > 0) {
      // Fetch the last module created for this course to attach the assignment
      const lastModule = await prisma.module.findFirst({
        where: { courseId: course.id },
        orderBy: { order: 'desc' }
      });
      
      if (lastModule) {
        await prisma.assignment.create({
          data: {
            moduleId: lastModule.id,
            title: "🏆 Milestone Project: " + milestoneData.project.title,
            instructions: "Apply everything you have learned in this milestone to build: **" + milestoneData.project.title + "**.\n\n### Requirements:\n" + milestoneData.project.requirements + "\n\nSubmit your GitHub repository link and a live URL (if applicable).",
            requirements: milestoneData.project.requirements,
            allowedTypes: ['GITHUB_URL'],
            status: 'PUBLISHED'
          }
        });
      }
    }
  }

  console.log('✅ Backend Engineering Masterclass successfully seeded!');
}

seedBackendMasterclass()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
