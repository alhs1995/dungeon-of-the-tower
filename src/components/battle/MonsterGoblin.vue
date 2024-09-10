<template>
  <div class="monster">
    <img src="@/assets/images/battle/monster/goblin.png" alt="" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { rollDice } from '@/utils/battleSys.js'
const defStatus = {
  str: 7,
  dex: 6,
  con: 2,
  int: 0,
  wis: 4,
  cha: 0
}
const levelAddStatus = {
  str: 0.2,
  dex: 0.5,
  con: 0.2,
  int: 0.1,
  wis: 0.1,
  cha: 0.1
}
const allSkillList = [
  {
    name: '木鎚攻擊',
    atk: '2d4+2',
    target: 1,
    unloclLevel: 0,
    chance: 50
  },
  {
    name: '投石',
    atk: '4d2+1',
    target: 1,
    unloclLevel: 0,
    chance: 50
  }
]

const { level } = defineProps(['level'])
const levelStatus = computed(() => {
  let nowStatus = { ...defStatus }
  for (let key in nowStatus) {
    nowStatus[key] += Math.floor(levelAddStatus[key] * level)
  }
  return nowStatus
})
const levelSkillList = computed(() => {
  return allSkillList.filter((e) => e.unloclLevel < level)
})
const goBattle = () => {}
const dealDmg = () => {
  let rand = Math.random() * 1000 // 隨機到的數
  const chanceArr = levelSkillList.value.map((e) => e.chance)
  const randMap = chanceArr.map((e, i) => {
    const nowChance = chanceArr.slice(0, i + 1)
    return nowChance.reduce((accumulator, currentValue) => accumulator + currentValue)
  })
  rand = Math.floor(rand % randMap[randMap.length - 1])
  let atk =
    levelSkillList.value[
      randMap.findIndex((e, i) => {
        if (i == 0) {
          return rand < e && rand > 0
        } else {
          return randMap[i - 1] < rand && e > rand
        }
      })
    ].atk
  const dmg = Math.floor(
    rollDice(atk)
  )
}
defineExpose({ goBattle })
</script>

<style lang="scss" scoped>
.monster {
  flex: 0 0 25%;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
