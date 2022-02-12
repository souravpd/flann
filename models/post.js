//Local Imports
const { pool } = require("../config/db");
const { uid } = require("../utils/uid");

module.exports.createPost = function ({
  username: username,
  content: content,
  visibility: visibility,
}) {
  return new Promise(async function (resolve, reject) {
    let post_id = uid();
    pool.query(
      `INSERT INTO posts (post_id, content, visibility, username) VALUES (?,?,?,?)`,
      [post_id, content, visibility, username],
      function (error) {
        if (error) {
          return reject(error);
        }
        return resolve();
      }
    );
  });
};

module.exports.getAllPublicPosts = function () {
  return new Promise(async function (resolve, reject) {
    pool.query(
      `SELECT * FROM posts WHERE visibility=?`,
      ["0"],
      function (error, results) {
        if (error) {
          return reject(error);
        } else {
          return resolve(results);
        }
      }
    );
  });
};
