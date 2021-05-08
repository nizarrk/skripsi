<template>
  <!-- App -->
  <f7-app :params="f7params">

    <!-- Statusbar -->
    <f7-statusbar></f7-statusbar>

    <!-- Left Panel -->
    <f7-panel left reveal theme-dark>
      <f7-view url="/panel-left/"></f7-view>
    </f7-panel>

    <!-- Right Panel -->
    <f7-panel right cover theme-dark>
      <f7-view url="/panel-right/"></f7-view>
    </f7-panel>

    <!-- Main View -->
    <f7-view id="main-view" url="/home/" main class="safe-areas" v-if="hastoken"></f7-view>
    <f7-view id="main-view" url="/login/" main class="safe-areas" v-else></f7-view>

    <!-- Popup -->
    <f7-popup id="popup">
      <f7-view>
        <f7-page>
          <f7-navbar title="Popup">
            <f7-nav-right>
              <f7-link popup-close>Close</f7-link>
            </f7-nav-right>
          </f7-navbar>
          <f7-block>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, architecto. Cupiditate laudantium rem nesciunt numquam, ipsam. Voluptates omnis, a inventore atque ratione aliquam. Omnis iusto nemo quos ullam obcaecati, quod.</f7-block>
        </f7-page>
      </f7-view>
    </f7-popup>

  </f7-app>
</template>

<script>
// Import Routes
import routes from './routes.js'
import { alert } from '../plugins/cordova-plugin-dialogs/www/browser/notification'

export default {
  data () {
    return {
      hastoken: false,
      // Framework7 parameters here
      f7params: {
        id: 'io.framework7.testapp', // App bundle ID
        name: 'Framework7', // App name
        theme: 'auto', // Automatic theme detection
        // App routes
        routes: routes
      }
    }
  },
  created () {
    try {
      // Return true / false - check if a JWT token is stored in cookies or local storage
      this.hastoken = this.$jwt.hasToken(localStorage.getItem('token'))
      console.log('has', this.hastoken)

      // Return token from cookies or local storage
      let token = this.$jwt.getToken(localStorage.getItem('token'))
      console.log('get', token)

      // Decode JWT token and return payload
      let decode = this.$jwt.decode(localStorage.getItem('token'))
      console.log('decode', decode)

      if (decode.exp < Date.now() / 1000) {
        this.$f7.preloader.hide()
        localStorage.removeItem('token')
        this.$f7router.navigate('/login/')
        console.log('token not valid')
      } else {
        console.log('token valid')
      }
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
