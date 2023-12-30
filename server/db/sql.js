let test = {
  list: `select * from  product`,
  list2 : `select * from product limit ? , 6`,
  // 장바구니 리스트
  cartList : `select distinct * 
              from cart c, product p, user u
              WHERE cart_checkbox = 1 AND c.user_id = u.user_id AND p.prod_no = c.prod_no AND c.user_id = ?
              order by cart_no`,
  // 장바구니 체크 리스트 
  cartCheckList : `select distinct *
              from cart c, product p, user u
              WHERE cart_checkbox = 1 AND c.user_id = u.user_id AND p.prod_no = c.prod_no AND c.user_id = ?
              order by cart_no`,

  // 장바구니 체크박스 선택하면 업데이트되게 구현
  CheckboxUpdate : `UPDATE cart SET ? WHERE cart_no = ?`,
  // 쿠폰 리스트
  couponList : `select a.coupon_no, start_coupon, end_coupon, coupon_name, coupon_content, coupon_discount_rate
                from coupon a left join user b on(a.user_id = b.user_id) 
                left join couponinfo c on(a.couponinfo_no = c.couponinfo_no)
                where a.user_id = ?`,
  // 포인트 리스트
  pointList : `select *
               from user
               where user_id = ?`,
  // 주문 리스트
  orderList : `select distinct * 
               from orders o, product p, user u
               where o.user_id = u.user_id AND prod_no = '1' AND o.user_id = ?
               order by order_no`,
  // 주문하고난 후 orders 테이블  등록
  orderInsert : `insert into orders set ?`,
  // 주문하고난 후 order_detail 테이블  등록
  orderdetailInsert : `insert into order_detail set ?`,
  categoryList : `select * from where ?? = ?`,
  wordFilterPage : `select * from product where  prod_name >= ? and prod_name < ?`,
  wordFilter : `select * from product where  prod_name >= ? and prod_name < ? limit ? , 6`,
  priceFilterPage : `select * from product where discount_price between ? and ?`,
  priceFilter : `select * from product where discount_price between ? and ? limit ? , 6`,
  bothFilterPage : `select * from product where prod_name >= ? and prod_name < ? and discount_price between ? and ?`,
  bothFilter : `select * from product where prod_name >= ? and prod_name < ? and discount_price between ? and ? limit ? , 6`,
};

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
  test,
  user,
  admin
};
