<template>
  <f7-page>
    <f7-navbar title="Sunting Profil" back-link="Back">
        <f7-nav-right>
            <f7-link icon-ios="f7:save" icon-md="material:save" href="#"></f7-link>
          </f7-nav-right>
    </f7-navbar>
    <f7-block>
        <center><img src="https://i.imgur.com/ApnPESG.png" 
        style="border-radius:50px; weight:70px; height:70px;"/>
        <f7-link style="margin-left:-20px;" href="#"><f7-icon ios="f7:camera" md="material:camera_alt" size="34px"></f7-icon></f7-link>
        </center>
        <f7-list no-hairlines-md>
            <f7-list-input
                label="Name"
                type="text"
                placeholder="Your name"
                clear-button
            ></f7-list-input>

            <f7-list-input
                label="Phone"
                type="tel"
                placeholder="Your phone number"
                clear-button
            ></f7-list-input>

            <f7-list-input
                label="Gender"
                type="select"
                defaultValue="Male"
                placeholder="Please choose..."
            >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </f7-list-input>

            <f7-list-input
                label="Birthday"
                type="date"
                defaultValue="2014-04-30"
                placeholder="Please choose..."
            >
            </f7-list-input>

            <f7-list-input
                label="E-mail"
                type="email"
                placeholder="Your e-mail"
                clear-button
            ></f7-list-input>

            <f7-list-input
                label="URL"
                type="url"
                placeholder="URL"
                clear-button
            ></f7-list-input>
        </f7-list>
    </f7-block>
  </f7-page>
</template>

<script>
export default {}
</script>