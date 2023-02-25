<template>  
  <div id="box">
    <MyLogin v-if="!mainShow"/>
    <MyMain v-if="mainShow" :step="step"/>
  </div>
</template>

<script>
import MyLogin from './components/Mylogin'
import MyMain from './components/MyMain'

export default {
  name: 'App',
  components:{MyLogin,MyMain},
  data(){
    return {
      mainShow:false,
      step:-1
    }
  },
  methods:{
    mainShowStatus(){
      this.mainShow=true
    },
    initialStep(stepValue){
      this.step=stepValue
    }
  },
  mounted(){
    this.$bus.$on('mainShowStatus',this.mainShowStatus)
    this.$bus.$on('initialStep',this.initialStep)
  }
}
</script>
<style>
html{
  width: 100%;
  height:100%;
  /* overflow: hidden; */
  background: rgba(255,114,96,1);
  background: linear-gradient(45deg, 
  rgba(255,114,96,1) 0%, 
  rgba(255,114,96,1) 14%, 
  rgba(252,210,113,1) 54%, 
  rgba(252,210,113,1) 61%, 
  rgb(87, 177, 24) 93%, 
  rgb(6, 174, 54) 100%);
  background-repeat: no-repeat;
  background-attachment: fixed;
}
</style>