const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const indexPath = path.join(process.cwd(), 'index.html');

test('index.html uses the TV app shell with exit confirmation dialog', () => {
    const html = fs.readFileSync(indexPath, 'utf8');

    assert.equal(html.includes('id="exit-confirm-dialog"'), true);
    assert.equal(html.includes('js/remote.js'), true);
    assert.equal(html.includes('js/router.js'), true);
    assert.equal(html.includes('js/app.js'), true);
    assert.equal(html.includes('/src/main.tsx'), false);
});
