<template>
  <div class="container">
      
      <el-button id="salir" @click="salir()" type="danger" plain>salir</el-button>

      <h2>$ {{cuentas.ahorroDeseado - gastosAnt.comida - gastosAnt.transporte - gastosAnt.especiales - gastosAnt.diario}}</h2>

      <h1 class="title">
        14 de enero 2019
      </h1>
      <img src="https://firebasestorage.googleapis.com/v0/b/shop-and-save.appspot.com/o/chanchos%2FChanchos-felicidades.png?alt=media&token=aa1626cc-c571-4086-ba79-f1f02108df48"></img>
        
        <p id ="gastoComida">$ {{gastosAnt.comida}} comida</p>
        <p id="gastoTransporte">$ {{gastosAnt.transporte}} transporte</p>
        <p id="gastoEspeciales">$ {{gastosAnt.especiales}} especiales</p>
        <p id="gastoDiario">$ {{gastosAnt.diario}} diario</p>

        <el-progress id="progresoComida" :percentage="100 / cuentas.ahorroDeseado * gastosAnt.comida"></el-progress>
        <el-progress id="progresoTransporte" :percentage="100 / cuentas.ahorroDeseado * gastosAnt.transporte"></el-progress>
        <el-progress id="progresoEspeciales" :percentage="100 / cuentas.ahorroDeseado * gastosAnt.especiales"></el-progress>
        <el-progress id="progresoDiario" :percentage="100 / cuentas.ahorroDeseado * gastosAnt.diario"></el-progress>

        
     <el-button type="primary" @click="ir('gasto')" id="gasto">Añadir gasto</el-button>
  </div>
</template>

<script>
import { firestore as db, auth } from '@/plugins/firebase';

export default {
  asyncData() {
    return {
      gastos: [],
      correo: '',
      authenticatedUser: 'null'
    }
  },
  created() {
    auth.onAuthStateChanged(user => (this.authenticatedUser = user))
    auth.onAuthStateChanged(user => (this.correo = user.email))
  },
  watch: {
    authenticatedUser: function () {
      console.log('this.authenticatedUser')
      console.log(this.authenticatedUser)
      if (this.authenticatedUser == null){
        this.$router.push({ path: '/' });
      }

      let nuevaHora = Math.floor(Date.now() / 1000);
      nuevaHora = nuevaHora - (nuevaHora % 86400);
      nuevaHora = nuevaHora.toString();
      this.hora = nuevaHora;
      const correo = this.correo
      let cityRef = db.collection(correo).doc(nuevaHora);
      let getDoc = cityRef.get()
        .then(doc => {
          if (!doc.exists) {
            console.log('No such document!');
            this.gastosAnt = { comida: 0, diario: 0, especiales: 0, transporte: 0 };
          } else {
            console.log('Document data:', doc.data());
            this.gastosAnt = doc.data();
          }
        })
        .catch(err => {
          this.$message({
          message: err,
          type: 'error'
          })
          console.log('Error getting document', err);
        });


      let cuenta = db.collection(correo).doc('cuentas');
      getDoc = cuenta.get()
        .then(doc => {
          if (!doc.exists) {
            console.log('No such document!');
            this.$router.push({ path: '/configurador' });
          } else {
            console.log('Document data:', doc.data());
            this.cuentas = doc.data();
          }
        })
        .catch(err => {
          this.$message({
          message: err,
          type: 'error'
          })
          console.log('Error getting document', err);
        });

        this.porComida = 100 / this.cuentas.ahorroDeseado * this.gastosAnt.comida
    }
  },
    data(){
        return {
            gastosAnt: [],
            hora: 0,
            cuentas: [],
        }
    },
  methods: {
      format(percentage) {
        return percentage === 100 ? 'Full' : `${percentage}%`;
      },
    ir(ruta) {
      console.log(ruta);
      this.$router.push({ path: '/' + ruta });
    },
    salir (){
        auth.signOut().then(function() {
            
        }).catch(function(error) {
            this.$message({
              message: 'error. ' + error,
              type: 'error'
            });
        })
        this.$router.push({ path: '/' });
        this.$message({
              message: 'Se cerro la sesión con exito.'
            });

    },
    async confirmar () {
      console.log('fun confirmar');
      await auth.onAuthStateChanged(function(user) {
        if (user) {
          console.log('confirmado');
          return 'logeado';
        } else {
          return 'logeadon´t';
         this.$router.push({ path: '/' });
        }
      });
    },
  },
  mounted() {
    const promise = fetch(auth.currentUser);
    promise.then(result => {
      console.log('el user es: '+result.email);
       if (result) {
          console.log('yes, i am');
          console.log('el user es: ' + result.email);
        } else {
          console.log('no');
        }
    });

  }
}
</script>

<style scoped>
.container {
  position: fixed;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 10% 20% 60% 10%;
  grid-template-rows: 15% 12% 10% 10% 10% 10% 8% 5% 20%;
  justify-content: center;
  align-items: center;
  text-align: center;
}


.container img {
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-end: -3;
  width: 40%;
  display:block;
  margin:auto;
}

.continuar {
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 6;
  display:block;
  margin:auto;
}

#gasto{
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 9;
  width: 80%;
  display:block;
  margin:auto;
}

#comida {
  grid-column-start: 2;
  grid-row-start: 3;
  
  width: 90%;
  display:block;
  margin:auto;
}
#progresoComida {
  grid-column-start: 3;
  grid-row-start: 3;
  
  width: 80%;
  display:block;
  margin:auto;
}
#progresoTransporte {
  grid-column-start: 3;
  grid-row-start: 4;
  
  width: 80%;
  display:block;
  margin:auto;
}
#progresoEspeciales {
  grid-column-start: 3;
  grid-row-start: 5;
  
  width: 80%;
  display:block;
  margin:auto;
}
#progresoDiario {
  grid-column-start: 3;
  grid-row-start: 6;
  
  width: 80%;
  display:block;
  margin:auto;
}
#gastoComida {
  grid-column-start: 2;
  grid-row-start: 3;
  
}
#gastoEspeciales {
  grid-column-start: 2;
  grid-row-start: 5;
}
#gastoDiario {
  grid-column-start: 2;
  grid-row-start: 6;
  
}
#gastoTransporte {
  grid-column-start: 2;
  grid-row-start: 4;
}
#salir{
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
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
  grid-column-end: 4;
  grid-row-start: 2;;
}
.container h2 {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 300;
  font-size: 250%;
  color: #35495e;
  letter-spacing: 1px;
  grid-column-start: 3;
  grid-column-end: -1;
  grid-row-start: 1;;
}
</style>