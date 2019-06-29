<template>
  <f7-page>
    <f7-navbar title="Registrasi" back-link="Back">
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
                defaultValue="2014-04-30"
                placeholder="-Pilih-"
                :value="tgl"
                @input="tgl = $event.target.value"
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

            <f7-list-input
                label="Password"
                name="pass"
                type="password"
                placeholder="Password"
                error-message="Password harus diisi"
                :value="pass"
                @input="pass = $event.target.value"
                minlength=8
                info="Password minimal 8 karakter"
                required
                validate
                clear-button
            ></f7-list-input>
            <f7-list-input
                label="Konfirmasi Password"
                name="confpass"
                type="password"
                placeholder="Konfirmasi Password"
                :value="confpass"
                @input="confpass = $event.target.value"
                @change="checkPass"
                :error-message-force = errorforce
                :error-message="err"
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
    data() {
        return {
            // uploads
            filename: '',
            file: null,
            showPreview: false,
            imagePreview: defaultImg,

            nama: null,
            alamat: null,
            telepon: null,
            jk: 'Laki-laki',
            tgl: '2014-04-30',
            email: null,
            pass: null,
            confpass: null,
            err: 'Konfirmasi Password harus diisi',
            errorforce: false,

            //camera
            camera: navigator.camera
            
        }
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
                let reader = new FileReader();
                    reader.onloadend = function(e) {
                    let imgBlob = new Blob([ this.result ], { type: "image/jpeg" } );
                    self.file = imgBlob;
                };
                reader.readAsArrayBuffer(file); // or the way you want to read it
                console.log('dari kamera: ', file);
                self.$f7.preloader.hide();
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
                if (this.errorforce == true) {
                    this.errorforce = false;
                    
                } else {                
                    let formData = new FormData();

                    /*Add the form data we need to submit*/
                    formData.append('nama', this.nama);
                    formData.append('alamat', this.alamat);
                    formData.append('telp', this.telepon);
                    formData.append('fotoUser', this.file);
                    formData.append('tgl', this.tgl);
                    formData.append('email', this.email);
                    formData.append('pass', this.pass);

                    // Display the key/value pairs
                    for (var pair of formData.entries()) {
                        console.log(pair[0]+ ': ' + pair[1]); 
                    }
                    
                    try {
                        let user = await axios().post('/user/register/', formData);
                        console.log('SUCCESS!!', user.data);
                        if (user.data.status == 500) {
                            this.$f7.dialog.alert(user.data.values, 'Terjadi Kesalahan');
                        } else {
                            this.openToast('Berhasil melakukan registrasi'); 
                            this.$f7router.navigate('/login/');
                        }
                    } catch (error) {
                        console.log('ERROR!!', error);
                        this.$f7.dialog.alert(error.message, 'Terjadi Kesalahan'); 
                    }
                }
            }
        },
        checkPass() {            
            if (this.pass != this.confpass) {
                this.errorforce = true;
                this.err = "Password tidak sesuai"
            } else {
                this.errorforce = false;
                this.err = "Konfirmasi Password harus diisi"
            }
        },
        openToast(text) {
            console.log(text);
            
            this.toastBottom = this.$f7.toast.create({
                text: text,
                closeTimeout: 3000,
            });
            
            // Open it
            this.toastBottom.open();
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
