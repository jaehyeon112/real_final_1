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
  let data = Number(req.params.no)*6
  console.log(data)
  let list = await mysql.query("test", "list2", data);
  res.send(list);
})
