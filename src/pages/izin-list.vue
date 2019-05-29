<template>
  <f7-page ptr @ptr:refresh="pullToRefresh">
    <f7-navbar title="Izin Penggunaan Jalan" back-link="Back"></f7-navbar>
      <div v-if="items.length == 0" style="padding-top: 300px;">
        <center><span style="font-size: 17px; color: #8e8e93;">Tidak Ada Data Izin.</span></center>
      </div>
      <div v-else raised @click="$refs.standalone.open()">
        <f7-photo-browser v-if="photos"
          :photos="photos"
          ref="standalone"
        ></f7-photo-browser>
        <f7-card class="demo-card-header-pic" v-for="(item, index) in items" :key="index">
          <f7-card-header
            :id-izin="item.id_izin"
            class="no-border"
            valign="bottom"
            :style="{ backgroundImage: 'url(' + baseURL + item.surat_izin + ')' }"
          ></f7-card-header>
          <!-- background-image:url -->
          <f7-card-content>
            <p class="date">{{formatTgl(item.tgl_izin)}}</p>
            <p>{{item.desk_izin}}</p>
          </f7-card-content>
          <f7-card-footer>
            <f7-chip v-if="item.status_izin == 'Menunggu'" :text="item.status_izin" color="yellow"></f7-chip>
            <f7-chip v-else-if="item.status_izin == 'Proses'" :text="item.status_izin" color="blue"></f7-chip>
            <f7-chip v-else-if="item.status_izin == 'Selesai'" :text="item.status_izin" color="green"></f7-chip>
            <f7-chip v-else :text="item.status_lapor" color="red"></f7-chip>
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
      baseURL: 'http://192.168.1.12:3000',
      items: [],
      photos: []
    }
  },
  async created() {
    this.$f7.preloader.show();
    let result = await axios().get('/izin/');
    this.$f7.preloader.hide();
    console.log(result.data.values);
    result.data.values.forEach(e=> {
      this.photos.push(this.baseURL + e.surat_izin, this.baseURL + e.ktp_izin);
      
    });
    console.log(this.photos);
    
    console.log(this.photos);
    
    this.items = result.data.values;
  },
  methods: {
    async pullToRefresh(event, done) {
        let self = this;

        setTimeout(async () => {
          let result = await axios().get('/izin/');
          self.items = result.data.values;
          
          done();
        }, 1000);
      }
  },
  mixins: [date]
}
</script>
<style scoped>
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
