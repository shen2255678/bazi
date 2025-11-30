<template>
  <div v-if="palace" class="palace-content-wrapper">
    <!-- 天干地支（左下角，參考：MangA） -->
    <div class="palace-ganzhi">{{ palace.heavenlyStem }}<br>{{ palace.earthlyBranch }}</div>

    <!-- 宮位名稱（底部中央，參考：MangB） -->
    <div class="palace-name">
      {{ palaceName }}
      <span v-if="palace.isShenGong" class="shengong-mark">[身]</span>
      <span v-if="palace.isLaiYin" class="laiyin-mark">[來因]</span>
    </div>

    <!-- 大限年齡（底部左側，參考：MangY10） -->
    <div class="palace-daxian" v-if="palace.daxian">{{ formatDaxian(palace.daxian) }}</div>

    <!-- 小限年齡（底部，參考：MangY1） -->
    <div class="palace-xiaoxian" v-if="palace.xiaoxian && palace.xiaoxian.length > 0">
      {{ palace.xiaoxian.slice(0, 3).join(',') }}
    </div>

    <!-- 主星和輔星（左上角，參考：StarA） -->
    <div class="stars-main-assistant">
      <!-- 每個星曜是一個垂直的列 -->
      <div
        v-for="(star, idx) in palace.mainStars"
        :key="'main-' + star.name + idx"
        class="star-column"
      >
        <div
          class="star-name main-star-name"
          @click.stop="$emit('open-star', star.name)"
          :title="'點擊查看 ' + star.name + ' 詳細說明'"
        >{{ star.name }}</div>
        <div class="star-bright">{{ getBrightnessChar(star, palace.earthlyBranch) }}</div>
        <div class="star-sihua" :class="getSihuaColorClass(star.sihua)">{{ getSihuaChar(star) }}</div>
      </div>

      <!-- 輔星 -->
      <div
        v-for="(star, idx) in palace.assistantStars"
        :key="'assist-' + star.name + idx"
        class="star-column"
      >
        <div
          class="star-name assistant-star-name"
          @click.stop="$emit('open-star', star.name)"
          :title="'點擊查看 ' + star.name + ' 詳細說明'"
        >{{ star.name }}</div>
        <div class="star-bright">{{ getBrightnessChar(star, palace.earthlyBranch) }}</div>
        <div class="star-sihua" :class="getSihuaColorClass(star.sihua)">{{ getSihuaChar(star) }}</div>
      </div>
    </div>

    <!-- 煞星（右上角，參考：StarB） -->
    <div class="stars-sha" v-if="palace.shaStars && palace.shaStars.length > 0">
      <span
        v-for="(star, idx) in palace.shaStars"
        :key="'sha-' + idx"
        class="sha-star"
      >{{ typeof star === 'string' ? star : star.name }}</span>
    </div>

    <!-- 雜曜/小星（右下角，參考：StarC） -->
    <div class="stars-minor" v-if="palace.minorStars && palace.minorStars.length > 0">
      <span
        v-for="(star, idx) in palace.minorStars"
        :key="'minor-' + idx"
        class="minor-star"
      >{{ typeof star === 'string' ? star : star.name }}</span>
    </div>

    <!-- 地支角標（右下角，參考：MangC） -->
    <div class="palace-branch-mark">{{ palace.earthlyBranch }}</div>
  </div>
  <div v-else class="text-muted-foreground text-sm p-2">
    無數據
  </div>
</template>

<script setup>
import { getStarBrightness, getStarSiHua } from '@/utils/calculators/ziweiStars.js'

const props = defineProps({
  palace: {
    type: Object,
    default: null
  },
  palaceName: {
    type: String,
    required: true
  },
  yearStem: {
    type: String,
    default: '甲'
  }
})

const emit = defineEmits(['open-star'])

// 格式化大限顯示
function formatDaxian(daxian) {
  if (!daxian) return ''
  if (typeof daxian === 'string') return daxian
  return daxian.age || ''
}

// 獲取星曜亮度字符
function getBrightnessChar(star, branch) {
  const brightness = star.brightness || getStarBrightness(star.name, branch)
  if (brightness && brightness !== '平') {
    return brightness
  }
  return ''  // 不顯示「平」
}

// 獲取四化字符
function getSihuaChar(star) {
  if (star.sihua) {
    return star.sihua
  }
  return ''
}

// 獲取四化顏色類別（參考：Star4 span color:#8000FF）
function getSihuaColorClass(sihua) {
  if (!sihua) return ''
  // 不同四化使用不同顏色
  const colorMap = {
    '祿': 'sihua-lu',
    '權': 'sihua-quan',
    '科': 'sihua-ke',
    '忌': 'sihua-ji'
  }
  return colorMap[sihua] || 'sihua-default'
}
</script>

<style scoped>
.palace-content-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0.25rem;
  font-size: 0.75rem;
  min-height: 180px;
  overflow: hidden;
}

/* 天干地支（左下角，參考：MangA） */
.palace-ganzhi {
  position: absolute;
  left: 0.25rem;
  bottom: 0.25rem;
  font-size: 0.65rem;
  color: hsl(var(--muted-foreground));
  line-height: 1.1;
  text-align: left;
}

/* 宮位名稱（底部中央，參考：MangB） */
.palace-name {
  position: absolute;
  bottom: 0.25rem;
  left: 50%;
  transform: translateX(-50%);
  font-weight: bold;
  text-align: center;
  font-size: 0.85rem;
  color: hsl(var(--card-foreground));
  white-space: nowrap;
}

.shengong-mark {
  color: hsl(var(--primary));
  font-size: 0.7rem;
}

.laiyin-mark {
  color: hsl(var(--primary));
  font-size: 0.7rem;
}

/* 地支角標（右下角，參考：MangC） */
.palace-branch-mark {
  position: absolute;
  right: 0.25rem;
  bottom: 0.25rem;
  font-size: 0.65rem;
  color: #3b82f6; /* blue */
  font-weight: 500;
}

/* 大限年齡（底部偏上，參考：MangY10） */
.palace-daxian {
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  text-align: center;
  font-size: 0.65rem;
  color: #9333ea; /* purple */
  font-weight: 500;
}

/* 小限年齡（大限下方，參考：MangY1） */
.palace-xiaoxian {
  position: absolute;
  bottom: 1.8rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  text-align: center;
  font-size: 0.6rem;
  color: #1e40af; /* navy */
  font-weight: 500;
}

/* 主星和輔星（左上角開始，參考：StarA） */
.stars-main-assistant {
  position: absolute;
  top: 0.25rem;
  left: 0.25rem;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 0.35rem;
  flex-wrap: wrap;
  max-width: 70%;
}

/* 每個星曜是一個垂直的列 */
.star-column {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.05rem;
}

/* 星曜名稱（參考：StarA color:blue） */
.star-name {
  font-size: 0.7rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
  line-height: 1.2;
}

.main-star-name {
  color: #3b82f6; /* blue */
}

.assistant-star-name {
  color: #10b981; /* green */
}

.star-name:hover {
  text-decoration: underline;
  opacity: 0.8;
}

/* 亮度字符 */
.star-bright {
  font-size: 0.6rem;
  color: hsl(var(--muted-foreground));
  line-height: 1.1;
  min-height: 0.7rem;
}

/* 四化字符（參考：Star4 span color:#8000FF） */
.star-sihua {
  font-size: 0.6rem;
  font-weight: 600;
  line-height: 1.1;
  min-height: 0.7rem;
}

.sihua-lu {
  color: #f59e0b; /* amber/orange for 祿 */
}

.sihua-quan {
  color: #8000FF; /* purple for 權 */
}

.sihua-ke {
  color: #10b981; /* green for 科 */
}

.sihua-ji {
  color: #ef4444; /* red for 忌 */
}

.sihua-default {
  color: #8000FF;
}

/* 煞星（右上角，參考：StarB color:Red） */
.stars-sha {
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.1rem;
  max-width: 30%;
  text-align: right;
}

.sha-star {
  color: #ef4444; /* red */
  font-size: 0.6rem;
  font-weight: 500;
  white-space: nowrap;
  line-height: 1.2;
}

/* 雜曜/小星（右下角偏上，參考：StarC） */
.stars-minor {
  position: absolute;
  bottom: 3.5rem;
  right: 0.25rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.1rem;
  max-width: 30%;
  text-align: right;
}

.minor-star {
  color: hsl(var(--muted-foreground));
  font-size: 0.55rem;
  white-space: nowrap;
  line-height: 1.2;
}
</style>
