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

exports.Image = Image;
