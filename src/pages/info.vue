<template>
  <f7-page :page-content="false">
    <f7-navbar title="Info">      
    </f7-navbar>
    <f7-toolbar tabbar top>
      <f7-link tab-link="#tab-1" tab-link-active style="text-transform: capitalize;">Berita</f7-link>
      <f7-link tab-link="#tab-2" style="text-transform: capitalize;">Trayek</f7-link>
      <f7-link tab-link="#tab-3" style="text-transform: capitalize;">Parkir</f7-link>
    </f7-toolbar>

    <f7-tabs swipeable>
      <f7-tab id="tab-1" class="page-content" tab-active>
        <f7-block>
          <f7-card class="demo-card-header-pic">
            <f7-card-header
              class="no-border"
              valign="bottom"
              style="background-image:url(https://cdn.framework7.io/placeholder/nature-1000x600-3.jpg)"
            >Berita</f7-card-header>
            <f7-card-content>
              <p class="date">Posted on January 21, 2015</p>
              <p>Quisque eget vestibulum nulla. Quisque quis dui quis ex ultricies efficitur vitae non felis. Phasellus quis nibh hendrerit...</p>
            </f7-card-content>
            <f7-card-footer>
              <f7-link>Read more</f7-link>
            </f7-card-footer>
          </f7-card>
        </f7-block>
      </f7-tab>
      <f7-tab id="tab-2" class="page-content">
        <f7-block>
          <f7-card class="demo-card-header-pic">
            <f7-card-header
              class="no-border"
              valign="bottom"
              style="background-image:url(https://cdn.framework7.io/placeholder/nature-1000x600-3.jpg)"
            >Trayek</f7-card-header>
            <f7-card-content>
              <p class="date">Posted on January 21, 2015</p>
              <p>Quisque eget vestibulum nulla. Quisque quis dui quis ex ultricies efficitur vitae non felis. Phasellus quis nibh hendrerit...</p>
            </f7-card-content>
            <f7-card-footer>
              <f7-link>Read more</f7-link>
            </f7-card-footer>
          </f7-card>
        </f7-block>
      </f7-tab>
      <f7-tab id="tab-3" class="page-content">
        <f7-block>
          <f7-card class="demo-card-header-pic">
            <f7-card-header
              class="no-border"
              valign="bottom"
              style="background-image:url(https://cdn.framework7.io/placeholder/nature-1000x600-3.jpg)"
            >Parkir</f7-card-header>
            <f7-card-content>
              <p class="date">Posted on January 21, 2015</p>
              <p>Quisque eget vestibulum nulla. Quisque quis dui quis ex ultricies efficitur vitae non felis. Phasellus quis nibh hendrerit...</p>
            </f7-card-content>
            <f7-card-footer>
              <f7-link>Read more</f7-link>
            </f7-card-footer>
          </f7-card>
        </f7-block>
      </f7-tab>
    </f7-tabs>
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
.demo-card-header-pic .card-header {
  height: 40vw;
  background-size: cover;
  background-position: center;
  color: #fff;
}
.demo-card-header-pic .card-content-padding .date{
  color: #8e8e93;
}
</style>