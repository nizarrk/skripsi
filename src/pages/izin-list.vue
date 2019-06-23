<template>
  <f7-page ptr @ptr:refresh="pullToRefresh">
    <f7-navbar title="Izin Penggunaan Jalan" back-link="Back"></f7-navbar>
      <div v-if="items.length == 0" style="padding-top: 300px;">
        <center><span style="font-size: 17px; color: #8e8e93;">Tidak Ada Data Izin.</span></center>
      </div>
      <div v-else>
        <f7-photo-browser v-if="photos"
          :photos="photos"
          ref="standalone"
        ></f7-photo-browser>
        <f7-card class="demo-card-header-pic" v-for="(item, index) in items" :key="index">
          <div raised @click="openPhoto(item.id_izin)">
            <f7-swiper pagination style="height: 200px;">
              <f7-swiper-slide class="slider-pic" :style="{ backgroundImage: 'url(' + baseURL + item.surat_izin + ')' }"></f7-swiper-slide>
              <f7-swiper-slide class="slider-pic" :style="{ backgroundImage: 'url(' + baseURL + item.ktp_izin + ')' }"></f7-swiper-slide>
              <f7-swiper-slide class="slider-pic" :style="{ backgroundImage: 'url(' + baseURL + item.kk_izin + ')' }"></f7-swiper-slide>
            </f7-swiper>
          </div>
          <!-- background-image:url -->
          <f7-card-content>
            <p class="date">{{formatTgl(item.tgl_izin)}}</p>
            <p> <b> Jenis Kegiatan: </b><br> {{item.kegiatan_izin}}</p>
            <p> <b> Lokasi Kegiatan: </b><br> {{item.lokasi_izin}}</p>
            <p> <b> Tanggal Kegiatan: </b> <br> {{formatTgl(item.tgl_mulai_izin)}} - {{formatTgl(item.tgl_selesai_izin)}}</p>
            <p> <b> Jam Kegiatan: </b> <br> {{item.jam_mulai_izin.substr(0, 5)}} - {{item.jam_selesai_izin.substr(0, 5)}}</p>
            <small style="color:red" v-show="item.status_izin == 'Ditolak'">*{{item.pesan_tolak_izin}}</small>
          </f7-card-content>
          <f7-card-footer>
            <f7-chip v-if="item.status_izin == 'Menunggu'" :text="item.status_izin" color="yellow"></f7-chip>
            <f7-chip v-else-if="item.status_izin == 'Proses'" :text="item.status_izin" color="blue"></f7-chip>
            <f7-chip v-else-if="item.status_izin == 'Selesai'" :text="item.status_izin" color="green"></f7-chip>
            <f7-chip v-else :text="item.status_izin" color="red"></f7-chip>
            <span>{{item.kode_izin}}</span>
          </f7-card-footer>
        </f7-card>
      </div>
      <f7-fab position="right-bottom" slot="fixed" color="blue" href='/izin-add/'>
    <f7-icon ios="f7:add" aurora="f7:add" md="material:add"></f7-icon>
  </f7-fab>
  </f7-page>
</template>

<script>
import axios from '../config/axiosConfig';
import date from '../mixins/dateConfig';

export default {
  data() {
    return {
      baseURL: '',
      items: [],
      photos: []
    }
  },
  async created() {
    try {
      // Listen to Cordova's backbutton event
      document.addEventListener('backbutton', this.navigateBack , false);
      let baseURL = await axios().request();
      this.baseURL = baseURL.config.baseURL;
      this.$f7.preloader.show();
      let result = await axios().get('/izin/');
      this.$f7.preloader.hide();
      console.log(result.data.values);
      
      
      this.items = result.data.values;
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
    async openPhoto(id){
      let newarr = [];
      console.log('atas');
      let result = await axios().get('/izin/' + id);
      newarr.push(this.baseURL + result.data.values[0].surat_izin, this.baseURL + result.data.values[0].ktp_izin, this.baseURL + result.data.values[0].kk_izin);
      this.photos.push(...newarr)
            
      
      // Hide the modal manually
          this.$nextTick(() => {
            console.log('bawah');
            if (this.photos.length > 3) {           
            
            console.log('spliced');
            
              this.photos.splice(0, this.photos.length);
              this.photos.push(...newarr)
              
              this.$refs.standalone.open(0);
            } else {
              console.log('not spliced');
              
              this.$refs.standalone.open(0);
            }
            
            
            
          })
    },
    async pullToRefresh(event, done) {
        let self = this;

        setTimeout(async () => {
          let result = await axios().get('/izin/');
          self.items = result.data.values;
          
          done();
        }, 1000);
      }
  },
  beforeDestroy () {
    document.removeEventListener("backbutton", this.navigateBack);
  },
  mixins: [date]
}
</script>
<style scoped>
.slider-pic {
  background-position: center center;
  background-repeat:no-repeat;
  background-size: cover;
}
.demo-card-header-pic .card-header {
  height: 40vw;
  background-size: cover;
  background-position: center;
  color: #fff;
}
.demo-card-header-pic .card-content-padding .date{
  color: #8e8e93;
}
</style>
