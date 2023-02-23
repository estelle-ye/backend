<template>
  <div>
    <div class="card-header">
      <span>{{ title }}</span>
      <svg t="1675425733407" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2682" width="16" height="16"><path d="M536 480v192a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V480a16 16 0 0 1 16-16h16a16 16 0 0 1 16 16z m-32-128h16a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16z m8 448c159.056 0 288-128.944 288-288s-128.944-288-288-288-288 128.944-288 288 128.944 288 288 288z m0 48c-185.568 0-336-150.432-336-336s150.432-336 336-336 336 150.432 336 336-150.432 336-336 336z" fill="#000000" p-id="2683" /></svg>
    </div>
    <div class="card-body">
      <span>{{ count }}</span>
    </div>
    <div class="card-charts">
      <slot name="charts" />
    </div>
    <div class="card-foot">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'count'],

  data() {
    return {

    }
  },

  mounted() {

  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>
.card-header{
    display:flex;
    justify-content:space-between;
    color:gray;
    font-size:14px;
}
.card-body{
    font-size:32px;
    padding:5px 0;
}
.card-charts{
    height:60px;
}
.card-foot{
    font-size:14px;
    border-top:1px solid rgb(180, 180, 180);
    padding-top:10px;
}
</style>
