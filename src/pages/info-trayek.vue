<template>
    <f7-page>
      <f7-navbar title="Trayek" back-link="Back">
        <f7-nav-right>
          <f7-link icon-ios="f7:save" icon-md="material:check" @click="submitFile"></f7-link>
        </f7-nav-right>
      </f7-navbar>
        <l-map style="height: 100%;" id="map" ref="myMap" :zoom="zoom" :center="center"  @click="addMarker">
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <l-polyline @click="removeMarker"
          :lat-lngs="polyline.latlngs"
          :color="polyline.color">
          </l-polyline>
        </l-map>
    </f7-page>
</template>
<script>
import {LMap, LTileLayer, LMarker, LPopup, LPolyline } from 'vue2-leaflet';
import axios from '../config/axiosConfig';

export default {
  props: {
    id: String
  },
  components: {
      LMap,
      LTileLayer,
      LMarker,
      LPopup,
      LPolyline
  },
  data() {
      return {
        zoom:13,
        center: L.latLng(-7.470475, 112.440132),
        url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        marker: L.latLng(-7.470475, 112.440132), 
        address: null,
        polyline: {
          latlngs: [],
          color: 'blue'
        },
        items: []
    }
  },
  async created() {
    try {
      let result = await axios().get('/info/trayek/' + this.id);
      console.log(JSON.parse(result.data.values[0].latlng_trayek));
      this.polyline.latlngs = JSON.parse(result.data.values[0].latlng_trayek);
      
    } catch (error) {
      
    }
  },
  methods:{
    removeMarker(index) {
      this.polyline.latlngs.splice(index, 1);
    },
    addMarker(event) {
      this.polyline.latlngs.push(event.latlng);
      console.log(JSON.stringify(this.polyline.latlngs));
      
    },
    /*Submits the file to the server*/
      submitFile(){
        let self = this;       

        /*Make the request to the POST /single-file URL*/
        axios().post('/info/trayek/', {
          nama: 'Line A',
          rute: 'wakeh',
          latlng: this.polyline.latlngs
        })
        .then(function(response){
          console.log('SUCCESS!!', response);
          self.$f7.dialog.alert(response.statusText, 'Berhasil'); 
          // self.$f7router.navigate('/home/');
          })
        .catch(function(error){
          console.log('FAILURE!!', error.message);
          self.$f7.dialog.alert(error.message, 'Terjadi Kesalahan');
        });
      },
  }
    // mounted () {
    //   this.$nextTick(() => {
    //     this.$refs.myMap.mapObject.ANY_LEAFLET_MAP_METHOD();
    //   })
    // }
}
</script>
<style>
.leaflet-popup-close-button {
  display: none;
}
</style>


