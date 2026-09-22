const fs = require('fs');
const path = require('path');

const filesToFix = [
  'src/app/learn/[courseSlug]/layout.tsx',
  'src/app/dashboard/page.tsx',
  'src/app/admin/courses/[id]/page.tsx',
  'src/app/admin/careers/page.tsx'
];

function processFile(filePath) {
  const fullPath = path.join(process.cwd(), filePath);
  if (!fs.existsSync(fullPath)) return;
  
  let content = fs.readFileSync(fullPath, 'utf8');

  // Insert imports
  if (content.includes('lucide-react')) {
     if (!content.includes('Lock')) content = content.replace(/import {([^}]+)} from 'lucide-react';/, "import { $1, Lock } from 'lucide-react';");
     if (!content.includes('Award')) content = content.replace(/import {([^}]+)} from 'lucide-react';/, "import { $1, Award } from 'lucide-react';");
     if (!content.includes('FolderOpen')) content = content.replace(/import {([^}]+)} from 'lucide-react';/, "import { $1, FolderOpen } from 'lucide-react';");
     if (!content.includes('FileText')) content = content.replace(/import {([^}]+)} from 'lucide-react';/, "import { $1, FileText } from 'lucide-react';");
  } else {
     content = "import { Lock, Award, FileText, FolderOpen } from 'lucide-react';\n" + content;
  }

  // Common emojis that might have been mangled or exist as unicode
  content = content.replace(/🔒/g, '<Lock size={16} className="inline" />');
  content = content.replace(/🏆/g, '<Award size={16} className="inline" />');
  content = content.replace(/📁/g, '<FolderOpen size={16} className="inline" />');
  content = content.replace(/📄/g, '<FileText size={16} className="inline" />');
  content = content.replace(/⚡/g, '<Award size={16} className="inline" />');
  content = content.replace(/✅/g, '<Award size={16} className="inline" />');

  // In case they are mangled as ? or ?? in the source if PowerShell did something, though that was just console output.
  // The actual source code contains the emojis. 

  fs.writeFileSync(fullPath, content);
  console.log(`Processed ${filePath}`);
}

filesToFix.forEach(processFile);
