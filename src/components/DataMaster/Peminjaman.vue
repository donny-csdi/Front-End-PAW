<template>
    <v-main class="list">
        <h3 class="text-h3 font-weight-medium mb-5" id="settingfont"><b>Daftar Peminjaman Buku</b> </h3>

        <v-card>
            <v-card-title>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                <v-spacer></v-spacer>
                <v-btn color="success" dark @click="pinjamBuku()">Pinjam Buku</v-btn>
            </v-card-title>
            <v-data-table :headers="headers" :items="peminjamans" :search="search">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn small class="mr-2" icon color="red" @click="editHandler(item)"><v-icon>mdi-pencil</v-icon></v-btn>
                    <v-btn small icon color="green" @click="deleteHandler(item)"><v-icon>mdi-delete</v-icon></v-btn>
                </template>
            </v-data-table>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title class="justify-center">
                    <span class="headline">{{ formTitle }} Peminjaman</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-card-text>Tanggal Pinjam</v-card-text>
                        <v-date-picker
                            v-model="form.tanggal_pinjam"
                            label="Tanggal Pinjam"
                            required>
                        </v-date-picker>
                        
                        <v-card-text>Tanggal Kembali</v-card-text>
                        <v-date-picker
                            v-model="form.tanggal_kembali"
                            label="Tanggal Kembali"
                            required>
                        </v-date-picker>

                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancel"> Cancel </v-btn>
                    <v-btn color="blue darken-1" text @click="update()"> Save </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="400px">
            <v-card>
                <v-card-title>Warning! <v-spacer></v-spacer><v-icon x-large>mdi-alert</v-icon></v-card-title>
                <v-card-text>Anda yakin ingin mengembalikan buku ini?</v-card-text>
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
            inputType: "Ubah",
            load: false,
            snackbar: false,
            error_message: "",
            color: "",
            search: null,
            timeout: 2000,
            dialog: false,
            dialogDelete: false,
            headers: [
                { text: "ID Buku", value: "id_buku" },
                { text: "Tanggal Pinjam", align: "start", sortable: true, value: "tanggal_pinjam" },
                { text: "Tanggal Kembali", value: "tanggal_kembali" },
                { text: "Actions", value: "actions" },
            ],
            peminjaman: new FormData,
            peminjamans: [],
            form: {
                tanggal_pinjam: null,
                tanggal_kembali: null,
            },
            deleteId: "",
            editId: "",
        };
    },
    methods: {
        readData() {
            var url = this.$api + "/peminjaman/get/" + localStorage.getItem("id");
            this.$http.get(url, {
                headers: {
                    "Authorization" : "Bearer " + localStorage.getItem("token")
                }
            }).then(response => {
                this.peminjamans = response.data.data;
            })
        },
        update() {
            let newData = {
                tanggal_pinjam: this.form.tanggal_pinjam,
                tanggal_kembali: this.form.tanggal_kembali,
                id_user: this.form.id_user,
                id_buku: this.form.id_buku
            };
            var url = this.$api + "/peminjaman/" + this.editId;
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
            var url = this.$api + "/peminjaman/" + this.deleteId;
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
            this.editId = item.id_peminjaman;
            this.form.tanggal_pinjam = item.tanggal_pinjam;
            this.form.tanggal_kembali = item.tanggal_kembali;
            this.form.id_user = item.id_user;
            this.form.id_buku = item.id_buku;
            this.dialog = true;
        },
        deleteHandler(item) {
            this.deleteId = item.id_peminjaman;
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
                tanggal_pinjam: null,
                tanggal_kembali: null,
                biaya_pendaftaran: null,
                kapasitas: null,
            };
        },
        pinjamBuku()
        {
            this.$router.push({
                name: "Dashboard"
            });
        }
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