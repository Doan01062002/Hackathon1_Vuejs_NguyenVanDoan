import Dashboard from "@/components/Dashboard.vue";
import ManagerUser from "@/components/ManagerUser.vue";
import ManagerProduct from "@/components/ManagerProduct.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/admin",
    name: "admin",
    children: [
      {
        path: "manager-user",
        name: "manager-user",
        component: () =>
          import(
            /* webpackChunkName: "mangeruser" */ "@/components/ManagerUser.vue"
          ),
      },
      {
        path: "manager-product",
        name: "manager-product",
        component: () =>
          import(
            /* webpackChunkName: "mangerproduct" */ "@/components/ManagerProduct.vue"
          ),
      },
    ],
    component: () =>
      import(/* webpackChunkName: "admin" */ "@/components/Dashboard.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
