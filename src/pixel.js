class Pixel {
  #red;
  #green;
  #blue;
  #alpha;
  constructor(red, green, blue, alpha) {
    this.#red = red;
    this.#green = green;
    this.#blue = blue;
    this.#alpha = alpha;
  }

  noRed() {
    return new Pixel(0, this.#green, this.#blue, this.#alpha);
  }

  noGreen() {
    return new Pixel(this.#red, 0, this.#blue, this.#alpha);
  }

  getPixel() {
    return [this.#red, this.#green, this.#blue, this.#alpha];
  }

  toString() {
    return `${this.#red} ${this.#green} ${this.#blue} ${this.#alpha}`
  }
}

module.exports = { Pixel };
