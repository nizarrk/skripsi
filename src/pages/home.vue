<template>
  <f7-page>
    <f7-navbar>
      <f7-nav-left>
        <f7-link icon-if-ios="f7:menu" icon-if-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title>My App</f7-nav-title>
      <f7-nav-right>
      <f7-link class="searchbar-enable" data-searchbar=".searchbar-demo" icon-ios="f7:search_strong" icon-md="material:search"></f7-link>
    </f7-nav-right>
    <f7-searchbar
      class="searchbar-demo"
      expandable
      search-container=".search-list"
      search-in=".item-title"
    ></f7-searchbar>
    </f7-navbar>
    <f7-card class="demo-facebook-card">
  <f7-card-header class="no-border">
    <div class="demo-facebook-avatar"><img src="https://cdn.framework7.io/placeholder/people-68x68-1.jpg" width="34" height="34"/></div>
    <div class="demo-facebook-name">John Doe</div>
    <div class="demo-facebook-date">Monday at 2:15 PM</div>
  </f7-card-header>
  <f7-card-content>
    <p>What a nice photo i took yesterday!</p><img src="https://cdn.framework7.io/placeholder/nature-1000x700-8.jpg" width="100%"/>
    <p class="likes">Likes: 112 &nbsp;&nbsp; Comments: 43</p>
  </f7-card-content>
  <f7-card-footer class="no-border">
    <f7-link>Like</f7-link>
    <f7-link>Comment</f7-link>
    <f7-link>Share</f7-link>
  </f7-card-footer>
</f7-card>
<f7-card class="demo-facebook-card">
  <f7-card-header class="no-border">
    <div class="demo-facebook-avatar"><img src="https://cdn.framework7.io/placeholder/people-68x68-1.jpg" width="34" height="34"/></div>
    <div class="demo-facebook-name">John Doe</div>
    <div class="demo-facebook-date">Monday at 2:15 PM</div>
  </f7-card-header>
  <f7-card-content>
    <p>What a nice photo i took yesterday!</p><img src="https://cdn.framework7.io/placeholder/nature-1000x700-8.jpg" width="100%"/>
    <p class="likes">Likes: 112 &nbsp;&nbsp; Comments: 43</p>
  </f7-card-content>
  <f7-card-footer class="no-border">
    <f7-link>Like</f7-link>
    <f7-link>Comment</f7-link>
    <f7-link>Share</f7-link>
  </f7-card-footer>
</f7-card>
<f7-toolbar tabbar labels :position="isBottom ? 'bottom' : 'top'">
      <f7-link tab-link="#tab-1" tab-link-active text="Home" icon-ios="f7:home" icon-md="material:home"></f7-link>
      <f7-link tab-link="#tab-2" text="Info" icon-ios="f7:info" icon-md="material:info"></f7-link>
      <f7-link tab-link="#tab-3" text="Lapor" icon-ios="f7:add" icon-md="material:add"></f7-link>
      <f7-link tab-link="#tab-4" text="Trayek" icon-ios="f7:navigation" icon-md="material:navigation"></f7-link>
      <f7-link tab-link="#tab-5" text="Akun" icon-ios="f7:person" icon-md="material:person"></f7-link>
    </f7-toolbar>

  </f7-page>
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
