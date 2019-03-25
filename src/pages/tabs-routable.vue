<template>
  <f7-page :page-content="false">
    <f7-toolbar tabbar labels bottom>
      <!-- <f7-link tab-link href="./" route-tab-id="tab1" text="Beranda" icon-ios="f7:home" icon-md="material:home"></f7-link>
      <f7-link tab-link href="tab2/" route-tab-id="tab2" text="Profil" icon-ios="f7:person" icon-md="material:person"></f7-link>
      <f7-link tab-link href="tab3/" route-tab-id="tab3" icon-ios="f7:info" icon-md="material:info"></f7-link> -->
      <f7-link tab-link route-tab-id="tab1" href="./" text="Beranda" icon-ios="f7:home" icon-md="material:home"></f7-link>
      <f7-link tab-link route-tab-id="tab3" href="tab3/" text="Info" icon-ios="f7:info" icon-md="material:info"></f7-link>
      <f7-link tab-link text="Lapor" icon-ios="f7:add" icon-md="material:add"></f7-link>
      <f7-link tab-link text="Trayek" icon-ios="f7:navigation" icon-md="material:navigation"></f7-link>
      <f7-link tab-link route-tab-id="tab2" href="tab2/" text="Profil" icon-ios="f7:person" icon-md="material:person"></f7-link>
    </f7-toolbar>
    <f7-tabs routable>
      <f7-tab class="page-content" id="tab1"></f7-tab>
      <f7-tab class="page-content" id="tab2"></f7-tab>
      <f7-tab class="page-content" id="tab3"></f7-tab>
      <f7-tab class="page-content" id="tab4"></f7-tab>
      <f7-tab class="page-content" id="tab5"></f7-tab>
    </f7-tabs>
  </f7-page>
</template>
<script>
  export default {
  };
</script>