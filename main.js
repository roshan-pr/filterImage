const { filter } = require('./src/filter.js');

const main = (...images) => {
  images.forEach((image) => filter(image));
};

main(...process.argv.slice(2));
