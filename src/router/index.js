import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/admin",
  },
  {
    path: "/admin",
    name: "admin",
    component: () =>
      import(/* webpackChunkName: "admin" */ "@/components/Dashboard.vue"),
  },
  {
    path: "/admin/manager-user",
    name: "manager-user",
    component: () =>
      import(
        /* webpackChunkName: "mangeruser" */ "@/components/ManagerUser.vue"
      ),
  },
  {
    path: "/admin/manager-product",
    name: "manager-product",
    component: () =>
      import(
        /* webpackChunkName: "mangerproduct" */ "@/components/ManagerProduct.vue"
      ),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
