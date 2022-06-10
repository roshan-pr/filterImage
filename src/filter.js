const fs = require('fs');
const jpeg = require('jpeg-js');
const { Image } = require("./image.js");
const { Pixel } = require('./pixel.js');

const gatherPixels = (data) => {
  const pixels = [];
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b, a] = data.slice(i, i + 4);
    pixels.push(new Pixel(r, g, b, a));
  }

  return pixels;
};

const main = () => {
  const imageData = fs.readFileSync('./bird.jpeg');
  const decodedImg = jpeg.decode(imageData);

  const pixels = gatherPixels(decodedImg.data);
  const image = new Image(decodedImg.height, decodedImg.width, pixels);
  const filterRed = image.redFilter();

  decodedImg.data = filterRed.getImage();
  fs.writeFileSync('./_image.jpeg', jpeg.encode(decodedImg).data);
};

main();
