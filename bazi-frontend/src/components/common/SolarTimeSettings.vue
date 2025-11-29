<template>
  <div class="solar-time-settings bg-blue-50 rounded-lg border border-blue-200 p-4">
    <label class="flex items-start cursor-pointer">
      <input
        :checked="modelValue.useSolarTime"
        type="checkbox"
        class="mt-1 mr-3 w-5 h-5 text-purple-600 focus:ring-purple-500 rounded"
        @change="toggleSolarTime($event.target.checked)"
      >
      <div class="flex-1">
        <span class="font-medium text-gray-800">使用真太陽時修正</span>
        <p class="text-xs text-gray-600 mt-1">
          由於地球橢圓軌道和經度差異，鐘錶時間與真太陽時存在誤差。<br>
          專業八字排盤建議開啟此選項，以獲得更精確的時辰判斷。
        </p>

        <!-- 修正資訊顯示 -->
        <div v-if="modelValue.useSolarTime && solarTimeInfo" class="mt-3 p-3 bg-white rounded border border-blue-200">
          <div class="font-mono text-xs space-y-1">
            <div class="text-gray-700">
              鐘錶時間：{{ formatTime(birthDate.hour, birthDate.minute) }}
            </div>
            <div class="text-gray-600">
              經度修正：{{ solarTimeInfo.correction.longitudeDiff > 0 ? '+' : '' }}{{ solarTimeInfo.correction.longitudeDiff }} 分鐘
            </div>
            <div class="text-gray-600">
              均時差修正：{{ solarTimeInfo.correction.equationOfTime > 0 ? '+' : '' }}{{ solarTimeInfo.correction.equationOfTime }} 分鐘
            </div>
            <div class="font-semibold text-purple-700">
              真太陽時：{{ formatTime(solarTimeInfo.solarHour, solarTimeInfo.solarMinute) }}
              <span v-if="solarTimeInfo.dayAdjusted" class="text-red-600 ml-2">⚠️ 跨日</span>
            </div>
          </div>
        </div>
      </div>
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  birthDate: {
    type: Object,
    required: true
  },
  solarTimeInfo: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])

function toggleSolarTime(value) {
  emit('update:modelValue', {
    ...props.modelValue,
    useSolarTime: value
  })
}

function formatTime(hour, minute) {
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
}
</script>
