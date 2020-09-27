<template>
    <div class="swipContainer">
        <mt-swipe :auto="speed">
            <mt-swipe-item v-for="item in swiperList" :key="item.id">
                <img :src="item.img_url" alt="">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
export default {
    props:['swiperList','speed'],//组件传值
}
</script>
<style lang="less">
.swipContainer{
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
            background-color: #369;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>