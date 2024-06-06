const data = require('../../postgres-data');

module.exports = async (req, res) => {
  const id = parseInt(req.url.split('/')[2]);
  const result = await data.deleteUser(id);

  if (result) {
    res.writeHead(200);
  } else {
    res.writeHead(400);
  }
  res.end(JSON.stringify(result));
}
