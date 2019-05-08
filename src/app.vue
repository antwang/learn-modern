<template>
  <div id="app">
    <img src="./assets/logo.png">
    <ul>
      <li class="ico ico-l1"></li>
      <li class="ico ico-l2"></li>
      <li class="ico ico-l3"></li>
      <li class="ico ico-l4">a</li>
    </ul>
    <router-view/>
  </div>
</template>
<script>
import axios from "axios";
import api from "../mock/api.js";
export default {
  async created() {
    let res = await axios.get(api.getUserInfo);
    console.log(res);
  }
};
</script>
<style lang="scss">
@import "~sprite2.scss";
$black: black;
$yellow: yellow;

h2 {
  font-size: 40px;
  color: $black;
  background: $yellow;
  text-align: center;
}
</style>

