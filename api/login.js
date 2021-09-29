const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

router.use(express.json());

//connection 객체 생성
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "0000",
  database: "member"
});

connection.connect(function(err) {
  if (err) {
    console.error("mysql member connection error");
    console.error(err);
    throw err;
  } else {
    console.log("mysql member connect success");
  }
});

router.post("/", function(req, res) {
  uid = req.body.value;
  password = req.body.value2;
  console.log("DB id: " + uid);
  console.log("DB Password: " + password);
  connection.query(`SELECT password FROM member where uid="${uid}"`, function(
    err,
    result
  ) {
    if (result.length == 0) console.log("아이디가 존재하지 않습니다.");
    else {
      if (password == result[0].password) {
        console.log("로그인이 성공했습니다.");

        //jwt토큰 발급해주기.
        let token = jwt.sign(
          {
            email: uid // 이메일 아이디값을 payload
          },
          "apple", //비밀키
          { expiresIn: "1h" },
          function(err, token) {
            //console.log("token :" + token);
            res.send(token);
          }
        );
      } else {
        console.log("로그인이 실패했습니다.");
        res.send("false");
      }
    }
  });
});

module.exports = router;
