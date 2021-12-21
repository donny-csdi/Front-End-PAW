<template>
    <v-main class="profile">
        <h3 class="text-h3 font-weight-medium mb-5" id="settingfont"><b>Profile</b> </h3>
        <v-card class="mx-auto" max-width="344" outlined elevation="2" rounded="5" >
            <v-card-title class="justify-center">Nama</v-card-title>
            <v-card-text class="text-h6 font-weight-light justify-center">{{ users.nama }}</v-card-text>
            <v-card-title class="justify-center">Email</v-card-title>
            <v-card-text class="text-h6 font-weight-light justify-center">{{ users.email }}</v-card-text>
            <v-card-title class="justify-center">Username</v-card-title>
            <v-card-text class="text-h6 font-weight-light justify-center">{{ users.username }}</v-card-text>
            <v-card-title class="justify-center">Alamat</v-card-title>
            <v-card-text class="text-h6 font-weight-light justify-center">{{ users.alamat }}</v-card-text>
            <v-card-title class="justify-center">Nomor Telepon</v-card-title>
            <v-card-text class="text-h6 font-weight-light justify-center">{{ users.no_telp }}</v-card-text>
            <v-card-title class="justify-center">Tanggal Lahir</v-card-title>
            <v-card-text class="text-h6 font-weight-light justify-center">{{ users.tanggal_lahir }}</v-card-text>
        </v-card>
        <v-card-actions class="mt-5 justify-center"><v-btn @click="editHandler(users)">Edit</v-btn></v-card-actions>
        
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title class="justify-center">
                    <span class="headline">Edit Profile</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field
                            v-model="form.nama"
                            label="Nama"
                            required>
                        </v-text-field>
                        <v-text-field
                            v-model="form.email"
                            label="Email"
                            disabled>
                        </v-text-field>
                        <v-text-field
                            v-model="form.username"
                            label="Username"
                            required>
                        </v-text-field>
                        <v-text-field
                            v-model="form.alamat"
                            label="Alamat"
                            required>
                        </v-text-field>
                        <v-text-field
                            v-model="form.no_telp"
                            label="Nomor Telepon"
                            required>
                        </v-text-field>
                        <v-text-field
                            v-model="form.tanggal_lahir"
                            label="Tanggal Lahir"
                            required>
                        </v-text-field>
                        <!-- <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="tanggal_lahir" label="Tanggal Lahir" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="tanggal_lahir" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                                <v-btn text  color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                            </v-date-picker>
                        </v-dialog> -->
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancel()"> Cancel </v-btn>
                    <v-btn color="blue darken-1" text @click="update()"> Save </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" :timeout="timeout" :color="color" bottom>{{ error_message }}</v-snackbar>
    </v-main>
</template>

<script>
export default {
    name: "Profile",
    data() {
        return {
            // date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            // modal: false,
            load: false,
            snackbar: false,
            error_message: "",
            color: "",
            search: null,
            timeout: 2000,
            dialog: false,
            user: new FormData,
            users: [],
            form: {
                nama: null,
                email: null,
                username: null,
                alamat: null,
                no_telp: null,
                tanggal_lahir: null,
            },
            editId: "",
        };
    },
    methods: {
        readData() {
            var url = this.$api + "/user/" + localStorage.getItem("id");
            this.$http.get(url, {
                headers: {
                    "Authorization" : "Bearer " + localStorage.getItem("token")
                }
            }).then(response => {
                this.users = response.data.data;
            })
        },
        update() {
            let newData = {
                nama : this.form.nama, 
                email : this.form.email,
                username : this.form.username,
                alamat : this.form.alamat,
                no_telp : this.form.no_telp,
                tanggal_lahir : this.form.tanggal_lahir,
            };

            var url = this.$api + "/user/" + this.editId;
            this.load = true;
            this.$http.put(url, newData, {
                headers: {
                    "Authorization" : "Bearer " + localStorage.getItem("token")
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = false;
                this.close();
                this.readData();
                this.resetForm();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        editHandler(item) {
            this.inputType = "Ubah";
            this.editId = item.id;
            this.form.nama = item.nama,
            this.form.email = item.email,
            this.form.username = item.username,
            this.form.alamat = item.alamat,
            this.form.no_telp = item.no_telp,
            this.form.tanggal_lahir = item.tanggal_lahir,
            this.dialog = true;
        },
        close() {
            this.dialog = false;
            this.readData();
        },
        cancel() {
            this.resetForm();
            this.readData();
            this.dialog = false;
            this.dialogDelete = false;
        },
        resetForm() {
            this.form = {
                nama: null,
                email: null,
                username: null,
                alamat: null,
                no_telp: null,
                tanggal_lahir: null,
            };
        },
    },
    computed: {
        formTitle() {
            return this.inputType;
        },
    },
    mounted() {
        this.readData();
    },
};
</script>
<style>
#settingfont{
    color: white;
    font-weight: bolder;
}
</style>