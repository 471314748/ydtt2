<template>
  <div>
    <!-- 头部区域 -->
    <van-nav-bar left-arrow
                 @click-left="$router.back()"
                 :fixed="true"
                 title="最爱的艾拉" />
    <!-- 聊天区域 : 这个 chat 的高度必须是整个页面除去头部 & 底部剩余的部分 -->
    <div class="chat"
         ref="chat">
      <!-- 机器人的对话 -->
      <div class="chatitem"
           :class="{use: item.isRoboto === false}"
           v-for="(item, index) in chatArr"
           :key="index">
        <img class="img"
             :src="item.userImg"
             alt="">{{item.userimg}}
        <div class="content">{{ item.content }}</div>
      </div>
      <!-- 用户的对话 -->
      <!-- <div class="chatitem use">
                <img class="img" src="http://img5.imgtn.bdimg.com/it/u=2585668790,972896469&fm=26&gp=0.jpg" alt="">
                <div class="content">你好呀 ~ ~</div>
            </div> -->
    </div>
    <!-- 底部区域 -->
    <van-search class="msg"
                left-icon="edit"
                v-model="value"
                show-action
                @search="onSearch">
      <template #action>
        <span class="color"
              @click="onSearch">发送</span>
      </template>
    </van-search>
  </div>
</template>

<script>
// 导入 socket.io-client
// import socket from 'socket.io-client'
import axios from 'axios'
export default {
  data () {
    return {
      value: '',
      chatArr: [
        { content: '你好啊，我是艾拉', isRoboto: true, userImg: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3323239380,194848658&fm=26&gp=0.jpg' }
      ],
      // 创建一个连接对象
      conn: null
    }
  },
  methods: {
    onSearch () {
      // 得到输入框中的内容提交到服务器
      this.submit()
    },
    async submit () {
      // 非空判断
      if (this.value.length <= 0) {
        return
      }
      // 将聊天内容添加到数组中
      this.chatArr.push({
        content: this.value,
        isRoboto: false,
        userImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599217845233&di=d362781c0d93f35efa5ec78dc59500d0&imgtype=0&src=http%3A%2F%2Ftvax2.sinaimg.cn%2Fcrop.0.0.1006.1006.180%2F90e76a4aly8gg02uun5nzj20ry0rydgi.jpg%3FKID%3Dimgbed%2Ctva%26amp%3BExpires%3D1595934667%26amp%3Bssig%3D4qkHQG%252Biby'
      })
      // 发送 POST 请求
      let res = await axios({
        method: 'post',
        url: 'http://openapi.tuling123.com/openapi/api/v2',
        data: {
          reqType: 0,
          perception: {
            inputText: {
              text: this.value
            },
            inputImage: {
              url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599217845233&di=d362781c0d93f35efa5ec78dc59500d0&imgtype=0&src=http%3A%2F%2Ftvax2.sinaimg.cn%2Fcrop.0.0.1006.1006.180%2F90e76a4aly8gg02uun5nzj20ry0rydgi.jpg%3FKID%3Dimgbed%2Ctva%26amp%3BExpires%3D1595934667%26amp%3Bssig%3D4qkHQG%252Biby'
            },
            selfInfo: {
              location: {
                city: '赣州',
                province: '江西'
              }
            }
          },
          userInfo: {
            apiKey: '2f89db4eb6b943799de45771aef82039',
            userId: 'guorong'
          }
        }
      });
      // 清空输入框
      this.value = ''
      // 将服务器返回的数据添加到数组中
      this.chatArr.push({
        content: res.data.results[0].values.text,
        isRoboto: true,
        userImg: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3323239380,194848658&fm=26&gp=0.jpg'
      })
      // 自动到底部
      this.$nextTick(() => {
        this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight
      })
    }
  },
  method () {
    let msg = document.querySelector('.msg')
    msg.focus()
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-search__action {
  background-color: #0094ff;
}
.van-nav-bar.van-hairline--bottom {
  background-color: #3e9df8;
}

/deep/ .van-nav-bar__title.van-ellipsis {
  color: #fff;
}

/deep/ i.van-icon.van-icon-arrow-left.van-nav-bar__arrow {
  color: #fff;
}
.msg {
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  background-color: #0094ff;
}
.chat {
  position: fixed;
  top: 46px;
  bottom: 54px;
  width: 100%;
  overflow: auto;
}
.chatitem {
  margin: 20px 10px;
  overflow: hidden;
  .img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-right: 10px;
    float: left;
  }
  .content {
    background-color: #e0effb;
    float: left;
    padding: 8px;
    border-radius: 5px;
    max-width: 60%;
  }
}
.use {
  .img {
    float: right;
    margin-right: 0px;
    margin-left: 10px;
  }
  .content {
    float: right;
  }
}
.van-search__action:active {
  background-color: #0094ff;
}
.color {
  color: #fff;
}
</style>
