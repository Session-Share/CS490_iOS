const fs = require('fs');
var path = require('path');

exports.writeTokens = async (tokens) => {

  try {
    fs.writeFileSync('./controllers/credentials.txt', tokens, { flag: 'w+', encoding: 'utf8' });
  } catch (err) {
    console.log("Error Writing tokens to file:\n", err);
  }
}

exports.readTokens = (tokens) => {
  try {
    const data = fs.readFileSync('./controllers/credentials.txt', 'utf8');
    return data;
  } catch (err) {
    console.error("Error Reading tokens from file:\n", err);
  }
}
