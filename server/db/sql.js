let test = {
  //전체 메뉴 리스트 불러오기
  list: `select * from  product`,
  list2: `select * from product limit ? , 6`,
  // 헤더의 카테고리에서 카테고리 선택된것들 불러오기
  categoryList: `select * from product where ?? = ? limit ? , 6`,
  categoryListPage: `select * from product where ?? = ? `,
  //글자 필터시 검색 후 메뉴 불러오기
  wordFilter: `select * from product where  prod_name >= ? and prod_name < ? limit ? , 6`,
  wordFilterPage: `select * from product where  prod_name >= ? and prod_name < ?`,
  categoryWordFilter: `select * from product where  prod_name >= ? and prod_name < ? and ?? = ? limit ? , 6`,
  categoryWordFilterPage: `select * from product where  prod_name >= ? and prod_name < ? and ?? = ?`,

  //가격 필터시 검색 후 메뉴 불러오기
  priceFilter: `select * from product where discount_price between ? and ? limit ? , 6`,
  priceFilterPage: `select * from product where discount_price between ? and ?`,
  categoryPriceFilter: `select * from product where discount_price between ? and ? and ?? = ? limit ? , 6`,
  categoryPriceFilterPage: `select * from product where discount_price between ? and ? and ?? = ?`,
  //둘다 필터 해서 불러오기.
  bothFilter: `select * from product where prod_name >= ? and prod_name < ? and discount_price between ? and ? limit ? , 6`,
  bothFilterPage: `select * from product where prod_name >= ? and prod_name < ? and discount_price between ? and ?`,
  categoryBothFilter: `select * from product where prod_name >= ? and prod_name < ? and discount_price between ? and ? and ?? = ? limit ? , 6`,
  categoryBothFilterPage: `select * from product where prod_name >= ? and prod_name < ? and discount_price between ? and ? and ?? = ?`,
  // 헤더 검색
  searchHeader: `select * from product where prod_name like concat(concat('%',?),'%') limit ?,6`,
  searchHeaderPage: `select * from product where prod_name like concat(concat('%',?),'%')`,

  //신상품
  newListPage: `select * from product where registration >= DATE_SUB(CURDATE(), INTERVAL 7 DAY);`,
  newList: `select * from product where registration >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) limit ?,6;`,


  cartList: `select distinct * 
              from cart c, product p, user u
              where c.user_id = u.user_id AND p.prod_no = c.prod_no AND c.user_id = ?
              order by cart_no`,
  //로그인 후 비회원 장바구니가 로그인 장바구니로 이동
  cartAfterLogin: `insert into cart set ?`,
  //로그인 전 비회원 장바구니와 로그인 장바구니를 똑같은거 있으믄 비교해서 수량 업데이트
  cartUpdate: `update cart set ? where prod_no = ?;`,


  // 장바구니 체크 리스트 
  cartCheckList: `select distinct *
              from cart c, product p, user u
              WHERE cart_checkbox = 1 AND c.user_id = u.user_id AND p.prod_no = c.prod_no AND c.user_id = ?
              order by cart_no`,
  CheckboxUpdate: `UPDATE cart set cart_checkbox = ? WHERE cart_no = ?`,
  // 장바구니 체크된거 삭제 구현
  CheckboxDelete: `DELETE FROM cart WHERE cart_no = ?`,
  couponList: `select a.coupon_no, start_coupon, end_coupon, coupon_name, coupon_content, coupon_discount_rate, coupon_able
                from coupon a left join user b on(a.user_id = b.user_id) 
                left join couponinfo c on(a.couponinfo_no = c.couponinfo_no)
                where a.user_id = ? and a.coupon_able = 0`,
  pointList: `select *
               from user
               where user_id = ?`,
  orderList: `select distinct * 
               from orders o, product p, user u
               where o.user_id = u.user_id AND prod_no = '1' AND o.user_id = ?
               order by order_no`,
  orderInsert: `insert into orders set?`,
  orderdetailInsert: `insert into order_detail set?`,

};

let user = {
  //아이디 중복 체크할 때
  duplicateId: `select user_id from user where user_id=?`,

  //회원가입
  join: `INSERT INTO user SET ?`,

  // 이메일 중복체크용
  duplicateEmail: `select user_email from user where user_email = ?`,

  //로그인(일단)
  forLogin: `select * from user where user_id = ? and user_password = ?;`

}

let admin = {
  AlluserList: `select user_id,user_name,user_email,user_tel,join_date,user_grade from user order by ??`,
  userList: `select user_id,user_name,user_email,user_tel,join_date,user_grade from user order by ?? limit ?,?`,
  proList: `select prod_no,prod_name,price,discount_price,discount_rate,stock,main_category from product`,
  AllprodList: `select prod_no,prod_name,price,discount_price,discount_rate,stock,main_category from product order by ??`,
  pricehigh: `select prod_no,prod_name,price,discount_price,discount_rate,stock,main_category from product order by discount_price desc limit ?,?`,
  prodList: `select prod_no,prod_name,price,discount_price,discount_rate,stock,main_category,registration from product order by ?? limit ?,?`,
  prodInsert: `insert into product set ?`,
  prodDelete: `update product set soldout=1 where prod_no=?`,
  prodInfo: `select prod_no,prod_name,price,discount_price,discount_rate,stock,cooking_time,allergy,
  main_category,sub_category,refrigeration 
  from product where prod_no = ?`,
  productMod: `update product set ? where prod_no = ?`,
  weekIncome: `select sum(total_payment) from orders where order_date BETWEEN DATE_ADD(NOW(), INTERVAL -1 week ) AND NOW()`,
  monthsIncome: `select month(order_date) as month,sum(total_payment) as sum from orders group by month order by month;`,
  stopUser: `update user set user_grade = ? where user_id = ?`,
  searchUser: `select user_id,user_name,user_email,user_tel,join_date,user_grade from user
  where user_id like concat(concat('%',?),'%') or user_name like concat(concat('%',?),'%') or join_date like concat(concat('%',?),'%') order by ?? limit ?,?`,
  searchProd: `select prod_no,prod_name,price,discount_price,discount_rate,stock,main_category from product where prod_name like concat(concat('%',?),'%') order by ?? limit ?,?`,
  AllOrderList: `select * from orders order by order_date desc`,
  orderList: `select * from orders order by order_date desc limit ?,?`,
  AllreviewReportList: `select *,(select report_cnt from review where review_no=review_report.review_no) as cnt from review_report order by report_date desc`,
  reviewReportList: `select *,(select report_cnt from review where review_no=review_report.review_no) as cnt from review_report order by report_date desc limit ?,?`,
  reasonReportList: `select *,(select report_cnt from review where review_no=review_report.review_no) as cnt from review_report 
  where report_status=? order by report_date desc  limit ?,?`,
  inquireList: `select * from inquire order by create_date desc`,
  orderDate: `select * from orders where order_date between ? and ? order by order_date desc limit ?,?`,
  updateOrder: `update orders set order_status = ? where order_no= ?`,
  orderStatus: `select * from orders where order_status = ? order by order_date desc limit ?,?`,
  reviewList: `select prod_name,order_detail_no,user_id,review_title,review_content,review_writedate,review_grade,like_cnt from order_detail o,product p,review r 
  where o.prod_no=p.prod_no and o.order_detail_no=r.detail_order_no order by ?? desc`,
  refundOrder: `update orders set order_status = 'c4' where order_no = ?`,
  adminRefund: `insert into refund_cancel set order_no=?,user_id=(select user_id from orders where order_no=refund_cancel.order_no),
  return_point=(select point_use from orders where order_no=refund_cancel.order_no),cancel_status='o2',cancel_request=current_date()`,
  AllrefundOrderList: `select * from refund_cancel order by cancel_request desc`,
  refundOrderList: `select * from refund_cancel order by cancel_request desc limit ?,?`,
  updateRefund: `update refund_cancel set cancel_status = ? where order_no= ?`
}

module.exports = {
  test,
  user,
  admin
};