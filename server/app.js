require("dotenv").config({
  path: "./db/db.env"
});
const mysql = require("./db.js");
const express = require("express");
const app = express();
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const server = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:8080",
  }
});
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
    from: `Your Name <${process.env.GMAIL_OAUTH_USER}>`,
    to,
    subject,
    text: body
  };

  const result = await transporter.sendMail(mailOptions);
  return result;
}

app.post('/send-email', async (req, res) => {
  try {
    const {
      to,
      subject,
      body
    } = req.body;
    console.log(to + subject + body + 'asdfasfdasfdasfd');
    const result = await sendEmail(to, subject, body);
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


io.on('connect', (socket) => {
  console.log('소켓연결테스트')

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

//  *(분: 0-59) *(시: 0-23) *(일: 1-31) *(월 1-12) *(요일 0-7, 0or7은 일요일~)
/* 
cron.schedule("0 2 * * * *", () => {
  console.log("1초마다 스케줄러 작동!");
});
 */



// cron.schedule("0 0 6 * * *", () => {
//   console.log("1초마다 스케줄러 작동!");
//   // 매일 06시 0분 0초에 진행되는 작업
  
// });

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

app.post("/photos", upload.array("photos", 12), (req, res) => {
  for (let file of req.files) {
    console.log(file);
  }
});

/* 
app.listen(3000, () => {
  console.log("재현 서버 on");
});
 */
server.listen(3000, () => {
  console.log('app대신 socket.io서버 on~~');
});


app.get('/prod', async (req, res) => {
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


app.get("/coupon/:id", async (req, res) => { // 쿠폰 리스트
  let id = req.params.id;
  let list = await mysql.query("test", "couponList", id);
  res.send(list);
});
app.get("/point/:id", async (req, res) => { // 포인트 리스트 
  let id = req.params.id;
  let list = await mysql.query("test", "pointList", id);
  res.send(list);
});

app.get("/cartList/:id", async (req, res) => { //장바구니 리스트
  let id = req.params.id;
  let list = await mysql.query("test", "cartList", id);
  res.send(list);
});

app.put("/CheckboxUpdate/:check/:no", async (request, res) => { // 장바구니 체크박스 선택시 업데이트
  let data = [request.params.check, request.params.no];
  let list = await mysql.query("test", "CheckboxUpdate", data);
  res.send(list);
});

app.delete("/CheckboxDelete/:no", async (req, res) => { // 체크된 장바구니 삭제
  let data = req.params.no;
  let result = await mysql.query("test", 'CheckboxDelete', data);
  res.send(result);
});


app.get("/cartCheckList/:id", async (req, res) => { //주문서의 장바구니체크된거만불러오는 리스트
  let id = req.params.id;
  let list = await mysql.query("test", "cartCheckList", id);
  res.send(list);
});

app.get("/orderList/:id", async (req, res) => { // 주문완료 리스트
  let id = req.params.id;
  let list = await mysql.query("test", "orderList", id);
  res.send(list);
});

app.post("/orderInsert", async (request, res) => { // orders 등록
  let data = request.body.param;
  res.send((await mysql.query("test", "orderInsert", data)));
});

app.post("/orderdetailInsert", async (request, res) => { // order_detail 등록
  let data = request.body.param;
  res.send((await mysql.query("test", "orderdetailInsert", data)));
});

app.get("/user/:order", async (req, res) => {
  let result = req.params.order;
  let data = await mysql.query("admin", "AlluserList", result);
  res.send(data);
});

app.get("/user/:order/:startNo/:no", async (req, res) => {
  let data = [req.params.order, Number(req.params.startNo) * Number(req.params.no), Number(req.params.no)];
  let list = await mysql.query("admin", "userList", data);
  res.send(list);
});

app.put("/order/:status/:ono", async (req, res) => {
  let data = [req.params.status, req.params.ono];
  let list = await mysql.query("admin", "updateOrder", data);
  res.send(list);
});

app.get("/orderCount", async (req, res) => {
  //let data = req.params.orderNo;
  let list = await mysql.query("admin", "orderDetailCount");
  res.send(list);
});

// 회원가입 - 아이디 중복체크용
app.get("/join-id/:id", async (req, res) => {
  let uid = req.params.id;
  let list = await mysql.query("user", "duplicateId", uid);
  res.send(list);
})

//회원가입 - 이메일 중복체크용
app.get("/join-email/:email", async (req, res) => {
  let uemail = req.params.email;
  let list = await mysql.query("user", "duplicateEmail", uemail);
  res.send(list);
})


//회원가입용(insert) **주소수정ㅎ기! 
app.post("/join", async (req, res) => {
  let data = req.body.param;
  let result = await mysql.query("user", "join", data);
  res.send(result);
});


//로그인 - 아이디비번 일치해야 로그인 (5회 오류시 보안프로그램실행)
app.get("/dologin/:id/:password", async (req, res) => {
  let data = [req.params.id, req.params.password]
  let list = await mysql.query("user", "forLogin", data);
  res.send(list);
});

//로그인 세션
app.post("/token", async (req, res) => {
  let data = req.body.param;
  let result = await mysql.query("user", "idToken", data);
  res.send(result);
})





app.get("/user", async (req, res) => {
  let list = await mysql.query("admin", "userList");
  res.send(list);
});

app.get("/user/:id/:name/:join/:order/:startNo/:no", async (req, res) => {
  let list = [req.params.id, req.params.name, req.params.join, req.params.order, Number(req.params.startNo) * Number(req.params.no), Number(req.params.no)];
  let data = await mysql.query("admin", "searchUser", list);
  res.send(data);
});

app.get("/prod/:name/:order/:startNo/:no", async (req, res) => {
  let list = [req.params.name, req.params.order, Number(req.params.startNo) * Number(req.params.no), Number(req.params.no)];
  let data = await mysql.query("admin", "searchProd", list);
  res.send(data);
});

app.get("/prod/:order", async (req, res) => {
  let result = req.params.order;
  let data = await mysql.query("admin", "AllprodList", result);
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

app.get("/sum", async (req, res) => {
  let result = await mysql.query("admin", "monthsIncome");
  res.send(result);
});

app.put("/user/:grade/:uid", async (req, res) => {
  let data = [req.params.grade, req.params.uid];
  let result = await mysql.query("admin", "stopUser", data);
  res.send(result);
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

app.get('/order/:status/:sno/:lno', async (req, res) => {
  console.log('실행중')
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

app.get('/review', async (req, res) => {
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

app.get('/refund', async (req, res) => {
  let result = await mysql.query("admin", "AllrefundOrderList");
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

app.get('/inquire', async (req, res) => {
  let result = await mysql.query("admin", "inquireList");
  res.send(result);
});

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
    let test = "select * from product limit ?,6"
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
//멤버조회정보
app.get("/member/:id", async (req,res)=>{
  let id = req.params.id;
  let info= await mysql.query("member", "memberInfo", id);
  res.send(info)
})

//주문내역 관련
app.get("/myOrders/:id", async(req, res)=>{
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
 app.get("/myOrdersName/:ono/:id", async(req,res)=>{
   let datas = [Number(req.params.ono),req.params.id]
   let info = await mysql.query('orders', 'orderListCount',datas);
   res.send(info);
 })
//주문 상세내역
app.get("/myDetailOrders/:ono/:id", async(req,res)=>{
  let datas = [Number(req.params.ono),req.params.id]
  let list = await mysql.query('orders', 'detailOrderLists', datas);
  res.send(list);
})
//-주문취소
app.delete('/orders/:ono/:id',async (req,res)=>{
  let datas = [req.body.param.order_status, req.params[ono],req.params[id]];
  let result = await mysql.query('orders','orderCancle',datas)
  res.send(result)
})
//추가 배송지 관련
app.get('/addDelivery/:id', async(req,res)=>{
  let id = req.params.id;
  const list = await mysql.query('delivery','deliveryList',id);
  res.send(list);
})
//정보수정
app.put("/addDelivery/:dno/:id", async(req,res)=>{
  let datas = [req.body.param, req.params[dno], req.params[id]]
  let result =  await mysql.query('delivery', 'updateDelivery',datas);
  res.send(result)
})
//정보삽입
const delTable = ['delivery_no','user_id','delivery_name','delivery_address','delivery_detail_address, delivery_postcode'];
app.post("/addDelivery", async(req,res)=>{
  let data = req.body.param;
  let delData = {};
for(let column of delTable){  
  let value = data[column]; 
  if(value == '') continue;
  delData[column] = value;    
}
  let result = await mysql.query('delivery', 'addDelivery')
  res.send(result);
})
app.delete("/addDelivery", async(req,res)=>{
  let result = await mysql.query('delivery', 'deleteDelivery')
  res.send(result);
})
//찜하기 리스트
  app.get("/like/:id",async(req,res)=>{
    let id = req.params.id;
    let list = await mysql.query('like', "likeList",id)
    res.send(list);
  })
//쿠폰
  app.get("/coupon/:id", async(req,res)=>{
    let id = req.params.id;
    let list = await mysql.query('coupon','myCoupon',id)
    res.send(list);
  })
  
app.get("/user",async (req, res) => {
let list = await mysql.query("admin", "userList");
res.send(list);
});
//포인트
    //기간 만료시 포인트 소멸인거처럼 업데이트 
    //둘다 된다 await를 거는게 더 좋은걸까..?
    cron.schedule("0 0 0 * * *", async() => {
      //updatePoint();
      await mysql.query("point", 'pointExpire',(err,result)=>{
        if(err){
          console.log(err)
        }else{
          console.log(`테이블 업데이트 성공`)
        }
      })
    });
    cron.schedule("0 0 0 * * *", ()=>{
    function updatePoint(){
       mysql.query("point", 'pointExpire',(err,result)=>{
        if(err){
          console.log(err)
        }else{
          console.log(`테이블 업데이트 성공`)
        }
      })
    }
  })
    //마이페이지 포인트 내역조회
    app.get("/myPointSave/:id", async (req,res)=>{
      let id = req.params.id;
      let list = await mysql.query("point", "myPointSaveHistory", id);
      res.send(list);
    })
    app.get("/myPointUse/:id", async (req,res)=>{
      let id = req.params.id;
      let list = await mysql.query("point", "myPointUseHistory", id);
      res.send(list);
    })
    //리뷰등록시 포인트 지급
    app.post("/reviewPoint/:ono/:id", async(req,res)=>{
        let datas = [request.body.param,Number(req.params.ono),req.params.id] 
        res.send(await mysql.query("reviews","reviewPoint", datas));
      
      });
    //다음달 소멸 포인트
    app.get("/nextMonthPoint/:id", async(req,res)=>{
      let id = req.params.id;
      res.send(await mysql.query("point", "showNextMonth", id))
    })
//리뷰관련
    //상세페이지에서 리뷰목록
    app.get("/detailReview/:pno", async(request, response)=>{
      let pno = request.params.pno
      let list = await mysql.query('reviews','detailList',pno)
      res.send(list);
    })
    //마이페이지에서 리뷰목록
    app.get("/myReview/:id", async(request, response)=>{
      let id = request.params.id
      let list = await mysql.query('reviews','myReview',id)
      response.send(list);
    })
    //리뷰등록 + (포인트 지급은 위에 참고)
    app.post("/reviewInsert", async(req,res)=>{
      let datas = req.body.param
      res.send(await mysql.query("reviews", "insertReview", datas));
    
    });
    //리뷰 단건 조회
    app.get("/reviewInfo/:id/:rno", async(req,res)=>{
      let datas = [req.params.id, req.params.rno]
      res.send(await mysql.query("reviews", "reviewInfo",datas))[0]
    });
    //리뷰수정
    app.put("/reviewUpdate/:id/:rno", async(req,res)=>{
      let datas = [req.body.param, req.params.id, Number(req.params.rno)]
      res.send(await mysql.query("reviews", "updateReview", datas));
    })

    //상세페이지 버튼 disable용
    app.get("/orderNoReview/:id", async(req,res)=>{
      let id = req.params.id
      res.send(await mysql.query("reviews", "orderNoReview",id))
    });
  

    

// sql injection의 위험이 있음 처리해야함;;
app.get("/new2/:first/:last/:A/:B/:no", async (req, res) => {
  let base = 'SELECT * FROM product WHERE registration >= CURRENT_DATE() - INTERVAL 7 DAY ';
  let no = req.params.no;
  let first = req.params.first;
  let last = req.params.last;
  let A = req.params.A;
  let B = req.params.B;
  if (first != 'X' && last != 'X') {
    base += ` and  prod_name >= '${first}' and prod_name < '${last}'`;
  }
  if (A != 'X' && B != 'X') {
    base += ` and discount_price between ${A} and ${B} `
  }
  if (no != 'X') { // 2번째가 X라면 전체페이지, 아니면 6페이지씩
    base += ' limit ' + no * 6 + ', 6';
  }
  let result = await mysql.query2(base);
  res.send(result);
})
// sql injection의 위험이 있음 처리해야함;;
app.get("/frozen/:first/:last/:A/:B/:no", async (req, res) => {
  let base = `select * from product  where refrigeration = 'g1' `

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
  if (no !== 'X') {
    base += ` LIMIT ?, 6`;
    params.push(Number(no) * 6);
  }
  let result = await mysql.query2(base, params);
  res.send(result);
})

app.get("/searchHeader/:word", async (req, res) => {
  let word = req.params.word
  console.log(word)
  let list = await mysql.query('test', 'searchHeader', word)
  res.send(list);
})
