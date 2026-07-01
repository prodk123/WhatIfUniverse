const fs = require('fs');
const glob = require('fast-glob');
const path = require('path');

const files = glob.sync('src/**/*.{ts,tsx}');
let hasErrors = false;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  const imports = content.match(/from\s+['"]([^'"]+)['"]/g);
  if (imports) {
    imports.forEach(imp => {
      const match = imp.match(/from\s+['"]([^'"]+)['"]/);
      let target = match[1];
      if (target.startsWith('@/')) {
        target = target.replace('@/', './src/');
      }
      if (target.startsWith('.') || target.startsWith('@/')) {
        let absolutePath;
        if (target.startsWith('./src/')) {
          absolutePath = path.resolve(target);
        } else {
          absolutePath = path.resolve(path.dirname(file), target);
        }
        
        let found = false;
        const extensions = ['', '.ts', '.tsx', '.js', '.jsx', '.css'];
        for (const ext of extensions) {
          if (fs.existsSync(absolutePath + ext)) {
            // Check exact case
            const dir = path.dirname(absolutePath + ext);
            const base = path.basename(absolutePath + ext);
            if (fs.existsSync(dir)) {
               const actualFiles = fs.readdirSync(dir);
               if (actualFiles.includes(base)) {
                  found = true;
                  break;
               } else if (actualFiles.map(f => f.toLowerCase()).includes(base.toLowerCase())) {
                  console.error('CASE SENSITIVITY ERROR: ' + target + ' in ' + file);
                  hasErrors = true;
                  found = true;
                  break;
               }
            }
          }
        }
        
        // Also check if target is a directory with index.ts
        if (!found) {
           for (const ext of ['.ts', '.tsx', '.js', '.jsx']) {
             if (fs.existsSync(path.join(absolutePath, 'index' + ext))) {
                const dir = absolutePath;
                const base = 'index' + ext;
                const actualFiles = fs.readdirSync(dir);
                if (actualFiles.includes(base)) {
                  found = true;
                  break;
                }
             }
           }
        }
        
        if (!found) {
           console.error('NOT FOUND: ' + target + ' in ' + file);
        }
      }
    });
  }
});
