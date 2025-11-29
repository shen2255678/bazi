<template>
  <Card>
    <CardHeader>
      <CardTitle>📍 出生地點</CardTitle>
    </CardHeader>
    <CardContent>

    <!-- 城市選擇 -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-foreground mb-2">選擇城市</label>
      <select
        :value="modelValue.selectedCity"
        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        @change="updateCity($event.target.value)"
      >
        <option 
          v-for="city in cityList" 
          :key="city" 
          :value="city"
        >
          {{ city }}
        </option>
      </select>
    </div>

    <!-- 自訂經度開關 -->
    <div class="flex items-center gap-4 mb-3">
      <label class="flex items-center cursor-pointer">
        <input
          :checked="modelValue.customLocation.enabled"
          type="checkbox"
          class="mr-2 w-4 h-4 focus:ring-2 rounded"
          style="accent-color: hsl(258.3, 89.5%, 66.3%);"
          @change="toggleCustomLocation($event.target.checked)"
        >
        <span class="text-sm text-foreground">自訂經度</span>
      </label>

      <div v-if="modelValue.customLocation.enabled" class="flex gap-2 flex-1">
        <Input
          :value="modelValue.customLocation.lng"
          type="number"
          step="0.0001"
          min="-180"
          max="180"
          placeholder="經度 (例如: 116.4074)"
          class="flex-1 text-sm"
          @input="updateLongitude($event.target.value)"
        />
        <span class="text-xs text-muted-foreground self-center">°E</span>
      </div>
    </div>

      <!-- 當前座標顯示 -->
      <div class="p-3 bg-muted rounded-md border border-border">
        <p class="text-xs text-muted-foreground">
          當前經度：<span class="font-mono font-semibold text-foreground">{{ currentCoordinates.lng.toFixed(4) }}°E</span>
          <span class="text-muted-foreground ml-2">(緯度由城市決定)</span>
        </p>
      </div>
    </CardContent>
  </Card>
</template>

<script setup>
import { computed } from 'vue'
import { CHINA_CITIES, getCityCoordinates } from '../../utils/solarTime.js'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const cityList = computed(() => Object.keys(CHINA_CITIES))

const currentCoordinates = computed(() => {
  if (props.modelValue.customLocation.enabled) {
    const coords = getCityCoordinates(props.modelValue.selectedCity)
    return {
      lng: props.modelValue.customLocation.lng,
      lat: coords?.lat || 39.9042,
      timezone: 'Asia/Shanghai'
    }
  }
  return getCityCoordinates(props.modelValue.selectedCity)
})

function updateCity(city) {
  const coords = getCityCoordinates(city)
  emit('update:modelValue', {
    ...props.modelValue,
    selectedCity: city,
    customLocation: {
      ...props.modelValue.customLocation,
      lng: coords?.lng || 116.4074
    }
  })
}

function toggleCustomLocation(enabled) {
  emit('update:modelValue', {
    ...props.modelValue,
    customLocation: {
      ...props.modelValue.customLocation,
      enabled
    }
  })
}

function updateLongitude(value) {
  const lng = parseFloat(value) || 0
  emit('update:modelValue', {
    ...props.modelValue,
    customLocation: {
      ...props.modelValue.customLocation,
      lng
    }
  })
}

defineExpose({
  currentCoordinates
})
</script>
