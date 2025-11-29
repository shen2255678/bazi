<template>
  <div v-if="result" class="bazi-result space-y-6">
    <!-- 基本信息卡片 -->
    <Card>
      <CardHeader>
        <CardTitle>👤 命主資料</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid md:grid-cols-2 gap-4 text-sm">
        <div>
          <span class="text-muted-foreground">性別：</span>
          <span class="font-medium text-foreground">{{ result.gender === 'male' ? '男性 👨' : '女性 👩' }}</span>
        </div>
        <div>
          <span class="text-muted-foreground">出生地：</span>
          <span class="font-medium text-foreground">{{ result.location }}</span>
        </div>
        <div>
          <span class="text-muted-foreground">國曆：</span>
          <span class="font-medium text-foreground">
            {{ birthDate.year }}年{{ birthDate.month }}月{{ birthDate.day }}日
            {{ String(birthDate.hour).padStart(2, '0') }}:{{ String(birthDate.minute).padStart(2, '0') }}
          </span>
        </div>
        <div>
          <span class="text-muted-foreground">時辰：</span>
          <span class="font-medium text-foreground">{{ result.shichen }}</span>
        </div>
        <div v-if="result.usedSolarTime && result.solarTimeCorrection" class="md:col-span-2">
          <span class="text-muted-foreground">真太陽時：</span>
          <span class="font-medium text-primary">
            {{ String(result.solarTimeCorrection.solarHour).padStart(2, '0') }}:{{ String(result.solarTimeCorrection.solarMinute).padStart(2, '0') }}
            (修正 {{ result.solarTimeCorrection.correction.totalDiff > 0 ? '+' : '' }}{{ result.solarTimeCorrection.correction.totalDiff }} 分鐘)
          </span>
        </div>
        </div>
      </CardContent>
    </Card>

    <!-- 八字命盤視覺化 -->
    <BaziChart
      :pillars="result.pillars"
      :wuxing-analysis="result.wuxing"
    />
  </div>
</template>

<script setup>
import BaziChart from './BaziChart.vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

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
