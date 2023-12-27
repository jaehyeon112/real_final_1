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


// 로그인 - 아이디 중복체크용
app.get("/join/:id", async(req, res)=> {
  let uid = req.params.id;
  let list = await mysql.query("user", "duplicateId", uid);
  res.send(list);
})



//회원가입용(insert)
app.post("/join", async (req, res) => {
  let data = req.body.param;
  let result = await mysql.query("user","join",data);
  res.send(result);
});









// //등록하기 : post 
// app.post("/boards", async (request, res) => {
//   let data = request.body.param; //객체 , **param
//   res.send((await db.connection("boardInsert", data)));

// })