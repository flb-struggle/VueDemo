<template>
  <div id="subject">
    <h3>{{topic.subject}}</h3>
    <el-radio-group v-if="answer" v-model="result" style="margin-top:20px;" @change="addAnswer">
        <el-radio v-for="option in Object.keys(answer)" :key="option" :label="option" name="option" style="margin-right:50px">{{answer[option]}}</el-radio>
    </el-radio-group>
    <el-input v-if="!answer" v-model="result" placeholder="请输入你的答案" @blur="addAnswer" style="font-size:18px"></el-input>
  </div>
</template> 

<script>
export default {
    name:'MySubject',
    props:['topic'],
    data(){
        return {
            result:'',
            tips:false,
            answer: this.topic.answer?JSON.parse(this.topic.answer):undefined,
        }
    },
    methods:{
        addAnswer(){
            const data={id:this.topic.id,result:this.result}
            this.$bus.$emit('addAnswer',data)
        }
    }
}
</script>

<style>
    #subject{
        margin: 10px auto;
        width: 1000px;
        height: 100px;
        padding: 10px 0;
        border-bottom: 2px solid gray;
        /* background-color: blueviolet; */
    }
    h3{
        margin: 10px 0;
    }
   .el-radio:hover{
      border-color: #85ce61 !important;
      color: #85ce61 !important;
   }
   .el-radio:hover .el-radio__inner{
      border-color: #85ce61 !important;
      color: #85ce61 !important;
   }
   .el-radio__input.is-checked + .el-radio__label{
       color: #85ce61 !important;
   }
   .el-radio__input.is-checked .el-radio__inner {
       background: #85ce61 !important;
       border-color: #85ce61 !important;
   }
</style>