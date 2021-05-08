<template>
    <f7-page>
        <f7-navbar title="Ganti Password" back-link="Back">
            <f7-nav-right>
                <f7-link icon-ios="f7:save" icon-md="material:check" @click="formSubmit"></f7-link>
            </f7-nav-right>
        </f7-navbar>
        <f7-list form id="form">
                <f7-list-input
                    label="Password Lama"
                    type="password"
                    placeholder="Password Lama"
                    error-message="Password Lama harus diisi"
                    :value="oldpass"
                    @input="oldpass = $event.target.value"
                    required
                    validate
                    clear-button
                >
                </f7-list-input>
                <f7-list-input
                    label="Password Baru"
                    type="password"
                    placeholder="Password Baru"
                    error-message="Password Baru harus diisi"
                    :value="pass"
                    @input="pass = $event.target.value"
                    minlength=8
                    info="Password minimal 8 karakter"
                    required
                    validate
                    clear-button
                ></f7-list-input>
                <f7-list-input
                    label="Konfirmasi Password"
                    type="password"
                    placeholder="Konfirmasi Password"
                    :value="confpass"
                    @input="confpass = $event.target.value"
                    @change="checkPass"
                    :error-message-force = errorforce
                    :error-message="error"
                    required
                    validate
                    clear-button
                ></f7-list-input>
            </f7-list>
    </f7-page>
</template>
<script>
import axios from '../config/axiosConfig'

export default {
  data () {
    return {
      oldpass: null,
      pass: null,
      confpass: null,
      error: 'Konfirmasi Password harus diisi',
      errorforce: false
    }
  },
  methods: {
    async formSubmit () {
      console.log(document.getElementById('form').checkValidity())
      if (document.getElementById('form').checkValidity() == false) {
        console.log('a')
        this.$f7.input.validateInputs(document.getElementById('form'))
      } else {
        if (this.errorforce == true) {
          console.log('b')
          // this.errorforce = false;
        } else {
          try {
            console.log('c')
            let user = await axios().put('/user/edit/password', {
              pass: this.oldpass,
              newpass: this.pass
            })
            console.log('SUCCESS!!', user.data)

            this.openToast('Berhasil mengubah password')
            this.$f7router.back('', {
              force: true
            })
          } catch (error) {
            console.log('ERROR!!', error.response)
            this.$f7.dialog.alert(error.response.data.message, 'Terjadi Kesalahan')
          }
        }
      }
    },
    openToast (text) {
      console.log(text)

      this.toastBottom = this.$f7.toast.create({
        text: text,
        closeTimeout: 3000
      })

      // Open it
      this.toastBottom.open()
    },
    checkPass () {
      if (this.pass != this.confpass) {
        this.errorforce = true
        this.error = 'Password tidak sesuai'
      } else {
        this.errorforce = false
        // this.error = "Konfirmasi Password harus diisi"
      }
    }
  }
}
</script>
