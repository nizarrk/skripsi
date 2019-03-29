<template id="tab-2-template">
    <f7-page>
        <f7-navbar title="Profile" back-link="Back"></f7-navbar>
        <div style="background-color:#F7F7F8; padding-top:30px; text-align:center">
                <img src="https://i.imgur.com/ApnPESG.png" style="border-radius:50px; weight:120px; height:120px;"/>
                <h2>Nizar Rahman Kusworo</h2>
                <h4><f7-icon f7="placemark"></f7-icon>Jl. Raya Candi II, Kota Malang, Jawa Timur</h4>
            <f7-toolbar tabbar top style="height:70px; margin-top:-30px;">
    <f7-link tab-link="#tab-1" tab-link-active>Menunggu<br><center>(0)</center></f7-link>
    <f7-link tab-link="#tab-2">Proses<br>(0)</f7-link>
    <f7-link tab-link="#tab-3">Selesai<br>(0)</f7-link>
  </f7-toolbar>
        </div>
        <div>
  <f7-tabs swipeable>
    <f7-tab id="tab-1" class="page-content" tab-active>
      <f7-block>
        <p>Tab 1 content</p>
        ...
      </f7-block>
    </f7-tab>
    <f7-tab id="tab-2" class="page-content">
      <f7-block>
        <p>Tab 2 content</p>
        ...
      </f7-block>
    </f7-tab>
    <f7-tab id="tab-3" class="page-content">
      <f7-block>
        <p>Tab 3 content</p>
        ...
      </f7-block>
    </f7-tab>
  </f7-tabs>
  </div>
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