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

