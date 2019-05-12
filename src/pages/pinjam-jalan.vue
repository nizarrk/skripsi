<template>
  <f7-page>
    <f7-navbar title="Peminjaman Jalan" back-link="Back"></f7-navbar>
    <f7-block strong>
        <f7-list no-hairlines-md>
            <div>
                <li class="item-content item-input">
                    <div class="item-inner">
                        <div class="item-title item-label">Surat Rekomendasi Lurah</div>
                        <div class="item-input-wrap">
                        <input type="file" id="file" ref="file" accept="image/*" v-on:change="handleFileUpload()" required validate>
                        <span class="input-clear-button" v-on:click="showPreview = !showPreview"></span>
                        </div>
                    </div>
                </li>
                <img style="max-width: 200px; max-height: 200px;" v-bind:src="imagePreview" v-show="showPreview"/>
            </div>
            <div>
                <li class="item-content item-input">
                    <div class="item-inner">
                        <div class="item-title item-label">Kartu Tanda Penduduk</div>
                        <div class="item-input-wrap">
                        <input type="file" id="file2" ref="file2" accept="image/*" v-on:change="handleFileUpload2()" required validate>
                        <span class="input-clear-button" v-on:click="showPreview2 = !showPreview2"></span>
                        </div>
                    </div>
                </li>
                <img style="max-width: 200px; max-height: 200px;" v-bind:src="imagePreview2" v-show="showPreview2"/>
            </div>
            <f7-button v-on:click="submitFile()" style="text-transform:capitalize;" fill>Kirim</f7-button>
        </f7-list>
    </f7-block>
  </f7-page>
</template>

<script>
  export default {
    /*
      Defines the data used by the component
    */
    data(){
      return {
        file: '',
        file2: '',
        showPreview: false,
        imagePreview: '',
        showPreview2: false,
        imagePreview2: ''
      }
    },

    methods: {
      /*
        Submits the file to the server
      */
      submitFile(){
        /*
                Initialize the form data
            */
            let formData = new FormData();

            /*
                Add the form data we need to submit
            */
            formData.append('file', this.file);

        /*
          Make the request to the POST /single-file URL
        */
            axios.post( '/file-preview',
                formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              }
            ).then(function(){
          console.log('SUCCESS!!');
          alert("sukses");
        })
        .catch(function(){
          console.log('FAILURE!!');
          alert("gagal");
        });
      },

      /*
        Handles a change on the file upload
      */
      handleFileUpload(){
        /*
          Set the local file variable to what the user has selected.
        */
        this.file = this.$refs.file.files[0];

        /*
          Initialize a File Reader object
        */
        let reader  = new FileReader();

        /*
          Add an event listener to the reader that when the file
          has been loaded, we flag the show preview as true and set the
          image to be what was read from the reader.
        */
        reader.addEventListener("load", function () {
          this.showPreview = true;
          this.imagePreview = reader.result;
        }.bind(this), false);

        /*
          Check to see if the file is not empty.
        */
        if( this.file ){
          /*
            Ensure the file is an image file.
          */
          if ( /\.(jpe?g|png|gif)$/i.test( this.file.name ) ) {
            /*
              Fire the readAsDataURL method which will read the file in and
              upon completion fire a 'load' event which we will listen to and
              display the image in the preview.
            */
            reader.readAsDataURL( this.file );
          }
        }
      },
      /*
        Handles a change on the file upload
      */
      handleFileUpload2(){
        /*
          Set the local file variable to what the user has selected.
        */
        this.file2 = this.$refs.file2.files[0];

        /*
          Initialize a File Reader object
        */
        let reader2  = new FileReader();

        /*
          Add an event listener to the reader that when the file
          has been loaded, we flag the show preview as true and set the
          image to be what was read from the reader.
        */
        reader2.addEventListener("load", function () {
          this.showPreview2 = true;
          this.imagePreview2 = reader2.result;
        }.bind(this), false);

        /*
          Check to see if the file is not empty.
        */
        if( this.file2 ){
          /*
            Ensure the file is an image file.
          */
          if ( /\.(jpe?g|png|gif)$/i.test( this.file2.name ) ) {
            /*
              Fire the readAsDataURL method which will read the file in and
              upon completion fire a 'load' event which we will listen to and
              display the image in the preview.
            */
            reader2.readAsDataURL( this.file2 );
          }
        }
      }
    }
  }
</script>