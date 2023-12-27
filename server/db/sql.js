let test = {
  list: `select * from  product`,
  list2 : `select * from product limit ? , 6`
};
let reviews = {
  myList:`select * from review where user_id=? `,//마이페이지에서 내가 작성한 리뷰 리스트
  detailList:`select * from review where prod_no=?`, //상세페이지에서 그 상품에대한 리뷰 리스트
  insertRivew:`insert into review set?`,//이미지를 넣으려면..?
  insertImage:`insert into image set?`  
};
let point = {
  myPoint:`select * from point where user_id=?`//마이페이지 보유 포인트
};
let coupon = {
  myCoupon:`select * from coupon where user_id=?`//마이페이지 보유 쿠폰
};
let orders = {
  orderList:`select * from orders where user_id=?`,
  orderCancle:`update orders set order_status=m3 where order_no=? and user_id=?`,//주문 전체취소
  detailOrderLists:`select * from order_detail o1 left join orders o2 on o1.order_no = o2.order_no`//주문창에서 상세주문내역으로 이동시 불러올 값
}
let delivery = {
  addDelivery: `insert into add_delivery set?`,
  deliveryList: `select * from add_delivery where user_id=?`,
  updateDelivery:`update add_delivery set? where delivery_no=? and user_id=?`,
  deleteDelivery: `delete from add_delivery where delivery_no=?`
}
let like = {
  likeList : `select* from likes where user_id=?`
}

let admin = {
  userList : `select user_id,user_name,user_email,user_tel,join_date,user_grade
  from user
  order by join_date desc`,
  prodList : `select prod_no,prod_name,price,discount_price,discount_rate,stock,main_category
  from product`,
  prodInsert : `insert into product set ?`,
  prodDelete : `update product set soldout=1 where prod_no=?`,
  prodInfo : `select prod_no,prod_name,price,discount_price,stock,cooking_time,allergy,
  main_category,sub_category,refrigeration 
  from product where prod_no = ?`,
  productMod : `update product set ? where prod_no = ?`,
  weekIncome : `select sum(total_payment) from orders where order_date BETWEEN DATE_ADD(NOW(), INTERVAL -1 week ) AND NOW()`,
  monthsIncome : `select month(order_date) as month,sum(total_payment) as sum from orders group by month order by month;`
}

module.exports = {
  test,reviews,point,coupon,orders, delivery,like,
  admin
};
