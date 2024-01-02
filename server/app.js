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

app.get("/cartList/:id", async (req, res) => { //주문 리스트
  let id = req.params.id;
  let list = await mysql.query("test", "cartList", id);
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
  res.send((await mysql.query("orderInsert", data)));
});

app.get("/user/:order", async (req, res) => {
  let result = req.params.order;
  let data = await mysql.query("admin", "AlluserList", result);
  res.send(data);
});

app.get("/user/:order/:startNo/:no",async (req, res) => {
  let data = [req.params.order,Number(req.params.startNo)*Number(req.params.no),Number(req.params.no)];
  let list = await mysql.query("admin", "userList",data);
  res.send(list);
});

app.put("/order/:status/:ono",async (req, res) => {
  let data = [req.params.status,req.params.ono];
  let list = await mysql.query("admin", "updateOrder",data);
  res.send(list);
});

app.get("/orderCount",async (req, res) => {
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

app.get("/notice", async (req, res) => {
  let result = await mysql.query("admin", "AllnoticeList");
  res.send(result);
});

app.get("/fnq/:column/:cate", async (req, res) => {
  let data = [req.params.column,req.params.cate];
  let result = await mysql.query("admin", "FNQList",data);
  res.send(result);
});

app.post("/fnq", async (req, res) => {
  let data = req.body.param;
  let result = await mysql.query("admin", "insertFNQ",data);
  res.send(result);
});

app.put("/fnq/:qno", async (req, res) => {
  let data = [req.body.param,req.params.qno];
  let result = await mysql.query("admin", "updateFNQ",data);
  res.send(result);
});

app.delete("/fnq/:qno", async (req, res) => {
  let data = req.params.qno;
  let result = await mysql.query("admin", "delFNQ",data);
  res.send(result);
});

app.get("/notice/:order/:sno/:lno", async (req, res) => {
  let data = [req.params.order,Number(req.params.sno),Number(req.params.lno)]
  let result = await mysql.query("admin", "AllnoticeList",data);
  res.send(result)
});

app.get("/notice/:import1/:import2/:order/:sno/:lno", async (req, res) => {
  let data = [req.params.import1,req.params.import2,req.params.order,Number(req.params.sno),Number(req.params.lno)];
  let result = await mysql.query("admin", "StateNoticeList",data);
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

app.get('/order',async (req, res) => {
  let result = await mysql.query("admin", "AllOrderList");
  res.send(result);
});

app.get('/review/:order',async (req, res) => {
  let data=req.params.order;
  let result = await mysql.query("admin", "reviewList",data);
  res.send(result);
});

app.get('/order/:status/:sno/:lno',async (req, res) => {
  console.log('실행중')
  let data = [req.params.status,Number(req.params.sno),Number(req.params.lno)]
  let result = await mysql.query("admin", "orderStatus",data);
  res.send(result);
});

app.post('/refund/:ono',async (req, res) => {
  let data = req.params.ono
  let result = await mysql.query("admin", "adminRefund",data);
  res.send(result);
});

app.put('/refund/:ono',async (req, res) => {
  let data = req.params.ono
  let result = await mysql.query("admin", "refundOrder",data);
  res.send(result);
});

app.get('/order/:sno/:lno',async (req, res) => {
  let datas = [Number(req.params.sno),Number(req.params.lno)]
  let result = await mysql.query("admin", "orderList",datas);
  res.send(result);
});

app.get('/review',async (req, res) => {
  let result = await mysql.query("admin", "AllreviewReportList");
  res.send(result);
});

app.get('/review/:sno/:lno',async (req, res) => {
  let datas = [Number(req.params.sno),Number(req.params.lno)]
  let result = await mysql.query("admin", "reviewReportList",datas);
  res.send(result);
});

app.get('/review/:status/:sno/:lno',async (req, res) => {
  let datas = [req.params.status,Number(req.params.sno),Number(req.params.lno)]
  let result = await mysql.query("admin", "reasonReportList",datas);
  res.send(result);
});

app.get('/refund',async (req, res) => {
  let result = await mysql.query("admin", "AllrefundOrderList");
  res.send(result);
});

app.get('/refund/:state/:sno/:lno',async (req, res) => {
  let data = [req.params.state,Number(req.params.sno),Number(req.params.lno)];
  let result = await mysql.query("admin", "refundState",data);
  res.send(result);
});

app.get('/refund/:sno/:lno',async (req, res) => {
  let datas = [Number(req.params.sno),Number(req.params.lno)]
  let result = await mysql.query("admin", "refundOrderList",datas);
  res.send(result);
});

app.put('/refund/:state/:ono',async (req, res) => {
  let datas = [req.params.state,req.params.ono];
  let result = await mysql.query("admin", "updateRefund",datas);
  res.send(result);
});

app.get('/delivery',async (req, res) => {
  let result = await mysql.query("admin", "Alldelivery");
  res.send(result);
});

app.get('/delivery/:sno/:lno',async (req, res) => {
  let datas = [Number(req.params.sno),Number(req.params.lno)]
  let result = await mysql.query("admin", "deliveryList",datas);
  res.send(result);
});

app.get('/delivery/:state/:startNo/:lastNo',async (req, res) => {
  let datas = [req.params.state,Number(req.params.startNo),Number(req.params.lastNo)];
  let result = await mysql.query("admin", "StatedeliveryList",datas);
  res.send(result);
});

app.get('/delivery/:sday/:eday/:startNo/:lastNo',async (req, res) => {
  let datas = [req.params.sday,req.params.eday,Number(req.params.startNo),Number(req.params.lastNo)];
  let result = await mysql.query("admin", "DatedeliveryList",datas);
  res.send(result);
});

app.get('/inquire',async (req, res) => {
  let result = await mysql.query("admin", "AllinquireList");
  res.send(result);
});

app.get('/inquire/:startNo/:lastNo',async (req, res) => {
  let datas = [Number(req.params.startNo),Number(req.params.lastNo)];
  let result = await mysql.query("admin", "inquireList",datas);
  res.send(result);
});

app.get('/inquire/:where1/:where2/:where3/:where4/:startNo/:lastNo',async (req, res) => {
  let datas = [req.params.where1,req.params.where2,req.params.where3,req.params.where4,Number(req.params.startNo),Number(req.params.lastNo)];
  let result = await mysql.query("admin", "StateinquireList",datas);
  res.send(result);
});

app.get('/orders/:sday/:eday/:startNo/:lastNo',async (req, res) => {
  let datas = [req.params.sday,req.params.eday,Number(req.params.startNo),Number(req.params.lastNo)];
  let result = await mysql.query("admin", "orderDate",datas);
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
  let data = [req.params.col, req.params.category, Number(req.params.no) * 6];
  let result = await mysql.query("test", "categoryList", data);
  console.log(Number(req.params.no))
  res.send(result)
})
app.get("/show/:col/:category/", async (req, res) => {
  let data = [req.params.col, req.params.category];
  let result = await mysql.query("test", "categoryListPage", data);
  res.send(result)
})

app.get("/new/:no", async (req, res) => {
  let data = Number(req.params.no);
  let result = await mysql.query("test", "newList", data);
  res.send(result);
})
app.get("/new", async (req, res) => {
  let result = await mysql.query("test", "newListPage");
  res.send(result);
});

// sql injection의 위험이 있음 처리해야함;;
app.get("/new2/:first/:last/:A/:B/:no", async (req, res) => {
  let base = 'select * from product where registration >= current_date() - 3 '
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
});
