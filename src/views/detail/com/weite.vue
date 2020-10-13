<template>
  <div class="weite">
    <van-search v-model="value"
                show-action
                @search="onSearch"
                shape="round"
                background="#4fc08d"
                placeholder="请输入搜索关键词">
      <template #action>
        <span class="searchText" @click="onSearch">搜索</span>
      </template>
    </van-search>
  </div>
</template>

<script>
import { apiAddComment } from '@/api/comment.js'
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    async onSearch () {
      console.log('搜索')
      // console.log(this.$parent.artid);
      let res = await apiAddComment({
        art_id: this.$parent.artid,
        content: this.value
      })
      this.value = ''
      // 新评论回复数据
      let newComment = res.data.new_obj
      console.log(newComment)
      // 加到父亲
      this.$emit('passcomment', newComment)
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