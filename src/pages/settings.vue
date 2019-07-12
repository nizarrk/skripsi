<template>
  <f7-page>
    <f7-navbar title="Pengaturan" back-link="Back"></f7-navbar>
    <f7-block>
        <f7-list>
            <f7-list-item title="Ubah Kata Sandi" link="/settings-pass/">
                <f7-icon slot="media" md="material:lock"></f7-icon>
            </f7-list-item>
            <f7-list-item title="Tentang Aplikasi" link="/about/">
                <f7-icon slot="media" md="material:apps"></f7-icon>
            </f7-list-item>
        </f7-list>
    </f7-block>
    <f7-block>
        <f7-list>
            <f7-list-item title="Keluar" @click="logOut">
                <f7-icon slot="media" md="material:exit_to_app"></f7-icon>
            </f7-list-item>
        </f7-list>
    </f7-block>
  </f7-page>
</template>

<script>
export default {
    data() {
        return {

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
        logOut() {
            localStorage.removeItem('token');
            this.$f7router.navigate('/login/');
        }
    },
    beforeDestroy () {
        document.removeEventListener("backbutton", this.navigateBack);
    },
}
</script>