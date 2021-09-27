export default {
  //   namespaced: true,
  state: () => ({
    title: "",
    loading: "false",
    movies: []
  }),
  mutations: {
    updateState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key];
      });
    }
  },
  actions: {
    async searchMovies({ state, commit }) {
      //state.loading = true;
      commit("updateState", {
        loading: true
      });
      await this.$axios
        .get(`https://www.omdbapi.com/?apikey=36c5204f&s=${state.title}`)
        // .get(`https://www.omdbapi.com/?apikey=36c5204f&s=?`, [this.title])
        .then(res => {
          console.log(res.data);
          // state.movies = res.data.Search
          // state.loading = false;
          commit("updateState", {
            movies: res.data.Search,
            loading: false
          });
        });
    }
  },
  getters: {}
};
