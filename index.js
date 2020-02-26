const Vibrant = require('node-vibrant')
const fs = require('fs');
const dir = './screenshots/BTSONKineticManifestoFilm';
const junk = require('junk');
const { forkJoin } = require('rxjs');
const _ = require('lodash');


fs.readdir(dir, (err, files) => {
  console.log(files.filter(junk.not))
  createVibrantCall(files.filter(junk.not))
});

function createVibrantCall(files) {
  const reqArr  =[]
  _.forEach(files, (file) => {
    reqArr.push(Vibrant.from(`${dir}/${file}`).getPalette())
  })
  console.log(reqArr)
  generatePalettes(reqArr);
}

function generatePalettes(reqArr) {
  forkJoin(reqArr).subscribe((response) => {
    console.log(response)
  });
}
