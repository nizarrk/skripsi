<template>
  <f7-page>
    <f7-navbar title="Notifikasi"></f7-navbar>
<f7-list media-list>
  <f7-list-item
    v-for="(item, index) in items"
    :key="index"
    :link="'/comments/'+item.id_lapor"
    :title="item.tipe_notifikasi"
    :after="timeDifference(item.tgl_notifikasi)"
    :subtitle="'Komentar baru dari ' + item.nama_user_notifikator"
    :text="item.desk_notifikasi"
  ></f7-list-item>
</f7-list>
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
      this.$f7.preloader.show();
      let baseURL = await axios().request();
      this.baseURL = baseURL.config.baseURL;
      let result = await axios().get('/notif');
      this.$f7.preloader.hide();
      console.log(result.data.values);
      this.items = result.data.values;
    } catch (error) {
      console.log(error.message);
      
    }
  },
  mixins: [date]
}
</script>