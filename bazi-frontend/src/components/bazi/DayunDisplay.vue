<template>
  <Card v-if="dayun">
    <CardHeader>
      <CardTitle>📊 大運排盤</CardTitle>
      <CardDescription>{{ dayun.summary }}</CardDescription>
    </CardHeader>
    <CardContent>
      <!-- 大運資訊摘要 -->
      <div class="dayun-summary mb-6 p-4 bg-muted rounded-lg">
        <div class="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <span class="text-muted-foreground">起運年齡：</span>
            <span class="font-bold text-primary">{{ dayun.startAgeText }}</span>
          </div>
          <div>
            <span class="text-muted-foreground">大運方向：</span>
            <span class="font-bold text-foreground">{{ dayun.directionText }}</span>
          </div>
          <div>
            <span class="text-muted-foreground">每運時長：</span>
            <span class="font-bold text-foreground">10年</span>
          </div>
        </div>
      </div>

      <!-- 大運列表 -->
      <div class="dayun-grid grid grid-cols-2 md:grid-cols-4 gap-3">
        <div
          v-for="dayunItem in dayun.pillars"
          :key="dayunItem.index"
          class="dayun-card"
        >
          <div class="dayun-index">第{{ dayunItem.index }}步</div>
          <div class="dayun-ganzhi">
            <div class="dayun-stem" :style="{
              backgroundColor: getWuxingColor(getStemWuxing(dayunItem.stem)),
              color: getTextColor(getWuxingColor(getStemWuxing(dayunItem.stem)))
            }">
              {{ dayunItem.stem }}
            </div>
            <div class="dayun-branch" :style="{
              backgroundColor: getWuxingColor(getBranchWuxing(dayunItem.branch)),
              color: getTextColor(getWuxingColor(getBranchWuxing(dayunItem.branch)))
            }">
              {{ dayunItem.branch }}
            </div>
          </div>
          <div class="dayun-age-range">{{ dayunItem.ageRange }}</div>
        </div>
      </div>

      <!-- 說明文字 -->
      <div class="mt-6 p-4 bg-muted rounded-lg">
        <p class="text-xs text-muted-foreground">
          💡 <strong>大運說明：</strong>大運每十年一運，影響人生階段性運勢。天干管前五年，地支管後五年。需配合流年分析具體運勢。
        </p>
      </div>
    </CardContent>
  </Card>
</template>

<script setup>
import { getStemWuxing, getBranchWuxing } from '../../utils/calculators/wuxing.js'
import { WUXING_COLORS } from '../../utils/constants.js'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

defineProps({
  dayun: {
    type: Object,
    default: null
  }
})

// 獲取五行顏色
function getWuxingColor(wuxing) {
  const colorObj = WUXING_COLORS[wuxing]
  if (!colorObj) return '#gray'
  return colorObj.hex || colorObj || '#gray'
}

// 判斷文字顏色
function getTextColor(backgroundColor) {
  if (!backgroundColor) return 'white'

  let r, g, b
  if (backgroundColor.startsWith('#')) {
    const hex = backgroundColor.replace('#', '')
    r = parseInt(hex.substring(0, 2), 16)
    g = parseInt(hex.substring(2, 4), 16)
    b = parseInt(hex.substring(4, 6), 16)
  } else {
    return 'white'
  }

  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 128 ? '#1f2937' : 'white'
}
</script>

<style scoped>
.dayun-card {
  background: hsl(var(--card));
  border: 2px solid hsl(var(--border));
  border-radius: 0.5rem;
  padding: 0.75rem;
  transition: all 0.2s;
}

.dayun-card:hover {
  border-color: hsl(var(--primary));
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  transform: translateY(-2px);
}

.dayun-index {
  text-align: center;
  font-size: 0.75rem;
  color: hsl(var(--muted-foreground));
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.dayun-ganzhi {
  display: flex;
  justify-content: center;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.dayun-stem,
.dayun-branch {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: bold;
  border-radius: 0.375rem;
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 0.1);
}

.dayun-age-range {
  text-align: center;
  font-size: 0.75rem;
  color: hsl(var(--foreground));
  font-weight: 600;
}

.dayun-summary {
  border: 1px solid hsl(var(--border));
}
</style>
