<template>
    <div class="dashboard">
        <v-navigation-drawer v-model="drawer" class="fullheight" width="256" app>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title">Welcome, {{ nama.substring(0,8) }} </v-list-item-title>
                    <v-list-item-subtitle>{{ username }}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list dense nav>
                <v-list-item
                    v-for="item in filteredItems"
                    :key="item.title"
                    link
                    tag="router-link"
                    :to="item.to">
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app fixed height="75px">
            
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <h3 class="lib">E-Lib</h3>
            <V-Spacer />
            <v-toolbar-items>
                <v-btn text router @click="logout()"><v-icon color="red">mdi-power</v-icon></v-btn>
            </v-toolbar-items>
        </v-app-bar>
        <div class="fullheight pa-5" id="bg">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: "Dashboard",
    data() {
        return {
            drawer: true,
            items: [
                {title: "Dashboard", to: "/dashboard", status: "user"},
                {title: "Peminjaman", to: "/peminjaman", status: "user"},
                {title: "Donasi", to: "/donasi", status: "user"},
                {title: "Reservasi", to: "/reservasi", status: "user"},
                {title: "Profile", to: "/profile", status: "user"},
                {title: "Admin", to: "/admin", status: "admin"},
            ],
            nama: localStorage.getItem("nama"),
            username: localStorage.getItem("username"),
        };
    },
    methods : {
        logout() {
            localStorage.removeItem('id');
            localStorage.removeItem('token');
            localStorage.removeItem('nama');
            localStorage.removeItem('username');
            localStorage.removeItem('is_admin');
            location.reload();
        },
        isPageAdmin(){
            if(this.items.status == "admin")
            {
                return true;
            }
        }
    },
    computed : {
        filteredItems() {
            if(localStorage.getItem("is_admin") == 0)
            {
                const filtered = this.items.filter(x => x["status"] == "user");
                console.log(filtered);
                return filtered;
            }
            else{
                const filtered = this.items.filter(x => x["status"] == "admin");
                console.log(filtered);
                return filtered;
            }
        }
    }
};
</script>

<style scoped>
.fullheight
{
    min-height: 100vh !important;
}

.title
{
    margin-bottom: 5px;
}

.router
{
    text-decoration: none;
    color: black;
}

#bg{
    /* background-color: #3ba1c5
; */
margin-top: 0px;
}
.lib{
    font-size: 25px;
    font-family: monospace;
    color: royalblue;
}
</style>