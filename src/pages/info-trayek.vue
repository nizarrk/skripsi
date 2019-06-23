<template>
    <f7-page>
      <f7-navbar :title="nama" back-link="Back">
        <f7-nav-right>
        </f7-nav-right>
      </f7-navbar>
        <l-map style="height: 100%;" id="map" ref="myMap" :zoom="zoom" :center="center">
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <l-polyline
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
        items: [],
        nama: ''
    }
  },
  async created() {
    try {
      let result = await axios().get('/info/trayek/' + this.id);
      this.nama = result.data.values[0].nama_trayek;
      console.log(JSON.parse(result.data.values[0].latlng_trayek));
      this.polyline.latlngs = JSON.parse(result.data.values[0].latlng_trayek);
      
    } catch (error) {
      
    }
  },
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


