<template>
   <div class="answer-area w">
        <MySubject v-for="topic in topics" :key="topic.id" :topic="topic"/>
   </div>
</template>

<script>
import MySubject from './MySubject'
export default {
    name:'MyAnswer',
    components:{
        MySubject
    },
    props:['topics']
}
</script>

<style scoped>
.answer-area{
        margin:0 auto;
        width: 1200px;
        padding: 10px 0;
        border-radius: 5px;
        background-color:rgba(243, 243, 243,.5);
    }
</style>