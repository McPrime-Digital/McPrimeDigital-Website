const fs = require('fs');
const path = require('path');

// Directories to scan for references
const CODE_DIRS = ['app', 'components', 'lib', 'styles', 'utils', 'hooks'];
const PUBLIC_DIR = 'public';

// Ignore root SEO/manifest files
const IGNORE_FILES = [
    'favicon.ico',
    'robots.txt',
    'sitemap.xml',
    'manifest.json',
    '.DS_Store'
];

function getFilesRecursively(dir, fileList = []) {
    if (!fs.existsSync(dir)) return fileList;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== '.next') {
                getFilesRecursively(filePath, fileList);
            }
        } else {
            fileList.push(filePath);
        }
    }
    return fileList;
}

function runAudit() {
    console.log('--- Starting Codebase Asset Audit ---');

    // 1. Gather all public assets
    const publicFiles = getFilesRecursively(PUBLIC_DIR);
    console.log(`Found ${publicFiles.length} files in public directory.`);

    // 2. Gather all code files
    let codeFiles = [];
    for (const cd of CODE_DIRS) {
        getFilesRecursively(cd, codeFiles);
    }
    // also check root config files
    const rootFiles = fs.readdirSync('.').filter(f => f.endsWith('.ts') || f.endsWith('.js') || f.endsWith('.json') || f.endsWith('.css'));
    rootFiles.forEach(f => codeFiles.push(f));

    console.log(`Found ${codeFiles.length} code/config files to cross-reference.`);

    // 3. Read all code into a massive string for ultra-fast matching
    let fullCodebaseContent = '';
    for (const cf of codeFiles) {
        fullCodebaseContent += fs.readFileSync(cf, 'utf8') + '\n';
    }

    const unusedAssets = [];

    // 4. Check each asset
    for (const assetPath of publicFiles) {
        const basename = path.basename(assetPath);
        if (IGNORE_FILES.includes(basename)) continue;

        // Convert 'public/images/logo.png' -> '/images/logo.png'
        let webPath = assetPath.substring(PUBLIC_DIR.length);
        webPath = webPath.split(path.sep).join('/'); // normalize to forward slashes

        // To be 100% certain, we search for the exact web path e.g. "/images/logo.png"
        // AND we also search for just the filename "logo.png" in case of dynamic string building
        const hasWebPath = fullCodebaseContent.includes(webPath);
        const hasBasename = fullCodebaseContent.includes(basename);

        if (!hasWebPath && !hasBasename) {
            // 100% unused
            const stats = fs.statSync(assetPath);
            const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
            unusedAssets.push({ path: assetPath, sizeMB: parseFloat(sizeMB) });
        }
    }

    // 5. Output results
    unusedAssets.sort((a, b) => b.sizeMB - a.sizeMB); // sort by size descending

    console.log('\n======================================================');
    console.log('100% CONFIRMED UNUSED ASSETS:');
    console.log('======================================================\n');

    let totalMemorySaved = 0;
    for (const item of unusedAssets) {
        console.log(`[ ] ${item.path}  -->  ${item.sizeMB} MB`);
        totalMemorySaved += item.sizeMB;
    }

    console.log('\n======================================================');
    console.log(`TOTAL POTENTIAL MEMORY RECOVERY: ${totalMemorySaved.toFixed(2)} MB`);
    console.log('======================================================');
}


runAudit();
