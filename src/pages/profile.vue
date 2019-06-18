<template>
    <f7-page ptr @ptr:refresh="pullToRefresh">
        <f7-navbar title="Profile">
          <f7-nav-right>
            <f7-link icon-ios="f7:gear" icon-md="material:settings" href="/settings/"></f7-link>
          </f7-nav-right>
        </f7-navbar>
        <f7-block>
              <f7-row>
                <f7-col width="25">
                  <img :src="baseURL + items.foto_user" 
                  style="width: 70px; height: 70px; border-radius: 50%; object-fit: cover;"/>
                </f7-col>
                <f7-col width="50">
                  <span style="font-size:18px;"><b>{{items.nama_user}}</b></span><br>
                <span style="color: #8e8e93; font-size:13px;"><f7-icon md="material:place" size="20px"></f7-icon>{{items.alamat_user}}</span>
                  <!-- <f7-button raised style="text-transform: capitalize;">Sunting</f7-button> -->
                </f7-col>
                <f7-col width="25" style="padding-top:15px; padding-left:50px;">
                  <f7-link icon-ios="f7:bell" icon-md="material:edit" :href="'/profile-edit/' + items.id_user" />
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
            <f7-list-item link="/izin-list/" title="Izin Penggunaan Jalan" :badge="items.total_izin">
              <f7-icon slot="media" md="material:note_add"></f7-icon>
            </f7-list-item>
            <f7-list-item link="/survey/" title="Survey Kepuasan">
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
        baseURL: '',
        items: []
      };
    },
    async created() {
      try {
        let baseURL = await axios().request();
        this.baseURL = baseURL.config.baseURL;
        this.$f7.preloader.show();
        let result = await axios().get('/user/profile');
        this.$f7.preloader.hide();
        //console.log(result.data.values);

        this.items = result.data.values[0];
        console.log(result.data);
      } catch (error) {
        console.log(error.message);
        
      }      
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