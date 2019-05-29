<template>
  <f7-page ptr @ptr:refresh="pullToRefresh" :page-content="true">
    <f7-navbar>
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title>My App</f7-nav-title>
      <f7-nav-right>
        <f7-link class="searchbar-enable" data-searchbar=".searchbar-demo" icon-ios="f7:search_strong" icon-md="material:search"></f7-link>
      </f7-nav-right>
      <f7-searchbar
        class="searchbar-demo"
        expandable
        search-container=".search-list"
        search-in=".item-title"
      ></f7-searchbar>
    </f7-navbar>
    <f7-card class="demo-facebook-card" v-for="(item, index) in items" :key="index">
      <f7-card-header class="no-border" :laporid="item.id_lapor">
        <div class="demo-facebook-avatar">
          <img :src="baseURL + item.foto_user" style="width: 34px; border-radius: 20px;"/>
        </div>
        <div class="demo-facebook-name">{{item.nama_user}}</div>
        <div class="demo-facebook-date">{{timeDifference(item.tgl_lapor)}}</div>
      </f7-card-header>
      <f7-card-content>
        <p>{{item.desk_lapor}}</p>
        <a :href="'/report-detail/' + item.id_lapor">
        <img :src="baseURL + item.foto_lapor" width="100%"/>
        <span style="color: #8e8e93" v-show="item.kat_lapor == 'Angkutan Umum'"><f7-icon material="directions_bus" size="15px"></f7-icon><span> Angkutan Umum</span></span>
        <span style="color: #8e8e93" v-show="item.kat_lapor == 'Lalu Lintas'"><f7-icon material="traffic" size="15px"></f7-icon><span> Lalu Lintas</span></span>
        <span style="color: #8e8e93" v-show="item.kat_lapor == 'Perparkiran'"><f7-icon material="local_parking" size="15px"></f7-icon><span> Perparkiran</span></span>
        <span style="color: #8e8e93" v-show="item.kat_lapor == 'Infrastruktur'"><f7-icon material="language" size="15px"></f7-icon><span> Infrastruktur</span></span>
        <span style="color: #8e8e93" v-show="item.kat_lapor == 'Pengendalian Operasi'"><f7-icon material="directions_walk" size="15px"></f7-icon><span> Pengendalian Operasi</span></span>
        <span style="color: #8e8e93" v-show="item.kat_lapor == 'Layanan'"><f7-icon material="people" size="15px"></f7-icon><span> Layanan</span></span>
        <p class="likes"><f7-icon md="material:place" size="15px"></f7-icon>{{item.lokasi_lapor}}</p>
        <p class="likes">Likes: {{item.vote_lapor}} &nbsp;&nbsp; Comments: {{item.total_komentar}}</p>
        </a>
      </f7-card-content>
      <f7-card-footer class="no-border">
        <f7-link><f7-icon material="thumb_up" size="20px"></f7-icon> Like</f7-link>
        <f7-link><f7-icon material="comment" size="20px"></f7-icon> Comment</f7-link>
        <f7-link><f7-icon material="share" size="20px"></f7-icon> Share</f7-link>
      </f7-card-footer>
    </f7-card>
  </f7-page>
</template>
<script>
import { setTimeout } from 'timers';
import date from '../mixins/dateConfig';
import axios from '../config/axiosConfig';

export default {
    data() {
      return {
        baseURL: 'http://192.168.1.12:3000',
        items: []
      };
    },
    async created() {
      try {
        this.$f7.preloader.show();
        let result = await axios().get('/lapor');
        this.$f7.preloader.hide();
        console.log(result.data.values.length);

        this.items = result.data.values;
      } catch (error) {
        console.log(error);
        
      }
    },
    methods: {
      async pullToRefresh(event, done) {
        let self = this;

        setTimeout(async () => {
          let result = await axios().get('/lapor');
          self.items = result.data.values;
          
          done();
        }, 1000);
      }
    },
    mixins: [date]
  }
</script>
<style scoped>
.demo-facebook-card .card-header {
  display: block;
  padding: 10px;
}
.demo-facebook-card .demo-facebook-avatar {
  float: left;
}
.demo-facebook-card .demo-facebook-name {
  margin-left: 44px;
  font-size: 14px;
  font-weight: 500;
}
.demo-facebook-card .demo-facebook-date {
  margin-left: 44px;
  font-size: 13px;
  color: #8e8e93;
}
.demo-facebook-card .card-footer {
  background: #fafafa;
}
.demo-facebook-card .card-footer a {
  color: #81848b;
  font-weight: 500;
}
.demo-facebook-card .card-content img {
  display: block;
}
.demo-facebook-card .card-content-padding {
  padding: 15px 10px;
}
.demo-facebook-card .card-content-padding .likes {
  color: #8e8e93;
}
</style>

