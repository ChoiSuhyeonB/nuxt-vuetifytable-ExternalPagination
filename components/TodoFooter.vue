<template>
  <div class="clearAllContainer" @click="clearTodo">
    <span class="clearAllBtn">Clear All</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "nuxt-property-decorator";
@Component
export default class TodoFooter extends Vue {
  // public clearTodo():void{
  //  this.$emit('removeAll')
  // }

  @Emit("removeAll")
  public clearTodo() {}
}
</script>

<style>
.clearAllContainer {
  width: 8.5rem;
  height: 50px;
  line-height: 50px;
  background-color: rgb(176, 241, 205);
  border-radius: 10px;
  margin: 0 auto;
}
.clearAllBtn {
  color: white;
  display: black;
}
</style>
