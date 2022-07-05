import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,

  routes: [
    {
      path: "/",
      redirect: "/add",
      component: () => import("@/layouts/full-layout/FullLayout"),
      children: [
        {
          name: "Map",
          path: "/map/:id",
          component: () => import("@/views/ui-elements/Map"),
        },
        {
          name: "Add",
          path: "/add",
          component: () => import("@/views/ui-elements/Add"),
        },
        {
          name: "Edit",
          path: "/edit/:id",
          component: () => import("@/views/ui-elements/Edit"),
        },
        
      ],
    },
    {
      path: "*",
      component: () => import("@/views/Error.vue"),
    },
  ],
});

export default router;
