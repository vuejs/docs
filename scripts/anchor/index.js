let glob = require('glob');
let path = require('path');
let fs = require('fs');
let { slugify } = require('./slugify');

glob('../../src/**/*.md', { cwd: __dirname }, function (err, files) {
  for (let f of files) {
    let filePath = path.join(__dirname, f);
    let content = fs.readFileSync(filePath, { encoding: 'utf-8' });
    let headings = content.match(/^#+ .+$/gm);
    for (let h of headings ?? []) {
      let _h = h.replace(/{#.+$/, '').trim();
      content = content.replace(h, `${_h} {#${slugify(_h)}}`);
    }
    fs.writeFileSync(filePath, content, { encoding: 'utf-8' });
  }
});
