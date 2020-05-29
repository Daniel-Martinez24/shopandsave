<template>
  <div class="container">
      <p>Con <strong>shop & save</strong> puedes llevar un control sobre tus finanzas personales</p>
      <img src="https://firebasestorage.googleapis.com/v0/b/shop-and-save.appspot.com/o/chanchos%2FChanchos-asombrado.png?alt=media&token=a449ca67-96dc-438c-adfd-37610effe402"></img>
    <h2>Registrate.</h2>
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

export default {asyncData() {
    return {
      authenticatedUser: null
    }
  },
  created() {
    auth.onAuthStateChanged(user => (this.authenticatedUser = user))
  },
  data() {
    return {
      correo: '',
      contrasenia: ''
    }
  },
  watch: {
    authenticatedUser: function () {
      this.$router.push({ path: '/panel' });
    }
  },
  methods: {
    iniciar(){
      auth
        .signInWithEmailAndPassword(this.correo, this.contrasenia)
        .then(res => {
          // Antetificar
          this.$message({
            message: 'Sesión iniciada.',
          })
        })
        .catch(err => {
          console.log('error');
          console.log(err.code);
        });
    },
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
          this.iniciar(),
          this.$router.push({ path: '/configurador' })
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

.container h2 {
  display:none;
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

@media only screen and (min-width: 600px) {
  .container {
    grid-template-columns: 50% 50%;
    grid-template-rows: 10% 10% 10% 10% 10% 3% 10% 3% 10%;
  }
  .container h2 {
    display:block;

  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 300;
  font-size: 26px;
    grid-row-start: 3;
    grid-column-start: 1;
  }

  #txtEmail {
    grid-column-start: 1;
    grid-row-start: 5;
    width: 60%;
  }
  #txtPassword {
    grid-column-start: 1;
    grid-row-start: 7;
    
    width: 60%;
  }
  #singin {
    grid-column-start: 1;
    grid-row-start: 9;
    
    width: 60%;
  }


  .container p {
    font-weight: 300;
    font-size: 18px;
    margin: 20%;
    grid-column-start: 2;
    grid-row-start: 2;
  }

  .container img {
    grid-column-start: 2;
    grid-row-start: 4;
    width: 60%;
    margin-top: -5%;
  }
}
</style>
