import { createRouter, createWebHistory } from "vue-router";

const router = new createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "User",
            component: () => import("../view/UserView.vue"),
        },
        {
            path: "/register",
            name: "Register",
            component: () => import("../view/RegisterView.vue"),
        },
        {
            path: "/login",
            name: "Login",
            component: () => import("../view/LoginView.vue"),
        },
        {
            path: "/admin",
            name: "Admin",
            component: () => import("../view/AdminView.vue"),
        },
        {
            path: "/admin/new",
            name: "NewForm",
            component: () => import("../view/NewFormView.vue"),
        },
        {
            path: "/admin/form/:id",
            name: "AdminForm",
            component: () => import("../view/FixFormView.vue"),
        },
        {
            path: "/form/:id",
            name: "Form",
            component: () => import("../view/FormView.vue"),
        }
    ],
});

export default router;
