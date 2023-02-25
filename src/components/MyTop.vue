<template>
    <div class="box">
        <div class="header">
            <span>用户名</span>
            <span>分数</span>
            <span>名次</span>
            <span>状态</span>
        </div>
        <ul class="list">
            <MyItem v-for="(item,index) of toplist" :key="index"  :rank="++index" :itemdata="item"/>
        </ul>
        <span class="timer">据下一次更新剩余:{{time}}秒</span>
    </div>
</template>

<script>
import MyItem from './MyItem'
export default {
    name:'MyTop',
    props:['toplist'],
    components:{MyItem},
    data(){
        return {
            time:10
        }
    },
    methods:{
        timer(){
            setInterval(()=>{
                this.time>0?this.time--:this.time=10
            },1000)
        }
    },
    mounted(){
        this.timer()
    }
}
</script>

<style scoped>
.box{
    width: 1200px;
    margin:0px auto;

}
.list{
    margin:0 0;
    box-sizing: border-box;
    list-style-type:none;
    padding:0 80px;
    border-radius: 10px;
}

.header{
    margin: 0 auto;
    width: 1000px;
    line-height: 60px;
    font-size: 20px;
    padding:0 20px;
    border-bottom: 2px solid black;
}

.header span{
    display:inline-block;
    width: 100px;
    text-align: center;
    margin-left:173px;
    padding: 0 10px;
}

.header span:first-child{
    margin-left:0px;
}

.box .timer{
    display: inline-block;
    margin-left: 80px;
    margin-top: 20px;
    font-size: 12px;
    color: grey;
}
</style>