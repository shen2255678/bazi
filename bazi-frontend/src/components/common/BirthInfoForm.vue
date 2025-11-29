<template>
  <Card>
    <CardHeader>
      <CardTitle>📅 出生資料</CardTitle>
    </CardHeader>
    <CardContent>

    <!-- 性別選擇 -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-foreground mb-2">性別</label>
      <div class="flex gap-4">
        <label class="flex items-center cursor-pointer">
          <input
            :checked="modelValue.gender === 'male'"
            type="radio"
            name="gender"
            value="male"
            class="mr-2 w-4 h-4 focus:ring-2"
            style="accent-color: hsl(258.3, 89.5%, 66.3%);"
            @change="updateGender('male')"
          >
          <span class="text-sm text-foreground">👨 男性</span>
        </label>
        <label class="flex items-center cursor-pointer">
          <input
            :checked="modelValue.gender === 'female'"
            type="radio"
            name="gender"
            value="female"
            class="mr-2 w-4 h-4 focus:ring-2"
            style="accent-color: hsl(var(--primary));"
            @change="updateGender('female')"
          >
          <span class="text-sm text-foreground">👩 女性</span>
        </label>
      </div>
      <p class="text-xs text-muted-foreground mt-1">* 性別影響大運起運方向（男女順逆不同）</p>
    </div>

    <!-- 出生日期 -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-foreground mb-2">出生日期（國曆）</label>
      <input
        :value="dateString"
        type="date"
        min="1900-01-01"
        max="2100-12-31"
        class="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
        @change="updateDateFromString($event.target.value)"
        @input="updateDateFromString($event.target.value)"
      />
    </div>

    <!-- 出生時間 -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-foreground mb-2">出生時間（精確到分鐘）</label>
      <input
        :value="timeString"
        type="time"
        class="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
        @change="updateTimeFromString($event.target.value)"
        @input="updateTimeFromString($event.target.value)"
      />
    </div>

      <!-- 當前時辰提示 -->
      <div v-if="currentShichen" class="mt-2 p-3 bg-muted rounded-md border border-border">
        <p class="text-sm">
          <span class="text-muted-foreground">當前對應時辰：</span>
          <span class="font-bold text-primary">{{ currentShichen.name }}</span>
          <span class="text-xs text-muted-foreground ml-2">({{ currentShichen.display }})</span>
        </p>
      </div>
    </CardContent>
  </Card>
</template>

<script setup>
import { computed } from 'vue'
import { getShichenByTime } from '../../utils/solarTime.js'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

// 當前時辰
const currentShichen = computed(() => {
  if (!props.modelValue.birthDate.hour) return null
  return getShichenByTime(props.modelValue.birthDate.hour, props.modelValue.birthDate.minute || 0)
})

// 日期字串（用於 date input）
const dateString = computed(() => {
  const { year, month, day } = props.modelValue.birthDate
  if (!year || !month || !day) return ''
  // 格式化為 YYYY-MM-DD
  const formattedMonth = String(month).padStart(2, '0')
  const formattedDay = String(day).padStart(2, '0')
  return `${year}-${formattedMonth}-${formattedDay}`
})

// 時間字串（用於 time input）
const timeString = computed(() => {
  const { hour, minute } = props.modelValue.birthDate
  if (hour === undefined || hour === null || minute === undefined || minute === null) return ''
  // 格式化為 HH:mm
  const formattedHour = String(hour).padStart(2, '0')
  const formattedMinute = String(minute).padStart(2, '0')
  return `${formattedHour}:${formattedMinute}`
})

function updateGender(value) {
  emit('update:modelValue', {
    ...props.modelValue,
    gender: value
  })
}

// 從日期字串更新（YYYY-MM-DD）
function updateDateFromString(dateStr) {
  if (!dateStr) return
  const [year, month, day] = dateStr.split('-').map(Number)
  emit('update:modelValue', {
    ...props.modelValue,
    birthDate: {
      ...props.modelValue.birthDate,
      year,
      month,
      day
    }
  })
}

// 從時間字串更新（HH:mm）
function updateTimeFromString(timeStr) {
  if (!timeStr) return
  const [hour, minute] = timeStr.split(':').map(Number)
  emit('update:modelValue', {
    ...props.modelValue,
    birthDate: {
      ...props.modelValue.birthDate,
      hour: hour || 0,
      minute: minute || 0
    }
  })
}

function updateBirthDate(field, value) {
  const numValue = parseInt(value) || 0
  emit('update:modelValue', {
    ...props.modelValue,
    birthDate: {
      ...props.modelValue.birthDate,
      [field]: numValue
    }
  })
}
</script>
