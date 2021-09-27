export default function({ store, redirect }) {
  if (!store.state.auth) {
    // alert("로그인을 하세요~!");
    return redirect("/login");
  }
}
