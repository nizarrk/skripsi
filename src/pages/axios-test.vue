<template>
<f7-page>
  <f7-block>
    <form @submit.prevent="add">
        <input type="hidden" v-model="form.id">
        <input type="text" v-model="form.name">
        <button type="submit" v-show="!updateSubmit">add</button>
        <button type="button" v-show="updateSubmit" @click="update(form)">Update</button>
    </form>
    <ul v-for="user in users" :key="user.id_user">
      <li v-bind:userid="user.id_user">
      <span>{{user.nama_user}}</span>
      <img style="max-width: 200px; max-height: 200px;" v-bind:src="user.foto_user" alt="">
      <!-- <button @click="edit(user)">Edit</button> ||  <button @click="del(user)">Delete</button> -->
      </li>
    </ul>
  </f7-block>
  </f7-page>
</template>

<script>
/* eslint-disable */ 
import axios from 'axios'
export default {
  data(){
    return{
        form: {
          id: '',
          nama: ''
        },
        users: '',
        updateSubmit: false
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load(){
        axios.get('http://localhost:3000/user').then(res => {
        this.users = res.data.values
        console.log(this.users);
        
      }).catch ((err) => {
        console.log(err);
        
      })
    },
      add(){
      axios.post('http://localhost:3000/user/', this.form).then(res => {
          this.load()
          this.form.name = ''
      })
    },
    edit(user){ 
        this.updateSubmit = true
        this.form.id = user.id 
        this.form.name = user.name 
    },
    update(form){ 
       return axios.put('http://localhost:3000/user/' + form.id , {name: this.form.name}).then(res => {
        this.load()
        this.form.id = ''
        this.form.name = ''
        this.updateSubmit = false
      }).catch((err) => {
        console.log(err);
        
      })
    },
    del(user){
      axios.delete('http://localhost:3000/user/' + user.id).then(res =>{
          this.load()
          let index = this.users.indexOf(form.name)
          this.users.splice(index,1)
      })
    }
  }
}
</script>