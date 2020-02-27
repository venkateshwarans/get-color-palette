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
  console.log(reqArr)
  generatePalettes(reqArr, sorted);
}

function generatePalettes(reqArr, sorted) {
  forkJoin(reqArr).subscribe((response) => {

    const mappedToImage  = _.map(response, (swatch, i) => {
      return {file: sorted[i], swatch}
    })
    fs.writeFileSync(`./palette.json`, JSON.stringify(mappedToImage))
  }, error => {
    console.log(error)
  });
}
