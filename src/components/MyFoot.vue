<template>
  <div id="foot">
    <el-button type="primary" :loading="false" style="margin-left:558px" @click="next">{{status}}</el-button>
  </div>
</template>

<script>
export default {
    name:'MyFoot',
    props:['finishStatus'],
    data(){
        return {
            status:'下一题',
        }
    },
    methods:{
        next(){
            this.$bus.$emit('Next')
        },
        ifStatus(Status){
            if(Status==2){
                this.status='确认答题'
            }else if(Status==3){
                this.$bus.$emit('getUsername')
                this.status='查看排名'
            }else if(Status==4){
                this.$bus.$emit('mainHide')
                this.$bus.$emit('toplist')
                this.$bus.$emit('topShow')
            }else{
                this.status=='下一题'
            }
        }
    },
    mounted(){
        this.$bus.$on('ifStatus',this.ifStatus)
    }
}
</script>

<style scoped>
    #foot{
        margin: 10px auto;
        width: 1200px;
        height: 40px;
        border-radius: 5px;
    }
</style>