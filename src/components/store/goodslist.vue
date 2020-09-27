<template>
    <div class="goodslistContainer">
         <ul 
            class = "mui-table-view"
            v-infinite-scroll="loadMore" 
            infinite-scroll-disabled="isloading"
            infinite-scroll-distance="10"
            style="max-height: 100vh; overflow-y:auto;" 
        >
            <li v-for="item in list" :key="item.id" 
            class="mui-table-view-cell mui-media" 
            @click="gotoGoodsinfo(item.id)"
            >
               <!-- <router-link :to="'/home/newsinfo/' + item.id"> -->
                <img class="mui-media-object mui-pull-left" :src="item.img_url">
					<div class="mui-media-body">
                        <h3 class="title">{{item.title}}</h3>
                        <p class="price">
                            <span class="sellPrice">￥{{item.sell_price}}</span>
                            <span class="marketPrice">原价:{{item.market_price}}</span>
                        </p>
                        <p class="stock">库存:{{item.stock}}</p>
                        <button type="button" class="mui-btn mui-btn-danger">立即抢购</button>
					</div>
               <!-- </router-link> -->
            </li>
            <!-- 加载动画部分 -->
            <li class="more_loading">
                <mt-spinner type="fading-circle" v-show="is_loading_more" class="loading_icon"></mt-spinner>
                <span v-show="finished">已经加载全部信息</span>
            </li>
        </ul>
    </div>
</template>
<script>
import {Toast} from 'mint-ui';
export default {
    data(){
        return{
            list:[],
            isloading:false,
            is_loading_more:false,
            finished:false,
            pageindex:1,
            pagesize:8,
        }
    },
    methods:{
        loadMore:function(){
            this.isloading = true;
            this.is_loading_more = true;
            this.finished = false;
            this.$ajax({
                method:'get',
                url:'/goods/goodslist',
                params:{
                    pageindex:this.pageindex,
                    pagesize:this.pagesize,
                }
            }).then(response => {
                var data = response.data;
                if(data.Status == 0){
                    if(data.Data.length > 0){
                        this.list = this.list.concat(data.Data);
                        this.pageindex++;
                        this.isloading = false;
                    }else{
                        this.isloading = true;
                        this.finished = true;
                        this.is_loading_more = false;
                    }
                }else{
                    Toast("服务端飞走了,无法获取商品列表数据");
                }
            })
        },
        gotoGoodsinfo:function(goodsid){
        //编程式导航 步骤
        //1.给li标签添加@click事件
        //2.在路由匹配规则中添加name属性
        //3.再click事件中使用下面的代码实现
        this.$router.push({name: 'goodsinfo',params:{id:goodsid}})
        }
    },
}
</script>
<style lang="less">
.goodslistContainer{
    .mui-table-view-cell{
        .mui-media-object{
            max-width: 120px;
            height: 100px;
        }
        .mui-media-body{
            .title{
                font-size: 16px;
                font-weight: bold;
                font-family: "微软雅黑";
                color:#333;
                padding-bottom: 18px;
            }
            .price{
                font-size: 12px;
                color: #888;
                margin: 0;
                .sellPrice{
                    font-size: 18px;
                    color: #ce0000;
                    font-family: '微软雅黑';
                    font-weight: bold;
                    margin-right: 10px;
                }
                .marketPrice{
                    text-decoration: line-through;
                }
            }
            .mui-btn-danger{
                position: absolute;
                bottom: 20px;
                right: 13px;
            }
        }
    }
    li.more_loading{
        font-size: 12px;
        color: #aaa;
        text-align: center;
        border: none;
        .loading_icon{
            position: relative;
            left: 45%;
        }
    }
}
</style>