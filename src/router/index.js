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
        },
        {
            path: "/form/display/:id",
            name: "Display",
            component: () => import("../view/DisplayView.vue"),
        }
    ],
});

// 路由守护admin页面
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    console.log("Current token:", token);
    console.log("Current role:", role);
    console.log("Route:", to.path);
    
    // 检查是否是管理员路由/admin/*和/form/display/*
    const isAdminRoute = to.path.startsWith('/admin');
    const isFormDisplayRoute = to.path.startsWith('/form/display');
    
    if ((isAdminRoute || isFormDisplayRoute) && (!token || role !== "admin")) {
        alert("您无权访问该页面");
        next({ name: "User" });
    } else {
        next();
    }
});

export default router;
