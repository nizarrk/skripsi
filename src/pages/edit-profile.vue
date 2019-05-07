<template>
  <f7-page>
    <f7-navbar title="Sunting Profil" back-link="Back">
        <f7-nav-right>
            <f7-link icon-ios="f7:save" icon-md="material:check" href="#"></f7-link>
          </f7-nav-right>
    </f7-navbar>
    <f7-block>
        <center><img src="https://i.imgur.com/ApnPESG.png" 
        style="border-radius:50px; weight:70px; height:70px;"/>
            <f7-link style="margin-left:-20px;" href="#"><f7-icon ios="f7:camera" md="material:camera_alt" size="34px"></f7-icon></f7-link>
        </center>
        <f7-list no-hairlines-md>
            <f7-list-input
                label="Nama"
                type="text"
                placeholder="Nama"
                clear-button
            ></f7-list-input>

            <f7-list-input
                label="Telepon"
                type="tel"
                placeholder="Telepon"
                clear-button
            ></f7-list-input>

            <f7-list-input
                label="Jenis Kelamnin"
                type="select"
                defaultValue="Laki-laki"
                placeholder="-Pilih-"
            >
                <option value="Male">Laki-laki</option>
                <option value="Female">Perempuan</option>
            </f7-list-input>

            <f7-list-input
                label="Tanggal Lahir"
                type="date"
                defaultValue="2014-04-30"
                placeholder="-Pilih-"
            >
            </f7-list-input>

            <f7-list-input
                label="E-mail"
                type="email"
                placeholder="E-mail"
                clear-button
            ></f7-list-input>

            <f7-list-input
                label="Password"
                type="password"
                placeholder="Password"
                clear-button
            ></f7-list-input>

            <f7-list-input
                label="Konfirmasi Password"
                type="password"
                placeholder="Konfirmasi Password"
                clear-button
            ></f7-list-input>
        </f7-list>
    </f7-block>
  </f7-page>
</template>

<script>
export default {}
</script>