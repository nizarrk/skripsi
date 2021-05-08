<template>
  <f7-page :page-content="false">
    <f7-navbar title="Info">
    </f7-navbar>
    <f7-toolbar tabbar top>
      <f7-link tab-link="#tab-1" tab-link-active style="text-transform: capitalize;">Berita</f7-link>
      <f7-link tab-link="#tab-2" style="text-transform: capitalize;">Jenis Perbaikan</f7-link>
    </f7-toolbar>

    <f7-tabs swipeable>
      <f7-tab id="tab-1" class="page-content" tab-active>
        <f7-block>
          <f7-card class="demo-card-header-pic" v-for="(item, index) in info" :key="index">
            <f7-card-header
              class="no-border"
              valign="bottom"
              :style="{ backgroundImage: 'url(' + baseURL + item.image + ')' }"
            >{{item.name}}</f7-card-header>
            <f7-card-content>
              <p class="date">{{formatTgl(item.created_at)}}</p>
              <p>{{item.description | limitToDisplay(item.description)}}</p>
            </f7-card-content>
            <f7-card-footer>
              <f7-link @click="getInfoDetails(item.id)" fill popup-open=".demo-popup">Baca Selengkapnya</f7-link>
            </f7-card-footer>
          </f7-card>
        </f7-block>
      </f7-tab>
      <f7-tab id="tab-2" class="page-content">
        <f7-block>
          <div class="card card-outline">
            <div class="card-header">Kerusakan Ringan (1 - 3 Hari)</div>
            <div class="card-content card-content-padding">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco </p>
            </div>
            <!-- <div class="card-footer"><f7-link :href="'/info-trayek/' + item.id_trayek">Lihat Detail</f7-link></div> -->
          </div>
          <div class="card card-outline">
            <div class="card-header">Kerusakan Sedang (1 - 7 Hari)</div>
            <div class="card-content card-content-padding">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco </p>
            </div>
            <!-- <div class="card-footer"><f7-link :href="'/info-trayek/' + item.id_trayek">Lihat Detail</f7-link></div> -->
          </div>
          <div class="card card-outline">
            <div class="card-header">Kerusakan Berat (1 - 20 Hari)</div>
            <div class="card-content card-content-padding">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco </p>
            </div>
            <!-- <div class="card-footer"><f7-link :href="'/info-trayek/' + item.id_trayek">Lihat Detail</f7-link></div> -->
          </div>
        </f7-block>
      </f7-tab>
    </f7-tabs>
    <f7-popup class="demo-popup" :opened="popupOpened" @popup:closed="popupOpened = false">
      <f7-page>
        <f7-navbar title="Detail Info">
          <f7-nav-right>
            <f7-link popup-close icon-md="material:close"></f7-link>
          </f7-nav-right>
        </f7-navbar>
        <f7-block>
          <h2>{{infoDetail.name}}</h2>
          <span style="color: #8e8e93;">{{formatTgl(infoDetail.created_at)}} | Oleh: {{infoDetail.created_by}}</span>
          <img :src="baseURL + infoDetail.image" alt="" width="100%">
          <p>{{infoDetail.description}}</p>
        </f7-block>
      </f7-page>
    </f7-popup>
  </f7-page>
</template>
<script>
import axios from '../config/axiosConfig'
import date from '../mixins/dateConfig'

export default {
  data () {
    return {
      baseURL: '',
      info: [],
      infoDetail: [],
      // trayek: [],
      popupOpened: false
    }
  },
  async created () {
    try {
      this.$f7.preloader.show()
      let baseURL = await axios().request()
      this.baseURL = baseURL.config.baseURL
      let info = await axios().get('/info')
      // let trayek = await axios().get('/info/trayek');

      this.info = info.data.data
      // this.trayek = trayek.data.values;

      console.log('info', this.info)
      // console.log('trayek', this.trayek);

      this.$f7.preloader.hide()
    } catch (error) {
      console.log(error.response)
      this.$f7.dialog.alert(error.response.data.message, 'Terjadi Kesalahan')
    }
  },
  methods: {
    async getInfoDetails (id) {
      try {
        let result = await axios().get('/info/' + id)
        this.infoDetail = result.data.data
        console.log(this.infoDetail)
      } catch (error) {
        console.log(error.response)
        this.$f7.dialog.alert(error.response.data.message, 'Terjadi Kesalahan')
      }
    }
  },
  filters: {
    limitToDisplay (text) {
      return text.substring(0, 200) + '....'
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
