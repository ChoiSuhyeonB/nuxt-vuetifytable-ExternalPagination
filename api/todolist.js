const express = require("express");
const router = express.Router();
const mysql = require("mysql");

router.use(express.json());

//connection 객체 생성
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "0000",
  database: "todolist"
});
//connect
connection.connect(function(err) {
  if (err) {
    console.error("mysql connection error");
    console.error(err);
    throw err;
  } else {
    console.log("mysql connect success");
  }
});
// 실제로는 /api/todolist 라우트를 처리하는 메소드가 된다.
router.get("/", (req, res) => {
  // console.log('express api/todolist');

  // res.json({
  //     success:'true'
  // })
  //res.send({name:"suhyeon1137", name2:"dmswn4011"})

  email = req.body.data_email;

  connection.query(`SELECT * FROM todolist ORDER BY id DESC`, function(
    err,
    rows
  ) {
    if (err) throw err;
    res.send(rows);
  });
});

// 실제로는 /api/todolist 라우트를 처리하는 메소드가 된다.
router.get("/:id", (req, res) => {
  // console.log('express api/todolist');

  // res.json({
  //     success:'true'
  // })
  //res.send({name:"suhyeon1137", name2:"dmswn4011"})

  let id = parseInt(req.params.id);
  connection.query(
    `SELECT * FROM todolist ORDER BY id DESC LIMIT ?, 10`,
    [id],
    function(err, rows) {
      if (err) throw err;
      res.send(rows);
    }
  );
});

router.post("/", function(req, res) {
  newTodoItem = req.body.value;
  console.log(newTodoItem);
  connection.query(
    "INSERT INTO todolist (name) values(?)  ",
    [newTodoItem],
    function(err, result) {
      if (err) throw err;
      else {
        console.log("insert sql success");
      }
    }
  );
  res.send(true);
});

// router.get('/todolist/insert', function(req, res){
//     newTodoItem =req.query.value
//     console.log('server axios get newTodoItem:'+ newTodoItem)
//     connection.query('INSERT INTO todolist values(?)  ', [newTodoItem],function(err, result){
//         if(err) throw err;
//         else{
//             console.log("insert sql success");
//         }

//     } )
// })

router.delete("/:id", function(req, res) {
  deleteTodoItem = req.params.id;
  connection.query(
    "DELETE FROM todolist WHERE id = ?",
    [deleteTodoItem],
    function(err, result) {
      if (err) throw err;
      else {
        console.log("Number of todolist deleted");
      }
    }
  );
  res.send(true);
});

router.delete("/", function(req, res) {
  connection.query("TRUNCATE todolist", function(err, result) {
    if (err) throw err;
    else {
      console.log("All delete data");
    }
  });
  res.send(true);
});

router.post("/edit", function(req, res) {
  editTodoItemID = req.body.value;
  payload = req.body.value2;

  connection.query(
    `UPDATE todolist SET name =('${payload}') where id =(${editTodoItemID})`,
    function(err, result) {
      if (err) throw err;
      else {
        console.log("edit data success");
      }
    }
  );
  res.send(true);
});

module.exports = router;
