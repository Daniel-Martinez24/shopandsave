<template>
  <div class="container">
      
      <el-button id="salir" @click="salir()" type="danger" plain>salir</el-button>

      <h2>$ {{presupuesto}}</h2>

      <h1 class="title">
        14 de enero 2019
      </h1>
      <img src="https://firebasestorage.googleapis.com/v0/b/shop-and-save.appspot.com/o/chanchos%2FChanchos-felicidades.png?alt=media&token=aa1626cc-c571-4086-ba79-f1f02108df48"></img>
        
        <p id ="gastoComida">$ {{gastoComida}} comida</p>
        <p id="gastoTransporte">$ {{gastoTransporte}} transporte</p>
        <p id="gastoEspeciales">$ {{gastoEspeciales}} especiales</p>
        <p id="gastoDiario">$ {{gastoDiario}} diario</p>

        <el-progress id="progresoComida" :percentage="50"></el-progress>
        <el-progress id="progresoTransporte" :percentage="50"></el-progress>
        <el-progress id="progresoEspeciales" :percentage="50"></el-progress>
        <el-progress id="progresoDiario" :percentage="50"></el-progress>

        
     <el-button type="primary" @click="ir('gasto')" id="gasto">Añadir gasto</el-button>
  </div>
</template>

<script>
import { auth } from '@/plugins/firebase';

export default {
    data(){
        return {
            presupuesto: 100,
            gastoComida: 10,
            gastoTransporte: 10,
            gastoEspeciales: 10,
            gastoDiario: 10,
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
            console.log('bye');
        }).catch(function(error) {
            alert(error)
        })
        this.$router.push({ path: '/' });

    }
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
  font-size: 150%;
  color: #35495e;
  letter-spacing: 1px;
  grid-column-start: 3;
  grid-column-end: -1;
  grid-row-start: 1;;
}
</style>