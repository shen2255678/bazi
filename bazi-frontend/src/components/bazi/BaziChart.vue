<template>
  <Card>
    <CardHeader>
      <CardTitle class="text-center text-2xl">八字命盤</CardTitle>
    </CardHeader>
    <CardContent>

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
      <Card class="mt-8">
        <CardHeader>
          <CardTitle>五行分布圖</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="wuxing-bars space-y-3">
            <div
              v-for="item in wuxingRanking"
              :key="item.element"
              class="wuxing-bar-container"
            >
              <div class="flex items-center justify-between mb-1">
                <span class="wuxing-name font-medium">{{ item.element }}</span>
                <span class="wuxing-stats text-sm text-muted-foreground">
                  {{ item.count.toFixed(1) }} ({{ item.percentage }}%)
                </span>
              </div>
              <div class="wuxing-bar-track bg-muted rounded-full h-6 overflow-hidden">
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
        </CardContent>
      </Card>

      <!-- 日主分析卡片 -->
      <Card class="mt-8">
        <CardHeader>
          <CardTitle>日主分析</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <span class="text-muted-foreground">日干：</span>
              <span class="font-bold text-lg" :style="{ color: getWuxingColor(wuxingAnalysis.dayMaster.wuxing) }">
                {{ wuxingAnalysis.dayMaster.stem }}
              </span>
            </div>
            <div>
              <span class="text-muted-foreground">五行：</span>
              <span class="font-bold" :style="{ color: getWuxingColor(wuxingAnalysis.dayMaster.wuxing) }">
                {{ wuxingAnalysis.dayMaster.wuxing }}
              </span>
            </div>
            <div>
              <span class="text-muted-foreground">強弱：</span>
              <span class="font-bold text-foreground">{{ wuxingAnalysis.dayMaster.strength }}</span>
            </div>
            <div>
              <span class="text-muted-foreground">數量：</span>
              <span class="font-bold text-foreground">{{ wuxingAnalysis.dayMaster.count.toFixed(1) }}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- 用神喜忌 -->
      <div class="yongshen-analysis mt-6 grid grid-cols-3 gap-4">
        <Card class="border-2" style="border-color: hsl(var(--primary));">
          <CardContent class="p-4 text-center">
            <div class="text-sm text-muted-foreground mb-1">用神</div>
            <div class="text-2xl font-bold" style="color: hsl(var(--primary));">{{ wuxingAnalysis.yongshen }}</div>
          </CardContent>
        </Card>
        <Card class="border-2" style="border-color: hsl(var(--primary) / 0.7);">
          <CardContent class="p-4 text-center">
            <div class="text-sm text-muted-foreground mb-1">喜神</div>
            <div class="text-2xl font-bold" style="color: hsl(var(--primary) / 0.8);">{{ wuxingAnalysis.xishen }}</div>
          </CardContent>
        </Card>
        <Card class="border-2" style="border-color: hsl(var(--muted-foreground));">
          <CardContent class="p-4 text-center">
            <div class="text-sm text-muted-foreground mb-1">忌神</div>
            <div class="text-2xl font-bold text-muted-foreground">{{ wuxingAnalysis.jishen }}</div>
          </CardContent>
        </Card>
      </div>
    </CardContent>
  </Card>
</template>

<script setup>
import { computed } from 'vue'
import { getNayin, getStemWuxing, getBranchWuxing, getHiddenStems } from '../../utils/calculators/wuxing.js'
import { WUXING_COLORS } from '../../utils/constants.js'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

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
  if (!colorObj) return '#gray'
  // 如果 hex 是 HSL 格式，轉換為實際顏色值
  if (colorObj.hex && colorObj.hex.startsWith('hsl')) {
    // 暫時返回一個默認值，實際應該解析 HSL
    return '#gray'
  }
  return colorObj.hex || colorObj || '#gray'
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
  background: hsl(var(--card));
  border: 2px solid hsl(var(--border));
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
  border-color: hsl(var(--primary));
  background: linear-gradient(to bottom, hsl(var(--primary) / 0.1), hsl(var(--card)));
  box-shadow: 0 0 0 2px hsl(var(--primary) / 0.2);
}

.pillar-header {
  text-align: center;
  font-weight: bold;
  color: hsl(var(--card-foreground));
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
  box-shadow: 0 0 0 3px hsl(var(--primary) / 0.3), 0 0 0 5px hsl(var(--card));
}

.nayin-label {
  text-align: center;
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
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
  color: hsl(var(--muted-foreground));
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
  background: hsl(var(--card));
  border-radius: 0.5rem;
  padding: 1.5rem;
}

.wuxing-bar-container {
  margin-bottom: 1rem;
}

.wuxing-name {
  color: hsl(var(--foreground));
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
