import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

var lsCart = JSON.parse(localStorage.getItem('cart') || '[]');
const store = new Vuex.Store({
    state:{//访问方式: this.$store.state.xxx
        cart:lsCart,
    },
    mutations:{
        addtocar(state,goods){
            //点击加入购物车，将商品信息保存到store中的cart里
            //1. 如果购物车中已经有这个商品了，则更新数量
            //2. 如果购物车中没有该商品，则直接把商品信息push到cart里
            var flag = false;//判断有没有该商品
            state.cart.some(item => {
                if(item.id == goods.id){
                    item.count += parseInt(goods.count);
                    flag = true;
                    return true;
                }
            })
            if(!flag){
                state.cart.push(goods);
            }
            //每次仓储改变了 把数据持久化到 localstorage中
            // localstorage 是以key：value对 的形式存储数据的，其中value只能是字符串
            // 所以这里的state.cart对象要使用JSON.stringify()转化成字符串
            localStorage.setItem('cart',JSON.stringify(state.cart));
        },
        removeGoods(state,goodsid){
            state.cart = state.cart.filter(item => {
                return item.id != goodsid;
            })
            localStorage.setItem('cart',JSON.stringify(state.cart));
        },
        updateStore(state,goodsinfo){
            //实现在购物车中修改商品信息时 同时总金额发生变化
            //goodsInfo是在购物车页面中修改购买个数后，即时修改仓储数量
            state.cart.some(item => {
                if(item.id == goodsinfo.id){
                    item.count = goodsinfo.count;
                }
            })
            //修改完后更新到本地存储
            if(state.cart.length > 0){
                localStorage.setItem('cart',JSON.stringify(state.cart));
            }
        }
    },
    getters:{
        //获取仓储中cart里所有商品数量的总和
        getAllcount(state){
            var total = 0;
            state.cart.forEach(item => {
                total += item.count;
            })
            return total;
        },
        getTotalPrice(state){
            var total = 0;
            state.cart.forEach(item => {
                total += item.price * item.count;
            })
            return total;
        }
    }
});
export default store;