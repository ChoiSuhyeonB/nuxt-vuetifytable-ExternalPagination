// const cookieparser = require("cookieparser");
const cookieparser = require("cookieparser");
export default {
  namespaced: true,

  state: () => ({
    items: [""],
    page: 0,
    auth: null,
    uid: "",
    password: ""
  }),
  mutations: {
    updateState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key];
      });
    },
    setAuth(state, auth) {
      state.auth = auth;
    },

    // todoItems의 배열 데이터값이 변경됐을 때, 사용하는 메서드이다.

    changeTodoItems(state, payload) {
      state.items = payload;
    },
    pushTodoItems(state, payload) {
      state.items.push(payload);
    },
    changePage(state, payload) {
      state.page = payload;
    }
  },
  actions: {
    callMutation({ state, commit }, { newMsg }) {
      commit("changeTodoItems", newMsg);
    },
    //서버 사이드 렌더링 시점에 실행되기 때문에  스토어에 미리 데이터를 설정해준다.

    nuxtServerInit({ commit }, { req }) {
      let auth = null;
      if (req.headers.cookie) {
        const parsed = cookieparser.parse(req.headers.cookie);

        auth = parsed.auth;
        // console.log(auth);
      }
      commit("setAuth", auth);
    }
  },
  getters: {
    getMsg(state) {
      return `${state.items} => Length : ${state.items.length}`;
    }
  }
};
