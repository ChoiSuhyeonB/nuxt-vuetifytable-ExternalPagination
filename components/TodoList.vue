<template>
  <div>
    <!-- infiniteScroll -->
    <!-- <ul v-if="$store.state.items">
      <li v-for="(todoItem, index) in $store.state.items" :key="index">
        <i class="checkBtn fas fa-check" aria-hidden="true"></i>
        {{ todoItem.name }}
        <span
          class="removeBtn"
          type="Button"
          @click="removeTodo(todoItem.id, index)"
        >
          <i class="far fa-trash-alt" aria-hidden="true"></i>
        </span>
      </li>
    </ul> -->
    <!-- <infinite-loading
      spinner="spiral"
      @infinite="infiniteScroll"
    ></infinite-loading> -->

    <!-- VirtualList -->
    <!-- <RecycleScroller
      class="scroller"
      page-mode
      v-if="$store.state.items"
      :items="this.$store.state.items"
      :item-size="30"
      v-slot="{ item }"
      key-field="id"
    >
      <div class="list">
        {{ item.name }}
        <span class="removeBtn" type="Button" @click="removeTodo(item.id)">
          <i class="far fa-trash-alt" aria-hidden="true"></i>
        </span>
      </div>
    </RecycleScroller> -->
    edit-data:
    <input
      type="text"
      class="editContent"
      placeholder="you write Edit_data"
      @keyup.enter="EditTodo"
      v-model="editData"
    />

    <v-data-table
      id="table"
      :headers="headers"
      v-if="$store.state.items"
      :items="this.$store.state.items"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      class="elevation-1"
      @page-count="pageCount = $event"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <div>
          <v-icon color="red" class="mr-3" @click="removeTodo(item.id)">
            mdi-window-close
          </v-icon>
          <v-icon color="green" @click="editTodo(item.id)">
            mdi-content-save
          </v-icon>
        </div>
      </template>
    </v-data-table>
    <div class="text-center pt-2" id="pagination">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
      <v-text-field
        height="100%"
        :value="itemsPerPage"
        type="number"
        @input="itemsPerPage = parseInt($event, 10)"
      ></v-text-field>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "nuxt-property-decorator";

//@ts-ignore
// import VueVirtualScroller from "vue-virtual-scroller";
// import { RecycleScroller } from "vue-virtual-scroller";
// @Component({
//   components: {
//     RecycleScroller
//   }
// })
@Component
export default class TodoList extends Vue {
  Data: string[] = [""];
  editData: string = "";
  page: number = 1;
  pageCount: number = 0;
  itemsPerPage: number = 10;
  headers = [
    {
      text: "todo-name",
      align: "start",
      sortable: false,
      value: "name"
    },
    { text: "ID", value: "id" },
    { text: "Action", value: "actions" }
  ];

  //computed
  get url() {
    // return "/api/todolist/" + this.$store.state.page;
    return "/api/todolist/";
  }

  public removeTodo(todoItemID: string): void {
    this.$emit("removeTodo", todoItemID);
  }
  public editTodo(todoItemID: string): void {
    this.$emit("editTodo", todoItemID, this.editData);
  }
}
</script>

<style scoped>
ul {
  /* 리스트에 점을 없애준다. */
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
  margin-left: 10px;
}
li {
  display: flex;
  min-height: 30px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 20px;
}
.checkBtn {
  line-height: 45px;
  color: rgb(7, 177, 126);
  margin-left: 30px;
  margin-right: 70px;
}
.removeBtn {
  color: rgb(245, 9, 213);
  margin-left: 10px;
}

/* vue-virtual-scroller css */
.scroller {
  height: 100%;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  background: lightcyan;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 1px;
  font-size: 1rem;
  display: flex;
  border-radius: 10px;
}

.list {
  width: 100%;
  border-radius: 10px;
  margin: 0;
  padding-right: 40px;
  background: white;
}
.list:hover {
  background: rgb(235, 231, 231);
}

.editContent {
  display: inline;
  width: 15%;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1em;
}

#pagination {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2em;
}

#table {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1em;
}
</style>
