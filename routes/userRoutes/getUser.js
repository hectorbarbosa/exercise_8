const data = require('../../postgres-data');

module.exports = async (req, res) => {
  const id = parseInt(req.url.split('/')[2]);
  const result = await data.getUserById(id);

  if (result) {
    if (result === 'invalid id') {
      res.writeHead(404);
      res.end(JSON.stringify({ message: 'User not found' }));
    } else {
      res.writeHead(200);
      res.end(JSON.stringify(result));
    }
  } else if (result === false) {
    res.writeHead(500);
    res.end(JSON.stringify({ message: 'Internal error' }));
  }
}
