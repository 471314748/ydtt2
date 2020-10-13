<template>
  <div class="detail">
    <!-- 头部标题 -->
    <van-nav-bar :fixed="true"
                 left-arrow
                 @click-left="onClickLeft"
                 class="titleTop"
                 title="文章详情" />
    <!-- 文章标题 -->
    <h1>{{detailObj.title }}</h1>
    <!-- 作者信息 -->
    <div class="authorBox">
      <div class="img">
        <img :src="detailObj.aut_photo">
      </div>
      <div class="msg">
        <div>{{detailObj.aut_name}}</div>
        <div> {{detailObj.pubdate | myTime}}</div>
      </div>
      <div class="btn">
        <van-button v-if="detailObj.is_followed"
                    type="info"
                    @click="noFollow">已关注</van-button>
        <van-button v-else
                    type="info"
                    @click="follow"> + 关注</van-button>
      </div>
    </div>
    <!-- 文章内容 -->
    <van-cell>
      <template #title>
        <div v-html='detailObj.content'></div>
      </template>
    </van-cell>
    <!-- 点赞||不喜欢 -->
    <div class="btnbox">
      <div>
        <van-button v-if="detailObj.attitude === 1"
                    plain
                    @click="noZan"
                    type="default"
                    color="red"
                    round>
          <van-icon name="like" />点赞
        </van-button>
        <van-button v-else
                    @click="zan"
                    type="default"
                    round>
          <van-icon name="like" />点赞
        </van-button>
      </div>
      <div>
        <van-button v-if="detailObj.attitude === 0"
                    plain
                    type="default"
                    color="red"
                    round>
          <van-icon name="delete" />不喜欢
        </van-button>
        <van-button v-else
                    type="default"
                    round>
          <van-icon name="delete" />不喜欢
        </van-button>
      </div>

    </div>
    <!-- 评论区 -->
    <van-list v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad">
      <div v-for="(item, index) in commentList"
           :key="index">
        <comment :isReply="false"
         @openreply="openreply"
                 :item="item" />
      </div>
    </van-list>
    <!-- <comment></comment> -->
    <!-- 评论书写 -->
    <weite class="weiteSea" @passcomment='passcomment'></weite>
    <!-- 回复弹出层 -->
    <reply></reply>
    <h2>{{$route.query.artid}}</h2>

  </div>

</template>

<script>
import comment from './com/comment.vue'
import weite from './com/weite.vue'
import reply from './com/reply.vue'
import { getDatailByid } from '@/api/article.js'
import { apiFollow, followings, apiLikings, noLikings } from '@/api/use.js'
import { getComments } from '@/api/comment.js'
export default {
  components: {
    comment,
    weite,
    reply
  },
  data () {
    return {
      // 文章id
      artid: 0,
      // 文章数据
      detailObj: {},
      // list 的加载状态
      loading: false,
      // list 的完结状态
      finished: false,
      // 下一页的标识
      offset: null,
      // 评论类型
      type: null,
      // 评论id
      source: 0,
      // 评论个数
      limit: 10,
      // 评论数组
      commentList: [],
      // 结束的标识
      endid: ''
    }
  },
  async created () {
    // 根据文章id,请求文章
    this.artid = this.$route.query.artid
    let res = await getDatailByid(this.artid)
    console.log('文章数据', res)
    this.detailObj = res.data
    // 评论数据请求
    // this.onload()
  },
  methods: {
    // 回到上一个页面
    onClickLeft () {
      this.$router.back()
    },
    // 关注按钮
    async follow () {
      // console.log(this.detailObj.aut_id)
      let id = this.detailObj.aut_id
      await apiFollow({ target: id })
      this.detailObj.is_followed = true
    },
    // 取消关注
    async noFollow () {
      let id = this.detailObj.aut_id
      await followings(id)
      this.detailObj.is_followed = false
    },
    // 点赞
    async zan () {
      let id = this.detailObj.aut_id
      await apiLikings({ target: id })
      this.detailObj.attitude = 1
    },
    // 取消点赞
    async noZan () {
      let id = this.detailObj.aut_id
      await noLikings(id)
      this.detailObj.attitude = -1
    },
    // 加载评论
    async onLoad () {
      let res = await getComments({
        type: 'a',
        source: this.artid,
        offset: this.offset,
        limit: this.limit
      })
      console.log('评论数据', res)
      this.commentList = [...this.commentList, ...res.data.results]
      // 保存下一页的标识
      this.offset = res.data.last_id
      // 保存最后一页的标识
      this.endid = res.data.end_id
      // 将 list 的加载状态设置为 false
      this.loading = false
      console.log('this.loading', this.loading);
      // 判断是否数据源加载完毕
      if (this.commentList.length == res.data.total_count) {
        this.finished = true
      }
    },
    // 子回复加到父
    passcomment(obj) {
      console.log(this.commentList)
      this.commentList.unshift(obj)
    },
    // 打开回复面板
    openreply (value) {
      // 打开回复面板
      this.$refs.reply.show = value
    },
    
  },

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
.detail {
  margin-top: 46px;
  margin-bottom: 54px;
  h1 {
    font-size: 24px;
    text-align: center;
    padding: 20px 0;
    font-weight: 400;
  }
  .authorBox {
    display: flex;
    padding: 0 10px;
    .img {
      img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        margin-right: 15px;
      }
    }
    .msg {
      flex: 1;
      font-size: 16px;
      line-height: 23px;
    }
  }
  .btnbox {
    margin: 20px;
    display: flex;
    justify-content: space-around;
  }
  .weiteSea {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
  }
}
</style>