const path = require('path');

module.exports = {
    require: [path.join(__dirname, '/src/index.css')],
    title: 'Lition Web Components List',
    ignore: ['**/*.test.js', '**/*index.js'],
    sections: [{ name: 'Web Components', components: 'src/components/**/*.js' }],
    skipComponentsWithoutExample: true,
    getExampleFilename: componentpath =>
        componentpath.replace(/\.js$/, '.doc.md')
};
