<template>
  <f7-page>
    <f7-navbar title="Laporan Keluhan" back-link="Back" v-if="items.id_user_lapor == this.decoded">
      <f7-nav-right>
            <!-- <f7-link icon-ios="f7:gear" icon-md="material:edit" :href="'/report-edit/' + items.id_lapor"></f7-link> -->
            <f7-link icon-ios="f7:gear" icon-md="material:edit" fill popup-open=".demo-popup-swipe"></f7-link>
          </f7-nav-right>
    </f7-navbar>
    <f7-navbar title="Laporan Keluhan" back-link="Back" v-else></f7-navbar>
      <f7-popup class="demo-popup-swipe" swipe-to-close>
        <f7-page>
          <f7-navbar>
            <f7-nav-left>
              <f7-link popup-close icon-md="material:close"></f7-link>
            </f7-nav-left>
            <f7-nav-title>Edit Laporan</f7-nav-title>
            <f7-nav-right>
              <f7-link icon-md="material:check" @click="editForm"></f7-link>
            </f7-nav-right>
          </f7-navbar>
          <f7-block>
            <f7-list form id="form">
                <f7-list-input
                    label="Deskripsi Laporan"
                    type="textarea"
                    placeholder="Deskripsi"
                    error-message="Deskripsi laporan harus diisi"
                    :value="desk"
                    @input="desk = $event.target.value"
                    required
                    validate
                    clear-button
                >
                </f7-list-input>
            </f7-list>
            <!-- <f7-button fill style="text-transform: capitalize;" @click="editForm">Simpan</f7-button> -->
          </f7-block>
        </f7-page>
      </f7-popup>
      <f7-card class="demo-facebook-card">
        <f7-card-header class="no-border">
            <div class="demo-facebook-avatar"><img :src="baseURL + items.foto_user" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;"/></div>
            <div class="demo-facebook-name">{{items.nama_user}}</div>
            <div class="demo-facebook-date">{{formatTgl(items.tgl_lapor)}}</div>
        </f7-card-header>
        <f7-card-content>
          <f7-photo-browser v-if="photo"
            :photos="[photo]"
            ref="standalone"
          ></f7-photo-browser>
            <p>{{items.desk_lapor}}</p>
            <img ref="fotolapor" :src="baseURL + items.foto_lapor" width="100%" raised @click="$refs.standalone.open()"/>
            <div class="text-block">
              <span style="font-size: 13px;"><f7-icon md="material:place" size="15px"></f7-icon>{{items.lokasi_lapor}}</span>
            </div>
            <span style="color: #8e8e93" v-show="items.kat_lapor == 'Angkutan Umum'"><f7-icon material="directions_bus" size="15px"></f7-icon><span> Angkutan Umum</span></span>
            <span style="color: #8e8e93" v-show="items.kat_lapor == 'Lalu Lintas'"><f7-icon material="traffic" size="15px"></f7-icon><span> Lalu Lintas</span></span>
            <span style="color: #8e8e93" v-show="items.kat_lapor == 'Perparkiran'"><f7-icon material="local_parking" size="15px"></f7-icon><span> Perparkiran</span></span>
            <span style="color: #8e8e93" v-show="items.kat_lapor == 'Infrastruktur'"><f7-icon material="language" size="15px"></f7-icon><span> Infrastruktur</span></span>
            <span style="color: #8e8e93" v-show="items.kat_lapor == 'Pengendalian Operasi'"><f7-icon material="directions_walk" size="15px"></f7-icon><span> Pengendalian Operasi</span></span>
            <span style="color: #8e8e93" v-show="items.kat_lapor == 'Layanan'"><f7-icon material="people" size="15px"></f7-icon><span> Layanan</span></span><br>
             <small style="color:red" v-show="items.status_lapor == 'Ditolak'">*{{items.pesan_tolak_lapor}}</small>
            <f7-row>
            <f7-col width="70">
              <p class="likes">Vote: {{items.total_vote}} &nbsp;&nbsp; Komentar: {{items.total_komentar}}</p>
            </f7-col>
            <f7-col width="30">
              <f7-chip v-if="items.status_lapor == 'Menunggu'" :text="items.status_lapor" color="yellow"></f7-chip>
              <f7-chip style="left: 25px;" v-else-if="items.status_lapor == 'Proses'" :text="items.status_lapor" color="blue"></f7-chip>
              <f7-chip style="left: 25px;" v-else-if="items.status_lapor == 'Selesai'" :text="items.status_lapor" color="green"></f7-chip>
              <f7-chip style="left: 25px;"  v-else :text="items.status_lapor" color="red"></f7-chip>
            </f7-col>
          </f7-row>
        </f7-card-content>
        <f7-card-footer class="no-border">
          <f7-link v-if="items.pernah_vote == 1" style="color: #2999F3" @click="deleteVote(items.id_vote)"><f7-icon material="thumb_up" size="20px"></f7-icon> Like</f7-link>
          <f7-link v-else @click="vote(items.id_lapor)"><f7-icon material="thumb_up" size="20px"></f7-icon> Vote</f7-link>
          <f7-link :href="'/comments/' + items.id_lapor"><f7-icon material="comment" size="20px"></f7-icon> Komentar</f7-link>
          <f7-link><f7-icon material="share" size="20px"></f7-icon> Bagikan</f7-link>
        </f7-card-footer>
      </f7-card>
      <f7-block-title>Lokasi</f7-block-title>
        <f7-block>
        <l-map style="height: 200px;" id="map" ref="myMap" :zoom="zoom" :center="center">
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <l-marker id="marker"
          v-show="address" 
          :lat-lng="marker"
          >
            <l-popup>{{items.lokasi_lapor}}</l-popup>
          </l-marker>
        </l-map>
      </f7-block>
      <f7-block-title>Komentar</f7-block-title>
        <f7-block>
          <f7-list media-list>
            <f7-list-item v-show="items.id_komentar != null"
              :title="items.nama_komentator"
              :after="timeDifference(items.tgl_komentar)">
              <img slot="media" :src="baseURL + items.foto_komentator" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;" />
              <span style="font-size: 13px; color: #8e8e93;">{{items.desk_komentar}}</span>
            </f7-list-item>
            <f7-list-item v-show="items.id_komentar == null">
              <center><span style="font-size: 13px; color: #8e8e93;">Tidak Ada Komentar.</span></center>
            </f7-list-item>
          </f7-list>
          <f7-button v-show="items.id_komentar != null" fill style="text-transform: capitalize;" :href="'/comments/' + items.id_lapor">Lihat Semua Komentar ({{items.total_komentar}})</f7-button>
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
      baseURL: '',
      decoded: null,
      items: [],
      photo: '',
      desk: '',

      //leaflet
      zoom:13,
      center: L.latLng(-7.484621, 112.434517),
      url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(0, 0), 
      address: null,

      state: ''
    }
  },
  async created() {
    try {
      // Listen to Cordova's backbutton event
      document.addEventListener('backbutton', this.navigateBack , false);
      let baseURL = await axios().request();
      this.baseURL = baseURL.config.baseURL;
      let decode = this.$jwt.decode(localStorage.getItem('token'));
      this.decoded = decode.userId;
      this.$f7.preloader.show();
      let result = await axios().get('/lapor/' + this.id);
      this.$f7.preloader.hide();
      console.log(result.data.values);
      
      this.marker = L.latLng(result.data.values[0].lat_lapor, result.data.values[0].long_lapor);
      this.center = L.latLng(result.data.values[0].lat_lapor, result.data.values[0].long_lapor);
      this.items = result.data.values[0];
      this.desk = result.data.values[0].desk_lapor;

      let url = this.baseURL + result.data.values[0].foto_lapor;
      this.photo = url;
    } catch (error) {
      
    }
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
    async editForm() {
      try {
        if (document.getElementById('form').checkValidity() == false) {
            this.$f7.input.validateInputs(document.getElementById('form'));   
            console.log(document.getElementById('form').checkValidity());
                             
        } else {
            let result = await axios().put('/lapor/' + this.id, {
            desk: this.desk
            });
            console.log(result.data);
            this.openToast('Berhasil mengubah laporan keluhan');
            this.$f7.popup.close();
            this.$f7router.refreshPage();
        }
      } catch (error) {
          console.log(error.message);
          this.$f7.dialog.alert(error.message, 'Terjadi Kesalahan'); 
          
      }
    },
    async vote(id) {
        try {
          let vote = await axios().post('/lapor/vote', {
            idlapor: id
          });
          console.log('tambah vote', vote);
          this.state = 'tambah';
        } catch (error) {
          console.log(error.message);
          
        }
      },
      async deleteVote(id) {
        try {
          let vote = await axios().delete('/lapor/vote/' + id);
          console.log('delete vote', vote);
          this.state = 'hapus';
        } catch (error) {
          console.log(error.message);
          
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
  watch: {
    state: {
      async handler() {
          console.log(this.state);
          let result = await axios().get('/lapor/' + this.id);
          this.items = result.data.values[0];       
          console.log(this.items);
      }
    }
  },
  beforeDestroy () {
    document.removeEventListener("backbutton", this.navigateBack);
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

.text-block {
  z-index: 999;
  position: absolute;
  bottom: 85px;
  left: 10px;
  margin-right: 10px;
  width: 94%;
  color: white;
  background: rgba(0, 0, 0, 0.65);

}
</style>
