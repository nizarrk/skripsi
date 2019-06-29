<template>
  <f7-page>
    <f7-navbar title="Komentar" back-link="Back"></f7-navbar>
    <f7-messages ref="messages">
      <!-- <f7-messages-title><b>Sunday, Feb 9,</b> 12:58</f7-messages-title> -->
      <f7-message
        v-for="(message, index) in items"
        :id="message.id_komentar"
        :key="index"
        :type="message.id_user == user ? 'sent' : 'received'"
        :text-header="timeDifference(message.tgl_komentar)"
        :name="message.nama_user"
        :avatar="baseURL + message.foto_user"
        :first="isFirstMessage(message, index)"
        :last="isLastMessage(message, index)"
        :tail="isTailMessage(message, index)"
        @click="openPopover(message.id_komentar, message.id_user)"
      >
        <span slot="text">{{message.desk_komentar}}</span>
      </f7-message>
    </f7-messages>
  
    <f7-messagebar
      placeholder="Ketik Komentar"
      ref="messagebar"
      :value="msg"
      @input="msg = $event.target.value"
    >
      <f7-link
        @click="postComment"
        icon-ios="f7:arrow_up_fill"
        icon-aurora="f7:arrow_up_fill"
        icon-md="material:send"
        slot="inner-end"
      ></f7-link>
    </f7-messagebar>
    <f7-popover id="popover" ref="popover" class="popover-menu">
      <f7-list>
        <f7-list-item @click="editComment" link="#" popover-close title="Edit"></f7-list-item>
        <f7-list-item @click="deleteComment" link="#" popover-close title="Hapus"></f7-list-item>
      </f7-list>
    </f7-popover>
  </f7-page>
</template>

<script>
import date from '../mixins/dateConfig';
import axios from '../config/axiosConfig';

export default {
  props: {
    id: String
  },
  data() {
    return {
      baseURL: '',
      msg: '',
      state: '',
      items: [],

      // notifikasi
      user: '',
      idkomen: null,
      userlapor: '',
      kodelapor: '',
      idlapor: ''
    }
  },
  async created() {
    this.$f7.preloader.show();
    let baseURL = await axios().request();
    this.baseURL = baseURL.config.baseURL;
    let result = await axios().get('/komentar/' + this.id);
    this.$f7.preloader.hide();
    console.log(result.data.values);
    this.items = result.data.values;
    let decode = this.$jwt.decode(localStorage.getItem('token'));
    this.user = decode.userId;
    this.userlapor = result.data.values[0].id_user_lapor;
    this.kodelapor = result.data.values[0].kode_lapor;
    this.idlapor = result.data.values[0].id_lapor;

    console.log(this.user + '=' + this.userlapor);
    
  },
  methods: {
    async postComment() {
      try {
        if (this.msg == '') {
          this.showToast('Komentar kosong');
          
        } else {
          if (this.idkomen == null) {
            console.log('post');
            
            let comment = await axios().post('/komentar', {
              idlapor: this.id,
              desk: this.msg
            });
          
            console.log(comment);
            this.state = 'post';
            this.msg = '';
            
            if (this.user !== this.userlapor) {
              let notif = await axios().post('/notif/', {
                id: this.user,
                user: this.userlapor,
                kode: this.idlapor,
                tipe: 'Komentar',
                desk:  `Anda mendapat komentar baru pada laporan ${this.kodelapor}`,
                status: 'Aktif'
              }); 
            }
          } else {
            console.log('put');
            
            let update = await axios().put('/komentar', {
              desk: this.msg,
              id: this.idkomen
            });
            this.state = 'put';
            this.showToast('Komentar diubah');

            this.msg = '';
            this.idkomen = null;

            console.log(update.data);
          }
        }        
      } catch (error) {
        console.log(error);
        this.showToast(error.message);
      } 
    },
    openPopover(id, user) {
      try {
        if (user == this.user) {
          this.$f7.popover.open(document.getElementById('popover'), document.getElementById(id), true);
          this.idkomen = id;
        }
        
      } catch (error) {
        console.log(error);
        this.showToast(error.message);
      }
    },
    async editComment() {
      try {
        let getid = await axios().get('/komentar/getid/' + this.idkomen);
        console.log(getid.data);
        this.msg = getid.data.values[0].desk_komentar;  

      } catch (error) {
        this.showToast(error.message);
      }
    },
    async deleteComment() {
      try {
        await axios().delete('/komentar/' + this.idkomen);
        this.state = 'delete';
        
        this.showToast('Komentar dihapus');

        this.msg = '';
        this.idkomen = null;
      } catch (error) {
        this.showToast(error.message);
        
      }
    },
    isFirstMessage(message, index) {
      const self = this;
      const previousMessage = self.items[index - 1];
      if (!previousMessage || previousMessage.nama_user !== message.nama_user) return true;
      return false;
    },
    isLastMessage(message, index) {
      const self = this;
      const nextMessage = self.items[index + 1];
      if (!nextMessage || nextMessage.nama_user !== message.nama_user ) return true;
      return false;
    },
    isTailMessage(message, index) {
      const self = this;
      const nextMessage = self.items[index + 1];
      if (!nextMessage || nextMessage.nama_user !== message.nama_user) return true;
      return false;
    },
    showToast(text) {
      this.toastCenter = this.$f7.toast.create({
        text: text,
        position: 'center',
        closeTimeout: 2000,
      });

      this.toastCenter.open();
    },
  },
  watch: {
    state: {
      async handler() {
          console.log(this.state);
          let result = await axios().get('/komentar/' + this.id);
          this.items = result.data.values;       
          console.log(this.items);
          this.state = '';
      }
    }
  },
  mixins: [date]
}
</script>