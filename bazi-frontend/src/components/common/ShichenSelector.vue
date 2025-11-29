<template>
  <div class="shichen-selector bg-white rounded-lg shadow-lg p-6">
    <h3 class="text-lg font-semibold text-gray-800 mb-3">⏰ 時辰快速選擇</h3>
    <p class="text-xs text-gray-500 mb-4">點擊下方時辰可快速設定對應的起始時間</p>

    <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
      <button
        v-for="shichen in shichenList"
        :key="shichen.name"
        :class="[
          'shichen-btn px-3 py-2 rounded-lg border-2 transition-all text-sm font-medium',
          isCurrentShichen(shichen)
            ? 'bg-purple-600 text-white border-purple-600 shadow-lg'
            : 'bg-white text-gray-700 border-gray-300 hover:border-purple-400 hover:bg-purple-50'
        ]"
        @click="selectShichen(shichen)"
      >
        <div class="font-bold">{{ shichen.name }}</div>
        <div class="text-xs opacity-90">{{ shichen.display }}</div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { SHICHEN_RANGES } from '../../utils/solarTime.js'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const shichenList = SHICHEN_RANGES

// 判斷是否為當前選中的時辰
function isCurrentShichen(shichen) {
  const hour = props.modelValue.birthDate.hour

  // 子時特殊處理（23:00-00:59）
  if (shichen.name === '子時') {
    return hour === 23 || hour === 0
  }

  // 其他時辰判斷
  return hour >= shichen.start.h && hour <= shichen.end.h
}

// 選擇時辰
function selectShichen(shichen) {
  emit('update:modelValue', {
    ...props.modelValue,
    birthDate: {
      ...props.modelValue.birthDate,
      hour: shichen.start.h,
      minute: shichen.start.m
    }
  })
}
</script>

<style scoped>
.shichen-btn {
  min-height: 60px;
}

.shichen-btn:active {
  transform: scale(0.98);
}
</style>
