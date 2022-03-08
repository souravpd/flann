//Local Imports
const { pool } = require("../config/db");

const {
  redisGetFriends,
  redisGetExtendedFriends,
} = require("../utils/redis_utils");
const { uid } = require("../utils/uid");

//@audit Image has to be Optional
module.exports.createPost = function ({
  username: username,
  content: content,
  visibility: visibility,
  img_src: img_src,
}) {
  return new Promise(async function (resolve, reject) {
    let post_id = uid();
    pool.query(
      `INSERT INTO posts (post_id, content, visibility, username, img_src) VALUES (?,?,?,?,?)`,
      [post_id, content, visibility, username, img_src],
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

module.exports.getSinglePublicPost = function ({ post_id: post_id }) {
  return new Promise(async function (resolve, reject) {
    pool.query(
      `SELECT * FROM posts WHERE post_id=? AND visibility=?`,
      [post_id, "0"],
      async function (error, results) {
        if (error) {
          return reject(error);
        } else if (results.length == 0) {
          return reject("No Post with such id exits");
        } else {
          return resolve(results[0]);
        }
      }
    );
  });
};

//Get single friends post => check if the user is authorized to see this post
module.exports.getSingleFriendsPost = function ({
  post_id: post_id,
  username: username,
}) {
  return new Promise(async function (resolve, reject) {
    pool.query(
      `SELECT * FROM posts WHERE post_id=? AND visibility=?`,
      [post_id, "1"],
      async function (error, results) {
        if (error) {
          return reject(error);
        } else if (results.length == 0) {
          return reject("Post with such id doesnot exits");
        } else {
          let rows = Object.values(JSON.parse(JSON.stringify(results)));
          let user_friends;
          try {
            user_friends = new Set(await redisGetFriends(username));
          } catch (error) {
            return reject(error);
          }
          friends_post = rows.filter(function (row) {
            return user_friends.has(row.username);
          });
          if (friends_post.length == 0) {
            return reject("Not Authorized");
          }
          return resolve(friends_post);
        }
      }
    );
  });
};

module.exports.getSingleExtendedFriendsPost = function ({
  post_id: post_id,
  username: username,
}) {
  return new Promise(async function (resolve, reject) {
    pool.query(
      `SELECT * FROM posts WHERE post_id=? AND visibility=?`,
      [post_id, "2"],
      async function (error, results) {
        if (error) {
          return reject(error);
        } else if (results.length == 0) {
          return reject("Post with such id doesnot exits");
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
          extended_friends_post = rows.filter(function (row) {
            return user_extended_friends.has(row.username);
          });

          if (extended_friends_post.length == 0) {
            return reject("Not Authorized");
          }

          return resolve(extended_friends_post);
        }
      }
    );
  });
};
