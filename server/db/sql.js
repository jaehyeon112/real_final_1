let test = {
  list: `select * from employee`
};

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
  weekIncome : `select sum(total_payment) from orders where order_date BETWEEN DATE_ADD(NOW(), INTERVAL -1 week ) AND NOW()`
}

module.exports = {
  test,
  admin
};
