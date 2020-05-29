<template>
  <div class="container">
      <p><strong>Ahorre dinero</strong> administrado sus gastos semanales {{ authenticatedUser }} </p>
      <img src="https://firebasestorage.googleapis.com/v0/b/shop-and-save.appspot.com/o/chanchos%2FChanchos-alegre.png?alt=media&token=c815c0f6-872c-4019-8022-1d09e7bf3cd4"></img>
    <h2>Listo !</h2>
    
    <div id="txtEmail">
      <el-input
        id="txtEmail"
        v-model="ingresos"
        placeholder="Ingresa tus ingresos semanales"
      ></el-input>
    </div>
    <br />
    <div id="txtPassword">
      <el-input
        v-model="deseo"
        placeholder="la cantidad que seas ahorrar"
      ></el-input>
    </div>
     <el-button type="primary" @click="siguiente()" id="singin">Continuar !</el-button>
     
    
  </div>
</template>

<script>
import { firestore as db, auth  } from '@/plugins/firebase';

export default {
  asyncData() {
    return {
      authenticatedUser: null
    }
  },
  created() {
    auth.onAuthStateChanged(user => (this.authenticatedUser = user.email))
  },
  watch: {
    authenticatedUser: function () {
      // this.$router.push({ path: '/' });
      this.correo = this.authenticatedUser.correo;
    }
  },
  data() {
    return {
      correo: '',
      ingresos: '',
      deseo: ''
    }
  },
  methods: {
    siguiente(){
      
    const ingreso = parseFloat(this.ingresos);
    const deseo = parseFloat(this.deseo);
      if (ingreso > 0 && deseo > 0) {

      const data = {
        ingresoSem: ingreso,
        ahorroDeseado: deseo
      };
      const correo = this.authenticatedUser;
      db.collection(correo).doc('cuentas').set(data).then(
        () => 
        this.$message({
        message: 'Los datos se guardaron exitosamente',
        })
      )
      .catch(err => 
        this.$message({
          message: err,
          type: 'error'
          })
      );
      this.$router.push({ path: '/panel' })
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
