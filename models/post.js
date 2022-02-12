//Local Imports
const { pool } = require("../config/db");
const {
  redisGetFriends,
  redisGetExtendedFriends,
} = require("../utils/redis_utils");
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

module.exports.getAllFriendsPosts = function ({ username: username }) {
  return new Promise(async function (resolve, reject) {
    pool.query(
      `SELECT * from posts WHERE visibility=?`,
      ["1"],
      async function (error, results) {
        if (error) {
          return reject(error);
        } else {
          let rows = Object.values(JSON.parse(JSON.stringify(results)));
          let user_friends;
          try {
            user_friends = new Set(await redisGetFriends(username));
          } catch (error) {
            return reject(error);
          }
          friend_posts = rows.filter(function (row) {
            return user_friends.has(row.username);
          });
          return resolve(friend_posts);
        }
      }
    );
  });
};

module.exports.getAllExtendedFriendsPosts = function ({ username: username }) {
  return new Promise(async function (resolve, reject) {
    pool.query(
      `SELECT * from posts WHERE visibility=?`,
      ["2"],
      async function (error, results) {
        if (error) {
          return reject(error);
        } else {
          let rows = Object.values(JSON.parse(JSON.stringify(results)));
          let user_extended_friends;
          try {
            user_extended_friends = new Set(
              await redisGetExtendedFriends(username)
            );
          } catch (error) {
            return reject(error);
          }
          extended_friends_posts = rows.filter(function (row) {
            return user_extended_friends.has(row.username);
          });
          return resolve(extended_friends_posts);
        }
      }
    );
  });
};