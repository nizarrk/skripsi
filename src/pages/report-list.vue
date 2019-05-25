<template>
  <f7-page ptr @ptr:refresh="pullToRefresh">
    <f7-navbar title="Laporan Keluhan" back-link="Back"></f7-navbar>
<f7-card class="demo-card-header-pic" v-for="(item, index) in items" :key="index">
  <a :href="'/report-detail/' + item.id_lapor">
  <f7-card-header
    :id-lapor="item.id_lapor"
    class="no-border"
    valign="bottom"
    :style="{ backgroundImage: 'url(' + item.foto_lapor + ')' }"
  ><span><f7-icon md="material:place"></f7-icon>{{item.lokasi_lapor}}</span></f7-card-header></a>
  <!-- background-image:url -->
  <f7-card-content>
    <p class="date">{{formatTgl(item.tgl_lapor)}}</p>
    <p>{{item.desk_lapor}}</p>
  </f7-card-content>
  <f7-card-footer>
    <f7-chip v-if="item.status_lapor == 'Menunggu'" :text="item.status_lapor" color="yellow"></f7-chip>
    <f7-chip v-else-if="item.status_lapor == 'Proses'" :text="item.status_lapor" color="blue"></f7-chip>
    <f7-chip v-else-if="item.status_lapor == 'Selesai'" :text="item.status_lapor" color="green"></f7-chip>
    <f7-chip v-else :text="item.status_lapor" color="red"></f7-chip>
    <f7-link>Read more</f7-link>
  </f7-card-footer>
</f7-card>
  </f7-page>
</template>

<script>
import axios from '../config/axiosConfig';

export default {
  data() {
    return {
      items: []
    }
  },
  async created() {
    this.$f7.preloader.show();
    let result = await axios().get('/lapor/laporku');
    this.$f7.preloader.hide();
    console.log(result.data.values);

    this.items = result.data.values;
  },
  methods: {
    formatTgl(tgl) {
      let arrHari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      let arrBulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

      let date = new Date(tgl);
      let tanggal = date.getDate();
      let hari = date.getDay();
      let bulan = date.getMonth();
      let tahun = date.getFullYear();

      arrHari = arrHari[hari];
      arrBulan = arrBulan[bulan];

      //let tahun = (year < 1000) ? year + 1900 : year;

      let hasil = arrHari + ', ' + tanggal + ' ' + arrBulan + ' ' + tahun;
      
      return hasil;
    },
    async pullToRefresh(event, done) {
        let self = this;

        setTimeout(async () => {
          let result = await axios().get('/lapor/laporku');
          self.items = result.data.values;
          
          done();
        }, 1000);
      }
  }
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
