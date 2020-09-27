<template>
    <div class="imagelistContainer">
        <ul 
            class = "imagelist"
            v-infinite-scroll="loadMore" 
            infinite-scroll-disabled="isloading"
            infinite-scroll-distance="10"
            style="max-height: 100vh; overflow-y:auto;" 
        >
            <li v-for="item in list" :key="item.id">
                <router-link :to="'/home/imageinfo/' + item.id">
                    <img v-lazy="item.img_url">
                    <div class="info">
                        <h4 class="info_title">{{item.title}}</h4>
                        <p class="info_abstract">{{item.abstract}}</p>
                    </div>
                </router-link>
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
    name:'imagelist',
    data(){
        return {
            isloading:false,
            is_loading_more:false,
            finished:false,
            pageindex:1,
            pagesize:5,
            list:[],
        }
    },
    methods:{
        loadMore(){
            this.isloading = true;
            this.$ajax({
                method:'get',
                url:'/images/imageslist',
                params:{
                    pageindex: this.pageindex,
                    pagesize: this.pagesize,
                }
            }).then(response => {
                var data = response.data;
                if(data.Status == 0){
                    if(data.Data.length > 0){
                        this.list = this.list.concat(data.Data);
                        this.pageindex++;
                        this.isloading = false;//允许响应上滑
                    }else{//数据请求完
                        this.isloading = true;
                        this.finished = true;
                    }
                }else{
                    Toast('服务端飞走了:请求数据失败');
                }
            })
        }
    }
}
</script>
<style lang="less">
    .imagelistContainer{
        .imagelist{
            list-style-type: none;
            padding: 10px;
            margin: 0;
            li{
                margin-bottom: 8px;
                position: relative;
                img{
                    width: 100%;
                    height: 260px;
                    box-shadow: 0 2px 4px #999;
                }
                image[lazy=loading] {
                    width: 40px;
                    height: 260px;
                    margin: auto;
                }
                div.info{
                    position: absolute;
                    bottom: 0;
                    padding: 5px;
                    color: #eee;
                    background-color: rgba(0,0,0,0.4);
                    .info_title{
                        font-size: 14px;
                    }
                    .info_abstract{
                        color: #eee;
                        font-size: 12px;
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
    }
</style>