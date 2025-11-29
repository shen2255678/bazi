<template>
  <div class="birth-info-form bg-white rounded-lg shadow-lg p-6">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">📅 出生資料</h2>

    <!-- 性別選擇 -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-2">性別</label>
      <div class="flex gap-4">
        <label class="flex items-center cursor-pointer">
          <input
            :checked="modelValue.gender === 'male'"
            type="radio"
            name="gender"
            value="male"
            class="mr-2 w-4 h-4 text-purple-600 focus:ring-purple-500"
            @change="updateGender('male')"
          >
          <span class="text-sm">👨 男性</span>
        </label>
        <label class="flex items-center cursor-pointer">
          <input
            :checked="modelValue.gender === 'female'"
            type="radio"
            name="gender"
            value="female"
            class="mr-2 w-4 h-4 text-purple-600 focus:ring-purple-500"
            @change="updateGender('female')"
          >
          <span class="text-sm">👩 女性</span>
        </label>
      </div>
      <p class="text-xs text-gray-500 mt-1">* 性別影響大運起運方向（男女順逆不同）</p>
    </div>

    <!-- 出生日期 -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-2">出生日期（國曆）</label>
      <div class="grid grid-cols-3 gap-3">
        <div>
          <input
            :value="modelValue.birthDate.year"
            type="number"
            min="1900"
            max="2100"
            placeholder="年份"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            @input="updateBirthDate('year', $event.target.value)"
          >
          <span class="text-xs text-gray-500">年</span>
        </div>
        <div>
          <input
            :value="modelValue.birthDate.month"
            type="number"
            min="1"
            max="12"
            placeholder="月份"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            @input="updateBirthDate('month', $event.target.value)"
          >
          <span class="text-xs text-gray-500">月</span>
        </div>
        <div>
          <input
            :value="modelValue.birthDate.day"
            type="number"
            min="1"
            max="31"
            placeholder="日"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            @input="updateBirthDate('day', $event.target.value)"
          >
          <span class="text-xs text-gray-500">日</span>
        </div>
      </div>
    </div>

    <!-- 出生時間 -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-2">出生時間（精確到分鐘）</label>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <input
            :value="modelValue.birthDate.hour"
            type="number"
            min="0"
            max="23"
            placeholder="小時"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            @input="updateBirthDate('hour', $event.target.value)"
          >
          <span class="text-xs text-gray-500">時 (0-23)</span>
        </div>
        <div>
          <input
            :value="modelValue.birthDate.minute"
            type="number"
            min="0"
            max="59"
            placeholder="分鐘"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            @input="updateBirthDate('minute', $event.target.value)"
          >
          <span class="text-xs text-gray-500">分 (0-59)</span>
        </div>
      </div>
    </div>

    <!-- 當前時辰提示 -->
    <div v-if="currentShichen" class="mt-2 p-3 bg-purple-50 rounded-md border border-purple-200">
      <p class="text-sm">
        <span class="text-gray-600">當前對應時辰：</span>
        <span class="font-bold text-purple-700">{{ currentShichen.name }}</span>
        <span class="text-xs text-gray-500 ml-2">({{ currentShichen.display }})</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getShichenByTime } from '../../utils/solarTime.js'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

// 當前時辰
const currentShichen = computed(() => {
  if (!props.modelValue.birthDate.hour) return null
  return getShichenByTime(props.modelValue.birthDate.hour, props.modelValue.birthDate.minute || 0)
})

function updateGender(value) {
  emit('update:modelValue', {
    ...props.modelValue,
    gender: value
  })
}

function updateBirthDate(field, value) {
  const numValue = parseInt(value) || 0
  emit('update:modelValue', {
    ...props.modelValue,
    birthDate: {
      ...props.modelValue.birthDate,
      [field]: numValue
    }
  })
}
</script>
