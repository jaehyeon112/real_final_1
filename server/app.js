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

//리뷰관련
  //상세페이지에서 리뷰목록
  app.get("/detailReview/:pno", async(request, response)=>{
    let pno = request.params.prod_no
    let list = await mysql.query('review','detailList',pno)[0]
    res.send(list);
  })

 //주문내역 관련
  app.get("/orders/:id", async(req, res)=>{
    let id = req.params.user_id
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

