import Vue from "vue";
import VueRouter from "./vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/bus",
    name: "Bus",
    component: () => import( "../views/bus/Index.vue")
  },
  {
    path: "/parent",
    name: "parent",
    component: () => import( "../views/parent/Index.vue")
  },
  {
    path: "/attr",
    name: "attr",
    component: () => import( "../views/attr/Index.vue")
  },
  {
    path: "/slot",
    name: "slot",
    component: () => import( "../views/slot/Index.vue")
  },
  {
    path: "/form",
    name: "form",
    component: () => import( "../views/Form.vue")
  },
  // {
  //   path: "/link",
  //   name: "link",
  //   component: () => import( "../views/Link.vue"),
  //   children:[
  //     {
  //       path: "/link/info",
  //       name: "info",
  //       component: {render(h){return h('div','link children link-info page')}}
  //     },
  //   ]
  // }
];

const router = new VueRouter({
  mode: "hash",
  routes
});

export default router;
