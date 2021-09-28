<template>
  <div id="app">
    <span class="logoutBtn" type="Button" @click="logout">
      <i class="fa fa-sign-out" aria-hidden="true" style="font-size:36px"></i>
    </span>
    <!-- <button @click="logout" >logout</button> -->
    <TodoHeader></TodoHeader>
    <TodoInput @addTodo="addTodo"></TodoInput>
    <TodoList @removeTodo="removeTodo" @editTodo="editTodo"></TodoList>
    <TodoFooter @removeAll="clearAll"></TodoFooter>
  </div>
</template>

<script lang="ts">
import TodoHeader from "~/components/TodoHeader.vue";
import TodoInput from "~/components/TodoInput.vue";
import TodoList from "~/components/TodoList.vue";
import TodoFooter from "~/components/TodoFooter.vue";
import { Component, State, Vue } from "nuxt-property-decorator";
import AxiosInstance from "~/util/api";
import { createNamespacedHelpers } from "vuex";

import { param } from "~/api/todolist";
import axios from "axios";
import { NULL } from "node-sass";

const Cookie = require("js-cookie");
const jwt = require("jsonwebtoken");

@Component({
  components: {
    TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter
  },
  middleware: "authenticated"
})
export default class MainComponent extends Vue {
  //변수
  public newTodoItem: String = "";
  public deleteTodoItem: String = "";

  //생성될때 실행되는 메서드
  private created() {
    var result = "";
    var jwt_email = "";

    var decode = jwt.verify(this.$store.state.auth, "apple", function(
      err: string,
      decode: { email: any }
    ) {
      //jwt expire일 경우
      if (err) {
        console.log("jwt err : " + err);
        //쿠키삭제, store auth 초기화, 로그인 페이지로 이동하기 작업.
        result = "expire";
      } else {
        jwt_email = decode.email;
      }
    });
    if (result == "expire") {
      this.logout();
      console.log("expire jwt resolve");
    } else if (jwt_email != null) {
      console.log("todo page email: " + jwt_email);

      AxiosInstance.jwtCall(jwt_email).then(res => {
        this.fetchData();
      });
    }
  }

  private logout() {
    Cookie.remove("auth");
    this.$store.commit("setAuth", null);
    this.$router.push("/login");
  }
  public async init() {
    // await this.$axios.get('/api/todolist').then((res)=>{
    //   //this.$store.commit('items/changeTodoItems', res.data)
    //  this.todoItems= res.data
    // })
    /*
      await AxiosInstance.getSearch().then((res)=>{
        this.$store.commit('items/changeTodoItems', res.data)
       this.todoItems= res.data
      })
      */
  }

  public async addTodo(todoItem: string) {
    this.newTodoItem = todoItem;
    await AxiosInstance.postAdd(this.newTodoItem).then(res => {
      console.log("add data : " + this.newTodoItem);
    });
    this.fetchData();
  }

  public async clearAll() {
    //  localStorage.clear();
    //  this.todoItems = [];
    await AxiosInstance.deleteClearAll().then(res => {});
    this.fetchData();
  }
  public async removeTodo(todoItemID: string) {
    //  localStorage.removeItem(todoItem);
    //  this.todoItems.splice(index, 1)
    this.deleteTodoItem = todoItemID;
    await AxiosInstance.deleteClear(this.deleteTodoItem).then(res => {
      console.log("delete id: " + this.deleteTodoItem);
    });
    this.fetchData();
  }
  public async editTodo(todoItemID: string, payload: string) {
    await AxiosInstance.edit(todoItemID, payload).then(res => {
      console.log("edit id:" + todoItemID);
    });
    this, this.fetchData();
  }

  // infinite scroll 구현

  //computed
  get url() {
    // return "/api/todolist/" + this.$store.state.page;
    return "/api/todolist/";
  }
  async fetchData() {
    const res = await this.$axios.get(this.url);
    this.$store.commit("changeTodoItems", res.data);
    //this.$store.commit('todoitem/changeTodoItems', response.data);
    //commit('모듈 이름'/'mutations 이름', '전달할 데이터');
  }
}
</script>

<style>
body {
  text-align: center;
  background-color: #dcfdd5;
  width: 100%;
}
ul {
  list-style: none;
  text-align: left;
}
input {
  border-style: groove;
  width: 200px;
}
button {
  border-style: groove;
}
.shadow {
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.03);
}
.logoutBtn {
  float: right;
  margin-right: 5em;
}
</style>
