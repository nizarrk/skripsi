<template>
  <f7-page ptr @ptr:refresh="pullToRefresh">
    <f7-navbar title="Laporan Keluhan" back-link="Back"></f7-navbar>
      <div v-if="items.length == 0" style="padding-top: 300px;">
        <center><span style="font-size: 17px; color: #8e8e93;">Tidak Ada Data Laporan Keluhan.</span></center>
      </div>
      <div v-else>
        <f7-card class="demo-card-header-pic" v-for="(item, index) in items" :key="index">
          <a :href="'/report-detail/' + item.id_lapor">
          <f7-card-header
            :id-lapor="item.id_lapor"
            class="no-border"
            valign="bottom"
            :style="{ backgroundImage: 'url(' + baseURL + item.foto_lapor + ')' }"
          ><span><f7-icon md="material:place"></f7-icon>{{item.lokasi_lapor}}</span></f7-card-header>
          </a>
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
            <span>{{item.kode_lapor}}</span>
          </f7-card-footer>
        </f7-card>
      </div>
  </f7-page>
</template>

<script>
import axios from '../config/axiosConfig';
import date from '../mixins/dateConfig';

export default {
  data() {
    return {
      baseURL: '',
      items: []
    }
  },
  async created() {
    try {
      let baseURL = await axios().request();
      this.baseURL = baseURL.config.baseURL;
      this.$f7.preloader.show();
      let result = await axios().get('/lapor/laporku');
      this.$f7.preloader.hide();
      console.log(result.data.values);

      this.items = result.data.values;
    } catch (error) {
      console.log(error.message);
      
    }
  },
  methods: {
    async pullToRefresh(event, done) {
        let self = this;

        setTimeout(async () => {
          let result = await axios().get('/lapor/laporku');
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
