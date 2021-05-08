<template>
    <f7-page>
        <f7-navbar title="Lupa Password" back-link="Back">
            <f7-nav-right>
                <f7-link icon-ios="f7:save" icon-md="material:check" @click="forgotPass"></f7-link>
            </f7-nav-right>
        </f7-navbar>
        <f7-block>
            <p>
                Silahkan masukkan Email anda pada form dibawah, kami akan mengirimkan email untuk kepada anda untuk reset password
            </p>
        <f7-list form id="form" no-hairlines-md>
            <f7-list-input
            type="email"
            placeholder="Enter email"
            :value="email"
            @input="email = $event.target.value"
            info="Masukkan email akun anda"
            :error-message-force = errorforce
            error-message="Email tidak valid"
            required
            validate
            clear-button
            >
            <!-- <f7-icon icon="demo-list-icon" slot="media"></f7-icon> -->
            </f7-list-input>
        </f7-list>
        </f7-block>
    </f7-page>
</template>
<script>
import axios from '../config/axiosConfig'

export default {
  data () {
    return {
      email: null,
      errorforce: false
    }
  },
  methods: {
    async forgotPass () {
      console.log(document.getElementById('form').checkValidity())
      if (document.getElementById('form').checkValidity() == false) {
        console.log('a')
        this.$f7.input.validateInputs(document.getElementById('form'))
      } else {
        if (this.errorforce == true) {
          console.log('b')
          // this.errorforce = false;
        } else {
          try {
            console.log('c')
            let user = await axios().post('/user/forgotpassword', {
              email: this.email
            })
            console.log('SUCCESS!!', user.data)

            this.openToast('Berhasil! Silahkan cek email anda untuk melakukan reset password!')
            this.$f7router.back('', {
              force: true
            })
          } catch (error) {
            console.log('ERROR!!', error.response)
            this.$f7.dialog.alert(error.response.data.message, 'Terjadi Kesalahan')
          }
        }
      }
    },
    openToast (text) {
      console.log(text)

      this.toastBottom = this.$f7.toast.create({
        text: text,
        closeTimeout: 3000
      })

      // Open it
      this.toastBottom.open()
    }
  }
}
</script>
