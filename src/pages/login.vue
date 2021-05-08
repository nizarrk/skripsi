<template>
  <f7-page no-toolbar no-navbar no-swipeback login-screen>
    <f7-login-screen-title><img style="width: 70%; margin-top: 30px;" src="../static/dishub.jpg" alt="logo"></f7-login-screen-title>
    <f7-login-screen-title style="margin-top: -30px; font-size: 30px;">Selamat Datang</f7-login-screen-title>
    <f7-list no-hairlines-md>
    <f7-list-input
        type="text"
        placeholder="Username"
        :value="username"
        @input="username = $event.target.value"
        clear-button
      >
        <f7-icon md="material:person" slot="media"></f7-icon>
      </f7-list-input>

      <f7-list-input
        type="password"
        placeholder="Password"
        :value="password"
        @input="password = $event.target.value"
        clear-button
      >
        <f7-icon md="material:lock" slot="media"></f7-icon>
      </f7-list-input>

    </f7-list>
    <f7-block>
      <f7-button style="text-transform:capitalize" fill @click="signIn">Masuk</f7-button>
    </f7-block>
    <f7-block>
      <f7-row>
        <!-- <f7-col><f7-link href="/register/">Daftar Sekarang</f7-link></f7-col> -->
        <f7-col><f7-link style="float: right" href="/forgot-pass/">Lupa Password?</f7-link></f7-col>
      </f7-row>
      <!-- <f7-button style="text-transform:capitalize" href="/register/">Daftar Sekarang</f7-button> -->
    </f7-block>
    <f7-block style="position: fixed; bottom: 0; left: 0 text-align: center; width: 100%;">
      <f7-block-footer>
        Belum punya akun?
        <f7-link href="/register/">Daftar Sekarang</f7-link>
      </f7-block-footer>
    </f7-block>
  </f7-page>
</template>

<script>
import axios from '../config/axiosConfig'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async signIn () {
      try {
        const self = this
        const app = self.$f7
        const router = self.$f7router

        let user = await axios().post('/user/login', {
          username: this.username,
          pass: this.password
        })

        if (user.data.data.row.is_admin == 1) {
          this.$f7.dialog.alert('Kombinasi email dan password salah!', 'Terjadi Kesalahan')
        } else {
          localStorage.setItem('token', user.data.data.assignToken)
          router.navigate('/home/')
        }
      } catch (error) {
        console.log(error.response)
        if (error.response.data.status == 403) {
          this.$f7.dialog.alert('Silahkan verifikasi email anda!', 'Terjadi Kesalahan')
        } else {
          this.$f7.dialog.alert('Kombinasi email dan password salah!', 'Terjadi Kesalahan')
        }
      }
    }
  }
}
</script>
