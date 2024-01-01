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

  //신상품
  newListPage: `select * from product where registration >= current_date() - 3;`,
  newList: `select * from product where registration >= current_date() - 3 limit ?,6;`,
  cartList: `select distinct * 
              from cart c, product p, user u
              WHERE cart_checkbox = 1 AND c.user_id = u.user_id AND p.prod_no = c.prod_no AND c.user_id = ?
              order by cart_no`,
  CheckboxUpdate: `UPDATE cart SET ? WHERE cart_no = ?`,
  couponList: `select a.coupon_no, start_coupon, end_coupon, coupon_name, coupon_content, coupon_discount_rate
                from coupon a left join user b on(a.user_id = b.user_id) 
                left join couponinfo c on(a.couponinfo_no = c.couponinfo_no)
                where a.user_id = ?`,
  pointList: `select *
               from user
               where user_id = ?`,
  orderList: `select distinct * 
               from orders o, product p, user u
               where o.user_id = u.user_id AND prod_no = '1' AND o.user_id = ?
               order by order_no`,
  orderInsert: `insert into orders set?`,
  orderdetailInsert: `insert into order_detail set?`,
  categoryList: `select * from where ?? = ?`,
  wordFilterPage: `select * from product where  prod_name >= ? and prod_name < ?`,
  wordFilter: `select * from product where  prod_name >= ? and prod_name < ? limit ? , 6`,
  priceFilterPage: `select * from product where discount_price between ? and ?`,
  priceFilter: `select * from product where discount_price between ? and ? limit ? , 6`,
  bothFilterPage: `select * from product where prod_name >= ? and prod_name < ? and discount_price between ? and ?`,
  bothFilter: `select * from product where prod_name >= ? and prod_name < ? and discount_price between ? and ? limit ? , 6`,
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
  searchProd: `select prod_no,prod_name,price,discount_price,discount_rate,stock,main_category from product where prod_name like concat(concat('%',?),'%') order by ?? limit ?,?`
}


//예빈

let reviews = {
  myReview:`select * from review where user_id=? `,//마이페이지에서 내가 작성한 리뷰 리스트
  detailList:`select * from review where prod_no=?`, //상세페이지에서 그 상품에대한 리뷰 리스트
  insertReview:`insert into review set?`,//주문상세내역->리뷰등록
  updateReview:`update review set ? where user_id= ? and review_no= ?`,
  insertReviewImage:`insert into image set?`  
};
let point = {
  myPoint:`select point from user where user_id=?`,//마이페이지 보유 포인트
  reviewPoint:`insert into point set point_no = ?, order_no=?, user_id=?, point_history='리뷰등록',
              point_save = 500, point_use=null, point_date =current_date(), end_point_date = date_add(current_date(), interval 1 Year);`, //리뷰등록시 포인트 지급
  pointExpire:`update user as t1,(select sum( point_save) as points, user_id from point where end_point_date = current_date() group by user_id) as t2
              set t1.point = t1.point- t2.points where t1.user_id=t2.user_id;`//기간소멸
              //그리고 point table에 소멸사유로 인서트 해주는것도 같이..?
};
let coupon = {
  myCoupon:`select c1.couponinfo_no, c1.user_id, c1.start_coupon, c1.end_coupon, c1.coupon_able, c2.coupon_name, c2.coupon_content, c2.coupon_discount_rate  
            from coupon c1 left join couponinfo c2 
            on (c1.couponinfo_no = c2.couponinfo_no)
            where c1.user_id=?;`//마이페이지 보유 쿠폰
};
let orders = {
  detailOrderLists:`select * from order_detail o1 left join orders o2 on o1.order_no = o2.order_no where o1.order_no =? and user_id = ?`,//주문창에서 상세주문내역으로 이동시 불러올 값
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
  memberInfo : `select t1.*, count(t2.user_id) as couponCnt from user t1 join coupon t2  on t1.user_id = t2.user_id where t1.user_id=?` //이건 나중에 로그인 세션 이용하게 되면 지우자
}

module.exports = {
  user,
  test,reviews,point,coupon,orders, delivery,like,member,
  admin
};