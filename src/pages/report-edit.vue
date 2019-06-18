<template>
<f7-page>
    <f7-navbar title="Edit Laporan" back-link="Back">
        <f7-nav-right>
            <f7-link icon-ios="f7:save" icon-md="material:check" @click="submitForm"></f7-link>
        </f7-nav-right>
    </f7-navbar>
    <f7-block>
        <img :src="baseURL + items.foto_lapor" alt="fotolapor" width="100%">
    </f7-block>
        <f7-block>
            <f7-list form id="form">
                <f7-list-input
                    label="Deskripsi Laporan"
                    type="textarea"
                    resizable
                    placeholder="Deskripsi"
                    :value="desk"
                    @input="desk = $event.target.value"
                    required
                    validate
                    clear-button
                >
                </f7-list-input>
            </f7-list>
        </f7-block>   
</f7-page>
</template>
<script>
import axios from '../config/axiosConfig';
export default {
    props: {
        id: String
    },
    data() {
        return {
            baseURL: '',
            desk: '',
            items: []
        }
    },
    async created() {
        try {
            let baseURL = await axios().request();
            this.baseURL = baseURL.config.baseURL;
            this.$f7.preloader.show();
            let result = await axios().get('/lapor/' + this.id);
            this.$f7.preloader.hide();
            this.desk = result.data.values[0].desk_lapor;
            console.log(result.data.values);
            
            this.items = result.data.values[0];
        } catch (error) {
            console.log(error.message);
            
        }
    },
    methods: {
        async submitForm() {
            try {
                if (document.getElementById('form').checkValidity() == false) {
                    this.$f7.input.validateInputs(document.getElementById('form'));                    
                } else {
                    let result = await axios().put('/lapor/' + this.id, {
                    desk: this.desk
                    });
                    console.log(result.data);
                    this.$f7.dialog.alert(result.statusText, 'Berhasil'); 
                    this.$f7router.back('/report-detail/' + this.id, {
                        force: true
                    });
                }
            } catch (error) {
                console.log(error.message);
                
            }
        }
    }
}
</script>

