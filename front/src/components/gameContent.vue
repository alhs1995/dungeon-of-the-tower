<template>
  <div
    class="game-content"
    :style="{ '--width': config.width + 'px', '--height': config.height + 'px' }"
  >
    <div class="top-draw"></div>
    <div class="mid-content">
      <div class="content-text">
        測試顯示測試顯示測試顯示測試顯示測試顯示測試顯示測試顯示測試顯示測試顯示測試顯示
      </div>
      <div class="skip-btn">>>Skip</div>
    </div>
    <div class="bot-select">
      <div class="select-option">test1</div>
      <div class="select-option">test2</div>
      <div class="select-option">test3</div>
      <div class="select-option">test4</div>
    </div>
  </div>
</template>

<script setup>
const { config } = defineProps(['config'])
</script>

<style lang="sass" scoped>
.game-content
  background-color: #fff
  flex: 0 0 var(--width)
  height: var(--height)
  display: flex
  flex-direction: column
  .top-draw
    flex: 0 0 25%
  .mid-content
    flex: 0 0 25%
    border-top: .25rem solid black
    border-bottom: .25rem solid black
    font-family: kurewa-gothic-bold
    padding: 1rem .5rem
    box-sizing: border-box
    position: relative
    .content-text
      overflow: hidden
      line-height: 1.2
    .skip-btn
      position: absolute
      right: 0.75rem
      bottom: .75rem
  .bot-select
    flex: 0 0 50%
    display: flex
    flex-wrap: wrap
    justify-content: center
    align-content: center
    column-gap: 2rem
    row-gap: 2rem
    .select-option
      flex: 0 0 40%
      box-sizing: border-box
      border: 0.25rem solid black
      padding: 0.5rem
      border-radius: 0.5rem
      font-size: 1.2rem
      text-align: center
      cursor: pointer
      font-family: kurewa-gothic-bold
</style>
