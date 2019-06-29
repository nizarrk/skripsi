<template>
  <f7-page>
    <f7-navbar title="Notifikasi"></f7-navbar>
    <div v-if="items.length > 0" class="list media-list">
  <ul>
    <li v-for="(item, index) in items" :key="index" :style="item.status_notifikasi == 'Aktif' ? 'background-color:#E5E9F2' : ''">
      <a v-if="item.tipe_notifikasi == 'Komentar'" :href="'/comments/'+item.id_lapor" class="item-link item-content" @click="updateStatus(item.id_notifikasi)">
        <div class="item-inner">
          <div class="item-title-row">
            <div class="item-title"><b>{{item.tipe_notifikasi}}</b></div>
            <div class="item-after">{{timeDifference(item.tgl_notifikasi)}}</div>
          </div>
          <div class="item-subtitle">Komentar baru dari <b>{{item.nama_user_notifikator}}</b></div>
          <div class="item-text">{{item.desk_notifikasi}}</div>
        </div>
      </a>
      <a v-else-if="item.tipe_notifikasi == 'Laporan Keluhan'" :href="'/report-detail/'+item.id_lapor" class="item-link item-content" @click="updateStatus(item.id_notifikasi)">
        <div class="item-inner">
          <div class="item-title-row">
            <div class="item-title"><b>{{item.tipe_notifikasi}}</b></div>
            <div class="item-after">{{timeDifference(item.tgl_notifikasi)}}</div>
          </div>
          <div class="item-subtitle">Pemberitahuan baru dari <b>{{item.nama_user_notifikator}}</b></div>
          <div class="item-text">{{item.desk_notifikasi}}</div>
        </div>
      </a>
      <a v-else-if="item.tipe_notifikasi == 'Izin Penggunaan Jalan'" :href="'/izin-list/'" class="item-link item-content" @click="updateStatus(item.id_notifikasi)">
        <div class="item-inner">
          <div class="item-title-row">
            <div class="item-title"><b>{{item.tipe_notifikasi}}</b></div>
            <div class="item-after">{{timeDifference(item.tgl_notifikasi)}}</div>
          </div>
          <div class="item-subtitle">Pemberitahuan baru dari <b>{{item.nama_user_notifikator}}</b></div>
          <div class="item-text">{{item.desk_notifikasi}}</div>
        </div>
      </a>
    </li>
    <f7-button v-show="all == false" @click="showAll">Lihat Semua</f7-button>
  </ul>
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
import axios from '../config/axiosConfig';
import date from '../mixins/dateConfig';

export default {
  data() {
    return {
      baseURL: '',
      items: [],
      all: false
    }
  },
  async created() {
    try {
      this.$f7.preloader.show();
      let baseURL = await axios().request();
      this.baseURL = baseURL.config.baseURL;
      let result = await axios().get('/notif/limit');
      this.$f7.preloader.hide();
      console.log(result.data.values);
      this.items = result.data.values;
    } catch (error) {
      console.log(error.message);
      this.$f7.dialog.alert(error.message, 'Terjadi Kesalahan');
    }
  },
  methods: {
    async showAll() {
      try {
        this.all = true;
        this.$f7.preloader.show();
        let result = await axios().get('/notif');
        this.$f7.preloader.hide();
        this.items = result.data.values;
      } catch (error) {
        console.log(error.message);
        this.$f7.dialog.alert(error.message, 'Terjadi Kesalahan');
      }
    },
    async updateStatus(id) {
      try {
        await axios().put('/notif/' + id, {
          status: 'Tidak Aktif'
        });
      } catch (error) {
        console.log(error.message);
        this.$f7.dialog.alert(error.message, 'Terjadi Kesalahan');
      }
    }
  },
  mixins: [date]
}
</script>