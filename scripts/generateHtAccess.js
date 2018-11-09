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
    const htAccessContent = `<ifModule http2_module>
    <filesMatch index.html>
${headers.map(header => `        ${header}`).join('\n')}
    </filesMatch>
</ifModule>`;

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
