const Vibrant = require('node-vibrant')
const fs = require('fs');
const dir = './screenshots/BTSONKineticManifestoFilm';
const junk = require('junk');
const { forkJoin } = require('rxjs');
const _ = require('lodash');


fs.readdir(dir, (err, files) => {
  createVibrantCall(files.filter(junk.not))
});

function createVibrantCall(files) {
  const sorted = files.sort(function(a, b) {
    return fs.statSync(`${dir}/${a}`).mtime.getTime() -
           fs.statSync(`${dir}/${b}`).mtime.getTime();
  });
  const reqArr  = _.map(sorted, (file) => {
    return Vibrant.from(`${dir}/${file}`).getPalette();
  })
  generatePalettes(reqArr);
}

function generatePalettes(reqArr) {
  forkJoin(reqArr).subscribe((response) => {
    fs.writeFileSync(`./palette.json`, JSON.stringify(response))
  }, error => {
    console.log(error)
  });
}
