require("dotenv").config({ path: "./db/db.env" });
const mysql = require("./db.js");
const express = require("express");
const app = express();
const fs = require("fs");
const multer = require("multer");
const path = require("path");

// const cron = require("node-cron");

//  *(분: 0-59) *(시: 0-23) *(일: 1-31) *(월 1-12) *(요일 0-7, 0or7은 일요일~)
/* 
cron.schedule("1-59 * * * * *", () => {
  console.log("1초마다 스케줄러 작동!");
});
 */

app.use(
  express.json({
    limit: "50mb",
  })
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().valueOf() + path.basename(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post("/photos", upload.array("photos", 12), (req, res) => {
  for (let file of req.files) {
    console.log(file);
  }
});

app.listen(3000, () => {
  console.log("재현 서버 on");
});

app.get("/test", async (req, res) => {
  // 여기서 imagePath를 db에 저장하고 불러와야할듯...
  const imagePath = "uploads\\1703396889842스크린샷 2023-11-12 215622.png";
  const absolutePath = path.join(__dirname, imagePath);
  res.sendFile(absolutePath);
});

app.get("/show", async (req, res) => {
  let data = await mysql.query("test", "list");
  res.send(data);
});

app.get("/show/:no", async (req, res) => {
  let data = Number(req.params.no) * 6;
  let list = await mysql.query("test", "list2", data);
  res.send(list);
});


app.get("/coupon/:id", async (req, res) => { // 쿠폰 리스트
  let id = req.params.id;
  let list = await mysql.query("test","couponList", id);
  res.send(list);
});
app.get("/point/:id", async (req, res) => {  // 포인트 리스트 
  let id = req.params.id;
  let list = await mysql.query("test","pointList", id);
  res.send(list);
});

app.get("/cartList/:id", async (req, res) => { //주문 리스트
  let id = req.params.id;
  let list = await mysql.query("test","cartList", id);
  res.send(list);
});

app.get("/orderList/:id", async (req, res) => { // 주문완료 리스트
  let id = req.params.id;
  let list = await mysql.query("test","orderList", id);
  res.send(list);
});

app.post("/orderInsert", async (request, res)=>{ // orders 등록
  let data = request.body.param;
  res.send((await mysql.query("test","orderInsert", data)));
});

app.post("/orderdetailInsert", async (request, res)=>{ // order_detail 등록
  let data = request.body.param;
  res.send((await mysql.query("orderInsert", data)));
});



app.get("/user",async (req, res) => {
  let list = await mysql.query("admin", "userList");
  res.send(list);
});

app.get("/prod",async (req, res) => {
  let list = await mysql.query("admin", "prodList");
  res.send(list);
});

app.get("/prod/:pno",async (req, res) => {
  let data = req.params.pno;
  let result = await mysql.query("admin", "prodInfo",data);
  res.send(result);
});

app.post("/prod",async (req, res) => {
  let data = req.body.param;
  let result = await mysql.query("admin","prodInsert",data);
  res.send(result);
});

app.put("/prod/:pno",async (req, res) => {
  let datas = [req.body.param,req.params.pno];
  let result = await mysql.query("admin","productMod",datas);
  res.send(result);
});

app.patch("/prod/:pno",async (req, res) => {
  let data = req.params.pno;
  let result = await mysql.query("admin","prodDelete",data);
  res.send(result);
});

app.get("/sum",async (req, res) => {
  let result = await mysql.query("admin", "monthsIncome");
  res.send(result);
});

app.put("/user/:uid",async(req,res)=>{
  let data = req.params.uid;
  let result = await mysql.query("admin","stopUser",data);
  res.send(result);
});
