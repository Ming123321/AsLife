//导入Vue
import Vue from 'vue';
//导入app.vue
import app from './app.vue';

//导入mui的样式包
import './lib/mui-master/dist/css/mui.css'
//导入mui的扩展图标的样式文件
import './lib/mui-master/dist/css/icons-extra.css'

//导入 路由 vue-router
import VueRouter from 'vue-router';
Vue.use(VueRouter);

//导入路由模块 router.js
import router from './router.js';

import axios from 'axios';//导入axios
axios.defaults.baseURL = 'http://www.barteam.cn:8086';//配置根域名
axios.defaults.headers = {
    'Content-Type': 'application/x-www-form-urlencoded' //设置axios 发出跨域请求
}
Vue.prototype.$ajax = axios; //把axios挂载到Vue原型上

//导入Mint-ui
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUI);

//导入并注册 图片预览 组件
import VuePreview from 'vue-preview';
Vue.use(VuePreview);

//导入moment组件
import Moment from 'moment';//格式化日期的过滤器
Vue.filter('dateFormat',function(dateStr,pattern = 'YYYY--MM--DD HH:MM'){
    return Moment(dateStr).format(pattern);
})

import store from "./store.js";

var vm = new Vue({
    el:'#app',
    render:c => c(app),
    router,
    store,
})