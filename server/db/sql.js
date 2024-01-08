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
  // 헤더 검색
  searchHeader: `select * from product where prod_name like concat(concat('%',?),'%') limit ?,6`,
  searchHeaderPage: `select * from product where prod_name like concat(concat('%',?),'%')`,

  //신상품
  newListPage: `select * from product where registration >= DATE_SUB(CURDATE(), INTERVAL 7 DAY);`,
  newList: `select * from product where registration >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) limit ?,6;`,


  cartList: `select distinct * 
              from cart c, product p, user u
              where c.user_id = u.user_id AND p.prod_no = c.prod_no AND c.user_id = ?
              order by cart_no`,
  //로그인 후 비회원 장바구니가 로그인 장바구니로 이동
  cartAfterLogin: `insert into cart set ?`,
  //로그인 전 비회원 장바구니와 로그인 장바구니를 똑같은거 있으믄 비교해서 수량 업데이트
  cartUpdate: `update cart set ? where prod_no = ?;`,
  //장바구니 단건
  cartSelect: `select * from cart where prod_no = ? and user_id =?`,


  // 장바구니 체크 리스트
  cartCheckList: `select distinct *
              from cart c, product p, user u
              WHERE cart_checkbox = 1 AND c.user_id = u.user_id AND p.prod_no = c.prod_no AND c.user_id = ?
              order by cart_no`,
  CheckboxUpdate: `UPDATE cart set cart_checkbox = ? WHERE cart_no = ?`,
  CheckAllUpdate: `UPDATE cart set cart_checkbox = ? WHERE user_id = ?`,
  Cartquantity: `UPDATE cart set quantity = ? WHERE cart_no = ?`,
  // 장바구니 상품 수량 증가
  CartPlusquantity: `UPDATE cart
                 SET quantity = quantity + 1
                 WHERE prod_no = ?  
                 AND user_id = ?`,
  // 장바구니 상품 수량 감소
  CartMinusquantity: `UPDATE cart
                 SET quantity = quantity - 1
                 WHERE prod_no = ?  
                 AND user_id = ?`,
  // 장바구니 체크된거 삭제 구현
  CheckboxDelete: `DELETE FROM cart WHERE cart_no = ?`,
  couponList: `select a.coupon_no, start_coupon, end_coupon, coupon_name, coupon_content, coupon_discount_rate, coupon_able
                from coupon a left join user b on(a.user_id = b.user_id) 
                left join couponinfo c on(a.couponinfo_no = c.couponinfo_no)
                where a.user_id = ? and a.coupon_able = 0`,
  pointList: `select *
               from user
               where user_id = ?`,
  orderList: `  select distinct * 
                from orders a, order_detail b , product c 
                where a.order_no = b.order_no AND b.prod_no = c.prod_no AND b.order_no = ?`,
  orderInsert: `insert into orders set?`,
  orderdetailInsert: `insert into order_detail set?`,
  // 주문서에서 쿠폰사용해서 결제완료했을경우 쿠폰업데이트
  couponUpdate: `update coupon set ? where coupon_no = ?`,
  // 결제완료한경우 상품의 재고 업데이트
  StockUpdate: `update product set ? where prod_no =  ?`,
  // 포인트를 사용한 경우에만 포인트 테이블 적용
  pointInsert: `insert into point set ?`,
  // 포인트를 사용했을때 유저테이블에 포인트를 업데이트
  pointUpdate: `update user set ? where user_id = ?`


};

let user = {
  //아이디 중복 체크할 때
  duplicateId: `select user_id from user where user_id=?`,

  //회원가입
  joinIn: `INSERT INTO user SET ?`,

  // 이메일 중복체크용
  duplicateEmail: `select user_email from user where user_email = ?`,

  //로그인(일단)
  forLogin: `select * from user where user_id = ? and user_password = ?`,

  //회원수정 - id > 마이페이지> 회원가입때 입력한 값 그대로 출력 > 수정
  //id 별 조회
  selectId: `select * from user where user_id = ?`,

  updateUser: `update user set ? where user_id=?`,

  //ID찾기
  findId: `select `,


  //회원탈퇴 - 탈퇴하기누르면 아이디 남기고 null 되고 withdrawal table에 insert되는거임! how...?
  updateOutUser: `UPDATE user
  SET
    user_name = null,
    user_password = null,
    user_email = null,
    user_tel = null,
    birth = null,
    address = null,
    detail_address = null,
    postcode = null,
    point = null,
    user_grade = 'i5'
  WHERE user_id = ?`,

  insertWithdrawal: `INSERT INTO withdrawal_user set ? `

}

let admin = {
  //기타-통계
  weekIncome: `select sum(total_payment) from orders where order_date BETWEEN DATE_ADD(NOW(), INTERVAL -1 week ) AND NOW()`,
  monthsIncome: `select month(order_date) as month,sum(total_payment) as sum from orders group by month order by month;`,
  //회원관리
  AlluserList: `select user_id,user_name,user_email,user_tel,join_date,user_grade from user where not user_grade in('i4','i5')`,
  userList: `select user_id,user_name,user_email,user_tel,join_date,user_grade from user where not user_grade in('i4','i5') order by ?? desc limit ?,?`,
  stopUser: `update user set user_grade = ? where user_id = ?`,
  searchUser: `select user_id,user_name,user_email,user_tel,join_date,user_grade from user
  where user_id like concat(concat('%',?),'%') or user_name like concat(concat('%',?),'%') order by ?? limit ?,?`,
  filterUser: `select user_id,user_name,user_email,user_tel,join_date,user_grade from user where join_date like concat(concat('%',?),'%') order by ?? limit ?,?`,
  //상품관리
  AllprodList: `select prod_no,prod_name,price,discount_price,discount_rate,stock,main_category from product`,
  prodList: `select prod_no,prod_name,price,discount_price,discount_rate,stock,main_category,registration from product order by ?? limit ?,?`,
  pricehigh: `select prod_no,prod_name,price,discount_price,discount_rate,stock,main_category from product order by discount_price desc limit ?,?`,
  prodInsert: `insert into product set ?`,
  prodDelete: `update product set soldout=1 where prod_no=?`,
  prodInfo: `select prod_no,prod_name,price,discount_price,discount_rate,stock,cooking_time,allergy,main_category,sub_category,refrigeration from product where prod_no = ?`,
  productMod: `update product set ? where prod_no = ?`,
  searchProd: `select prod_no,prod_name,price,discount_price,discount_rate,stock,main_category from product where prod_name like concat(concat('%',?),'%') or main_category = ? order by ?? limit ?,?`,
  //주문관리
  AllOrderList: `select * from orders order by order_date desc`,
  orderList: `select * from orders order by order_date desc limit ?,?`,
  orderDate: `select * from orders where order_date between ? and ? order by order_date desc limit ?,?`,
  updateOrder: `update orders set order_status = ? where order_no= ?`,
  orderStatus: `select * from orders where order_status = ? order by order_date desc limit ?,?`,
  oneOrder: `select * from orders where order_no = ?`,
  insertDelivery: `insert into delivery set order_no=(select order_no from orders where order_no=?),tracking_no = ?,
  user_id=(select user_id from orders where order_no=?),delivery_request=(select delivery_request from orders where order_no=?),released_date=current_date(),delivery_status='d4'`,
  //배송관리
  AllreviewReportList: `select *,(select report_cnt from review where review_no=review_report.review_no) as cnt from review_report order by report_date desc`,
  reviewReportList: `select *,(select report_cnt from review where review_no=review_report.review_no) as cnt from review_report order by report_date desc limit ?,?`,
  reasonReportList: `select *,(select report_cnt from review where review_no=review_report.review_no) as cnt from review_report 
  where report_status=? order by report_date desc  limit ?,?`,
  AllinquireList: `select * from inquire order by create_date desc`,
  inquireList: `select * from inquire order by create_date desc limit ?,?`,
  StateinquireList: ` select * from inquire where (inquire_category= ? or answer_state=?) or (inquire_category= ? and answer_state=?) order by create_date desc limit ?,?`,
  reviewList: `select prod_name,order_detail_no,user_id,review_title,review_content,review_writedate,review_grade,like_cnt from order_detail o,product p,review r 
  where o.prod_no=p.prod_no and o.order_detail_no=r.detail_order_no order by ?? desc`,
  refundOrder: `update orders set order_status = 'c4' where order_no = ?`,
  adminRefund: `insert into refund_cancel set order_no=?,user_id=(select user_id from orders where order_no=refund_cancel.order_no),
  return_point=(select point_use from orders where order_no=refund_cancel.order_no),cancel_status='o2',cancel_request=current_date()`,
  AllrefundOrderList: `select * from refund_cancel order by cancel_request desc`,
  refundOrderList: `select * from refund_cancel order by cancel_request desc limit ?,?`,
  updateRefund: `update refund_cancel set cancel_status = ? where order_no= ?`,
  refundState: `select * from refund_cancel where cancel_status = ? order by cancel_request desc limit ?,?`,
  Alldelivery: `select * from delivery`,
  deliveryList: `select * from delivery limit ?,?`,
  DatedeliveryList: `select * from delivery where released_date between ? and ? limit ?,?`,
  StatedeliveryList: `select * from delivery where delivery_status = ? limit ?,?`,
  AllnoticeList: `select * from notice order by notice_no`,
  noticeList: `select * from notice order by ? limit ?,?`,
  StateNoticeList: `select * from notice where importance in(?,?) order by ?? desc limit ?,?`,
  FNQList: `select * from fnq where ?? = ?`,
  insertFNQ: `insert into fnq set ?`,
  updateFNQ: `update fnq set ? where qno = ?`,
  delFNQ: `delete from fnq where qno = ?`,
}


//예빈

let reviews = {
  myReview: `select * from review where user_id=? `, //마이페이지에서 내가 작성한 리뷰 리스트
  reviewInfo: `select * from review where user_id=? and review_no=?`, //마이페이지 리뷰하나 보기
  orderNoReview: `select * from review where user_id=?`,
  detailList: `SELECT 
  t1.review_no, 
  t2.prod_no, 
  t1.review_title, 
  t1.review_content, 
  t1.review_grade, 
  t1.user_id AS 'writer', 
  t1.review_writedate, 
  COALESCE(like_data.like_cnt, 0) AS like_cnt, 
  t1.report_cnt,
  CASE 
      WHEN t4.user_id IS NOT NULL THEN TRUE 
      ELSE FALSE 
  END AS 'likestate'
FROM review t1 
JOIN order_detail t2 ON t1.detail_order_no = t2.order_detail_no
JOIN product t3 ON t3.prod_no = t2.prod_no
LEFT JOIN (
  SELECT review_no, COUNT(*) AS like_cnt
  FROM review_like 
  GROUP BY review_no
) AS like_data ON like_data.review_no = t1.review_no 
LEFT JOIN review_like t4 ON t4.review_no = t1.review_no AND t4.user_id = ?
WHERE t3.prod_no = ?`, //상세페이지에서 그 상품에대한 리뷰 리스트
  insertReview: `insert into review set?`, //주문상세내역->리뷰등록
  updateReview: `update review set ? where user_id= ? and review_no= ?`,
  insertReviewImage: `insert into image set?`,
  deleteReview:`delete from review where review_no=?`,
  selectReviewLike:`select * from review_like where user_id=? and review_no=?`,
  insertReviewLike:`insert into review_like set ?`,
  deleteReviewLike:`delete from review_like where review_no=? and user_id=?`

};

let point = {
  myPoint: `select point from user where user_id=?`, //마이페이지 보유 포인트
  myPointSaveHistory: `select * from point where user_id= ? and point_save > 0 order by end_point_date `,
  myPointUseHistory: `select * from point where user_id=? and point_use > 0 order by end_point_date `,
  reviewPoint: `insert into point set point_no = ?, order_no=?, user_id=?, point_history='리뷰등록',
              point_save = 500, point_use=0, point_date =current_date(), end_point_date = date_add(current_date(), interval 1 Year);`, //리뷰등록시 포인트 지급
  pointExpire: `update user as t1,(select sum( point_save) as points, user_id from point where end_point_date = current_date() group by user_id) as t2
              set t1.point = t1.point- t2.points where t1.user_id=t2.user_id;`, //기간소멸
  //그리고 point table에 소멸사유로 인서트 해주는것도 같이..?
  showNextMonth: `select IFNULL(sum(point_save),0) as sump from point where user_id =? and (year(end_point_date)=year(now()) and Month(end_point_date)=Month(DATE_ADD(curdate(),INTERVAL 1 month))); `

};
let coupon = {
  myCoupon: `select c1.coupon_no, c1.user_id, c1.start_coupon, c1.end_coupon, c1.coupon_able, c2.coupon_name, c2.coupon_content, c2.coupon_discount_rate ,c1.coupon_able 
            from coupon c1 left join couponinfo c2 
            on (c1.couponinfo_no = c2.couponinfo_no)
            where c1.user_id=?;` //마이페이지 보유 쿠폰
};
let orders = {
  savingCart: `insert into cart set ?`,
  updateCart: `update cart set quantity=quantity+? where prod_no =? and user_id=?;`,
  comparisonCart: `select * from cart where user_id=?`,
  detailInfo: `select * from product where prod_no=?`,
  orderList: `select  ord.order_date, dord.order_detail_no, ord.delivery_charge, ord.total_payment, ord.real_payment, ord.payment_no, ord.order_no, pro.prod_name
              from orders ord  join order_detail dord on ord.order_no = ord.order_no
                               join product pro on pro.prod_no = dord.prod_no
                               where ord.user_id=?
                               group by ord.order_no
                               order by ord.order_no`,
  orderCancle: `update orders set order_status=m3 where order_no=? and user_id=?`, //주문전체취소

  detailOrderLists: `select * from order_detail od join product pr on od.prod_no = pr.prod_no	
                                                  join orders ods on ods.order_no = od.order_no
                     where od.order_no=?
                     and ods.user_id=?` //주문창에서 상세주문내역으로 이동시 불러올 값
}
let delivery = {
  addDelivery: `insert into add_delivery set?`,
  //deliveryList: `select * from add_delivery where user_id=?`,
  deliveryInfo: `select * from add_delivery where user_id=? and delivery_no=?`,
  updateDelivery: `update add_delivery set? where delivery_no=? and user_id=?`,
  deleteDelivery: `delete from add_delivery where delivery_no=?`,
  deliveryList: `select *, (select address from user where user_id=?) as joinaddress, (select detail_address from user where user_id=?) as joinDetail, (select postcode from user where user_id=?) as joinPost from add_delivery where user_id=?`
}
//찜테이블
let like = {
  likeInfo: `select* from likes where user_id=? and prod_no=?`,
  likeInsert: `insert into likes set?`,
  likeDel: `delete from likes where user_id=? and prod_no =?`,
  likeList:`select * from likes where user_id=?`
}
let inquire={
  inquireList:`select * from inquire where user_id=?`,
  inquireInfo:`select * from inquire where inquire_no=?`,
  inquireInsert:`insert into inquire set?`,
  inquireUpdate:`Update inquire set? where user_id=? and inquire_no=?`,
  inquireAnswer:`select * from reply where inquire_no=?`
}
let member = {
  memberInfo: `select t1.*, count(case when coupon_able=0 then 1 end) as couponCnt from user t1 join coupon t2  on t1.user_id = t2.user_id where t1.user_id= ?`
}

module.exports = {
  user,
  test,
  reviews,
  point,
  coupon,
  orders,
  delivery,
  like,
  member,
  admin,
  inquire
};