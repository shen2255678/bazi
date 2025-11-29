<template>
  <div class="discord-layout flex h-screen bg-background text-foreground overflow-hidden">
    <!-- 左側邊欄 -->
    <aside class="sidebar w-60 bg-card flex-shrink-0 flex flex-col border-r border-border">
      <!-- Logo/標題 -->
      <div class="sidebar-header p-4 border-b border-border">
        <h1 class="text-xl font-bold text-foreground">🔮 命理計算機</h1>
        <p class="text-xs text-muted-foreground mt-1">八字 · 紫微斗數</p>
      </div>

      <!-- 導航選單 -->
      <nav class="sidebar-nav flex-1 overflow-y-auto p-2">
        <button
          v-for="item in navItems"
          :key="item.id"
          @click="activeTab = item.id"
          :class="[
            'nav-item w-full text-left px-3 py-2 rounded-md mb-1 transition-colors',
            activeTab === item.id
              ? 'text-primary-foreground'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          ]"
          :style="activeTab === item.id ? 'background-color: hsl(var(--primary)); color: hsl(var(--primary-foreground));' : ''"
        >
          <span class="mr-2">{{ item.icon }}</span>
          {{ item.label }}
        </button>
      </nav>

      <!-- 底部資訊 -->
      <div class="sidebar-footer p-4 border-t border-border text-xs text-muted-foreground">
        <p>版本 1.0.0</p>
      </div>
    </aside>

    <!-- 主內容區 -->
    <main class="main-content flex-1 flex flex-col overflow-hidden">
      <!-- 頂部工具欄 -->
      <header class="toolbar bg-card border-b border-border px-6 py-3 flex items-center justify-between">
        <h2 class="text-lg font-semibold text-foreground">{{ currentTabLabel }}</h2>
        <div class="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            @click="showHelp = !showHelp"
          >
            ❓ 說明
          </Button>
        </div>
      </header>

      <!-- 內容區域（包含中間內容和右側 drawer 空間） -->
      <div class="content-area flex-1 overflow-hidden bg-background flex">
        <!-- 中間內容區域 -->
        <div class="flex-1 overflow-y-auto p-6">
          <div class="max-w-5xl mx-auto">
            <slot :activeTab="activeTab" :setActiveTab="(tab) => activeTab = tab"></slot>
          </div>
        </div>
        
        <!-- 右側 Drawer 區域 -->
        <div class="drawer-slot w-96 flex-shrink-0 border-l border-border bg-card overflow-hidden">
          <slot name="drawer">
            <!-- 默認空狀態 -->
            <div class="h-full flex items-center justify-center p-6">
              <p class="text-sm text-muted-foreground text-center">
                點擊宮位或主星查看詳細說明
              </p>
            </div>
          </slot>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'

const activeTab = ref('bazi')
const showHelp = ref(false)

const navItems = [
  { id: 'bazi', label: '八字排盤', icon: '📊' },
  { id: 'ziwei', label: '紫微命盤', icon: '⭐' },
  { id: 'analysis', label: '命理分析', icon: '🔍' }
]

const currentTabLabel = computed(() => {
  const item = navItems.find(item => item.id === activeTab.value)
  return item?.label || '八字排盤'
})

function setActiveTab(tab) {
  activeTab.value = tab
}

defineExpose({
  activeTab,
  setActiveTab
})
</script>

<style scoped>
/* 滾動條樣式 */
.sidebar-nav::-webkit-scrollbar,
.content-area::-webkit-scrollbar {
  width: 8px;
}

.sidebar-nav::-webkit-scrollbar-track,
.content-area::-webkit-scrollbar-track {
  background: hsl(var(--muted));
}

.sidebar-nav::-webkit-scrollbar-thumb,
.content-area::-webkit-scrollbar-thumb {
  background: hsl(var(--border));
  border-radius: 4px;
}

.sidebar-nav::-webkit-scrollbar-thumb:hover,
.content-area::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--accent));
}
</style>

