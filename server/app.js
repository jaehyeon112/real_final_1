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

//리뷰관련
  //상세페이지에서 리뷰목록
  app.get("/detailReview/:pno", async(request, response)=>{
    let pno = request.params.prod_no
    let list = await mysql.query('review','detailList',pno)[0]
    res.send(list);
  })

 //주문내역 관련
  app.get("/orders/:id", async(req, res)=>{
    let id = req.params.id
    let list = await mysql.query('orders', 'orderList', id);
    res.send(list);
  });
  //-주문취소
  app.delete('/orders/:ono/:id',async (req,res)=>{
    let datas = [req.body.param.order_status, req.params[ono],req.params[id]];
    let result = await mysql.query('orders','orderCancle',datas)
    res.send(result)
  })
//추가 배송지 관련
  app.get('/addDelivery', async(req,res)=>{
    const list = await mysql.query('delivery',deliveryList);
    res.send(list);
  })
  //정보수정
  app.put("/addDelivery/:dno/:id", async(req,res)=>{
    let datas = [req.body.param, req.params[dno], req.params[id]]
    let result =  await mysql.query('delivery', updateDelivery,datas);
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
    let result = await mysql.query('delivery', addDelivery)
    res.send(result);
  })
  app.delete("/addDelivery", async(req,res)=>{
    let result = await mysql.query('delivery', deleteDelivery)
    res.send(result);
  })

  //찜하기 리스트
    app.get("/like/:id",async(req,res)=>{
      let id = req.params;
      let result = await mysql.query('like', likeList)
      res.send(result);
    })


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
