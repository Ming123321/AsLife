<template>
    <div class="cartContainer">
        <h2>购物车</h2>
        <ul class = "mui-table-view">
            <li v-for="item in cart" :key="item.id" 
            class="mui-table-view-cell mui-media">
                <router-link :to="'/home/goodsinfo/' + item.id" tag="div">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
				    <div class="mui-media-body">
                        <p class="goodsinfo">
                            <span class="title">{{item.title}}</span>
                            <span class="price">￥{{item.price}}</span>
                        </p>
                        <p class="goodscontrol">
                            <numberbox :initCount="item.count" :min="1" :max="item.stock" :goodsid="item.id" :ischangedStore="true"></numberbox>
                            <span class="remove" @click.stop="remove(item.id)">×</span>
                        </p>
				    </div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media totalPrice">
                总金额:<span class="price">￥{{this.$store.getters.getTotalPrice}}</span>
            </li>
        </ul>
        <button type="button" class="mui-btn mui-btn-danger mui-btn-block">结算</button>
    </div>
</template>
<script>
import numberbox from '../subComponents/numberBox.vue';
export default {
    //购物车数据结构
    //数组 可存放多个对象
    data(){
        return{
            cart:[]
        }
    },
    methods:{
        getCart(){
            // this.cart = this.$store.state.cart;
            this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
        },
        remove(goodsid){
            this.$store.commit('removeGoods',goodsid);
            this.getCart();
        }
    },
    components:{
        numberbox,
    },
    created(){
        this.getCart();
    }
}
</script>
<style lang="less">
.cartContainer{
    padding-bottom: 80px;
    h2{
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        color: #444;
        padding: 8px;
        background-color: #fff;
    }
    .mui-table-view{
        margin: 0;
        .mui-table-view-cell{
            width: 100%;
            .mui-media-object{//图片
                max-width: 100px;
                height: 80px;
            }
            .mui-media-body{
                .goodsinfo{
                    font-size: 16px;
                    color: #444;
                    line-height: 20px;
                    display: flex;
                    justify-content: space-between;//两端对齐
                    margin-bottom: 20px;
                    .price{
                        color:#222;
                        font-weight: bold;
                    }
                }
                .goodscontrol{
                    display: flex;
                    justify-content: space-between;
                    .remove{
                        font-size: 36px;
                        padding: 10px;
                    }
                }
            }
        }
        li.totalPrice{
            font-size: 16px;
            color: #333;
            font-weight: bold;
            text-align: center;
            background-color: #fff;
            padding: 10px;
            .price{
                color: #dd524d;
            }
        }
    }
    .mui-btn-danger{
        position: fixed;
        bottom: 40px;
    }
}
</style>