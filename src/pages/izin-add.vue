<template>
  <f7-page>
    <f7-navbar title="Tambah Perizinan" back-link="Back">
      <f7-nav-right>
        <f7-link icon-ios="f7:save" icon-md="material:check" @click="submitForm"></f7-link>
      </f7-nav-right>
    </f7-navbar>
    <f7-block>
      <f7-list form id="form">
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Jenis Kegiatan</div>
            <!-- additional "input-dropdown-wrap" class -->
            <div class="item-input-wrap input-dropdown-wrap">
              <select v-model="selected">
                <option disabled value="">-- Pilih --</option>
                <option>Bazaar / Pasar malam dan sejenisnya</option>
                <option>Road race</option>
                <option>Sirkus</option>
                <option>Orkes / konser musik dan sejenisnya</option>
                <option>Pertunjukan Wayang / Ludruk dan sejenisnya</option>
                <option>Perorangan / pernikahan, khitanan atau lainnya</option>
                <option>Lainnya</option>
              </select>
            </div>
          </div>
        </li>
        <f7-list-input
            v-show="selected == 'Lainnya'"
            type="text"
            placeholder="Lainnya"
            :value="form.desk"
            @input="form.desk = $event.target.value"
            :required="selected == 'Lainnya'"
            validate
            clear-button
        >
        </f7-list-input>
        <f7-list-input
            label="Lokasi Kegiatan"
            type="textarea"
            placeholder="Misal: Jl. Jawa"
            :value="form.loc"
            @input="form.loc = $event.target.value"
            required
            validate
            clear-button
        >
        </f7-list-input>
        <li>
          <f7-row>
            <f7-col>
              <div class="item-content item-input">
                <div class="item-inner">
                  <div class="item-title item-label">Tanggal Mulai</div>
                  <div class="item-input-wrap">
                    <input type="date" :min="today" :value="form.tglmulai"
                    @input="form.tglmulai = $event.target.value"
                    required
                    validate
                    >
                  </div>
                </div>
              </div>
            </f7-col>
            <f7-col>
              <div class="item-content item-input">
                <div class="item-inner">
                  <div class="item-title item-label">Tanggal Selesai</div>
                  <div class="item-input-wrap">
                    <input type="date" :min="form.tglmulai" :value="form.tglend"
                    @input="form.tglend = $event.target.value"
                    required
                    validate
                    >
                  </div>
                </div>
              </div>
            </f7-col>
          </f7-row>
        </li>
        <li>
          <f7-row>
            <f7-col>
              <div class="item-content item-input">
                <div class="item-inner">
                  <div class="item-title item-label">Jam Mulai</div>
                  <div class="item-input-wrap">
                    <input type="time" :min="now" :value="form.jammulai"
                    @input="form.jammulai = $event.target.value"
                    required
                    validate
                    >
                  </div>
                </div>
              </div>
            </f7-col>
            <f7-col>
              <div class="item-content item-input">
                <div class="item-inner">
                  <div class="item-title item-label">Jam Selesai</div>
                  <div class="item-input-wrap">
                    <input type="time" :min="form.jammulai" :value="form.jamend"
                    @input="form.jamend = $event.target.value"
                    required
                    validate
                    >
                  </div>
                </div>
              </div>
            </f7-col>
          </f7-row>
        </li>
        <li>
          <f7-block-title>Lampiran</f7-block-title>
          <div class="item-content item-input">
            <div class="item-inner">
              <div class="item-title item-label">Surat Pengantar dari Kelurahan</div>
              <div class="item-input-wrap">
                <div style="padding: 20px;" class="image-upload" raised @click="$refs.actionsOneGroup.open()">
                    <f7-icon material="add_to_photos" size="70px" :class="{first: showPreview}"></f7-icon>
                    <img id="myimg" ref="myimg" style="max-width: 170px; max-height: 170px;" 
                    :class="{preview: showPreview}" 
                    :src="imagePreview" 
                    v-show="showPreview"/>
                    <!-- <span>{{filename}}</span> -->
                  <f7-actions ref="actionsOneGroup">
                    <f7-actions-group>
                      <f7-actions-label bold>Unggah Foto</f7-actions-label>
                      <f7-actions-button v-if="camera" @click="openGallery('surat')"><f7-icon material="collections"></f7-icon>Galeri</f7-actions-button>
                      <f7-actions-button v-else @click="openGalleryWeb('surat')"><f7-icon material="collections"></f7-icon>Galeri</f7-actions-button>
                      <f7-actions-button @click="takePicture('surat')"><f7-icon material="camera_alt"></f7-icon>Kamera</f7-actions-button>
                      <f7-actions-button color="red"><f7-icon material="cancel"></f7-icon>Cancel</f7-actions-button>
                    </f7-actions-group>
                  </f7-actions>
                  <input id="file" type="file" ref="file" accept="image/*" v-on:change="handleFileUpload()" />
                </div>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content item-input">
            <div class="item-inner">
              <div class="item-title item-label">Kartu Tanda Penduduk</div>
              <div class="item-input-wrap">
                <div style="padding: 20px;" class="image-upload" raised @click="$refs.actionsOneGroup2.open()">
                    <f7-icon material="add_to_photos" size="70px" :class="{first: showPreview2}"></f7-icon>
                    <img id="myimg" ref="myimg" style="max-width: 170px; max-height: 170px;" 
                    :class="{preview: showPreview2}" 
                    :src="imagePreview2" 
                    v-show="showPreview2"/>
                    <!-- <span>{{filename}}</span> -->
                  <f7-actions ref="actionsOneGroup2">
                    <f7-actions-group>
                      <f7-actions-label bold>Unggah Foto</f7-actions-label>
                      <f7-actions-button v-if="camera" @click="openGallery('ktp')"><f7-icon material="collections"></f7-icon>Galeri</f7-actions-button>
                      <f7-actions-button v-else @click="openGalleryWeb('ktp')"><f7-icon material="collections"></f7-icon>Galeri</f7-actions-button>
                      <f7-actions-button @click="takePicture('ktp')"><f7-icon material="camera_alt"></f7-icon>Kamera</f7-actions-button>
                      <f7-actions-button color="red"><f7-icon material="cancel"></f7-icon>Cancel</f7-actions-button>
                    </f7-actions-group>
                  </f7-actions>
                  <input id="file2" type="file" ref="file2" accept="image/*" v-on:change="handleFileUpload2()" />
                </div>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content item-input">
            <div class="item-inner">
              <div class="item-title item-label">Kartu Keluarga</div>
              <div class="item-input-wrap">
                <div style="padding: 20px;" class="image-upload" raised @click="$refs.actionsOneGroup3.open()">
                    <f7-icon material="add_to_photos" size="70px" :class="{first: showPreview3}"></f7-icon>
                    <img id="myimg" ref="myimg" style="max-width: 170px; max-height: 170px;" 
                    :class="{preview: showPreview3}" 
                    :src="imagePreview3" 
                    v-show="showPreview3"/>
                    <!-- <span>{{filename}}</span> -->
                  <f7-actions ref="actionsOneGroup3">
                    <f7-actions-group>
                      <f7-actions-label bold>Unggah Foto</f7-actions-label>
                      <f7-actions-button v-if="camera" @click="openGallery('kk')"><f7-icon material="collections"></f7-icon>Galeri</f7-actions-button>
                      <f7-actions-button v-else @click="openGalleryWeb('kk')"><f7-icon material="collections"></f7-icon>Galeri</f7-actions-button>
                      <f7-actions-button @click="takePicture('kk')"><f7-icon material="camera_alt"></f7-icon>Kamera</f7-actions-button>
                      <f7-actions-button color="red"><f7-icon material="cancel"></f7-icon>Cancel</f7-actions-button>
                    </f7-actions-group>
                  </f7-actions>
                  <input id="file3" type="file" ref="file3" accept="image/*" v-on:change="handleFileUpload3()" />
                </div>
              </div>
            </div>
          </div>
        </li>
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
        type: '',
        file: '',
        file2: '',
        file3: '',
        showPreview: false,
        imagePreview: '',
        showPreview2: false,
        imagePreview2: '',
        showPreview3: false,
        imagePreview3: '',

        // user
        idUser: '',

        // form
        form: {
          desk: '',
          loc: '',
          tglmulai: null,
          tglend: null,
          jammulai: null,
          jamend: null
        },

        selected: '',

        today: null,
        now: null,

        //camera
        camera: navigator.camera
      }
    },
    created() {
      let decode = this.$jwt.decode();
      this.idUser = decode.userId;
      // Listen to Cordova's backbutton event
      document.addEventListener('backbutton', this.navigateBack , false);
      let date = new Date();
      let newdate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
      let jam = ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
      console.log(jam);
      this.today = newdate;
      this.now = jam;
      this.form.tglmulai = newdate;
      this.form.tglend = newdate;
      this.form.jammulai = jam;
      this.form.jamend = jam;
    },
    methods: {
      navigateBack() {
        let app = this.$f7;
        let $$ = this.$$;
        // Use Framework7's router to navigate back
        let mainView = app.views.main;          
        if (app.views.main.router.url == '/home/tab1') {
            navigator.app.exitApp();
        } else {
          mainView.router.back('', {
            force: true
          });
        }
      },
      default(){
        console.log('defaultCallback');
        
      },
      openGalleryWeb(string){
        if (string == 'surat') {
          document.getElementById('file').click();
          this.$refs.actionsOneGroup.close();
          console.log('surat');
          
        } else if (string == 'ktp') {
          document.getElementById('file2').click();
          this.$refs.actionsOneGroup2.close();
          console.log('ktp');
          
        } else {
          document.getElementById('file3').click();
          this.$refs.actionsOneGroup3.close();
          console.log('kk');
        }
      },
      //get photo from gallery
      openGallery(string){
        if (string == 'surat') {
          this.type = 'surat';
        } else if (string == 'ktp') {
          this.type = 'ktp';
        } else if (string == 'kk') {
          this.type = 'kk';
        }
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
      takePicture(string) {
        if (string == 'surat') {
          this.type = 'surat';
        } else if (string == 'ktp') {
          this.type = 'ktp';
        } else if (string == 'kk') {
          this.type = 'kk';
        }
        if (navigator.camera) {
          navigator.camera.getPicture(this.setPicture, this.error, {
            quality: 80,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            mediaType: Camera.MediaType.PICTURE,
            encodingType: Camera.EncodingType.JPEG,
            cameraDirection: Camera.Direction.BACK,
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
        if (this.type == 'surat') {
          console.log('surat');
          this.$f7.preloader.show();
          this.imagePreview = imagePath;
          this.showPreview = true;

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
        } else if (this.type == 'ktp') {
          console.log('ktp');
          this.$f7.preloader.show();
          this.imagePreview2 = imagePath;
          this.showPreview2 = true;

          window.resolveLocalFileSystemURL(imagePath, 
            function(fileEntry){
                //alert("got image file entry: " + fileEntry.fullPath);
                //self.filename = fileEntry.fullPath.replace("/", "");
                fileEntry.file(function(file){ //should return a raw HTML File Object
                  let reader = new FileReader();
                      reader.onloadend = function(e) {
                      let imgBlob = new Blob([ this.result ], { type: "image/jpeg" } );
                      self.file2 = imgBlob;
                  };
                  reader.readAsArrayBuffer(file); // or the way you want to read it
                  console.log('dari kamera: ', file);
                  self.$f7.preloader.hide();
                }, 
                self.error); 
            },
            this.error
          );
        } else if (this.type == 'kk') {
          console.log('kk');
          this.$f7.preloader.show();
          this.imagePreview3 = imagePath;
          this.showPreview3 = true;

          window.resolveLocalFileSystemURL(imagePath, 
            function(fileEntry){
                //alert("got image file entry: " + fileEntry.fullPath);
                //self.filename = fileEntry.fullPath.replace("/", "");
                fileEntry.file(function(file){ //should return a raw HTML File Object
                  let reader = new FileReader();
                      reader.onloadend = function(e) {
                      let imgBlob = new Blob([ this.result ], { type: "image/jpeg" } );
                      self.file3 = imgBlob;
                  };
                  reader.readAsArrayBuffer(file); // or the way you want to read it
                  console.log('dari kamera: ', file);
                  self.$f7.preloader.hide();
                }, 
                self.error); 
            },
            this.error
          );
        } else {
          console.log('else');
          
        }
      },
      error(err){
        self.$f7.dialog.alert(error.message, 'Terjadi Kesalahan'); 
        this.$f7.dialog.close();
      },
      async submitForm() {
            try {
              if (document.getElementById('form').checkValidity() == false || this.file == '' || this.file2 == '' || this.file3 == '') {
                this.$f7.dialog.alert('Lengkapi pengisan form', 'Terjadi Kesalahan');
              } else {
                let formData = new FormData();

                /*Add the form data we need to submit*/
                formData.append('desk', this.form.desk ? this.form.desk : this.selected);
                formData.append('loc', this.form.loc);
                formData.append('tglmulai', this.form.tglmulai);
                formData.append('tglend', this.form.tglend);
                formData.append('jammulai', this.form.jammulai);
                formData.append('jamend', this.form.jamend);
                formData.append('fotoSurat', this.file);
                formData.append('fotoKTP', this.file2);
                formData.append('fotoKK', this.file3);

                // Display the key/value pairs
                for (var pair of formData.entries()) {
                    console.log(pair[0]+ ': ' + pair[1]); 
                }

                this.$f7.preloader.show();
                let result = await axios().post('/izin/', formData);
                let notif = await axios().post('/notif/', {
                  id: this.idUser,
                  user: 30,
                  kode: result.data.values.insertId,
                  tipe: 'Izin Penggunaan Jalan',
                  desk:  `Izin penggunaan jalan baru telah masuk`,
                  status: 'Aktif'
                });
                this.$f7.preloader.hide();
                this.openToast('Berhasil menambahkan izin penggunaan jalan'); 
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
      },
      handleFileUpload3(){
        /*
          Set the local file variable to what the user has selected.
        */
        this.file3 = this.$refs.file3.files[0];

        /*
          Initialize a File Reader object
        */
        let reader3  = new FileReader();

        /*
          Add an event listener to the reader that when the file
          has been loaded, we flag the show preview as true and set the
          image to be what was read from the reader.
        */
        reader3.addEventListener("load", function () {
          this.showPreview3 = true;
          this.imagePreview3 = reader3.result;
        }.bind(this), false);

        /*
          Check to see if the file is not empty.
        */
        if( this.file3 ){
          /*
            Ensure the file is an image file.
          */
          if ( /\.(jpe?g|png|gif)$/i.test( this.file3.name ) ) {
            /*
              Fire the readAsDataURL method which will read the file in and
              upon completion fire a 'load' event which we will listen to and
              display the image in the preview.
            */
            reader3.readAsDataURL( this.file3 );
          }
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
    },
    beforeDestroy () {
        document.removeEventListener("backbutton", this.navigateBack);
    },
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
