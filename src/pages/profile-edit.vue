<template>
  <f7-page>
    <f7-navbar title="Edit Profil" back-link="Back">
        <f7-nav-right>
            <f7-link icon-ios="f7:save" icon-md="material:check" @click="formSubmit"></f7-link>
          </f7-nav-right>
    </f7-navbar>
    <f7-block>
        <center>
            <img style="border-radius:50px; max-width: 100px;" 
            :src="imagePreview" /><br>
            <span>{{filename}}</span>
            <!-- <f7-link style="margin-left:-20px;" href="#"><f7-icon ios="f7:camera" md="material:camera_alt" size="34px"></f7-icon></f7-link> -->
            <f7-button style="text-transform: capitalize" @click="$refs.actionsOneGroup.open()">Pilih Foto</f7-button>
            <f7-actions ref="actionsOneGroup">
              <f7-actions-group>
                <f7-actions-label bold>Unggah Foto</f7-actions-label>
                <f7-actions-button bold v-if="camera" @click="openGallery"><f7-icon material="collections"></f7-icon>Galeri</f7-actions-button>
                <f7-actions-button bold v-else @click="openGalleryWeb"><f7-icon material="collections"></f7-icon>Galeri</f7-actions-button>
                <f7-actions-button bold @click="takePicture"><f7-icon material="camera_alt"></f7-icon>Kamera</f7-actions-button>
                <f7-actions-button bold color="red"><f7-icon material="cancel"></f7-icon>Cancel</f7-actions-button>
              </f7-actions-group>
            </f7-actions>
            <input style="display: none;" id="file-input" type="file" ref="file" accept="image/*" v-on:change="handleFileUpload()" required validate />
        </center>
        <f7-list form class="form-ajax-submit" id="form">
            <f7-list-input
                label="Nama"
                name="nama"
                type="text"
                placeholder="Nama"
                error-message="Nama harus diisi"
                :value="nama"
                @input="nama = $event.target.value"
                required
                validate
                clear-button
            ></f7-list-input>
            
            <f7-list-input
                label="Alamat"
                name="alamat"
                type="text"
                placeholder="Alamat"
                error-message="Alamat harus diisi"
                :value="alamat"
                @input="alamat = $event.target.value"
                required
                validate
                clear-button
            ></f7-list-input>

            <f7-list-input
                label="Telepon"
                name="telp"
                type="tel"
                placeholder="Telepon"
                error-message="Telepon harus diisi"
                :value="telepon"
                @input="telepon = $event.target.value"
                required
                validate
                pattern="[0-9]*"
                clear-button
            ></f7-list-input>

            <f7-list-input
                label="Jenis Kelamnin"
                name="jk"
                type="select"
                defaultValue="Laki-laki"
                placeholder="-Pilih-"
                @input="jk = $event.target.value"
                required
                validate
            >
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
            </f7-list-input>

            <f7-list-input
                label="Tanggal Lahir"
                name="tgl"
                type="date"
                placeholder="-Pilih-"
                :value="tgl"
                required
                validate
            >
            </f7-list-input>

            <f7-list-input
                label="Email"
                name="email"
                type="email"
                placeholder="Email"
                :value="email"
                @input="email = $event.target.value"
                error-message="Email harus diisi"
                required
                validate
                clear-button
            ></f7-list-input>
        </f7-list>
    </f7-block>
  </f7-page>
</template>

<script>
import axios from '../config/axiosConfig';
import defaultImg from '../static/defaultuser.jpg'

export default {
    props: {
        id: String
    },
    data() {
        return {
            baseURL: 'http://192.168.1.12:3000',
            // uploads
            filename: '',
            file: null,
            showPreview: false,
            imagePreview: null,

            nama: null,
            alamat: null,
            telepon: null,
            jk: 'Laki-laki',
            tgl: null,
            email: null,
            oldemail: null,
            path: null,

            //camera
            camera: navigator.camera
            
        }
    },
    async created() {
        this.$f7.preloader.show();
        let result = await axios().get('/user/profile');
        this.$f7.preloader.hide();
        //console.log(result.data.values);

        this.nama = result.data.values[0].nama_user;
        this.alamat = result.data.values[0].alamat_user;
        this.telepon = result.data.values[0].telp_user;
        let date = new Date(result.data.values[0].tgl_lahir_user);
        let newdate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        console.log(newdate);
        
        this.tgl = newdate;
        this.email = result.data.values[0].email_user;
        this.oldemail = result.data.values[0].email_user;
        this.path = result.data.values[0].foto_user;
        this.imagePreview = this.baseURL + result.data.values[0].foto_user;
        console.log(this.imagePreview);
    },
    methods: {
        default(){
        console.log('defaultCallback');
        
        },
        openGalleryWeb(){
            document.getElementById('file-input').click();
            this.$refs.actionsOneGroup.close();
        },
        //get photo from gallery
        openGallery(){
            if (navigator.camera){
                // Retrieve image file location from specified source
                navigator.camera.getPicture(this.setPicture, this.error, { 
                quality: 80,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM 
                });
            }else{
                this.error;
            }
        },
        // Use the camera plugin to capture image
        takePicture() {
            if (navigator.camera) {
            navigator.camera.getPicture(this.setPicture, this.error, {
                quality: 80,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.CAMERA,
                mediaType: Camera.MediaType.PICTURE,
                encodingType: Camera.EncodingType.JPEG,
                cameraDirection: Camera.Direction.BACK,
                targetWidth: 300,
                targetHeight: 400
            });
            }else{
            // If the navigator.camera is not available display generic error to the user.
            this.error();
            }
        },
        // Set the picture path in the data of the vue
        // this action will automatically update the view.
        setPicture(imagePath){
            let self = this;
            this.$f7.preloader.show();
            this.imagePreview = imagePath;
            this.showPreview = false;

            window.resolveLocalFileSystemURL(imagePath, 
            function(fileEntry){
                //alert("got image file entry: " + fileEntry.fullPath);
                //self.filename = fileEntry.fullPath.replace("/", "");
                fileEntry.file(function(file){ //should return a raw HTML File Object
                    console.log('dari kamera: ', file);
                    self.getLocation(file);
                }, 
                self.error); 
            },
            this.error
            );          
        },
        error(err){
            if(navigator.notification){
                navigator.notification.alert(err, this.default, "Error!");
                this.$f7.dialog.close();
            }else{
                self.$f7.dialog.alert(error.message, 'Terjadi Kesalahan'); 
                this.$f7.dialog.close();
                }
        },
        /*Handles a change on the file upload*/
        handleFileUpload(){
            this.$refs.actionsOneGroup.close();
            let self = this;
            /*Set the local file variable to what the user has selected.*/
            this.file = this.$refs.file.files[0];

            /*Initialize a File Reader object*/
            var reader  = new FileReader();

            /*
            Add an event listener to the reader that when the file
            has been loaded, we flag the show preview as true and set the
            image to be what was read from the reader.
            */
            reader.addEventListener("load", function () {
            this.showPreview = true;
            this.imagePreview = reader.result;
            //console.log(reader.result);
            
            this.filename = this.$refs.file.value.replace("C:\\fakepath\\", "");
            }.bind(this), false);
            
            /*Check to see if the file is not empty.*/
            if( this.file ){
            /*Ensure the file is an image file.*/
            if ( /\.(jpe?g|png|gif)$/i.test( this.file.name ) ) {
                /*
                Fire the readAsDataURL method which will read the file in and
                upon completion fire a 'load' event which we will listen to and
                display the image in the preview.
                */
                reader.readAsDataURL( this.file );
                }
            }
        },
        async formSubmit() {
            if (document.getElementById('form').checkValidity() == false) {
                this.$f7.input.validateInputs(document.getElementById('form'));
            } else {            
                    let formData = new FormData();

                    /*Add the form data we need to submit*/
                    formData.append('nama', this.nama);
                    formData.append('alamat', this.alamat);
                    formData.append('telp', this.telepon);
                    formData.append('fotoUser', this.file);
                    formData.append('path', this.path);
                    formData.append('tgl', this.tgl);
                    formData.append('email', this.email);
                    formData.append('oldemail', this.oldemail);
                    

                    // Display the key/value pairs
                    for (var pair of formData.entries()) {
                        console.log(pair[0]+ ': ' + pair[1]); 
                    }
                    
                    try {
                        let user = await axios().put('/user/' + this.id, formData);
                        console.log('SUCCESS!!', user.data);
                        if (user.data.status == 500) {
                            this.$f7.dialog.alert(user.data.values, 'Terjadi Kesalahan');
                        } else {
                            this.$f7.dialog.alert(user.statusText, 'Berhasil'); 
                            this.$f7router.back('/home/tab5/', {
                                force: true
                            });
                        }
                    } catch (error) {
                        console.log('ERROR!!', error);
                        this.$f7.dialog.alert(error.message, 'Terjadi Kesalahan'); 
                    }
            }
        },
        checkPass() {            
            if (this.pass != this.confpass) {
                this.errorforce = true;
                this.error = "Password tidak sesuai"
            } else {
                this.errorforce = false;
                this.error = "Konfirmasi Password harus diisi"
            }
        }
    }
}
</script>
<style scoped>
.preview {
  display: block;
}

.first {
  display: none;
}
</style>
