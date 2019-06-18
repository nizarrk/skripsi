<template>
  <f7-page>
    <f7-navbar title="Pengaturan" back-link="Back"></f7-navbar>
    <f7-block>
        <f7-list>
            <f7-list-item title="Mode Malam">
                <f7-icon slot="media" md="material:brightness_2"></f7-icon>
                <f7-toggle></f7-toggle>
            </f7-list-item>
            <f7-list-item title="Ubah Kata Sandi" link="/settings-pass/">
                <f7-icon slot="media" md="material:lock"></f7-icon>
            </f7-list-item>
            <f7-list-item title="Bantuan" link="#">
                <f7-icon slot="media" md="material:help_outline"></f7-icon>
            </f7-list-item>
            <f7-list-item title="Tentang Aplikasi" link="#">
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
    methods: {
        logOut() {
            localStorage.removeItem('token');
            this.$f7router.navigate('/login/');
        }
    }
}
</script>