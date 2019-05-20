<template>
  <f7-page>
    <f7-navbar title="Lapor" back-link="Back">
      <f7-nav-right>
        <f7-link icon-ios="f7:save" icon-md="material:check" @click="submitFile"></f7-link>
      </f7-nav-right>
    </f7-navbar>
    <f7-block-title>Unggah Foto</f7-block-title>
      <f7-block>
        <center>
          <div class="image-upload" raised @click="$refs.actionsOneGroup.open()">
              <f7-icon material="camera_alt" size="100px" v-bind:class="{first: showPreview}"></f7-icon>
              <img id="myimg" ref="myimg" style="max-width: 200px; max-height: 200px;" 
              v-bind:class="{preview: showPreview}" 
              v-bind:src="imagePreview" 
              v-show="showPreview"/>
              <span>{{filename}}</span>
            <f7-actions ref="actionsOneGroup">
              <f7-actions-group>
                <f7-actions-label bold>Unggah Foto</f7-actions-label>
                <f7-actions-button v-if="camera" @click="openGallery">Galeri</f7-actions-button>
                <f7-actions-button v-else @click="openGalleryWeb">Galeri</f7-actions-button>
                <f7-actions-button @click="takePicture">Kamera</f7-actions-button>
                <f7-actions-button bold color="red">Cancel</f7-actions-button>
              </f7-actions-group>
            </f7-actions>
            <input id="file-input" type="file" ref="file" accept="image/*" v-on:change="handleFileUpload()" required validate />
          </div>
          <!-- <div>
                <vue-json-pretty
                  :path="'res'"
                  :data="{ metadata }"
                  :options="{maxDepth: 3}">
                </vue-json-pretty>
              </div> -->
        </center>
      </f7-block>
      <f7-block-title>Kategori</f7-block-title>
      <f7-block>
        <center>
          <f7-row>
            <f7-col>
              <div>
                <label>
                  <input type="radio" name="kat" v-model="kat" value="Angkutan Umum">
                  <f7-icon material="directions_bus" size="30px"></f7-icon>
                </label>
              </div>
              <span style="font-size:11px;">Angkutan Umum</span>
            </f7-col>
            <f7-col>
              <div>
                <label>
                  <input type="radio" name="kat" v-model="kat" value="Lalu Lintas">
                  <f7-icon material="traffic" size="30px"></f7-icon>
                </label>
              </div>
              <span style="font-size:11px;">Lalu Lintas</span>
            </f7-col>
            <f7-col>
              <div>
                <label>
                  <input type="radio" name="kat" v-model="kat" value="Perparkiran">
                  <f7-icon material="local_parking" size="30px"></f7-icon>
                </label>
              </div>
              <span style="font-size:11px;">Perparkiran</span>
            </f7-col>
          </f7-row>
          <f7-row style="margin-top:10px;">
            <f7-col>
              <div>
                <label>
                  <input type="radio" name="kat" v-model="kat" value="Infrastruktur">
                  <f7-icon material="language" size="30px"></f7-icon>
                </label>
              </div>
              <span style="font-size:11px;">Infrastruktur</span>
            </f7-col>
            <f7-col>
              <div>
                <label>
                  <input type="radio" name="kat" v-model="kat" value="Pengendalian Operasi">
                  <f7-icon material="directions_walk" size="30px"></f7-icon>
                </label>
              </div>
              <span style="font-size:11px;">Pengendalian Operasi</span>
            </f7-col>
            <f7-col>
              <div>
                <label>
                  <input type="radio" name="kat" v-model="kat" value="Layanan">
                  <f7-icon material="people" size="30px"></f7-icon>
                </label>
              </div>
              <span style="font-size:11px;">Layanan</span>
            </f7-col>
          </f7-row>
        </center>
      </f7-block>
      <f7-block-title>Lokasi</f7-block-title>
      <f7-block>
        <l-map style="height: 200px;" id="map" ref="myMap" :zoom="zoom" :center="center">
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <l-marker id="marker"
          v-bind:class="{preview: showPreview}"
          v-show="address" 
          :lat-lng="marker" 
          @click="removeMarker()">
            <l-popup>{{address}}</l-popup>
          </l-marker>
        </l-map>
        <f7-icon v-show="address != null" md="material:place"></f7-icon><span style="font-size:11px;">{{address}}</span>
      </f7-block>
      <f7-block-title>Deskripsi</f7-block-title>
      <f7-block>
        <div class="list inline-labels no-hairlines-md">
          <ul>
            <li class="item-content item-input">
              <div class="item-inner">
                <div class="item-input-wrap">
                  <textarea v-model="desk" placeholder="Deskripsi Laporan"></textarea>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </f7-block>
  </f7-page>
</template>

<script>
import axios from 'axios';
import {LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';
import * as geocoding from 'esri-leaflet-geocoder';
import * as EXIF from 'exif-js';
import VueJsonPretty from 'vue-json-pretty'

var geocodeService = geocoding.geocodeService();

  export default {
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LPopup,
        VueJsonPretty
    },
    /*
      Defines the data used by the component
    */
    data(){
      return {
        //leaflet
        zoom:13,
        center: L.latLng(-7.484621, 112.434517),
        url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        marker: L.latLng(0, 0), 
        address: null,

        //upload
        filename: '',
        file: '',
        showPreview: false,
        imagePreview: '',

        //axios
        kat: '',
        desk: '',
        lat: null,
        lng: null,

        //exif
        metadata: null,

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
        this.$f7.dialog.preloader();
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
              alert(err);
              this.$f7.dialog.close();
            }
      },
      /*Submits the file to the server*/
      submitFile(){
        /*Initialize the form data*/
            let formData = new FormData();

            /*Add the form data we need to submit*/
            formData.append('userid', 1);
            formData.append('kat', this.kat);
            formData.append('fotoLapor', this.file);
            formData.append('desk', this.desk);
            formData.append('lat', this.lat);
            formData.append('long', this.lng);
            formData.append('lokasi', this.address);
            formData.append('vote', "");

            // Display the key/value pairs
            for (var pair of formData.entries()) {
                console.log(pair[0]+ ': ' + pair[1]); 
            }
            

        /*Make the request to the POST /single-file URL*/
            axios.post('http://localhost:3000/lapor/',
                formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              }
            ).then(function(response){
          console.log('SUCCESS!!', response);
          alert("sukses");
        })
        .catch(function(error){
          console.log('FAILURE!!', error.message);
          alert("gagal");
        });
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
        this.getLocation(this.file);  
      },
      getLocation(file){
        let self = this;
        EXIF.getData(file, function() {
          self.metadata = this.exifdata;

          axios.post('http://localhost:3000/lapor/lokasi', this.exifdata)
          .then(function (response) {
            console.log(response.data);

            self.lat = response.data.values[0].originLat;
            self.lng = response.data.values[0].originLng;

            self.marker = L.latLng(self.lat, self.lng);
            self.center = L.latLng(self.lat, self.lng);
            self.address = response.data.values[0].data.formattedAddress;

            self.$f7.dialog.close();
          })
          .catch(function (error) {
            console.log(error.message);

            if(navigator.notification){
                navigator.notification.alert("Tidak ditemukan lokasi pada foto!", self.default, "Error!");
                self.showPreview = true;
                self.marker = L.latLng(0, 0);
                self.address = null;
                self.$f7.dialog.close();
              }else{
                alert("No GPS Location Data Found");
                self.showPreview = true;
                self.marker = L.latLng(0, 0);
                self.address = null;
                self.$f7.dialog.close();
              }
          });
        });
      },
      removeMarker() {
      //this.markers.splice(index, 1);
      },
      addMarker(e) {
        geocodeService.reverse().latlng(e.latlng).run((error, result, response) => {
          this.marker = result.latlng;
          this.address = result.address.Match_addr;
          console.log(response);
        });
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
.spanku {
  display: block;
}

/* HIDE RADIO */
[type=radio] { 
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

/* IMAGE STYLES */
[type=radio] + i {
  cursor: pointer;
}

/* CHECKED STYLES */
[type=radio]:checked + i {
  color: #007aff;
}
</style>
