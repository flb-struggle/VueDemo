<template>
  <div class="main">
        <!-- 头部区域 -->
    <div class="header">
        <div class="header-box w">
            <div class="logo">
                <img src="../../public/images/资源 1.png" alt="">
            </div>
        </div>
    </div>
    <!-- 步骤条 -->
    <div class="w">
        <div class="w title">
            <h2 @click="answerStart" v-if="!start">开始答题</h2>
        </div>
        <el-steps v-if="main" :active="finishStatus" finish-status="success" process-status="finish" simple style="margin: 20px 0">
            <el-step title="选择题" ></el-step>
            <el-step title="判断题" ></el-step>
            <el-step title="程序题" ></el-step>
        </el-steps>
        <h3 v-if="finishStatus==2" style="color:brown;margin-left:100px">请先下载右侧的文件！然后回答下列问题。<a href="http://192.168.45.119/data/download">下载</a></h3>
    </div>
    <MyAnswer v-if="main" :topics="data" :answer="answer"/>
    <MyFoot v-if="main" :finishStatus="finishStatus"/>
    <MyTop v-if="top" :toplist="toplist"/>
  </div>
</template>

<script>
import axios from 'axios'
import MyAnswer from './MyAnswer'
import MyFoot from './MyFoot'
import MyTop from './MyTop'
export default {
    name:'MyMain',
    components:{MyAnswer,MyFoot,MyTop},
    props:['step'],
    data(){
        return {
            start:false,
            main:false,
            top:false,
            data:[],
            answer:[],
            toplist:[],
            finishStatus:0,
        }
    },
    methods:{
        async Next(){
            document.documentElement.scrollTop = 0;
            const data={data:this.answer,username:sessionStorage.getItem('name'),step:this.finishStatus+1}
            let pathStr=''
            if(this.finishStatus==0){
                pathStr='http://192.168.45.119/data/selectJudgment'
            }else if(this.finishStatus==1){
                pathStr='http://192.168.45.119/data/ifJudgment'
            }else if(this.finishStatus==2){
                pathStr='http://192.168.45.119/data/programJudgment'
            }
            if(this.finishStatus<3){
               axios.post(pathStr,data)
            }
                this.finishStatus++
                this.$bus.$emit('ifStatus',this.finishStatus)
                this.clearAnswer()
                this.requestData(this.finishStatus)
        },
        finishStatusChange(){
            this.finishStatus++
        },
        answerStart(){
            axios.get('http://192.168.45.119/data/select').then(
                response=>{
                    this.data=response.data
                    this.start=true
                    this.main=true
                },
                error=>{
                    console.log(error);
                }
            )
        },
        answerIf(){
            axios.get('http://192.168.45.119/data/if').then(
                response=>{
                    this.data=response.data
                },
                error=>{
                    console.log(error);
                }
            )
        },
        answerProgram(){
            axios.get('http://192.168.45.119/data/program').then(
                response=>{
                    this.data=response.data
                },
                error=>{
                    console.log(error);
                }
            )
        },
        addAnswer(data){
            let judge=true
            this.answer.forEach(item=>{
                if(item.id==data.id){
                    judge=false
                    item.result=data.result
                }
            })
            if(judge){
                this.answer.push(data)
            }
        },
        clearAnswer(){
            this.data=[]
            this.answer=[]
        },
        requestData(Status){
            if(Status==1){
                this.answerIf()
            }else if(Status==2){
                this.answerProgram()
            }
        },
        mainHide(){
            this.main=false;
        },
        topShow(){
            this.top=true;
        },
        Top(){
            axios.get('http://192.168.45.119/data/top').then(
                    response=>{
                        this.toplist=response.data.sort((a,b)=>{
                            return b.score-a.score
                        })
                    },
                    error=>{
                        console.log(error);
                    }
                )
            setInterval(()=>{
                axios.get('http://192.168.45.119/data/top').then(
                    response=>{
                        this.toplist=response.data.sort((a,b)=>{
                            return b.score-a.score
                        })
                    },
                    error=>{
                        console.log(error);
                    }
                )
            },10000)
        },
        getUsername(){
            const myUser=sessionStorage.getItem('name')
            axios.post('http://192.168.45.119/api/setScore',{username:myUser}).then()
        },
        stepStatus(){
            if(this.step==-1){
                this.finishStatus=0
            }else if(this.step==0){
                this.finishStatus=0
                this.answerStart()
            }else if(this.step==1){
                this.finishStatus=1
                this.start=true
                this.main=true
                this.answerIf()
            }else if(this.step==2){
                this.finishStatus=2
                this.start=true
                this.main=true  
                this.answerProgram()
            }else if(this.step==3){
                this.finishStatus=4
                this.start=true
                this.main=true 
                this.$bus.$emit('mainHide')
                this.$bus.$emit('toplist')
                this.$bus.$emit('topShow')
            }
        }
    },
    mounted(){
        this.$bus.$on('addAnswer',this.addAnswer)
        this.$bus.$on('Next',this.Next)
        this.$bus.$on('mainHide',this.mainHide)
        this.$bus.$on('topShow',this.topShow)
        this.$bus.$on('toplist',this.Top)
        this.$bus.$on('getUsername',this.getUsername)
        this.stepStatus()

    }
}
</script>

<style scoped>
    .w{
        width:1200px;
        margin: 0 auto;
    }
    .title{
        width:100px;
        color:brown;
    }
    .title:hover{
        color:forestgreen;
        cursor: pointer;
    }
    .header{
            margin-top: 20px;
            height: 103px;
        }
    .header-box{
        height:100px;
        border-bottom:3px solid black;
    }
    .logo{
        height: 100px;
        padding:0 348px;
    }
    .logo img{
        height: 100%;
    }
</style>