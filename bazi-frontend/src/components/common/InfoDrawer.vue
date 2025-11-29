<template>
  <!-- Drawer 側邊欄（不使用 Teleport，直接放在右側區域） -->
  <div
    v-if="isOpen"
    class="drawer-container h-full w-full bg-card shadow-lg overflow-y-auto flex flex-col"
  >
    <!-- 標題欄 -->
    <div class="drawer-header bg-card border-b border-border p-4 sticky top-0 z-10">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-foreground">{{ title }}</h3>
        <button
          @click="close"
          class="text-muted-foreground hover:text-foreground transition-colors p-1 rounded hover:bg-accent"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- 內容區 -->
    <div class="drawer-content flex-1 overflow-y-auto p-6 text-foreground">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '詳細說明'
  }
})

const emit = defineEmits(['close'])

function close() {
  emit('close')
}

// 監聽 ESC 鍵關閉
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        close()
      }
    }
    document.addEventListener('keydown', handleEsc)
    return () => {
      document.removeEventListener('keydown', handleEsc)
    }
  }
})
</script>

<style scoped>
.drawer-container {
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>

