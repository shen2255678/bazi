<template>
  <div v-if="result" class="bazi-result space-y-6">
    <!-- 基本信息卡片 -->
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">👤 命主資料</h2>
      <div class="grid md:grid-cols-2 gap-4 text-sm">
        <div>
          <span class="text-gray-600">性別：</span>
          <span class="font-medium">{{ result.gender === 'male' ? '男性 👨' : '女性 👩' }}</span>
        </div>
        <div>
          <span class="text-gray-600">出生地：</span>
          <span class="font-medium">{{ result.location }}</span>
        </div>
        <div>
          <span class="text-gray-600">國曆：</span>
          <span class="font-medium">
            {{ birthDate.year }}年{{ birthDate.month }}月{{ birthDate.day }}日
            {{ String(birthDate.hour).padStart(2, '0') }}:{{ String(birthDate.minute).padStart(2, '0') }}
          </span>
        </div>
        <div>
          <span class="text-gray-600">時辰：</span>
          <span class="font-medium">{{ result.shichen }}</span>
        </div>
        <div v-if="result.usedSolarTime && result.solarTimeCorrection" class="md:col-span-2">
          <span class="text-gray-600">真太陽時：</span>
          <span class="font-medium text-purple-700">
            {{ String(result.solarTimeCorrection.solarHour).padStart(2, '0') }}:{{ String(result.solarTimeCorrection.solarMinute).padStart(2, '0') }}
            (修正 {{ result.solarTimeCorrection.correction.totalDiff > 0 ? '+' : '' }}{{ result.solarTimeCorrection.correction.totalDiff }} 分鐘)
          </span>
        </div>
      </div>
    </div>

    <!-- 八字命盤視覺化 -->
    <BaziChart
      :pillars="result.pillars"
      :wuxing-analysis="result.wuxing"
    />

    <!-- 紫微命盤視覺化 -->
    <ZiweiChart :birth-date="birthDate" />
  </div>
</template>

<script setup>
import BaziChart from './BaziChart.vue'
import ZiweiChart from '../ziwei/ZiweiChart.vue'

defineProps({
  result: {
    type: Object,
    default: null
  },
  birthDate: {
    type: Object,
    required: true
  }
})
</script>
