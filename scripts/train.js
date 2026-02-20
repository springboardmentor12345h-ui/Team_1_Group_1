const fs = require('fs');
const path = require('path');

const repoPath = path.join(__dirname, '../temp_repo');
const outputPath = path.join(__dirname, '../data/context.txt');

const allowedExtensions = ['.md', '.js', '.jsx', '.json', '.html', '.css'];
const ignoredDirs = ['node_modules', '.git', 'dist', 'build', 'coverage'];
const ignoredFiles = ['package-lock.json', 'yarn.lock'];

function scanDirectory(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat && stat.isDirectory()) {
            if (!ignoredDirs.includes(file)) {
                results = results.concat(scanDirectory(filePath));
            }
        } else {
            const ext = path.extname(file);
            if (allowedExtensions.includes(ext) && !ignoredFiles.includes(file)) {
                results.push(filePath);
            }
        }
    });
    
    return results;
}

function generateContext() {
    console.log(`Scanning ${repoPath}...`);
    try {
        if (!fs.existsSync(repoPath)) {
            console.error('Repository not found. Please run "git clone ..." first.');
            return;
        }

        const files = scanDirectory(repoPath);
        let contextContent = '';

        console.log(`Found ${files.length} files.`);

        files.forEach(file => {
            const relativePath = path.relative(repoPath, file);
            const content = fs.readFileSync(file, 'utf8');
            
            contextContent += `\n--- START OF FILE: ${relativePath} ---\n`;
            contextContent += content;
            contextContent += `\n--- END OF FILE: ${relativePath} ---\n`;
        });

        fs.writeFileSync(outputPath, contextContent);
        console.log(`Context generated at ${outputPath} (${contextContent.length} characters)`);
        
    } catch (error) {
        console.error('Error generating context:', error);
    }
}

generateContext();
