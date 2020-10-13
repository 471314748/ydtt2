<template>
  <div class="reply">
    <!-- 回复弹出层 -->
    <van-popup v-model="show"
               position="bottom"
               :style="{ height: '30%' }" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: true,
    }
  },
}
</script>

<style>
</style>