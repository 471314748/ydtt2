<template>
  <div class="searhResult">
    <!-- 标题 -->
    <van-nav-bar :fixed="true"
                 class="titleTop"
                 title="首页" />
    <h2>搜索结果</h2>
    <h2>参数{{key}}</h2>
  </div>
</template>

<script>
export default {
  data () {
    return {
      key: ""
    }
  },
  created () {
    this.key = this.$route.query.key
  },
}
</script>

<style lang='less' scoped>
.titleTop.van-nav-bar.van-nav-bar--fixed.van-hairline--bottom {
  background-color: #3e9df8;
  .van-nav-bar__title.van-ellipsis{
    color: #fff;
  }
}
</style>