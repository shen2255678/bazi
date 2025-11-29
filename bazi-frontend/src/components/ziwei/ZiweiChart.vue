<template>
  <Card>
    <CardHeader>
      <CardTitle class="text-center text-2xl">紫微命盤</CardTitle>
    </CardHeader>
    <CardContent>

    <!-- 傳統方格盤式佈局 -->
    <div class="palace-grid">
      <!-- 第一行：巳、午、未、申 -->
      <Card
        class="palace-card cursor-pointer group"
        :class="getPalaceClass('父母宮')"
        :style="{ borderWidth: '2px', borderStyle: 'solid' }"
        @click="openPalaceInfo('父母宮')"
        :title="'點擊查看 ' + '父母宮' + ' 詳細說明'"
      >
        <div class="palace-branch">巳</div>
        <div class="palace-name flex items-center gap-1">
          父母宮
          <span class="info-hint opacity-0 group-hover:opacity-100 transition-opacity text-xs">ℹ️</span>
        </div>
        <div class="palace-stars">
          <span
            class="star main-star cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all"
            @click.stop="openStarInfo('紫微')"
            :title="'點擊查看 紫微 詳細說明'"
          >紫微</span>
          <span
            class="star main-star cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all"
            @click.stop="openStarInfo('天府')"
            :title="'點擊查看 天府 詳細說明'"
          >天府</span>
        </div>
      </Card>

      <Card
        class="palace-card cursor-pointer group"
        :class="getPalaceClass('福德宮')"
        :style="{ borderWidth: '2px', borderStyle: 'solid' }"
        @click="openPalaceInfo('福德宮')"
        :title="'點擊查看 福德宮 詳細說明'"
      >
        <div class="palace-branch">午</div>
        <div class="palace-name flex items-center gap-1">
          福德宮
          <span class="info-hint opacity-0 group-hover:opacity-100 transition-opacity text-xs">ℹ️</span>
        </div>
        <div class="palace-stars">
          <span
            class="star main-star cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all"
            @click.stop="openStarInfo('天機')"
            :title="'點擊查看 天機 詳細說明'"
          >天機</span>
          <span class="star assistant-star">左輔</span>
        </div>
      </Card>

      <Card
        class="palace-card cursor-pointer group"
        :class="getPalaceClass('田宅宮')"
        :style="{ borderWidth: '2px', borderStyle: 'solid' }"
        @click="openPalaceInfo('田宅宮')"
        :title="'點擊查看 田宅宮 詳細說明'"
      >
        <div class="palace-branch">未</div>
        <div class="palace-name flex items-center gap-1">
          田宅宮
          <span class="info-hint opacity-0 group-hover:opacity-100 transition-opacity text-xs">ℹ️</span>
        </div>
        <div class="palace-stars">
          <span
            class="star main-star cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all"
            @click.stop="openStarInfo('貪狼')"
            :title="'點擊查看 貪狼 詳細說明'"
          >貪狼[旺]</span>
        </div>
        <div class="palace-details">
          <div class="detail-section">
            <div class="detail-label">主星:</div>
            <div class="detail-value">貪狼[旺]</div>
          </div>
          <div class="detail-section">
            <div class="detail-label">輔星:</div>
            <div class="detail-value">無</div>
          </div>
          <div class="detail-section">
            <div class="detail-label">小星:</div>
            <div class="detail-value">天貴[廟]</div>
          </div>
          <div class="detail-section">
            <div class="detail-label">大限:</div>
            <div class="detail-value">95~104虛歲</div>
          </div>
        </div>
      </Card>

      <Card
        class="palace-card cursor-pointer group"
        :class="getPalaceClass('事業宮')"
        :style="{ borderWidth: '2px', borderStyle: 'solid' }"
        @click="openPalaceInfo('事業宮')"
        :title="'點擊查看 事業宮 詳細說明'"
      >
        <div class="palace-branch">申</div>
        <div class="palace-name flex items-center gap-1">
          事業宮
          <span class="info-hint opacity-0 group-hover:opacity-100 transition-opacity text-xs">ℹ️</span>
        </div>
        <div class="palace-stars">
          <span
            class="star main-star cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all"
            @click.stop="openStarInfo('太陽')"
            :title="'點擊查看 太陽 詳細說明'"
          >太陽</span>
          <span class="star assistant-star">文昌</span>
        </div>
      </Card>

      <!-- 第二行：辰、空白、空白、酉 -->
      <Card
        class="palace-card cursor-pointer group"
        :class="getPalaceClass('兄弟宮')"
        :style="{ borderWidth: '2px', borderStyle: 'solid' }"
        @click="openPalaceInfo('兄弟宮')"
        :title="'點擊查看 兄弟宮 詳細說明'"
      >
        <div class="palace-branch">辰</div>
        <div class="palace-name flex items-center gap-1">
          兄弟宮
          <span class="info-hint opacity-0 group-hover:opacity-100 transition-opacity text-xs">ℹ️</span>
        </div>
        <div class="palace-stars">
          <span
            class="star main-star cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all"
            @click.stop="openStarInfo('武曲')"
            :title="'點擊查看 武曲 詳細說明'"
          >武曲</span>
        </div>
      </Card>

      <div class="palace-center">
        <div class="center-content">
          <div class="center-info" v-if="birthDate">
            <div class="text-xs mb-1">{{ birthDate.year }}年{{ birthDate.month }}月{{ birthDate.day }}日</div>
            <div class="text-xs mb-2">{{ birthDate.hour }}:{{ String(birthDate.minute).padStart(2, '0') }}</div>
          </div>
          <div class="center-meta">
            <div class="meta-item">
              <span class="meta-label">五行局數:</span>
              <span class="meta-value">土五局</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">命主:</span>
              <span class="meta-value">文曲</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">身主:</span>
              <span class="meta-value">天相</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">子年斗君:</span>
              <span class="meta-value">巳</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">身宮:</span>
              <span class="meta-value">未</span>
            </div>
          </div>
        </div>
      </div>

      <Card
        class="palace-card cursor-pointer group"
        :class="getPalaceClass('交友宮')"
        :style="{ borderWidth: '2px', borderStyle: 'solid' }"
        @click="openPalaceInfo('交友宮')"
        :title="'點擊查看 交友宮 詳細說明'"
      >
        <div class="palace-branch">酉</div>
        <div class="palace-name flex items-center gap-1">
          交友宮
          <span class="info-hint opacity-0 group-hover:opacity-100 transition-opacity text-xs">ℹ️</span>
        </div>
        <div class="palace-stars">
          <span
            class="star main-star cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all"
            @click.stop="openStarInfo('巨門')"
            :title="'點擊查看 巨門 詳細說明'"
          >巨門</span>
          <span class="star assistant-star">天魁</span>
        </div>
      </Card>

      <!-- 第三行：卯、空白、空白、戌 -->
      <Card
        class="palace-card cursor-pointer group"
        :class="getPalaceClass('夫妻宮')"
        :style="{ borderWidth: '2px', borderStyle: 'solid' }"
        @click="openPalaceInfo('夫妻宮')"
        :title="'點擊查看 夫妻宮 詳細說明'"
      >
        <div class="palace-branch">卯</div>
        <div class="palace-name flex items-center gap-1">
          夫妻宮
          <span class="info-hint opacity-0 group-hover:opacity-100 transition-opacity text-xs">ℹ️</span>
        </div>
        <div class="palace-stars">
          <span
            class="star main-star cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all"
            @click.stop="openStarInfo('天同')"
            :title="'點擊查看 天同 詳細說明'"
          >天同</span>
          <span class="star assistant-star">右弼</span>
        </div>
      </Card>

      <div class="palace-spacer"></div>
      <div class="palace-spacer"></div>

      <Card
        class="palace-card cursor-pointer group"
        :class="getPalaceClass('遷移宮')"
        :style="{ borderWidth: '2px', borderStyle: 'solid' }"
        @click="openPalaceInfo('遷移宮')"
        :title="'點擊查看 遷移宮 詳細說明'"
      >
        <div class="palace-branch">戌</div>
        <div class="palace-name flex items-center gap-1">
          遷移宮
          <span class="info-hint opacity-0 group-hover:opacity-100 transition-opacity text-xs">ℹ️</span>
        </div>
        <div class="palace-stars">
          <span
            class="star main-star cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all"
            @click.stop="openStarInfo('天相')"
            :title="'點擊查看 天相 詳細說明'"
          >天相</span>
          <span class="star assistant-star">祿存</span>
        </div>
      </Card>

      <!-- 第四行：寅、丑、子、亥 -->
      <Card
        class="palace-card cursor-pointer group"
        :class="getPalaceClass('子女宮')"
        :style="{ borderWidth: '2px', borderStyle: 'solid' }"
        @click="openPalaceInfo('子女宮')"
        :title="'點擊查看 子女宮 詳細說明'"
      >
        <div class="palace-branch">寅</div>
        <div class="palace-name flex items-center gap-1">
          子女宮
          <span class="info-hint opacity-0 group-hover:opacity-100 transition-opacity text-xs">ℹ️</span>
        </div>
        <div class="palace-stars">
          <span
            class="star main-star cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all"
            @click.stop="openStarInfo('廉貞')"
            :title="'點擊查看 廉貞 詳細說明'"
          >廉貞</span>
          <span class="star sha-star">陀羅</span>
        </div>
      </Card>

      <Card
        class="palace-card cursor-pointer group"
        :class="getPalaceClass('財帛宮')"
        :style="{ borderWidth: '2px', borderStyle: 'solid' }"
        @click="openPalaceInfo('財帛宮')"
        :title="'點擊查看 財帛宮 詳細說明'"
      >
        <div class="palace-branch">丑</div>
        <div class="palace-name flex items-center gap-1">
          財帛宮
          <span class="info-hint opacity-0 group-hover:opacity-100 transition-opacity text-xs">ℹ️</span>
        </div>
        <div class="palace-stars">
          <span
            class="star main-star cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all"
            @click.stop="openStarInfo('天梁')"
            :title="'點擊查看 天梁 詳細說明'"
          >天梁</span>
        </div>
      </Card>

      <Card
        class="palace-card cursor-pointer group"
        :class="getPalaceClass('疾厄宮')"
        :style="{ borderWidth: '2px', borderStyle: 'solid' }"
        @click="openPalaceInfo('疾厄宮')"
        :title="'點擊查看 疾厄宮 詳細說明'"
      >
        <div class="palace-branch">子</div>
        <div class="palace-name flex items-center gap-1">
          疾厄宮
          <span class="info-hint opacity-0 group-hover:opacity-100 transition-opacity text-xs">ℹ️</span>
        </div>
        <div class="palace-stars">
          <span
            class="star main-star cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all"
            @click.stop="openStarInfo('七殺')"
            :title="'點擊查看 七殺 詳細說明'"
          >七殺</span>
          <span class="star sha-star">地劫</span>
        </div>
      </Card>

      <Card
        class="palace-card life-palace cursor-pointer group"
        :class="getPalaceClass('命宮')"
        :style="{ borderColor: 'hsl(var(--primary))', borderWidth: '2px', borderStyle: 'solid' }"
        @click="openPalaceInfo('命宮')"
        :title="'點擊查看 命宮 詳細說明'"
      >
        <div class="palace-branch">亥</div>
        <div class="palace-name flex items-center gap-1">
          ★命宮
          <span class="info-hint opacity-0 group-hover:opacity-100 transition-opacity text-xs">ℹ️</span>
        </div>
        <div class="palace-stars">
          <span
            class="star main-star cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all"
            @click.stop="openStarInfo('貪狼')"
            :title="'點擊查看 貪狼 詳細說明'"
          >貪狼</span>
          <span class="star sihua sihua-lu">化祿</span>
        </div>
      </Card>
    </div>

      <!-- 說明文字 -->
      <div class="mt-6 text-center text-sm text-muted-foreground">
        <p>※ 此為示例命盤，實際計算功能開發中</p>
        <p class="mt-2 text-xs text-muted-foreground opacity-75">💡 提示：點擊宮位名稱查看說明，點擊主星查看特點</p>
      </div>
    </CardContent>
  </Card>
</template>

<script setup>
import { ref } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const props = defineProps({
  birthDate: {
    type: Object,
    default: null
  },
  formData: {
    type: Object,
    default: () => ({
      gender: 'male',
      birthDate: {},
      location: {}
    })
  }
})

const emit = defineEmits(['open-palace', 'open-star'])

// 獲取宮位顏色類別
function getPalaceClass(palaceName) {
  const colorMap = {
    '命宮': 'palace-life',
    '兄弟宮': 'palace-sibling',
    '夫妻宮': 'palace-spouse',
    '子女宮': 'palace-children',
    '財帛宮': 'palace-wealth',
    '疾厄宮': 'palace-health',
    '遷移宮': 'palace-travel',
    '交友宮': 'palace-friends',
    '事業宮': 'palace-career',
    '田宅宮': 'palace-property',
    '福德宮': 'palace-fortune',
    '父母宮': 'palace-parents'
  }
  return colorMap[palaceName] || ''
}

// 點擊宮位
function openPalaceInfo(palaceName) {
  emit('open-palace', palaceName)
}

// 點擊主星
function openStarInfo(starName) {
  emit('open-star', starName)
}

// 檢查是否為主星（此函數目前未使用，保留以備將來需要）
function isMainStar(starName) {
  // 主星列表
  const mainStars = ['紫微', '天機', '太陽', '武曲', '天同', '廉貞', '天府', '太陰', '貪狼', '巨門', '天相', '天梁', '七殺', '破軍']
  return mainStars.includes(starName)
}

// 從星曜文字中提取主星名稱（處理 [旺] 等標記）
// 注意：此函數目前未使用，因為模板中直接使用星曜名稱
// 保留以備將來需要處理帶標記的星曜名稱時使用
function extractStarName(starText) {
  // 移除 [旺]、[廟] 等標記
  return starText.replace(/\[.*?\]/g, '').trim()
}
</script>

<style scoped>
.ziwei-chart {
  max-width: 1200px;
  margin: 0 auto;
}

.palace-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, auto);
  gap: 0;
  max-width: 800px;
  margin: 0 auto;
  border: 3px solid hsl(var(--border));
  border-radius: 0.5rem;
  padding: 0;
  background: hsl(var(--border));
  overflow: hidden;
}

.palace-grid > .palace-card:nth-child(1) { grid-column: 1; grid-row: 1; }
.palace-grid > .palace-card:nth-child(2) { grid-column: 2; grid-row: 1; }
.palace-grid > .palace-card:nth-child(3) { grid-column: 3; grid-row: 1; }
.palace-grid > .palace-card:nth-child(4) { grid-column: 4; grid-row: 1; }
.palace-grid > .palace-card:nth-child(5) { grid-column: 1; grid-row: 2; }
.palace-grid > .palace-center { grid-column: 2 / span 2; grid-row: 2; }
.palace-grid > .palace-card:nth-child(7) { grid-column: 4; grid-row: 2; }
.palace-grid > .palace-card:nth-child(8) { grid-column: 1; grid-row: 3; }
.palace-grid > .palace-spacer:nth-child(9) { grid-column: 2; grid-row: 3; }
.palace-grid > .palace-spacer:nth-child(10) { grid-column: 3; grid-row: 3; }
.palace-grid > .palace-card:nth-child(11) { grid-column: 4; grid-row: 3; }
.palace-grid > .palace-card:nth-child(12) { grid-column: 1; grid-row: 4; }
.palace-grid > .palace-card:nth-child(13) { grid-column: 2; grid-row: 4; }
.palace-grid > .palace-card:nth-child(14) { grid-column: 3; grid-row: 4; }
.palace-grid > .palace-card:nth-child(15) { grid-column: 4; grid-row: 4; }

:deep(.palace-card) {
  min-height: 150px;
  border: 2px solid hsl(var(--border)) !important;
  border-radius: 0 !important;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  transition: all 0.2s ease !important;
  position: relative;
  overflow-y: auto;
  max-height: 200px;
  background: hsl(var(--card)) !important;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  margin: -1px 0 0 -1px;
}

/* 覆蓋 Card 組件的內聯樣式 */
:deep(.palace-card[style*="border-color"]) {
  border: 2px solid hsl(var(--border)) !important;
}

/* 第一行和第一列的卡片不需要負邊距 */
.palace-grid > .palace-card:nth-child(1),
.palace-grid > .palace-card:nth-child(5),
.palace-grid > .palace-card:nth-child(8),
.palace-grid > .palace-card:nth-child(12) {
  margin-left: 0;
}

.palace-grid > .palace-card:nth-child(1),
.palace-grid > .palace-card:nth-child(2),
.palace-grid > .palace-card:nth-child(3),
.palace-grid > .palace-card:nth-child(4) {
  margin-top: 0;
}

:deep(.palace-card:hover) {
  transform: none !important;
  border: 3px solid hsl(var(--primary)) !important;
  border-color: hsl(var(--primary)) !important;
  border-width: 3px !important;
  border-style: solid !important;
  box-shadow: inset 0 0 0 2px hsl(var(--primary)), 0 0 0 3px hsla(var(--primary), 0.4) !important;
  z-index: 10;
  background: linear-gradient(135deg, hsla(var(--primary), 0.15), hsl(var(--card))) !important;
}

.palace-card.cursor-pointer {
  cursor: pointer;
}

.info-hint {
  font-size: 0.75rem;
}

:deep(.life-palace) {
  border: 2px solid hsl(var(--primary)) !important;
  background: linear-gradient(135deg, hsla(var(--primary), 0.15), hsl(var(--card))) !important;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05), 0 0 0 2px hsla(var(--primary), 0.3) !important;
}

/* 確保命宮覆蓋 Card 的內聯樣式 */
:deep(.life-palace[style*="border-color"]) {
  border: 2px solid hsl(var(--primary)) !important;
}

:deep(.life-palace:hover) {
  border: 3px solid hsl(var(--primary)) !important;
  border-color: hsl(var(--primary)) !important;
  border-width: 3px !important;
  border-style: solid !important;
  box-shadow: inset 0 0 0 2px hsl(var(--primary)), 0 0 0 3px hsla(var(--primary), 0.4) !important;
  background: linear-gradient(135deg, hsla(var(--primary), 0.2), hsl(var(--card))) !important;
}

.palace-branch {
  font-size: 1.25rem;
  font-weight: bold;
  color: hsl(var(--muted-foreground));
  margin-bottom: 0.25rem;
}

.palace-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: hsl(var(--card-foreground));
  margin-bottom: 0.5rem;
}

.palace-stars {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: center;
  width: 100%;
  flex-grow: 1;
  justify-content: center;
}

.star {
  font-size: 0.75rem;
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
  font-weight: 500;
  display: inline-block;
}

.main-star {
  background-color: #3b82f6;
  color: white;
}

.assistant-star {
  background-color: #10b981;
  color: white;
  font-size: 0.7rem;
}

.sha-star {
  background-color: #ef4444;
  color: white;
  font-size: 0.7rem;
}

.sihua {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.125rem 0.375rem;
}

.sihua-lu {
  background-color: #fbbf24;
  color: #78350f;
}

.palace-center {
  grid-column: span 2;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 150px;
  border: 2px solid hsl(var(--border)) !important;
  border-radius: 0 !important;
  background: hsl(var(--muted)) !important;
  padding: 1rem;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  margin: -1px 0 0 -1px;
}

.center-content {
  text-align: center;
}

.center-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: hsl(var(--card-foreground));
  margin-bottom: 0.5rem;
}

.center-info {
  color: hsl(var(--muted-foreground));
  margin-bottom: 0.75rem;
}

.center-meta {
  font-size: 0.7rem;
  color: hsl(var(--muted-foreground));
  text-align: left;
  padding: 0.5rem;
  background: hsl(var(--secondary));
  border-radius: 0.25rem;
}

.meta-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
}

.meta-label {
  color: hsl(var(--muted-foreground));
  font-weight: 500;
}

.meta-value {
  color: hsl(var(--card-foreground));
  font-weight: 600;
}

.palace-details {
  margin-top: 0.5rem;
  font-size: 0.65rem;
  width: 100%;
  text-align: left;
  padding-top: 0.5rem;
  border-top: 1px solid #e5e7eb;
}

.detail-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.2rem;
}

.detail-label {
  color: hsl(var(--muted-foreground));
  font-weight: 500;
}

.detail-value {
  color: hsl(var(--card-foreground));
  font-weight: 500;
}

.palace-spacer {
  /* 空白區域，用於保持網格結構 */
  visibility: hidden;
}

/* 宮位顏色主題 - 使用左側邊框顏色標識和背景色 */
.palace-life {
  border-left-color: #9c27b0 !important;
  border-left-width: 5px !important;
  background: linear-gradient(to right, rgba(156, 39, 176, 0.1), hsl(var(--card))) !important;
}

.palace-sibling {
  border-left-color: #ff9800 !important;
  border-left-width: 5px !important;
  background: linear-gradient(to right, rgba(255, 152, 0, 0.1), hsl(var(--card))) !important;
}

.palace-spouse {
  border-left-color: #e91e63 !important;
  border-left-width: 5px !important;
  background: linear-gradient(to right, rgba(233, 30, 99, 0.1), hsl(var(--card))) !important;
}

.palace-children {
  border-left-color: #00bcd4 !important;
  border-left-width: 5px !important;
  background: linear-gradient(to right, rgba(0, 188, 212, 0.1), hsl(var(--card))) !important;
}

.palace-wealth {
  border-left-color: #ffd700 !important;
  border-left-width: 5px !important;
  background: linear-gradient(to right, rgba(255, 215, 0, 0.15), hsl(var(--card))) !important;
}

.palace-health {
  border-left-color: #4caf50 !important;
  border-left-width: 5px !important;
  background: linear-gradient(to right, rgba(76, 175, 80, 0.1), hsl(var(--card))) !important;
}

.palace-travel {
  border-left-color: #ff5722 !important;
  border-left-width: 5px !important;
  background: linear-gradient(to right, rgba(255, 87, 34, 0.1), hsl(var(--card))) !important;
}

.palace-friends {
  border-left-color: #9e9e9e !important;
  border-left-width: 5px !important;
  background: linear-gradient(to right, rgba(158, 158, 158, 0.1), hsl(var(--card))) !important;
}

.palace-career {
  border-left-color: #1976d2 !important;
  border-left-width: 5px !important;
  background: linear-gradient(to right, rgba(25, 118, 210, 0.1), hsl(var(--card))) !important;
}

.palace-property {
  border-left-color: #795548 !important;
  border-left-width: 5px !important;
  background: linear-gradient(to right, rgba(121, 85, 72, 0.1), hsl(var(--card))) !important;
}

.palace-fortune {
  border-left-color: #673ab7 !important;
  border-left-width: 5px !important;
  background: linear-gradient(to right, rgba(103, 58, 183, 0.1), hsl(var(--card))) !important;
}

.palace-parents {
  border-left-color: #3f51b5 !important;
  border-left-width: 5px !important;
  background: linear-gradient(to right, rgba(63, 81, 181, 0.1), hsl(var(--card))) !important;
}
</style>

