<template>
    <div class="imageinfoContainer">
        <!-- 顶部 基础信息 -->
        <section class="top">
            <h3 class="title">{{imgInfo.title}}</h3>
            <p class="subinfo">
                <span class="author">发布者:{{imgInfo.author}}</span>
                <span class="add_time">{{imgInfo.add_time | dateFormat}}</span>
                <span class="click_count">阅读量:{{imgInfo.click_count}}</span>
            </p>
        </section>
        <!-- 简介 -->
        <section class="abstract">
            <p v-html="imgInfo.abstract"></p>
        </section>
        <!-- 缩略图 -->
        <section class="thums">
            <!-- 使用vue-preview做缩略图 -->
            <!-- slides属性是用来绑定具体的预览图片的数据 必须要加 通过ajax请求获取数据-->
            <vue-preview :slides="thumbsList" class="imgPrev"></vue-preview>
        </section>
        <!-- 评论区 -->
        <section class="cmt">
            <comment :id="this.imgId"></comment>
        </section>
    </div>
</template>
<script>
import {Toast} from 'mint-ui';
import comment from '../subComponents/comment.vue';
export default {
    data(){
        return{
            imgId: this.$route.params.id,//获取到imagelist的id
            imgInfo: {},
            thumbsList: [],//获取缩略图
        }
    },
    created(){
        this.getImageInfo();
        this.getThumbslist();
    },
    methods:{
        getImageInfo:function(){//获取图片详情不包含缩略图
            this.$ajax({
                method:'get',
                url:'/images/imageinfo',
                params:{
                    imgid:this.imgId,
                }
            }).then(response => {
                var data = response.data;
                if(data.Status == 0){
                    this.imgInfo = data.Data[0];
                }else{
                    Toast('服务端飞走了,获取信息失败')
                }
            })
        },
        getThumbslist:function(){//获取该组图片的缩略图
            this.$ajax({
                method:'get',
                url:'/thumbs/' + this.imgId,
            }).then(response => {
                var data = response.data;
                if(data.Status == 0){
                    data.Data.forEach(item => {
                        item.w = 600,
                        item.h = 400,
                        item.src = item.img_url,
                        item.msrc = item.img_url;
                    });
                    this.thumbsList = data.Data;
                }else{
                    Toast('服务端飞走了,获取信息失败')
                }
            })
        }
    },
    components:{
        comment
    }
}
</script>
<style lang="less">
.imageinfoContainer{
    padding: 10px;
    .top{
        border-bottom: 1px solid #bbb;
        .title{
            font-size: 20px;
            color: #333;
            font-family: "微软雅黑";
            text-align: center;
        }
        .subinfo{
            padding: 10px 0;
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            margin: 0;
        }
    }
    .abstract{
        font-size: 14px;
        padding: 10px;
        color: #444;
        text-indent: 2em;
        line-height: 22px;
    }
    .thums{
        .imgPrev{
            .my-gallery{
                figure{
                    display: inline-block;
                    margin: 8px;
                }
                img{
                    width: 80px;
                    height: 60px;
                }
            }
        }
    }
}
</style>