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


// 로그인 - 아이디 중복체크용 아이디 리스트
app.get("/join", async(req, res)=> {
  let list = await mysql.query("user", "id");
  res.send(list);
})


//회원가입용(insert)
const userTable = ['user_id','user_password','user_name','user_email', 'user_tel', 'postcode', 'address', 'birth'];

app.post("/join", async(request, res)=> {
  let info = request.body.param;
  let joinData = [];
  for (let col of userTable){
    let value = joinData[col];
    if(value == '') continue;
    joinData.push(value);
  }

  let result = await mysql.query("user","join",joinData);

  res.send(result);

})


// let deptEmpData = [];
// for(let column of deptEmpTable){
//   let value = empInfo[column];
//   if(value == '') continue;
//   deptEmpData.push(value);
// }

// result = await mysql.query('empDept','insert', deptEmpData);




// //등록하기 : post 
// app.post("/boards", async (request, res) => {
//   let data = request.body.param; //객체 , **param
//   res.send((await db.connection("boardInsert", data)));

// })