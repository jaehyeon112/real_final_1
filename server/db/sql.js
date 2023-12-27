let test = {
  list: `select * from  product`,
  list2 : `select * from product limit ? , 6`,
  filter : `select * from product where  prod_name >= ? and prod_name < ?;`

};

module.exports = {
  test,
};
