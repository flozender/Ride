const fs = require ('fs');
const readfile = require('fs-readfile-promise');
const jwt = require('jsonwebtoken');

module.exports = () => {
  let addToken = function(user) {
    return readfile('config/id_rsa', 'base64')
      .then(key => {
        user.exp = Math.floor(Date.now() / 1000) + (60 * 500);
        let token = jwt.sign(user, key.toString());
        return {
          success: true,
          message: 'Logged in successfully',
          token: token
        };
      })
      .catch(err => err)
  };

  return {
    addToken
  }
}