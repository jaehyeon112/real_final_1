let test = {
  list: `select * from  product`,
  list2 : `select * from product limit ? , 6`,
  categoryList : `select * from where ?? = ?`,
  wordFilterPage : `select * from product where  prod_name >= ? and prod_name < ?`,
  wordFilter : `select * from product where  prod_name >= ? and prod_name < ? limit ? , 6`,
  priceFilterPage : `select * from product where discount_price between ? and ?`,
  priceFilter : `select * from product where discount_price between ? and ? limit ? , 6`,
  bothFilterPage : `select * from product where prod_name >= ? and prod_name < ? and discount_price between ? and ?`,
  bothFilter : `select * from product where prod_name >= ? and prod_name < ? and discount_price between ? and ? limit ? , 6`,

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
  myCoupon:`select c1.couponinfo_no, c1.user_id, c1.start_coupon, c1.end_coupon, c1.coupon_able, c2.coupon_name, c2.coupon_content, c2.coupon_discount_rate  
            from coupon c1 left join couponinfo c2 
            on (c1.couponinfo_no = c2.couponinfo_no)
            where c1.user_id=?;`//마이페이지 보유 쿠폰
};
let orders = {
  orderList:`select order_no, order_date, total_payment, real_payment, payment_method, order_status
             from orders where user_id=?`,
   orderListCount:`select prod_name from product pr join order_detail ord on pr.prod_no = ord.prod_no 
                  join user us
                   where ord.order_no=? and us.user_id=? limit 1`,        
  orderCancle:`update orders set order_status=m3 where order_no=? and user_id=?`,//주문전체취소
  detailOrderLists:`select * from order_detail od join product pr on od.prod_no = pr.prod_no	
                                                  join orders ods on ods.order_no = od.order_no
                     where od.order_no=?
                     where user_id=?`//주문창에서 상세주문내역으로 이동시 불러올 값
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
let member = {
  memberInfo : `select * from user where user_id=?` //이건 나중에 로그인 세션 이용하게 되면 지우자
}

let user = {
  //아이디 중복 체크할 때
  duplicateId : `select user_id from user where user_id=?`,
  
  //회원가입
  join : `INSERT INTO user SET ?`, 

  // 이메일 중복체크용
  duplicateEmail : `select user_email from user where user_email = ?`,

  //로그인(일단)
  forLogin : `select * from user where user_id = ? and user_password = ?;`
 
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
  monthsIncome : `select month(order_date) as month,sum(total_payment) as sum from orders group by month order by month;`,
  AlluserList : `select user_id,user_name,user_email,user_tel,join_date,user_grade from user order by ??`,
  userList : `select user_id,user_name,user_email,user_tel,join_date,user_grade from user order by ?? limit ?,?`,
  proList : `select prod_no,prod_name,price,discount_price,discount_rate,stock,main_category from product`,
  AllprodList : `select prod_no,prod_name,price,discount_price,discount_rate,stock,main_category from product order by ??`,
  pricehigh : `select prod_no,prod_name,price,discount_price,discount_rate,stock,main_category from product order by discount_price desc limit ?,?`,
  prodList : `select prod_no,prod_name,price,discount_price,discount_rate,stock,main_category,registration from product order by ?? limit ?,?`,
  prodInsert : `insert into product set ?`,
  prodDelete : `update product set soldout=1 where prod_no=?`,
  prodInfo : `select prod_no,prod_name,price,discount_price,discount_rate,stock,cooking_time,allergy,
  main_category,sub_category,refrigeration 
  from product where prod_no = ?`,
  productMod : `update product set ? where prod_no = ?`,
  weekIncome : `select sum(total_payment) from orders where order_date BETWEEN DATE_ADD(NOW(), INTERVAL -1 week ) AND NOW()`,
  monthsIncome : `select month(order_date) as month,sum(total_payment) as sum from orders group by month order by month;`,
  stopUser : `update user set user_grade = ? where user_id = ?`,
  searchUser : `select user_id,user_name,user_email,user_tel,join_date,user_grade from user
  where user_id like concat(concat('%',?),'%') or user_name like concat(concat('%',?),'%') or join_date like concat(concat('%',?),'%') order by ?? limit ?,?`,
  searchProd : `select prod_no,prod_name,price,discount_price,discount_rate,stock,main_category from product where prod_name like concat(concat('%',?),'%') order by ?? limit ?,?`
}
module.exports = {
  user,
  test,reviews,point,coupon,orders, delivery,like,member,
  admin
};
