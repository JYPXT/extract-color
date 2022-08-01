<template>
    <div id="app">
        <div class="font-color">字体颜色</div>
        <div class="border-top-color">上边框颜色</div>
        <div class="border-bottom-color">下边框颜色~</div>
        <div class="border-color">边框颜色</div>
        <div class="bg-color">背景颜色</div>
        <router-view/>
    </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
        msg: 'app'
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang="scss">
#app {
    padding: 30px;
}

.font-color {
    color: #fa7b7b;
}

.bg-color {
    display: inline-block;
    background: #fa7b7b;
}

.border-color {
    width: 200px;
    height: 100px;
    margin: 20px 0;
    border: 1px solid #fa7b7b;
}

.border-top-color {
    width: 200px;
    height: 100px;
    margin: 20px 0;
    border-top: 1px solid #fa7b7b;
}

.border-bottom-color {
    width: 200px;
    height: 100px;
    margin: 20px 0;
    border-bottom: 1px solid #fa7b7b;
}
</style>
