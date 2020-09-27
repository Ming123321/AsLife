<template>
    <div class="newsinfocontainer">
        <!-- 标题部分 -->
        <section class="title">
            <h2>{{this.news.title}}</h2>
        </section>
        <!-- 编辑 日期 点击量部分 -->
        <section class="des">
            <p>
                <span class="author">编辑:{{this.news.author}}</span>
                <span class="add_time">日期:{{this.news.add_time | dateFormat}}</span>
                <span class="click_count">阅读:{{this.news.click_count}}</span>
            </p>
        </section>
        <!-- 图片部分 -->
        <section class="img">
            <img :src="this.news.img_url" alt="">
        </section>
        <!-- 正文部分 -->
        <section class="content">
            <div v-html="this.news.content"></div>
        </section>
        <!-- 评论部分 -->
        <section class="comment">
            <!-- 封装一个评论组件 -->
            <comment :id="this.newsid"></comment>
        </section>
    </div>
</template>
<script>
//导入评论组件
//挂在到父组件上
//通过标签的形式插入到父组件中
import comment from '../subComponents/comment.vue';

export default {
    data(){
        return{
            newsid : this.$route.params.id,//获取路由传递过来参数
            news:{} //保存通过ajax请求获取到的新闻数据，以此来进行数据绑定
        }
    },
    methods:{
        loadnewsInfo:function(){
            this.$ajax({
                method:'get',
                url:'/news/newsinfo',
                params:{
                    newsid : this.newsid,
                }
            }).then(response => {
                var data = response.data;
                if(data.Status == 0){
                    this.news = data.Data[0];
                }
            })
        }
    },
    created(){
        this.loadnewsInfo();
    },
    components:{
        comment
    }
}
</script>
<style lang="less">
    .newsinfocontainer{
        padding: 15px;
        .title{
            padding: 5px 0;
            font-size: 24px;
            color: #333;
        }
        .des{
            font-size: 12px;
            color: #aaa;
            padding-bottom: 20px;
            p{
                display: flex;
                justify-content: space-between;
            }
            .author{
                color: #333;
            }
        }
        .img{
            img{
                width: 100%;
            }
            padding-bottom: 10px;
        }
        .content{
            font-size: 1.2rem;
            color: #444;
            p{
                color: #666;
                font-size: 1rem;
                text-indent: 20px;
            }
            img{
                width: 100%;
            }
        }
    }
</style>