<template>
  <header>
    <h2>Vue table pagination</h2>
  </header>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
@Component
export default class TodoHeader extends Vue {}
</script>

<style scoped>
h1 {
  color: #f2f0f5;
  font-weight: 1900;
  margin: 2.5em 0 rem;
}
h2 {
  color: rgb(61, 180, 168);
  font-weight: 1900;
  margin-left: 5em;
  margin-top: 1em;
}
</style>
