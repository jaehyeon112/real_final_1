let test = {
  list: `select * from employee`,
  cartList : `select distinct * 
              from cart c, product p, user u
              where c.user_id = u.user_id AND p.prod_no = c.prod_no AND c.user_id = ?
              order by cart_no`,
  CheckboxUpdate : `UPDATE cart SET ? WHERE cart_no = ?`,
  couponList : `select count(coupon_no) as count, start_coupon, end_coupon, coupon_name, coupon_content, coupon_discount_rate
                from coupon a, user b, couponinfo c
                where a.user_id = b.user_id AND a.user_id = ?
                order by count`,
  pointList : `select *
               from user
               where user_id = ?`,
  orderList : `select distinct * 
               from orders o, product p, user u
               where o.user_id = u.user_id AND prod_no = '1' AND o.user_id = ?
               order by order_no`,
};

module.exports = {
  test,
};
