require("dotenv").config({ path: "./db/db.env" });
const mysql = require("./db.js");
const express = require("express");
const app = express();

app.use(
  express.json({
    limit: "50mb",
  })
);

app.listen(3000, () => {
  console.log("사원 목록 서버가 실행되었습니다.");
});

app.get("/test", async (req, res) => {
  let list = await mysql.query("test", "list");
  res.send(list);
});

app.get("/cartList/:id", async (req, res) => {
  let id = req.params.id;
  let list = await mysql.query("test","cartList", id);
  res.send(list);
});

app.put("/cartList/:cno", async (request, res) => {
  let data = request.params.cno;
  res.send((await mysql.query("test","CheckboxUpdate", data)));
});

app.get("/orderList/:id", async (req, res) => {
  let id = req.params.id;
  let list = await mysql.query("test","orderList", id);
  res.send(list);
});

