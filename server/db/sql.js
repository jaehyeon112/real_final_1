let test = {
  list: `select * from employee`,
};
let reviews = {
  myList:`select * from review where user_id=? `,//마이페이지에서 내가 작성한 리뷰 리스트
  detailList:`select * from review where prod_no=?` //상세페이지에서 그 상품에대한 리뷰 리스트
  
}

module.exports = {
  test,reviews
};
