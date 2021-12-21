<template>
    <v-main class="list">
        <h3 class="text-h3 font-weight-medium mb-5">Donasi Buku</h3>

        <v-card>
            <v-card-title>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                <v-spacer></v-spacer>
                <v-btn color="success" dark @click="dialog = true">Donasikan Buku</v-btn>
            </v-card-title>
            <v-data-table :headers="headers" :items="donasis" :search="search">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn small class="mr-2" icon color="red" @click="editHandler(item)"><v-icon>mdi-pencil</v-icon></v-btn>
                    <v-btn small icon color="green" @click="deleteHandler(item)"><v-icon>mdi-delete</v-icon></v-btn>
                </template>
            </v-data-table>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }} Donasi</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field
                            v-model="form.judul"
                            label="Judul"
                            required>
                        </v-text-field>
                        
                        <v-text-field
                            v-model="form.penulis"
                            label="Penulis"
                            required>
                        </v-text-field>

                        <v-text-field
                            v-model="form.jumlah_halaman"
                            label="Jumlah Halaman"
                            required>
                        </v-text-field>

                        <v-text-field
                            v-model="form.tahun_terbit"
                            label="Tahun Terbit"
                            required>
                        </v-text-field>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancel"> Cancel </v-btn>
                    <v-btn color="blue darken-1" text @click="setForm"> Save </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="400px">
            <v-card>
                <v-card-title>Warning! <v-spacer></v-spacer><v-icon x-large>mdi-alert</v-icon></v-card-title>
                <v-card-text>Anda yakin ingin membatalkan donasi ini?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green" icon @click="deleteData()"><v-icon large>mdi-check</v-icon></v-btn>
                    <v-btn color="red" icon @click="dialogDelete = false"><v-icon large>mdi-close</v-icon></v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-snackbar v-model="snackbar" :timeout="timeout" :color="color" bottom>{{ error_message }}</v-snackbar>
    </v-main>
</template>

<script>
export default {
    name: "List",
    data() {
        return {
            inputType: "Tambah",
            load: false,
            snackbar: false,
            error_message: "",
            color: "",
            search: null,
            timeout: 2000,
            dialog: false,
            dialogDelete: false,
            headers: [
                { text: "Judul", align: "start", sortable: true, value: "judul" },
                { text: "Penulis", value: "penulis" },
                { text: "Jumlah Halaman", value: "jumlah_halaman" },
                { text: "Tahun Terbit", value: "tahun_terbit" },
                { text: "Actions", value: "actions" },
            ],
            donasi: new FormData,
            donasis: [],
            form: {
                judul: null,
                penulis: null,
                jumlah_halaman: null,
                tahun_terbit: null,
            },
            deleteId: "",
            editId: "",
        };
    },
    methods: {
        setForm() {
            if(this.inputType !== "Tambah")
            {
                this.update();
            }
            else
            {
                this.save();
            }
        },
        readData() {
            var url = this.$api + "/donasi/get/" + localStorage.getItem("id");
            this.$http.get(url, {
                headers: {
                    "Authorization" : "Bearer " + localStorage.getItem("token")
                }
            }).then(response => {
                this.donasis = response.data.data;
            })
        },
        save() {
            this.form.id_user = localStorage.getItem("id")

            var url = this.$api + "/donasi/"
            this.load = true;
            this.$http.post(url, this.form, {
                headers: {
                    "Authorization" : "Bearer " + localStorage.getItem("token"),
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = true;
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
        update() {
            let newData = {
                judul: this.form.judul,
                penulis: this.form.penulis,
                jumlah_halaman: this.form.jumlah_halaman,
                tahun_terbit: this.form.tahun_terbit,
                id_user : localStorage.getItem("id")
            };
            var url = this.$api + "/donasi/" + this.editId;
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
                this.inputType = "Tambah";
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        deleteData() {
            var url = this.$api + "/donasi/" + this.deleteId;
            this.load = true;
            this.$http.delete(url, {
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
                this.inputType = "Tambah";
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        editHandler(item) {
            this.inputType = "Ubah";
            this.editId = item.id_donasi;
            this.form.judul = item.judul;
            this.form.penulis = item.penulis;
            this.form.jumlah_halaman = item.jumlah_halaman;
            this.form.tahun_terbit = item.tahun_terbit;
            this.dialog = true;
        },
        deleteHandler(item) {
            this.deleteId = item.id_donasi;
            this.dialogDelete = true;
        },
        close() {
            this.dialog = false;
            this.inputType = "Tambah";
            this.dialogDelete = false;
            this.readData();
        },
        cancel() {
            this.resetForm();
            this.readData();
            this.dialog = false;
            this.dialogDelete = false;
            this.inputType = "Tambah";
        },
        resetForm() {
            this.form = {
                judul: null,
                penulis: null,
                jumlah_halaman: null,
                tahun_terbit: null,
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