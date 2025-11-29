<template>
  <InfoDrawer :is-open="isOpen" :title="palaceInfo?.name || '宮位說明'" @close="$emit('close')">
    <div v-if="palaceInfo" class="space-y-4">
      <!-- 基本資訊 -->
      <div>
        <h4 class="text-xl font-bold text-foreground mb-2">{{ palaceInfo.name }} ({{ palaceInfo.nameEn }})</h4>
        <p class="text-muted-foreground leading-relaxed">{{ palaceInfo.description }}</p>
      </div>

      <!-- 詳細說明 -->
      <div class="bg-muted p-4 rounded-lg">
        <h5 class="text-foreground font-semibold mb-2">📖 詳細說明</h5>
        <p class="text-muted-foreground leading-relaxed">{{ palaceInfo.meaning }}</p>
      </div>

      <!-- 關鍵字 -->
      <div>
        <h5 class="text-foreground font-semibold mb-2">🔑 關鍵字</h5>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="keyword in palaceInfo.keywords"
            :key="keyword"
            class="px-3 py-1 bg-muted text-foreground rounded-full text-sm"
          >
            {{ keyword }}
          </span>
        </div>
      </div>

      <!-- 相關宮位 -->
      <div>
        <h5 class="text-foreground font-semibold mb-2">🔗 相關宮位</h5>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="related in palaceInfo.related"
            :key="related"
            class="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm"
          >
            {{ related }}
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
  palaceInfo: {
    type: Object,
    default: null
  }
})

defineEmits(['close'])
</script>


