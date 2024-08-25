<template>
  <div
    class="game-content"
    :style="{ '--width': config.width + 'px', '--height': config.height + 'px' }"
  >
    <div class="top-draw">
      圖片
    </div>
    <div class="mid-content">
      <div class="content-text" v-html="showText">
      </div>
      <div v-show="contentInterval" class="skip-btn" @click="clickSkip">&gt;&gt;Skip</div>
    </div>
    <div v-show="!contentInterval" class="bot-select">
      <button class="select-option" @mouseenter="hoverOption('測試說明1')">test1</button>
      <button class="select-option" @mouseenter="hoverOption('測試說明2')">test2</button>
      <button class="select-option" @mouseenter="hoverOption('測試說明3')">test3</button>
      <button class="select-option" @mouseenter="hoverOption('測試說明4')">test4</button>
      <div v-show="!!selectDesc" class="select-desc" v-html="selectDesc"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
const { config } = defineProps(['config'])
onMounted(() => {
  contentInterval.value = setInterval(() => {
    if(contentTextShowIndex.value < (contentText.value.length)) {
      contentTextShowIndex.value ++
    } else {
      clearInterval(contentInterval.value)
      contentInterval.value = undefined
    }
  }, 100)
})
const contentText = ref('我:<br>測試顯示測試顯示測試顯示測試顯示測試顯示測試顯示測試顯示測試顯示測試顯示測試顯示測試顯示測試<br>顯示測試顯示測試顯示測試顯示測試顯示測試顯示測試顯示測試顯示測試顯示')
const contentTextShowIndex = ref(1)
const contentInterval = ref(undefined)
const showText = computed(() => {
  if(contentText.value.length) {
    return contentText.value.substring(0, contentTextShowIndex.value)
  } else {
    return ''
  }
})
const clickSkip = () => {
  contentTextShowIndex.value = contentText.value.length - 1
  clearInterval(contentInterval.value)
  contentInterval.value = undefined
}

const selectDesc = ref('')
const hoverOption = (desc) => {
  selectDesc.value = desc
}

</script>

<style lang="scss" scoped>
$radius-drawn-1: 255px 15px 225px 15px / 15px 225px 15px 255px;
$radius-drawn-2: 125px 10px 20px 185px / 25px 205px 205px 25px;
$radius-drawn-3: 15px 255px 15px 225px / 225px 15px 255px 15px;
$radius-drawn-4: 15px 25px 155px 25px / 225px 150px 25px 115px;
$radius-drawn-5: 250px 25px 15px 20px / 15px 80px 105px 115px;
$radius-drawn-6: 28px 100px 20px 15px / 150px 30px 205px 225px;
.game-content{
  background-color: #fff;
  flex: 0 0 var(--width);
  height: var(--height);
  display: flex;
  flex-direction: column;
  .top-draw{
    flex: 0 0 25%;
  }
  .mid-content{
    flex: 0 0 25%;
    border-top: .25rem solid black;
    border-bottom: .25rem solid black;
    font-family: kurewa-gothic-bold;
    padding: 1rem .5rem;
    box-sizing: border-box;
    position: relative;
    .content-text{
      overflow: hidden;
      line-height: 1.2;
    }
    .skip-btn{
      position: absolute;
      right: 0.75rem;
      bottom: .75rem;
      cursor: pointer;
    }
  }
  .bot-select{
    flex: 0 0 50%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    column-gap: 2rem;
    row-gap: 2rem;
    position: relative;
    .select-desc{
      position: absolute;
      width: 95%;
      padding: 0.75rem .5rem;
      top: .5rem;
      left: 50%;
      transform: translateX(-50%);
      border-radius: $radius-drawn-4;
      box-sizing: border-box;
      border: calc(calc(2/16) * 1rem) solid black;
    }
    .select-option{
      flex: 0 0 40%;
      box-sizing: border-box;
      border: 0.25rem solid black;
      padding: 0.5rem;
      font-size: 1.2rem;
      text-align: center;
      cursor: pointer;
      &:nth-of-type(1) {
        border-radius: $radius-drawn-1;
      }
      &:nth-of-type(2) {
        border-radius: $radius-drawn-2;
      }
      &:nth-of-type(3) {
        border-radius: $radius-drawn-3;
      }
      &:nth-of-type(4) {
        border-radius: $radius-drawn-4;
      }
      &:nth-of-type(5) {
        border-radius: $radius-drawn-5;
      }
      &:nth-of-type(6) {
        border-radius: $radius-drawn-6;
      }
    }
  }
}
</style>
