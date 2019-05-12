<template>
  <f7-page>
    <f7-navbar>
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
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
    <f7-tab id="tab-1"></f7-tab>
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
  </f7-page>
</template>
<script>

export default {
    data() {
      return {
      };
    }
  }
</script>
<style scoped>
.demo-facebook-card .card-header {
  display: block;
  padding: 10px;
}
.demo-facebook-card .demo-facebook-avatar {
  float: left;
}
.demo-facebook-card .demo-facebook-name {
  margin-left: 44px;
  font-size: 14px;
  font-weight: 500;
}
.demo-facebook-card .demo-facebook-date {
  margin-left: 44px;
  font-size: 13px;
  color: #8e8e93;
}
.demo-facebook-card .card-footer {
  background: #fafafa;
}
.demo-facebook-card .card-footer a {
  color: #81848b;
  font-weight: 500;
}
.demo-facebook-card .card-content img {
  display: block;
}
.demo-facebook-card .card-content-padding {
  padding: 15px 10px;
}
.demo-facebook-card .card-content-padding .likes {
  color: #8e8e93;
}
</style>

