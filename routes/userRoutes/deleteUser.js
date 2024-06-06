const data = require('../../postgres-data');

module.exports = async (req, res) => {
  const id = parseInt(req.url.split('/')[2]);
  const result = await data.deleteUser(id);

  if (result === true) {
    res.writeHead(200);
    res.end(JSON.stringify(result));
  } else if (result === 'invalid id')  {
    res.writeHead(400);
    res.end(JSON.stringify({ message: 'Invalid id' }));
  } else if (result === false) {
    res.writeHead(500);
    res.end(JSON.stringify({ message: 'Internal error' }));
  }
}
