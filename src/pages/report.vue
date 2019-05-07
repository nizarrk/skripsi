<template>
  <f7-page>
    <f7-navbar title="Lapor" back-link="Back">
      <f7-nav-right>
        <f7-link icon-ios="f7:save" icon-md="material:check" href="#"></f7-link>
      </f7-nav-right>
    </f7-navbar>
    <f7-block-title>Unggah Foto</f7-block-title>
      <f7-block>
        <center>
          <div class="image-upload">
            <label for="file-input">
              <f7-icon material="camera_alt" size="100px" v-bind:class="{first: imagePreview}"></f7-icon>
              <img id="myimg" ref="myimg" style="max-width: 200px; max-height: 200px;" 
              v-bind:class="{preview: imagePreview}" 
              v-bind:src="imagePreview" 
              v-show="showPreview"/>
              <span>{{filename}}</span>
            </label>
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
                  <input type="radio" name="test" value="Angkutan Umum">
                  <f7-icon material="directions_bus" size="30px"></f7-icon>
                </label>
              </div>
              <span style="font-size:11px;">Angkutan Umum</span>
            </f7-col>
            <f7-col>
              <div>
                <label>
                  <input type="radio" name="test" value="Lalu Lintas">
                  <f7-icon material="traffic" size="30px"></f7-icon>
                </label>
              </div>
              <span style="font-size:11px;">Lalu Lintas</span>
            </f7-col>
            <f7-col>
              <div>
                <label>
                  <input type="radio" name="test" value="Perparkiran">
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
                  <input type="radio" name="test" value="Infrastruktur">
                  <f7-icon material="language" size="30px"></f7-icon>
                </label>
              </div>
              <span style="font-size:11px;">Infrastruktur</span>
            </f7-col>
            <f7-col>
              <div>
                <label>
                  <input type="radio" name="test" value="Pengendalian Operasi">
                  <f7-icon material="directions_walk" size="30px"></f7-icon>
                </label>
              </div>
              <span style="font-size:11px;">Pengendalian Operasi</span>
            </f7-col>
            <f7-col>
              <div>
                <label>
                  <input type="radio" name="test" value="Layanan">
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
          <l-marker :lat-lng="marker" @click="removeMarker()">
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
                  <textarea placeholder="Deskripsi Laporan"></textarea>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </f7-block>
  </f7-page>
</template>

<script>
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
        marker: L.latLng(-7.470475, 112.440132), 
        address: null,

        //upload
        filename: '',
        file: '',
        showPreview: false,
        imagePreview: '',

        //exif
        metadata: null
      }
    },

    methods: {
      /*Submits the file to the server*/
      submitFile(){
        /*Initialize the form data*/
            let formData = new FormData();

            /*Add the form data we need to submit*/
            formData.append('file', this.file);

        /*Make the request to the POST /single-file URL*/
            axios.post( '/file-preview',
                formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              }
            ).then(function(){
          console.log('SUCCESS!!');
          alert("sukses");
        })
        .catch(function(){
          console.log('FAILURE!!');
          alert("gagal");
        });
      },

      /*Handles a change on the file upload*/
      handleFileUpload(){
        let self = this;
        /*Set the local file variable to what the user has selected.*/
        this.file = this.$refs.file.files[0];
        

        /*Initialize a File Reader object*/
        let reader  = new FileReader();

        /*
          Add an event listener to the reader that when the file
          has been loaded, we flag the show preview as true and set the
          image to be what was read from the reader.
        */
        reader.addEventListener("load", function () {
          this.showPreview = true;
          this.imagePreview = reader.result;
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
        //console.log(this.$refs.myimg.src);
        EXIF.getData(this.file, function() {
                console.log('image info', this)
                console.log('exif data', this.exifdata)
                self.metadata = this.exifdata;
                // Calculate latitude decimal
                var latDegree = this.exifdata.GPSLatitude[0];
                var latMinute = this.exifdata.GPSLatitude[1];
                var latSecond = this.exifdata.GPSLatitude[2];
                var latDirection = this.exifdata.GPSLatitudeRef;
                
                var latFinal = self.ConvertDMSToDD(latDegree, latMinute, latSecond, latDirection);
                console.log(latFinal);

                // Calculate longitude decimal
                var lonDegree = this.exifdata.GPSLongitude[0];
                var lonMinute = this.exifdata.GPSLongitude[1];
                var lonSecond = this.exifdata.GPSLongitude[2];
                var lonDirection = this.exifdata.GPSLongitudeRef;

                var lonFinal = self.ConvertDMSToDD(lonDegree, lonMinute, lonSecond, lonDirection);
                console.log(lonFinal);

                self.marker = L.latLng(latFinal, lonFinal);
                self.center = L.latLng(latFinal, lonFinal);
                var tes = self.reverseGeocode(self.marker);
                console.log(tes);
                
                  })
        
      },
      ConvertDMSToDD(degrees, minutes, seconds, direction){
        var dd = degrees + (minutes/60) + (seconds/3600);
            
          if (direction == "S" || direction == "W") {
              dd = dd * -1; 
          }
            
        return dd;
      },
      removeMarker() {
      //this.markers.splice(index, 1);
      },
      addMarker(e) {
        geocodeService.reverse().latlng(e.latlng).run((error, result, response) => {
          this.marker = result.latlng;
          this.address = result.address.Match_addr;
          console.log(response);
      })
      },
      reverseGeocode(marker){
        geocodeService.reverse().latlng(marker).run((error, result, response) => {
          this.marker = result.latlng;
          var tes2 = this.address = result.address.Match_addr;
          console.log(response);
          return tes2;
      })
      }
    }
    // mounted () {
    //   this.$nextTick(() => {
    //     this.$refs.myMap.mapObject.ANY_LEAFLET_MAP_METHOD();
    //   })
    // }
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
