<template>
    <!-- <div class="lilist"> -->
        <li class="lilist">
            <span>{{itemdata.realname}}</span>
            <span>{{itemdata.score}}</span>
            <span>{{rank}}</span>
            <span :style="statusStyle">{{answerStatus}}</span>
        </li>
    <!-- </div> -->
</template>

<script>
export default {
    name:'MyItem',
    props:['itemdata','rank'],
    computed:{
        answerStatus(){
            return this.itemdata.status==0?'未完成':'已完成'
        },
        statusStyle(){
            return {
                color:this.itemdata.status==0?'brown':'green'
            }
        }
    }
}
</script>

<style scoped>
.lilist{
    width:1000px;  
    line-height: 60px;
    padding: 0 20px;
    border-bottom: 2px solid black;
}

span{
    display:inline-block;
    width: 100px;
    line-height: 40px;
    font-size: 20px;
    margin-left:173px;
    padding:0 10px;
    text-align: center;
    
}
span:first-child{
    margin-left:0px;
}

</style>