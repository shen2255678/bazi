<template>
  <Card v-if="shishenAnalysis">
    <CardHeader>
      <CardTitle>🔮 十神分析</CardTitle>
      <CardDescription>{{ shishenAnalysis.summary }}</CardDescription>
    </CardHeader>
    <CardContent>
      <!-- 十神統計 -->
      <div class="shishen-stats mb-6">
        <h3 class="text-sm font-semibold text-foreground mb-3">天干十神分布</h3>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div
            v-for="(count, shishenName) in shishenAnalysis.count"
            :key="shishenName"
            class="stat-card"
            :class="{ 'stat-card-highlight': shishenName === shishenAnalysis.dominant }"
          >
            <div class="stat-name">{{ shishenName }}</div>
            <div class="stat-count">{{ count }}</div>
          </div>
        </div>
      </div>

      <!-- 主要十神詳細資訊 -->
      <div v-if="dominantShishenInfo" class="shishen-detail p-4 bg-muted rounded-lg border border-border">
        <h3 class="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <span class="text-primary">★</span>
          主要十神：{{ dominantShishenInfo.name }}
        </h3>

        <div class="space-y-3 text-sm">
          <div>
            <span class="text-muted-foreground">類型：</span>
            <span class="font-medium text-foreground">{{ dominantShishenInfo.type }}</span>
          </div>

          <div>
            <span class="text-muted-foreground">含義：</span>
            <span class="text-foreground">{{ dominantShishenInfo.meaning }}</span>
          </div>

          <div>
            <span class="text-muted-foreground">正面特質：</span>
            <div class="mt-1 flex flex-wrap gap-2">
              <span
                v-for="trait in dominantShishenInfo.positive"
                :key="trait"
                class="trait-tag trait-positive"
              >
                {{ trait }}
              </span>
            </div>
          </div>

          <div>
            <span class="text-muted-foreground">負面特質：</span>
            <div class="mt-1 flex flex-wrap gap-2">
              <span
                v-for="trait in dominantShishenInfo.negative"
                :key="trait"
                class="trait-tag trait-negative"
              >
                {{ trait }}
              </span>
            </div>
          </div>

          <div class="pt-2 border-t border-border">
            <div class="mb-2">
              <span class="text-muted-foreground">事業：</span>
              <span class="text-foreground">{{ dominantShishenInfo.career }}</span>
            </div>
            <div class="mb-2">
              <span class="text-muted-foreground">財運：</span>
              <span class="text-foreground">{{ dominantShishenInfo.wealth }}</span>
            </div>
            <div>
              <span class="text-muted-foreground">感情：</span>
              <span class="text-foreground">{{ dominantShishenInfo.relationship }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 說明文字 -->
      <div class="mt-6 p-4 bg-muted rounded-lg">
        <p class="text-xs text-muted-foreground">
          💡 <strong>十神說明：</strong>十神是根據日主與其他天干的陰陽五行關係得出，代表不同的人事物與性格特質。命格中某一十神較多時，通常會有該十神的特質表現。
        </p>
      </div>
    </CardContent>
  </Card>
</template>

<script setup>
import { computed } from 'vue'
import { getShishenInfo } from '../../utils/calculators/shishen.js'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

const props = defineProps({
  shishenAnalysis: {
    type: Object,
    default: null
  }
})

// 獲取主要十神的詳細資訊
const dominantShishenInfo = computed(() => {
  if (!props.shishenAnalysis?.dominant) return null
  return getShishenInfo(props.shishenAnalysis.dominant)
})
</script>

<style scoped>
.stat-card {
  background: hsl(var(--card));
  border: 2px solid hsl(var(--border));
  border-radius: 0.5rem;
  padding: 0.75rem;
  text-align: center;
  transition: all 0.2s;
}

.stat-card:hover {
  border-color: hsl(var(--primary) / 0.5);
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 0.1);
}

.stat-card-highlight {
  border-color: hsl(var(--primary));
  background: hsl(var(--primary) / 0.05);
}

.stat-name {
  font-size: 0.75rem;
  color: hsl(var(--muted-foreground));
  margin-bottom: 0.25rem;
  font-weight: 500;
}

.stat-count {
  font-size: 1.5rem;
  font-weight: bold;
  color: hsl(var(--primary));
}

.trait-tag {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.trait-positive {
  background: hsl(var(--primary) / 0.1);
  color: hsl(var(--primary));
  border: 1px solid hsl(var(--primary) / 0.3);
}

.trait-negative {
  background: hsl(var(--muted));
  color: hsl(var(--muted-foreground));
  border: 1px solid hsl(var(--border));
}
</style>
