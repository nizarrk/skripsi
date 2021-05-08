<template>
  <f7-page :page-content="false">
    <f7-toolbar tabbar labels bottom>
      <f7-link tab-link route-tab-id="tab1" href="./" text="Beranda" icon-ios="f7:home" icon-md="material:home"></f7-link>
      <f7-link tab-link route-tab-id="tab2" href="tab2/" text="Info" icon-ios="f7:info" icon-md="material:info"></f7-link>
      <f7-link tab-link href="/report/" text="Lapor" icon-ios="f7:add" icon-md="material:add_box"></f7-link>
      <f7-link @click="getCountNotif" tab-link route-tab-id="tab4" href="tab4/">
      <f7-icon ios="f7:bell" md="material:notifications">
        <f7-badge v-show="notif > 0" color="red">{{notif}}</f7-badge>
      </f7-icon>
      <span class="tabbar-label">Notifikasi</span>
    </f7-link>
      <f7-link tab-link route-tab-id="tab5" href="tab5/" text="Profil" icon-ios="f7:person" icon-md="material:person"></f7-link>
    </f7-toolbar>
    <f7-tabs routable>
      <f7-tab class="page-content" id="tab1"></f7-tab>
      <f7-tab class="page-content" id="tab2"></f7-tab>
      <f7-tab class="page-content" id="tab3"></f7-tab>
      <f7-tab class="page-content" id="tab4"></f7-tab>
      <f7-tab class="page-content" id="tab5"></f7-tab>
    </f7-tabs>

    <!-- <f7-fab position="center-bottom" style="margin-bottom: -13px;" color="blue">
      <f7-icon ios="f7:plus" aurora="f7:plus" md="material:add"></f7-icon>
    </f7-fab> -->
  </f7-page>
</template>
<script>
import axios from '../config/axiosConfig'
export default {
  data () {
    return {
      notif: 0
    }
  },
  async created () {
    this.getCountNotif()
  },
  methods: {
    async getCountNotif () {
      let result = await axios().get('/notification/count')
      this.notif = result.data.data
      console.log('notif', result.data)
    }
  }
}
</script>
