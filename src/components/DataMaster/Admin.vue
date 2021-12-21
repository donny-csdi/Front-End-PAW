<template>
    <v-main class="admin">
        <h3 class="text-h3 font-weight-medium mb-5">Halaman Admin</h3>
        <v-card>
            <v-card-title>
                <v-card-text class="text-h4 font-weight-medium">Data Buku </v-card-text>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                <v-spacer></v-spacer>
                <v-btn color="success" dark @click="dialogBuku = true">Tambah Buku</v-btn>
            </v-card-title>
            <v-data-table :headers="headersBuku" :items="bukus" :search="search">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn small class="mr-2" icon color="red" @click="editHandlerBuku(item)"><v-icon>mdi-pencil</v-icon></v-btn>
                    <v-btn small icon color="green" @click="deleteHandlerBuku(item)"><v-icon>mdi-delete</v-icon></v-btn>
                </template>
            </v-data-table>
            <v-card-title>
                <v-card-text class="text-h4 font-weight-medium">Data Peminjaman </v-card-text>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                <v-spacer></v-spacer>
            </v-card-title>
            <v-data-table :headers="headersPeminjaman" :items="peminjamans" :search="search">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn small class="mr-2" icon color="red" @click="editHandlerPeminjaman(item)"><v-icon>mdi-pencil</v-icon></v-btn>
                    <v-btn small icon color="green" @click="deleteHandlerPeminjaman(item)"><v-icon>mdi-delete</v-icon></v-btn>
                </template>
            </v-data-table>
            <v-card-title>
                <v-card-text class="text-h4 font-weight-medium">Data Donasi </v-card-text>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                <v-spacer></v-spacer>
            </v-card-title>
            <v-data-table :headers="headersDonasi" :items="donasis" :search="search">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn small class="mr-2" icon color="red" @click="editHandlerDonasi(item)"><v-icon>mdi-pencil</v-icon></v-btn>
                    <v-btn small icon color="green" @click="deleteHandlerDonasi(item)"><v-icon>mdi-delete</v-icon></v-btn>
                </template>
            </v-data-table>
            <v-card-title>
                <v-card-text class="text-h4 font-weight-medium">Data Reservasi </v-card-text>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                <v-spacer></v-spacer>
            </v-card-title>
            <v-data-table :headers="headersReservasi" :items="reservasis" :search="search">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn small class="mr-2" icon color="red" @click="editHandlerReservasi(item)"><v-icon>mdi-pencil</v-icon></v-btn>
                    <v-btn small icon color="green" @click="deleteHandlerReservasi(item)"><v-icon>mdi-delete</v-icon></v-btn>
                </template>
            </v-data-table>
        </v-card>

        <v-dialog v-model="dialogBuku" persistent max-width="600px">
            <v-card>
                <v-card-title class="justify-center">
                    <span class="headline">{{ formTitle }} Buku</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field
                            v-model="formBuku.judul"
                            label="Judul"
                            required>
                        </v-text-field>
                        
                        <v-text-field
                            v-model="formBuku.penulis"
                            label="Penulis"
                            required>
                        </v-text-field>

                        <v-text-field
                            v-model="formBuku.jumlah_halaman"
                            label="Jumlah Halaman"
                            required>
                        </v-text-field>

                        <v-text-field
                            v-model="formBuku.tahun_terbit"
                            label="Tahun Terbit"
                            required>
                        </v-text-field>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancel"> Cancel </v-btn>
                    <v-btn color="blue darken-1" text @click="setFormBuku"> Save </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDeleteBuku" max-width="400px">
            <v-card>
                <v-card-title>Warning! <v-spacer></v-spacer><v-icon x-large>mdi-alert</v-icon></v-card-title>
                <v-card-text>Anda yakin ingin menghapus buku ini?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green" icon @click="deleteDataBuku()"><v-icon large>mdi-check</v-icon></v-btn>
                    <v-btn color="red" icon @click="dialogDeleteBuku = false"><v-icon large>mdi-close</v-icon></v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogPeminjaman" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }} Peminjaman</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-card-text>Tanggal Pinjam</v-card-text>
                        <v-date-picker
                            v-model="formPeminjaman.tanggal_pinjam"
                            label="Tanggal Pinjam"
                            required>
                        </v-date-picker>
                        
                        <v-card-text>Tanggal Kembali</v-card-text>
                        <v-date-picker
                            v-model="formPeminjaman.tanggal_kembali"
                            label="Tanggal Kembali"
                            required>
                        </v-date-picker>

                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancel"> Cancel </v-btn>
                    <v-btn color="blue darken-1" text @click="updatePeminjaman()"> Save </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDeletePeminjaman" max-width="400px">
            <v-card>
                <v-card-title>Warning! <v-spacer></v-spacer><v-icon x-large>mdi-alert</v-icon></v-card-title>
                <v-card-text>Anda yakin ingin mengembalikan buku ini?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green" icon @click="deleteDataPeminjaman()"><v-icon large>mdi-check</v-icon></v-btn>
                    <v-btn color="red" icon @click="dialogDeletePeminjaman = false"><v-icon large>mdi-close</v-icon></v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDonasi" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }} Donasi</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field
                            v-model="formDonasi.judul"
                            label="Judul"
                            required>
                        </v-text-field>
                        
                        <v-text-field
                            v-model="formDonasi.penulis"
                            label="Penulis"
                            required>
                        </v-text-field>

                        <v-text-field
                            v-model="formDonasi.jumlah_halaman"
                            label="Jumlah Halaman"
                            required>
                        </v-text-field>

                        <v-text-field
                            v-model="formDonasi.tahun_terbit"
                            label="Tahun Terbit"
                            required>
                        </v-text-field>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancel"> Cancel </v-btn>
                    <v-btn color="blue darken-1" text @click="setFormDonasi"> Save </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDeleteDonasi" max-width="400px">
            <v-card>
                <v-card-title>Warning! <v-spacer></v-spacer><v-icon x-large>mdi-alert</v-icon></v-card-title>
                <v-card-text>Anda yakin ingin membatalkan donasi ini?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green" icon @click="deleteDataDonasi()"><v-icon large>mdi-check</v-icon></v-btn>
                    <v-btn color="red" icon @click="dialogDeleteDonasi = false"><v-icon large>mdi-close</v-icon></v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogReservasi" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }} Reservasi</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-card-text>Tanggal Reservasi</v-card-text>
                        <v-date-picker
                            v-model="formReservasi.tanggal_reservasi"
                            label="Nama Kelas"
                            required>
                        </v-date-picker>
                        
                        <v-select
                            v-model="formReservasi.waktu_reservasi"
                            :items="waktu"
                            label="Waktu Reservasi"
                            required>
                        </v-select>

                        <v-text-field
                            v-model="formReservasi.jumlah_orang"
                            label="Jumlah Orang"
                            required>
                        </v-text-field>

                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancel"> Cancel </v-btn>
                    <v-btn color="blue darken-1" text @click="setFormReservasi"> Save </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDeleteReservasi" max-width="400px">
            <v-card>
                <v-card-title>Warning! <v-spacer></v-spacer><v-icon x-large>mdi-alert</v-icon></v-card-title>
                <v-card-text>Anda yakin ingin membatalkan reservasi ini?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green" icon @click="deleteDataReservasi()"><v-icon large>mdi-check</v-icon></v-btn>
                    <v-btn color="red" icon @click="dialogDeleteReservasi = false"><v-icon large>mdi-close</v-icon></v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-snackbar v-model="snackbar" :timeout="timeout" :color="color" bottom>{{ error_message }}</v-snackbar>
    </v-main>
</template>

<script>
export default {
    name: "admin",
    data() {
        return {
            inputType: "Tambah",
            load: false,
            snackbar: false,
            error_message: "",
            color: "",
            search: null,
            timeout: 2000,
            dialogBuku : false,
            dialogPeminjaman : false,
            dialogDonasi : false,
            dialogReservasi : false,
            dialogDeleteBuku : false,
            dialogDeletePeminjaman : false,
            dialogDeleteDonasi : false,
            dialogDeleteReservasi : false,
            headersBuku: [
                { text: "No", align: "start", sortable: true, value: "id_buku" },
                { text: "Judul", value: "judul" },
                { text: "Penulis", value: "penulis" },
                { text: "Jumlah Halaman", value: "jumlah_halaman" },
                { text: "Tahun Terbit", value: "tahun_terbit" },
                { text: "Actions", value: "actions" },
            ],
            buku: new FormData,
            bukus: [],
            formBuku: {
                judul: null,
                penulis: null,
                jumlah_halaman: null,
                tahun_terbit: null,
            },
            headersPeminjaman: [
                { text: "No", value: "id_peminjaman" },
                { text: "ID Buku", value: "id_buku" },
                { text: "ID User", value: "id_user" },
                { text: "Tanggal Pinjam", align: "start", sortable: true, value: "tanggal_pinjam" },
                { text: "Tanggal Kembali", value: "tanggal_kembali" },
                { text: "Actions", value: "actions" },
            ],
            peminjaman: new FormData,
            peminjamans: [],
            formPeminjaman: {
                tanggal_pinjam: null,
                tanggal_kembali: null,
            },
            headersDonasi: [
                { text: "No", value: "id_donasi" },
                { text: "ID User", value: "id_user" },
                { text: "Judul", align: "start", sortable: true, value: "judul" },
                { text: "Penulis", value: "penulis" },
                { text: "Jumlah Halaman", value: "jumlah_halaman" },
                { text: "Tahun Terbit", value: "tahun_terbit" },
                { text: "Actions", value: "actions" },
            ],
            donasi: new FormData,
            donasis: [],
            formDonasi: {
                judul: null,
                penulis: null,
                jumlah_halaman: null,
                tahun_terbit: null,
            },
            headersReservasi: [
                { text: "No", value: "id_reservasi" },
                { text: "ID User", value: "id_user" },
                { text: "Tanggal Reservasi", align: "start", sortable: true, value: "tanggal_reservasi" },
                { text: "Waktu Reservasi", value: "waktu_reservasi" },
                { text: "Jumlah Orang", value: "jumlah_orang" },
                { text: "Actions", value: "actions" },
            ],
            reservasi: new FormData,
            reservasis: [],
            formReservasi: {
                tanggal_reservasi: null,
                waktu_reservasi: null,
                jumlah_orang: null,
            },
            waktu: ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"],
            deleteId: "",
            editId: "",
        };
    },
    methods: {
        setFormBuku() {
            if(this.inputType !== "Tambah")
            {
                this.updateBuku();
            }
            else
            {
                this.saveBuku();
            }
        },
        setFormPeminjaman() {
            if(this.inputType !== "Tambah")
            {
                this.updatePeminjaman();
            }
            else
            {
                this.savePeminjaman();
            }
        },
        setFormDonasi() {
            if(this.inputType !== "Tambah")
            {
                this.updateDonasi();
            }
            else
            {
                this.saveDonasi();
            }
        },
        setFormReservasi() {
            if(this.inputType !== "Tambah")
            {
                this.updateReservasi();
            }
            else
            {
                this.saveReservasi();
            }
        },
        readDataBuku() {
            var url = this.$api + "/buku";
            this.$http.get(url, {
                headers: {
                    "Authorization" : "Bearer " + localStorage.getItem("token")
                }
            }).then(response => {
                this.bukus = response.data.data;
            })
        },
        saveBuku() {
            var url = this.$api + "/buku/"
            this.load = true;
            this.$http.post(url, this.formBuku, {
                headers: {
                    "Authorization" : "Bearer " + localStorage.getItem("token"),
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = true;
                this.close();
                this.readDataBuku();
                this.resetForm();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        updateBuku() {
            let newData = {
                judul: this.formBuku.judul,
                penulis: this.formBuku.penulis,
                jumlah_halaman: this.formBuku.jumlah_halaman,
                tahun_terbit: this.formBuku.tahun_terbit,
            };
            var url = this.$api + "/buku/" + this.editId;
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
                this.readDataBuku();
                this.resetForm();
                this.inputType = "Tambah";
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        deleteDataBuku() {
            var url = this.$api + "/buku/" + this.deleteId;
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
                this.readDataBuku();
                this.resetForm();
                this.inputType = "Tambah";
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        editHandlerBuku(item) {
            this.inputType = "Ubah";
            this.editId = item.id_buku;
            this.formBuku.judul = item.judul;
            this.formBuku.penulis = item.penulis;
            this.formBuku.jumlah_halaman = item.jumlah_halaman;
            this.formBuku.tahun_terbit = item.tahun_terbit;
            this.dialogBuku = true;
        },
        deleteHandlerBuku(item) {
            this.deleteId = item.id_buku;
            this.dialogDeleteBuku = true;
        },
        readDataPeminjaman() {
            var url = this.$api + "/peminjaman";
            this.$http.get(url, {
                headers: {
                    "Authorization" : "Bearer " + localStorage.getItem("token")
                }
            }).then(response => {
                this.peminjamans = response.data.data;
            })
        },
        // savePeminjaman() {
        //     var url = this.$api + "/peminjaman"
        //     this.load = true;
        //     this.$http.post(url, this.formPeminjaman, {
        //         headers: {
        //             "Authorization" : "Bearer " + localStorage.getItem("token"),
        //         }
        //     }).then(response => {
        //         this.error_message = response.data.message;
        //         this.color = "green";
        //         this.snackbar = true;
        //         this.load = true;
        //         this.dialog = false;
        //         this.readDataPeminjaman();
        //         this.resetForm();
        //     }).catch(error => {
        //         this.error_message = error.response.data.message;
        //         this.color = "red";
        //         this.snackbar = true;
        //         this.load = false;
        //     });
        // },
        updatePeminjaman() {
            let newData = {
                tanggal_pinjam: this.formPeminjaman.tanggal_pinjam,
                tanggal_kembali: this.formPeminjaman.tanggal_kembali,
                id_user: this.formPeminjaman.id_user,
                id_buku: this.formPeminjaman.id_buku
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
        deleteDataPeminjaman() {
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
                this.readDataPeminjaman();
                this.resetForm();
                this.inputType = "Tambah";
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        editHandlerPeminjaman(item) {
            this.inputType = "Ubah";
            this.editId = item.id_peminjaman;
            this.formPeminjaman.tanggal_pinjam = item.tanggal_pinjam;
            this.formPeminjaman.tanggal_kembali = item.tanggal_kembali;
            this.formPeminjaman.id_user = item.id_user;
            this.formPeminjaman.id_buku = item.id_buku;
            this.dialogPeminjaman = true;
        },
        deleteHandlerPeminjaman(item) {
            this.deleteId = item.id_peminjaman;
            this.dialogDeletePeminjaman = true;
        },
        readDataDonasi() {
            var url = this.$api + "/donasi";
            this.$http.get(url, {
                headers: {
                    "Authorization" : "Bearer " + localStorage.getItem("token")
                }
            }).then(response => {
                this.donasis = response.data.data;
            })
        },
        // saveDonasi() {
        //     this.formDonasi.id_user = localStorage.getItem("id")

        //     var url = this.$api + "/donasi/"
        //     this.load = true;
        //     this.$http.post(url, this.formDonasi, {
        //         headers: {
        //             "Authorization" : "Bearer " + localStorage.getItem("token"),
        //         }
        //     }).then(response => {
        //         this.error_message = response.data.message;
        //         this.color = "green";
        //         this.snackbar = true;
        //         this.load = true;
        //         this.close();
        //         this.readDataDonasi();
        //         this.resetForm();
        //     }).catch(error => {
        //         this.error_message = error.response.data.message;
        //         this.color = "red";
        //         this.snackbar = true;
        //         this.load = false;
        //     });
        // },
        updateDonasi() {
            let newData = {
                judul: this.formDonasi.judul,
                penulis: this.formDonasi.penulis,
                jumlah_halaman: this.formDonasi.jumlah_halaman,
                tahun_terbit: this.formDonasi.tahun_terbit,
                id_user : this.formDonasi.id_user
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
                this.readDataDonasi();
                this.resetForm();
                this.inputType = "Tambah";
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        deleteDataDonasi() {
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
                this.readDataDonasi();
                this.resetForm();
                this.inputType = "Tambah";
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        editHandlerDonasi(item) {
            this.inputType = "Ubah";
            this.editId = item.id_donasi;
            this.formDonasi.judul = item.judul;
            this.formDonasi.penulis = item.penulis;
            this.formDonasi.jumlah_halaman = item.jumlah_halaman;
            this.formDonasi.tahun_terbit = item.tahun_terbit;
            this.formDonasi.id_user = item.id_user;
            this.dialogDonasi = true;
        },
        deleteHandlerDonasi(item) {
            this.deleteId = item.id_donasi;
            this.dialogDeleteDonasi = true;
        },
        readDataReservasi() {
            var url = this.$api + "/reservasi";
            this.$http.get(url, {
                headers: {
                    "Authorization" : "Bearer " + localStorage.getItem("token")
                }
            }).then(response => {
                this.reservasis = response.data.data;
            })
        },
        // saveReservasi() {
        //     this.formReservasi.id_user = localStorage.getItem("id")
           
        //     var url = this.$api + "/reservasi/"
        //     this.load = true;
        //     this.$http.post(url, this.formReservasi, {
        //         headers: {
        //             "Authorization" : "Bearer " + localStorage.getItem("token"),
        //         }
        //     }).then(response => {
        //         this.error_message = response.data.message;
        //         this.color = "green";
        //         this.snackbar = true;
        //         this.load = true;
        //         this.close();
        //         this.readDataReservasi();
        //         this.resetForm();
        //     }).catch(error => {
        //         this.error_message = error.response.data.message;
        //         this.color = "red";
        //         this.snackbar = true;
        //         this.load = false;
        //     });
        // },
        updateReservasi() {
            let newData = {
                tanggal_reservasi: this.formReservasi.tanggal_reservasi,
                waktu_reservasi: this.formReservasi.waktu_reservasi,
                jumlah_orang: this.formReservasi.jumlah_orang,
                id_user: this.formReservasi.id_user
            };
            var url = this.$api + "/reservasi/" + this.editId;
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
                this.readDataReservasi();
                this.resetForm();
                this.inputType = "Tambah";
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        deleteDataReservasi() {
            var url = this.$api + "/reservasi/" + this.deleteId;
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
                this.readDataReservasi();
                this.resetForm();
                this.inputType = "Tambah";
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        editHandlerReservasi(item) {
            this.inputType = "Ubah";
            this.editId = item.id_reservasi;
            this.formReservasi.tanggal_reservasi = item.tanggal_reservasi;
            this.formReservasi.waktu_reservasi = item.waktu_reservasi;
            this.formReservasi.jumlah_orang = item.jumlah_orang;
            this.formReservasi.id_user = item.id_user;
            this.dialogReservasi = true;
        },
        deleteHandlerReservasi(item) {
            this.deleteId = item.id_reservasi;
            this.dialogDeleteReservasi = true;
        },
        close() {
            this.dialogBuku = false;
            this.dialogPeminjaman = false;
            this.dialogDonasi = false;
            this.dialogReservasi = false;
            this.inputType = "Tambah";
            this.dialogDeleteBuku = false;
            this.dialogDeletePeminjaman = false;
            this.dialogDeleteDonasi = false;
            this.dialogDeleteReservasi = false;
            this.readDataBuku();
            this.readDataPeminjaman();
            this.readDataDonasi();
            this.readDataReservasi();
        },
        cancel() {
            this.resetForm();
            this.readDataBuku();
            this.readDataPeminjaman();
            this.readDataDonasi();
            this.readDataReservasi();
            this.dialogBuku = false;
            this.dialogPeminjaman = false;
            this.dialogDonasi = false;
            this.dialogReservasi = false;
            this.inputType = "Tambah";
        },
        resetForm() {
            this.formBuku = {
                judul: null,
                penulis: null,
                jumlah_halaman: null,
                tahun_terbit: null,
            },
            this.formPeminjaman = {
                tanggal_pinjam: null,
                tanggal_kembali: null,
            },
            this.formDonasi = {
                judul: null,
                penulis: null,
                jumlah_halaman: null,
                tahun_terbit: null,
            };
            this.formReservasi = {
                tanggal_reservasi: null,
                waktu_reservasi: null,
                jumlah_orang: null,
            };
        },
    },
    computed: {
        formTitle() {
            return this.inputType;
        },
    },
    mounted() {
        this.readDataBuku();
        this.readDataPeminjaman();
        this.readDataDonasi();
        this.readDataReservasi();
    },
};
</script>

<style>
#settingfont{
    color: white;
    font-weight: bolder;
}
</style>