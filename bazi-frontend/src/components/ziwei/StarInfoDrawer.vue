<template>
  <InfoDrawer :is-open="isOpen" :title="starInfo?.name || '主星說明'" @close="$emit('close')">
    <div v-if="starInfo" class="space-y-4">
      <!-- 基本資訊 -->
      <div>
        <h4 class="text-xl font-bold text-foreground mb-2">
          {{ starInfo.name }} ({{ starInfo.nameEn }})
        </h4>
        <div class="flex items-center gap-2 mb-2">
          <span class="px-2 py-1 bg-primary text-primary-foreground rounded text-sm">{{ starInfo.type }}</span>
          <span class="px-2 py-1 bg-secondary text-secondary-foreground rounded text-sm">{{ starInfo.element }}行</span>
        </div>
        <p class="text-muted-foreground leading-relaxed">{{ starInfo.description }}</p>
      </div>

      <!-- 性格特質 -->
      <div class="bg-muted p-4 rounded-lg">
        <h5 class="text-foreground font-semibold mb-2">👤 性格特質</h5>
        <p class="text-muted-foreground leading-relaxed">{{ starInfo.personality }}</p>
      </div>

      <!-- 事業運勢 -->
      <div class="bg-muted p-4 rounded-lg">
        <h5 class="text-foreground font-semibold mb-2">💼 事業運勢</h5>
        <p class="text-muted-foreground leading-relaxed">{{ starInfo.career }}</p>
      </div>

      <!-- 財運 -->
      <div class="bg-muted p-4 rounded-lg">
        <h5 class="text-foreground font-semibold mb-2">💰 財運</h5>
        <p class="text-muted-foreground leading-relaxed">{{ starInfo.wealth }}</p>
      </div>

      <!-- 感情運勢 -->
      <div class="bg-muted p-4 rounded-lg">
        <h5 class="text-foreground font-semibold mb-2">💕 感情運勢</h5>
        <p class="text-muted-foreground leading-relaxed">{{ starInfo.relationship }}</p>
      </div>

      <!-- 健康注意 -->
      <div class="bg-muted p-4 rounded-lg">
        <h5 class="text-foreground font-semibold mb-2">🏥 健康注意</h5>
        <p class="text-muted-foreground leading-relaxed">{{ starInfo.health }}</p>
      </div>

      <!-- 廟旺平陷 -->
      <div>
        <h5 class="text-foreground font-semibold mb-2">⭐ 廟旺平陷</h5>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="(brightness, index) in starInfo.brightness"
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

<script setup>
import InfoDrawer from '../common/InfoDrawer.vue'

defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  starInfo: {
    type: Object,
    default: null
  }
})

defineEmits(['close'])

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
</script>


