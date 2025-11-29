<template>
  <div class="bazi-chart bg-white rounded-lg shadow-lg p-6">
    <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">八字命盤</h2>

    <!-- 四柱表格 -->
    <div class="pillars-grid grid grid-cols-4 gap-4 mb-8">
      <!-- 年柱 -->
      <div class="pillar-card">
        <div class="pillar-header">年柱</div>
        <div class="ganzhi-display">
          <div class="stem" :style="{ 
            backgroundColor: getWuxingColor(getStemWuxing(pillars.year.stem)),
            color: getTextColor(getWuxingColor(getStemWuxing(pillars.year.stem)))
          }">
            {{ pillars.year.stem }}
          </div>
          <div class="branch" :style="{ 
            backgroundColor: getWuxingColor(getBranchWuxing(pillars.year.branch)),
            color: getTextColor(getWuxingColor(getBranchWuxing(pillars.year.branch)))
          }">
            {{ pillars.year.branch }}
          </div>
        </div>
        <div class="nayin-label">{{ getNayin(pillars.year.ganzhi) }}</div>
        <div class="hidden-stems">
          <div class="hidden-stem-label">藏干</div>
          <div class="hidden-stem-list">
            <span
              v-for="(stem, index) in getHiddenStems(pillars.year.branch)"
              :key="index"
              class="hidden-stem-item"
              :style="{ 
                backgroundColor: getWuxingColor(getStemWuxing(stem.stem)),
                color: getTextColor(getWuxingColor(getStemWuxing(stem.stem)))
              }"
            >
              {{ stem.stem }}
            </span>
          </div>
        </div>
      </div>

      <!-- 月柱 -->
      <div class="pillar-card">
        <div class="pillar-header">月柱</div>
        <div class="ganzhi-display">
          <div class="stem" :style="{ 
            backgroundColor: getWuxingColor(getStemWuxing(pillars.month.stem)),
            color: getTextColor(getWuxingColor(getStemWuxing(pillars.month.stem)))
          }">
            {{ pillars.month.stem }}
          </div>
          <div class="branch" :style="{ 
            backgroundColor: getWuxingColor(getBranchWuxing(pillars.month.branch)),
            color: getTextColor(getWuxingColor(getBranchWuxing(pillars.month.branch)))
          }">
            {{ pillars.month.branch }}
          </div>
        </div>
        <div class="nayin-label">{{ getNayin(pillars.month.ganzhi) }}</div>
        <div class="hidden-stems">
          <div class="hidden-stem-label">藏干</div>
          <div class="hidden-stem-list">
            <span
              v-for="(stem, index) in getHiddenStems(pillars.month.branch)"
              :key="index"
              class="hidden-stem-item"
              :style="{ 
                backgroundColor: getWuxingColor(getStemWuxing(stem.stem)),
                color: getTextColor(getWuxingColor(getStemWuxing(stem.stem)))
              }"
            >
              {{ stem.stem }}
            </span>
          </div>
        </div>
      </div>

      <!-- 日柱 ★ -->
      <div class="pillar-card day-pillar">
        <div class="pillar-header">日柱 ★</div>
        <div class="ganzhi-display">
          <div class="stem day-master" :style="{ 
            backgroundColor: getWuxingColor(getStemWuxing(pillars.day.stem)),
            color: getTextColor(getWuxingColor(getStemWuxing(pillars.day.stem)))
          }">
            {{ pillars.day.stem }}
          </div>
          <div class="branch" :style="{ 
            backgroundColor: getWuxingColor(getBranchWuxing(pillars.day.branch)),
            color: getTextColor(getWuxingColor(getBranchWuxing(pillars.day.branch)))
          }">
            {{ pillars.day.branch }}
          </div>
        </div>
        <div class="nayin-label">{{ getNayin(pillars.day.ganzhi) }}</div>
        <div class="hidden-stems">
          <div class="hidden-stem-label">藏干</div>
          <div class="hidden-stem-list">
            <span
              v-for="(stem, index) in getHiddenStems(pillars.day.branch)"
              :key="index"
              class="hidden-stem-item"
              :style="{ 
                backgroundColor: getWuxingColor(getStemWuxing(stem.stem)),
                color: getTextColor(getWuxingColor(getStemWuxing(stem.stem)))
              }"
            >
              {{ stem.stem }}
            </span>
          </div>
        </div>
      </div>

      <!-- 時柱 -->
      <div class="pillar-card">
        <div class="pillar-header">時柱</div>
        <div class="ganzhi-display">
          <div class="stem" :style="{ 
            backgroundColor: getWuxingColor(getStemWuxing(pillars.hour.stem)),
            color: getTextColor(getWuxingColor(getStemWuxing(pillars.hour.stem)))
          }">
            {{ pillars.hour.stem }}
          </div>
          <div class="branch" :style="{ 
            backgroundColor: getWuxingColor(getBranchWuxing(pillars.hour.branch)),
            color: getTextColor(getWuxingColor(getBranchWuxing(pillars.hour.branch)))
          }">
            {{ pillars.hour.branch }}
          </div>
        </div>
        <div class="nayin-label">{{ getNayin(pillars.hour.ganzhi) }}</div>
        <div class="hidden-stems">
          <div class="hidden-stem-label">藏干</div>
          <div class="hidden-stem-list">
            <span
              v-for="(stem, index) in getHiddenStems(pillars.hour.branch)"
              :key="index"
              class="hidden-stem-item"
              :style="{ 
                backgroundColor: getWuxingColor(getStemWuxing(stem.stem)),
                color: getTextColor(getWuxingColor(getStemWuxing(stem.stem)))
              }"
            >
              {{ stem.stem }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 五行分布視覺化 -->
    <div class="wuxing-visualization mt-8">
      <h3 class="text-xl font-semibold mb-4 text-gray-700">五行分布圖</h3>
      <div class="wuxing-bars space-y-3">
        <div
          v-for="item in wuxingRanking"
          :key="item.element"
          class="wuxing-bar-container"
        >
          <div class="flex items-center justify-between mb-1">
            <span class="wuxing-name font-medium">{{ item.element }}</span>
            <span class="wuxing-stats text-sm text-gray-600">
              {{ item.count.toFixed(1) }} ({{ item.percentage }}%)
            </span>
          </div>
          <div class="wuxing-bar-track bg-gray-200 rounded-full h-6 overflow-hidden">
            <div
              class="wuxing-bar-fill h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2"
              :style="{
                width: `${item.percentage}%`,
                backgroundColor: getWuxingColor(item.element),
                color: getTextColor(getWuxingColor(item.element))
              }"
            >
              <span class="text-xs font-semibold" :style="{ color: getTextColor(getWuxingColor(item.element)) }">
                {{ translateLevel(item.level) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 日主分析卡片 -->
    <div class="day-master-analysis mt-8 p-4 bg-linear-to-r from-amber-50 to-yellow-50 rounded-lg border-2 border-amber-200">
      <h3 class="text-lg font-semibold mb-3 text-amber-800">日主分析</h3>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <span class="text-gray-600">日干：</span>
          <span class="font-bold text-lg" :style="{ color: getWuxingColor(wuxingAnalysis.dayMaster.wuxing) }">
            {{ wuxingAnalysis.dayMaster.stem }}
          </span>
        </div>
        <div>
          <span class="text-gray-600">五行：</span>
          <span class="font-bold" :style="{ color: getWuxingColor(wuxingAnalysis.dayMaster.wuxing) }">
            {{ wuxingAnalysis.dayMaster.wuxing }}
          </span>
        </div>
        <div>
          <span class="text-gray-600">強弱：</span>
          <span class="font-bold">{{ wuxingAnalysis.dayMaster.strength }}</span>
        </div>
        <div>
          <span class="text-gray-600">數量：</span>
          <span class="font-bold">{{ wuxingAnalysis.dayMaster.count.toFixed(1) }}</span>
        </div>
      </div>
    </div>

    <!-- 用神喜忌 -->
    <div class="yongshen-analysis mt-6 grid grid-cols-3 gap-4">
      <div class="yongshen-card bg-green-50 border-2 border-green-300 rounded-lg p-4">
        <div class="text-sm text-gray-600 mb-1">用神</div>
        <div class="text-2xl font-bold text-green-700">{{ wuxingAnalysis.yongshen }}</div>
      </div>
      <div class="yongshen-card bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
        <div class="text-sm text-gray-600 mb-1">喜神</div>
        <div class="text-2xl font-bold text-blue-700">{{ wuxingAnalysis.xishen }}</div>
      </div>
      <div class="yongshen-card bg-red-50 border-2 border-red-300 rounded-lg p-4">
        <div class="text-sm text-gray-600 mb-1">忌神</div>
        <div class="text-2xl font-bold text-red-700">{{ wuxingAnalysis.jishen }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getNayin, getStemWuxing, getBranchWuxing, getHiddenStems } from '../../utils/calculators/wuxing.js'
import { WUXING_COLORS } from '../../utils/constants.js'

const props = defineProps({
  pillars: {
    type: Object,
    required: true
  },
  wuxingAnalysis: {
    type: Object,
    required: true
  }
})

// 五行排序（用於視覺化展示）
const wuxingRanking = computed(() => {
  return props.wuxingAnalysis.ranking || []
})

// 獲取五行顏色（返回 hex 值）
function getWuxingColor(wuxing) {
  const colorObj = WUXING_COLORS[wuxing]
  return colorObj?.hex || colorObj || '#gray'
}

// 判斷顏色亮度，決定使用白色還是黑色文字
function getTextColor(backgroundColor) {
  if (!backgroundColor) return 'white'
  
  // 如果是 hex 顏色，轉換為 RGB
  let r, g, b
  if (backgroundColor.startsWith('#')) {
    const hex = backgroundColor.replace('#', '')
    r = parseInt(hex.substring(0, 2), 16)
    g = parseInt(hex.substring(2, 4), 16)
    b = parseInt(hex.substring(4, 6), 16)
  } else {
    // 如果是 rgb 格式
    const match = backgroundColor.match(/\d+/g)
    if (match && match.length >= 3) {
      r = parseInt(match[0])
      g = parseInt(match[1])
      b = parseInt(match[2])
    } else {
      return 'white'
    }
  }
  
  // 計算亮度 (使用相對亮度公式)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 128 ? '#1f2937' : 'white' // 淺色背景用深色文字，深色背景用白色文字
}

// 翻譯五行強弱等級
function translateLevel(level) {
  const levelMap = {
    'very_strong': '極強',
    'strong': '強',
    'medium': '中',
    'weak': '弱',
    'very_weak': '極弱'
  }
  return levelMap[level] || level
}
</script>

<style scoped>
.bazi-chart {
  max-width: 1200px;
  margin: 0 auto;
}

.pillar-card {
  background: linear-gradient(to bottom, rgb(249 250 251), white);
  border: 2px solid rgb(209 213 219);
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.pillar-card:hover {
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  transform: translateY(-2px);
}

.day-pillar {
  border-color: rgb(251 191 36);
  background: linear-gradient(to bottom, rgb(255 251 235), rgb(254 249 195));
}

.pillar-header {
  text-align: center;
  font-weight: bold;
  color: rgb(55 65 81);
  margin-bottom: 0.75rem;
  font-size: 1.125rem;
}

.ganzhi-display {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.stem, .branch {
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.875rem;
  font-weight: bold;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.day-master {
  box-shadow: 0 0 0 4px rgb(252 211 77), 0 0 0 6px white;
}

.nayin-label {
  text-align: center;
  font-size: 0.875rem;
  color: rgb(75 85 99);
  margin-bottom: 0.75rem;
  font-weight: 500;
}

.hidden-stems {
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgb(229 231 235);
}

.hidden-stem-label {
  font-size: 0.75rem;
  color: rgb(107 114 128);
  margin-bottom: 0.5rem;
  text-align: center;
}

.hidden-stem-list {
  display: flex;
  justify-content: center;
  gap: 0.25rem;
  flex-wrap: wrap;
}

.hidden-stem-item {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-weight: 600;
}

.wuxing-visualization {
  background: rgb(249 250 251);
  border-radius: 0.5rem;
  padding: 1.5rem;
}

.wuxing-bar-container {
  margin-bottom: 1rem;
}

.wuxing-name {
  color: rgb(55 65 81);
}

.wuxing-bar-track {
  position: relative;
}

.wuxing-bar-fill {
  box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
}

.yongshen-card {
  text-align: center;
  transition: transform 0.2s;
}

.yongshen-card:hover {
  transform: scale(1.05);
}
</style>
