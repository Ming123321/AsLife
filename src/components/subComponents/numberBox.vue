<template>
    <div class="mui-numbox">
		<button class="mui-btn mui-btn-numbox-minus" type="button" @click.stop="substract" :disabled="subDis">-</button>
		<input class="mui-input-numbox" type="number" :value="currentCount"/>
		<button class="mui-btn mui-btn-numbox-plus" type="button" @click.stop="plus" :disabled="plusDis">+</button>
	</div>
</template>
<script>
export default {
    props:[
        'initCount',
        'min',//上下限
        'max',
        'goodsid',//此数字框对应的商品id
        'ischangedStore',//判断是否再修改个数的时候影响仓储 bool
    ],
    data(){
        return{
            currentCount:1,
            plusDis:false,
            subDis:true,
        }
    },
    methods:{
        setDisable:function(){
            if(this.currentCount >= this.max){
                this.plusDis = true;
                this.subDis = false;
            }else{
                if(this.currentCount <= this.min){
                    this.plusDis = false;
                    this.subDis = true;
                }else{
                    this.plusDis = false;
                    this.subDis = false;
                }
            }
        },
        plus:function(){
            if(this.currentCount < this.max){
                this.currentCount++;
            }
            //设置两个按钮的是否可用
            this.setDisable();
        },
        substract:function(){
            if(this.currentCount > this.min){
                this.currentCount--;
            }
            this.setDisable();
        }
    },
    created(){
        this.currentCount = this.initCount;
    },
    //使用watch来监听currentCount
    watch: {
        'currentCount':function(newValue,oldValue){
            //数据发生变化立刻调用父组件传递过来的方法
            this.$emit("getCount",newValue);
            //当数据更新的时候 调用仓储中提供的updateStore方法
            if(this.ischangedStore){
                var goodsinfo = {id:this.goodsid,count:this.currentCount};
                this.$store.commit('updateStore',goodsinfo);
            }
        }
    },
    
}
</script>
<style lang="less">

</style>