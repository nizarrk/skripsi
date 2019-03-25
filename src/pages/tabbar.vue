<template>
    <f7-toolbar tabbar labels :position="isBottom ? 'bottom' : 'top'">
      <f7-link tab-link="#tab-1" tab-link-active text="Beranda" icon-ios="f7:home" icon-md="material:home"></f7-link>
      <f7-link tab-link="#tab-2" text="Info" icon-ios="f7:info" icon-md="material:info"></f7-link>
      <f7-link tab-link="#tab-3" text="Lapor" icon-ios="f7:add" icon-md="material:add"></f7-link>
      <f7-link tab-link="#tab-4" text="Trayek" icon-ios="f7:navigation" icon-md="material:navigation"></f7-link>
      <f7-link tab-link route-tab-id="tab-1" href="/profile/" text="Profil" icon-ios="f7:person" icon-md="material:person"></f7-link>
    </f7-toolbar>
</template>
<script>
export default {
    data() {
      return {
        isBottom: true,
      };
    }
  }
</script>