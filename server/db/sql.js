let test = {
  list: `select * from  product`,
  list2 : `select * from product limit ? , 6`
};

let user = {
  //아이디 중복 체크할 때
  duplicateId : `select user_id from user where user_id=?`,
  
  //회원가입
  join : `INSERT INTO user SET ?`, 

  // 이메일 중복체크용
  duplicateEmail : `select user_email from user where user_email = ?`,

  //로그인(일단)
  forLogin : `select user_id, user_password from user;`
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
  test,
  user,
  admin
};
