var isRealString = (str) => {
    return typeof str === 'string' && str.trim().length > 0;
};

var uniqueUserName = (room,name, users) => {
  var sameUser = users.filter((user) => user.room === room && user.name === name).length;
  return sameUser !== 0;
}

module.exports = {isRealString,uniqueUserName};