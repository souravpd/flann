//Library Imports
const redis = require("redis");

const expirationTime = process.env.EXPIRY;
//Create the Redis Client
const client = redis.createClient();
client.on("error", function (error) {
  console.error(error);
});

async function redisSetGraph(data) {
  return await set("graph", JSON.stringify(data));
}

async function set(key, data) {
  await client.connect();
  await client.setEx(key, expirationTime, data);
}

async function redisGetGraph() {
  return JSON.parse(await get("graph"));
}

async function get(key) {
  await client.connect();
  return await client.get(key);
}

async function redisClearGraph() {
  return await clear("graph");
}

async function clear(key) {
  await client.connect();
  return await client.del(key);
}

module.exports = { redisSetGraph, redisGetGraph, redisClearGraph };
