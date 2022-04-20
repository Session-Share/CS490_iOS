const fs = require('fs');
var path = require('path');

exports.writeTokens = (tokens) => {
  fs.writeFileSync('./controllers/credentials.txt', tokens, { flag: 'w+' }, err => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

exports.readTokens = (tokens) => {
  try {
    const data = fs.readFileSync('./controllers/credentials.txt', 'utf8');
    const tokens = data.split(" ");
    return tokens;
  } catch (err) {
    console.error(err);
  }
}
