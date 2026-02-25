const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

const lines = css.split('\n');
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('font-size: ;')) {
        let className = '';
        for (let j = i; j >= 0; j--) {
            if (lines[j].includes('{')) {
                className = lines[j].split('{')[0].trim();
                break;
            }
        }
        let size = '0.95em';
        if (className.includes('name') || className.includes('empty')) size = '2.2em';
        else if (className.includes('section-title')) size = '1.3em';
        else if (className.includes('title') || className.includes('degree')) size = '1.1em';
        else if (className.includes('company') || className.includes('institution')) size = '1.05em';
        else if (className.includes('contact') || className.includes('tag')) size = '0.85em';
        else if (className.includes('desc') || className.includes('summary')) size = '0.95em';
        else if (className.includes('date') || className.includes('label')) size = '0.9em';

        lines[i] = lines[i].replace('font-size: ;', `font-size: ${size};`);
    }

    if (lines[i].includes('margin: ;')) lines[i] = lines[i].replace('margin: ;', 'margin: 0.5em;');
    if (lines[i].includes('margin-bottom: ;')) lines[i] = lines[i].replace('margin-bottom: ;', 'margin-bottom: 0.5em;');
    if (lines[i].includes('margin-top: ;')) lines[i] = lines[i].replace('margin-top: ;', 'margin-top: 0.5em;');
    if (lines[i].includes('padding: ;')) lines[i] = lines[i].replace('padding: ;', 'padding: 0.5em;');
    if (lines[i].includes('padding-bottom: ;')) lines[i] = lines[i].replace('padding-bottom: ;', 'padding-bottom: 0.5em;');

}
fs.writeFileSync('src/index.css', lines.join('\n'));
console.log('Fixed index.css');
