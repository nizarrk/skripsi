<template>
  <f7-page>
    <f7-navbar title="Laporan Keluhan" back-link="Back"></f7-navbar>
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
      <f7-block-title medium>Komentar</f7-block-title>
        <f7-block>
          <f7-list media-list>
            <f7-list-item
              title="test12"
              after="6 hari yang lalu">
              <img slot="media" src="https://cdn.framework7.io/placeholder/fashion-88x88-1.jpg" width="44" />
              <span style="font-size: 13px; color: #8e8e93;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</span>
            </f7-list-item>
          </f7-list>
          <f7-button fill style="text-transform: capitalize;" href="/comments/">Lihat Semua Komentar</f7-button>
        </f7-block>
    </f7-page>
</template>

<script>
export default {}
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