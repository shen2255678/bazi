<template>
  <Card>
    <CardContent class="p-4">
      <label class="flex items-start cursor-pointer">
        <input
          :checked="modelValue.useSolarTime"
          type="checkbox"
          class="mt-1 mr-3 w-5 h-5 focus:ring-2 rounded"
          style="accent-color: hsl(var(--primary));"
          @change="toggleSolarTime($event.target.checked)"
        >
        <div class="flex-1">
          <span class="font-medium text-foreground">使用真太陽時修正</span>
          <p class="text-xs text-muted-foreground mt-1">
          由於地球橢圓軌道和經度差異，鐘錶時間與真太陽時存在誤差。<br>
          專業八字排盤建議開啟此選項，以獲得更精確的時辰判斷。
        </p>

          <!-- 修正資訊顯示 -->
          <div v-if="modelValue.useSolarTime && solarTimeInfo" class="mt-3 p-3 bg-muted rounded border border-border">
            <div class="font-mono text-xs space-y-1">
              <div class="text-muted-foreground">
                鐘錶時間：{{ formatTime(birthDate.hour, birthDate.minute) }}
              </div>
              <div class="text-muted-foreground">
                經度修正：{{ solarTimeInfo.correction.longitudeDiff > 0 ? '+' : '' }}{{ solarTimeInfo.correction.longitudeDiff }} 分鐘
              </div>
              <div class="text-muted-foreground">
                均時差修正：{{ solarTimeInfo.correction.equationOfTime > 0 ? '+' : '' }}{{ solarTimeInfo.correction.equationOfTime }} 分鐘
              </div>
              <div class="font-semibold text-primary">
                真太陽時：{{ formatTime(solarTimeInfo.solarHour, solarTimeInfo.solarMinute) }}
                <span v-if="solarTimeInfo.dayAdjusted" class="text-destructive ml-2">⚠️ 跨日</span>
              </div>
            </div>
          </div>
        </div>
      </label>
    </CardContent>
  </Card>
</template>

<script setup>
import { Card, CardContent } from '@/components/ui/card'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  birthDate: {
    type: Object,
    required: true
  },
  solarTimeInfo: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])

function toggleSolarTime(value) {
  emit('update:modelValue', {
    ...props.modelValue,
    useSolarTime: value
  })
}

function formatTime(hour, minute) {
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
}
</script>
