<template>
  <f7-page no-toolbar no-navbar no-swipeback login-screen>
    <f7-login-screen-title>Framework7</f7-login-screen-title>
    <f7-list form>
      <f7-list-input
        label="Email"
        type="email"
        placeholder="Your email"
        :value="email"
        @input="email = $event.target.value"
      ></f7-list-input>
      <f7-list-input
        label="Password"
        type="password"
        placeholder="Your password"
        :value="password"
        @input="password = $event.target.value"
      ></f7-list-input>
    </f7-list>
    <f7-list>
      <f7-list-button @click="signIn">Sign In</f7-list-button>
      <f7-block-footer>Some text about login information.<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</f7-block-footer>
    </f7-list>
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