<template>
    <div class="homeContainer">
        <!-- 轮播图 开始 -->
        <mt-swipe :auto="3000">
            <mt-swipe-item v-for="item in swiperList" :key="item.id">
                <img :src="item.img_url" alt="">
            </mt-swipe-item>
        </mt-swipe>
        <!-- 轮播图 结束 -->
        <!-- 九宫格 开始 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                <router-link to="/home/newslist">
                    <img src="../../images/menu1.png" alt="">
                    <div class="mui-media-body">安师新闻</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                <router-link to="/home/imagelist">
                    <img src="../../images/menu2.png" alt="">
                    <div class="mui-media-body">光影安师</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                <router-link to="/home/goodslist">
                    <img src="../../images/menu3.png" alt="">
                    <div class="mui-media-body">安师商城</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                <a href="#">
                    <img src="../../images/menu4.png" alt="">
                    <div class="mui-media-body">记录安师</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                <a href="#">
                    <img src="../../images/menu5.png" alt="">
                    <div class="mui-media-body">一卡通</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                <a href="#">
                    <img src="../../images/menu6.png" alt="">
                    <div class="mui-media-body">校园社团</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                <a href="#">
                    <img src="../../images/menu7.png" alt="">
                    <div class="mui-media-body">户外出行</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                <a href="#">
                    <img src="../../images/menu8.png" alt="">
                    <div class="mui-media-body">休闲娱乐</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                <a href="#">
                    <img src="../../images/menu9.png" alt="">
                    <div class="mui-media-body">考研交流</div>
                </a>
            </li>
		</ul> 
        <!-- 九宫格结束 -->
    </div>
</template>
<script>
export default {
    data(){
        return {
            swiperList:[],
        }
    },
    methods:{
        getSwiperData(){
            this.$ajax({
                methods:'get',
                url:'/sliderlist'
            }).
            then(response => {
                if(response.data.Status == 0){//服务器正确响应,并返回了数据
                    this.swiperList = response.data.Data;
                }else{
                    Toast('无法加载轮播图');
                }
            })
        }
    },
    created(){
        this.getSwiperData();
    }
}
</script>
<style lang="less">
.homeContainer{
    .mint-swipe{
        height: 280px;
        .mint-swipe-indicators{
            .mint-swipe-indicator{
                background-color: #fff;
            }
            .mint-swipe-indicator.is-active{
                opacity: 1;
            }
        }
        .mint-swipe-item{
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    .mui-grid-view{
        .mui-table-view-cell{
            border:none;
           background-color: #fff;
            img{
                width: 48px;
            }
        }
    }
}
</style>