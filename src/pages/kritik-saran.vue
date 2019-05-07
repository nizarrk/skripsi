<template>
  <f7-page>
    <f7-navbar title="Kritik dan Saran" back-link="Back">
      <f7-nav-right>
        <f7-link icon-ios="f7:save" icon-md="material:check" href="#"></f7-link>
      </f7-nav-right>
    </f7-navbar>
    <f7-block>
      <center>
        <f7-row no-gap>
              <f7-col>
                <div>
                  <label>
                    <input type="radio" name="test" value="Tidak Puas">
                    <f7-icon material="sentiment_dissatisfied" size="70px"></f7-icon>
                  </label>
                </div>
              </f7-col>
              <f7-col>
                <div>
                  <label>
                    <input type="radio" name="test" value="Netral">
                    <f7-icon material="sentiment_satisfied" size="70px"></f7-icon>
                  </label>
                </div>
              </f7-col>
              <f7-col>
                <div>
                  <label>
                    <input type="radio" name="test" value="Puas">
                    <f7-icon material="sentiment_very_satisfied" size="70px"></f7-icon>
                  </label>
                </div>
              </f7-col>
            </f7-row>
          </center>
    </f7-block>
    <f7-block strong>
        <f7-list no-hairlines-md>
            <f7-list-input
            type="textarea"
            placeholder="Kritik dan Saran"
            >
            </f7-list-input>
        </f7-list>
    </f7-block>
  </f7-page>
</template>

<script>
export default {}
</script>
<style scoped>
/* HIDE RADIO */
[type=radio] { 
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

/* IMAGE STYLES */
[type=radio] + i {
  cursor: pointer;
}

/* CHECKED STYLES */
[type=radio]:checked + i {
  color: #007aff;
  }
</style>
