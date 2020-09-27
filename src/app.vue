<template>
  <div class="appContainer">
    <!-- 这里是header -->
    <header id="header" class="mui-bar mui-bar-nav">
      <a
        v-if="showback"
        @click="goback"
        class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"
      ></a>
      <h1 class="mui-title">安师生活-爱安师生活</h1>
    </header>
    <!-- 这里是 内容区 -->
    <div class="mui-content">
      <transition>
        <keep-alive include="newslist, imagelist">
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
    <!-- 这里是 footer -->
    <div class="footer">
      <nav class="mui-bar mui-bar-tab">
        <router-link class="mui-tab-item" to="/home">
          <span class="mui-icon mui-icon-home"></span>
          <span class="mui-tab-label">首页</span>
        </router-link>
        <router-link class="mui-tab-item" to="/classes">
          <span class="mui-icon mui-icon-extra mui-icon-extra-class"></span>
          <span class="mui-tab-label">分类</span>
        </router-link>
        <router-link class="mui-tab-item" to="/find">
          <span class="mui-icon mui-icon-extra mui-icon-extra-find"></span>
          <span class="mui-tab-label">发现</span>
        </router-link>
        <router-link class="mui-tab-item" to="/cart">
          <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
            <span class="mui-badge" id="badge">{{this.$store.getters.getAllcount}}</span>
          </span>
          <span class="mui-tab-label">购物车</span>
        </router-link>
        <router-link class="mui-tab-item" to="/user">
          <span class="mui-icon mui-icon-extra mui-icon-extra-peoples"></span>
          <span class="mui-tab-label">我的</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showback: false, //默认不显示回退箭头
    };
  },
  methods: {
    goback: function () {
      //$route是管理路由和传参
      //$rputer是管理url
      this.$router.go(-1);
    },
  },
  created() {
    if (this.$route.path == "/home") {
      this.showback = false;
    } else {
      this.showback = true;
    }
  },
  watch: {
    //监听路由 如果是/home则不显示回退箭头 否则显示
    "$route.path": function (newvalue, oldvalue) {
      if (newvalue == "/home") {
        this.showback = false;
      } else {
        this.showback = true;
      }
    },
  },
};
</script>

<style lang='less'>
.appContainer {
  padding-bottom: 50px;
  overflow-x: hidden; //解决组件切换时产生的滚动条问题
  .mui-bar-nav {
    background-color: #ce0000;
    .mui-action-back {
      color: #eee;
    }
    .mui-title {
      color: #eee;
      font-size: 20px;
      font-weight: bold;
      font-family: "微软雅黑";
    }
  }
  .footer {
    .mui-bar-tab {
      .mui-active {
        color: #ce0000;
      }
    }
  }
}

//解决组件切换的动画效果，组件从左侧离开
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute; //解决组件从下向上跳问题
}
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}
</style>