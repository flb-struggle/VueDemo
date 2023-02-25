import Vue from 'vue'
import App from './App.vue'
import {Input,Button,Message,Steps,Step,Radio,RadioGroup} from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Input)
Vue.use(Button)
Vue.use(Steps)
Vue.use(Step)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.prototype.$message = Message;

// Vue.use(Select);
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus=this
  }
}).$mount('#app')
