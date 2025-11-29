<template>
  <div
    class="palace-card cursor-pointer group"
    :class="palaceClass"
    @click="$emit('click')"
    :title="'點擊查看 ' + palaceName + ' 詳細說明'"
  >
    <div class="palace-branch">{{ branch }}</div>
    <div class="palace-name flex items-center justify-center gap-1">
      {{ palaceName }}
      <span class="info-hint opacity-0 group-hover:opacity-100 transition-opacity text-xs">ℹ️</span>
    </div>
    <div class="palace-stars">
      <span
        v-for="(star, index) in stars"
        :key="index"
        :class="getStarClass(star)"
        class="star cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all"
        @click.stop="$emit('star-click', extractStarName(star), $event)"
        :title="isMainStar(extractStarName(star)) ? '點擊查看 ' + extractStarName(star) + ' 詳細說明' : ''"
      >
        {{ star }}
      </span>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
import { MAIN_STAR_INFO, ASSISTANT_STARS, SHA_STARS } from '../../utils/constants.js'

defineProps({
  palaceName: String,
  branch: String,
  palaceClass: String,
  stars: {
    type: Array,
    default: () => []
  }
})

defineEmits(['click', 'star-click'])

function extractStarName(starText) {
  return starText.replace(/\[.*?\]/g, '').trim()
}

function isMainStar(starName) {
  return MAIN_STAR_INFO.hasOwnProperty(starName)
}

function getStarClass(starText) {
  const starName = extractStarName(starText)
  if (MAIN_STAR_INFO[starName]) {
    return 'main-star'
  } else if (ASSISTANT_STARS.includes(starName)) {
    return 'assistant-star'
  } else if (SHA_STARS.includes(starName)) {
    return 'sha-star'
  }
  return 'main-star' // 預設
}
</script>

<style scoped>
.info-hint {
  font-size: 0.75rem;
}
</style>


