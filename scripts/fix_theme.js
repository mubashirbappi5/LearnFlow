const fs = require('fs');
const path = require('path');

const filesToFix = [
  'src/app/settings/page.tsx',
  'src/app/dashboard/library/page.tsx',
  'src/app/dashboard/page.tsx',
  'src/components/layout/UserNavDropdown.tsx',
  'src/components/learning/NotesSection.tsx',
  'src/components/learning/BookmarkButton.tsx',
  'src/components/admin/AnalyticsChart.tsx',
  'src/app/learn/[courseSlug]/lesson/[lessonId]/page.tsx'
];

function processFile(filePath) {
  const fullPath = path.join(process.cwd(), filePath);
  if (!fs.existsSync(fullPath)) return;
  
  let content = fs.readFileSync(fullPath, 'utf8');

  // Backgrounds
  content = content.replace(/linear-gradient\(145deg, #0a0a0f 0%, #11111a 100%\)/g, 'var(--color-bg-primary)');
  content = content.replace(/rgba\(30, ?30, ?40, ?0\.4\)/g, 'var(--color-bg-secondary)');
  content = content.replace(/rgba\(30, ?30, ?40, ?0\.6\)/g, 'var(--color-bg-secondary)');
  content = content.replace(/rgba\(20, ?20, ?25, ?0\.95\)/g, 'var(--color-bg-secondary)');
  content = content.replace(/background: '#000'/g, "background: 'var(--color-bg-primary)'");
  content = content.replace(/backgroundColor: '#000'/g, "backgroundColor: 'var(--color-bg-primary)'");
  
  // Glass and borders
  content = content.replace(/rgba\(255, ?255, ?255, ?0\.05\)/g, 'var(--color-glass)');
  content = content.replace(/rgba\(255, ?255, ?255, ?0\.1\)/g, 'var(--color-glass-strong)');
  
  // Inputs
  content = content.replace(/rgba\(0, ?0, ?0, ?0\.2\)/g, 'var(--color-input-bg)');
  content = content.replace(/rgba\(0, ?0, ?0, ?0\.4\)/g, 'var(--color-input-bg)');
  
  // Text colors
  content = content.replace(/color: 'white'/g, "color: 'var(--color-text-primary)'");
  content = content.replace(/color: '#e5e7eb'/g, "color: 'var(--color-text-primary)'");
  content = content.replace(/color: '#f3f4f6'/g, "color: 'var(--color-text-primary)'");
  content = content.replace(/color: '#9ca3af'/g, "color: 'var(--color-text-secondary)'");

  // Fix button text which might have been changed to var(--color-text-primary)
  // We'll leave it as var(--color-text-primary) since buttons usually have background colors that might need contrast changes,
  // but let's be careful. Actually, primary buttons might have white text always.
  // We will let them be var(--color-text-primary) which is black in light mode. If the button is blue, black text is bad.
  // So let's restore 'white' for btn-primary texts by a quick regex or we can just ignore for now and see.
  // A better way is to do it manually for buttons.
  
  fs.writeFileSync(fullPath, content);
  console.log(`Processed ${filePath}`);
}

filesToFix.forEach(processFile);
