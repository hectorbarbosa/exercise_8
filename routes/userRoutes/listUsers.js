const data = require('../../postgres-data');

module.exports = async (req, res) => {
  res.writeHead(200);
  const users = await data.getUsers();
  res.end(JSON.stringify(users));
}
