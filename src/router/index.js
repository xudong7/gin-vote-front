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
            path: "/auth",
            name: "Auth",
            component: () => import("../view/AuthView.vue"),
        }
    ],
});

router.beforeEach((to, from, next) => {
    if (to.name === "Admin" && !localStorage.getItem("auth")) {
        next({ name: "Auth" });
    }
    next();
});

export default router;
