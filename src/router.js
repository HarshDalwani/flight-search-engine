import Vue from "vue";
import VueRouter from "vue-router";
import Index from "./views/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    component: Index,
    path: "/",
    name: "index",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
