<template>
  <div id="main-wrapper">
    <router-view />
  </div>
</template>

<script>


export default {
  name: 'App',
  beforeCreate:function(){
    localStorage.setItem("selectedClientId","1");
    localStorage.setItem("clients",JSON.stringify([{id:1,name:"Client 1"},{id:2,name:"Client 2"},{id:3,name:"Client 3"}]));
    
  }
}
</script>

<style>

</style>
