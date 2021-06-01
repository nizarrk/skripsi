<template>
  <f7-page>
    <f7-navbar title="Edit Profil" back-link="Back">
        <f7-nav-right>
            <f7-link icon-ios="f7:save" icon-md="material:check" @click="formSubmit"></f7-link>
          </f7-nav-right>
    </f7-navbar>
    <f7-block>
        <center>
            <img style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover;"
            :src="imagePreview" /><br>
            <span>{{filename}}</span>
            <!-- <f7-link style="margin-left:-20px;" href="#"><f7-icon ios="f7:camera" md="material:camera_alt" size="34px"></f7-icon></f7-link> -->
            <f7-button style="text-transform: capitalize" @click="$refs.actionsOneGroup.open()">Pilih Foto</f7-button>
            <f7-actions ref="actionsOneGroup">
              <f7-actions-group>
                <f7-actions-label bold>Unggah Foto</f7-actions-label>
                <f7-actions-button v-if="camera" @click="openGallery"><f7-icon material="collections"></f7-icon>Galeri</f7-actions-button>
                <f7-actions-button v-else @click="openGalleryWeb"><f7-icon material="collections"></f7-icon>Galeri</f7-actions-button>
                <f7-actions-button @click="takePicture"><f7-icon material="camera_alt"></f7-icon>Kamera</f7-actions-button>
                <f7-actions-button color="red"><f7-icon material="cancel"></f7-icon>Cancel</f7-actions-button>
              </f7-actions-group>
            </f7-actions>
            <input style="display: none;" id="file-input" type="file" ref="file" accept="image/*" v-on:change="handleFileUpload()" required validate />
        </center>
        <f7-list form class="form-ajax-submit" id="form">
            <f7-list-input
                label="Nama"
                name="nama"
                type="text"
                placeholder="Nama"
                error-message="Nama harus diisi"
                :value="nama"
                @input="nama = $event.target.value"
                required
                validate
                clear-button
            ></f7-list-input>

            <f7-list-input
                label="Alamat"
                name="alamat"
                type="textarea"
                placeholder="Alamat"
                error-message="Alamat harus diisi"
                :value="alamat"
                @input="alamat = $event.target.value"
                required
                validate
                clear-button
            ></f7-list-input>

            <f7-list-input
                label="Telepon"
                name="telp"
                type="tel"
                placeholder="Telepon"
                error-message="Telepon harus diisi"
                :value="telepon"
                @input="telepon = $event.target.value"
                required
                validate
                pattern="[0-9]*"
                clear-button
            ></f7-list-input>

            <f7-list-input
                label="Jenis Kelamnin"
                name="gender"
                type="select"
                defaultValue="1"
                placeholder="-Pilih-"
                @input="gender = $event.target.value"
                required
                validate
            >
                <option value="1">Laki-laki</option>
                <option value="2">Perempuan</option>
            </f7-list-input>

            <f7-list-input
                label="Tanggal Lahir"
                name="tgl"
                type="date"
                placeholder="-Pilih-"
                v-model="tgl"
                :value="tgl"
                @input="tgl = $event.target.value"
                required
                validate
            >
            </f7-list-input>

            <f7-list-input
                label="Username"
                name="username"
                type="text"
                placeholder="Username"
                :value="username"
                @input="username = $event.target.value"
                error-message="Username harus diisi"
                required
                validate
                clear-button
            ></f7-list-input>

            <f7-list-input
                label="Email"
                name="email"
                type="email"
                placeholder="Email"
                :value="email"
                @input="email = $event.target.value"
                error-message="Email harus diisi"
                required
                validate
                clear-button
            ></f7-list-input>
        </f7-list>
    </f7-block>
  </f7-page>
</template>

<script>
import axios from '../config/axiosConfig'
import defaultImg from '../static/defaultuser.jpg'

export default {
  props: {
    id: String
  },
  data () {
    return {
      baseURL: '',
      // uploads
      filename: '',
      file: null,
      showPreview: false,
      imagePreview: null,

      nama: null,
      alamat: null,
      telepon: null,
      gender: 1,
      tgl: null,
      username: null,
      email: null,
      path: null,

      // camera
      camera: navigator.camera

    }
  },
  async created () {
    try {
      // Listen to Cordova's backbutton event
      document.addEventListener('backbutton', this.navigateBack, false)
      let baseURL = await axios().request()
      this.baseURL = baseURL.config.baseURL
      this.$f7.preloader.show()
      let result = await axios().get('/user/profile')
      this.$f7.preloader.hide()
      // console.log(result.data.values);

      this.nama = result.data.data.name
      this.alamat = result.data.data.address
      this.telepon = result.data.data.phone
      let date = new Date(result.data.data.dob)
      let newdate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
      console.log(newdate)

      this.tgl = newdate
      this.username = result.data.data.username
      this.oldusername = result.data.data.username
      this.email = result.data.data.email
      this.path = result.data.data.picture
      this.imagePreview = this.baseURL + result.data.data.picture
      console.log(this.imagePreview)
    } catch (error) {
      console.log(error.message)
    }
  },
  methods: {
    navigateBack () {
      let app = this.$f7
      let $$ = this.$$
      // Use Framework7's router to navigate back
      let mainView = app.views.main
      if (app.views.main.router.url == '/home/tab1') {
        navigator.app.exitApp()
      } else {
        mainView.router.back('', {
          force: true
        })
      }
    },
    default () {
      console.log('defaultCallback')
    },
    openGalleryWeb () {
      document.getElementById('file-input').click()
      this.$refs.actionsOneGroup.close()
    },
    // get photo from gallery
    openGallery () {
      if (navigator.camera) {
        // Retrieve image file location from specified source
        navigator.camera.getPicture(this.setPicture, this.error, {
          quality: 80,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM
        })
      } else {
        this.error
      }
    },
    // Use the camera plugin to capture image
    takePicture () {
      if (navigator.camera) {
        navigator.camera.getPicture(this.setPicture, this.error, {
          quality: 80,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.CAMERA,
          mediaType: Camera.MediaType.PICTURE,
          encodingType: Camera.EncodingType.JPEG,
          cameraDirection: Camera.Direction.BACK,
          targetWidth: 300,
          targetHeight: 400
        })
      } else {
        // If the navigator.camera is not available display generic error to the user.
        this.error()
      }
    },
    // Set the picture path in the data of the vue
    // this action will automatically update the view.
    setPicture (imagePath) {
      let self = this
      this.$f7.preloader.show()
      this.imagePreview = imagePath
      this.showPreview = false

      window.resolveLocalFileSystemURL(imagePath,
        function (fileEntry) {
          // alert("got image file entry: " + fileEntry.fullPath);
          // self.filename = fileEntry.fullPath.replace("/", "");
          fileEntry.file(function (file) { // should return a raw HTML File Object
            let reader = new FileReader()
            reader.onloadend = function (e) {
              let imgBlob = new Blob([ this.result ], { type: 'image/jpeg' })
              self.file = imgBlob
            }
            reader.readAsArrayBuffer(file) // or the way you want to read it
            console.log('dari kamera: ', file)
            self.$f7.preloader.hide()
          },
          self.error)
        },
        this.error
      )
    },
    error (err) {
      if (navigator.notification) {
        navigator.notification.alert(err, this.default, 'Error!')
        this.$f7.dialog.close()
      } else {
        self.$f7.dialog.alert(error.message, 'Terjadi Kesalahan')
        this.$f7.dialog.close()
      }
    },
    /* Handles a change on the file upload */
    handleFileUpload () {
      this.$refs.actionsOneGroup.close()
      let self = this
      /* Set the local file variable to what the user has selected. */
      this.file = this.$refs.file.files[0]

      /* Initialize a File Reader object */
      var reader = new FileReader()

      /*
            Add an event listener to the reader that when the file
            has been loaded, we flag the show preview as true and set the
            image to be what was read from the reader.
            */
      reader.addEventListener('load', function () {
        this.showPreview = true
        this.imagePreview = reader.result
        // console.log(reader.result);

        this.filename = this.$refs.file.value.replace('C:\\fakepath\\', '')
      }.bind(this), false)

      /* Check to see if the file is not empty. */
      if (this.file) {
        /* Ensure the file is an image file. */
        if (/\.(jpe?g|png|gif)$/i.test(this.file.name)) {
          /*
                Fire the readAsDataURL method which will read the file in and
                upon completion fire a 'load' event which we will listen to and
                display the image in the preview.
                */
          reader.readAsDataURL(this.file)
        }
      }
    },
    async formSubmit () {
      if (document.getElementById('form').checkValidity() == false) {
        this.$f7.input.validateInputs(document.getElementById('form'))
      } else {
        this.$f7.preloader.show();
        let formData = new FormData()

        /* Add the form data we need to submit */
        formData.append('nama', this.nama)
        formData.append('alamat', this.alamat)
        formData.append('telp', this.telepon)
        formData.append('gender', this.gender)
        formData.append('fotoUser', this.file)
        formData.append('path', this.path)
        formData.append('tgl', this.tgl)
        formData.append('username', this.username)
        formData.append('email', this.email)

        // Display the key/value pairs
        for (var pair of formData.entries()) {
          console.log(pair[0] + ': ' + pair[1])
        }

        try {
          let user = await axios().put('/user/edit', formData)
          console.log('SUCCESS!!', user.data)

          this.$f7.preloader.hide();
          this.openToast('Berhasil mengubah data profil')
          this.$f7router.back('/home/tab5/', {
            force: true
          })
        } catch (error) {
          this.$f7.preloader.hide();
          console.log('ERROR!!', error.response)
          this.$f7.dialog.alert(error.response.data.message, 'Terjadi Kesalahan')
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
    }
  },
  beforeDestroy () {
    document.removeEventListener('backbutton', this.navigateBack)
  }
}
</script>
<style scoped>
.preview {
  display: block;
}

.first {
  display: none;
}
</style>
