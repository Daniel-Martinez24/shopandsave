<template>
    <div class="container" :style="regillas">
        <h1 class="title">{{tipo}} </h1>
        <img src="https://firebasestorage.googleapis.com/v0/b/shop-and-save.appspot.com/o/chanchos%2FChanchos-alegre.png?alt=media&token=c815c0f6-872c-4019-8022-1d09e7bf3cd4" alt="">
        <el-button id="comida" type="primary" @click="tipo = 'Comida'; obtener();" plain>Comida</el-button>
        <el-button id="transporte" type="primary" @click="tipo = 'Transporte';  obtener();" plain>Transporte</el-button>
        <el-button id="especial" type="primary" @click="tipo = 'Especial';  obtener();" plain>Especial</el-button>
        <el-button id="diario" type="primary" @click="tipo = 'Diario'; obtener();" plain>Diario</el-button>
        <el-input class="input" placeholder="Ingresa la cantidad" v-model="gasto"></el-input>
        <el-button type="success" @click="guardar('panel')" class="continuar" :style="continuarStyle" icon="el-icon-check" circle></el-button>
    </div> 
</template>



<style scoped>
.container {
  position: fixed;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 10% 40% 40% 10%;
  grid-template-rows: 30% 30% 10% 10% 10% 10%;
  justify-content: center;
  align-items: center;
  text-align: center;
}


.container img {
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 2;
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

#comida {
  grid-column-start: 2;
  grid-row-start: 3;
  
  width: 80%;
  display:block;
  margin:auto;
}
#transporte {
  grid-column-start: 3;
  grid-row-start: 3;
  
  width: 80%;
  display:block;
  margin:auto;
}
#especial {
  grid-column-start: 2;
  grid-row-start: 4;
  
  width: 80%;
  display:block;
  margin:auto;
}
#diario {
  grid-column-start: 3;
  grid-row-start: 4;
  
  width: 80%;
  display:block;
  margin:auto;
}

.input {
  grid-column-start: 2;
  grid-column-end: 4;
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
  grid-column-end: 4;
  grid-row-start: 0;;
}

@media only screen and (min-width: 600px) {
  .container {
    grid-template-columns: 50% 50%;
  }

  .title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-weight: 300;
    font-size: 200%;
    letter-spacing: 1px;
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 0;;
  }

#comida {
  grid-column-start: 1;
  grid-column-end: 2;

    grid-row-start: 2;
        margin-top: 10%;
}
#transporte {
  grid-column-start: 1;
  grid-column-end: 2;
}
#especial {
  grid-column-start: 1;
  grid-column-end: 2;
    grid-row-start: 2;
        margin-top: 20%;
}
#diario {
  grid-column-start: 1;
  grid-column-end: 2;
}

.input {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 5;
}
.continuar {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 6;
}
}


</style>

<script>
import { firestore as db, auth  } from '@/plugins/firebase';

export default {
  asyncData() {
    return {
      authenticatedUser: null
    }
  },
  created() {
    auth.onAuthStateChanged(user => (this.authenticatedUser = user.email));
    let nuevaHora = Math.floor(Date.now() / 1000);
  },
  watch: {
    authenticatedUser: function () {
      this.$router.push({ path: '/' });
    }
  },
    data() {
        return {
            hora: '',
            tipo:'Añadir gastos',
            gasto: '',
            comida: 0,
            especiales: 0,
            diario: 0,
            transporte: 0,
            continuarStyle: 'display:none;',
            regillas: '',
            gastosAnt: [],
        }
    },
    methods: {
        obtener() {
          let nuevaHora = Math.floor(Date.now() / 1000);
          nuevaHora = nuevaHora - (nuevaHora % 86400);
          nuevaHora = nuevaHora.toString();
          this.hora = nuevaHora;
          let cityRef = db.collection(this.authenticatedUser).doc(nuevaHora);
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

        },

        guardar(ruta) {
          
          const numero = parseFloat(this.gasto);

          if (numero > 0) {
                if(this.tipo == 'Comida'){
            this.comida += numero;
          }
          if(this.tipo == 'Especial'){
            this.especiales += numero;
          }
          if(this.tipo == 'Transporte'){
            this.transporte += numero;
          }
          if(this.tipo == 'Diario'){
            this.diario += numero;
          }

          const data = {
            comida: this.gastosAnt.comida + this.comida,
            transporte: this.gastosAnt.transporte + this.transporte,
            especiales: this.gastosAnt.especiales + this.especiales,
            diario: this.gastosAnt.diario + this.diario
          };
        

          const correo = this.authenticatedUser;
          const hora = this.hora
         db.collection(correo).doc(hora).set(data).then(
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



              console.log(ruta);
              this.$router.push({ path: '/' + ruta });
          } else {
              this.$message({
                message: 'Ingresa datos correctos',
                type: 'error'
              })
          }
        },
        verificar() {
            if (this.tipo != 'Añadir gastos' && this.gasto != '') {
                this.continuarStyle ='display:block;';
                this.regillas='grid-template-rows: 30% 20% 10% 10% 10% 20%;';
            }
            else {
                this.continuarStyle ='display:none;'
                this.regillas='grid-template-rows: 30% 30% 10% 10% 10% 10%;';
            }
        }
    },
    watch: {
      gasto: function () {
          this.verificar();
      },
      tipo: function () {
          this.verificar();
      }
    },
    mounted(){ 

        this.regillas='grid-template-rows: 30% 30% 10% 10% 10% 10%;';
    }
}
</script>