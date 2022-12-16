const fs = require('fs/promises');

const readFile = async (path) => {
  try {
    const dataTalker = await fs.readFile(path, 'utf-8');
    return JSON.parse(dataTalker);
  } catch (error) {
    console.log(error.massage);
    // console.log('deu ruim');
    return false;
  }
};

module.exports = { readFile };