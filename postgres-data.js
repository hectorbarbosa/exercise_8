const { Client } = require('pg');
const DB_NAME = 'mydb';
const DB_USER = 'postgres';
const DB_HOST = 'localhost';
const DB_PASSWORD = '111';

const client = new Client({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: 5432,
  database: DB_NAME,
});

client.connect();

//  client.query(
//    `CREATE DATABASE ${DB_NAME}
//    WITH OWNER = postgres
//     ENCODING = 'UTF8';`
//  );

client.query(
  `CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  age int NOT NULL);`
);

async function getUsers() {
  try {
    const rows = await new Promise((resolve, reject) => {
      client.query('SELECT * FROM public.users ORDER BY id;', [], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.rows);
        }
      });
    });
    // console.log(result.rows);
    return rows;
  } catch (error) {
    // console.log(error);
    return null;
  }
}

async function addUser(user) {
  try {
    const lastId = await new Promise((resolve, reject) => {
      client.query('INSERT INTO public.users (name, age) VALUES ($1, $2) returning id;',
                    [user.name, user.age], (err, res) => {
        if (err) {
          reject(err);
        } else {
          // console.log(res);
          resolve(res.rows[0].id);
        }
      });
    });
    // console.log(lastId);
    return {id: lastId, ...user};
  } catch(error) {
    return null;
  }
}

async function deleteUser(id) {
  try {
    const deleted = await new Promise((resolve, reject) => {
      client.query('DELETE FROM public.users WHERE id = $1;', [id], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.rowCount);
        }
      });
    });
    // console.log(deleted);
    if (deleted > 0) {
      return true;
    } else {
      return 'invalid id';
    }
  } catch(error) {
    return false;
  }
}

async function getUserById(id) {
  try {
    const user = await new Promise((resolve, reject) => {
      client.query('SELECT * FROM public.users WHERE id = $1;', [id], (err,res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.rows[0]);
        }
      });
    });
    if (user) {
      // console.log(user);
      return user;
    } else {
      return 'invalid id'
    }
  } catch (error) {
    // console.log(error);
    return false;
  }
}

async function updateUser(id, user) {
  try {
    const updatedUser = await new Promise((resolve, reject) => {
      client.query(`UPDATE public.users SET name = $1, age = $2 WHERE id = $3
                    returning *;`,
                   [user.name, user.age, id], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.rows[0]);
        }
      });
    });
    // console.log(user);
    if (updatedUser) {
      return updatedUser;
    } else {
      return 'invalid id';
    }
  } catch (error) {
    // console.log(error);
    return null;
  }
}

module.exports = {getUsers, addUser, deleteUser, getUserById, updateUser};
