<template>
  <f7-page infinite :infinite-distance="50" :infinite-preloader="showPreloader" @infinite="loadMore" :page-content="true">
    <f7-navbar title="Notifikasi"></f7-navbar>
    <div v-if="items.length > 0" class="list media-list">
      <ul>
        <li v-for="(item, index) in items" :key="index" :style="item.status == 0 ? 'background-color:#E5E9F2' : ''">
          <a v-if="item.type == 'Komentar'" :href="'/comments/'+item.report_id" class="item-link item-content" @click="updateStatus(item.id)">
            <div class="item-inner">
              <div class="item-title-row">
                <div class="item-title"><b>{{item.type}}</b></div>
                <div class="item-after">{{timeDifference(item.created_at)}}</div>
              </div>
              <div class="item-subtitle">Komentar baru dari <b>{{item.originator.name}}</b></div>
              <div class="item-text">{{item.description}}</div>
            </div>
          </a>
          <a v-else-if="item.type == 'Laporan Keluhan'" :href="'/report-detail/'+item.report_id" class="item-link item-content" @click="updateStatus(item.id)">
            <div class="item-inner">
              <div class="item-title-row">
                <div class="item-title"><b>{{item.type}}</b></div>
                <div class="item-after">{{timeDifference(item.created_at)}}</div>
              </div>
              <div class="item-subtitle">Pemberitahuan baru dari <b>{{item.originator.name}}</b></div>
              <div class="item-text">{{item.description}}</div>
            </div>
          </a>
        </li>
        <!-- <div class="preloader infinite-scroll-preloader"></div> -->
        <!-- <f7-button v-show="all == false" @click="showAll">Lihat Semua</f7-button> -->
      </ul>
      <center>
        <f7-preloader v-show="showPreloader" style="margin-top: 30px;"></f7-preloader>
      </center>
    </div>
    <div v-else style="padding-top: 300px;">
      <center><span style="font-size: 17px; color: #8e8e93;">Tidak Ada Notifikasi Baru.</span></center>
    </div>
<!-- <f7-list media-list>
  <f7-list-item
    v-for="(item, index) in items"
    :key="index"
    v-if="item.tipe_notifikasi == 'Komentar'"
    :link="'/comments/'+item.id_lapor"
    :title="item.tipe_notifikasi"
    :after="timeDifference(item.tgl_notifikasi)"
    :subtitle="'Komentar baru dari ' + item.nama_user_notifikator"
    :text="item.desk_notifikasi"
  ></f7-list-item>
  <f7-list-item
    v-else-if="item.tipe_notifikasi == 'Laporan Keluhan'"
    :link="'/report-detail/'+item.id_lapor"
    :title="item.tipe_notifikasi"
    :after="timeDifference(item.tgl_notifikasi)"
    :subtitle="'Pemberitahuan baru dari ' + item.nama_user_notifikator"
    :text="item.desk_notifikasi"
  ></f7-list-item>
  <f7-list-item
    v-else-if="item.tipe_notifikasi == 'Izin Penggunaan Jalan'"
    :link="'/izin-list/'"
    :title="item.tipe_notifikasi"
    :after="timeDifference(item.tgl_notifikasi)"
    :subtitle="'Pemberitahuan baru dari ' + item.nama_user_notifikator"
    :text="item.desk_notifikasi"
  ></f7-list-item>
</f7-list> -->
  </f7-page>
</template>

<script>
import axios from '../config/axiosConfig'
import date from '../mixins/dateConfig'

export default {
  data () {
    return {
      baseURL: '',
      items: [],
      total: 0,
      page: 1, // pagination
      allowInfinite: true,
      showPreloader: true
    }
  },
  async created () {
    try {
      this.$f7.preloader.show()
      let baseURL = await axios().request()
      this.baseURL = baseURL.config.baseURL
      let result = await axios().get(`/notification/get?limit=10&page=${this.page}&order_by=id&order_direction=desc`);
      this.$f7.preloader.hide()
      console.log(result.data.data);

      this.page = result.data.data.nextPage;
      this.items = result.data.data.data;
      this.total = result.data.data.total;

      // to turn off pagination preloader if this page is last page
      if (this.page == null) this.showPreloader = false;

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
    loadMore() {
      console.log('masuk loadmore');
      console.log(this.items);
      const self = this;
      if (!self.allowInfinite) return;
      self.allowInfinite = false;

      setTimeout(async () => {
        if (self.items.length >= self.total) {
          self.showPreloader = false;
          return;
        }

        let result = await axios().get(`/notification/get?limit=10&page=${self.page}&order_by=id&order_direction=desc`);

        self.page = result.data.data.nextPage;
        
        // for (let i = 0; i >= result.data.data.data.length; i++) {
        //     self.items.push(result.data.data.data[i]);
        // }

        result.data.data.data.forEach(x => {
          self.items.push(x);
        });

        self.allowInfinite = true;
      }, 1000);
    },
    async updateStatus (id) {
      try {
        await axios().put('/notification/status/' + id, {
          status: 1
        })
      } catch (error) {
        console.log(error.response)
        this.$f7.dialog.alert(error.response.data.message, 'Terjadi Kesalahan')
      }
    }
  },
  mixins: [date]
}
</script>
