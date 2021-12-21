<template>
    <v-main class="list">
        <h3 class="text-h3 font-weight-medium mb-5">Dashboard</h3>

        <v-card>
            <v-card-title>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                <v-spacer></v-spacer>
            </v-card-title>
            <v-data-table :headers="headers" :items="bukus" :search="search">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn small class="mr-2" icon color="blue" @click="editHandler(item)"><v-icon>mdi-send</v-icon></v-btn>
                </template>
            </v-data-table>
        </v-card>
        
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
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
                    <v-btn color="blue darken-1" text @click="cancel()"> Cancel </v-btn>
                    <v-btn color="blue darken-1" text @click="save()"> Save </v-btn>
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
                { text: "No", align: "start", sortable: true, value: "id_buku" },
                { text: "Judul", value: "judul" },
                { text: "Penulis", value: "penulis" },
                { text: "Jumlah Halaman", value: "jumlah_halaman" },
                { text: "Tahun Terbit", value: "tahun_terbit" },
                { text: "Actions", value: "actions" },
            ],
            buku: new FormData,
            bukus: [],
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
            var url = this.$api + "/buku";
            this.$http.get(url, {
                headers: {
                    "Authorization" : "Bearer " + localStorage.getItem("token")
                }
            }).then(response => {
                this.bukus = response.data.data;
            })
        },
        save() {
            var url = this.$api + "/peminjaman"
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
                this.dialog = false;
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
            this.form.id_user = localStorage.getItem("id");
            this.form.id_buku = item.id_buku;
            this.dialog = true;
        },
        cancel() {
            this.resetForm();
            this.dialog = false;
        },
        resetForm() {
            this.form = {
                tanggal_pinjam: null,
                tanggal_kembali: null,
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