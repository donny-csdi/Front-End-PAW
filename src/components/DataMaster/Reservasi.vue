<template>
    <v-main class="list">
        <h3 class="text-h3 font-weight-medium mb-5" id="settingfont"><b>Reservasi Tempat</b> </h3>

        <v-card>
            <v-card-title>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                <v-spacer></v-spacer>
                <v-btn color="success" dark @click="dialog = true">Buat Reservasi</v-btn>
            </v-card-title>
            <v-data-table :headers="headers" :items="reservasis" :search="search">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn small class="mr-2" icon color="red" @click="editHandler(item)"><v-icon>mdi-pencil</v-icon></v-btn>
                    <v-btn small icon color="green" @click="deleteHandler(item)"><v-icon>mdi-delete</v-icon></v-btn>
                </template>
            </v-data-table>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title class="justify-center" >
                    <span class="headline">{{ formTitle }} Reservasi</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-card-text>Tanggal Reservasi</v-card-text>
                        <v-date-picker
                            v-model="form.tanggal_reservasi"
                            label="Nama Kelas"
                            required>
                        </v-date-picker>
                        
                        <v-select
                            v-model="form.waktu_reservasi"
                            :items="waktu"
                            label="Waktu Reservasi"
                            required>
                        </v-select>

                        <v-text-field
                            v-model="form.jumlah_orang"
                            label="Jumlah Orang"
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
                <v-card-text>Anda yakin ingin membatalkan reservasi ini?</v-card-text>
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
                { text: "Tanggal Reservasi", align: "start", sortable: true, value: "tanggal_reservasi" },
                { text: "Waktu Reservasi", value: "waktu_reservasi" },
                { text: "Jumlah Orang", value: "jumlah_orang" },
                { text: "Actions", value: "actions" },
            ],
            reservasi: new FormData,
            reservasis: [],
            form: {
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
            var url = this.$api + "/reservasi/get/" + localStorage.getItem("id");
            this.$http.get(url, {
                headers: {
                    "Authorization" : "Bearer " + localStorage.getItem("token")
                }
            }).then(response => {
                this.reservasis = response.data.data;
            })
        },
        save() {
            this.form.id_user = localStorage.getItem("id")
           
            var url = this.$api + "/reservasi/"
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
                tanggal_reservasi: this.form.tanggal_reservasi,
                waktu_reservasi: this.form.waktu_reservasi,
                jumlah_orang: this.form.jumlah_orang,
                id_user: this.form.id_user
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
            this.editId = item.id_reservasi;
            this.form.tanggal_reservasi = item.tanggal_reservasi;
            this.form.waktu_reservasi = item.waktu_reservasi;
            this.form.jumlah_orang = item.jumlah_orang;
            this.form.id_user = localStorage.getItem("id");
            this.dialog = true;
        },
        deleteHandler(item) {
            this.deleteId = item.id_reservasi;
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
        this.readData();
    },
};
</script>
<style>
.headline{
    text-align: center;
}
#settingfont{
    color: white;
    font-weight: bolder;
}
</style>