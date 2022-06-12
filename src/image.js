const { Pixel } = require("./pixel");

const identity = x => x;

class Image {
  #pixels;
  #height;
  #width;

  constructor(height, width, pixels) {
    this.#pixels = pixels;
    this.#height = height;
    this.#width = width;
  }

  applyFilter(filter = identity) {
    const pixels = this.#pixels.map((pixel) => filter(pixel));
    return new Image(this.#height, this.#width, pixels);
  }

  reverse() {
    return new Image(this.#height, this.#width, this.#pixels.reverse());
  }

  blur() {
    const pixels = this.#pixels;
    const width = this.#width;
    const blurPixels = [];
    for (let i = 0; i < pixels.length; i++) {
      try {
        const [r1, g1, b1, a1] = pixels[i].getPixel();
        const [r2, g2, b2, a2] = pixels[i + 1].getPixel();
        const [r3, g3, b3, a3] = pixels[i + width].getPixel();
        const [r4, g4, b4, a4] = pixels[i + width + 1].getPixel();

        blurPixels.push(new Pixel(
          Math.floor((r1 + r2 + r3 + r4) / 4),
          Math.floor((g1 + g2 + g3 + g4) / 4),
          Math.floor((b1 + b2 + b3 + b4) / 4),
          Math.floor((a1 + a2 + a3 + a4) / 4)
        ));
      } catch (error) {
        blurPixels.push(pixels[i]);
      }
    };
    return new Image(this.#height, this.#width, blurPixels);
  }

  getImage() {
    return this.#pixels.flatMap((pixel) => pixel.getPixel());
  }
}

exports.Image = Image;
