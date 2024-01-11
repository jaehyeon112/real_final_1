let test = {
  //전체 메뉴 리스트 불러오기
  list: `select file_name, p.*, format(avg(review_grade),1) AS 'star' from product p left join order_detail d on p.prod_no = d.prod_no
  left join review r  on r.detail_order_no = d.order_detail_no left join (select file_name,prod_no from file where orders='s0') f on(p.prod_no = f.prod_no) group by p.prod_no`,
  list2: `select file_name, p.*, format(avg(review_grade),1) AS 'star' from product p left join order_detail d on p.prod_no = d.prod_no
  left join review r  on r.detail_order_no = d.order_detail_no left join (select file_name,prod_no from file where orders='s0') f on(p.prod_no = f.prod_no) group by p.prod_no limit ? , 6`,
  // 헤더의 카테고리에서 카테고리 선택된것들 불러오기
  categoryList: `select  file_name, p.*, format(avg(review_grade),1) AS 'star' from product p left join order_detail d on p.prod_no = d.prod_no
  left join review r  on r.detail_order_no = d.order_detail_no  left join (select file_name,prod_no from file where orders='s0') f on(p.prod_no = f.prod_no)  where ?? = ? group by p.prod_no limit ? , 6`,
  categoryListPage: `select file_name, p.*, format(avg(review_grade),1) AS 'star' from product p left join order_detail d on p.prod_no = d.prod_no
  left join review r  on r.detail_order_no = d.order_detail_no  left join (select file_name,prod_no from file where orders='s0') f on(p.prod_no = f.prod_no)   where ?? = ? group by p.prod_no `,
  //글자 필터시 검색 후 메뉴 불러오기
  //일단 
  wordFilter: `select file_name, p.*, format(avg(review_grade),1) AS 'star' from product p left join order_detail d on p.prod_no = d.prod_no
  left join review r  on r.detail_order_no = d.order_detail_no  left join (select file_name,prod_no from file where orders='s0') f on(p.prod_no = f.prod_no)   where  prod_name >= ? and prod_name < ? group by p.prod_no limit ? , 6`,
  wordFilterPage: `select file_name,  p.*, format(avg(review_grade),1) AS 'star' from product p left join order_detail d on p.prod_no = d.prod_no
  left join review r  on r.detail_order_no = d.order_detail_no  left join (select file_name,prod_no from file where orders='s0') f on(p.prod_no = f.prod_no)   where  prod_name >= ? and prod_name < ? group by p.prod_no `,
  categoryWordFilter: `select  file_name, p.*, format(avg(review_grade),1) AS 'star' from product p left join order_detail d on p.prod_no = d.prod_no
  left join review r  on r.detail_order_no = d.order_detail_no   left join (select file_name,prod_no from file where orders='s0') f on(p.prod_no = f.prod_no)  where  prod_name >= ? and prod_name < ? and ?? = ? group by p.prod_no limit ? , 6`,
  categoryWordFilterPage: `select file_name, p.*, format(avg(review_grade),1) AS 'star' from product p left join order_detail d on p.prod_no = d.prod_no
  left join review r  on r.detail_order_no = d.order_detail_no  left join (select file_name,prod_no from file where orders='s0') f on(p.prod_no = f.prod_no)  where  prod_name >= ? and prod_name < ? and ?? = ? group by p.prod_no `,

  //가격 필터시 검색 후 메뉴 불러오기
  priceFilter: `select file_name, p.*, format(avg(review_grade),1) AS 'star' from product p left join order_detail d on p.prod_no = d.prod_no
  left join review r  on r.detail_order_no = d.order_detail_no left join (select file_name,prod_no from file where orders='s0') f on(p.prod_no = f.prod_no) where discount_price between ? and ? group by p.prod_no limit ? , 6`,
  priceFilterPage: `select file_name, p.*, format(avg(review_grade),1) AS 'star' from product p left join order_detail d on p.prod_no = d.prod_no
  left join review r  on r.detail_order_no = d.order_detail_no left join (select file_name,prod_no from file where orders='s0') f on(p.prod_no = f.prod_no) where discount_price between ? and ? group by p.prod_no `,
  categoryPriceFilter: `select file_name, p.*, format(avg(review_grade),1) AS 'star' from product p left join order_detail d on p.prod_no = d.prod_no
  left join review r  on r.detail_order_no = d.order_detail_no left join (select file_name,prod_no from file where orders='s0') f on(p.prod_no = f.prod_no) where discount_price between ? and ? and ?? = ? group by p.prod_no limit ? , 6`,
  categoryPriceFilterPage: `select file_name,  p.*, format(avg(review_grade),1) AS 'star' from product p left join order_detail d on p.prod_no = d.prod_no
  left join review r  on r.detail_order_no = d.order_detail_no left join (select file_name,prod_no from file where orders='s0') f on(p.prod_no = f.prod_no) where discount_price between ? and ? and ?? = ? group by p.prod_no`,
  //둘다 필터 해서 불러오기.
  bothFilter: `select file_name, p.*, format(avg(review_grade),1) AS 'star' from product p left join order_detail d on p.prod_no = d.prod_no
  left join review r  on r.detail_order_no = d.order_detail_no left join (select file_name,prod_no from file where orders='s0') f on(p.prod_no = f.prod_no) where prod_name >= ? and prod_name < ? and discount_price between ? and ? group by p.prod_no limit ? , 6`,
  bothFilterPage: `select file_name, p.*, format(avg(review_grade),1) AS 'star' from product p left join order_detail d on p.prod_no = d.prod_no
  left join review r  on r.detail_order_no = d.order_detail_no left join (select file_name,prod_no from file where orders='s0') f on(p.prod_no = f.prod_no) where prod_name >= ? and prod_name < ? and discount_price between ? and ? group by p.prod_no`,
  categoryBothFilter: `select file_name, p.*, format(avg(review_grade),1) AS 'star' from product p left join order_detail d on p.prod_no = d.prod_no
  left join review r  on r.detail_order_no = d.order_detail_no left join (select file_name,prod_no from file where orders='s0') f on(p.prod_no = f.prod_no) where prod_name >= ? and prod_name < ? and discount_price between ? and ? and ?? = ? group by p.prod_no limit ? , 6`,
  categoryBothFilterPage: `select file_name, p.*, format(avg(review_grade),1) AS 'star' from product p left join order_detail d on p.prod_no = d.prod_no
  left join review r  on r.detail_order_no = d.order_detail_no left join (select file_name,prod_no from file where orders='s0') f on(p.prod_no = f.prod_no) where prod_name >= ? and prod_name < ? and discount_price between ? and ? and ?? = ? group by p.prod_no `,
  // 헤더 검색
  searchHeader: `select file_name, p.*, format(avg(review_grade),1) AS 'star' from product p left join order_detail d on p.prod_no = d.prod_no
  left join review r  on r.detail_order_no = d.order_detail_no left join (select file_name,prod_no from file where orders='s0') f on(p.prod_no = f.prod_no) where prod_name like concat(concat('%',?),'%') group by p.prod_no limit ?,6`,
  searchHeaderPage: `select file_name, p.*, format(avg(review_grade),1) AS 'star' from product p left join order_detail d on p.prod_no = d.prod_no
  left join review r  on r.detail_order_no = d.order_detail_no left join (select file_name,prod_no from file where orders='s0') f on(p.prod_no = f.prod_no) where prod_name like concat(concat('%',?),'%') group by p.prod_no`,

  //신상품
  newListPage: `select file_name, p.*, format(avg(review_grade),1) AS 'star' from product p left join order_detail d on p.prod_no = d.prod_no
  left join review r  on r.detail_order_no = d.order_detail_no left join (select file_name,prod_no from file where orders='s0') f on(p.prod_no = f.prod_no) where registration >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) group by p.prod_no ;`,
  newList: `select file_name, p.*, format(avg(review_grade),1) AS 'star' from product p left join order_detail d on p.prod_no = d.prod_no
  left join review r  on r.detail_order_no = d.order_detail_no left join (select file_name,prod_no from file where orders='s0') f on(p.prod_no = f.prod_no) where registration >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) group by p.prod_no limit ?,6;`,

  //베스트 상품
  bestListPage: `SELECT  file_name,
  p.*,
  COUNT(*) AS hotItem,
  ROUND(AVG(r.review_grade), 1) AS avg_grade
FROM order_detail o 
LEFT JOIN product p ON o.prod_no = p.prod_no
LEFT JOIN review r ON r.detail_order_no = o.order_detail_no


GROUP BY p.prod_no
HAVING hotItem > 1 and avg_grade > 4
ORDER BY hotItem DESC;`,
  bestList: `
SELECT 
  p.*,
  COUNT(*) AS hotItem,
  ROUND(AVG(r.review_grade), 1) AS avg_grade
FROM order_detail o 
LEFT JOIN product p ON o.prod_no = p.prod_no
LEFT JOIN review r ON r.detail_order_no = o.order_detail_no
GROUP BY p.prod_no
HAVING hotItem > 1 and avg_grade > 4
ORDER BY hotItem DESC
limit ?, 6;
`,

  // 회원가입과 동시에 가입축하쿠폰 지급
  joinCouponInsert: `INSERT INTO coupon set ?`,
  // 추가 배송지 
  adddeliveryList: `select * from add_delivery where user_id =?`,

  mainReview: `select f.file_name as reviewfile ,f2.file_name as prodfile  , p.prod_name, o.prod_no, r.* from review r left join (select * from file where orders='s0') f 
  on (r.review_no = f.review_no) left join order_detail o on r.detail_order_no = o.order_detail_no
  left join (select * from file where orders='s0') f2 on o.prod_no = f2.prod_no
  left join product p on o.prod_no = p.prod_no 
  where review_grade = 5 and f.file_name is not null ORDER BY RAND()  LIMIT 1;`,

  // 장바구니 리스트
  cartList: `select distinct * 
             from cart c, product p, user u, (select file_name, prod_no from file where orders='s0') f
             where c.user_id = u.user_id AND p.prod_no = c.prod_no AND c.user_id = ? AND c.prod_no = f.prod_no`,
  //로그인 후 비회원 장바구니가 로그인 장바구니로 이동
  cartAfterLogin: `insert into cart set ?`,
  //로그인 전 비회원 장바구니와 로그인 장바구니를 똑같은거 있으믄 비교해서 수량 업데이트
  cartUpdate: `update cart set ? where prod_no = ?;`,
  //장바구니 단건
  cartSelect: `select * from cart where prod_no = ? and user_id =?`,


  // 장바구니 체크 리스트
  cartCheckList: `select distinct *
              from cart c, product p, user u, (select file_name, prod_no from file where orders='s0') f
              WHERE cart_checkbox = 1 AND c.user_id = u.user_id AND p.prod_no = c.prod_no AND c.prod_no = f.prod_no AND c.user_id = ?
              order by cart_no`,
  CheckboxUpdate: `UPDATE cart set cart_checkbox = ? WHERE cart_no = ?`,
  CheckAllUpdate: `UPDATE cart set cart_checkbox = ? WHERE user_id = ?`,
  Cartquantity: `update cart set quantity = ? WHERE cart_no = ?`,
  // 장바구니 상품 수량 증가
  CartPlusquantity: `update cart
                    set quantity = quantity + 1
                    where prod_no = ?  
                    and user_id = ?`,
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
  orderList: `select distinct * 
              from orders a, order_detail b , product c , (select file_name, prod_no from file where orders='s0') f
              where a.order_no = b.order_no AND b.prod_no = c.prod_no AND b.prod_no = f.prod_no AND b.order_no = ?`,
  orderInsert: `insert into orders set ?`,
  orderdetailInsert: `insert into order_detail set?`,
  // 주문서에서 쿠폰사용해서 결제완료했을경우 쿠폰업데이트
  couponUpdate: `update coupon set ? where coupon_no = ?`,
  // 결제완료한경우 상품의 재고 업데이트
  StockUpdate: `update product set ? where prod_no =  ?`,
  // 포인트를 사용한 경우에만 포인트 테이블 적용
  pointInsert: `insert into point set ?`,
  // 포인트를 사용했을때 유저테이블에 포인트를 업데이트
  pointUpdate: `update user set ? where user_id = ?`,
  // 주문 취소했을때 주문상태 업데이트
  orderUpdate: `update orders set order_status = 'c4' where order_no = ?`,
  // 취소 된 상품 재고살리기
  StockReturn: `update product set stock = stock + ? where prod_no = ?`,
  // 사용한 쿠폰 리스트 조회
  couponUseList: `select * from coupon c, order_detail o where c.order_no = o.order_no AND c.order_no = ?`,
  // 결제 취소되었을때 환불/취소 테이블에 등록
  refundInsert: `insert into refund_cancel set ?`,
  // 취소 되었을때 쿠폰 다시 돌려주기
  couponReturn: `update coupon set coupon_able = 0 where order_no = ?`,
  // 취소 되었을때 포인트 다시 돌려주기
  pointReturn: `update user set point = point + ? where user_id = ?`,
  // 배송불가지역리스트
  isolatedRegionList: `select * from isolated_region`,
};

let user = {
  //아이디 중복 체크할 때
  duplicateId: `select user_id from user where user_id= ?`,

  //회원가입
  joinIn: `INSERT INTO user SET ?`,
  //회원가입하고 쿠폰지급! 
  joinCoupon: `Insert INTO coupon SET ?`,


  // 이메일 중복체크용
  duplicateEmail: `select user_email from user where user_email = ?`,

  //로그인(일단)
  forLogin: `select * from user where user_id = ? and user_password = ?`,

  //로그인- 카카오아이디 있는지 체크
  checkKakao: `select user_id from user where user_id = ?`,

  //회원수정 - id > 마이페이지> 회원가입때 입력한 값 그대로 출력 > 수정
  // 수정하기전에 비번입력해야함
  //putPass: `select user_password from user where user_id = ?`,
  putPwd: `select * from user where user_id = ? and user_password=?`,

  //id 별 조회
  selectId: `select user_id, user_name, user_password, user_email, user_tel, birth, address, detail_address, postcode 
                from user where user_id = ?`,

  updateUser: `update user set ? where user_id=?`,

  //ID찾기
  findId: `select user_id from user where user_name=? and user_email=? `,

  //비번찾기
  findPass: `select user_password from user where user_name=? and user_email=? and user_id=?`,

  //비밀번호변경 
  changePass: `update user set user_password=? where user_id =?`,

  //회원탈퇴 - 탈퇴하기누르면 아이디 남기고 null 되고 withdrawal table에 insert
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
  weekIncome: `select sum(total_payment) as sum from orders where order_date BETWEEN DATE_ADD(NOW(), INTERVAL -?-1 week ) AND DATE_ADD(NOW(), INTERVAL -? week);`,
  outUserReason: `select withdrawal_reason reason,count(withdrawal_reason) as nums from withdrawal_user 
  where withdrawal_date BETWEEN DATE_ADD(NOW(), INTERVAL -?-1 month ) AND DATE_ADD(NOW(), INTERVAL -? month)
  group by withdrawal_reason`,
  //최근 3개월 주문내역 매출액
  monthsIncome: `select year(order_date) as year,month(order_date) as month,sum(total_payment) as sum from orders where order_date > now() - INTERVAL 3 MONTH group by month order by year, month`,
  withUser: `select count(*) as ours,(select count(*) from withdrawal_user where withdrawal_date = curdate()-?) as yours from user where join_date = curdate()-?;`,
  counting: `select count(*) as orderNo,(select count(*) from orders where order_status = 'c2') as delNo,
  (select count(*) from refund_cancel where cancel_status='o1') as refundNo,
  (select count(*) from review_report where report_status = 'p1') as reportNo,
  (select count(*) from inquire where answer_state = 0) as inquireNo
  from orders where order_status = 'c1';`,
  //회원관리
  AlluserList: `select user_id,user_name,user_email,user_tel,join_date,user_grade from user where not user_grade in('i4','i5')`,
  userList: `select user_id,user_name,user_email,user_tel,join_date,user_grade from user where not user_grade in('i4','i5') order by ?? desc limit ?,10`,
  AllsearchUser: `select user_id,user_name,user_email,user_tel,join_date,user_grade from user
  where not user_grade in('i4','i5') and user_id like concat(concat('%',?),'%') or user_name like concat(concat('%',?),'%')`,
  searchUser: `select user_id,user_name,user_email,user_tel,join_date,user_grade from user
  where not user_grade in('i4','i5') and user_id like concat(concat('%',?),'%') or user_name like concat(concat('%',?),'%') order by ?? limit ?,10`,
  filterUser: `select user_id,user_name,user_email,user_tel,join_date,user_grade from user where not user_grade in('i4','i5') and 
  user_grade = ? order by ?? limit ?,10`,
  AllfilterUser: `select user_id,user_name,user_email,user_tel,join_date,user_grade from user where not user_grade in('i4','i5') and 
  user_grade = ?`,
  stopUser: `update user set user_grade = ? where user_id = ?`,
  outList: `select * from withdrawal_user where user_id != ''`,
  userInfo: `select user_grade from user where user_id = ?`,
  //상품관리
  AllprodList: `select prod_no,prod_name,price,discount_price,discount_rate,stock,main_category,soldout from product`,
  prodList: `select prod_no,prod_name,price,discount_price,discount_rate,stock,main_category,registration,soldout from product order by ?? limit ?,10`,
  pricehigh: `select prod_no,prod_name,price,discount_price,discount_rate,stock,main_category,soldout from product order by discount_price desc limit ?,10`,
  searchProd: `select prod_no,prod_name,price,discount_price,discount_rate,stock,main_category,soldout from product where prod_name like concat(concat('%',?),'%') or main_category = ? order by ?? limit ?,10`,
  AllsearchProd: `select prod_no,prod_name,price,discount_price,discount_rate,stock,main_category,soldout from product where prod_name like concat(concat('%',?),'%') or main_category = ?`,
  productMod: `update product set ? where prod_no = ?`,
  prodInfo: `select prod_no,prod_name,price,discount_price,discount_rate,stock,cooking_time,allergy,main_category,sub_category,refrigeration,soldout from product where prod_no = ?`,
  prodInsert: `insert into product set ?`,
  prodDelete: `update product set soldout=1 where prod_no=?`,
  //주문관리
  AllOrderList: `select * from orders order by order_status`,
  orderList: `select *,(select user_tel from user where user_id = orders.user_id) as phone from orders order by order_date desc limit ?,10`,
  AllorderDate: `select * from orders where order_date between ? and ? order by order_date desc`,
  orderDate: `select * from orders where order_date between ? and ? order by order_date desc limit ?,10`,
  AllorderStatus: `select * from orders where order_status = ? order by order_date desc`,
  orderStatus: `select * from orders where order_status = ? order by order_date desc limit ?,10`,
  updateOrder: `update orders set order_status = ? where order_no= ?`,
  oneOrder: `select * from orders where order_no = ?`,
  insertDelivery: `insert into delivery set order_no=(select order_no from orders where order_no=?),tracking_no = ?,
  user_id=(select user_id from orders where order_no=?),delivery_request=(select delivery_request from orders where order_no=?),released_date=current_date(),delivery_status='d4'`,
  //배송관리
  AlldeliveryList: `select * from delivery`,
  deliveryList: `select * from delivery limit ?,10`,
  AllDatedeliveryList: `select * from delivery where released_date between ? and ?`,
  DatedeliveryList: `select * from delivery where released_date between ? and ? limit ?,10`,
  AllStatedeliveryList: `select * from delivery where delivery_status = ?`,
  StatedeliveryList: `select * from delivery where delivery_status = ? limit ?,10`,
  updateDelivery: `update delivery set delivery_status = 'd5' where order_no = ?`,
  insertPoint: `insert into point set order_no=?,user_id=?,point_history='p3',
  point_save=(select real_payment from orders where order_no = ?)*(?/100),end_point_date = date_add(current_date(), interval 1 Year)`,
  updatePoint: `update user set point = point + ?`,
  selectPoint: `select point_save from point where point_history = 'p3' and order_no = ?`,
  //리뷰-리뷰신고
  AllreviewReportList: `select *,count(review_no) cnt from review_report group by review_no order by report_date desc`,
  reviewReportList: `select *,count(review_no) cnt from review_report group by review_no order by report_date desc limit ?,10`,
  AllreasonReportList: `select *,count(review_no) cnt from review_report where report_status=? group by review_no order by report_date desc`,
  reasonReportList: `select *,count(review_no) cnt from review_report where report_status=? group by review_no order by report_date desc limit ?,10`,
  reviewInfo: `select * from review where review_no = ?`,
  updateReport: `update review_report set report_status = ? where review_no = ?`,
  reviewList2: `select prod_name,order_detail_no,user_id,review_title,review_content,review_writedate,review_grade,like_cnt from order_detail o,product p,review r 
  where o.prod_no=p.prod_no and o.order_detail_no=r.detail_order_no order by ?? desc`,
  //문의사항
  AllinquireList: `select * from inquire order by answer_state,create_date desc`,
  inquireList: `select * from inquire order by answer_state,create_date desc limit ?,10`,
  AllStateinquireList: ` select * from inquire where (inquire_category= ? or answer_state=?) or (inquire_category= ? and answer_state=?) order by create_date desc`,
  StateinquireList: ` select * from inquire where (inquire_category= ? or answer_state=?) or (inquire_category= ? and answer_state=?) order by create_date desc limit ?,10`,
  inquireInfo: `select * from inquire where inquire_no = ?`,
  insertReply: `insert into reply set ?`,
  replyInfo: `select * from reply where inquire_no = ?`,
  updateInquire: `update inquire set answer_state = 1 where inquire_no = ?`,
  //공지사항
  noticeList: `select * from notice order by ? limit ?,?`,
  AllnoticeList: `select * from notice order by notice_no`,
  Onenotice: `select * from notice where notice_no = ?`,
  OnenoticeUpdate: `update notice set ? where notice_no = ?`,
  StateNoticeList: `select * from notice where importance in(?,?) order by ?? desc limit ?,?`,
  insertNotice: `insert into notice set ?`,
  //자주하는질문
  FNQList: `select * from fnq where ?? = ?`,
  insertFNQ: `insert into fnq set ?`,
  updateFNQ: `update fnq set ? where qno = ?`,
  delFNQ: `delete from fnq where qno = ?`,
  //주문취소
  refundOrder: `update orders set order_status = 'c4' where order_no = ?`,
  adminRefund: `insert into refund_cancel set order_no=?,user_id=(select user_id from orders where order_no=refund_cancel.order_no),
  return_point=(select point_use from orders where order_no=refund_cancel.order_no),cancel_status='o2',cancel_request=current_date(),cancel_date=current_date()`,
  AllrefundOrderList: `select * from refund_cancel order by cancel_request desc`,
  refundOrderList: `select * from refund_cancel order by cancel_request desc limit ?,10`,
  refundState: `select * from refund_cancel where cancel_status = ? order by cancel_request desc limit ?,10`,
  AllrefundState: `select * from refund_cancel where cancel_status = ? order by cancel_request desc`,
  updateRefund: `update refund_cancel set cancel_status = ?, cancel_date = ? where order_no= ?`,
  //첨부파일
  insertFile: `insert into file set ?`,
  photoList: `select file_name,types from file where ?? = ?`,
  delPhoto: `DELETE file 
  FROM file 
  JOIN (
    SELECT file_no 
    FROM file 
    WHERE file_name = ?
  ) AS subquery 
  ON file.file_no = subquery.file_no`,
}


//예빈

let reviews = {
  myReview: `select * from review where user_id=? `, //마이페이지에서 내가 작성한 리뷰 리스트
  reviewInfo: `select * from review r left join file f on r.review_no = f.review_no where r.user_id=? and r.review_no=?`, //마이페이지 리뷰하나 보기
  //orderNoReview: `select * from review where user_id=?`,
  //서영희
  reviewList: `select  file_name, r.* 
  from review r 
  left join (select * from file where orders='s0') f 
  on (r.review_no = f.review_no) 
  left join order_detail o on o.order_detail_no=r.detail_order_no 
  where o.prod_no = ?;
   `,
  likeUp: `update review set like_cnt = like_cnt+1 where review_no= ?`,
  likeDown: `update review set like_cnt = like_cnt-1 where review_no= ?`,
  insertReviewLike: `insert into review_like set review_no=(select review_no from review where review_no = ?), user_id = (select user_id from user where user_id = ?)`,
  likeUp: `update review set like_cnt = like_cnt+1 where review_no= ?`,
  likeDown: `update review set like_cnt = like_cnt-1 where review_no= ?`,
  insertReviewLike: `insert into review_like set review_no = (select review_no from review where review_no = ?), user_id = (select user_id from user where user_id = ?)`,

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
  deleteReview: `delete from review where review_no=?`,
  selectReviewLike: `select * from review_like where user_id=? and review_no=?`,
  deleteReviewLike: `delete from review_like where review_no=? and user_id=?`
};

let point = {
  myPoint: `select point from user where user_id=?`, //마이페이지 보유 포인트
  myPointSaveHistory: `select * from point where user_id= ? and point_save > 0 order by end_point_date `,
  myPointUseHistory: `select * from point where user_id=? and point_use > 0 order by end_point_date `,
  reviewPoint: `insert into point set point_no = ?, order_detail_no=?, user_id=?, point_history='p2',
              point_save = 500, point_use=0, point_date =current_date(), end_point_date = date_add(current_date(), interval 1 Year);`, //리뷰등록시 포인트 지급
  reviewPointD: `insert into point set point_no=?, order_detail_no=?, user_id=?, end_point_date = current_date()`,
  reviewPointUp: `update user set point=point+500 where user_id=?`,
  reviewPointDown: `update user set point=point-500 where user_id=?`,
  pointExpire: `update user as t1,(select sum( point_save) as points, user_id from point where end_point_date = current_date() group by user_id) as t2
              set t1.point = t1.point- t2.points where t1.user_id=t2.user_id;`, //기간소멸
  //그리고 point table에 소멸사유로 인서트 해주는것도 같이..?
  showNextMonth: `select IFNULL(sum(point_save),0) as sump from point where user_id =? and (year(end_point_date)=year(now()) and Month(end_point_date)=Month(DATE_ADD(curdate(),INTERVAL 1 month))); `

};
let coupon = {
  myCoupon: `select c1.coupon_no, c1.user_id, c1.start_coupon, c1.end_coupon, c1.coupon_able, c2.coupon_name, c2.coupon_content, c2.coupon_discount_rate ,c1.coupon_able 
            from coupon c1 left join couponinfo c2 
            on (c1.couponinfo_no = c2.couponinfo_no)
            where c1.user_id=?` //마이페이지 보유 쿠폰
};
let orders = {
  savingCart: `insert into cart set ?`,
  updateCart: `update cart set quantity=quantity+? where prod_no =? and user_id=?;`,
  comparisonCart: `select * from cart where user_id=?`,
  detailInfo: `  select distinct file_name,format(avg(review_grade),1) as star,count(review_grade) as total, p.* from product p left join order_detail d on p.prod_no = d.prod_no
  left join review r  on r.detail_order_no = d.order_detail_no left join file f on(p.prod_no = f.prod_no) where p.prod_no = ?  and f.orders='s0' group by  d.prod_no order by f.orders;`,

  detailInfoImage: `select distinct file_name, p.* from product p 
  left join order_detail d on p.prod_no = d.prod_no
    left join review r  on r.detail_order_no = d.order_detail_no 
    left join file f on(p.prod_no = f.prod_no) where p.prod_no = ?
    order by f.orders
      ;`,

  //detailOrderLists:`select * from order_detail o1 left join orders o2 on o1.order_no = o2.order_no where o1.order_no =? and user_id = ?`,//주문창에서 상세주문내역으로 이동시 불러올 값
  orderList: `select fi.file_name,ord.order_date, dord.order_detail_no, ord.delivery_charge, ord.total_payment, ord.real_payment, ord.payment_no, ord.order_no, group_concat(prod_name) prod_name_list, ord.order_status, ord.point_use , dord.order_quantity, dord.prod_no
  from orders ord  join order_detail dord on ord.order_no = dord.order_no

                   join product pro on pro.prod_no = dord.prod_no
    join file fi on pro.prod_no = fi.prod_no
                   where ord.user_id=?
                   group by ord.order_no
                   order by ord.order_no;`,
  orderCancle: `update orders set order_status=m3 where order_no=? and user_id=?`, //주문전체취소

  detailOrderLists: `select * from order_detail od join product pr on od.prod_no = pr.prod_no	
  join orders ods on ods.order_no = od.order_no
  join (select * from file where orders='s0') fi on pr.prod_no = fi.prod_no
where od.order_no=?
and ods.user_id=?;` //주문창에서 상세주문내역으로 이동시 불러올 값
}
let delivery = {
  addDelivery: `insert into add_delivery set?`,
  //deliveryList: `select * from add_delivery where user_id=?`,
  deliveryInfo: `select * from add_delivery where user_id=? and delivery_no=?`,
  updateDelivery: `update add_delivery set? where delivery_no=? and user_id=?`,
  deleteDelivery: `delete from add_delivery where delivery_no=?`,
  deliveryList: `select * from add_delivery where user_id=?`,
  deliveryUser: `select address, detail_address, postcode from user where user_id=?`

}
//찜테이블
let like = {
  likeInfo: `select * from likes where user_id = ? and prod_no=?`,
  likeInsert: `insert into likes set?`,
  likeDel: `delete from likes where user_id=? and prod_no =?`,
  likeList: `SELECT *
  FROM (
    SELECT file_name, prod_no
    FROM file
    WHERE orders = 's0'
  ) f
  RIGHT JOIN product p ON p.prod_no = f.prod_no
  RIGHT JOIN likes l ON p.prod_no = l.prod_no
  WHERE user_id =?`
}
let inquire = {
  myInquireList: `select * from inquire where user_id=?`,
  inquireListP: `select * from inquire i join order_detail o on i.order_detail_no=o.order_detail_no where prod_no=?`,
  inquireInfo: `select * from inquire where inquire_no=?`,
  inquireInsert: `insert into inquire set?`,
  inquireUpdate: `update inquire set? where user_id=? and inquire_no=?`,
  inquireAnswer: `select * from reply where inquire_no=?`,
  photoListInq: `select file_name from file where inquire_no = ?`,
  deleteInquire: `delete from inquire where inquire_no=?`
}
let member = {
  memberInfo: `select t1.*, count(case when coupon_able=0 then 1 end) as couponCnt from user t1 join coupon t2  on t1.user_id = t2.user_id where t1.user_id= ?`,
  memberState: `select user_grade from user where user_id=?`
}
let notice = {
  noticeList: `select * from notice order by importance`,
  noticeInfo: `select * from notice where notcie_no=?;`
}
let fnq = {
  fnqList: `select * from fnq `,
  fnqInfo: `select * from fnq where qno=?;`
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
  inquire,
  notice,
  fnq
};