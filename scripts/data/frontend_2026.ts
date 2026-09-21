export const frontendRoadmap2026 = {
  career: {
    title: 'Front-End Engineering (2026)',
    slug: 'front-end-engineering-2026',
    description: 'Complete 2026 Learning Roadmap: 68 Modules • 12 Milestones',
    overview: 'This is the ultimate, highly structured 2026 roadmap for becoming a production-ready Frontend Engineer. You will master HTML, CSS, JS, React, Next.js, Architecture, and AI-powered development.',
    coreSkills: 'HTML, CSS, JS, TS, React, Next.js, Redux, Node.js, AI Integration, Web Security, CI/CD, Performance Optimization',
    tools: 'VS Code, Git, GitHub, DevTools, Lighthouse, Figma',
    estimatedDuration: '12 Months',
    status: 'PUBLISHED'
  },
  milestones: [
    {
      title: 'Milestone 01 — Web Foundation',
      slug: 'm01-web-foundation',
      description: 'Understanding the core architecture of the web, browsers, HTTP, and basic security.',
      order: 1,
      modules: [
        { title: 'Module 01 — How the Web Works', topics: 'Internet vs Web, Client / Server, Browser, Domain, Hosting, DNS, Request / Response', videoUrl: 'https://www.youtube.com/embed/e4S8zc3ENC4' },
        { title: 'Module 02 — Browser & DevTools', topics: 'Browser architecture, Rendering, DOM, Elements, Console, Network', videoUrl: 'https://www.youtube.com/embed/x4q86IjJFag' },
        { title: 'Module 03 — HTTP & Web Communication', topics: 'HTTP/HTTPS, GET/POST, Status Codes, Headers, JSON, REST API', videoUrl: 'https://www.youtube.com/embed/iYM2zFP3Zn0' },
        { title: 'Module 04 — Web Storage & Security Basics', topics: 'LocalStorage, SessionStorage, Cookies, Same Origin Policy', videoUrl: 'https://www.youtube.com/embed/GihQAC1I39Q' }
      ],
      assignment: { title: 'Web Explorer Dashboard', instructions: 'Build a dashboard displaying Browser info, Current URL, LocalStorage, and fetch API data.', requirements: 'Responsive dashboard, network request.' }
    },
    {
      title: 'Milestone 02 — HTML Engineering',
      slug: 'm02-html-engineering',
      description: 'Mastering semantics, forms, accessibility, and SEO.',
      order: 2,
      modules: [
        { title: 'Module 05 — HTML Fundamentals', topics: 'Elements, Attributes, Headings, Links, Images, Lists, Tables', videoUrl: 'https://www.youtube.com/embed/qz0aGYrrlhU' },
        { title: 'Module 06 — Semantic HTML', topics: 'Header, Nav, Main, Section, Article, Aside, Footer', videoUrl: 'https://www.youtube.com/embed/kG7k86hS_kM' },
        { title: 'Module 07 — Forms & Validation', topics: 'Input, Select, Checkbox, Textarea, Required, Pattern, Validation', videoUrl: 'https://www.youtube.com/embed/fNcJuPIZ2WE' },
        { title: 'Module 08 — SEO & Metadata', topics: 'Title, Meta description, Canonical, Robots, Sitemap, Open Graph', videoUrl: 'https://www.youtube.com/embed/DvwHL3lWlC0' },
        { title: 'Module 09 — Accessibility Fundamentals', topics: 'WCAG, ARIA, Keyboard navigation, Focus, Screen readers', videoUrl: 'https://www.youtube.com/embed/2-z21Vb4L0M' }
      ],
      assignment: { title: 'Professional Business Website', instructions: 'Build Home, About, Services, Contact with Semantic HTML.', requirements: 'SEO, Accessible form, Metadata, Clean HTML.' }
    },
    {
      title: 'Milestone 03 — CSS Engineering',
      slug: 'm03-css-engineering',
      description: 'Layouts, responsive design, modern CSS, and animations.',
      order: 3,
      modules: [
        { title: 'Module 10 — CSS Fundamentals', topics: 'Selectors, Specificity, Box Model, Units, Colors, Typography', videoUrl: 'https://www.youtube.com/embed/1Rs2ND1ryYc' },
        { title: 'Module 11 — Layout Engineering', topics: 'Flexbox, Grid, Position, Alignment, Containers', videoUrl: 'https://www.youtube.com/embed/fYq5JZgSks0' },
        { title: 'Module 12 — Responsive Design', topics: 'Mobile First, Breakpoints, Media Queries, Fluid Layout, Container Queries', videoUrl: 'https://www.youtube.com/embed/VQraviuwbzU' },
        { title: 'Module 13 — Modern CSS', topics: 'CSS Variables, clamp(), aspect-ratio, :has(), CSS Nesting', videoUrl: 'https://www.youtube.com/embed/2XlJ4rZ215E' },
        { title: 'Module 14 — Animation & UI Effects', topics: 'Transition, Transform, Keyframes, Hover effects', videoUrl: 'https://www.youtube.com/embed/YszONjKpgg4' }
      ],
      assignment: { title: 'Premium SaaS Landing Page', instructions: 'Build a responsive SaaS landing page with Hero, Features, Pricing, Testimonials.', requirements: 'Modern CSS, Flex/Grid, Animation, Mobile-first.' }
    },
    {
      title: 'Milestone 04 — Git & Development Workflow',
      slug: 'm04-git-workflow',
      description: 'Version control, collaboration, and tooling.',
      order: 4,
      modules: [
        { title: 'Module 15 — Git Fundamentals', topics: 'Repository, Commit, Branch, Merge, Rebase', videoUrl: 'https://www.youtube.com/embed/8JJ101D3knE' },
        { title: 'Module 16 — GitHub', topics: 'Issues, Pull requests, README, Releases', videoUrl: 'https://www.youtube.com/embed/RGOj5yH7evk' },
        { title: 'Module 17 — Collaboration Workflow', topics: 'Branch strategy, Code review, PR workflow, Merge conflicts', videoUrl: 'https://www.youtube.com/embed/f1wnYdLEpgI' },
        { title: 'Module 18 — Code Quality & Tooling', topics: 'npm, package.json, ESLint, Prettier, Scripts', videoUrl: 'https://www.youtube.com/embed/SydnKbGc7W8' }
      ],
      assignment: { title: 'Team Git Workflow Project', instructions: 'Set up a GitHub repository, create feature branches, configure ESLint/Prettier.', requirements: 'README, PRs, Code review workflow.' }
    },
    {
      title: 'Milestone 05 — JavaScript Core',
      slug: 'm05-javascript-core',
      description: 'Mastering the language of the web.',
      order: 5,
      modules: [
        { title: 'Module 19 — JavaScript Fundamentals', topics: 'Variables, Data Types, Operators, Conditions, Loops', videoUrl: 'https://www.youtube.com/embed/upDLs1sn7g4' },
        { title: 'Module 20 — Functions & Scope', topics: 'Functions, Parameters, Scope, Hoisting, Closure, Callback', videoUrl: 'https://www.youtube.com/embed/vKlybue_yMQ' },
        { title: 'Module 21 — Arrays & Objects', topics: 'Map, Filter, Reduce, Destructuring, Spread, Rest', videoUrl: 'https://www.youtube.com/embed/R8rmfD9Y5-c' },
        { title: 'Module 22 — Modern JavaScript', topics: 'ES6+, Modules, Classes, Optional chaining, Nullish coalescing', videoUrl: 'https://www.youtube.com/embed/NCwa_xi0Uuc' },
        { title: 'Module 23 — DOM & Events', topics: 'Selectors, Manipulation, Event bubbling, Event delegation', videoUrl: 'https://www.youtube.com/embed/y17RuWUpcgk' },
        { title: 'Module 24 — Async JavaScript', topics: 'Callback, Promise, Async/Await, Fetch, Event Loop', videoUrl: 'https://www.youtube.com/embed/V_Kr9OSfDeU' }
      ],
      assignment: { title: 'Advanced Expense Tracker', instructions: 'Build an expense tracker with Add/Edit/Delete, Categories, Search, Filter, LocalStorage.', requirements: 'Responsive UI, Async data if mocked.' }
    },
    {
      title: 'Milestone 06 — TypeScript',
      slug: 'm06-typescript',
      description: 'Adding static typing to JavaScript for scalable code.',
      order: 6,
      modules: [
        { title: 'Module 25 — TypeScript Fundamentals', topics: 'Types, Inference, Interfaces, Type aliases', videoUrl: 'https://www.youtube.com/embed/zQnBQ4tB3ZA' },
        { title: 'Module 26 — Advanced Types', topics: 'Union, Intersection, Literal, Tuple, Enum, Type Guards', videoUrl: 'https://www.youtube.com/embed/zQnBQ4tB3ZA' },
        { title: 'Module 27 — Functions & Generics', topics: 'Generic functions, Constraints, Utility types', videoUrl: 'https://www.youtube.com/embed/nViEqmMHIhw' },
        { title: 'Module 28 — TypeScript with APIs', topics: 'Response types, Error types, DTO concepts', videoUrl: 'https://www.youtube.com/embed/F2JCjVSZlG0' },
        { title: 'Module 29 — TypeScript Project', topics: 'Strict mode, Type-safe components, Project architecture', videoUrl: 'https://www.youtube.com/embed/d56mG7DezGs' }
      ],
      assignment: { title: 'TypeScript Task Manager', instructions: 'Create, Update, Delete Task with Priority and Status filters.', requirements: 'Type-safe API and Components.' }
    },
    {
      title: 'Milestone 07 — React Engineering',
      slug: 'm07-react-engineering',
      description: 'Building modern component-driven UIs.',
      order: 7,
      modules: [
        { title: 'Module 30 — React Fundamentals', topics: 'JSX, Components, Rendering, Props', videoUrl: 'https://www.youtube.com/embed/Tn6-PIqc4UM' },
        { title: 'Module 31 — Components & Props', topics: 'Composition, Reusable components, Children', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
        { title: 'Module 32 — State & Events', topics: 'State, Conditional rendering, Lists, Keys', videoUrl: 'https://www.youtube.com/embed/O6P86uwfdR0' },
        { title: 'Module 33 — React Hooks', topics: 'useState, useEffect, useRef, useMemo, Custom hooks', videoUrl: 'https://www.youtube.com/embed/cF2lQ_gZeA8' },
        { title: 'Module 34 — Forms', topics: 'Controlled forms, Validation, Error handling', videoUrl: 'https://www.youtube.com/embed/tIdNeoHniEY' },
        { title: 'Module 35 — Advanced React', topics: 'Context, Lazy loading, Suspense, Error boundaries', videoUrl: 'https://www.youtube.com/embed/5LrDIWkK_Bc' },
        { title: 'Module 36 — React Performance', topics: 'Re-render, Memoization, Code splitting', videoUrl: 'https://www.youtube.com/embed/Qwb-Za6cBws' }
      ],
      assignment: { title: 'Advanced E-commerce Frontend', instructions: 'Build an E-commerce UI with Home, Products, Cart, Checkout.', requirements: 'Component composition, State management, Hooks.' }
    },
    {
      title: 'Milestone 08 — API & State Management',
      slug: 'm08-api-state',
      description: 'Data fetching, caching, and global state.',
      order: 8,
      modules: [
        { title: 'Module 37 — REST API', topics: 'REST concepts, Resources, Endpoints, CRUD', videoUrl: 'https://www.youtube.com/embed/-MTSQjw5DrM' },
        { title: 'Module 38 — Authentication', topics: 'Login, Tokens, Sessions, Protected routes', videoUrl: 'https://www.youtube.com/embed/vO-F1rUvSJU' },
        { title: 'Module 39 — API Integration', topics: 'Loading states, Errors, Pagination, Filtering', videoUrl: 'https://www.youtube.com/embed/cU7ONyZNteY' },
        { title: 'Module 40 — React Query', topics: 'Server state, Queries, Mutations, Caching', videoUrl: 'https://www.youtube.com/embed/r8Dg0KVnfMA' },
        { title: 'Module 41 — Redux Toolkit', topics: 'Store, Slices, Reducers, Actions, Selectors', videoUrl: 'https://www.youtube.com/embed/bbkBuqC1rU4' },
        { title: 'Module 42 — RTK Query', topics: 'API slices, Caching, Invalidation', videoUrl: 'https://www.youtube.com/embed/HyZzCHgG3AY' }
      ],
      assignment: { title: 'Full E-commerce Application', integration: true, instructions: 'Add API Integration, Authentication, and State Management to the E-commerce app.', requirements: 'Redux/React Query, CRUD operations.' }
    },
    {
      title: 'Milestone 09 — Next.js & Production Apps',
      slug: 'm09-nextjs',
      description: 'Full-stack React with Server Components and Routing.',
      order: 9,
      modules: [
        { title: 'Module 43 — Next.js Fundamentals', topics: 'App Router, Project structure, Rendering', videoUrl: 'https://www.youtube.com/embed/ZjAqacIC_3c' },
        { title: 'Module 44 — Routing & Layouts', topics: 'Dynamic routes, Nested routes, Navigation', videoUrl: 'https://www.youtube.com/embed/ZjAqacIC_3c' },
        { title: 'Module 45 — Server & Client Components', topics: 'Boundaries, Interactive UI', videoUrl: 'https://www.youtube.com/embed/ZjAqacIC_3c' },
        { title: 'Module 46 — Data Fetching & Caching', topics: 'Revalidation, Loading, Error states', videoUrl: 'https://www.youtube.com/embed/ZjAqacIC_3c' },
        { title: 'Module 47 — Authentication in Next.js', topics: 'Auth flow, Sessions, User state', videoUrl: 'https://www.youtube.com/embed/w2h54xz6Ndw' },
        { title: 'Module 48 — SEO & Performance', topics: 'Metadata, Images, Fonts, Core Web Vitals', videoUrl: 'https://www.youtube.com/embed/DvwHL3lWlC0' },
        { title: 'Module 49 — Next.js Production', topics: 'Production builds, Environment variables', videoUrl: 'https://www.youtube.com/embed/ZjAqacIC_3c' }
      ],
      assignment: { title: 'Project Management SaaS', instructions: 'Build a full-stack SaaS with Auth, Projects, Tasks, Teams.', requirements: 'Next.js App Router, Database, Server Components.' }
    },
    {
      title: 'Milestone 10 — Professional Frontend',
      slug: 'm10-professional',
      description: 'Architecture, Component Systems, Accessibility, and Testing.',
      order: 10,
      modules: [
        { title: 'Module 50 — UI Architecture', topics: 'Feature-based architecture, Scalability', videoUrl: 'https://www.youtube.com/embed/tVzE0X_Gikg' },
        { title: 'Module 51 — Tailwind CSS', topics: 'Utility classes, Responsive design, Dark mode', videoUrl: 'https://www.youtube.com/embed/UBOj6rqRUME' },
        { title: 'Module 52 — Component Systems', topics: 'Design tokens, Variants, Documentation', videoUrl: 'https://www.youtube.com/embed/WbV3zRgg5yE' },
        { title: 'Module 53 — Accessibility', topics: 'Keyboard navigation, Focus management, Contrast', videoUrl: 'https://www.youtube.com/embed/2-z21Vb4L0M' },
        { title: 'Module 54 — Testing', topics: 'Unit testing, React Testing Library, Playwright', videoUrl: 'https://www.youtube.com/embed/8Xwq35cPwYg' },
        { title: 'Module 55 — Performance', topics: 'LCP, INP, CLS, Lighthouse', videoUrl: 'https://www.youtube.com/embed/Qwb-Za6cBws' },
        { title: 'Module 56 — Frontend Security', topics: 'XSS, CSRF, CORS, CSP', videoUrl: 'https://www.youtube.com/embed/HCW0usw9iHI' }
      ],
      assignment: { title: 'Production Dashboard', instructions: 'Implement Design System, Accessibility, Unit Tests, and Security.', requirements: 'Tailwind CSS, Lighthouse score > 90, 100% accessible.' }
    },
    {
      title: 'Milestone 11 — Deployment & Architecture',
      slug: 'm11-deployment',
      description: 'CI/CD, Hosting, and Monitoring.',
      order: 11,
      modules: [
        { title: 'Module 57 — Build Tools', topics: 'Vite, Bundling, Tree shaking', videoUrl: 'https://www.youtube.com/embed/KCrXgy8qtjM' },
        { title: 'Module 58 — Environment Management', topics: 'Staging, Production, Secrets', videoUrl: 'https://www.youtube.com/embed/17UVejOw3zA' },
        { title: 'Module 59 — Deployment', topics: 'Hosting, Domains, SSL', videoUrl: 'https://www.youtube.com/embed/yQhJXXr_i-M' },
        { title: 'Module 60 — CI/CD', topics: 'GitHub Actions, Pipelines', videoUrl: 'https://www.youtube.com/embed/R8_veQiYBjI' },
        { title: 'Module 61 — Frontend Architecture', topics: 'Service layer, Maintainability', videoUrl: 'https://www.youtube.com/embed/tVzE0X_Gikg' },
        { title: 'Module 62 — Monitoring & Debugging', topics: 'Logs, Error monitoring', videoUrl: 'https://www.youtube.com/embed/qM4-sBhwD78' }
      ],
      assignment: { title: 'Production Deployment System', instructions: 'Set up GitHub Actions to auto-deploy to a custom domain on push.', requirements: 'CI/CD, Monitoring integrated.' }
    },
    {
      title: 'Milestone 12 — AI-Powered Frontend',
      slug: 'm12-ai-frontend',
      description: 'Integrating LLMs, RAG, and AI tools into applications.',
      order: 12,
      modules: [
        { title: 'Module 63 — AI for Developers', topics: 'AI-assisted coding, Prompt engineering, Code generation', videoUrl: 'https://www.youtube.com/embed/YvT_gqs5ETk' },
        { title: 'Module 64 — AI API Integration', topics: 'LLM APIs, Structured output, Error handling', videoUrl: 'https://www.youtube.com/embed/WIfiN9R5q20' },
        { title: 'Module 65 — AI Chat Applications', topics: 'Chat UI, Messages, Conversation history', videoUrl: 'https://www.youtube.com/embed/WIfiN9R5q20' },
        { title: 'Module 66 — Streaming & Structured Output', topics: 'Streaming, Tool calling, Real-time UI', videoUrl: 'https://www.youtube.com/embed/m1qWJ6I4gYI' },
        { title: 'Module 67 — AI Search & RAG', topics: 'Embeddings, Vector database, Semantic search', videoUrl: 'https://www.youtube.com/embed/QdDoFzDiZz4' },
        { title: 'Module 68 — Production AI Application', topics: 'Rate limiting, Security, Deployment', videoUrl: 'https://www.youtube.com/embed/WIfiN9R5q20' }
      ],
      assignment: { title: 'FINAL PROJECT — AI Career Intelligence Platform', instructions: 'Build a fully-functional platform like LearnFlow itself with AI recommendations and integrations.', requirements: 'Full stack, AI Integration, Security, Performance, CI/CD.' }
    }
  ]
};
