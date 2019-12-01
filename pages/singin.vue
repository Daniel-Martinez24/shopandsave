<template>
  <div id="main">
    
    <p>Con <strong>shop & save</strong> puedes llevar un control sobre tus finanzas personales</p>
    <img
      id="imgRedonda"
      src="https://firebasestorage.googleapis.com/v0/b/deshifrut-30515.appspot.com/o/image004.png?alt=media&token=0071b3f4-0f5a-4a71-ad63-2563c435fab5"
    />
    <h1 id="title">Registrate !</h1>
    <br />
    <br />
    <div id="txtEmail">
      <el-input
        id="txtEmail"
        v-model="correo"
        placeholder="Please input"
        type="email"
        name="txtEmail"
      ></el-input>
    </div>
    <br />
    <div id="txtPassword">
      <el-input
        v-model="contrasenia"
        placeholder="Please input password"
        show-password
      ></el-input>
    </div>

    <el-button id="btnLogin" type="primary">Entrar</el-button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      correo: '',
      contrasenia: ''
    }
  }
};
</script>

<style scoped>
#main {
  position: fixed;
  width: 100%;
  height: 100%;
  /*https://encycolorpedia.es/a749bf*/
  background-color: #b397ba;
  grid-template-columns: 10% 80% 10%;
  grid-template-rows: 10% 30% 10% 3% 7% 7% 7% 26%;
  display: grid;
}
#txtEmail {
  grid-column-start: 2;
  grid-row-start: 5;
}
#txtPassword {
  grid-column-start: 2;
  grid-row-start: 6;
}
#btnLogin {
  grid-column-start: 2;
  grid-row-start: 7;
}
#title {
  text-align: center;
  grid-column-start: 2;
  grid-row-start: 3;
  color: #ffffff;
}
#imgRedonda {
  display: block;
  margin: auto;
  grid-column-start: 2;
  grid-row-start: 2;
  width: 200px;
  height: 200px;
  border-radius: 150px;
}
</style>
