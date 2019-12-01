<template>
  <div class="container">
      <p>Con <strong>shop & save</strong> puedes llevar un control sobre tus finanzas personales</p>
      <img src="https://firebasestorage.googleapis.com/v0/b/shop-and-save.appspot.com/o/chanchos%2FChanchos-asombrado.png?alt=media&token=a449ca67-96dc-438c-adfd-37610effe402"></img>
    <div id="txtEmail">
      <el-input
        id="txtEmail"
        v-model="correo"
        placeholder="Ingresa tu correo"
        type="email"
        name="txtEmail"
      ></el-input>
    </div>
    <br />
    <div id="txtPassword">
      <el-input
        v-model="contrasenia"
        placeholder="Ingresa tu contraseña"
        show-password
      ></el-input>
    </div>
     <el-button type="primary" @click="siguiente()" id="singin">Siguiente</el-button>
     
    
  </div>
</template>

<script>
import { auth } from '@/plugins/firebase';

export default {
  data() {
    return {
      correo: '',
      contrasenia: ''
    }
  },
  methods: {
    siguiente(){
      
      // cambiar esto, a tener aprovación de firebase
      if (this.contrasenia != '' && this.correo !="") {
        auth.createUserWithEmailAndPassword(this.correo, this.contrasenia)
        .then(
          this.$message({
          message: 'La cuante fue creada exitosamente.',
        })
        )
        .then(
          this.$router.push({ path: '/panel' })
        )
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          this.$message({
          message: 'error.' + errorCode + ' ' + errorMessage,
          type: 'error'
        });
        });
      }
      else {
       this.$message({
          message: 'Llena los campos correctamente.',
          type: 'error'
        });
      }
    }
  }
};
</script>

<style scoped>
.container {
  position: fixed;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 10% 80% 10%;
  grid-template-rows: 33% 30% 10% 10% 10% 7%;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.container img {
  grid-column-start: 2;
  grid-row-start: 2;
  width: 60%;
  display:block;
  margin:auto;
}

#txtEmail {
  grid-column-start: 2;
  grid-row-start: 3;
  width: 100%;
  display:block;
  margin:auto;
}
#txtPassword {
  grid-column-start: 2;
  grid-row-start: 4;
  
  width: 100%;
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

.container p {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 300;
  font-size: 100%;
  color: #35495e;
  letter-spacing: 1px;
  grid-column-start: 2;
  grid-row-start: 0;
}
</style>
