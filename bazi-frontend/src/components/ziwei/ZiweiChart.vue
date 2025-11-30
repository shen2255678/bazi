<template>
  <Card>
    <CardHeader>
      <CardTitle class="text-center text-2xl">紫微命盤</CardTitle>
    </CardHeader>
    <CardContent>

    <!-- 傳統方格盤式佈局 -->
    <!-- 參考代碼：zw1-zw12 對應固定的地支順序（子、丑、寅...），但顯示的宮位名稱會根據命宮位置改變 -->
    <!-- 顯示順序：zw6,zw7,zw8,zw9 (第一行), zw5,zwHome,zw10,zw4,zw11 (第二行), zw3,zw2,zw1,zw12 (第三行) -->
    <div class="palace-grid" v-if="palaceData.length > 0 && getPalacesByDisplayOrder().length > 0">
      <!-- 第一行：zw6,zw7,zw8,zw9 (對應地支：巳、午、未、申) -->
      <Card
        v-for="(palace, index) in getPalacesByDisplayOrder().slice(0, 4)"
        :key="`palace-${index}-${palace.earthlyBranch || index}`"
        class="palace-card cursor-pointer group"
        :class="[
          getPalaceClass(palace.name),
          {
            'life-palace': palace.isMingGong,
            'shen-palace': palace.isShenGong
          }
        ]"
        @click="openPalaceInfo(palace.name)"
        :title="'點擊查看 ' + palace.name + ' 詳細說明'"
      >
        <PalaceContent
          :palace="palace"
          :palace-name="palace.name"
          :year-stem="formData?.birthDate?.year ? getYearStem(formData.birthDate.year) : '甲'"
          @open-star="openStarInfo"
        />
      </Card>
      
      <!-- 第二行：zw5 (左), [中心], zw10,zw4,zw11 (右) -->
      <Card
        v-for="(palace, index) in getPalacesByDisplayOrder().slice(4, 5)"
        :key="`palace-${index + 4}-${palace.earthlyBranch || index + 4}`"
        class="palace-card cursor-pointer group"
        :class="[
          getPalaceClass(palace.name),
          {
            'life-palace': palace.isMingGong,
            'shen-palace': palace.isShenGong
          }
        ]"
        @click="openPalaceInfo(palace.name)"
        :title="'點擊查看 ' + palace.name + ' 詳細說明'"
      >
        <PalaceContent
          :palace="palace"
          :palace-name="palace.name"
          :year-stem="formData?.birthDate?.year ? getYearStem(formData.birthDate.year) : '甲'"
          @open-star="openStarInfo"
        />
      </Card>
      
      <div class="palace-center">
        <div class="center-content">
          <div class="center-info" v-if="birthDate">
            <div class="text-xs mb-1">{{ birthDate.year }}年{{ birthDate.month }}月{{ birthDate.day }}日</div>
            <div class="text-xs mb-2">{{ birthDate.hour }}:{{ String(birthDate.minute).padStart(2, '0') }}</div>
          </div>
          <div class="center-meta">
            <div class="meta-item">
              <span class="meta-label">五行局數:</span>
              <span class="meta-value">{{ chartData?.wuxingJu || '土五局' }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">命主:</span>
              <span class="meta-value">{{ chartData?.mingzhu || '文曲' }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">身主:</span>
              <span class="meta-value">{{ chartData?.shenzhu || '天相' }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">子年斗君:</span>
              <span class="meta-value">{{ chartData?.zinianDoujun || '巳' }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">身宮:</span>
              <span class="meta-value">{{ chartData?.shengong || '未' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 第二行右側：1個宮位 -->
      <Card
        v-for="(palace, index) in getPalacesByDisplayOrder().slice(5, 6)"
        :key="`palace-${index + 5}-${palace.earthlyBranch || index + 5}`"
        class="palace-card cursor-pointer group"
        :class="[
          getPalaceClass(palace.name),
          {
            'life-palace': palace.isMingGong,
            'shen-palace': palace.isShenGong
          }
        ]"
        @click="openPalaceInfo(palace.name)"
        :title="'點擊查看 ' + palace.name + ' 詳細說明'"
      >
        <PalaceContent
          :palace="palace"
          :palace-name="palace.name"
          :year-stem="formData?.birthDate?.year ? getYearStem(formData.birthDate.year) : '甲'"
          @open-star="openStarInfo"
        />
      </Card>

      <!-- 第三行左側：1個宮位 -->
      <Card
        v-for="(palace, index) in getPalacesByDisplayOrder().slice(6, 7)"
        :key="`palace-${index + 6}-${palace.earthlyBranch || index + 6}`"
        class="palace-card cursor-pointer group"
        :class="[
          getPalaceClass(palace.name),
          {
            'life-palace': palace.isMingGong,
            'shen-palace': palace.isShenGong
          }
        ]"
        @click="openPalaceInfo(palace.name)"
        :title="'點擊查看 ' + palace.name + ' 詳細說明'"
      >
        <PalaceContent
          :palace="palace"
          :palace-name="palace.name"
          :year-stem="formData?.birthDate?.year ? getYearStem(formData.birthDate.year) : '甲'"
          @open-star="openStarInfo"
        />
      </Card>

      <div class="palace-spacer"></div>
      <div class="palace-spacer"></div>

      <!-- 第三行右側：1個宮位 -->
      <Card
        v-for="(palace, index) in getPalacesByDisplayOrder().slice(7, 8)"
        :key="`palace-${index + 7}-${palace.earthlyBranch || index + 7}`"
        class="palace-card cursor-pointer group"
        :class="[
          getPalaceClass(palace.name),
          {
            'life-palace': palace.isMingGong,
            'shen-palace': palace.isShenGong
          }
        ]"
        @click="openPalaceInfo(palace.name)"
        :title="'點擊查看 ' + palace.name + ' 詳細說明'"
      >
        <PalaceContent
          :palace="palace"
          :palace-name="palace.name"
          :year-stem="formData?.birthDate?.year ? getYearStem(formData.birthDate.year) : '甲'"
          @open-star="openStarInfo"
        />
      </Card>

      <!-- 第四行：4個宮位 -->
      <Card
        v-for="(palace, index) in getPalacesByDisplayOrder().slice(8, 12)"
        :key="`palace-${index + 8}-${palace.earthlyBranch || index + 8}`"
        class="palace-card cursor-pointer group"
        :class="[
          getPalaceClass(palace.name),
          {
            'life-palace': palace.isMingGong,
            'shen-palace': palace.isShenGong
          }
        ]"
        @click="openPalaceInfo(palace.name)"
        :title="'點擊查看 ' + palace.name + ' 詳細說明'"
      >
        <PalaceContent
          :palace="palace"
          :palace-name="palace.name"
          :year-stem="formData?.birthDate?.year ? getYearStem(formData.birthDate.year) : '甲'"
          @open-star="openStarInfo"
        />
      </Card>
    </div>
    
    <!-- 如果沒有排盤數據，顯示提示 -->
    <div v-else class="text-center text-muted-foreground p-8">
      <p>請先在「八字排盤」頁面計算八字，然後切換到「紫微命盤」查看結果</p>
    </div>

      <!-- 說明文字 -->
      <div class="mt-6 text-center text-sm text-muted-foreground">
        <p v-if="palaceData.length === 0">※ 請先計算八字以生成紫微命盤</p>
        <p v-else-if="getPalacesByDisplayOrder().length === 0">⚠️ 宮位數據加載中或格式錯誤（palaceData: {{ palaceData.length }}, displayOrder: {{ getPalacesByDisplayOrder().length }}）</p>
        <p v-else>💡 提示：點擊宮位名稱查看說明，點擊主星查看特點</p>
      </div>
    </CardContent>
  </Card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { getStarBrightness, getStarSiHua } from '@/utils/calculators/ziweiStars.js'
import PalaceContent from './PalaceContent.vue'

const props = defineProps({
  birthDate: {
    type: Object,
    default: null
  },
  formData: {
    type: Object,
    default: () => ({
      gender: 'male',
      birthDate: {},
      location: {}
    })
  },
  ziweiChart: {
    type: Object,
    default: null
  },
  chartData: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['open-palace', 'open-star'])

// 獲取宮位顏色類別
function getPalaceClass(palaceName) {
  const colorMap = {
    '命宮': 'palace-life',
    '兄弟宮': 'palace-sibling',
    '夫妻宮': 'palace-spouse',
    '子女宮': 'palace-children',
    '財帛宮': 'palace-wealth',
    '疾厄宮': 'palace-health',
    '遷移宮': 'palace-travel',
    '交友宮': 'palace-friends',
    '官祿宮': 'palace-career',  // 修正：使用官祿宮而不是事業宮
    '田宅宮': 'palace-property',
    '福德宮': 'palace-fortune',
    '父母宮': 'palace-parents'
  }
  return colorMap[palaceName] || ''
}

// 點擊宮位
function openPalaceInfo(palaceName) {
  emit('open-palace', palaceName)
}

// 點擊主星
function openStarInfo(starName) {
  emit('open-star', starName)
}

// 檢查是否為主星
function isMainStar(starName) {
  const mainStars = ['紫微', '天機', '太陽', '武曲', '天同', '廉貞', '天府', '太陰', '貪狼', '巨門', '天相', '天梁', '七殺', '破軍']
  return mainStars.includes(starName)
}

// 格式化星曜顯示
function formatStarDisplay(star, branch, yearStem) {
  let display = star.name
  const brightness = getStarBrightness(star.name, branch)
  if (brightness) {
    display += `[${brightness}]`
  }
  if (star.sihua) {
    if (star.yearSihua) {
      display += `[生年${star.sihua}]`
    }
    if (star.direction) {
      display += `[${star.direction}${star.sihua}]`
    } else {
      display += `[${star.sihua}]`
    }
  }
  return display
}

// 獲取排盤後的宮位數據
const palaceData = computed(() => {
  if (props.ziweiChart && props.ziweiChart.palaces) {
    console.log('ZiweiChart palaceData:', props.ziweiChart.palaces)
    console.log('palaceData length:', props.ziweiChart.palaces.length)
    if (props.ziweiChart.palaces.length > 0) {
      console.log('第一個宮位:', props.ziweiChart.palaces[0])
    }
    return props.ziweiChart.palaces
  }
  // 如果沒有排盤結果，返回空數組（將顯示提示信息）
  console.warn('ZiweiChart: 沒有排盤數據', props.ziweiChart)
  return []
})

// 宮位順序（用於顯示）
const PALACE_ORDER = ['命宮', '兄弟宮', '夫妻宮', '子女宮', '財帛宮', '疾厄宮', 
                      '遷移宮', '交友宮', '官祿宮', '田宅宮', '福德宮', '父母宮']

// 根據宮位名稱獲取數據
function getPalaceData(palaceName) {
  return palaceData.value.find(p => p.name === palaceName) || null
}

// 按照參考代碼的顯示順序排列宮位
// 參考代碼中：Place12[i] 的 i 是地支索引（0=子, 1=丑, ..., 11=亥）
// 顯示順序：zw6(巳=5),zw7(午=6),zw8(未=7),zw9(申=8),zw5(辰=4),中心,zw10(酉=9),zw4(卯=3),zw11(戌=10),zw3(寅=2),zw2(丑=1),zw1(子=0),zw12(亥=11)
// palaceData 現在是按地支索引的數組（place12），所以可以直接通過索引訪問
function getPalacesByDisplayOrder() {
  if (!props.ziweiChart || !props.ziweiChart.palaces || !Array.isArray(palaceData.value)) {
    console.warn('getPalacesByDisplayOrder: 數據不完整', {
      hasZiweiChart: !!props.ziweiChart,
      hasPalaces: !!(props.ziweiChart && props.ziweiChart.palaces),
      isArray: Array.isArray(palaceData.value),
      palaceDataLength: palaceData.value?.length
    })
    return []
  }
  
  // 參考代碼的顯示順序（根據 HTML 結構）：
  // zw6,zw7,zw8,zw9 (第一行)
  // zw5,zwHome,zw10,zw4,zw11 (第二行，但實際上是：zw5,中心,zw10,zw4,zw11)
  // zw3,zw2,zw1,zw12 (第三行)
  // 對應地支索引：5,6,7,8,4,9,3,10,2,1,0,11
  // 顯示順序的地支索引（對應 zw6,zw7,zw8,zw9,zw5,zw10,zw4,zw11,zw3,zw2,zw1,zw12）
  const displayOrder = [5, 6, 7, 8, 4, 9, 3, 10, 2, 1, 0, 11]
  
  // 根據地支索引直接訪問對應的宮位數據
  // palaceData.value[i] 對應地支索引 i（0=子, 1=丑, ..., 11=亥）
  const result = []
  for (const branchIndex of displayOrder) {
    if (palaceData.value[branchIndex]) {
      result.push(palaceData.value[branchIndex])
    } else {
      console.warn(`getPalacesByDisplayOrder: 找不到地支索引 ${branchIndex} 的宮位`)
      // 如果找不到，創建一個空宮位（不應該發生，但作為安全措施）
      const BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
      result.push({
        name: '',
        heavenlyStem: '',
        earthlyBranch: BRANCHES[branchIndex],
        mainStars: [],
        assistantStars: [],
        shaStars: [],
        minorStars: [],
        isMingGong: false,
        isShenGong: false
      })
    }
  }
  
  console.log('getPalacesByDisplayOrder 結果:', result.length, '個宮位')
  return result
}

// 獲取年干
function getYearStem(year) {
  const stems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
  return stems[(year - 4) % 10] || '甲'
}

// 獲取宮位樣式（不再使用內聯樣式，改用 class）
function getPalaceStyle(palaceName) {
  return {}
}

// 從星曜文字中提取主星名稱（處理 [旺] 等標記）
// 注意：此函數目前未使用，因為模板中直接使用星曜名稱
// 保留以備將來需要處理帶標記的星曜名稱時使用
function extractStarName(starText) {
  // 移除 [旺]、[廟] 等標記
  return starText.replace(/\[.*?\]/g, '').trim()
}
</script>

<style scoped>
.ziwei-chart {
  max-width: 1200px;
  margin: 0 auto;
}

.palace-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, auto);
  gap: 0;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  border: 3px solid hsl(var(--border));
  border-radius: 0.5rem;
  padding: 0;
  background: hsl(var(--border));
  overflow: hidden;
}

/* 使用 nth-child 包含所有子元素 */
.palace-grid > :nth-child(1) { grid-column: 1; grid-row: 1; }
.palace-grid > :nth-child(2) { grid-column: 2; grid-row: 1; }
.palace-grid > :nth-child(3) { grid-column: 3; grid-row: 1; }
.palace-grid > :nth-child(4) { grid-column: 4; grid-row: 1; }
.palace-grid > :nth-child(5) { grid-column: 1; grid-row: 2; }
.palace-grid > :nth-child(6) { grid-column: 2 / span 2; grid-row: 2 / span 2; } /* 中央區域 */
.palace-grid > :nth-child(7) { grid-column: 4; grid-row: 2; }
.palace-grid > :nth-child(8) { grid-column: 1; grid-row: 3; }
.palace-grid > :nth-child(9) { grid-column: 2; grid-row: 3; visibility: hidden; } /* spacer */
.palace-grid > :nth-child(10) { grid-column: 3; grid-row: 3; visibility: hidden; } /* spacer */
.palace-grid > :nth-child(11) { grid-column: 4; grid-row: 3; }
.palace-grid > :nth-child(12) { grid-column: 1; grid-row: 4; }
.palace-grid > :nth-child(13) { grid-column: 2; grid-row: 4; }
.palace-grid > :nth-child(14) { grid-column: 3; grid-row: 4; }
.palace-grid > :nth-child(15) { grid-column: 4; grid-row: 4; }

:deep(.palace-card) {
  min-height: 200px;
  border: 2px solid hsl(var(--border)) !important;
  border-radius: 0 !important;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  transition: all 0.2s ease !important;
  position: relative;
  overflow: hidden;
  background: hsl(var(--card)) !important;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  margin: -1px 0 0 -1px;
}

/* 覆蓋 Card 組件的內聯樣式 */
:deep(.palace-card[style*="border-color"]) {
  border: 2px solid hsl(var(--border)) !important;
}

/* 第一行和第一列的卡片不需要負邊距 */
.palace-grid > .palace-card:nth-child(1),
.palace-grid > .palace-card:nth-child(5),
.palace-grid > .palace-card:nth-child(8),
.palace-grid > .palace-card:nth-child(12) {
  margin-left: 0;
}

.palace-grid > .palace-card:nth-child(1),
.palace-grid > .palace-card:nth-child(2),
.palace-grid > .palace-card:nth-child(3),
.palace-grid > .palace-card:nth-child(4) {
  margin-top: 0;
}

:deep(.palace-card:hover) {
  transform: none !important;
  border: 3px solid hsl(var(--primary)) !important;
  border-color: hsl(var(--primary)) !important;
  border-width: 3px !important;
  border-style: solid !important;
  box-shadow: inset 0 0 0 2px hsl(var(--primary)), 0 0 0 3px hsla(var(--primary), 0.4) !important;
  z-index: 10;
  background: linear-gradient(135deg, hsla(var(--primary), 0.15), hsl(var(--card))) !important;
}

.palace-card.cursor-pointer {
  cursor: pointer;
}

.info-hint {
  font-size: 0.75rem;
}

:deep(.life-palace) {
  border: 2px solid hsl(var(--primary)) !important;
  background: linear-gradient(135deg, hsla(var(--primary), 0.15), hsl(var(--card))) !important;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05), 0 0 0 2px hsla(var(--primary), 0.3) !important;
}

/* 身宮標記 - 使用藍色邊框（參考圖片中的藍色框線） */
:deep(.shen-palace) {
  border: 2px solid #3b82f6 !important;
  box-shadow: inset 0 0 0 1px rgba(59, 130, 246, 0.2), 0 0 10px 2px rgba(59, 130, 246, 0.4) !important;
}

/* 命宮和身宮同時存在時，使用命宮的紅色邊框 */
:deep(.life-palace.shen-palace) {
  border: 2px solid hsl(var(--primary)) !important;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05),
              0 0 10px 2px hsla(var(--primary), 0.4),
              0 0 20px 4px rgba(59, 130, 246, 0.3) !important;
}

:deep(.life-palace:hover) {
  border: 3px solid hsl(var(--primary)) !important;
  border-color: hsl(var(--primary)) !important;
  border-width: 3px !important;
  border-style: solid !important;
  box-shadow: inset 0 0 0 2px hsl(var(--primary)), 0 0 0 3px hsla(var(--primary), 0.4) !important;
  background: linear-gradient(135deg, hsla(var(--primary), 0.2), hsl(var(--card))) !important;
}

:deep(.shen-palace:hover) {
  border: 3px solid #3b82f6 !important;
  box-shadow: inset 0 0 0 2px #3b82f6, 0 0 12px 3px rgba(59, 130, 246, 0.5) !important;
}

/* 這些樣式現在在 PalaceContent.vue 中定義 */

.sihua {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.125rem 0.375rem;
}

.sihua-lu {
  background-color: #fbbf24;
  color: #78350f;
}

.palace-center {
  grid-column: span 2;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  border: 2px solid hsl(var(--border)) !important;
  border-radius: 0 !important;
  background: hsl(var(--muted)) !important;
  padding: 1rem;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  margin: -1px 0 0 -1px;
}

.center-content {
  text-align: center;
}

.center-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: hsl(var(--card-foreground));
  margin-bottom: 0.5rem;
}

.center-info {
  color: hsl(var(--muted-foreground));
  margin-bottom: 0.75rem;
}

.center-meta {
  font-size: 0.7rem;
  color: hsl(var(--muted-foreground));
  text-align: left;
  padding: 0.5rem;
  background: hsl(var(--secondary));
  border-radius: 0.25rem;
}

.meta-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
}

.meta-label {
  color: hsl(var(--muted-foreground));
  font-weight: 500;
}

.meta-value {
  color: hsl(var(--card-foreground));
  font-weight: 600;
}

.palace-details {
  margin-top: 0.5rem;
  font-size: 0.65rem;
  width: 100%;
  text-align: left;
  padding-top: 0.5rem;
  border-top: 1px solid #e5e7eb;
}

.detail-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.2rem;
}

.detail-label {
  color: hsl(var(--muted-foreground));
  font-weight: 500;
}

.detail-value {
  color: hsl(var(--card-foreground));
  font-weight: 500;
}

/* 移除宮位特殊顏色，所有宮位使用統一樣式 */
/* 特殊標記只保留在 life-palace 和 shen-palace 上 */
</style>

