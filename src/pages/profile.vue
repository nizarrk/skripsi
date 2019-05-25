<template>
    <f7-page ptr @ptr:refresh="pullToRefresh">
        <f7-navbar title="Profile">
          <f7-nav-right>
            <f7-link icon-ios="f7:gear" icon-md="material:settings" href="/settings/"></f7-link>
          </f7-nav-right>
        </f7-navbar>
        <f7-block strong>
              <f7-row>
                <f7-col width="25">
                  <img :src="items.foto_user" 
                  style="border-radius:50px; weight:70px; height:70px;"/>
                </f7-col>
                <f7-col width="50">
                  <span style="font-size:18px;"><b>{{items.nama_user}}</b></span><br>
                <span><f7-icon md="material:place"></f7-icon>{{items.alamat_user}}</span>
                  <!-- <f7-button raised style="text-transform: capitalize;">Sunting</f7-button> -->
                </f7-col>
                <f7-col width="25" style="padding-top:15px; padding-left:25px;">
                  <f7-link icon-ios="f7:bell" icon-md="material:edit" href="/edit-profile/" />
                </f7-col>
              </f7-row>
        </f7-block>
        <f7-block strong style="margin-top:-32px;">
          <f7-row style="text-align:center;">
                    <f7-col>
                      <span style="font-size:18px;">{{items.menunggu}}</span><br>
                      <span style="font-size:16px;"> Menunggu</span>
                    </f7-col>
                    <f7-col>
                      <span style="font-size:18px;">{{items.proses}}</span><br>
                      <span style="font-size:16px;"> Proses</span>
                    </f7-col>
                    <f7-col>
                      <span style="font-size:18px;">{{items.selesai}}</span><br>
                      <span style="font-size:16px;"> Selesai</span>
                    </f7-col>
                  </f7-row>
        </f7-block>
        <f7-block>
          <f7-list>
            <f7-list-item link="/report-list/" title="Laporan Keluhan" :badge="items.total_lapor">
              <f7-icon slot="media" md="material:report"></f7-icon>
            </f7-list-item>
            <f7-list-item link="/pinjam-jalan/" title="Peminjaman Jalan">
              <f7-icon slot="media" md="material:note_add"></f7-icon>
            </f7-list-item>
            <f7-list-item link="/survey/" title="Survey Kepuasan Masyarakat">
              <f7-icon slot="media" md="material:assignment"></f7-icon>
            </f7-list-item>
            <f7-list-item link="/kritik-saran/" title="Kritik dan Saran">
              <f7-icon slot="media" md="material:textsms"></f7-icon>
            </f7-list-item>
          </f7-list>
        </f7-block>
    </f7-page>
</template>
<script>
import { log } from 'util';
import axios from '../config/axiosConfig';

export default {
    data() {
      return {
        items: []
      };
    },
    async created() {
      this.$f7.dialog.preloader();
      let result = await axios().get('/user/profile');
      this.$f7.dialog.close();
      //console.log(result.data.values);

      this.items = result.data.values[0];
      console.log(this.items);
      
    },
    methods: {
      async pullToRefresh(event, done) {
        let self = this;

        setTimeout(async () => {
          let result = await axios().get('/user/profile');
          self.items = result.data.values[0];
          
          done();
        }, 1000);
      }
    }
  }
</script>