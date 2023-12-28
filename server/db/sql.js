let test = {
  list: `select * from  product`,
  list2 : `select * from product limit ? , 6`
};

let admin = {
  AlluserList : `select user_id,user_name,user_email,user_tel,join_date,user_grade from user order by ?`,
  userList : `select user_id,user_name,user_email,user_tel,join_date,user_grade from user order by ? limit ?,?`,
  AllprodList : `select prod_no,prod_name,price,discount_price,discount_rate,stock,main_category from product order by prod_no`,
  prodList : `select prod_no,prod_name,price,discount_price,discount_rate,stock,main_category from product order by prod_no limit ?,?`,
  prodInsert : `insert into product set ?`,
  prodDelete : `update product set soldout=1 where prod_no=?`,
  prodInfo : `select prod_no,prod_name,price,discount_price,stock,cooking_time,allergy,
  main_category,sub_category,refrigeration 
  from product where prod_no = ?`,
  productMod : `update product set ? where prod_no = ?`,
  weekIncome : `select sum(total_payment) from orders where order_date BETWEEN DATE_ADD(NOW(), INTERVAL -1 week ) AND NOW()`,
  monthsIncome : `select month(order_date) as month,sum(total_payment) as sum from orders group by month order by month;`,
  stopUser : `update user set user_grade = ? where user_id = ?`,
  searchUser : `select user_id,user_name,user_email,user_tel,join_date,user_grade from user
  where user_id like concat(concat('%',?),'%') or user_name like concat(concat('%',?),'%') or join_date like concat(concat('%',?),'%') order by ? limit ?,?`,
  searchProd : `select prod_no,prod_name,price,discount_price,discount_rate,stock,main_category from product where prod_name like concat(concat('%',?),'%') order by prod_no limit ?,?`
}

module.exports = {
  test,
  admin
};
