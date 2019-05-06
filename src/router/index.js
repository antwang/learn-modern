import Vue from "vue";
import Router from "vue-router";
import Hello from "../pages/Hello.vue";
import About from "../pages/About.vue";
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "/",
      component: Hello
    },
    {
      path: "/about",
      component: About
    }
  ]
});
