//Library Imports
const redis = require("redis");

const expirationTime = process.env.EXPIRY;
//Create the Redis Client
const client = redis.createClient();
client.on("error", function (error) {
  console.error(error);
});

//REDIS SET
async function set(key, data) {
  await client.connect();
  await client.setEx(key, expirationTime, data);
  await client.disconnect();
}

//REDIS GET
async function get(key) {
  await client.connect();
  let val = await client.get(key);
  await client.get(key);
  await client.disconnect();
  return val;
}

//REDIS CLEAR
async function clear(key) {
  await client.connect();
  await client.del(key);
  await client.disconnect();
  return;
}

//Build Graph Utils
async function redisSetGraph(data) {
  return await set("graph", JSON.stringify(data));
}

async function redisGetGraph() {
  return JSON.parse(await get("graph"));
}

async function redisClearGraph() {
  return await clear("graph");
}

//Shortest Path Utils
async function redisSetShortestPaths(username, map) {
  return await set(`${username}_shortest_paths`, JSON.stringify(map));
}

async function redisGetShortestPaths(username) {
  return JSON.parse(await get(`${username}_shortest_paths`));
}

async function redisClearShortestPaths(username) {
  return await clear(`${username}_shortest_paths`);
}

module.exports = {
  redisSetGraph,
  redisGetGraph,
  redisClearGraph,
  redisSetShortestPaths,
  redisGetShortestPaths,
  redisClearShortestPaths,
};
