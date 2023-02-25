<template>
  <div id="login">
    <div class="logo">
      <img src="../../public/images/资源 1.png" alt="">
    </div>
    <div class="box1">
      <span style="padding:0;">学号：</span>
      <el-input class="user" placeholder="请输入学号" v-model="username" clearable ></el-input>
    </div>
    <div class="box1" v-if="login">
      <span style="padding:0;">姓名：</span>
      <el-input class="user" placeholder="请输入真实姓名" v-model="realname"></el-input>
    </div>
    <div class="box1">
      <span style="padding:0;">密码：</span>
      <el-input class="pwd" placeholder="请输入密码" v-model="userpwd" show-password></el-input>
    </div>
    <div class="btn" v-if="!login">
      <el-button type="info" @click="ChangeStatus" :plain="true">注册</el-button>
      <el-button style="margin-left:60px" type="success" @click="Sign_in">进入</el-button>
    </div>
    <el-button v-if="login" class="login" type="success" @click="Sign_up" :plain="true">立即注册</el-button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'MyLogin',
    data(){
    return {
      username:'',
      realname:'',
      userpwd:'',
      status:-1,
      login:false
    }
  },
  methods:{
    ChangeStatus(){
      this.login=true
    },
    Sign_up(){
      if(!this.username.trim() || !this.userpwd.trim()) return this.Ifstatus()
      const data={username:this.username,realname:this.realname,userpwd:this.userpwd};
      this.username=''
      this.realname=''
      this.userpwd=''
      axios.post('http://192.168.45.119/api/Sign_up',data).then(
        respones=>{
          this.status=respones.data
          this.Ifregister()
          this.login=false
        },
        error=>{
          console.log(error);
        }
      )
    },
    Ifregister(){
      if(this.status==0){
        this.$message({
        message: '注册失败',
        type: 'warning'
      })}else if(this.status==1){
        this.$message({
        message:'注册成功',
        type: 'success'
      })}else if(this.status==2){
        this.$message({
        message: '未知错误',
        type: 'warning'
      })}else{
        this.$message({
        message: '账户或密码不能为空！',
        type: 'warning'
      })}
  },
  Sign_in(){
    if(!this.username.trim() || !this.userpwd.trim()) return this.Iflogin('')
      const data={username:this.username,userpwd:this.userpwd};
      this.username=''
      this.userpwd=''
      axios.post('http://192.168.45.119/api/Sign_in',data).then(
        respones=>{
          this.status=respones.data
          this.Iflogin(data.username)
        },
        error=>{
          console.log(error);
        }
      )
  },
  Iflogin(user){
      if(this.status==0){
        this.$message({
        message: '登录失败,您的账号或密码有误！',
        type: 'warning'
      })}else if(this.status.code==1){
        this.$message({
        message:'登录成功',
        type: 'success'
      })
      this.$bus.$emit('mainShowStatus')
      this.$bus.$emit('initialStep',this.status.step)
      sessionStorage.setItem('name',user)
    }else if(this.status==2){
        this.$message({
        message: '未知错误',
        type: 'warning'
      })}else{
        this.$message({
        message: '账户或密码不能为空！',
        type: 'warning'
      })}
  },
}}
</script>

<style  scoped>

#login{
  position: relative;
  margin:150px auto;
  width:500px;
  height: 300px;
  padding: 10px;
  border-radius: 10px;
  background-color: antiquewhite;
  box-shadow:0 0 10px;
  
}
.logo img{
  margin: 0px auto;
  width: 100%;
  height: 100%;
}
.box1{
  margin-top:10px;
  font-size: 20px;
  padding-left: 95px;
}
/* .box2{
  margin-top:10px;
  margin-bottom: 15px;
} */
.user{
  width: 250px;
  line-height: 30px;
  font-size: 18px;
}
.pwd{
  width: 250px;
  line-height: 30px;
  font-size: 18px;

}
.btn{
  margin:0 auto; 
  margin-top:20px; 
  height: 40px;
  width: 210px;
  padding: 10px;
}
.login{
  margin-top: 10px;
  margin-left:155px;
  width: 200px;
  height: 40px;
}
</style>