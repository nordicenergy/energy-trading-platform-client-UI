'use strict';

const util = require('util');
const path = require('path');
const fs = require('fs');

const BUILD_DIR = path.join(__dirname, '../build');
const PATH_NAMES = {
    js: '/static/js',
    css: '/static/css',
    media: '/static/media'
};

function determineAsAttribute(filename) {
    // https://w3c.github.io/preload/#as-attribute
    switch (path.extname(filename)) {
        case '.js':
            return 'script';
        case '.css':
            return 'style';
        case '.svg':
        case '.png':
            return 'image';
        default:
            return '';
    }
}

function getLinkHeaders(pathname, fileNames) {
    return fileNames
        .filter(filename => !/.map$/.test(filename))
        .map(
            filename => `Header add Link "<${pathname}/${filename}>;rel=preload;as=${determineAsAttribute(filename)}"`
        );
}

async function generateHtAccessFile() {
    const jsFileNames = await util.promisify(fs.readdir)(path.join(BUILD_DIR, PATH_NAMES.js));
    const cssFileNames = await util.promisify(fs.readdir)(path.join(BUILD_DIR, PATH_NAMES.css));
    const mediaFileNames = await util.promisify(fs.readdir)(path.join(BUILD_DIR, PATH_NAMES.media));
    const headers = [
        ...getLinkHeaders(PATH_NAMES.js, jsFileNames),
        ...getLinkHeaders(PATH_NAMES.css, cssFileNames),
        ...getLinkHeaders(PATH_NAMES.media, mediaFileNames)
    ];
    const htAccessContent = `
<IfModule mod_headers.c>
    # Serve gzip compressed CSS files if they exist 
    # and the client accepts gzip.
    RewriteCond "%{HTTP:Accept-encoding}" "gzip"
    RewriteCond "%{REQUEST_FILENAME}\\.gz" -s
    RewriteRule "^(.*)\\.css" "$1\\.css\\.gz" [QSA]

    # Serve gzip compressed JS files if they exist 
    # and the client accepts gzip.
    RewriteCond "%{HTTP:Accept-encoding}" "gzip"
    RewriteCond "%{REQUEST_FILENAME}\\.gz" -s
    RewriteRule "^(.*)\\.js" "$1\\.js\\.gz" [QSA]


    # Serve correct content types, and prevent mod_deflate double gzip.
    RewriteRule "\\.css\\.gz$" "-" [T=text/css,E=no-gzip:1]
    RewriteRule "\\.js\\.gz$" "-" [T=text/javascript,E=no-gzip:1]


    <FilesMatch "(\\.js\\.gz|\\.css\\.gz)$">
      # Serve correct encoding type.
      Header append Content-Encoding gzip

      # Force proxies to cache gzipped & 
      # non-gzipped css/js files separately.
      Header append Vary Accept-Encoding
    </FilesMatch>
</IfModule>
<ifModule mod_gzip.c>
    mod_gzip_on Yes
    mod_gzip_dechunk Yes
    mod_gzip_item_include file .(html?|txt|css|js)$
    mod_gzip_item_include mime ^text/.*
    mod_gzip_item_include mime ^application/x-javascript.*
    mod_gzip_item_exclude mime ^image/.*
    mod_gzip_item_exclude rspheader ^Content-Encoding:.*gzip.*
</ifModule>
<ifModule http2_module>
    <FilesMatch index.html>
        ${headers.map(header => `        ${header}`).join('\n')}
    </FilesMatch>
</ifModule>
`;

    await util.promisify(fs.writeFile)(path.join(BUILD_DIR, '.htaccess'), htAccessContent);
}

generateHtAccessFile()
    .then(() => {
        console.log('The .htaccess file was successfully generated');
        process.exit(0);
    })
    .catch(error => {
        console.log('The error has occurred during generating .htaccess:');
        console.error(error);
        process.exit(1);
    });
