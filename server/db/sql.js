let test = {
  list: `select * from employee`,
};
let reviews = {
  myList:`select * from review where user_id=? `,//마이페이지에서 내가 작성한 리뷰 리스트
  detailList:`select * from review where prod_no=?`, //상세페이지에서 그 상품에대한 리뷰 리스트
  insertRivew:`insert into review set?`,//이미지를 넣으려면..?
  insertImage:`insert into image set?`  
};
let point = {
  myPoint:`select * from point where user_id=?`//마이페이지 보유 포인트
};
let coupon = {
  myCoupon:`select * from coupon where user_id=?`//마이페이지 보유 쿠폰
};
let orders = {
  orderList:`select * from order where user_id=?`,
  orderCancle:`update order set order_status=1 where order_no=? and user_id=?`//주문 전체취소
}

module.exports = {
  test,reviews,point,coupon,orders
};
