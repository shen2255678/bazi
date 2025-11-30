<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { calculateBaziPillars } from './utils/calculators/ganzhi.js'
import { fullWuxingAnalysis } from './utils/calculators/wuxing.js'
import { calculatePillarsShishen, analyzeShishenCombination } from './utils/calculators/shishen.js'
import { calculateDayun } from './utils/calculators/dayun.js'
import { convertToSolarTime, getCityCoordinates, getShichenByTime } from './utils/solarTime.js'
import { isAfterLichun, getMonthOrder } from './utils/calendar.js'
import { generateZiweiJSON, generateZiweiPrompt } from './utils/ziweiExport.js'
import { solarToLunarString } from './utils/lunarConverter.js'
// 使用 iztro 庫進行紫微斗數排盤（如果可用）
// import { calculateZiweiChartWithIztro } from './utils/calculators/iztroAdapter.js'
// 保留舊的計算器作為備用
import { calculateZiweiChart } from './utils/calculators/ziweiChartComplete.js'

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

// 紫微斗數排盤結果（在 calculate 函數中計算）
const ziweiChartResult = ref(null)

// 農曆時間（異步計算）
const lunarTimeString = ref('')

// 導出功能 - 使用真正的排盤計算結果
const chartData = computed(() => {
  if (ziweiChartResult.value) {
    return {
      wuxingJu: ziweiChartResult.value.wuxingJu || '土五局',
      mingzhu: ziweiChartResult.value.mingzhu || '文曲',
      shenzhu: ziweiChartResult.value.shenzhu || '天相',
      zinianDoujun: ziweiChartResult.value.zinianDoujun || '巳',
      shengong: ziweiChartResult.value.shengong || '未',
      gender: formData.value?.gender || 'male',
      ziweiChart: ziweiChartResult.value // 完整的排盤結果
    }
  }
  
  if (!result.value || !result.value.pillars) {
    // 如果還沒有計算結果，返回默認值
    return {
      wuxingJu: '土五局',
      mingzhu: '文曲',
      shenzhu: '天相',
      zinianDoujun: '巳',
      shengong: '未',
      gender: formData.value?.gender || 'male'
    }
  }
  
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
  const birthDate = formData.value?.birthDate || {}
  const solarTime = solarTimeInfo.value
  // 使用真太陽時格式化時間
  const trueSolarTime = solarTime ?
    `${birthDate.year}-${String(birthDate.month).padStart(2, '0')}-${String(birthDate.day).padStart(2, '0')} ${String(solarTime.solarHour || birthDate.hour).padStart(2, '0')}:${String(solarTime.solarMinute || birthDate.minute).padStart(2, '0')}` :
    formatDateTime(birthDate)

  return {
    gender: formData.value?.gender || 'male',
    birthDate: birthDate,
    longitude: formData.value?.location?.longitude || 120.0,
    clockTime: formatDateTime(birthDate),
    trueSolarTime: trueSolarTime,
    lunarTime: lunarTimeString.value // 使用 ref 變量
  }
})

// 異步更新農曆時間
watch(() => formData.value.birthDate, async (birthDate) => {
  if (birthDate && birthDate.year && birthDate.month && birthDate.day) {
    try {
      const lunarStr = await solarToLunarString(birthDate)
      lunarTimeString.value = lunarStr || '轉換失敗'
    } catch (error) {
      console.error('農曆轉換失敗:', error)
      lunarTimeString.value = '轉換失敗'
    }
  } else {
    lunarTimeString.value = ''
  }
}, { immediate: true })

// 監聽真太陽時變化，更新 birthInfo
watch(() => solarTimeInfo.value, () => {
  // 觸發 birthInfo 重新計算
  if (formData.value?.birthDate) {
    const birthDate = formData.value.birthDate
    const solarTime = solarTimeInfo.value
    if (solarTime) {
      birthInfo.value.trueSolarTime = 
        `${birthDate.year}-${String(birthDate.month).padStart(2, '0')}-${String(birthDate.day).padStart(2, '0')} ${String(solarTime.solarHour || birthDate.hour).padStart(2, '0')}:${String(solarTime.solarMinute || birthDate.minute).padStart(2, '0')}`
    }
  }
}, { deep: true })

function formatDateTime(birthDate) {
  if (!birthDate) return ''
  const { year, month, day, hour, minute } = birthDate
  if (!year || !month || !day) return ''
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour || 0).padStart(2, '0')}:${String(minute || 0).padStart(2, '0')}`
}

// 計算 JSON 和 Prompt 輸出
const jsonOutput = computed(() => {
  try {
    console.log('生成 JSON，chartData:', chartData.value)
    console.log('生成 JSON，ziweiChartResult:', ziweiChartResult.value)
    const json = generateZiweiJSON(birthInfo.value, chartData.value, result.value)
    console.log('生成的 JSON:', json)
    return JSON.stringify(json, null, 2)
  } catch (error) {
    console.error('生成 JSON 失敗:', error)
    return '生成 JSON 失敗，請檢查控制台: ' + error.message
  }
})

const promptOutput = computed(() => {
  try {
    console.log('生成 Prompt，chartData:', chartData.value)
    const prompt = generateZiweiPrompt(birthInfo.value, chartData.value, result.value)
    console.log('生成的 Prompt 長度:', prompt.length)
    return prompt
  } catch (error) {
    console.error('生成 Prompt 失敗:', error)
    return '生成 Prompt 失敗，請檢查控制台: ' + error.message
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
async function calculate() {
  try {
    const time = adjustedTime.value
    const birthDate = formData.value.birthDate

    // 判斷是否在立春之後
    const afterLichun = isAfterLichun(birthDate.year, birthDate.month, birthDate.day)

    // 獲取月令（根據節氣）
    const monthOrder = getMonthOrder(birthDate.year, birthDate.month, birthDate.day)

    // 計算節氣四柱（使用節氣定月）
    const pillars = calculateBaziPillars({
      ...birthDate,
      hour: time.hour,
      minute: time.minute
    }, afterLichun, monthOrder)

    // 計算非節氣四柱（使用農曆月份定月，不考慮節氣）
    // 非節氣四柱：年柱和日柱相同，月柱使用農曆月份，時柱相同
    // 需要獲取農曆月份來計算非節氣四柱
    let lunarMonth = birthDate.month // 默認使用公曆月份
    try {
      const { getLunarDetails } = await import('./utils/lunarConverter.js')
      const lunarDetails = await getLunarDetails(birthDate)
      if (lunarDetails) {
        // 使用農曆月份（1-12），直接對應月令（1=寅月, 2=卯月, ..., 12=丑月）
        // 農曆正月對應寅月(1)，農曆二月對應卯月(2)，以此類推
        // 參考：丁丑 壬寅 戊申 丁巳，月柱是"壬寅"，表示使用農曆正月（寅月）
        lunarMonth = lunarDetails.monthInChinese ? 
          (() => {
            const monthStr = lunarDetails.monthInChinese
            // 提取數字：正月=1, 二月=2, ..., 十二月=12
            const monthMap = {
              '正': 1, '一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6,
              '七': 7, '八': 8, '九': 9, '十': 10, '十一': 11, '十二': 12
            }
            for (const [key, value] of Object.entries(monthMap)) {
              if (monthStr.includes(key)) {
                return value
              }
            }
            return birthDate.month
          })() : birthDate.month
      }
    } catch (e) {
      console.warn('獲取農曆月份失敗，使用公曆月份:', e)
    }
    // 非節氣四柱的月令：農曆正月=寅月(1), 農曆二月=卯月(2), ..., 農曆十二月=丑月(12)
    const nonJieqiMonthOrder = lunarMonth
    const nonJieqiPillars = calculateBaziPillars({
      ...birthDate,
      hour: time.hour,
      minute: time.minute
    }, afterLichun, nonJieqiMonthOrder)

    const wuxing = fullWuxingAnalysis(pillars)

    // 計算十神
    const shishen = calculatePillarsShishen(pillars)
    const shishenAnalysis = analyzeShishenCombination(shishen)

    // 計算大運
    const dayun = calculateDayun(pillars, birthDate, formData.value.gender)

    result.value = {
      pillars, // 節氣四柱
      nonJieqiPillars, // 非節氣四柱
      wuxing,
      shishen,
      shishenAnalysis,
      dayun,
      shichen: currentShichen.value.name,
      gender: formData.value.gender,
      location: formData.value.selectedCity,
      usedSolarTime: formData.value.useSolarTime,
      solarTimeCorrection: solarTimeInfo.value
    }

    // 計算紫微斗數排盤
    try {
      console.log('開始計算紫微斗數排盤，birthDate:', formData.value.birthDate, 'result:', result.value)
      
      // 嘗試使用 iztro（如果可用）
      try {
        const { calculateZiweiChartWithIztro } = await import('./utils/calculators/iztroAdapter.js')
        ziweiChartResult.value = await calculateZiweiChartWithIztro(
          { birthDate: formData.value.birthDate, gender: formData.value.gender },
          result.value
        )
        if (ziweiChartResult.value) {
          console.log('使用 iztro 排盤成功')
        } else {
          throw new Error('iztro 返回 null')
        }
      } catch (iztroError) {
        console.warn('iztro 排盤失敗，使用舊的計算器:', iztroError)
        // 回退到舊的計算器
        ziweiChartResult.value = await calculateZiweiChart(
          { birthDate: formData.value.birthDate, gender: formData.value.gender },
          result.value
        )
      }
      console.log('紫微斗數排盤結果：', ziweiChartResult.value)
      if (!ziweiChartResult.value) {
        console.warn('紫微斗數排盤返回 null，可能缺少必要數據')
      }
    } catch (error) {
      console.error('紫微斗數排盤計算失敗:', error)
      console.error('錯誤詳情:', error.stack)
      ziweiChartResult.value = null
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
          :ziwei-chart="ziweiChartResult"
          :chart-data="chartData"
          @open-palace="(palace) => { 
            selectedPalace = PALACE_INFO[palace]
            selectedStar = null
            drawerType = 'palace'
            showDrawer = true
          }"
          @open-star="(star) => { 
            console.log('點擊主星:', star)
            // 嘗試查找主星信息
            // 首先嘗試直接匹配
            let starInfo = MAIN_STAR_INFO[star]
            
            // 如果找不到，嘗試不同的名稱變體
            if (!starInfo) {
              // 星曜名稱映射表（處理可能的變體）
              const starNameMap = {
                '天机': '天機',
                '天相': '天相',
                '天梁': '天梁',
                '天同': '天同',
                '天府': '天府',
                '天機': '天機',
                '天相': '天相',
                '天梁': '天梁',
                '天同': '天同',
                '天府': '天府',
                '紫微': '紫微',
                '太陽': '太陽',
                '太陰': '太陰',
                '武曲': '武曲',
                '廉貞': '廉貞',
                '貪狼': '貪狼',
                '巨門': '巨門',
                '七殺': '七殺',
                '破軍': '破軍'
              }
              
              const mappedName = starNameMap[star] || star
              starInfo = MAIN_STAR_INFO[mappedName]
            }
            
            // 如果還是找不到，使用基本信息
            if (!starInfo) {
              console.warn('找不到主星信息:', star, '可用的主星:', Object.keys(MAIN_STAR_INFO))
              starInfo = {
                name: star,
                nameEn: star,
                type: '主星',
                element: '未知',
                description: `${star} 是紫微斗數中的主星之一。`,
                personality: '需要根據實際命盤位置和亮度進行分析。',
                career: '需要根據實際命盤位置和亮度進行分析。',
                wealth: '需要根據實際命盤位置和亮度進行分析。',
                relationship: '需要根據實際命盤位置和亮度進行分析。',
                health: '需要根據實際命盤位置和亮度進行分析。',
                brightness: ['廟', '旺', '得', '利', '平', '不', '陷']
              }
            }
            
            selectedStar = starInfo
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
              {{ selectedStar.name }} ({{ selectedStar.nameEn || selectedStar.name }})
            </h4>
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-1 bg-primary text-primary-foreground rounded text-sm">{{ selectedStar.type || '主星' }}</span>
              <span class="px-2 py-1 bg-secondary text-secondary-foreground rounded text-sm">{{ selectedStar.element || '未知' }}行</span>
            </div>
            <p class="text-muted-foreground leading-relaxed">{{ selectedStar.description || '主星說明' }}</p>
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
