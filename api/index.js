// <project root>/api/index.js
const express = require("express");
const todolist = require("./todolist");
const login = require("./login");
const movie = require("./movie");
// express 인스턴스 생성
const app = express();
//express-todolist 백엔드 연결
app.use("/todolist", todolist);
app.use("/login", login);
app.use("/movie", movie);

//app.use(express.json())

// 실제로는 /api 라우트를 처리하는 메소드가 된다.
// app.get('/', function(req, res) {
//   res.send('EXPRESS')
// })

// 모듈로 사용할 수 있도록 export
// 앱의 /api/* 라우트로 접근하는 모든 요청은 모두 app 인스턴스에게 전달된다.
module.exports = {
  path: "/api",
  handler: app
};
