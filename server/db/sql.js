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
<<<<<<< HEAD
  searchProd : `select prod_no,prod_name,price,discount_price,discount_rate,stock,main_category from product where prod_name like concat(concat('%',?),'%') order by ?? limit ?,?`,
  orderList : `select * from orders order by order_date desc`,
  reviewReportList : `select * from review_report order by report_date desc`,
  inquireList : `select * from inquire order by create_date desc`,
  orderDate : `select * from orders where order_date between ? and ?`
=======
  searchProd: `select prod_no,prod_name,price,discount_price,discount_rate,stock,main_category from product where prod_name like concat(concat('%',?),'%') order by ?? limit ?,?`
>>>>>>> develop
}

module.exports = {
  test,
  user,
  admin
};