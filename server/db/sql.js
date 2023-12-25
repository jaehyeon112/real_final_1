let test = {
  list: `select * from employee`,
  order_list : `select order_no,user_id,order_date,real_payment,order_status from user_order 
  where order_status = 'c1' order by order_date limit 5`
};

module.exports = {
  test,
};
