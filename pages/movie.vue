<template>
  <v-app>
    <v-container>
      <search-list />
      <movie-list />
    </v-container>
    <button @click="logout">logout</button>
  </v-app>
</template>

<script>
const Cookie = require("js-cookie");
const jwt = require("jsonwebtoken");
import MovieList from "@/components/movie/MovieList.vue";
import SearchBar from "@/components/movie/SearchBar.vue";

export default {
  components: {
    "search-list": SearchBar,
    "movie-list": MovieList
  },
  middleware: "authenticated",
  methods: {
    logout() {
      Cookie.remove("auth");
      this.$store.commit("setAuth", null);
      this.$router.push("/login");
    }
  },
  created() {
    var result = null;
    var jwt_email = null;
    var decode = jwt.verify(this.$store.state.auth, "apple", function(
      err,
      decode
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
    } else {
      console.log("movie page email: " + jwt_email);
      this.$axios.post("/api/movie", { data_email: jwt_email }).then(res => {
        //서버한테 해당하는 이메일에 대한 개인 정보를 전달 받을 수 있도록 가능하게 해준다.
      });
    }
  }
};
</script>

<style></style>
