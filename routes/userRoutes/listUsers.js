const data = require('../../postgres-data');

module.exports = async (req, res) => {
  const users = await data.getUsers();
  if (users === null) {
    res.writeHead(500);
    res.end(JSON.stringify({ message: 'Internal error' }));
  } else {
    res.writeHead(200);
    res.end(JSON.stringify(users));
  }
}
