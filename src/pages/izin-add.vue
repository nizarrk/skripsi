<template>
  <f7-page>
    <f7-navbar title="Tambah Perizinan" back-link="Back">
      <f7-nav-right>
        <f7-link icon-ios="f7:save" icon-md="material:check" @click="submitForm"></f7-link>
      </f7-nav-right>
    </f7-navbar>
    <f7-block>
      <center>
        <f7-row no-gap>
          <f7-col>
            <f7-block-title>Surat Lurah</f7-block-title>
            <div class="image-upload" raised @click="$refs.actionsOneGroup.open()">
                <f7-icon material="add_to_photos" size="100px" :class="{first: showPreview}"></f7-icon>
                <img id="myimg" ref="myimg" style="max-width: 170px; max-height: 170px;" 
                :class="{preview: showPreview}" 
                :src="imagePreview" 
                v-show="showPreview"/>
                <!-- <span>{{filename}}</span> -->
              <f7-actions ref="actionsOneGroup">
                <f7-actions-group>
                  <f7-actions-label bold>Unggah Foto</f7-actions-label>
                  <f7-actions-button v-if="camera" @click="openGallery"><f7-icon material="collections"></f7-icon>Galeri</f7-actions-button>
                  <f7-actions-button v-else @click="openGalleryWeb('surat')"><f7-icon material="collections"></f7-icon>Galeri</f7-actions-button>
                  <f7-actions-button @click="takePicture"><f7-icon material="camera_alt"></f7-icon>Kamera</f7-actions-button>
                  <f7-actions-button color="red"><f7-icon material="cancel"></f7-icon>Cancel</f7-actions-button>
                </f7-actions-group>
              </f7-actions>
              <input id="file" type="file" ref="file" accept="image/*" v-on:change="handleFileUpload()" required validate />
            </div>
          </f7-col>
          <f7-col>
            <f7-block-title>Kartu Tanda Penduduk</f7-block-title>
            <div class="image-upload" raised @click="$refs.actionsOneGroup2.open()">
                <f7-icon material="add_to_photos" size="100px" :class="{first: showPreview2}"></f7-icon>
                <img id="myimg" ref="myimg" style="max-width: 170px; max-height: 170px;" 
                :class="{preview: showPreview2}" 
                :src="imagePreview2" 
                v-show="showPreview2"/>
                <!-- <span>{{filename}}</span> -->
              <f7-actions ref="actionsOneGroup2">
                <f7-actions-group>
                  <f7-actions-label bold>Unggah Foto</f7-actions-label>
                  <f7-actions-button v-if="camera" @click="openGallery"><f7-icon material="collections"></f7-icon>Galeri</f7-actions-button>
                  <f7-actions-button v-else @click="openGalleryWeb('ktp')"><f7-icon material="collections"></f7-icon>Galeri</f7-actions-button>
                  <f7-actions-button @click="takePicture"><f7-icon material="camera_alt"></f7-icon>Kamera</f7-actions-button>
                  <f7-actions-button color="red"><f7-icon material="cancel"></f7-icon>Cancel</f7-actions-button>
                </f7-actions-group>
              </f7-actions>
              <input id="file2" type="file" ref="file2" accept="image/*" v-on:change="handleFileUpload2()" required validate />
            </div>
          </f7-col>
        </f7-row>
      </center>
    </f7-block>
    <f7-block>
        <f7-list form id="form">
            <f7-list-input
                label="Deskripsi Izin Penggunaan Jalan"
                type="textarea"
                placeholder="Deskripsi"
                :value="desk"
                @input="desk = $event.target.value"
                required
                validate
                clear-button
            >
            </f7-list-input>
        </f7-list>
    </f7-block>   
  </f7-page>
</template>

<script>
import axios from '../config/axiosConfig';

  export default {
    /*
      Defines the data used by the component
    */
    data(){
      return {
        baseURL: 'http://192.168.1.12:3000',
        file: '',
        file2: '',
        showPreview: false,
        imagePreview: '',
        showPreview2: false,
        imagePreview2: '',
        desk: null,
        //camera
        camera: navigator.camera
      }
    },

    methods: {
      default(){
        console.log('defaultCallback');
        
      },
      openGalleryWeb(string){
        if (string == 'surat') {
          document.getElementById('file').click();
          this.$refs.actionsOneGroup.close();
          console.log('surat');
          
        } else {
          document.getElementById('file2').click();
          this.$refs.actionsOneGroup2.close();
          console.log('ktp');
          
        }
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
      async submitForm() {
            try {
              if (this.file =='' || this.file2 == '' || this.desk == null) {
                this.$f7.input.validateInputs(document.getElementsByTagName('input'));
                this.$f7.dialog.alert('Harap lengkapi pengisian form', 'Terjadi Kesalahan');
              } else {
                let formData = new FormData();

                /*Add the form data we need to submit*/
                formData.append('fotoSurat', this.file);
                formData.append('fotoKTP', this.file2);
                formData.append('desk', this.desk);

                // Display the key/value pairs
                for (var pair of formData.entries()) {
                    console.log(pair[0]+ ': ' + pair[1]); 
                }


                let result = await axios().post('/izin/', formData);
                console.log(result.data);
                this.$f7.dialog.alert(result.statusText, 'Berhasil'); 
                this.$f7router.back('', {
                  force: true
                });
                }
            } catch (error) {
              console.log(error.message);
                
            }
        },
      /*
        Handles a change on the file upload
      */
      handleFileUpload(){
        /*
          Set the local file variable to what the user has selected.
        */
        this.file = this.$refs.file.files[0];

        /*
          Initialize a File Reader object
        */
        let reader  = new FileReader();

        /*
          Add an event listener to the reader that when the file
          has been loaded, we flag the show preview as true and set the
          image to be what was read from the reader.
        */
        reader.addEventListener("load", function () {
          this.showPreview = true;
          this.imagePreview = reader.result;
        }.bind(this), false);

        /*
          Check to see if the file is not empty.
        */
        if( this.file ){
          /*
            Ensure the file is an image file.
          */
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
      /*
        Handles a change on the file upload
      */
      handleFileUpload2(){
        /*
          Set the local file variable to what the user has selected.
        */
        this.file2 = this.$refs.file2.files[0];

        /*
          Initialize a File Reader object
        */
        let reader2  = new FileReader();

        /*
          Add an event listener to the reader that when the file
          has been loaded, we flag the show preview as true and set the
          image to be what was read from the reader.
        */
        reader2.addEventListener("load", function () {
          this.showPreview2 = true;
          this.imagePreview2 = reader2.result;
        }.bind(this), false);

        /*
          Check to see if the file is not empty.
        */
        if( this.file2 ){
          /*
            Ensure the file is an image file.
          */
          if ( /\.(jpe?g|png|gif)$/i.test( this.file2.name ) ) {
            /*
              Fire the readAsDataURL method which will read the file in and
              upon completion fire a 'load' event which we will listen to and
              display the image in the preview.
            */
            reader2.readAsDataURL( this.file2 );
          }
        }
      }
    }
  }
</script>
<style scoped>
.image-upload>input {
  display: none; 
}

.preview {
  display: block;
}

.first {
  display: none;
}
</style>
