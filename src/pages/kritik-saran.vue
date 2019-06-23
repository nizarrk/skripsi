<template>
  <f7-page>
    <f7-navbar title="Kritik dan Saran" back-link="Back">
      <f7-nav-right>
        <f7-link icon-ios="f7:save" icon-md="material:check" @click="submitForm"></f7-link>
      </f7-nav-right>
    </f7-navbar>
    <f7-block-title>Rating Kepuasan</f7-block-title>
    <f7-block>
      <center>
        <f7-row no-gap>
              <f7-col>
                <div>
                  <label>
                    <input type="radio" name="rate" v-model="rate" value="Tidak Puas">
                    <f7-icon material="sentiment_dissatisfied" size="70px"></f7-icon>
                  </label>
                </div>
              </f7-col>
              <f7-col>
                <div>
                  <label>
                    <input type="radio" name="rate" v-model="rate" value="Netral">
                    <f7-icon material="sentiment_satisfied" size="70px"></f7-icon>
                  </label>
                </div>
              </f7-col>
              <f7-col>
                <div>
                  <label>
                    <input type="radio" name="rate" v-model="rate" value="Puas">
                    <f7-icon material="sentiment_very_satisfied" size="70px"></f7-icon>
                  </label>
                </div>
              </f7-col>
            </f7-row>
          </center>
    </f7-block>
    <f7-block>
        <f7-list form id="form">
            <f7-list-input
                label="Kritik dan Saran"
                type="textarea"
                placeholder="Deskripsi"
                :value="desk"
                @input="desk = $event.target.value"
                required
                validate
                clear-button
            >
            </f7-list-input>
        </f7-list>
    </f7-block>
  </f7-page>
</template>

<script>
import axios from '../config/axiosConfig';

export default {
  data() {
    return {
      rate: '',
      desk: ''
    }
  },
  created() {
    // Listen to Cordova's backbutton event
    document.addEventListener('backbutton', this.navigateBack , false);
  },
  methods: {
    navigateBack() {
      let app = this.$f7;
      let $$ = this.$$;
      // Use Framework7's router to navigate back
      let mainView = app.views.main;          
      if (app.views.main.router.url == '/home/tab1') {
        navigator.app.exitApp();
      } else {
        mainView.router.back('', {
            force: true
        });
      }
    },
    async submitForm() {
      try {
        if (this.rate =='' || this.desk == '') {
          this.$f7.input.validateInputs(document.getElementsByTagName('input'));
          this.$f7.dialog.alert('Harap lengkapi pengisian form', 'Terjadi Kesalahan');
        } else {
          // let formData = new FormData();

          // /*Add the form data we need to submit*/
          // formData.append('rate', this.rate);
          // formData.append('desk', this.desk);

          // // Display the key/value pairs
          // for (var pair of formData.entries()) {
          //     console.log(pair[0]+ ': ' + pair[1]); 
          // }


          let result = await axios().post('/kritik/', {
            rate: this.rate,
            desk: this.desk
          });
          console.log(result.data);
          this.$f7.dialog.alert(result.statusText, 'Berhasil'); 
          this.$f7router.back('', {
            force: true
          });
          }
      } catch (error) {
        console.log(error.message);
          
      }
    },
  },
  beforeDestroy () {
    document.removeEventListener("backbutton", this.navigateBack);
  },
}
</script>
<style scoped>
/* HIDE RADIO */
[type=radio] { 
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

/* IMAGE STYLES */
[type=radio] + i {
  cursor: pointer;
}

/* CHECKED STYLES */
[type=radio]:checked + i {
  color: #007aff;
  }
</style>
