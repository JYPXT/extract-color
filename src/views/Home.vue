<template>
  <div class="home">
    <el-row class="m-30">
      <el-col :span="4"
      class="p-15 shadow cursor-pointer border-radius-4 font-color-test"
      v-for="resource in resources"
      :key="resource.tag"
      @click.native="toResource(resource)">
        {{resource.label}}
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      resources: [{
        tag: 'classifyTree',
        label: '分类树'
      }]
    }
  },
  methods: {
    toResource (item) {
      this.$router.push({
        name: item.tag
      })
    }
  }
}
</script>

<style lang="scss">
.font-color-test {
    color: #fa7b7b;
}
</style>
