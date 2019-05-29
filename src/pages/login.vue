<template>
  <f7-page no-toolbar no-navbar no-swipeback login-screen>
    <f7-login-screen-title><img style="width: 70%;" src="../static/dishub.png" alt="logo"></f7-login-screen-title>
    <f7-login-screen-title style="margin-top: -30px; font-size: 30px;">Selamat Datang</f7-login-screen-title>
    <f7-list no-hairlines-md>
  <f7-list-input
    type="email"
    placeholder="Email"
    :value="email"
    @input="email = $event.target.value"
    clear-button
  >
    <f7-icon md="material:email" slot="media"></f7-icon>
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
      <f7-block-footer>Belum punya akun?</f7-block-footer>
      <f7-button style="text-transform:capitalize" href="/register/">Daftar Sekarang</f7-button>
    </f7-block>
  </f7-page>
</template>

<script>
import axios from '../config/axiosConfig';

  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      async signIn() {
        try {
          const self = this;
          const app = self.$f7;
          const router = self.$f7router;

          let user = await axios().post('/user/login', {
            email: this.email,
            pass: this.password
          });

          localStorage.setItem('token', user.data.token);
          router.navigate('/home/');
          
        } catch (error) {
          console.log(error.message);
          this.$f7.dialog.alert('Kombinasi email dan password salah!', 'Terjadi Kesalahan');  
        }
        
      },
    },
  };
</script>