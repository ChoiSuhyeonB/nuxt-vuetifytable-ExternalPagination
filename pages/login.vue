<template>
  <div class="login">
    <NuxtLink to="todo">
      todo-page
    </NuxtLink>
    <br />
    <NuxtLink to="movie">
      movie-page
    </NuxtLink>
    <br />

    <h2>Login Page</h2>
    <input placeholder="아이디를 입력" v-model="uid" />
    <input placeholder="비밀번호 입력" v-model="password" />
    <button @click="onSubmit">Login</button>
    <div>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
const Cookie = require("js-cookie");
export default {
  middleware: "notAuthenticated",
  computed: {
    uid: {
      //자동 getter
      get() {
        return this.$store.state.uid;
      },
      //자동 setter
      set(uid) {
        this.$store.commit("updateState", {
          uid: uid
        });
      }
    },
    password: {
      //자동 getter
      get() {
        return this.$store.state.password;
      },
      //자동 setter
      set(password) {
        this.$store.commit("updateState", {
          password: password
        });
      }
    }
  },

  methods: {
    async onSubmit() {
      await this.$axios
        .post("/api/login", {
          value: this.$store.state.uid,
          value2: this.$store.state.password
        })
        .then(res => {
          //console.log(res.data);
          if (res.data != false && res.data != null) {
            // this.$store.commit("updateState", {
            //   auth: true
            // });
            // alert("로그인 성공");
            // this.$router.push("/movie");
            // const auth = {
            //   accessToken: "someStringGotFromApiServiceWithAjax"
            // };

            //const auth = "example_jwt";
            const auth = res.data; //암호화된 토큰값을 auth 변수에 저장한다.
            this.$store.commit("setAuth", auth);
            Cookie.set("auth", auth);

            alert("로그인 성공");
          } else {
            // this.$store.commit("updateState", {
            //   auth: false
            // });
            alert("로그인 실패");
          }
        });
    },
    logout() {
      Cookie.remove("auth");
      this.$store.commit("setAuth", null);
    }
  }
};
</script>
<style scoped>
.login {
  text-align: center;
  display: inline-block;
  padding-top: 50px;
  background-color: #c5ecdd;
  margin: auto;
  width: 100%;
  height: 200px;
}
h2 {
  margin: 10px;
}
button {
  border-style: groove;
  width: 50px;
}

input {
  border-style: groove;
  width: 200px;
  text-align: center;
}
</style>
