<template>
  <f7-page :page-content="true">
    <f7-navbar title="Info">
    </f7-navbar>
    <f7-block class="">
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
      let info = await axios().get('/info/get')
      // let trayek = await axios().get('/info/trayek');

      this.info = info.data.data
      // this.trayek = trayek.data.values;

      console.log('info', this.info)
      // console.log('trayek', this.trayek);

      this.$f7.preloader.hide();

      // Listen to Cordova's backbutton event
      document.addEventListener('backbutton', this.navigateBack, false)
    } catch (error) {
      console.log(error.response)
      this.$f7.preloader.hide();
      this.$f7.dialog.alert(error.response.data.message, 'Terjadi Kesalahan')
    }
  },
  methods: {
    navigateBack () {
      let app = this.$f7
      let $$ = this.$$
      // Use Framework7's router to navigate back
      let mainView = app.views.main

      mainView.router.navigate('/home/')
    },
    async getInfoDetails (id) {
      try {
        let result = await axios().get('/info/id/' + id)
        this.infoDetail = result.data.data
        console.log(this.infoDetail)
      } catch (error) {
        console.log(error.response);
        this.$f7.preloader.hide();
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
