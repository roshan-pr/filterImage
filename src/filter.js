const fs = require('fs');
const jpeg = require('jpeg-js');
const { Pixel } = require('./pixel.js');

const filter = (image) => {
  const imageData = fs.readFileSync(image);

  const decodedImage = jpeg.decode(imageData);

  const translate = new Array(decodedImage.data.length);
  for (let i = 0; i < decodedImage.data.length; i += 4) {
    const [r, g, b, a] = decodedImage.data.slice(i, i + 4);
    translate[i + 0] = 0;
    translate[i + 1] = g;
    translate[i + 2] = b;
    translate[i + 3] = a;
  }

  decodedImage.data = translate;
  fs.writeFileSync('_birdGreen.jpeg', jpeg.encode(decodedImage).data);
};

module.exports = { filter };

class Image {
  #pixels;
  #height;
  #width;

  constructor(height, width, pixels) {
    this.#pixels = pixels;
  }

  redFilter() {
    const pixels = this.#pixels.map((pixel) => pixel.noRed());
    return new Image(this.#height, this.#width, pixels);
  }

  getImage() {
    const pixels = this.#pixels.flatMap((pixel) => pixel.getPixel());
    return [...pixels];
  }
}

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
  // console.log(filterRed.getImage());

  decodedImg.data = filterRed.getImage();
  fs.writeFileSync('./_image.jpeg', jpeg.encode(decodedImg).data);
};

main();
