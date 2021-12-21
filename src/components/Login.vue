<template>
    <v-main class="Login">
        <v-app-bar app><Nav /></v-app-bar>
        <v-container fluid fill-height class="posisinya">
            <v-layout flex align-center justify-center>
                <v-flex xs12 sm6 elevation-6>
                    <v-toolbar class="primary">
                        <v-toolbar-title class="white--text">
                            <h1>Login E-LIB</h1>
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card>
                        <v-card-text class="pt-4">
                            <div>
                                <v-form v-model="valid" ref="form">
                                    <v-text-field label="Username" v-model="username" :rules="usernameRules" required prepend-icon="mdi-account"></v-text-field>
                                    <v-text-field label="Password" v-model="password" type="password" min="8" :rules="passwordRules" prepend-icon="mdi-lock" required></v-text-field>
                                    <v-layout justify-end>
                                        <v-btn class="mr-2" @click="submit" :class=" { 'grey darken-1 white--text' : valid, disabled: !valid}">Go</v-btn>
                                        <v-btn @click="clear" class="blue darken-3 white--text">Clear</v-btn>
                                    </v-layout>
                                </v-form>
                            </div>
                            <v-card-text class="mr-2">No account yet?</v-card-text>
                            <v-btn small @click="register">Register Here</v-btn>
                        </v-card-text>
                    </v-card>
                    <v-snackbar v-model="snackbar" :color="color" :timeout="timeout" bottom>{{ error_message }}</v-snackbar>
                </v-flex>
            </v-layout>
        </v-container>
    </v-main>
</template>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans&family=Playfair+Display&display=swap');
    
    .blue--text {
        font-family: "Playfair Display";
    }

    .posisinya {
        position: absolute;
        top: 20px;
        left: 0;
        right: 0;
    }

</style>

<script>
import Nav from './Nav.vue'
export default {
    name: "Login",
    components: {
        Nav
    },
    data() {
        return {
            load: false,
            snackbar: false,
            error_message: "",
            color: "",
            timeout: 2000,
            valid: false,
            password: "",
            passwordRules: [
                (v) => !!v || "Password Tidak Boleh Kosong :(",
            ],
            username: "",
            usernameRules: [
                (v) => !!v || "E-mail Tidak Boleh Kosong :(",
            ]
        };
    },
    methods: {
        submit() {
            if(this.$refs.form.validate()) {
                this.load = true;
                this.$http.post(this.$api + "/login", {
                    username: this.username,
                    password: this.password
                }).then(response => {
                    localStorage.setItem("id", response.data.user.id);
                    localStorage.setItem("token", response.data.access_token);
                    localStorage.setItem("nama", response.data.user.nama);
                    localStorage.setItem("is_admin", response.data.user.is_admin);
                    localStorage.setItem("username", this.username);
                    this.error_message = response.data.message;
                    this.color = "green";
                    this.snackbar = true;
                    this.load = false;
                    this.clear();
                    if(localStorage.getItem("is_admin") == 0)
                    {
                        this.$router.push({
                            name: "Dashboard",
                        });
                    }
                    else if(localStorage.getItem("is_admin") == 1)
                    {
                        this.$router.push({
                            name: "Admin",
                        });
                    }
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    this.load = false;
                    localStorage.removeItem("token");
                })
            }
        },
        clear() {
            this.$refs.form.reset();
        },
        register() {
            this.$router.push({
                name: "Register"
            });
        },
    },
};
</script>