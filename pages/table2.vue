<template>
  <v-app>
    <div>
      <v-card class="mx-auto mt-10" outlined>
        <v-card-title>Inline Editor</v-card-title>
        <v-data-table
          :headers="headers"
          :items="desserts"
          :search="search"
          class="elevation-1"
          fixed-header
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <div class="d-flex w-100">
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  dense
                  outlined
                  single-line
                  hide-details
                ></v-text-field>
                <v-btn color="primary" class="ml-2 white--text" @click="addNew">
                  <v-icon dark>mdi-plus</v-icon>Add
                </v-btn>
              </div>
            </v-toolbar>
          </template>
          <template v-slot:[`item.name`]="{ item }">
            <v-text-field
              v-model="editedItem.name"
              :hide-details="true"
              dense
              single-line
              v-if="item.id === editedItem.id"
            ></v-text-field>
            <span v-else>{{ item.name }}</span>
          </template>
          <template v-slot:[`item.calories`]="{ item }">
            <v-text-field
              v-model="editedItem.calories"
              :hide-details="true"
              dense
              single-line
              v-if="item.id === editedItem.id"
            ></v-text-field>
            <span v-else>{{ item.calories }}</span>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <div v-if="item.id === editedItem.id">
              <v-icon color="red" class="mr-3" @click="close">
                mdi-window-close
              </v-icon>
              <v-icon color="green" @click="save">
                mdi-content-save
              </v-icon>
            </div>
            <div v-else>
              <v-icon color="green" class="mr-3" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon color="red" @click="deleteItem(item)">
                mdi-delete
              </v-icon>
            </div>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    search: "",
    headers: [
      {
        text: "Dessert (100g serving)",
        value: "name",
        sortable: false
      },
      {
        text: "Calories",
        value: "calories",
        sortable: false
      },
      { text: "Actions", value: "actions", sortable: false, width: "100px" }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      id: 0,
      name: "",
      calories: 0
    },
    defaultItem: {
      id: 0,
      name: "New Item",
      calories: 0
    }
  }),
  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          id: 1,
          name: "Frozen Yogurt",
          calories: 120
        },
        {
          id: 2,
          name: "Ice cream sandwich",
          calories: 200
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
      //splice(index, i) index순서에서 - i개 만큼 배열에서 삭제하는 것을 의미한다.
    },

    close() {
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    addNew() {
      const addObj = Object.assign({}, this.defaultItem);
      addObj.id = this.desserts.length + 1;
      this.desserts.unshift(addObj);
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      }
      this.close();
    }
  }
};
</script>

<style>
.theme--light.v-data-table.v-data-table--fixed-header thead th {
  background: #555;
  color: #fff;
}
.w-100 {
  width: 100%;
}
</style>
