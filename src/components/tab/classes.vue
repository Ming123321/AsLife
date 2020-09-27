<template>
    <div class="myContainer">
        <header id="header" class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <ul>
                <li>
                    <span class="span1">我的收藏</span>
                </li>
                <li>
                    <span class="span2">最近播放</span>
                </li>
            </ul>
        </header>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less">
.myContainer{
    .mui-bar-nav{
        height: 50px;
    }
    ul{
        list-style: none;
        li{
            float: left;
            color: #fff;
            margin-right: 50px;
            font-size: 18px;
            font-family: '微软雅黑';
            .span1{
                margin-left: 30px;
            }
            .span2{
                margin-right: 10px;
            }
        }
    }
}
</style>