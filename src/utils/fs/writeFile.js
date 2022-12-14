const fs = require('fs/promises');

const writeFile = async (data, path) => {
  try {
    const dataTalker = await fs.writeFile(path, JSON.stringify(data, null, 2));
    return dataTalker;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

module.exports = { writeFile };