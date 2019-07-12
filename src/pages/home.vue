<template>
  <f7-page ptr @ptr:refresh="pullToRefresh" :page-content="true">
    <f7-navbar>
      <f7-nav-title>Beranda</f7-nav-title>
      <f7-nav-left>
        <!-- <img style="width: 120px; padding-left:10px;" src="../static/e-dishub.png" alt="logo"> -->
      </f7-nav-left>
      <f7-nav-right>
        <!-- <f7-link class="searchbar-enable" data-searchbar=".searchbar-demo" icon-ios="f7:search_strong" icon-md="material:search"></f7-link> -->
      </f7-nav-right>
      <!-- <f7-searchbar
        class="searchbar-demo"
        expandable
        search-container=".search-list"
        search-in=".item-title"
      ></f7-searchbar> -->
    </f7-navbar>
    <f7-card class="demo-facebook-card" v-for="(item, index) in items" :key="index">
      <f7-card-header class="no-border" :laporid="item.id_lapor">
        <div class="demo-facebook-avatar">
          <img :src="baseURL + item.foto_user" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;"/>
        </div>
        <div class="demo-facebook-name">{{item.nama_user}}</div>
        <div class="demo-facebook-date">{{timeDifference(item.tgl_lapor)}}</div>
      </f7-card-header>
      <f7-card-content>
        <p>{{item.desk_lapor | limitToDisplay(item.desk_lapor)}}</p>
        <a :href="'/report-detail/' + item.id_lapor">
        <img :src="baseURL + item.foto_lapor" style="width: 100%; height: 300px; object-fit: cover;"/>
        <div class="text-block">
          <span style="font-size: 13px;"><f7-icon md="material:place" size="15px"></f7-icon>{{item.lokasi_lapor}}</span>
        </div>
        <span style="color: #8e8e93" v-show="item.kat_lapor == 'Angkutan Umum'"><f7-icon material="directions_bus" size="15px"></f7-icon><span> Angkutan Umum</span></span>
        <span style="color: #8e8e93" v-show="item.kat_lapor == 'Lalu Lintas'"><f7-icon material="traffic" size="15px"></f7-icon><span> Lalu Lintas</span></span>
        <span style="color: #8e8e93" v-show="item.kat_lapor == 'Perparkiran'"><f7-icon material="local_parking" size="15px"></f7-icon><span> Perparkiran</span></span>
        <span style="color: #8e8e93" v-show="item.kat_lapor == 'Infrastruktur'"><f7-icon material="language" size="15px"></f7-icon><span> Infrastruktur</span></span>
        <span style="color: #8e8e93" v-show="item.kat_lapor == 'Pengendalian Operasi'"><f7-icon material="directions_walk" size="15px"></f7-icon><span> Pengendalian Operasi</span></span>
        <span style="color: #8e8e93" v-show="item.kat_lapor == 'Layanan'"><f7-icon material="people" size="15px"></f7-icon><span> Layanan</span></span><br>
        
        <f7-row>
        <f7-col width="70">
          <p class="likes">Vote: {{item.total_vote}} &nbsp;&nbsp; Komentar: {{item.total_komentar}}</p>
        </f7-col>
        <f7-col width="30">
          <f7-chip v-if="item.status_lapor == 'Menunggu'" :text="item.status_lapor" color="yellow"></f7-chip>
          <f7-chip style="left: 25px;" v-else-if="item.status_lapor == 'Proses'" :text="item.status_lapor" color="blue"></f7-chip>
          <f7-chip style="left: 25px;" v-else-if="item.status_lapor == 'Selesai'" :text="item.status_lapor" color="green"></f7-chip>
          <f7-chip  v-else :text="item.status_lapor" color="red"></f7-chip>
        </f7-col>
      </f7-row>
        </a>
      </f7-card-content>
      <f7-card-footer class="no-border">
        <f7-row>
          <f7-col style="padding-left: 50px;">
            <f7-link v-if="item.pernah_vote == 1" style="color: #2999F3" @click="deleteVote(item.id_vote)"><f7-icon material="thumb_up" size="20px"></f7-icon> Vote</f7-link>
            <f7-link v-else @click="vote(item.id_lapor)"><f7-icon material="thumb_up" size="20px"></f7-icon> Vote</f7-link>
          </f7-col>
          <f7-col style="padding-left: 50px;">
            <f7-link :href="'/comments/' + item.id_lapor"><f7-icon material="comment" size="20px"></f7-icon> Komentar</f7-link>
          </f7-col>
          
          <!-- <f7-link @click="share"><f7-icon material="share" size="20px"></f7-icon> Bagikan</f7-link> -->
        </f7-row>
      </f7-card-footer>
    </f7-card>
  </f7-page>
</template>
<script>
import { setTimeout } from 'timers';
import date from '../mixins/dateConfig';
import axios from '../config/axiosConfig';
import { alert } from '../../plugins/cordova-plugin-dialogs/www/browser/notification';

export default {
    data() {
      return {
        baseURL: '',
        items: [],
        state: '',
        lastTimeBackPress: 0,
        timePeriodToExit: 2000
      };
    },
    async created() {
      try {        
        // Listen to Cordova's backbutton event
        document.addEventListener('backbutton', this.navigateBack , false);
        this.$f7.preloader.show();
        let baseURL = await axios().request();
        this.baseURL = baseURL.config.baseURL;
        let result = await axios().get('/lapor');
        this.$f7.preloader.hide();
        console.log(result.data.values);
        
        

        this.items = result.data.values;
      } catch (error) {
        console.log(error);
        this.$f7.preloader.hide();
        this.$f7.dialog.alert("Terjadi kesalahan pada server", 'Terjadi Kesalahan');
        localStorage.removeItem('token');
        this.$f7router.navigate('/login/');
      }
    },
    methods: {
      navigateBack(e) {
        let app = this.$f7;
        // Use Framework7's router to navigate back
        let mainView = app.views.main;
        if (app.views.main.router.url == '/home/') {
          if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
            navigator.app.exitApp();
          } else {
            this.toastBottom = this.$f7.toast.create({
              text: 'Tekan sekali lagi untuk keluar',
              closeTimeout: 2000,
            });
          
            // Open it
            this.toastBottom.open();

            this.lastTimeBackPress = new Date().getTime();
          }
        }
      },
      share() {
        if (navigator.share) {
          navigator.share({
              title: "Share topic",
              text: "Share message",
              url: "Share url"
          }).then(() => {
              console.log("Data was shared successfully");
          }).catch((err) => {
              console.error("Share failed:", err.message);
          });
        } else {
          alert('hai')
          
        }
      },
      async pullToRefresh(event, done) {
        let self = this;

        setTimeout(async () => {
          let result = await axios().get('/lapor');
          self.items = result.data.values;
          
          done();
        }, 1000);
      },
      async vote(id) {
        try {
          let vote = await axios().post('/lapor/vote', {
            idlapor: id
          });
          console.log('tambah vote', vote);
          this.state = 'tambah';
        } catch (error) {
          console.log(error.message);
          
        }
      },
      async deleteVote(id) {
        try {
          let vote = await axios().delete('/lapor/vote/' + id);
          console.log('delete vote', vote);
          this.state = 'hapus';
        } catch (error) {
          console.log(error.message);
          
        }
      }
    },
    watch: {
      state: {
        async handler() {
            console.log(this.state);
            let result = await axios().get('/lapor');
            this.items = result.data.values;       
        }
      }
    },
    filters: {
        limitToDisplay(text) {
          if (text.length < 100) {
            return text;
          } else {
            return text.substring(0, 100) + ' ....';
          }            
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

.text-block {
  z-index: 999;
  position: absolute;
  bottom: 85px;
  left: 10px;
  margin-right: 10px;
  width: 94%;
  color: white;
  background: rgba(0, 0, 0, 0.65);

}
</style>

