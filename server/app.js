require("dotenv").config({ path: "./db/db.env" });
const mysql = require("./db.js");
const express = require("express");
const nodemailer = require('nodemailer'); //이메일인증
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

app.get('/prod',async (req, res) => {
  let data = await mysql.query("admin", "proList");
  res.send(data);
})
app.get("/test", async (req, res) => {
  // 여기서 imagePath를 db에 저장하고 불러와야할듯...
  const imagePath = "uploads\\1703574590403스페인식_감바스_상세페이지3.jpg";
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


app.get("/user/:order", async (req, res) => {
  let result = req.params.order;
  let data = await mysql.query("admin", "AlluserList",result);
  res.send(data);
});

app.get("/user/:order/:startNo/:no",async (req, res) => {
  let data = [req.params.order,Number(req.params.startNo)*Number(req.params.no),Number(req.params.no)];
  let list = await mysql.query("admin", "userList",data);
})

// 회원가입 - 아이디 중복체크용
app.get("/join-id/:id", async(req, res)=> {
  let uid = req.params.id;
  let list = await mysql.query("user", "duplicateId", uid);
  res.send(list);
})

//회원가입 - 이메일 중복체크용
app.get("/join-email/:email", async(req, res)=> {
  let uemail = req.params.email;
  let list = await mysql.query("user", "duplicateEmail", uemail);
  res.send(list);
})

//회원가입 이메일 인증
// 이메일 전송 API 엔드포인트
app.post('/api/sendVerificationEmail', (req, res) => {
  const { email } = req.body;
  // 이메일 주소 확인 및 인증 코드 생성
  const verificationCode = generateVerificationCode();

  // Nodemailer를 사용하여 이메일 전송
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'pphhaa314@gmail.com',
      pass: 'passwd123*'
    }
  });

  const mailOptions = {
    from: 'pphhaa314@gmail.com',
    to: email,
    subject: '이메일 인증',
    text: `인증 코드: ${verificationCode}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('이메일 전송 실패');
    } else {
      console.log('이메일 전송 성공');
      res.status(200).send('이메일 전송 성공');
    }
  });
});

// 이메일 인증 API 엔드포인트
app.post('/api/verifyEmail', (req, res) => {
  const { email, verificationCode } = req.body;
  // 이메일 주소와 인증 코드 확인 및 처리
  if (verifyVerificationCode(email, verificationCode)) {
    // 인증 성공 처리
    res.status(200).send('이메일 인증 성공');
  } else {
    // 인증 실패 처리
    res.status(400).send('이메일 인증 실패');
  }
});



//회원가입용(insert) **주소수정ㅎ기! 
app.post("/join/joinIn", async (req, res) => {
  let data = req.body.param;
  try{  let result = await mysql.query("user","joinIn", data);
  res.send(result);
  }catch{
  console.error(error);
  res.status(500).send({ error: 'Database query failed' });
  }

});


//로그인 - 아이디비번 일치해야 로그인 (5회 오류시 보안프로그램실행)
app.get("/dologin/:id/:password", async(req, res)=> {
  let data = [req.params.id, req.params.password]
  let list = await mysql.query("user", "forLogin",data);
  res.send(list);
});



//로그인 세션
app.post("/insertLogin", async(req, res)=> {
  let data = req.body.param;
  let result = await mysql.query("user","insertLogin", data);
  res.send(result);
})


//회원탈퇴
app.delete("/deleteUser/:id", async(req, res)=> {
  let uid = req.params.id;
  let list = await mysql.query("user", "deleteUser", uid);
  res.send(list);
})


app.get("/user",async (req, res) => {
  let list = await mysql.query("admin", "userList");
  res.send(list);
});

app.get("/user/:id/:name/:join/:order/:startNo/:no",async (req, res) => {
  let list = [req.params.id,req.params.name,req.params.join,req.params.order,Number(req.params.startNo)*Number(req.params.no),Number(req.params.no)];
  let data = await mysql.query("admin", "searchUser",list);
  res.send(data);
});

app.get("/prod/:name/:order/:startNo/:no",async (req, res) => {
  let list = [req.params.name,req.params.order,Number(req.params.startNo)*Number(req.params.no),Number(req.params.no)];
  let data = await mysql.query("admin", "searchProd",list);
  res.send(data);
});

app.get("/prod/:order", async (req, res) => {
  let result = req.params.order;
  let data = await mysql.query("admin", "AllprodList",result);
  res.send(data);
});

app.get("/prod/:order/:startNo/:no",async (req, res) => {
  let datas = [req.params.order,Number(req.params.startNo)*Number(req.params.no),Number(req.params.no)];
  let list = await mysql.query("admin", "prodList",datas);
  res.send(list);
});

app.get("/prods/:pno",async (req, res) => {
  let data = req.params.pno;
  let result = await mysql.query("admin", "prodInfo",data);
  res.send(result);
});

app.get("/prod/:startNo/:no",async (req, res) => {
  let datas = [Number(req.params.startNo)*Number(req.params.no),Number(req.params.no)];
  let result = await mysql.query("admin", "pricehigh",datas);
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

app.put("/user/:grade/:uid",async(req,res)=>{
  let data = [req.params.grade,req.params.uid];
  let result = await mysql.query("admin","stopUser",data);
  res.send(result);
});

app.get("/wordFilter/:first/:last/",async (req, res) => {
  let data= [req.params.first, req.params.last];
  let result = await mysql.query("test", "wordFilterPage",data);
  res.send(result)
})


app.get("/wordFilter/:first/:last/:no",async (req, res) => {
  let data= [req.params.first, req.params.last, Number(req.params.no) * 6];
  
  let result = await mysql.query("test", "wordFilter",data);
  res.send(result)
})

app.get("/priceFilter/:A/:B",async (req, res) => {
  let data = [Number(req.params.A), Number(req.params.B)];
  let result = await mysql.query("test", "priceFilterPage", data);
  res.send(result)
})

app.get("/priceFilter/:A/:B/:no",async (req, res) => {
  let data = [Number(req.params.A), Number(req.params.B),Number(req.params.no) * 6];
  let result = await mysql.query("test", "priceFilter", data);
  res.send(result)
})

app.get("/bothFilter/:first/:last/:A/:B",async (req, res) => {
  let data = [req.params.first, req.params.last,Number(req.params.A), Number(req.params.B)];
  let result = await mysql.query("test", "bothFilterPage", data);
  res.send(result)
})

app.get("/bothFilter/:first/:last/:A/:B/:no",async (req, res) => {
  let data = [req.params.first, req.params.last,Number(req.params.A), Number(req.params.B),Number(req.params.no) * 6];
  let result = await mysql.query("test", "bothFilter", data);
  res.send(result)
})
