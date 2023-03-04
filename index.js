const express = require("express");
const redis = require("redis");

const app = express();
const client = redis.createClient({
  url: "redis://redis:6379",
});
client.connect();
client.on("connect", (err) => {
  if (err) throw err;
  else console.log("Redis Connected..!");
});
client.set("visits", 0);

app.get("/", async (req, res) => {
  console.log(req.hostname);
  const myNum = await client.get("visits");
  console.log(myNum);
  client.get("visits").then((visits) => {
    console.log(visits);
    res.send("Number of visits is " + visits);
    client.set("visits", parseInt(visits) + 1);
  });
});

app.listen(8081, () => {
  console.log("Server running 8081 port");
});
