<template>
  <f7-page ptr @ptr:refresh="pullToRefresh" infinite :infinite-distance="50" :infinite-preloader="showPreloader" @infinite="loadMore" :page-content="true">
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
      <div v-show="total !== 0 && hasLoaded == true">
        <f7-card class="demo-facebook-card" v-for="(item, index) in items" :key="index">
          <f7-card-header class="no-border" :laporid="item.id">
            <div class="demo-facebook-avatar">
              <img :src="baseURL + item.picture" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;"/>
            </div>
            <div class="demo-facebook-name">{{item.name}}</div>
            <div class="demo-facebook-date">{{timeDifference(item.created_at)}}</div>
          </f7-card-header>
          <f7-card-content>
            <p>{{item.description | limitToDisplay(item.description)}}</p>
            <a :href="'/report-detail/' + item.id">
              <img :src="baseURL + item.image" style="width: 100%; height: 300px; object-fit: cover;"/>
              <div class="text-block">
                <span style="font-size: 13px;"><f7-icon md="material:place" size="15px"></f7-icon>{{item.location}}</span>
              </div>
              
              <span style="color: #8e8e93" v-show="item.category == 'Angkutan Umum'"><f7-icon material="directions_bus" size="15px"></f7-icon><span> Angkutan Umum</span></span>
              <span style="color: #8e8e93" v-show="item.category == 'Lalu Lintas'"><f7-icon material="traffic" size="15px"></f7-icon><span> Lalu Lintas</span></span>
              <span style="color: #8e8e93" v-show="item.category == 'Perparkiran'"><f7-icon material="local_parking" size="15px"></f7-icon><span> Perparkiran</span></span>
              <span style="color: #8e8e93" v-show="item.category == 'Infrastruktur'"><f7-icon material="language" size="15px"></f7-icon><span> Infrastruktur</span></span>
              <span style="color: #8e8e93" v-show="item.category == 'Pengendalian Operasi'"><f7-icon material="directions_walk" size="15px"></f7-icon><span> Pengendalian Operasi</span></span>
              <span style="color: #8e8e93" v-show="item.category == 'Layanan'"><f7-icon material="people" size="15px"></f7-icon><span> Layanan</span></span><br>

              <f7-row>
                <f7-col width="70">
                  <p class="likes">Vote: {{item.total_vote}} &nbsp;&nbsp; Komentar: {{item.total_comments}}</p>
                </f7-col>
                <f7-col width="30">
                  <f7-chip v-if="item.status == 0" text="Pending" color="yellow" style="float: right;"></f7-chip>
                  <f7-chip v-else-if="item.status == 1" text="Proses" color="blue" style="float: right;"></f7-chip>
                  <f7-chip v-else-if="item.status == 2" text="Selesai" color="green" style="float: right;"></f7-chip>
                  <f7-chip v-else text="Ditolak" color="red"></f7-chip>
                </f7-col>
              </f7-row>
            </a>
          </f7-card-content>
          <f7-card-footer class="no-border">
                <f7-link v-if="item.has_voted > 0" style="color: #2999F3; margin-left: 20px;" @click="deleteVote(item.votes_id)"><f7-icon material="thumb_up" size="20px"></f7-icon> Vote</f7-link>
                <f7-link v-else @click="vote(item.id)" style="margin-left: 20px;"><f7-icon material="thumb_up" size="20px"></f7-icon> Vote</f7-link>
                <f7-link :href="'/comments/' + item.id"><f7-icon material="comment" size="20px"></f7-icon> Komentar</f7-link>
                <f7-link @click="share(item)" style="margin-right: 20px;"><f7-icon material="share" size="20px"></f7-icon> Bagikan</f7-link>
            <!-- <f7-row>
              <f7-col style="padding-left: 50px;">
                <f7-link v-if="item.has_voted == 1" style="color: #2999F3" @click="deleteVote(item.votes_id)"><f7-icon material="thumb_up" size="20px"></f7-icon> Vote</f7-link>
                <f7-link v-else @click="vote(item.id)"><f7-icon material="thumb_up" size="20px"></f7-icon> Vote</f7-link>
              </f7-col>
              <f7-col style="padding-left: 50px;">
                <f7-link :href="'/comments/' + item.id"><f7-icon material="comment" size="20px"></f7-icon> Komentar</f7-link>
              </f7-col>
              <f7-col>
                <f7-link @click="share"><f7-icon material="share" size="20px"></f7-icon> Bagikan</f7-link>
              </f7-col>
            </f7-row> -->
          </f7-card-footer>
        </f7-card>
      </div>
      <div v-show="total == 0 && hasLoaded == true" style="padding-top: 300px;">
        <center><span style="font-size: 17px; color: #8e8e93;">Tidak Ada Feed Baru.</span></center>
      </div>
      <center>
        <f7-preloader v-show="showPreloader" style="margin-top: 30px;"></f7-preloader>
      </center>
  </f7-page>
</template>
<script>
import { setTimeout } from 'timers'
import date from '../mixins/dateConfig'
import axios from '../config/axiosConfig'
import { alert } from '../../plugins/cordova-plugin-dialogs/www/browser/notification'

export default {
  data () {
    return {
      baseURL: '',
      items: [],
      state: '',
      lastTimeBackPress: 0,
      timePeriodToExit: 2000,

      hasLoaded: false,

      // infinite scroll
      total: 0,
      page: 1, // pagination
      allowInfinite: true,
      showPreloader: false
    }
  },
  async created () {
    try {
      console.log(this.$f7.views.main);
      // Listen to Cordova's backbutton event
      document.addEventListener('backbutton', this.navigateBack, false)
      this.$f7.preloader.show()
      let baseURL = await axios().request()
      this.baseURL = baseURL.config.baseURL
      let result = await axios().get('/report/home?limit=20&page=1');
      this.hasLoaded = true;
      this.$f7.preloader.hide()
      console.log(result.data.data)

      this.page = result.data.data.nextPage;
      this.items = result.data.data.data;
      this.total = result.data.data.total;


      // to turn off pagination preloader if this page is last page
      if (this.page == null) {
        this.showPreloader = false;
      } else {
        this.showPreloader = true;
      }
    } catch (error) {
      console.log(error.response)
      this.$f7.preloader.hide()
      if (error.response.data.status == 401) {
        this.toastBottom = this.$f7.toast.create({
          text: 'Sesi anda telah berakhir',
          closeTimeout: 2000
        })

        // Open it
        this.toastBottom.open()

        localStorage.removeItem('token')
        this.$f7router.navigate('/login/')
      } else {
        this.$f7.dialog.alert(error.response.data.message, 'Terjadi Kesalahan')
      }
      // this.$f7.dialog.alert(error.response.data.message, 'Terjadi Kesalahan');
      // localStorage.removeItem('token');
      // this.$f7router.navigate('/login/');
    }
  },
  methods: {
    navigateBack (e) {
      let app = this.$f7
      // Use Framework7's router to navigate back
      let mainView = app.views.main
      if (mainView.router.url == '/home/') {
        if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
          navigator.app.exitApp()
        } else {
          this.toastBottom = this.$f7.toast.create({
            text: 'Tekan sekali lagi untuk keluar',
            closeTimeout: 2000
          })

          // Open it
          this.toastBottom.open()

          this.lastTimeBackPress = new Date().getTime()
        }
      }
    },
    share (item) {
      if (navigator.share) {
        navigator.share({
          title: item.code,
          text: item.description,
          url: 'http://localhost:8081/redirect'
        }).then(() => {
          console.log('Data was shared successfully');
          this.toastBottom = this.$f7.toast.create({
            text: 'Berhasil membagikan laporan',
            closeTimeout: 2000
          })

          // Open it
          this.toastBottom.open()
        }).catch((err) => {
          console.error('Share failed:', err.message)
        })
      }
    },
    async pullToRefresh (event, done) {
      let self = this

      setTimeout(async () => {
        let result = await axios().get('/report/home?limit=20&page=1');

        self.page = result.data.data.nextPage;
        self.items = result.data.data.data;
        self.total = result.data.data.total;


      // to turn off pagination preloader if this page is last page
      if (this.page == null) {
        this.showPreloader = false;
      } else {
        this.showPreloader = true;
      }

        done()
      }, 1000)
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

        let result = await axios().get(`/report/home?limit=20&page=${self.page}`);

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
    async vote (id) {
      try {
        let vote = await axios().post('/report/vote', {
          idlapor: id
        })
        console.log('tambah vote', vote)
        this.state = 'tambah vote' + new Date().getTime() // time buat pembeda
      } catch (error) {
        console.log(error.message)
      }
    },
    async deleteVote (id) {
      try {
        let vote = await axios().delete('/report/vote/remove/' + id)
        console.log('delete vote', vote)
        this.state = 'hapus vote' + new Date().getTime() // time buat pembeda
      } catch (error) {
        console.log(error.message)
      }
    }
  },
  watch: {
    state: {
      async handler () {
        console.log(this.state)
        let limit = this.items.length;
        let result = await axios().get(`/report/home?limit=${this.page > 1 ? limit : 20}&page=1`)
        this.items = result.data.data.data
      }
    }
  },
  filters: {
    limitToDisplay (text) {
      if (text.length < 100) {
        return text
      } else {
        return text.substring(0, 100) + ' ....'
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
  width: 95%;
  color: white;
  background: rgba(0, 0, 0, 0.65);

}
</style>
