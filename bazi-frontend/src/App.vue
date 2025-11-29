<script setup>
import { ref, computed } from 'vue'
import { calculateBaziPillars } from './utils/calculators/ganzhi.js'
import { fullWuxingAnalysis } from './utils/calculators/wuxing.js'
import { convertToSolarTime, getCityCoordinates, getShichenByTime } from './utils/solarTime.js'
import { isAfterLichun, getMonthOrder } from './utils/calendar.js'

// 元件
import BirthInfoForm from './components/common/BirthInfoForm.vue'
import ShichenSelector from './components/common/ShichenSelector.vue'
import LocationSelector from './components/common/LocationSelector.vue'
import SolarTimeSettings from './components/common/SolarTimeSettings.vue'
import BaziResult from './components/bazi/BaziResult.vue'

// 表單數據整合
const formData = ref({
  gender: 'male',
  birthDate: {
    year: 1990,
    month: 1,
    day: 15,
    hour: 14,
    minute: 30
  },
  selectedCity: '北京',
  customLocation: {
    enabled: false,
    lng: 116.4074
  },
  useSolarTime: true
})

// 計算結果
const result = ref(null)
const solarTimeInfo = ref(null)
const locationSelectorRef = ref(null)

// 當前經緯度
const currentCoordinates = computed(() => {
  if (formData.value.customLocation.enabled) {
    const coords = getCityCoordinates(formData.value.selectedCity)
    return {
      lng: formData.value.customLocation.lng,
      lat: coords?.lat || 39.9042,
      timezone: 'Asia/Shanghai'
    }
  }
  return getCityCoordinates(formData.value.selectedCity)
})

// 真太陽時修正後的時間
const adjustedTime = computed(() => {
  if (!formData.value.useSolarTime) {
    return {
      hour: formData.value.birthDate.hour,
      minute: formData.value.birthDate.minute
    }
  }

  const coords = currentCoordinates.value
  const solarResult = convertToSolarTime(
    formData.value.birthDate,
    coords.lng,
    coords.timezone
  )

  solarTimeInfo.value = solarResult
  return {
    hour: solarResult.solarHour,
    minute: solarResult.solarMinute
  }
})

// 當前時辰
const currentShichen = computed(() => {
  const time = adjustedTime.value
  return getShichenByTime(time.hour, time.minute)
})

// 計算八字
function calculate() {
  try {
    const time = adjustedTime.value
    const birthDate = formData.value.birthDate
    
    // 判斷是否在立春之後
    const afterLichun = isAfterLichun(birthDate.year, birthDate.month, birthDate.day)
    
    // 獲取月令（根據節氣）
    const monthOrder = getMonthOrder(birthDate.year, birthDate.month, birthDate.day)
    
    const pillars = calculateBaziPillars({
      ...birthDate,
      hour: time.hour,
      minute: time.minute
    }, afterLichun, monthOrder)

    const wuxing = fullWuxingAnalysis(pillars)

    result.value = {
      pillars,
      wuxing,
      shichen: currentShichen.value.name,
      gender: formData.value.gender,
      location: formData.value.selectedCity,
      usedSolarTime: formData.value.useSolarTime,
      solarTimeCorrection: solarTimeInfo.value
    }

    console.log('八字計算結果：', result.value)
  } catch (error) {
    console.error('計算失敗：', error)
    alert('計算失敗，請檢查輸入資料')
  }
}
</script>

<template>
  <div class="min-h-screen bg-linear-to-br from-purple-100 via-blue-100 to-pink-100 py-8 px-4">
    <div class="max-w-6xl mx-auto">
      <!-- 標題 -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">🔮 八字命理計算機</h1>
        <p class="text-gray-600">專業四柱八字排盤 · 真太陽時修正 · 五行分析</p>
      </div>

      <!-- 輸入表單區塊 -->
      <div class="space-y-6 mb-8">
        <!-- 出生資料表單 -->
        <BirthInfoForm v-model="formData" />

        <!-- 時辰快速選擇 -->
        <ShichenSelector v-model="formData" />

        <!-- 地點選擇 -->
        <LocationSelector ref="locationSelectorRef" v-model="formData" />

        <!-- 真太陽時設定 -->
        <SolarTimeSettings
          v-model="formData"
          :birth-date="formData.birthDate"
          :solar-time-info="solarTimeInfo"
        />

        <!-- 計算按鈕 -->
        <button
          class="w-full bg-purple-600 text-white py-3 px-6 rounded-md hover:bg-purple-700 transition-colors font-medium text-lg shadow-lg"
          @click="calculate"
        >
          🔮 開始計算八字
        </button>
      </div>

      <!-- 結果展示區塊 -->
      <BaziResult
        :result="result"
        :birth-date="formData.birthDate"
      />

      <!-- 功能說明 -->
      <div v-if="result" class="mt-6 bg-white bg-opacity-80 border-l-4 border-green-500 p-4 rounded">
        <p class="text-sm text-green-900 font-semibold mb-2">
          ✅ 已完成功能
        </p>
        <ul class="text-xs text-green-800 space-y-1">
          <li>✓ 性別選擇（影響大運起運方向）</li>
          <li>✓ 精確到分鐘的時間輸入</li>
          <li>✓ 時辰快速選擇（12時辰）</li>
          <li>✓ 出生地點選擇（25個城市 + 自訂經度）</li>
          <li>✓ 真太陽時修正（經度時差 + 均時差）</li>
          <li>✓ 四柱八字計算（天干地支、納音）</li>
          <li>✓ 五行分析（分布、強弱、用神喜忌）</li>
          <li>✓ 元件化架構設計</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 全域樣式已經在 style.css 中定義 */
</style>
