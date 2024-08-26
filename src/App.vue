<script setup>
import { onMounted, onBeforeUnmount, ref, computed, provide } from 'vue'
import gameContent from '@/components/gameContent.vue'
import mainContent from '@/components/mainContent.vue'
import gameLoader from './components/gameLoader.vue'
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
  if (bodyWidth / 9 > bodyHeight / 16) {
    refConfig.value.width = (bodyHeight / 16) * 9
    refConfig.value.height = bodyHeight
  } else {
    refConfig.value.width = bodyWidth
    refConfig.value.height = (bodyWidth / 9) * 16
  }
  showRef.value = true
}

const gameNowPath = ref('mainContent')
const gameComponent = {
  mainContent: mainContent,
  gameContent: gameContent
}
const gameNowComponent = computed(() => {
  return gameComponent[gameNowPath.value]
})
const onChangeGamePath = (gamePath) => {
  gameNowPath.value = gamePath
}

provide('changeGamePath', onChangeGamePath)

const showLoading = ref(false)
provide('showLoading', showLoading)
const setLoading = (show) => {
  showLoading.value = show
}
provide('setLoading', setLoading)
</script>

<template>
  <div ref="mainBody" class="main-body">
    <template v-if="showRef">
      <component :is="gameNowComponent" :key="gameNowPath" :config="refConfig" />
    </template>
    <gameLoader :config="refConfig" />
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
  position: relative
</style>
