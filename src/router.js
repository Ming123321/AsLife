import VueRouter from 'vue-router';//导入vue-router包

//导入tab栏的五个子组件
import home from './components/tab/home.vue';
import classes from './components/tab/classes.vue';
import find from './components/tab/find.vue';
import cart from './components/tab/cart.vue';
import user from './components/tab/user.vue';

import newslist from './components/news/newslist.vue';
import newsinfo from './components/news/newsinfo.vue';

import imagelist from './components/photo/imagelist.vue';
import imageinfo from './components/photo/imageinfo.vue';

import goodslist from './components/store/goodslist.vue';
import goodsinfo from './components/store/goodsinfo.vue';

var router = new VueRouter({
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:home},
        {path:'/classes',component:classes},
        {path:'/find',component:find},
        {path:'/cart',component:cart},
        {path:'/user',component:user},
        {path:'/home/newslist',component:newslist},
        {path:'/home/newsinfo/:id',component:newsinfo},
        {path:'/home/imagelist',component:imagelist},
        {path:'/home/imageinfo/:id',component:imageinfo},
        {path:'/home/goodslist',component:goodslist},
        {path:'/home/goodsinfo/:id',component:goodsinfo,name:'goodsinfo'},
    ],
    linkActiveClass:'mui-active'
})
export default router;//重点 当分离出来router.js模块后 一定要把router路由规则 暴露出去