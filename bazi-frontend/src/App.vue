<script setup>
import { ref, computed, onMounted } from 'vue'
import { calculateBaziPillars } from './utils/calculators/ganzhi.js'
import { fullWuxingAnalysis } from './utils/calculators/wuxing.js'
import { convertToSolarTime, getCityCoordinates, getShichenByTime } from './utils/solarTime.js'
import { isAfterLichun, getMonthOrder } from './utils/calendar.js'
import { generateZiweiJSON, generateZiweiPrompt } from './utils/ziweiExport.js'

// 元件
import BirthInfoForm from './components/common/BirthInfoForm.vue'
import ShichenSelector from './components/common/ShichenSelector.vue'
import LocationSelector from './components/common/LocationSelector.vue'
import SolarTimeSettings from './components/common/SolarTimeSettings.vue'
import BaziResult from './components/bazi/BaziResult.vue'
import ZiweiChart from './components/ziwei/ZiweiChart.vue'
import DiscordLayout from './components/layout/DiscordLayout.vue'
import InfoDrawer from './components/common/InfoDrawer.vue'
import { PALACE_INFO, MAIN_STAR_INFO } from './utils/ziweiInfo.js'
import { Button } from './components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card'

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

// Drawer 狀態（用於紫微命盤）
const showDrawer = ref(false)
const drawerType = ref(null) // 'palace' 或 'star'
const selectedPalace = ref(null)
const selectedStar = ref(null)

// 導出功能
const chartData = computed(() => {
  return {
    wuxingJu: '土五局',
    mingzhu: '文曲',
    shenzhu: '天相',
    zinianDoujun: '巳',
    shengong: '未',
    gender: formData.value?.gender || 'male'
  }
})

const birthInfo = computed(() => {
  return {
    gender: formData.value?.gender || 'male',
    birthDate: formData.value?.birthDate || {},
    longitude: formData.value?.location?.longitude || 120.0,
    clockTime: formatDateTime(formData.value?.birthDate),
    trueSolarTime: formatDateTime(formData.value?.birthDate),
    lunarTime: '' // 需要從計算結果獲取
  }
})

function formatDateTime(birthDate) {
  if (!birthDate) return ''
  const { year, month, day, hour, minute } = birthDate
  if (!year || !month || !day) return ''
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour || 0).padStart(2, '0')}:${String(minute || 0).padStart(2, '0')}`
}

// 計算 JSON 和 Prompt 輸出
const jsonOutput = computed(() => {
  try {
    const json = generateZiweiJSON(birthInfo.value, chartData.value)
    return JSON.stringify(json, null, 2)
  } catch (error) {
    console.error('生成 JSON 失敗:', error)
    return '生成 JSON 失敗，請檢查控制台'
  }
})

const promptOutput = computed(() => {
  try {
    return generateZiweiPrompt(birthInfo.value, chartData.value)
  } catch (error) {
    console.error('生成 Prompt 失敗:', error)
    return '生成 Prompt 失敗，請檢查控制台'
  }
})

const jsonCode = ref(null)
const promptCode = ref(null)
const analysisTab = ref('json') // 'json' 或 'prompt'

async function copyToClipboard(type) {
  try {
    const text = type === 'json' ? jsonOutput.value : promptOutput.value
    await navigator.clipboard.writeText(text)
    alert(`✅ ${type === 'json' ? 'JSON' : 'Prompt'} 格式已複製到剪貼板！`)
  } catch (error) {
    console.error('複製失敗:', error)
    alert('❌ 複製失敗，請檢查控制台')
  }
}

// 主星廟旺平陷樣式
function getBrightnessClass(brightness) {
  const classes = {
    '廟': 'bg-primary text-primary-foreground',
    '旺': 'bg-primary/80 text-primary-foreground',
    '得': 'bg-secondary text-secondary-foreground',
    '利': 'bg-muted text-foreground',
    '平': 'bg-muted text-muted-foreground',
    '不': 'bg-muted text-muted-foreground',
    '陷': 'bg-muted text-muted-foreground'
  }
  return classes[brightness] || 'bg-muted text-muted-foreground'
}

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
  <DiscordLayout>
    <template #default="{ activeTab, setActiveTab }">
      <!-- 八字排盤頁面 -->
      <div v-if="activeTab === 'bazi'" class="space-y-6">
        <!-- 輸入表單區塊 -->
        <Card>
          <CardHeader>
            <CardTitle>📝 輸入出生資料</CardTitle>
          </CardHeader>
          <CardContent class="space-y-6">
          
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
          <Button
            class="w-full text-lg"
            size="lg"
            @click="calculate"
          >
            🔮 開始計算八字
          </Button>
          </CardContent>
        </Card>

        <!-- 結果展示區塊 -->
        <BaziResult
          :result="result"
          :birth-date="formData.birthDate"
        />
      </div>

      <!-- 紫微命盤頁面 -->
      <div v-if="activeTab === 'ziwei'" class="space-y-6">
        <ZiweiChart 
          :birth-date="formData.birthDate" 
          :form-data="formData"
          @open-palace="(palace) => { 
            selectedPalace = PALACE_INFO[palace]
            selectedStar = null
            drawerType = 'palace'
            showDrawer = true
          }"
          @open-star="(star) => { 
            selectedStar = MAIN_STAR_INFO[star]
            selectedPalace = null
            drawerType = 'star'
            showDrawer = true
          }"
        />
      </div>

      <!-- 命理分析頁面 -->
      <div v-if="activeTab === 'analysis'" class="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>🔍 命理分析</CardTitle>
          </CardHeader>
          <CardContent class="space-y-6">
            <p class="text-muted-foreground">導出紫微命盤資訊用於 AI 分析</p>
            
            <!-- Tab 切換 -->
            <div class="flex gap-2 border-b border-border">
              <button
                @click="analysisTab = 'json'"
                :class="[
                  'px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px',
                  analysisTab === 'json'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                ]"
              >
                📄 JSON 格式
              </button>
              <button
                @click="analysisTab = 'prompt'"
                :class="[
                  'px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px',
                  analysisTab === 'prompt'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                ]"
              >
                📝 Prompt 格式
              </button>
            </div>

            <!-- JSON 格式內容 -->
            <div v-if="analysisTab === 'json'" class="space-y-3">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-foreground">📄 JSON 格式</h3>
                <Button
                  variant="outline"
                  size="sm"
                  @click="copyToClipboard('json')"
                >
                  📋 複製
                </Button>
              </div>
              <div class="relative">
                <pre class="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono border border-border max-h-[600px] overflow-y-auto"><code ref="jsonCode">{{ jsonOutput }}</code></pre>
              </div>
            </div>

            <!-- Prompt 格式內容 -->
            <div v-if="analysisTab === 'prompt'" class="space-y-3">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-foreground">📝 Prompt 格式</h3>
                <Button
                  variant="outline"
                  size="sm"
                  @click="copyToClipboard('prompt')"
                >
                  📋 複製
                </Button>
              </div>
              <div class="relative">
                <pre class="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono border border-border whitespace-pre-wrap max-h-[600px] overflow-y-auto"><code ref="promptCode">{{ promptOutput }}</code></pre>
              </div>
            </div>

            <div class="mt-4 p-4 bg-muted rounded-lg">
              <p class="text-sm text-muted-foreground">
                💡 提示：點擊複製按鈕即可將內容複製到剪貼板，然後可直接用於調用 AI API 進行命理分析
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </template>
    
    <template #drawer>
      <!-- 統一的 Drawer，使用 chips 標籤區分類型 -->
      <InfoDrawer 
        :is-open="showDrawer" 
        :title="drawerType === 'palace' ? (selectedPalace?.name || '宮位說明') : (selectedStar?.name || '主星說明')"
        @close="showDrawer = false"
      >
        <!-- 類型標籤 -->
        <div class="mb-4 flex gap-2">
          <span 
            :class="[
              'px-3 py-1 rounded-full text-sm font-medium transition-colors',
              drawerType === 'palace' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground'
            ]"
          >
            🏛️ 宮位
          </span>
          <span 
            :class="[
              'px-3 py-1 rounded-full text-sm font-medium transition-colors',
              drawerType === 'star' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground'
            ]"
          >
            ⭐ 主星
          </span>
        </div>

        <!-- 宮位內容 -->
        <div v-if="drawerType === 'palace' && selectedPalace" class="space-y-4">
          <div>
            <h4 class="text-xl font-bold text-foreground mb-2">{{ selectedPalace.name }} ({{ selectedPalace.nameEn }})</h4>
            <p class="text-muted-foreground leading-relaxed">{{ selectedPalace.description }}</p>
          </div>

          <div class="bg-muted p-4 rounded-lg">
            <h5 class="text-foreground font-semibold mb-2">📖 詳細說明</h5>
            <p class="text-muted-foreground leading-relaxed">{{ selectedPalace.meaning }}</p>
          </div>

          <div>
            <h5 class="text-foreground font-semibold mb-2">🔑 關鍵字</h5>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="keyword in selectedPalace.keywords"
                :key="keyword"
                class="px-3 py-1 bg-muted text-foreground rounded-full text-sm"
              >
                {{ keyword }}
              </span>
            </div>
          </div>

          <div>
            <h5 class="text-foreground font-semibold mb-2">🔗 相關宮位</h5>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="related in selectedPalace.related"
                :key="related"
                class="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm"
              >
                {{ related }}
              </span>
            </div>
          </div>
        </div>

        <!-- 主星內容 -->
        <div v-if="drawerType === 'star' && selectedStar" class="space-y-4">
          <div>
            <h4 class="text-xl font-bold text-foreground mb-2">
              {{ selectedStar.name }} ({{ selectedStar.nameEn }})
            </h4>
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-1 bg-primary text-primary-foreground rounded text-sm">{{ selectedStar.type }}</span>
              <span class="px-2 py-1 bg-secondary text-secondary-foreground rounded text-sm">{{ selectedStar.element }}行</span>
            </div>
            <p class="text-muted-foreground leading-relaxed">{{ selectedStar.description }}</p>
          </div>

          <div class="bg-muted p-4 rounded-lg">
            <h5 class="text-foreground font-semibold mb-2">👤 性格特質</h5>
            <p class="text-muted-foreground leading-relaxed">{{ selectedStar.personality }}</p>
          </div>

          <div class="bg-muted p-4 rounded-lg">
            <h5 class="text-foreground font-semibold mb-2">💼 事業運勢</h5>
            <p class="text-muted-foreground leading-relaxed">{{ selectedStar.career }}</p>
          </div>

          <div class="bg-muted p-4 rounded-lg">
            <h5 class="text-foreground font-semibold mb-2">💰 財運</h5>
            <p class="text-muted-foreground leading-relaxed">{{ selectedStar.wealth }}</p>
          </div>

          <div class="bg-muted p-4 rounded-lg">
            <h5 class="text-foreground font-semibold mb-2">💕 感情運勢</h5>
            <p class="text-muted-foreground leading-relaxed">{{ selectedStar.relationship }}</p>
          </div>

          <div class="bg-muted p-4 rounded-lg">
            <h5 class="text-foreground font-semibold mb-2">🏥 健康注意</h5>
            <p class="text-muted-foreground leading-relaxed">{{ selectedStar.health }}</p>
          </div>

          <div>
            <h5 class="text-foreground font-semibold mb-2">⭐ 廟旺平陷</h5>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(brightness, index) in selectedStar.brightness"
                :key="index"
                :class="getBrightnessClass(brightness)"
                class="px-3 py-1 rounded-full text-sm"
              >
                {{ brightness }}
              </span>
            </div>
          </div>
        </div>
      </InfoDrawer>
    </template>
  </DiscordLayout>
</template>

<style scoped>
/* 全域樣式已經在 style.css 中定義 */
</style>
