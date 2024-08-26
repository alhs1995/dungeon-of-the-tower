<template>
  <div
    v-show="showLoading"
    class="loaderMask"
    :style="{ '--width': config.width + 'px', '--height': config.height + 'px' }"
  >
    <span class="loader"></span>
  </div>
</template>

<script setup>
const { config } = defineProps(['config'])
import { inject } from 'vue'
const showLoading = inject('showLoading')
</script>

<style lang="scss" scoped>
.loaderMask {
  width: var(--width);
  height: var(--height);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #00000099;
  backdrop-filter: blur(0.05rem);
}
.loader {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: inline-block;
  border-top: 0.25rem solid #fff;
  border-right: 0.25rem solid transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  position: absolute;
  left: calc(50% - 1.5rem);
  top: calc(50% - 1.5rem);
  transform: translate(-50%, -50%);
}
.loader::after {
  content: '';
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border-left: 0.25rem solid #ff3d00;
  border-bottom: 0.25rem solid transparent;
  animation: rotation 0.5s linear infinite reverse;
}
@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
