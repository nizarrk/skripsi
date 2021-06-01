<template>
    <f7-page>
        <f7-navbar title="Survey" back-link="Back">
            <f7-nav-right>
                <f7-link icon-ios="f7:save" icon-md="material:check" @click="submitForm"></f7-link>
            </f7-nav-right>
        </f7-navbar>
            <f7-block strong v-for="(item, index) in items" :key="index">
                <span>{{index + 1}}.</span>
                <span>{{item.question}}</span>
                <div style="margin-top:10px;">
                    <f7-row>
                        <f7-col>
                            <f7-radio
                            :name="'jawaban'+index"
                            :value="item.id_jawaban1"
                            :checked="form[index].jwb === item.id_jawaban1"
                            @change="form[index].jwb = $event.target.value"
                            ></f7-radio>
                            <span style="margin-left:5px;">{{item.jawaban1}}</span>
                        </f7-col>
                        <f7-col>
                            <f7-radio
                            :name="'jawaban'+index"
                            :value="item.id_jawaban2"
                            :checked="form[index].jwb === item.id_jawaban2"
                            @change="form[index].jwb = $event.target.value"
                            ></f7-radio>
                            <span style="margin-left:5px;">{{item.jawaban2}}</span>
                        </f7-col>
                    </f7-row>
                    <f7-row style="margin-top:10px;">
                        <f7-col>
                            <f7-radio
                            :name="'jawaban'+index"
                            :value="item.id_jawaban3"
                            :checked="form[index].jwb === item.id_jawaban3"
                            @change="form[index].jwb = $event.target.value"
                            ></f7-radio>
                            <span style="margin-left:5px;">{{item.jawaban3}}</span>
                        </f7-col>
                        <f7-col>
                            <f7-radio
                            :name="'jawaban'+index"
                            :value="item.id_jawaban4"
                            :checked="form[index].jwb === item.id_jawaban4"
                            @change="form[index].jwb = $event.target.value"
                            ></f7-radio>
                            <span style="margin-left:5px;">{{item.jawaban4}}</span>
                        </f7-col>
                    </f7-row>
                </div>
            </f7-block>
    </f7-page>
</template>
<script>
import axios from '../config/axiosConfig'
export default {
  data () {
    return {
      baseURL: '',
      items: [],
      form: []
    }
  },
  async created () {
    try {
      // Listen to Cordova's backbutton event
      document.addEventListener('backbutton', this.navigateBack, false);
      let baseURL = await axios().request();
      this.baseURL = baseURL.config.baseURL;
      this.$f7.preloader.show();
      let result = await axios().get('/survey/get');
      this.$f7.preloader.hide();
      console.log(result.data.data);

      result.data.data.map((e, i) => {
        this.form.push({
          soal: e.id,
          jwb: null
        })
      })

      this.items = result.data.data;
    } catch (error) {
      console.log(error.response);
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
      if (app.views.main.router.url == '/home/tab1') {
        navigator.app.exitApp()
      } else {
        mainView.router.back('', {
          force: true
        })
      }
    },
    async submitForm () {
      try {
        let empty = this.form.some(e => e.jwb === null)
        if (empty) {
          this.$f7.dialog.alert('Lengkapi pengisan survey', 'Terjadi Kesalahan')
        } else {
          this.$f7.preloader.show()
          this.form.map(async (e, i) => {
            let result = await axios().post('/survey/submit', {
              soal: e.soal,
              jwb: e.jwb
            })
          })

          this.$f7.preloader.hide();
          this.openToast('Berhasil mengisi data survey')
          this.$f7router.back('', {
            force: true
          })
        }
      } catch (error) {
        console.log(error.response);
        this.$f7.preloader.hide();
        this.$f7.dialog.alert(error.response.data.message, 'Terjadi Kesalahan');
      }
    },
    openToast (text) {
      console.log(text)

      this.toastBottom = this.$f7.toast.create({
        text: text,
        closeTimeout: 3000
      });

      // Open it
      this.toastBottom.open();
    }
  },
  beforeDestroy () {
    document.removeEventListener('backbutton', this.navigateBack);
  }
}
</script>
