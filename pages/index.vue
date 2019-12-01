<template>
  <div class="container">
      <h1 class="title">
        shop & save
      </h1>
      <img src="https://firebasestorage.googleapis.com/v0/b/shop-and-save.appspot.com/o/chancho.png?alt=media&token=d278b08c-575c-4993-af94-9dcf928fb349"></img>
    
     <el-button type="primary" @click="ir('login')" id="login">inicia sesión</el-button>
     <el-button id="singin" @click="ir('singin')" >Registrate</el-button>
     
    
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  methods: {
    ir(ruta) {
      console.log(ruta);
      this.$router.push({ path: '/' + ruta });
    }
  }
}
</script>

<style>
.container {
  position: fixed;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 10% 80% 10%;
  grid-template-rows: 23% 50% 10% 0% 10% 7%;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.container img {
  grid-column-start: 2;
  grid-row-start: 2;
  width: 80%;
  display:block;
  margin:auto;
}

#login {
  grid-column-start: 2;
  grid-row-start: 3;
  
  width: 80%;
  display:block;
  margin:auto;
}
#singin {
  grid-column-start: 2;
  grid-row-start: 5;
  
  width: 80%;
  display:block;
  margin:auto;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 300;
  font-size: 200%;
  color: #35495e;
  letter-spacing: 1px;
  grid-column-start: 2;
  grid-row-start: 0;
}
</style>
