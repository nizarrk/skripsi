<template>
    <f7-page>
      <f7-block-title>Lokasi</f7-block-title>
      <f7-block style="height: 200px;">
        <l-map id="map" ref="myMap" :zoom="zoom" :center="center"  @click="addMarker">
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <l-marker :lat-lng="marker" @click="removeMarker()">
            <l-popup v-show="address != ''">{{address}}</l-popup>
          </l-marker>
        </l-map>
        <span>{{address}}</span>
      </f7-block>
    </f7-page>
</template>
<script>
import {LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';
import * as geocoding from 'esri-leaflet-geocoder';
var geocodeService = geocoding.geocodeService();

export default {
    name: 'MyAwesomeMap',
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LPopup
    },
    data() {
        return {
            zoom:13,
            center: L.latLng(-7.470475, 112.440132),
            url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            marker: L.latLng(-7.470475, 112.440132), 
            address: null
    }
  },
  methods:{
    removeMarker() {
      //this.markers.splice(index, 1);
    },
    addMarker(e) {
      geocodeService.reverse().latlng(e.latlng).run((error, result, response) => {
        this.marker = result.latlng;
        this.address = result.address.Match_addr;
        console.log(response);
        
      //L.marker(result.latlng).addTo(map).bindPopup(result.address.Match_addr).openPopup();
    });
      // this.marker = e.latlng;
      // console.log(this.marker);
      
    }
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


