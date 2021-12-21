import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

function importComponent(path) {
    return () => import(`./components/${path}.vue`);
}

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            component: importComponent("DashboardLayout"),
            children: [
                //Dashboard
                {
                    path: "/dashboard",
                    name: "Dashboard",
                    meta: { title: "Dashboard" },
                    component: importComponent("Dashboard"),
                },
                //Peminjaman
                {
                    path: "/peminjaman",
                    name: "Peminjaman",
                    meta: { title: "Peminjaman" },
                    component: importComponent("DataMaster/Peminjaman"),
                },
                //Donasi
                {
                    path: "/donasi",
                    name: "Donasi",
                    meta: { title: "Donasi" },
                    component: importComponent("DataMaster/Donasi"),
                },
                //Reservasi
                {
                path: "/reservasi",
                name: "Reservasi",
                meta: { title: "Reservasi" },
                component: importComponent("DataMaster/Reservasi"),
                },
                //Profile
                {
                    path: "/profile",
                    name: "Profile",
                    meta: { title: "Profile" },
                    component: importComponent("DataMaster/Profile"),
                },
                //Admin
                {
                    path: "/admin",
                    name: "Admin",
                    meta: { title: "Admin" },
                    component: importComponent("DataMaster/Admin"),
                },
            ],
        },
        //Login
        {
            path: "/login",
            name: "Login",
            meta: { title: "Login" },
            component: importComponent("Login"),
        },
        //Register
        {
            path: "/register",
            name: "Register",
            meta: { title: "Register" },
            component: importComponent("Register"),
        },
        {
            path: '*',
            redirect: '/'
        },
    ],
});

//Set Judul
router.beforeEach((to, from, next) => {
    if(to.name !== "Login" && localStorage.getItem("id") == null && to.name !== "Register"){
        next({name: "Login"})
    }
    else
    {
        document.title = to.meta.title;
        next();
    }
});

export default router;