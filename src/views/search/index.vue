<template>
  <div class="search">
    <!-- <h2>搜索</h2> -->
    <!-- 头部搜索 -->
    <van-search class="mySearch"
                v-model="value"
                @input="think"
                show-action
                placeholder="请输入搜索关键词"
                @search="onSearch"
                @cancel="onCancel">
      <!-- <template #action>
        <div @click="onSearch">搜索</div>
      </template> -->
    </van-search>
    <!-- 搜索联想区 -->
    <van-cell-group v-if="thinkList.length>0">
      <van-cell v-show="thinkList.length>0"
                value="联想区域" />
      <van-cell icon='search'
                @click="onSearch(item.oldItem)"
                v-for="(item, index) in thinkList"
                :key="index">
        <template>
          <span v-html="item.newItem"></span>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 搜索历史 -->
    <van-cell-group v-else>
      <van-cell v-show="historyList.length>0"
                title="搜索历史">
        <template #default>
          <van-icon @click="delAll"
                    name="delete" />
        </template>
      </van-cell>
      <van-cell icon='search'
                v-for="(item, index) in historyList"
                :key="index">
        <template #default>
          <van-icon @click.stop="delhis(index)"
                    name="cross" />
        </template>
        <template #title>
          <span>{{item}}</span>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { apiThink } from '@/api/other.js'
import { setLocal, getLocal } from '../../utils/mylocal.js'
export default {
  data () {
    return {
      // 输入框内容
      value: '',
      // 联想数据
      thinkList: [],
      // 节流计数器
      timer: null,
      // 历史数据
      historyList: getLocal('history') || []
    }
  },
  methods: {
    // 搜索 // 点击联想结果
    onSearch (value) {
      // 添加数组
      this.historyList.unshift(value)
      // 去重
      this.historyList = [...new Set(this.historyList)]
      // 加本地
      setLocal('history', this.historyList)
      // console.log('777', getLocal('history'))
      // 跳转
      this.$router.push('/SearhResult?key=' + value)
    },
    // 取消
    onCancel () {
      console.log('onCancel')
    },
    // 联想事件
    think () {
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        // console.log(this.value)
        if (this.value.trim().length > 0) {
          let res = await apiThink({ q: this.value })
          this.thinkList = res.data.options
          this.thinkList = this.thinkList.map(item => {
            // return item.replace(this.value, '<span style="color: #3e9df8">' + this.value + '</span>')
            return {
              oldItem: item,
              newItem: item.replace(this.value, '<span style="color: #3e9df8">' + this.value + '</span>')
            }
          })
          // console.log(this.thinkList)
        } else {
          this.thinkList = []
        }
      }, 300);
    },
    // 删除搜索历史
    delhis (index) {
      // console.log(index)
      // 根据下标删除数据
      this.historyList.splice(index, 1)
      // 存本地
      setLocal('history', this.historyList)
    },
    // 清空搜索历史
    delAll () {
      this.$dialog.confirm({
        title: '警告',
        message: '是否清空搜索历史',
      })
        .then(() => {
          this.historyList = []
          // 存本地
          setLocal('history', this.historyList)
        })
    }
  },
}
</script>

<style lang='less' scoped>
.mySearch {
  background-color: #3e9df8;
  .van-search__action {
    color: #fff;
    background-color: #3e9df8;
  }
}
</style>