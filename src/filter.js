const fs = require('fs');
const jpeg = require('jpeg-js');
const { Image } = require("./image.js");
const { Pixel } = require('./pixel.js');

const gatherPixels = ({ data }) => {
  const pixels = [];
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b, a] = data.slice(i, i + 4);
    pixels.push(new Pixel(r, g, b, a));
  }

  return pixels;
};

const removeRed = (pixel) => pixel.noRed();
const removeGreen = (pixel) => pixel.noGreen();

const filter = (img) => {
  const imageData = fs.readFileSync(img);
  const decodedImg = jpeg.decode(imageData);

  const pixels = gatherPixels(decodedImg);
  const image = new Image(decodedImg.height, decodedImg.width, pixels);
  // const filterImage = image.applyFilter(removeGreen);
  // const reversedImage = image.reverse();
  const blurImage = image.blur();

  decodedImg.data = blurImage.getImage();
  fs.writeFileSync('./_blur' + img, jpeg.encode(decodedImg).data);
};

module.exports = { filter };
