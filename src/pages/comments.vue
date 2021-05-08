<template>
  <f7-page>
    <f7-navbar title="Komentar" back-link="Back"></f7-navbar>
    <f7-messages ref="messages">
      <!-- <f7-messages-title><b>Sunday, Feb 9,</b> 12:58</f7-messages-title> -->
      <f7-message
        v-for="(message, index) in items"
        :id="message.id"
        :key="index"
        :type="message.user_id == user ? 'sent' : 'received'"
        :text-header="timeDifference(message.created_at)"
        :name="message.user.name"
        :avatar="baseURL + message.user.picture"
        :first="isFirstMessage(message, index)"
        :last="isLastMessage(message, index)"
        :tail="isTailMessage(message, index)"
        @click="openPopover(message.id, message.user_id)"
      >
        <span slot="text">{{message.description}}</span>
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
import date from '../mixins/dateConfig'
import axios from '../config/axiosConfig'

export default {
  props: {
    id: String
  },
  data () {
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
  async created () {
    try {
      this.$f7.preloader.show()
      let baseURL = await axios().request()
      this.baseURL = baseURL.config.baseURL
      let result = await axios().get('/comment/' + this.id)
      this.$f7.preloader.hide()
      console.log(result.data.data)
      this.items = result.data.data
      let decode = this.$jwt.decode(localStorage.getItem('token'))
      console.log(decode)
      this.user = decode.id
      this.userlapor = result.data.data[0].report.user_id
      this.kodelapor = result.data.data[0].report.code
      this.idlapor = result.data.data[0].report_id

      console.log(this.user + '=' + this.userlapor)
    } catch (error) {
      console.log(error)
      this.$f7.preloader.hide()
      this.$f7.dialog.alert(error.response.data.message, 'Terjadi Kesalahan')
    }
  },
  methods: {
    async postComment () {
      try {
        if (this.msg == '') {
          this.showToast('Komentar kosong')
        } else {
          if (this.idkomen == null) {
            console.log('post')

            let comment = await axios().post('/comment/add', {
              idlapor: this.id,
              desk: this.msg
            })

            console.log(comment)
            this.state = 'post'
            this.msg = ''

            if (this.user !== this.userlapor) {
              let notif = await axios().post('/notification/add', {
                user_id: this.userlapor,
                report_id: this.idlapor,
                type: 'Komentar',
                desc: `Anda mendapat komentar baru pada laporan ${this.kodelapor}`
              })
            }
          } else {
            console.log('put')

            let update = await axios().put('/comment/edit/' + this.idkomen, {
              desk: this.msg
            })
            this.state = 'put'
            this.showToast('Komentar diubah')

            this.msg = ''
            this.idkomen = null

            console.log(update.data)
          }
        }
      } catch (error) {
        console.log(error)
        this.showToast(error.message)
      }
    },
    openPopover (id, user) {
      try {
        if (user == this.user) {
          this.$f7.popover.open(document.getElementById('popover'), document.getElementById(id), true)
          this.idkomen = id
        }
      } catch (error) {
        console.log(error)
        this.showToast(error.message)
      }
    },
    async editComment () {
      try {
        let getById = await axios().get('/comment/idd/' + this.idkomen)
        console.log(getById.data)
        this.msg = getById.data.data.description
      } catch (error) {
        // this.showToast(error.response.data.message);
        this.$f7.dialog.alert(error.response.data.message, 'Terjadi Kesalahan')
      }
    },
    async deleteComment () {
      try {
        await axios().put('/comment/remove/' + this.idkomen)
        this.state = 'delete'

        this.showToast('Komentar dihapus')

        this.msg = ''
        this.idkomen = null
      } catch (error) {
        this.showToast(error.message)
      }
    },
    isFirstMessage (message, index) {
      const self = this
      const previousMessage = self.items[index - 1]
      if (!previousMessage || previousMessage.name !== message.name) return true
      return false
    },
    isLastMessage (message, index) {
      const self = this
      const nextMessage = self.items[index + 1]
      if (!nextMessage || nextMessage.name !== message.name) return true
      return false
    },
    isTailMessage (message, index) {
      const self = this
      const nextMessage = self.items[index + 1]
      if (!nextMessage || nextMessage.name !== message.name) return true
      return false
    },
    showToast (text) {
      this.toastCenter = this.$f7.toast.create({
        text: text,
        position: 'center',
        closeTimeout: 2000
      })

      this.toastCenter.open()
    }
  },
  watch: {
    state: {
      async handler () {
        console.log(this.state)
        let result = await axios().get('/comment/' + this.id)
        this.items = result.data.data
        console.log(this.items)
        this.state = ''
      }
    }
  },
  mixins: [date]
}
</script>
