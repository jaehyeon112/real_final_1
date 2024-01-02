require("dotenv").config({
  path: "./db/db.env"
});
const mysql = require("./db.js");
const express = require("express");
const app = express();
const fs = require("fs");
const multer = require("multer");
const path = require("path");

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

app.listen(3000, () => {
  console.log("재현 서버 on");
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

app.get("/user/:order/:startNo/:no", async (req, res) => {
  let data = [req.params.order, Number(req.params.startNo) * Number(req.params.no), Number(req.params.no)];
  let list = await mysql.query("admin", "userList", data);
})

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
  res.send(result)
})
app.get("/bothFilter/:first/:last/:A/:B/:col/:category", async (req, res) => {
  let data = [req.params.first, req.params.last, Number(req.params.A), Number(req.params.B), req.params.col, req.params.category];
  let result = await mysql.query("test", "categoryBothFilterPage", data);
  res.send(result)
})

app.get("/bothFilter/:first/:last/:A/:B/:col/:category/:no", async (req, res) => {
  let data = [req.params.first, req.params.last, Number(req.params.A), Number(req.params.B), req.params.col, req.params.category, Number(req.params.no) * 6];
  let result = await mysql.query("test", "categoryBothFilter", data);
  res.send(result)
})

app.get("/show/:col/:category/:no", async (req, res) => {
  let data = [req.params.col, req.params.category, Number(req.params.no) * 6];
  let result = await mysql.query("test", "categoryList", data);
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
    //기간 만료시 포인트 소멸
    cron.schedule("0 0 0 * * *", () => {
      app.post("/pointExpre",async (req,res)=>{
        let data = req.body.param
        res.send(await mysql.query('point','pointExpire',data));
      })
    });
    
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
    app.get("reviewInfo/:id/:rno", async(req,res)=>{
      let datas = [req,params.id, req.params.rno]
      res.send(await mysql.query("reviews", "reviewInfo",datas))
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
  

    