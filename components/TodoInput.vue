<template>
  <div class="inputBox">
    <input
      v-model="newTodoItem"
      type="text"
      class="inputContent"
      placeholder="Type what you have to do"
      @keyup.enter="addTodo"
    />
    <span class="addContainer" @abort="addTodo" @click="addTodo">
      <i
        class="addBtn fas fa-plus"
        aria-hidden="true"
        style="font-size:25px"
      ></i>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "nuxt-property-decorator";
@Component
export default class TodoInput extends Vue {
  newTodoItem: string = "";

  // public addTodo():void{
  //     if(this.newTodoItem!==""){
  //       const value:string = this.newTodoItem && this.newTodoItem.trim() ;
  //         this.$emit('addTodo', value);
  //         this.newTodoItem  =''
  //     }
  //   }

  @Emit("addTodo")
  addTodo() {
    if (this.newTodoItem !== "") {
      const value: string = this.newTodoItem && this.newTodoItem.trim();

      this.newTodoItem = "";
      return value;
    }
  }
}
</script>

<style scoped>
/*input의 영역을 보여주지 않는다.*/
/* input:focus{
    outline:none;
  } */
.inputBox {
  background: rgb(179, 231, 196);
  height: 30px;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1em;
  line-height: 30px;
  border-radius: 20px;
}
.inputContent {
  background: rgb(179, 231, 196);
  width: 20em;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

.inputBox input {
  border-style: none;
  font-size: 0.9rem;
  width: 40%;
}
.addContainer {
  background: linear-gradient(to right, #a7f7cf, #e0fa9a);
  margin-right: -50px;
}
.addBtn {
  color: white;
  width: 50px;
}
</style>
