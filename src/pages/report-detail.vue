<template>
  <f7-page>
    <f7-navbar title="Laporan Keluhan" back-link="Back" v-if="items.id_user_lapor == this.decoded">
      <f7-nav-right>
            <f7-link icon-ios="f7:gear" icon-md="material:edit" :href="'/report-edit/' + items.id_lapor"></f7-link>
          </f7-nav-right>
    </f7-navbar>
    <f7-navbar title="Laporan Keluhan" back-link="Back" v-else></f7-navbar>
        <f7-card class="demo-facebook-card">
            <f7-card-header class="no-border">
                <div class="demo-facebook-avatar"><img :src="baseURL + items.foto_user" style="width: 34px; border-radius: 20px;"/></div>
                <div class="demo-facebook-name">{{items.nama_user}}</div>
                <div class="demo-facebook-date">{{formatTgl(items.tgl_lapor)}}</div>
            </f7-card-header>
            <f7-card-content>
              <f7-photo-browser v-if="photo"
                :photos="[photo]"
                ref="standalone"
              ></f7-photo-browser>
                <p>{{items.desk_lapor}}</p><img ref="fotolapor" :src="baseURL + items.foto_lapor" width="100%" raised @click="$refs.standalone.open()"/>
                <span style="color: #8e8e93" v-show="items.kat_lapor == 'Angkutan Umum'"><f7-icon material="directions_bus" size="15px"></f7-icon><span>Angkutan Umum</span></span>
                <span style="color: #8e8e93" v-show="items.kat_lapor == 'Lalu Lintas'"><f7-icon material="traffic" size="15px"></f7-icon><span>Lalu Lintas</span></span>
                <span style="color: #8e8e93" v-show="items.kat_lapor == 'Perparkiran'"><f7-icon material="local_parking" size="15px"></f7-icon><span>Perparkiran</span></span>
                <span style="color: #8e8e93" v-show="items.kat_lapor == 'Infrastruktur'"><f7-icon material="language" size="15px"></f7-icon><span>Infrastruktur</span></span>
                <span style="color: #8e8e93" v-show="items.kat_lapor == 'Pengendalian Operasi'"><f7-icon material="directions_walk" size="15px"></f7-icon><span>Pengendalian Operasi</span></span>
                <span style="color: #8e8e93" v-show="items.kat_lapor == 'Layanan'"><f7-icon material="people" size="15px"></f7-icon><span>Layanan</span></span>
                <p class="likes">Likes: {{items.vote_lapor}} &nbsp;&nbsp; Comments: {{items.total_komentar}}</p>
            </f7-card-content>
            <f7-card-footer class="no-border">
                <f7-link><f7-icon material="thumb_up" size="20px"></f7-icon> Like</f7-link>
                <f7-link><f7-icon material="comment" size="20px"></f7-icon> Comment</f7-link>
                <f7-link><f7-icon material="share" size="20px"></f7-icon> Share</f7-link>
            </f7-card-footer>
        </f7-card>
        <f7-block-title>Lokasi</f7-block-title>
        <f7-block>
        <l-map style="height: 200px;" id="map" ref="myMap" :zoom="zoom" :center="center">
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <l-marker id="marker"
          v-show="address" 
          :lat-lng="marker" 
          @click="removeMarker()">
            <l-popup>{{items.lokasi_lapor}}</l-popup>
          </l-marker>
        </l-map>
        <p style="color: #8e8e93"><f7-icon md="material:place"></f7-icon>{{items.lokasi_lapor}}</p>
      </f7-block>
      <f7-block-title>Komentar</f7-block-title>
        <f7-block>
          <f7-list media-list>
            <f7-list-item v-show="items.id_komentar != null"
              :title="items.nama_komentator"
              :after="timeDifference(items.tgl_komentar)">
              <img slot="media" :src="baseURL + items.foto_komentator" width="44px" />
              <span style="font-size: 13px; color: #8e8e93;">{{items.desk_komentar}}</span>
            </f7-list-item>
            <f7-list-item v-show="items.id_komentar == null">
              <center><span style="font-size: 13px; color: #8e8e93;">Tidak Ada Komentar.</span></center>
            </f7-list-item>
          </f7-list>
          <f7-button v-show="items.id_komentar != null" fill style="text-transform: capitalize;" :href="'/comments/' + items.id_lapor">Lihat Semua Komentar</f7-button>
        </f7-block>
    </f7-page>
</template>

<script>
import {LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';
import date from '../mixins/dateConfig';
import axios from '../config/axiosConfig';
import { error } from 'util';

export default {
  props: {
    id: String
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
  },
  data() {
    return {
      baseURL: 'http://192.168.1.12:3000',
      decoded: null,
      items: [],
      photo: '',

      //leaflet
      zoom:13,
      center: L.latLng(-7.484621, 112.434517),
      url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(0, 0), 
      address: null,
    }
  },
  async created() {
    let decode = this.$jwt.decode(localStorage.getItem('token'));
    this.decoded = decode.userId;
    this.$f7.preloader.show();
    let result = await axios().get('/lapor/' + this.id);
    this.$f7.preloader.hide();
    console.log(result.data.values);
    
    this.marker = L.latLng(result.data.values[0].lat_lapor, result.data.values[0].long_lapor);
    this.center = L.latLng(result.data.values[0].lat_lapor, result.data.values[0].long_lapor);
    this.items = result.data.values[0];

    let url = this.baseURL + result.data.values[0].foto_lapor;
    console.log('ref', this.$refs.fotolapor.src);
    this.photo = url;
    console.log('pb', this.photo);

  },
  methods: {
    pb() {
      axios().get('/lapor/' + this.id).then(result => {
        let url = this.baseURL + result.data.values[0].foto_lapor;
        console.log('ref', this.$refs.fotolapor.src);
        this.photo = url;
        console.log('pb', this.photo);

        return this.photo;
        
      }).catch(error => {
        console.log(error);
        
      })
    }
  },
  mixins: [date]
}
</script>
<style scoped>
.leaflet-popup-close-button {
  display: none;
}
.demo-facebook-card .card-header {
  display: block;
  padding: 10px;
}
.demo-facebook-card .demo-facebook-avatar {
  float: left;
}
.demo-facebook-card .demo-facebook-name {
  margin-left: 44px;
  font-size: 14px;
  font-weight: 500;
}
.demo-facebook-card .demo-facebook-date {
  margin-left: 44px;
  font-size: 13px;
  color: #8e8e93;
}
.demo-facebook-card .card-footer {
  background: #fafafa;
}
.demo-facebook-card .card-footer a {
  color: #81848b;
  font-weight: 500;
}
.demo-facebook-card .card-content img {
  display: block;
}
.demo-facebook-card .card-content-padding {
  padding: 15px 10px;
}
.demo-facebook-card .card-content-padding .likes {
  color: #8e8e93;
}
</style>
<style>
.leaflet-popup-close-button {
  display: none;
}
</style>
