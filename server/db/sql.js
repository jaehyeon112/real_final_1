let test = {
  list: `select * from  product`,
  list2 : `select * from product limit ? , 6`,
  cartList : `select distinct * 
              from cart c, product p, user u
              WHERE cart_checkbox = 1 AND c.user_id = u.user_id AND p.prod_no = c.prod_no AND c.user_id = ?
              order by cart_no`,
  CheckboxUpdate : `UPDATE cart SET ? WHERE cart_no = ?`,
  couponList : `select a.coupon_no, start_coupon, end_coupon, coupon_name, coupon_content, coupon_discount_rate
                from coupon a left join user b on(a.user_id = b.user_id) 
                left join couponinfo c on(a.couponinfo_no = c.couponinfo_no)
                where a.user_id = ?`,
  pointList : `select *
               from user
               where user_id = ?`,
  orderList : `select distinct * 
               from orders o, product p, user u
               where o.user_id = u.user_id AND prod_no = '1' AND o.user_id = ?
               order by order_no`,
  orderInsert : `insert into orders set?`,
  orderdetailInsert : `insert into order_detail set?`,
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
  weekIncome : `select sum(total_payment) from orders where order_date BETWEEN DATE_ADD(NOW(), INTERVAL -1 week ) AND NOW()`,
  monthsIncome : `select month(order_date) as month,sum(total_payment) as sum from orders group by month order by month;`
}

module.exports = {
  test,
  admin
};
