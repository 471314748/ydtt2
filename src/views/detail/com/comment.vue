<template>
  <div class="comment">
    <div>
      <van-cell>
        <template #title>
          <div class="authorBox">
            <div class="img">
              <img :src="item.aut_photo"
                   alt="">
            </div>
            <div class="msg">
              <div>{{item.aut_name}}</div>
              <div> {{item.content}}</div>
              <div>
                <span class="time"> {{item.pubdate | myTime}} </span>
                <span class="reply">回复{{item.reply_count}}</span>
              </div>
            </div>
            <div class="btn">
              <van-icon v-if="true"
                        @click="zan"
                        name="like-o" />
              <van-icon v-else
                        color="red"
                        name="like" />{{item.like_count}}
            </div>
          </div>
          <!-- 一个 -->
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
export default {
  // 接口传入的评论数据
  props: ['item', 'isReply'],
  data () {
    return {
      like: true
    }
  },
  created () {
  },
  methods: {
    zan () {
      // this.like = false
    }
  },
}
</script>

<style lang='less' scoped>
.authorBox {
  display: flex;
  margin: 10px 0;
  color: #000;
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
    div:nth-child(1) {
      color: #0094ff;
      font-size: 16px;
    }
    div:nth-child(2) {
      font-size: 16px;
      padding: 5px 0;
    }
    div:nth-child(3) {
      font-size: 12px;
      .time {
        margin-right: 10px;
      }
      .reply {
        background-color: #ccc;
        padding: 6px;
        border-radius: 12px;
      }
    }
  }
  .btn {
    .van-icon-like-o::before,
    .van-icon-like::before {
      font-size: 24px;
    }
  }
}
</style>