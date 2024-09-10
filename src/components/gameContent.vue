<template>
  <div
    class="game-content"
    :style="{ '--width': config.width + 'px', '--height': config.height + 'px' }"
  >
    <div class="top-draw">
      <MonsterGoblin :level="1" :key="'goblin1'" ref="goblin1" />
      <MonsterGoblin :level="9" :key="'goblin2'" />
    </div>
    <div class="mid-content">
      <div class="content-text" v-html="showText"></div>
      <div v-show="contentInterval" class="skip-btn" @click="clickSkip">&gt;&gt;Skip</div>
    </div>
    <div v-show="showSelect" class="bot-select">
      <button
        v-for="option in selectList"
        :key="option.sort"
        class="select-option"
        @mouseenter="hoverOption(option.desc)"
        @click="goblin1.goBattle()"
      >
        {{ option.context }}
      </button>
      <div v-show="!!selectDesc" class="select-desc" v-html="selectDesc"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, inject } from 'vue'
import MonsterGoblin from '@/components/battle/MonsterGoblin.vue'
const { config } = defineProps(['config'])
onMounted(() => {
  callTest()
  console.log(goblin1.value.goBattle())
})
const goblin1 = ref(null)
const contentText = ref('')
const contentTextShowIndex = ref(1)
const contentInterval = ref(undefined)
const showText = computed(() => {
  if (contentText.value.length) {
    return (
      contentText.value.substring(0, contentTextShowIndex.value) +
      (contentText.value[contentTextShowIndex.value - 1] == '<' ||
      contentTextShowIndex.value == contentText.value.length
        ? ''
        : '<')
    )
  } else {
    return ''
  }
})
const clickSkip = () => {
  contentTextShowIndex.value = contentText.value.length
}
const getInterval = () => {
  contentInterval.value = setInterval(() => {
    if (contentTextShowIndex.value < contentText.value.length) {
      contentTextShowIndex.value++
    } else {
      afterInterval()
    }
  }, 80)
}
const afterInterval = () => {
  clearInterval(contentInterval.value)
  contentInterval.value = undefined
  setTimeout(() => {
    showSelect.value = true
  }, 100)
}

const showSelect = ref(false)
const selectDesc = ref('')
const hoverOption = (desc) => {
  selectDesc.value = desc
}
const selectList = ref([])
import gameHandler from '$/GameHandler.js'
const setLoading = inject('setLoading')
const callTest = () => {
  setLoading(true)
  setTimeout(1000)
  gameHandler
    .getGameNowData()
    .then((res) => {
      resetContent()
      contentText.value = res.content
      selectList.value = res.selection
    })
    .finally(() => {
      setLoading(false)
      getInterval()
    })
}
const resetContent = () => {
  contentText.value = ''
  selectList.value = []
  showSelect.value = false
  contentTextShowIndex.value = 1
}
</script>

<style lang="scss" scoped>
$radius-drawn-1: 255px 15px 225px 15px / 15px 225px 15px 255px;
$radius-drawn-1-r: 15px 225px 15px 255px / 255px 15px 225px 15px;
$radius-drawn-2: 125px 10px 20px 185px / 25px 205px 205px 25px;
$radius-drawn-2-r: 25px 205px 205px 25px / 125px 10px 20px 185px;
$radius-drawn-3: 15px 255px 15px 225px / 225px 15px 255px 15px;
$radius-drawn-3-r: 225px 15px 255px 15px / 15px 255px 15px 225px;
$radius-drawn-4: 15px 25px 155px 25px / 225px 150px 25px 115px;
$radius-drawn-4-r: 225px 150px 25px 115px / 15px 25px 155px 25px;
$radius-drawn-5: 250px 25px 15px 20px / 15px 80px 105px 115px;
$radius-drawn-5-r: 15px 80px 105px 115px / 250px 25px 15px 20px;
$radius-drawn-6: 28px 100px 20px 15px / 150px 30px 205px 225px;
$radius-drawn-6-r: 150px 30px 205px 225px / 28px 100px 20px 15px;
.game-content {
  background-color: #fff;
  flex: 0 0 var(--width);
  height: var(--height);
  display: flex;
  flex-direction: column;
  .top-draw {
    flex: 0 0 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 2rem;
  }
  .mid-content {
    flex: 0 0 25%;
    border-top: 0.25rem solid black;
    border-bottom: 0.25rem solid black;
    font-family: kurewa-gothic-bold;
    padding: 1rem 0.5rem;
    box-sizing: border-box;
    position: relative;
    .content-text {
      overflow: hidden;
      line-height: 1.2;
    }
    .skip-btn {
      position: absolute;
      right: 0.75rem;
      bottom: 0.75rem;
      cursor: pointer;
    }
  }
  .bot-select {
    flex: 0 0 50%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: flex-end;
    padding-bottom: 2rem;
    column-gap: 2rem;
    row-gap: 2rem;
    position: relative;
    .select-desc {
      position: absolute;
      width: 95%;
      padding: 0.75rem 0.5rem;
      top: 0.5rem;
      left: 50%;
      transform: translateX(-50%);
      border-radius: $radius-drawn-4;
      box-sizing: border-box;
      border: calc(calc(2 / 16) * 1rem) solid black;
    }
    .select-option {
      flex: 0 0 40%;
      box-sizing: border-box;
      border: 0.25rem solid black;
      background-color: #fff;
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
      &:hover {
        background-color: #eee;
        border-color: #444;
        &:nth-of-type(1) {
          border-radius: $radius-drawn-1-r;
        }
        &:nth-of-type(2) {
          border-radius: $radius-drawn-2-r;
        }
        &:nth-of-type(3) {
          border-radius: $radius-drawn-3-r;
        }
        &:nth-of-type(4) {
          border-radius: $radius-drawn-4-r;
        }
        &:nth-of-type(5) {
          border-radius: $radius-drawn-5-r;
        }
        &:nth-of-type(6) {
          border-radius: $radius-drawn-6-r;
        }
      }
    }
  }
}
</style>
