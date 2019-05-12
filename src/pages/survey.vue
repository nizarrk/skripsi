<template>
    <f7-page>
        <f7-navbar title="Survey" back-link="Back">
            <f7-nav-right>
                <f7-link icon-ios="f7:save" icon-md="material:check" href="#"></f7-link>
            </f7-nav-right>
        </f7-navbar>
            <f7-block strong>
                <span>
                    Lorem ipsum dolor sit amet, 
                    consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?
                </span>
                <div style="margin-top:10px;">
                    <f7-row>
                    <f7-col><f7-radio ref="radio1" name="demo-radio-inline" value="magna"></f7-radio>
                    <span style="margin-left:5px;">magna</span>
                    </f7-col>
                    <f7-col><f7-radio ref="radio2" name="demo-radio-inline" value="tempor"></f7-radio>
                    <span style="margin-left:5px;">tempor</span>
                    </f7-col>
                </f7-row>
                <f7-row style="margin-top:10px;">
                    <f7-col><f7-radio ref="radio3" name="demo-radio-inline" value="labore"></f7-radio>
                    <span style="margin-left:5px;">labore</span>
                    </f7-col>
                    <f7-col><f7-radio ref="radio4" name="demo-radio-inline" value="dolore"></f7-radio>
                    <span style="margin-left:5px;">dolore</span>
                    </f7-col>
                </f7-row>
                <button @click="click">klik</button>
                </div>
            </f7-block>
    </f7-page>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        click(){
            console.log(this.$refs);
            
        }
    },
}
</script>

