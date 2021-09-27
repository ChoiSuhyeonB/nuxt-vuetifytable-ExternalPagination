<template>
  <v-text-field v-model="title" outlined @keypress.enter="searchMovies">
    <template v-slot:prepend-inner>
      <v-icon>search</v-icon>
    </template>
    <template v-slot:append>
      <v-progress-circular
        v-if="loading"
        size="24"
        color="primary"
        indeterminate
      />
    </template>
  </v-text-field>
</template>

<script>
import axios from "axios";
export default {
  // data() {
  //   return {
  //     title: "",
  //     loading: false
  //   };
  // },
  computed: {
    title: {
      //자동 getter
      get() {
        return this.$store.state.movie.title;
      },
      //자동 setter
      set(title) {
        this.$store.commit("movie/updateState", {
          title
        });
      }
    },
    loading() {
      return this.$store.state.movie.loading;
    }
  },

  methods: {
    searchMovies() {
      this.$store.dispatch("movie/searchMovies");
    }
  }
};
</script>
