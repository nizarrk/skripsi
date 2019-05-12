<template>
  <f7-page>
    <f7-navbar title="Laporan Keluhan" back-link="Back"></f7-navbar>
    <f7-block-title>Styled Cards</f7-block-title>
<f7-card class="demo-card-header-pic">
  <f7-card-header
    class="no-border"
    valign="bottom"
    style="background-image:url(https://cdn.framework7.io/placeholder/nature-1000x600-3.jpg)"
  >Journey To Mountains</f7-card-header>
  <f7-card-content>
    <p class="date">Posted on January 21, 2015</p>
    <p>Quisque eget vestibulum nulla. Quisque quis dui quis ex ultricies efficitur vitae non felis. Phasellus quis nibh hendrerit...</p>
  </f7-card-content>
  <f7-card-footer>
    <span>Status:</span>
    <f7-link>Read more</f7-link>
  </f7-card-footer>
</f7-card>
<f7-card class="demo-card-header-pic">
  <f7-card-header
    class="no-border"
    valign="bottom"
    style="background-image:url(https://cdn.framework7.io/placeholder/people-1000x600-6.jpg)"
  >Journey To Mountains</f7-card-header>
  <f7-card-content>
    <p class="date">Posted on January 21, 2015</p>
    <p>Quisque eget vestibulum nulla. Quisque quis dui quis ex ultricies efficitur vitae non felis. Phasellus quis nibh hendrerit...</p>
  </f7-card-content>
  <f7-card-footer>
    <span>Status:</span>
    <f7-link href="/report-detail/">Read more</f7-link>
  </f7-card-footer>
</f7-card>
  </f7-page>
</template>

<script>
export default {}
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
