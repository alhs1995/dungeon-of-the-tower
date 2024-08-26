<template>
  <div
    class="game-content"
    :style="{ '--width': config.width + 'px', '--height': config.height + 'px' }"
  >
    <h1>塔之地城</h1>
    <button @click="changeGamePath('gameContent')">遊玩</button>
  </div>
</template>

<script setup>
const { config } = defineProps(['config'])
import { inject } from 'vue'
const changeGamePath = inject('changeGamePath')
</script>

<style lang="scss" scoped>
@import url('@/assets/scss/animation-jumpin.scss');
$radius-drawn-1: 255px 15px 225px 15px / 15px 225px 15px 255px;
$radius-drawn-2: 15px 225px 15px 255px / 255px 15px 225px 15px;
.game-content {
  background-color: #fff;
  flex: 0 0 var(--width);
  height: var(--height);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 2rem;
  h1 {
    letter-spacing: 0.5rem;
    text-align: center;
    font-size: 5rem;
    font-family: kurewa-gothic-bold;
    animation: jump-in 0.7s ease-in-out;
  }
  button {
    background-color: #fff;
    width: 50%;
    box-sizing: border-box;
    border: 0.25rem solid black;
    padding: 0.5rem;
    font-size: 1.2rem;
    text-align: center;
    cursor: pointer;
    border-radius: $radius-drawn-1;
    &:hover {
      background-color: #eee;
      border-color: #444;
      border-radius: $radius-drawn-2;
    }
  }
}
</style>
