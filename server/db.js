let sql = require("./db/sql.js");

const dbInfo = {
  connetionLimit: process.env.MYSQL_LIMIT,
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
};

const dbPool = require("mysql").createPool(dbInfo);

const query = async (table, dml, values) => {
  return new Promise((resolve, reject) => {
    dbPool.query(sql[table][dml], values, (err, result) => {
      if (err) {
        console.log(err);
        reject({
          err
        });
      } else {
        resolve(result);
      }
    });
  });
};

const query2 = async (query, values) => {
  return new Promise((resolve, reject) => {
    dbPool.query(query, values, (err, result) => {
      if (err) {
        console.log(err);
        reject({
          err
        });
      } else {
        resolve(result);
      }
    })
  })
}

module.exports = {
  query,
  query2
};