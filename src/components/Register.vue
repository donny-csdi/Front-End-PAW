<template>
    <v-main class="Register">
        <v-app-bar app><Nav /></v-app-bar>
        <v-container fluid fill-height class="posisinya">
            <v-layout flex align-center justify-center>
                <v-flex xs12 sm6 elevation-6>
                    <v-toolbar
                    color="primary"
                    dark>
                    <v-toolbar-title>Register Form</v-toolbar-title>
                    <v-spacer />
                    </v-toolbar>
                    <v-card>
                        <v-card-text class="pt-4">
                            <div>
                                <v-form v-model="valid" ref="form">
                                    <v-text-field label="Nama" v-model="nama" :rules="fieldRules" required prepend-icon="mdi-account"></v-text-field>
                                    <v-text-field label="E-mail" v-model="email" :rules="emailRules" required prepend-icon="mdi-email"></v-text-field>
                                    <v-text-field label="Username" v-model="username" :rules="usernameRules" required prepend-icon="mdi-account"></v-text-field>
                                    <v-text-field label="Password" v-model="password" type="password" min="8" :rules="passwordRules" counter required prepend-icon="mdi-lock"></v-text-field>
                                    <v-text-field label="Alamat" v-model="alamat" :rules="fieldRules" required prepend-icon="mdi-map-marker"></v-text-field>
                                    <v-text-field label="Nomor Telepon" v-model="no_telp" :rules="fieldRules" counter required  prepend-icon="mdi-cellphone"></v-text-field>
                                    <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field v-model="tanggal_lahir" label="Tanggal Lahir" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="tanggal_lahir" scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                                            <v-btn text  color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                                        </v-date-picker>
                                    </v-dialog>
                                    <v-layout justify-end>
                                        <v-btn class="mr-2" @click="register" :class=" { 'grey darken-1 white--text' : valid, disabled: !valid}">Register</v-btn>
                                        <v-btn @click="clear" class="blue darken-3 white--text">Clear</v-btn>
                                    </v-layout>
                                </v-form>
                            </div>
                            <v-card-text class="mr-2">Already have an account?</v-card-text>
                            <v-btn small  @click="login">Login Here</v-btn>
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
        position: relative;
        top: -25%;
        left: 0;
        right: 0;
    }
</style>

<script>
import Nav from './Nav.vue'
export default {
    name: "Register",
    components: {
        Nav
    },
    data() {
        return {
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            modal: false,
            snackbar: false,
            error_message: "",
            color: "",
            timeout: 2000,
            valid: false,
            nama: "",
            no_telp: "",
            alamat: "",
            tanggal_lahir: "",
            is_admin: "",
            fieldRules: [
                (v) => !!v || "Harap isi Field ini",
            ],
            password: "",
            passwordRules: [
                (v) => !!v || "Harap isi Password terlebih dahulu",
            ],
            email: "",
            emailRules: [
                (v) => !!v || "Harap isi E-mail terlebih dahulu",
            ],
            username:"",
            usernameRules: [
                (v) => !!v || "Harap isi Username terlebih dahulu",
            ],
        };
    },
    methods: {
        register() {
            if(this.$refs.form.validate()) {
                if(this.username == "elibadmin")
                {
                    this.is_admin = 1;
                }
                else
                {
                    this.is_admin = 0;
                }
                this.$http.post(this.$api + "/register", {
                    nama : this.nama, 
                    email : this.email,
                    password: this.password,
                    is_admin: this.is_admin,
                    username : this.username,
                    alamat : this.alamat,
                    no_telp : this.no_telp,
                    tanggal_lahir : this.tanggal_lahir
                }).then(response => {
                    this.error_message = response.data.message;
                    this.color = "green";
                    this.snackbar = true;
                    this.clear();
                    this.$router.push({
                        name: "Login",
                    });
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                })
            }
        },
        clear() {
            this.$refs.form.reset()
        },
        login() {
            this.$router.push({
                name: "Login"
            });
        }
    },
};
</script>