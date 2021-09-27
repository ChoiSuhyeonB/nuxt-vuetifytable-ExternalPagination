<template>
  <v-row>
    <!-- <li v-for="movie in movies" :key="movie.imdbID">
        {{ movie }}
      </li> -->
    <v-col
      v-for="movie in movies"
      :key="movie.imdbID"
      cols="12"
      lg="3"
      md="3"
      sm="6"
    >
      <v-card>
        <v-img v-bind:src="movie.Poster" v-bind:alt="movie.Title"></v-img>
        <v-card-title> {{ movie.Title }} </v-card-title>
        <v-card-subtitle>{{ movie.Year }}</v-card-subtitle>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  computed: {
    movies() {
      return this.$store.state.movie.movies;
    }
  }
};
</script>
