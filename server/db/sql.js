let test = {
  list: `select * from employee`,
};

let user = {
  //아이디 체크할 때
  id : `select user_id from user`,
  //회원가입
  join : `INSERT INTO user SET ?`

}

module.exports = {
  test,
  user
};
