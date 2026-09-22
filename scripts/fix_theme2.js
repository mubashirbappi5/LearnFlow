const fs = require('fs');
const path = require('path');

const filesToFix = [
  'src/app/page.tsx',
  'src/components/layout/Navbar.tsx',
  'src/app/admin/page.tsx',
  'src/app/dashboard/page.tsx'
];

function processFile(filePath) {
  const fullPath = path.join(process.cwd(), filePath);
  if (!fs.existsSync(fullPath)) return;
  
  let content = fs.readFileSync(fullPath, 'utf8');

  // Specific to landing page radial backgrounds
  content = content.replace(/rgba\(10,10,11,0\)/g, 'var(--color-transparent-bg)');
  content = content.replace(/rgba\(255,255,255,0\.05\)/g, 'var(--color-glass)');
  content = content.replace(/rgba\(255,255,255,0\.15\)/g, 'var(--color-glass-strong)');
  content = content.replace(/rgba\(255,255,255,0\.1\)/g, 'var(--color-glass-strong)');
  content = content.replace(/#0f172a/g, 'var(--color-bg-secondary)'); // Dark blue used in SVGs inside cards
  
  // Admin and other backgrounds
  content = content.replace(/rgba\(0, ?0, ?0, ?0\.5\)/g, 'var(--color-input-bg)');
  
  fs.writeFileSync(fullPath, content);
  console.log(`Processed ${filePath}`);
}

filesToFix.forEach(processFile);
