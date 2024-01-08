require("dotenv").config({
  path: "./db/db.env"
});

const mysql = require("./db.js");
const bodyParser = require('body-parser');
//const { createTransport } = require('nodemailer');
//const config = require('./config'); // config 파일에 Gmail API 정보
const express = require("express");
const app = express();
const axios = require("axios");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const server = require('http').createServer(app);
const session = require('express-session');
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:8080",
  }
});

let grade = ''

app.use(session({
  secret: 'what', // 암호화하는 데 쓰일 키
  resave: false, // 세션을 언제나 저장할지 설정함
  saveUninitialized: true, // 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정
  cookie: { //세션 쿠키 설정 (세션 관리 시 클라이언트에 보내는 쿠키)
    httpOnly: true, // 자바스크립트를 통해 세션 쿠키를 사용할 수 없도록 함
    Secure: true,
  },
  name: 'session-cookie' // 세션 쿠키명 디폴트값은 connect.sid이지만 다른 이름을 줄수도 있다.
}));


app.use(express.json());
require('dotenv').config();
const {
  google
} = require('googleapis');
const nodemailer = require('nodemailer');

// OAuth2 클라이언트 설정
const oauth2Client = new google.auth.OAuth2(
  process.env.GMAIL_OAUTH_CLIENT_ID,
  process.env.GAMIL_OAUTH_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);


oauth2Client.setCredentials({
  refresh_token: process.env.GAMIL_OAUTH_REFRESH_TOKEN
});

// 액세스 토큰 생성
async function getAccessToken() {
  const {
    token
  } = await oauth2Client.getAccessToken();
  return token;
}


// 이메일 전송 함수
async function sendEmail(to, subject, body) {
  const accessToken = await getAccessToken();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.GMAIL_OAUTH_USER,
      accessToken,
      clientId: process.env.GMAIL_OAUTH_CLIENT_ID,
      clientSecret: process.env.GAMIL_OAUTH_CLIENT_SECRET,
      refreshToken: process.env.GAMIL_OAUTH_REFRESH_TOKEN
    }
  });
  const mailOptions = {
    from: `yedam1조 Hompage명 <${process.env.GMAIL_OAUTH_USER}>`,
    to,
    subject,
    text: body
  };

  const result = await transporter.sendMail(mailOptions);
  return result;
}


server.listen(3000, () => {
  console.log('app대신 socket.io서버 on~~');
});


app.get("/test/:fileName", async (req, res) => {
  // 여기서 imagePath를 db에 저장하고 불러와야할듯...
  let fileName = req.params.fileName
  if (fileName == 'null') {
    fileName = 'noImg.jpg';
    console.log(fileName)
  }
  const imagePath = "uploads\\" + fileName;
  const absolutePath = path.join(__dirname, imagePath);
  console.log('경로1' + absolutePath)
  res.sendFile(absolutePath);
});

// 이메일 인증하기 버튼을 눌렀을때 이걸 axios실행시킨다.
// 그 밑에 인풋ㅎ태그가 보이면서 시간초 5분 준다. ==> 

app.post('/send-email', async (req, res) => {
  try {
    const {
      to, // 인풋태그에 있는 이메일값
      subject, // 1조 이메일 인증입니다.
      body // 글~~~ 이메일 인증 번호는 : 난수값 == 뷰에서 저장을 일단 해놈
    } = req.body;
    console.log(to + subject + body + '이메일콘솔');
    const result = await sendEmail(to, subject, body);
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}); //이메일



//핸드폰인증
app.post('/phonecheck', async (req, res) => {
  const {
    to,
    from,
    text
  } = req.body.param;

  let data = req.body.param;
  console.log("본인인증을 위해 넘어온 데이터 = ", data);

  const coolsms = require('coolsms-node-sdk').default;
  async function printTokenResult(phone, token) {

    const messageService = new coolsms("NCSX69ZDDZ3AMPOA", "RTFTFKLPESGNPPFMBL0I88LTS2CHRNET");
    const result = await messageService
      .sendOne({
        to,
        from,
        text
      })

    let checkresult = false; //'인증번호 발송 실패';
    console.log('핸드폰 인증 결과=', result);


    if (result.statusCode == '2000') {
      checkresult = true; //"인증번호 발송 성공";
    }
    console.log('checkresult=', checkresult);
    res.send(checkresult);
  }
  printTokenResult(data.phone, data.token);
}) //end 핸드폰인증 




//소켓
io.on('connect', (socket) => {
  console.log('소켓연결 on!')
  if (grade == 'i4') {
    console.log('당신은 관리자로 로그인 하였습니다.');
    socket.join('admin')
  }
  socket.on('message', (message) => {
    console.log(message);
  });



  socket.on('send', (one, two, three) => {
    console.log(one, two, three)
  })

  socket.on('report', (message) => {
    console.log(message);
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

})


const cron = require("node-cron");


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

const upload = multer({
  storage: storage
});

app.post("/photos", upload.array("photos", 10), (req, res) => {
  let imgArray = new Array();
  for (let i = 0; i < req.files.length; i++) {
    imgArray.push(`${req.files[i].filename}`)
    console.log('현재 넘어온 사진 ' + req.files[i])
  }
  //let jsonImg = JSON.stringify(imgArray);
  res.send(imgArray);
});

app.post("/text", upload.array("text", 10), (req, res) => {
  let textArray = new Array();
  for (let i = 0; i < req.files.length; i++) {
    textArray.push(`${req.files[i].originalname}`)
    console.log('현재 넘어온 파일 ' + req.files[i])
  }
  res.send(textArray);
});

app.post("/photo", async (req, res) => {
  let data = req.body.param;
  let result = await mysql.query("admin", "insertFile", data)
  res.send(result);
});

app.get("/photo/:column/:pno",async (req, res) => {
  let data = [req.params.column,req.params.pno];
  let result = await mysql.query("admin","photoList",data)
  res.send(result);
  console.log('실행' + result)
});

app.delete("/photo/:name", async (req, res) => {
  let data = req.params.name;
  let result = await mysql.query("admin", "delPhoto", data);
  console.log('삭제중' + result)
  res.send(result);
});

// app.delete("/photos", async (req, res) => {
//   console.log('삭제실행??')
//     try {
//       fs.unlinkSync(req.files);
//       console.log("image delete");
//     } catch (error) {
//       console.log(req.files)
//       console.log(error);
//     }
// }); //이미지 삭제 end


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
/* 
app.listen(3000, () => {
  console.log("재현 서버 on");
});
 */


//정적파일
app.use('/fileCall', express.static('uploads'));


app.get("/test/:fileName", async (req, res) => {
  // 여기서 imagePath를 db에 저장하고 불러와야할듯...
  let fileName = req.params.fileName
  if (fileName == 'null') {
    fileName = 'noImg.jpg';
    console.log(fileName)
  }
  console.log(req.params)
  const imagePath = "uploads\\" + fileName;
  const absolutePath = path.join(__dirname, imagePath);
  console.log('경로1' + absolutePath)
  res.sendFile(absolutePath);
});

// app.get("/test/uploads/:imagePath", async (req, res) => {
//   let data = req.params.imagePath;
//   console.log('여기까지 넘ㄴ어옴',data)
//   const absolutePath = path.join(__dirname,data);
//   console.log('경로2' + absolutePath)
//   res.sendFile(absolutePath);
// });

app.get("/show", async (req, res) => {
  let data = await mysql.query("test", "list");
  res.send(data);
});

app.get("/show/:no", async (req, res) => {
  let data = Number(req.params.no) * 6;
  let list = await mysql.query("test", "list2", data);
  res.send(list);
});

// 아임포트 액세스토큰 저장
app.get('/saveAccessToken', async (req, res) => {
  try {
    const getToken = await axios({
      url: 'https://api.iamport.kr/users/getToken',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: {
        imp_key: '1300467618678700', // REST API 키
        imp_secret: 'xQbiqzngwzGJ7JaeaSMfZ99DHYKOBFTKf5jn7aEU8dlyzvE2rxBb5jvwxG5eUAZcc8jGhpU4AZMNhhbk' // REST API Secret
      }
    });

    const accessToken = getToken.data.response.access_token;

    req.session.accessToken = accessToken; // 세션에 토큰 값을 저장

    res.send(accessToken);

  } catch (error) {
    console.error(error);
    res.status(500).send('토큰 저장 중에 에러가 발생했습니다.');
  }
});

app.post("/cancel", async (req, res, next) => {
  try {
      /* 결제정보 조회 */
      const { body } = req;

      console.log(body)
      // 클라이언트로부터 전달받은 주문번호, 환불사유, 환불금액
      const { merchant_uid, reason, cancel_request_amount, access_token } = body;
      
      console.log(merchant_uid, reason, cancel_request_amount,access_token,'hi');
        /* 포트원 REST API로 결제환불 요청 */
        const getCancelData = await axios({
          url: "https://api.iamport.kr/payments/cancel",
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "Authorization": access_token // 포트원 서버로부터 발급받은 엑세스 토큰
          },
          data: {
            merchant_uid : merchant_uid, // merchant_uid를 환불 `unique key`로 입력
            reason: reason, // 가맹점 클라이언트로부터 받은 환불사유
            amount: cancel_request_amount, // 가맹점 클라이언트로부터 받은 환불금액
          }
        });
        const { response } = getCancelData.data; // 환불 결과
        /* 환불 결과 동기화 */
    } catch (error) {
      res.status(400).send(error);
    }
})

app.get("/couponList", async (req, res) => { // 쿠폰 리스트
  let list = await mysql.query("test", "couponList", req.session.user_id);
  res.send(list);
});

app.get("/couponUseList/:no", async (req, res) => { // 쿠폰 리스트
  let data = req.params.no
  let list = await mysql.query("test", "couponUseList", data);
  res.send(list);
});

app.get("/pointList", async (req, res) => { // 포인트 리스트 
  let list = await mysql.query("test", "pointList", req.session.user_id);
  res.send(list);
});

app.get("/cartList", async (req, res) => { //장바구니 리스트
  let userId = req.session.user_id;
  if (!userId) { // user_id가 없을때
    return res.status(400).send('400에러~')
  }

  try {
    let list = await mysql.query("test", "cartList", userId);
    res.send(list);
  } catch (err) { // db에서 뭐 오류뜨면~
    console.log(err);
    res.status(500).send({
      err: '서버에서 오류난듯?'
    })
  }
})

app.put("/CheckboxUpdate/:check/:no", async (req, res) => { // 장바구니 체크박스 선택시 업데이트
  let data = [req.params.check, req.params.no];
  let list = await mysql.query("test", "CheckboxUpdate", data);
  res.send(list);
});

app.put("/CheckAllUpdate/:check", async (req, res) => { // 체크박스 전체선택 업데이트
  let data = [req.params.check, req.session.user_id];
  let list = await mysql.query("test", "CheckAllUpdate", data);
  res.send(list);
});

// app.put("/CheckboxUpdate/:id", async (request, res) => { // 체크박스  업데이트
//   let cartList = request.body; // 배열

//같은 자바스크립트 이기 때문에 for문 사용가능
//   let list = 0;
//   for(let cart  of cartList){
//     let data = [cart.cart_checkbox, cart.cart_no];
//     list = await mysql.query("test", "CheckboxUpdate", data);
//   }

//   res.send(list);
// });

app.put("/Cartquantity/:no/:cno", async (req, res) => { // 장바구니에 담긴 상품의 재고가 빠져서 장바구니재고수정이필요한경우
  let data = [req.params.no,req.params.cno];
  let list = await mysql.query("test", "Cartquantity", data);
  res.send(list);
});

app.put("/CartPlusquantity/:pno", async (req, res) => { // 장바구니 수량 플러스
  let data = [req.params.pno, req.session.user_id];
  let list = await mysql.query("test", "CartPlusquantity", data);
  res.send(list);
});

app.put("/CartMinusquantity/:pno", async (req, res) => { // 장바구니 수량 마이너스
  let data = [req.params.pno, req.session.user_id];
  let list = await mysql.query("test", "CartMinusquantity", data);
  res.send(list);
});

app.put("/couponReturn/:no", async (req, res) => { // 취소했을때 쿠폰사용한 경우 다시 쿠폰을 돌려준다.
  let data = req.params.no;
  let list = await mysql.query("test", "couponReturn", data);
  res.send(list);
});

app.put("/pointReturn/:point", async (req, res) => { // 취소했을때 쿠폰사용한 경우 다시 쿠폰을 돌려준다.
  let data = [req.params.point, req.session.user_id];
  let list = await mysql.query("test", "pointReturn", data);
  res.send(list);
});

app.put("/StockReturn/:stock/:no", async (req, res) => { // 취소되면 다시 재고 수정
  let data = [req.params.stock, req.params.no];
  let list = await mysql.query("test", "StockReturn", data);
  res.send(list);
});

app.delete("/CheckboxDelete/:no", async (req, res) => { // 체크된 장바구니 삭제
  let data = req.params.no;
  let result = await mysql.query("test", 'CheckboxDelete', data);
  res.send(result);
});


app.get("/cartCheckList", async (req, res) => { //주문서의 장바구니체크된거만불러오는 리스트
  let list = await mysql.query("test", "cartCheckList", req.session.user_id);
  res.send(list);
});

app.get("/orderList/:no", async (req, res) => { // 주문완료 리스트
  let data = req.params.no;
  let list = await mysql.query("test", "orderList", data);
  res.send(list);
});

app.post("/orderInsert", async (request, res) => { // orders 등록
  let data = request.body.param;
  res.send((await mysql.query("test", "orderInsert", data)));
  io.to('amdin').emit('order', '새로운 결제가 있습니다.')
});

app.post("/orderdetailInsert", async (request, res) => { // order_detail 등록
  let data = request.body.param;
  res.send((await mysql.query("test", "orderdetailInsert", data)));
});

app.post("/pointInsert", async (request, res) => { // 포인트 사용내역 등록
  let data = request.body.param;
  res.send((await mysql.query("test", "pointInsert", data)));
});

app.put("/couponUpdate/:no", async (req, res) => { // 쿠폰 사용시 업데이트
  let data = [req.body.param, req.params.no];
  res.send((await mysql.query("test", "couponUpdate", data)));
});

app.put("/StockUpdate/:no", async (req, res) => { // 상품 재고변경
  let data = [req.body.param, req.params.no];
  res.send((await mysql.query("test", "StockUpdate", data)));
});

app.put("/pointUpdate", async (req, res) => { // 사용한 포인트 user테이블 업데이트
  let data = [req.body.param, req.session.user_id];
  res.send((await mysql.query("test", "pointUpdate", data)));
});

app.put("/orderUpdate/:no", async (req, res) => { // 취소되었을때 orders 주문상태 업데이트
  let data = req.params.no;
  res.send((await mysql.query("test", "orderUpdate", data)));
});


app.post("/refundInsert", async (request, res) => { // orders 등록
  let data = request.body.param;
  res.send((await mysql.query("test", "refundInsert", data)));
});

app.get("/user/:order", async (req, res) => {
  let result = req.params.order;
  let data = await mysql.query("admin", "AlluserList", result);
  res.send(data);
});
app.get("/user", async (req, res) => {
  let data = await mysql.query("admin", "AlluserList");
  res.send(data);
});

app.get("/outUser", async (req, res) => {
  let data = await mysql.query("admin", "outList");
  res.send(data);
});

app.get("/user/:order/:startNo", async (req, res) => {
  let data = [req.params.order, Number(req.params.startNo) * 10];
  let list = await mysql.query("admin", "userList", data);
  res.send(list);
  console.log('실행 : ', list)
});

app.put("/order/:status/:ono", async (req, res) => {
  let data = [req.params.status, req.params.ono];
  let list = await mysql.query("admin", "updateOrder", data);
  res.send(list);
});

app.get("/order/:ono", async (req, res) => {
  let data = req.params.ono;
  let list = await mysql.query("admin", "oneOrder", data);
  res.send(list);
});

app.get("/orderCount", async (req, res) => {
  //let data = req.params.orderNo;
  let list = await mysql.query("admin", "orderDetailCount");
  res.send(list);
});

//여기 박현아

// 회원가입 - 아이디 중복체크용
app.get("/join-id/:id", async (req, res) => {
  let uid = req.params.id;
  let list = await mysql.query("user", "duplicateId", uid);
  res.send(list);
})


//회원가입 - 이메일 중복체크용
app.get("/join-email/:email", async (req, res) => {
  let uemail = req.params.email;
    console.log(uemail);
  let list = await mysql.query("user", "duplicateEmail", uemail);
  res.send(list);
  console.log(list);
})


//회원가입용(insert) 
app.post("/join/joinIn", async (req, res) => {
  let data = req.body.param;
  try {
    let result = await mysql.query("user", "joinIn", data);
    res.send(result);
  } catch {
    console.error(error);
    res.status(500).send({
      error: 'Database query failed'
    });
  }

});


//로그인 - 아이디비번 일치해야 로그인 (5회 오류시 보안프로그램실행)
app.post("/dologin", async (req, res) => {
  let data = [req.body.param.user_id, req.body.param.user_password];
  let list = await mysql.query("user", "forLogin", data);
  console.log(list[0].user_grade)
  if (list.length != 0) {
    req.session.user_id = req.body.param.user_id;
    req.session.user_grade = list[0].user_grade;
    grade = list[0].user_grade;
    // req.session.grade = 

    console.log('아이디 세션 값 : ' + req.session.user_id);
    console.log('회원 등급 : ' + grade);
  }

  res.send(list);
})

//카카오로그인 - 카카오아이디있는지 체크
app.get("/login/kakao", async(req, res)=> {
  let list = await mysql.query("user", "checkKakao");
  console.log(list);
  res.send(list);
})


//아이디비번찾기
  //아이디찾기
  app.get("/find/findid/:name/:email", async(req, res) => {
    let data = [req.params.name, req.params.email]
    let list = await mysql.query("user", "findId", data);
    res.send(list);
  })


  // app.post("/find/findid", async(req, res)=> {
  //  let  {user_name, user_email} = req.body;

  //   console.log(user_name)
  //   console.log(user_email)
     
  //   res.send(`${user_password}`);
  // })

  //비번찾기
  app.get("/find/findpass/:name/:email/:id", async(req, res) => {
    let data = [req.params.name, req.params.email, req.params.id]
    let list = await mysql.query("user", "findPass", data);
    console.log(list);
    res.send(list);
  })


//회원수정
  //일단 단건 데이터 불러오기
app.get("/selectid/:id", async(req, res) => {
  let uid = req.params.id;
  let list = await mysql.query("user", "selectId", uid);
  console.log(list)
  res.send(list);
})
  //회원정보수정하기
  app.put('/join/:id', async(req, res)=>{
    let data = [req.body.param, req.params.id];
    let result = await mysql.query('user','updateUser', data);
    res.send(result);
  });


//회원탈퇴하면 user id 뺴고 null로 수정해야됨
app.put("/updateoutuser/:id", async (req, res) => {

  let uid = req.params.id;

  let list = await mysql.query("user", "updateOutUser", uid);
  res.send(list);

})

//탈퇴한 애 탈퇴테이블에 담는거
app.post("/insertwithdrawal", async (req, res) => {
  let data = req.body.param;
  let result = await mysql.query("user", "insertWithdrawal", data);
  res.send(result);
})


app.get("/user", async (req, res) => {
  let list = await mysql.query("admin", "userList");
  res.send(list);
});

app.get("/user/:id/:name/:order/:startNo", async (req, res) => {
  let list = [req.params.id, req.params.name, req.params.order, Number(req.params.startNo) * 10];
  let data = await mysql.query("admin", "searchUser", list);
  res.send(data);
});

app.get("/user/:join/:order/:startNo", async (req, res) => {
  let list = [req.params.join, req.params.order, Number(req.params.startNo) * 10];
  let data = await mysql.query("admin", "filterUser", list);
  res.send(data);
});

app.get("/prod/:name/:cate/:order/:startNo/:no", async (req, res) => {
  if (Number(req.params.startNo) == null || Number(req.params.no) == null) {
    let test = "select prod_no,prod_name,price,discount_price,discount_rate,stock,main_category from product where prod_name like concat(concat('%',?),'%') or main_category = ? order by ??"
    let list2 = [req.params.name, req.params.cate, req.params.order];
    let data2 = await mysql.query("admin", "searchProd", list2);
    res.send(data2);
  } else {
    let list = [req.params.name, req.params.cate, req.params.order, Number(req.params.startNo) * Number(req.params.no), Number(req.params.no)];
    let data = await mysql.query("admin", "searchProd", list);
    res.send(data);
  }
});


app.get("/prod", async (req, res) => {
  let data = await mysql.query("admin", "AllprodList");
  res.send(data);
});

app.get("/prod/:order/:startNo/:no", async (req, res) => {
  let datas = [req.params.order, Number(req.params.startNo) * Number(req.params.no), Number(req.params.no)];
  let list = await mysql.query("admin", "prodList", datas);
  res.send(list);
});

app.get("/prods/:pno", async (req, res) => {
  let data = req.params.pno;
  let result = await mysql.query("admin", "prodInfo", data);
  res.send(result);
});

app.get("/prod/:startNo/:no", async (req, res) => {
  let datas = [Number(req.params.startNo) * Number(req.params.no), Number(req.params.no)];
  let result = await mysql.query("admin", "pricehigh", datas);
  res.send(result);
});


app.post("/prod", async (req, res) => {
  let data = req.body.param;
  let result = await mysql.query("admin", "prodInsert", data);
  res.send(result);
});

app.put("/prod/:pno", async (req, res) => {
  let datas = [req.body.param, req.params.pno];
  let result = await mysql.query("admin", "productMod", datas);
  res.send(result);
});

app.patch("/prod/:pno", async (req, res) => {
  let data = req.params.pno;
  let result = await mysql.query("admin", "prodDelete", data);
  res.send(result);
});
//통계
app.get("/sum", async (req, res) => {
  let result = await mysql.query("admin", "monthsIncome");
  res.send(result);
});

app.get("/weeksum/:agoweek/:week", async (req, res) => {
  let datas = [Number(req.params.agoweek), Number(req.params.week)]
  let result = await mysql.query("admin", "weekIncome", datas);
  res.send(result);
});

app.get("/counting", async (req, res) => {
  let result = await mysql.query("admin", "counting");
  res.send(result);
});

app.get("/withMe/:outday/:joinday", async (req, res) => {
  let datas = [Number(req.params.outday), Number(req.params.joinday)]
  let result = await mysql.query("admin", "withUser", datas);
  res.send(result);
});

app.put("/user/:grade/:uid", async (req, res) => {
  let data = [req.params.grade, req.params.uid];
  let result = await mysql.query("admin", "stopUser", data);
  res.send(result);
});

app.get("/notice", async (req, res) => {
  let result = await mysql.query("admin", "AllnoticeList");
  res.send(result);
});

app.post("/notice", async (req, res) => {
  let datas = req.body.param;
  let result = await mysql.query("admin", "insertNotice", datas);
  res.send(result);
});

app.get("/fnq/:column/:cate", async (req, res) => {
  let data = [req.params.column, req.params.cate];
  let result = await mysql.query("admin", "FNQList", data);
  res.send(result);
});

app.post("/fnq", async (req, res) => {
  let data = req.body.param;
  let result = await mysql.query("admin", "insertFNQ", data);
  res.send(result);
});

app.put("/fnq/:qno", async (req, res) => {
  let data = [req.body.param, req.params.qno];
  let result = await mysql.query("admin", "updateFNQ", data);
  res.send(result);
});

app.delete("/fnq/:qno", async (req, res) => {
  let data = req.params.qno;
  let result = await mysql.query("admin", "delFNQ", data);
  res.send(result);
});

app.get("/notice/:order/:sno/:lno", async (req, res) => {
  let data = [req.params.order, Number(req.params.sno), Number(req.params.lno)]
  let result = await mysql.query("admin", "AllnoticeList", data);
  res.send(result)
});

app.get("/notice/:import1/:import2/:order/:sno/:lno", async (req, res) => {
  let data = [req.params.import1, req.params.import2, req.params.order, Number(req.params.sno), Number(req.params.lno)];
  let result = await mysql.query("admin", "StateNoticeList", data);
  res.send(result)
});

app.get("/wordFilter/:first/:last/", async (req, res) => {
  let data = [req.params.first, req.params.last];
  let result = await mysql.query("test", "wordFilterPage", data);
  res.send(result)
})

app.get("/wordFilter/:first/:last/:col/:category", async (req, res) => {
  let data = [req.params.first, req.params.last, req.params.col, req.params.category];
  let result = await mysql.query("test", "categoryWordFilterPage", data);
  res.send(result)
})

app.get("/wordFilter/:first/:last/:no", async (req, res) => {
  let data = [req.params.first, req.params.last, Number(req.params.no) * 6];
  let result = await mysql.query("test", "wordFilter", data);
  res.send(result)
})

app.get("/wordFilter/:first/:last/:col/:category/:no", async (req, res) => {
  let data = [req.params.first, req.params.last, req.params.col, req.params.category, Number(req.params.no) * 6];

  let result = await mysql.query("test", "categoryWordFilter", data);
  res.send(result)
})

app.get("/priceFilter/:A/:B", async (req, res) => {
  let data = [Number(req.params.A), Number(req.params.B)];
  let result = await mysql.query("test", "priceFilterPage", data);
  res.send(result)
})

app.get("/priceFilter/:A/:B/:no", async (req, res) => {
  let data = [Number(req.params.A), Number(req.params.B), Number(req.params.no) * 6];
  let result = await mysql.query("test", "priceFilter", data);
  res.send(result)
})

app.get("/priceFilter/:A/:B/:col/:category", async (req, res) => {
  let data = [Number(req.params.A), Number(req.params.B), req.params.col, req.params.category];
  let result = await mysql.query("test", "categoryPriceFilterPage", data);
  res.send(result)
})

app.get("/priceFilter/:A/:B/:col/:category/:no", async (req, res) => {
  let data = [Number(req.params.A), Number(req.params.B), req.params.col, req.params.category, Number(req.params.no) * 6];
  let result = await mysql.query("test", "categoryPriceFilter", data);
  res.send(result)
})

app.get("/bothFilter/:first/:last/:A/:B", async (req, res) => {
  let data = [req.params.first, req.params.last, Number(req.params.A), Number(req.params.B)];
  let result = await mysql.query("test", "bothFilterPage", data);
  res.send(result)
})

app.get("/bothFilter/:first/:last/:A/:B/:no", async (req, res) => {
  let data = [req.params.first, req.params.last, Number(req.params.A), Number(req.params.B), Number(req.params.no) * 6];
  let result = await mysql.query("test", "bothFilter", data);
  res.send(result);
});

app.get('/order', async (req, res) => {
  let result = await mysql.query("admin", "AllOrderList");
  res.send(result);
});

app.get('/review/:order', async (req, res) => {
  let data = req.params.order;
  let result = await mysql.query("admin", "reviewList", data);
  res.send(result);
});

app.post('/order/:ono/:tracking/:ono/:ono', async (req, res) => {
  let data = [req.params.ono, req.params.tracking, req.params.ono, req.params.ono];
  let result = await mysql.query("admin", "insertDelivery", data);
  res.send(result);
});

app.get('/order/:status/:sno/:lno', async (req, res) => {
  let data = [req.params.status, Number(req.params.sno), Number(req.params.lno)]
  let result = await mysql.query("admin", "orderStatus", data);
  res.send(result);
});

app.post('/refund/:ono', async (req, res) => {
  let data = req.params.ono
  let result = await mysql.query("admin", "adminRefund", data);
  res.send(result);
});

app.put('/refund/:ono', async (req, res) => {
  let data = req.params.ono
  let result = await mysql.query("admin", "refundOrder", data);
  res.send(result);
});

app.get('/order/:sno/:lno', async (req, res) => {
  let datas = [Number(req.params.sno), Number(req.params.lno)]
  let result = await mysql.query("admin", "orderList", datas);
  res.send(result);
});

app.get('/report', async (req, res) => {
  let result = await mysql.query("admin", "AllreviewReportList");
  res.send(result);
});

app.get('/review/:sno/:lno', async (req, res) => {
  let datas = [Number(req.params.sno), Number(req.params.lno)]
  let result = await mysql.query("admin", "reviewReportList", datas);
  res.send(result);
});

app.get('/review/:status/:sno/:lno', async (req, res) => {
  let datas = [req.params.status, Number(req.params.sno), Number(req.params.lno)]
  let result = await mysql.query("admin", "reasonReportList", datas);
  res.send(result);
});
//관리자-환불관련
app.get('/refund', async (req, res) => {
  let result = await mysql.query("admin", "AllrefundOrderList");
  res.send(result);
});

app.get('/refund/:state/:sno/:lno', async (req, res) => {
  let data = [req.params.state, Number(req.params.sno), Number(req.params.lno)];
  let result = await mysql.query("admin", "refundState", data);
  res.send(result);
});

app.get('/refund/:sno/:lno', async (req, res) => {
  let datas = [Number(req.params.sno), Number(req.params.lno)]
  let result = await mysql.query("admin", "refundOrderList", datas);
  res.send(result);
});

app.put('/refund/:state/:ono', async (req, res) => {
  let datas = [req.params.state, req.params.ono];
  let result = await mysql.query("admin", "updateRefund", datas);
  res.send(result);
});
//관리자-배송관련
app.get('/delivery', async (req, res) => {
  let result = await mysql.query("admin", "Alldelivery");
  res.send(result);
});

app.get('/delivery/:sno/:lno', async (req, res) => {
  let datas = [Number(req.params.sno), Number(req.params.lno)]
  let result = await mysql.query("admin", "deliveryList", datas);
  res.send(result);
});

app.get('/delivery/:state/:startNo/:lastNo', async (req, res) => {
  let datas = [req.params.state, Number(req.params.startNo), Number(req.params.lastNo)];
  let result = await mysql.query("admin", "StatedeliveryList", datas);
  res.send(result);
});

app.get('/delivery/:sday/:eday/:startNo/:lastNo', async (req, res) => {
  let datas = [req.params.sday, req.params.eday, Number(req.params.startNo), Number(req.params.lastNo)];
  let result = await mysql.query("admin", "DatedeliveryList", datas);
  res.send(result);
});
//관리자-문의사항
app.get('/inquire', async (req, res) => {
  let result = await mysql.query("admin", "AllinquireList");
  res.send(result);
});

app.get('/inquire/:ino', async (req, res) => {
  let data = req.params.ino;
  let result = await mysql.query("admin", "inquireInfo",data);
  res.send(result);
});

app.put('/inquire/:ino', async (req, res) => {
  let data = req.params.ino;
  let result = await mysql.query("admin", "updateInquire",data);
  res.send(result);
});

app.post('/reply', async (req, res) => {
  let data = req.body.param;
  let result = await mysql.query("admin", "insertReply",data);
  res.send(result);
});

app.get('/reply/:ino', async (req, res) => {
  let data = Number(req.params.ino);
  let result = await mysql.query("admin", "replyInfo",data);
  res.send(result);
});

app.put('/inquire/:ino', async (req, res) => {
  let data = req.params.ino;
  let result = await mysql.query("admin", "updateInquire",data);
  res.send(result);
});

app.get('/inquire/:startNo/:lastNo', async (req, res) => {
  let datas = [Number(req.params.startNo), Number(req.params.lastNo)];
  let result = await mysql.query("admin", "inquireList", datas);
  res.send(result);
});

app.get('/inquire/:where1/:where2/:where3/:where4/:startNo/:lastNo', async (req, res) => {
  let datas = [req.params.where1, req.params.where2, req.params.where3, req.params.where4, Number(req.params.startNo), Number(req.params.lastNo)];
  let result = await mysql.query("admin", "StateinquireList", datas);
  res.send(result);
});
//관리자-주문관련
app.get('/orders/:sday/:eday/:startNo/:lastNo', async (req, res) => {
  let datas = [req.params.sday, req.params.eday, Number(req.params.startNo), Number(req.params.lastNo)];
  let result = await mysql.query("admin", "orderDate", datas);
  res.send(result);
});

app.get("/bothFilter/:first/:last/:A/:B/:col/:category", async (req, res) => {
  let data = [req.params.first, req.params.last, Number(req.params.A), Number(req.params.B), req.params.col, req.params.category];
  let result = await mysql.query("test", "categoryBothFilterPage", data);
  res.send(result);
});

app.get("/bothFilter/:first/:last/:A/:B/:col/:category/:no", async (req, res) => {
  let data = [req.params.first, req.params.last, Number(req.params.A), Number(req.params.B), req.params.col, req.params.category, Number(req.params.no) * 6];
  let result = await mysql.query("test", "categoryBothFilter", data);
  res.send(result)
})

app.get("/show/:col/:category/:no", async (req, res) => {

  let data = [req.params.col];
  if (req.params.category == 'all') {
    let test = `select file_name, p.*, format(avg(review_grade),1) AS 'star' from product p left join order_detail d on p.prod_no = d.prod_no
    left join review r  on r.detail_order_no = d.order_detail_no left join (select file_name,prod_no from file where orders='s0') f on(p.prod_no = f.prod_no) group by d.prod_no limit ? , 6`
    let data = []
    data.push(Number(req.params.no) * 6);
    let result = await mysql.query2(test, data);
    res.send(result)


  } else {
    data.push(req.params.category, Number(req.params.no) * 6)
    let result = await mysql.query("test", "categoryList", data);
    res.send(result)
  }
})

app.get("/show/:col/:category/", async (req, res) => {
  let data = [req.params.col];
  if (req.params.category == 'all') {
    let test = "select * from product"
    let result = await mysql.query2(test, data);
    res.send(result)


  } else {
    data.push(req.params.category)
    let result = await mysql.query("test", "categoryListPage", data);
    res.send(result)
  }
})

app.get("/new/:no", async (req, res) => {
  let data = Number(req.params.no);
  let result = await mysql.query("test", "newList", data);
  res.send(result);
})

app.get("/new", async (req, res) => {
  let result = await mysql.query("test", "newListPage");
  res.send(result);
})
//예빈
//멤버조회정보
app.get("/member/:id", async (req, res) => {
  let id = req.params.id;
  let memberInfo = (await mysql.query("member", "memberInfo", id))[0]; // 데이터 타입 :  객체  
  let pointInfo = (await mysql.query("point", "showNextMonth", id))[0]; // 데이터 타입 : 숫자
  memberInfo.showNextMonth = pointInfo;
  res.send(memberInfo);
})

// app.get("/member", async (req,res)=>{
//   let id = req.session.id;
//   let memberInfo= (await mysql.query("member", "memberInfo", id))[0]; // 데이터 타입 :  객체  
//   let pointInfo = (await mysql.query("point", "showNextMonth", id))[0]; // 데이터 타입 : 숫자
//   memberInfo.showNextMonth = pointInfo;

//   res.send(memberInfo);
// })
// app.get("/member/:id", async (req,res)=>{
//   let id = req.params.id;
//   let memberInfo= (await mysql.query("member", "memberInfo", id))[0]; // 데이터 타입 :  객체  
//   res.send(memberInfo);
// })

// //다음달 소멸 포인트
// app.get("/nextMonthPoint/:id", async(req,res)=>{
//   let id = req.params.id;
//   res.send(await mysql.query("point", "showNextMonth", id))[0]
// });
//상세페이지 정보
app.get("/detailPro/:pno", async (req, res) => {
  let pno = req.params.pno;
  let info = await mysql.query('orders', 'detailInfo', pno);
  res.send(info);
})
//상세페이지-> 장바구니
app.post("/savingCart", async (req, res) => {
  let data = req.body.param;
  let result = await mysql.query('orders', 'savingCart', data);
  res.send(result);
})
app.put("/updateCart/:pno/:id", async (req, res) => {
  let datas = [req.body.param, req.params.pno, req.params.id];
  let result = await mysql.query('orders', 'updateCart', datas);
  res.send(result);
})
//장바구니 넣을시 추가할지 업데이트할지
app.get("/comparisonCart/:id", async (req, res) => {
  let id = req.params.id;
  let result = await mysql.query('orders', 'comparisonCart', id);
  res.send(result)
})
//주문내역 관련
app.get("/myOrders/:id", async (req, res) => {
  let id = req.params.id
  let lists = await mysql.query('orders', 'orderList', id);
  //let list = await mysql.query('orders', 'orderList', id);
  // 가공
  //let list = await getOrderInfos(id);
  res.send(lists);
});

// async function getOrderInfos(id){
//   let lists = await mysql.query('orders', 'orderList', id); // group_concat 사용 쿼리

//   let newList = list.map((info)=>{
//     let tempList = info.prod_name_list.split(',');
//     let newData = `${tempList[0]} 외 ${tempList.length-1}건`;
//     info.prod_name_list = newData;
//     return info;
//   })
//   return newList;
// }
app.get("/myOrdersName/:ono/:id", async (req, res) => {
  let datas = [Number(req.params.ono), req.params.id]
  let info = await mysql.query('orders', 'orderListCount', datas);
  res.send(info);
})
//주문 상세내역
app.get("/myDetailOrders/:ono/:id", async (req, res) => {
  let datas = [Number(req.params.ono), req.params.id]
  let list = await mysql.query('orders', 'detailOrderLists', datas);
  res.send(list);
})
//-주문취소
app.delete('/orders/:ono/:id', async (req, res) => {
  let datas = [req.body.param.order_status, req.params[ono], req.params[id]];
  let result = await mysql.query('orders', 'orderCancle', datas)
  res.send(result)
})
//추가 배송지 관련
app.get('/addDelivery/:id', async (req, res) => {
  let id = req.params.id;
  const list = await mysql.query('delivery', 'deliveryList', id);
  res.send(list);
});
app.get('/deliveryInfo/:id/:dno', async (req, res) => {
  let datas = [req.params.id, req.params.dno]
  let result = await mysql.query('delivery', 'deliveryInfo', datas)[0];
  res.send(result)
})
//배송지정보수정
app.put("/updateDelivery/:dno/:id", async (req, res) => {
  let datas = [req.body.param, req.params[dno], req.params[id]]
  let result = await mysql.query('delivery', 'updateDelivery', datas);
  res.send(result)
})
//정보삽입

app.post("/addDelivery", async (req, res) => {
  let datas = req.body.param
  let result = await mysql.query('delivery', 'addDelivery', datas)
  res.send(result);
});
app.delete("/delDelivery", async (req, res) => {
  let result = await mysql.query('delivery', 'deleteDelivery')
  res.send(result);
})
//찜하기 리스트
app.get("/like/:id", async (req, res) => {
  let id = req.params.id;
  let list = await mysql.query('like', "likeList", id)
  res.send(list);
})
//쿠폰
app.get("/myCoupon/:id", async (req, res) => {
  let id = req.params.id;
  let list = await mysql.query('coupon', 'myCoupon', id)
  res.send(list);
})

app.get("/user", async (req, res) => {
  let list = await mysql.query("admin", "userList");
  res.send(list);
});
//포인트
//기간 만료시 포인트 소멸인거처럼 업데이트 
//둘다 된다 await를 거는게 더 좋은걸까..?
cron.schedule("0 0 0 * * *", async () => {
  //updatePoint();
  await mysql.query("point", 'pointExpire', (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log(`테이블 업데이트 성공`)
    }
  })
});

//     cron.schedule("0 0 0 * * *", ()=>{
//     updatePoint()
//   })
//   function updatePoint(){
//     mysql.query("point", 'pointExpire',(err,result)=>{
//      if(err){
//        console.log(err)
//      }else{
//        console.log(`테이블 업데이트 성공`)
//      }
//    })
//  }
//마이페이지 포인트 내역조회
app.get("/myPointSave/:id", async (req, res) => {
  let id = req.params.id;
  let list = await mysql.query("point", "myPointSaveHistory", id);
  res.send(list);
});
app.get("/myPointUse/:id", async (req, res) => {
  let id = req.params.id;
  let list = await mysql.query("point", "myPointUseHistory", id);
  res.send(list);
})
//리뷰등록시 포인트 지급
app.post("/reviewPoint/:id", async (req, res) => {
  //let datas = [request.body.param,Number(req.params.ono),req.params.id]
  let datas = [req.body.point_no, req.body.order_no, req.params.id]
  res.send(await mysql.query("reviews", "reviewPoint", datas));;

});

//리뷰관련
//상세페이지에서 리뷰목록
app.get("/detailReview/:pno", async (request, response) => {
  let pno = request.params.pno
  let list = await mysql.query('reviews', 'detailList', pno)
  response.send(list);
})
//마이페이지에서 리뷰목록
app.get("/myReview/:id", async (request, response) => {
  let id = request.params.id
  let list = await mysql.query('reviews', 'myReview', id)
  response.send(list);
})
//리뷰등록 + (포인트 지급은 위에 참고)
app.post("/reviewInsert", async (req, res) => {
  let datas = req.body.param
  res.send(await mysql.query("reviews", "insertReview", datas));

});
//리뷰 단건 조회
app.get("/reviewInfo/:id/:rno", async (req, res) => {
  let datas = [req.params.id, req.params.rno]
  res.send(await mysql.query("reviews", "reviewInfo", datas))[0]
});
//리뷰수정
app.put("/reviewUpdate/:id/:rno", async (req, res) => {
  let datas = [req.body.param, req.params.id, Number(req.params.rno)]
  res.send(await mysql.query("reviews", "updateReview", datas));
})

//상세페이지 버튼 disable용
app.get("/orderNoReview/:id", async (req, res) => {
  let id = req.params.id
  res.send(await mysql.query("reviews", "orderNoReview", id))
});


//상세페이지 버튼 disable용
app.get("/orderNoReview/:id", async (req, res) => {
  let id = req.params.id
  res.send(await mysql.query("reviews", "orderNoReview", id))
});
//찜하기
app.get("/prodLike/:id/:pno", async (req, res) => {
  let datas = [req.params.id, req.params.pno]
  res.send(await mysql.query("like", "likeList", datas))[0]
});
app.delete("/DelprodLike/:id:/:pno", async (req, res) => {
  let id = req.params.id
  res.send(await mysql.query("like", "likeDel", id))
});
app.post("/prodLike", async (req, res) => {
  let data = req.body.param
  res.send(await mysql.query("like", "likeInsert", data))
});



app.get("/frozen/:first/:last/:A/:B/:no", async (req, res) => {
  let base = `select file_name, p.*, FORMAT(avg(review_grade),1) AS 'star' from product p left join order_detail d on p.prod_no = d.prod_no
  left join review r  on r.detail_order_no = d.order_detail_no   left join (select file_name,prod_no from file where orders='s0') f on(p.prod_no = f.prod_no)  where refrigeration = 'g1' `

  let params = [];

  const {
    no,
    first,
    last,
    A,
    B
  } = req.params;

  if (first !== 'X' && last !== 'X') {
    base += ` AND prod_name >= ? AND prod_name < ?`;
    params.push(first, last);
  }
  if (A !== 'X' && B !== 'X') {
    base += ` AND discount_price BETWEEN ? AND ?`;
    params.push(Number(A), Number(B));
  }

  base += ` group by d.prod_no `

  if (no !== 'X') {
    base += ` LIMIT ?, 6`;
    params.push(Number(no) * 6);
  }
  let result = await mysql.query2(base, params);
  res.send(result);
})



app.get("/searchHeader/:word/:no", async (req, res) => {
  let word = [req.params.word, Number(req.params.no)];
  let list = await mysql.query('test', 'searchHeader', word)
  res.send(list);
  io.emit('alert', req.params.word);
})

app.get("/searchHeader/:word", async (req, res) => {
  let data = req.params.word
  let list = await mysql.query('test', 'searchHeaderPage', data)
  res.send(list)
})

app.post("/cartAfterLogin", async (req, res) => {
  let data = req.body.param;
  let list = await mysql.query('test', 'cartAfterLogin', data)
  res.send(list);
})

app.put(`/cartAfterLogin/:no`, async (req, res) => {
  let data = [req.body.param, req.params.no];
  let list = await mysql.query('test', 'cartUpdate', data)
  res.send(list)
})

app.get(`/cartSelect/:no/:id`, async (req, res) => {
  let data = [Number(req.params.no), req.params.id];
  let list = await mysql.query('test', 'cartSelect', data)
  res.send(list)
})