<template>
  <f7-page>
    <f7-navbar title="Komentar" back-link="Back"></f7-navbar>
        <f7-block>
          <f7-list media-list v-for="(item, index) in items" :key="index">
            <f7-list-item
              :title="item.nama_user"
              :after="timeDifference(item.tgl_komentar)">
              <img slot="media" :src="item.foto_user" width="44" />
                <span style="font-size: 13px; color: #8e8e93;">
                  {{item.desk_komentar}}
                </span>
            </f7-list-item>
          </f7-list>
        </f7-block>
    <f7-messagebar
      placeholder="Ketik Komentar"
      ref="messagebar"
    >
      <f7-link
        icon-ios="f7:arrow_up_fill"
        icon-aurora="f7:arrow_up_fill"
        icon-md="material:send"
        slot="inner-end"
      ></f7-link>
    </f7-messagebar>
  </f7-page>
</template>

<script>
import timeDiff from '../mixins/timeDiff';
import axios from '../config/axiosConfig';

export default {
  props: {
    id: String
  },
  data() {
    return {
      items: []
    }
  },
  async created() {
    this.$f7.preloader.show();
    let result = await axios().get('/komentar/' + this.id);
    this.$f7.preloader.hide();
    console.log(result.data.values);
    this.items = result.data.values;
  },
  mixins: [timeDiff]
}
</script>