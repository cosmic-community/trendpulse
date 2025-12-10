const fs = require('fs');
const path = require('path');

const outputDir = path.join(process.cwd(), '.next', 'static');
const htmlFiles = [];

function findHTMLFiles(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findHTMLFiles(filePath);
    } else if (path.extname(file) === '.html') {
      htmlFiles.push(filePath);
    }
  });
}

function injectScript() {
  findHTMLFiles(outputDir);
  
  htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    
    if (!content.includes('dashboard-console-capture.js')) {
      content = content.replace(
        '</head>',
        '<script src="/dashboard-console-capture.js" defer></script></head>'
      );
      
      fs.writeFileSync(file, content);
      console.log(`Injected console capture script into ${file}`);
    }
  });
}

injectScript();