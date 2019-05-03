<template>
    <f7-page>
      <f7-block-title>Lokasi</f7-block-title>
      <f7-block style="height: 200px;">
        <l-map ref="myMap" :zoom="zoom" :center="center"  @click="addMarker">
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <l-marker :lat-lng="marker" @click="removeMarker(index)">
            <l-popup>{{marker.lat + ", " + marker.lng}}</l-popup>
          </l-marker>
        </l-map>
      </f7-block>
    </f7-page>
</template>
<script>
import {LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';
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
            center: L.latLng(47.413220, -1.219482),
            url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            marker: L.latLng(47.413220, -1.219482), 
    }
  },
  methods:{
    removeMarker(index) {
      this.markers.splice(index, 1);
    },
    addMarker(event) {
      this.marker = event.latlng;
      console.log(this.marker);
      
    }
  },
    mounted () {
      this.$nextTick(() => {
        this.$refs.myMap.mapObject.ANY_LEAFLET_MAP_METHOD();
      })
    }
}
</script>
<style>
.leaflet-popup-close-button {
  display: none;
}
</style>


