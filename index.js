const Vibrant = require('node-vibrant')
const fs = require('fs');
const dir = './BTSONKineticManifestoFilm';
const junk = require('junk');
const { forkJoin } = require('rxjs');


fs.readdir(dir, (err, files) => {
  console.log(files.filter(junk.not).length);
});

const imagePath = './BTSONKineticManifestoFilm/BTSONKineticManifestoFilm '

const reqArr = [Vibrant.from(`${imagePath}(1).png`).getPalette(), Vibrant.from(`${imagePath}(2).png`).getPalette(), Vibrant.from(`${imagePath}(3).png`).getPalette()]

forkJoin(reqArr).subscribe((response) => {
  console.log(response)
});



// Vibrant.from(`${imagePath}`).getPalette()
//   .then((palette) => console.log(palette))
