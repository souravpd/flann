const {
  redisGetFriends,
  redisGetExtendedFriends,
} = require("../utils/redis_utils");

module.exports.getFriends = function ({ username: username }) {
  return new Promise(async function (resolve, reject) {
    let friends;
    try {
      friends = await redisGetFriends(username);
    } catch (error) {
      return reject(error);
    }
    if (friends === null || friends === undefined) {
      return reject();
    } else {
      return resolve({ friends });
    }
  });
};

module.exports.getExtendedFriends = function ({ username: username }) {
  return new Promise(async function (resolve, reject) {
    let extended_friends;
    try {
      extended_friends = await redisGetExtendedFriends(username);
    } catch (error) {
      return reject(error);
    }
    if (extended_friends === null || extended_friends === undefined) {
      return reject();
    } else {
      return resolve({ extended_friends });
    }
  });
};
