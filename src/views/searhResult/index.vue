<template>
  <div class="searhResult">
    <!-- 标题 -->
    <van-nav-bar :fixed="true"
                 left-arrow
                 @click-left="onClickLeft"
                 class="titleTop"
                 title="首页" />
    <!-- 内容区域 -->
    <van-list v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad">

      <div v-for="(item, index) in resultList"
           :key="index">
        <van-cell>
          <template #title>
            <h4>{{item.title}}</h4>
            <van-grid v-if="item.cover.type !== 0"
                      :border="false"
                      :column-num="3">
              <van-grid-item v-for="(imgItem, imgIndex) in item.cover.images"
                             :key="imgIndex">
                <van-image :src="imgItem" />
              </van-grid-item>
            </van-grid>
            <div class="msg">
              <span>{{item.aut_name}}</span>
              <span>{{item.comm_count}}评论</span>
              <span>{{item.pubdate | myTime}}</span>
            </div>
          </template>
        </van-cell>
        <van-grid class="items"
                  :column-num="3">
          <van-grid-item @click="comment"
                         icon="comment-o"
                         :text="item.comm_count+''||'评论'" />
          <van-grid-item @click="zan"
                         icon="like-o"
                         text="点赞" />
          <van-grid-item icon="friends-o"
                         text="分享" />
        </van-grid>
      </div>
    </van-list>
    <!-- 参数 -->
    <!-- <h2>搜索结果</h2>
    <h2>参数{{key}}</h2> -->
  </div>
</template>

<script>
import { getSearch } from '@/api/article.js'
export default {
  data () {
    return {
      // 上一个页面传递的值
      key: "",
      // 数据
      resultList: [],
      // 加载状态
      loading: false,
      // 加载结束
      finished: false,
      // 页码
      page: 0,
      // 页容量
      perpage: 10,
    }
  },
  created () {
    this.key = this.$route.query.key
  },
  methods: {
    // 左上角返回按钮
    onClickLeft () {
      this.$router.back()
    },
    // 上拉加载更多
    async onLoad () {
      // console.log('onLoad')
      // 请求数据
      this.page++
      let res = await getSearch({ page: this.page, per_page: this.perpage, q: this.key })
      // console.log(res)
      // 加到list
      this.resultList = [...this.resultList, ...res.data.results]
      console.log(this.resultList)
      // 加载结束
      this.loading = false
      // 数据加载完
      if (res.data.results.length === 0) {
        this.finished = true
      }
    },
    // 评论
    comment () {
      // 获取用户token
      // let token = this.$store.state.userInfo.token
      // if (!token) {
      //   this.$toast.fail('用户未登录')
      //   this.$router.push('/')
      //   return
      // }
      this.$login()
      console.log('评论啊')
    },
    zan () {
      this.$login()
    }
  }
}
</script>

<style lang='less' scoped>
.van-nav-bar.van-hairline--bottom {
  background-color: #3e9df8;
}

/deep/ .van-nav-bar__title.van-ellipsis {
  color: #fff;
}

/deep/ i.van-icon.van-icon-arrow-left.van-nav-bar__arrow {
  color: #fff;
}
.searhResult {
  margin-top: 46px;
}
.msg span {
  margin-right: 10px;
  color: #999;
  font-size: 12px;
}
.items {
  /deep/ .van-grid-item__content.van-grid-item__content--center.van-hairline {
    flex-direction: row;
  }
  /deep/ i.van-icon.van-grid-item__icon {
    font-size: 20px;
  }
  /deep/ .van-grid-item__icon + .van-grid-item__text {
    margin-top: 0px;
    margin-left: 5px;
    font-size: 14px;
  }
}
</style>