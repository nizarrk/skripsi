<template>
  <f7-page>
    <f7-navbar title="Left Panel"></f7-navbar>
    <f7-block strong>
      <p>Left panel content goes here</p>
    </f7-block>
    <f7-block-title>Load page in panel</f7-block-title>
    <f7-list>
      <f7-list-item link="/about/" title="About"></f7-list-item>
      <f7-list-item link="/form/" title="Form"></f7-list-item>
    </f7-list>
    <f7-block-title>Load page in main view</f7-block-title>
    <f7-list>
      <f7-list-item link="/about/" title="About" view="#main-view" panel-close></f7-list-item>
      <f7-list-item link="/form/" title="Form" view="#main-view" panel-close></f7-list-item>
      <f7-list-item link="/profile/" title="Profile" view="#main-view" panel-close></f7-list-item>
      <f7-list-item link="/tab-swipe/" title="Tabs Swipe" view="#main-view" panel-close></f7-list-item>
      <f7-list-item link="/themes/" title="Color Themes" view="#main-view" panel-close></f7-list-item>
      <f7-list-item link="/leaflet/" title="Leaflet" view="#main-view" panel-close></f7-list-item>
      <f7-list-item link="#login-screen" title="Login Screen" view="#main-view" fill raised login-screen-open="#login-screen" panel-close></f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
export default {}
</script>