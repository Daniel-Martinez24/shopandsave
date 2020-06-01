<template>
  <div class="container">
      <div class="navbar">
        <el-button id="menu" @click="salir()" type="text" plain> <img src="~/static/menu.svg" alt=""></el-button>
       
      </div>
      <div class="tarjeta">
          <h1 class="title">
            {{fecha}}
          </h1>
            
            <div class="Gastos">
              <p id ="nombreGasto"> Comida</p>
              <p id ="cantidadGasto" style="text-aling:left;">$ {{gastosAnt.comida}} </p>
            </div>
            <el-progress id="progresoComida" class="Progresobarra" :percentage="100 / cuentas.ahorroDeseado * gastosAnt.comida"></el-progress>

            <div class="Gastos">
              <p id ="nombreGasto"> Transporte</p>
              <p id ="cantidadGasto" style="text-aling:left;">$ {{gastosAnt.transporte}} </p>
            </div>
            <el-progress id="progresoTransporte" class="Progresobarra" :percentage="100 / cuentas.ahorroDeseado * gastosAnt.transporte"></el-progress>

            <div class="Gastos">
              <p id ="nombreGasto"> Gastos especiales</p>
              <p id ="cantidadGasto" style="text-aling:left;">$ {{gastosAnt.especiales}} </p>
            </div>
            <el-progress id="progresoEspeciales" class="Progresobarra" :percentage="100 / cuentas.ahorroDeseado * gastosAnt.especiales"></el-progress>

            <div class="Gastos">
              <p id ="nombreGasto"> Gastos diarios</p>
              <p id ="cantidadGasto" style="text-aling:left;">$ {{gastosAnt.diario}} </p>
            </div>
            <el-progress id="progresoDiario" class="Progresobarra" :percentage="100 / cuentas.ahorroDeseado * gastosAnt.diario"></el-progress>

            <br>
            <div style="display:none;">
              {{ ahorro_total = cuentas.ahorroDeseado - gastosAnt.comida - gastosAnt.transporte - gastosAnt.especiales - gastosAnt.diario}}
            </div>
            <div class="Gastos">
              <p id ="nombreGasto"> Ahorro !</p>
              <p id ="cantidadGasto" style="text-aling:left;">$ {{ahorro_total}} </p>
            </div>
            <el-progress id="ahorroTotal" class="Progresobarra" :percentage="100 / cuentas.ahorroDeseado * ahorro_total"></el-progress>

            <br>
      
    </div>
    <div class="add_zone">
      <img src="https://firebasestorage.googleapis.com/v0/b/shop-and-save.appspot.com/o/chanchos%2FChanchos-felicidades.png?alt=media&token=aa1626cc-c571-4086-ba79-f1f02108df48"></img>
       <el-button type="primary" @click="ir('gasto')" class="addgasto" icon="el-icon-plus" circle></el-button>        
     </div>
  </div>
</template>


<style scoped>
.container{
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;  
  
}
.navbar{
  width: 100%;
  height: 10vh;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
#menu{
  height: 100%;
  margin-left: 5%;
}


.Gastos{
  display: grid;
  width: 100%;
  grid-auto-columns: 47% 47%;
  margin: 3%;
}

.Progresobarra{
  margin-left: 3%;

}

#cantidadGasto{
  text-align: right;
  grid-column-start: 2;
  margin-right: 10%;
}

.title{
  font-size: 20px;
  font-weight: 100%;
  margin: 10%;
  text-align: center;
}
.add_zone img{
  width: 20% ;
  display:block;
  margin:auto;
}
.addgasto{
  margin-left: 80%;
  margin-bottom: 5%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

@media only screen and (min-width: 600px) {
  .container {

    position: fixed;
    width: 100%;
    height: 100%;
    display: grid;
    justify-content: center;
    align-items: center;
    text-align: center;

    grid-template-columns: 50% 50%;
    grid-template-rows: 10% 80% 10%;
  }
  .tarjeta{
    grid-column-start: 1;
    margin: 2vh;
    margin-bottom: 10vh;
    padding: 10vh;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  .navbar{
    grid-column-end: 3;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.25);
  }

  #menu{
    margin-left: 80%;
  }

  .add_zone img{
    width: 30% ;
    display:block;
    margin:auto;
  }
  .addgasto{
    margin-top: 10%;
    margin-left: 0%;
    margin-bottom: 0%;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  #nombreGasto{
    text-align: left;
    margin-left: 2vh;
  }
}

</style>

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
    hora: function () {
      const meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
      let date = new Date(this.hora * 1000);
      const mouth = meses[date.getMonth()];
      date = date.getDate() + ' de ' + mouth ;
      this.fecha = date;
      
    },
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
            fecha:'',
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