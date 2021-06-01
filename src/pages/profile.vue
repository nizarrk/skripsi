<template>
    <f7-page ptr @ptr:refresh="pullToRefresh">
        <f7-navbar title="Profil">
          <f7-nav-right>
            <f7-link icon-ios="f7:gear" icon-md="material:settings" href="/settings/"></f7-link>
          </f7-nav-right>
        </f7-navbar>
        <!-- <f7-block>
              <f7-row>
                <f7-col width="25">
                  <img :src="baseURL + items.picture"
                  style="width: 70px; height: 70px; border-radius: 50%; object-fit: cover;"/>
                </f7-col>
                <f7-col width="50">
                  <span style="font-size:18px;"><b>{{items.name}}</b></span><br>
                <span style="color: #8e8e93; font-size:13px;"><f7-icon md="material:place" size="20px"></f7-icon>{{items.address}}</span>
                </f7-col>
                <f7-col width="25" style="padding-top:15px; padding-left:50px;">
                  <f7-link icon-ios="f7:bell" icon-md="material:edit" :href="'/profile-edit/' + items.id" />
                </f7-col>
              </f7-row>
        </f7-block> -->

        <f7-block>
          <center>
            <f7-col width="20">
              <img :src="baseURL + items.picture"
                style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover;"/>
            </f7-col>

            <span style="font-size:16px;"><b>{{items.name}}</b></span><br>
            <span style="color: #8e8e93; font-size:13px;"><f7-icon md="material:place" size="20px"></f7-icon>{{items.address}}</span>

          </center>
        </f7-block>

        <f7-block>
          <f7-row style="text-align:center; margin-top: 10px;">
            <f7-col>
              <span style="font-size:18px; font-weight: bold;">{{items.waiting_total}}</span><br>
              <span style="font-size:14px;"> Pending</span>
            </f7-col>
            <f7-col>
              <span style="font-size:18px; font-weight: bold;">{{items.process_total}}</span><br>
              <span style="font-size:14px;"> Proses</span>
            </f7-col>
            <f7-col>
              <span style="font-size:18px; font-weight: bold;">{{items.done_total}}</span><br>
              <span style="font-size:14px;"> Selesai</span>
            </f7-col>
            <f7-col>
              <span style="font-size:18px; font-weight: bold;">{{items.reject_total}}</span><br>
              <span style="font-size:14px;"> Ditolak</span>
            </f7-col>
          </f7-row>
        </f7-block>
        <!-- <f7-block strong style="margin-top:-32px;">
          <f7-row style="text-align:center;">
                    <f7-col>
                      <span style="font-size:18px;">{{items.waiting_total}}</span><br>
                      <span style="font-size:16px;"> Menunggu</span>
                    </f7-col>
                    <f7-col>
                      <span style="font-size:18px;">{{items.process_total}}</span><br>
                      <span style="font-size:16px;"> Proses</span>
                    </f7-col>
                    <f7-col>
                      <span style="font-size:18px;">{{items.done_total}}</span><br>
                      <span style="font-size:16px;"> Selesai</span>
                    </f7-col>
                    <f7-col>
                      <span style="font-size:18px;">{{items.reject_total}}</span><br>
                      <span style="font-size:16px;"> Ditolak</span>
                    </f7-col>
                  </f7-row>
        </f7-block> -->
        <f7-block-title>User Menu</f7-block-title>
        <f7-list>
          <f7-list-item link="/report-list/" title="Laporan Keluhan" :badge="items.reports_total">
            <f7-icon slot="media" md="material:report"></f7-icon>
          </f7-list-item>
          <!-- <f7-list-item link="/izin-list/" title="Izin Penggunaan Jalan" :badge="items.total_izin">
            <f7-icon slot="media" md="material:note_add"></f7-icon>
          </f7-list-item> -->
          <f7-list-item v-show="items.surveys_total == 0" link="/survey/" title="Survey Kepuasan">
            <f7-icon slot="media" md="material:assignment"></f7-icon>
          </f7-list-item>
          <f7-list-item v-show="items.critics_total == 0" link="/kritik-saran/" title="Kritik dan Saran">
            <f7-icon slot="media" md="material:textsms"></f7-icon>
          </f7-list-item>
        </f7-list>
    </f7-page>
</template>
<script>
import { log } from 'util'
import axios from '../config/axiosConfig'

export default {
  data () {
    return {
      baseURL: '',
      items: []
    }
  },
  async created () {
    try {
      let baseURL = await axios().request()
      this.baseURL = baseURL.config.baseURL
      this.$f7.preloader.show()
      let result = await axios().get('/user/profile')
      this.$f7.preloader.hide()
      console.log(result.data.data)

      this.items = result.data.data
      console.log(result.data.data)

      // Listen to Cordova's backbutton event
      document.addEventListener('backbutton', this.navigateBack, false)
    } catch (error) {
      console.log(error.response)
      this.$f7.dialog.alert(error.response.data.message, 'Terjadi Kesalahan')
    }
  },
  methods: {
    async pullToRefresh (event, done) {
      let self = this

      setTimeout(async () => {
        let result = await axios().get('/user/profile')
        self.items = result.data.data

        done()
      }, 1000)
    },

    navigateBack () {
      let app = this.$f7
      let $$ = this.$$
      // Use Framework7's router to navigate back
      let mainView = app.views.main

      mainView.router.navigate('/home/')
    },
  }
}
</script>
