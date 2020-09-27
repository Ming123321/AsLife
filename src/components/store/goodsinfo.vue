<template>
    <div class="goodsinfoContainer">
        <!-- 轮播图 使用轮播图组件 导入 挂载 -->
        <swipe :speed="3000" :swiperList="swiperList"></swipe>
        <!-- 点击加入购物车时的动画小球 -->
        <transition
            @before-enter="ballBeforeEnter"
            @enter="ballEnter"
            @after-enter="ballAfterEnter"
        >
            <div class="ball" v-show="isBallShow"></div>
        </transition>
        <!-- 商品信息区 -->
        <div class="goodsinfo">
            <p class="price">
                <span class="sellPrice">
                    <span>￥</span>
                    {{goodsinfo.sell_price}}
                </span>
                <span class="marketPrice">
                    <label class="lb">商场价:</label>{{goodsinfo.market_price}}
                </span>
            </p>
            <p class="title">{{goodsinfo.title}}</p>
            <p class="abstract">{{goodsinfo.abstract}}</p>
            <p class="add_time">
                <label class="lb">发布时间:</label>
                {{goodsinfo.add_time | dateFormat}}
            </p>
            <p class="stock">
                <span>
                    <label class="lb">库存:</label>
                    {{goodsinfo.stock}}
                </span>
                <span>
                    <label class="lb">关注度:</label>
                    {{goodsinfo.click_count}}
                </span>
            </p>
            <p class="count">
                <label class="lb">购买数量:</label>
                <numberbox :initCount="1" :min="1" :max="goodsinfo.stock" @getCount="getGoodsCount" :goodsid="this.goodsid" :ischangedStore="false"></numberbox>
            </p>
            <p>
                <button type="button" class="mui-btn mui-btn-warning" @click="addtocar">
					加入购物车
				</button>
				<button type="button" class="mui-btn mui-btn-danger">
					立即购买
				</button>
            </p>
        </div>
        <!-- 卖家信息区 -->
        <div class="sellerinfo">
            <h3>卖家信息</h3>
            <p class="seller">
                <label class="lb">卖家:</label>{{goodsinfo.seller}}
            </p>
            <p class="sellerPhone">
                <label class="lb">卖家电话:</label>{{goodsinfo.seller_phone}}
            </p>
        </div>
        <!-- 商品详情图片区 -->
        <div class="imginfo">
            <ul>
                <li v-for="item in swiperList" :key="item.id">
                    <img :src="item.img_url" alt="">
                </li>
            </ul>
        </div>
        <!-- 评论区 -->
        <comment :id="this.goodsid"></comment>
    </div>
</template>
<script>
import swipe from '../subComponents/swipe.vue';
import numberbox from '../subComponents/numberBox.vue';
import comment from '../subComponents/comment.vue';
import {Toast} from 'mint-ui';
export default {
    data(){
        return{
            swiperList:[],//商品轮播图数据
            goodsid: this.$route.params.id,//获取商品的主键id
            goodsinfo:{},
            goodscount:1,
            isBallShow:false,
        }
    },
    created(){
        this.getswipdata();
        this.getgoodsinfo();
    },
    methods:{
        //获取轮播图数据
        getswipdata(){
            this.$ajax({
                method:'get',
                url:'/thumbs/' + this.goodsid,
            }).then(response => {
                var data = response.data;
                if(data.Status == 0){
                    this.swiperList = data.Data;
                }else{
                    Toast("服务器飞走了.😔");
                }
            })
        },
        //获取商品详情
        getgoodsinfo(){
            this.$ajax({
                method:'get',
                url:'/goods/goodsinfo',
                params:{
                    goodsid:this.goodsid,
                }
            }).then(response => {
                var data = response.data;
                if(data.Status == 0){
                    this.goodsinfo = data.Data[0];
                }else{
                    Toast('服务端飞走了')
                }
            })
        },
        addtocar(){
            //小球代码动画效果
            this.isBallShow = !this.isBallShow;
            //子组件向父组件传值 
            //1.父组件通过事件机制 向子组件传递一个带参数的方法
            var goods = {
                id:this.goodsid,
                img_url:this.goodsinfo.img_url,
                title:this.goodsinfo.title,
                price:this.goodsinfo.sell_price,
                count:this.goodscount,
                stock:this.goodsinfo.stock,
            }
            //使用仓储对象mutations提供的方法 来间接处理state中的数据成员
            this.$store.commit('addtocar',goods);
        },
        //要传递给子组件的方法 用来让子组件向父组件传值
        getGoodsCount(count){
            this.goodscount = count;
            console.log(count);
        },
        //购物车小球半场动画钩子函数
        ballBeforeEnter(el){
            el.style.transform = 'translate(0, 0)';
        },
        ballEnter(el,done){
            el.offsetWidth;
            var ballpos = el.getBoundingClientRect();
            var badgepos = document.getElementById('badge').getBoundingClientRect();
            var xDist = badgepos.left - ballpos.left;
            var yDist = badgepos.top - ballpos.top;
            // console.log(xDist, yDist);
            el.style.transform = `translate(${xDist}px,${yDist}px)`;
            el.style.transition = 'all 0.8s cubiz-bezier(.5,-0.34,.91,.8)';
            done();
        },
        ballAfterEnter(el){
            this.isBallShow = !this.isBallShow;
        }
    },
    components:{
        swipe,
        numberbox,
        comment,
    }
}
</script>
<style lang="less">
.goodsinfoContainer{
    padding: 8px;
    //小球
    .ball{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: #ce0000;
        position: absolute;
        z-index: 99;
        left: 168px;
        top: 585px;
    }
    .goodsinfo{
        padding: 5px;
        background-color: #fff;
        border-radius: 5px;
        margin-bottom: 10px;
        p{
            font-size: 14px;
            line-height: 16px;
            color: #333;
            margin: 20px;
            label.lb{
                color: #999;
                margin-right: 20px;
            }
        }
        .price{
            .sellPrice{    
                color: #ce0000;
                font-size: 28px;
                font-weight: bold;
                margin-right: 20px;
                span{
                    font-size: 12px;
                }
            }
            .marketPrice{
                text-decoration: line-through;
                .lb{
                    margin: 0;
                }
            }
        }
        .title{
            font-size: 16px;
            font-weight: bold;
        }
        .abstract{
            font-size: 15px;
            line-height: 20px;
        }
        .stock{
            span{
                margin-right: 20px;
            }
        }
    }
    .sellerinfo{
        background-color: #fff;
        padding: 10px 20px;
        border-radius: 5px;
        h3{
            font-size: 14px;
            color: #999;
            margin-bottom: 20px;
        }
        p{
            color: #333;
            label.lb{
                color: #999;
                margin-right: 28px;
            }
        }
    }
    .imginfo{
        background-color: #fff;
        border-radius: 5px;
        ul{
            list-style: none;
            padding: 0;
            margin: 0;
            li{
                width: 100%;
                img{
                    width: 100%;
                }
            }
        }
    }
}
</style>