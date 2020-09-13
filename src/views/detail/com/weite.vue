<template>
  <div class="weite">
    <van-search v-model="value"
                show-action
                @search="onSearch"
                shape="round"
                background="#4fc08d"
                placeholder="请输入搜索关键词">
      <template #action>
        <span class="searchText">搜索</span>
      </template>
    </van-search>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    onSearch () {
      console.log('搜索')
    }
  },

}
</script>

<style lang='less' scoped>
.searchText {
  color: #fff;
}
.van-search__action:active {
    background-color: rgb(79, 192, 141);
}
</style>