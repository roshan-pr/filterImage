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

  getImage() {
    return this.#pixels.flatMap((pixel) => pixel.getPixel());
  }
}

exports.Image = Image;
