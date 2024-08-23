<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import gameContent from '@/components/gameContent.vue'
const mainBody = ref(null)
onMounted(() => {
  calcContent()
  window.addEventListener('resize', () => calcContent())
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', () => calcContent())
})
const refConfig = ref({
  width: 0,
  height: 0
})
const showRef = ref(false)
const calcContent = () => {
  const bodyWidth = window.innerWidth
  const bodyHeight = window.innerHeight
  if((bodyWidth / 9) > (bodyHeight / 16) ) {
    refConfig.value.width = (bodyHeight / 16) * 9
    refConfig.value.height = bodyHeight
  } else {
    refConfig.value.width = bodyWidth
    refConfig.value.height = (bodyWidth / 9) * 16
  }
  showRef.value = true
}
</script>

<template>
  <div ref="mainBody" class="main-body">
    <gameContent v-if="showRef" :config="refConfig" />
  </div>
</template>

<style lang="sass" scoped>
.main-body
  width: 100%
  height: 100%
  background: transparent
  display: flex
  align-items: center
  justify-content: center
</style>
