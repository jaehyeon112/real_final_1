let test = {
  list: `select * from employee`,
  cartList : `select distinct * 
              from cart c, product p, user u
              where c.user_id = u.user_id AND p.prod_no = c.prod_no AND c.user_id = ?
              order by cart_no`,
  CheckboxUpdate : `UPDATE cart SET WHERE cart_no = ?`,
  orderList : `select distinct * 
               from orders o, product p, user u
               where o.user_id = u.user_id AND prod_no = '1' AND o.user_id = ?
               order by order_no`,
};

module.exports = {
  test,
};
