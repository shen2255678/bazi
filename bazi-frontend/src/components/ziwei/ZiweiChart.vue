<template>
  <div class="ziwei-chart bg-white rounded-lg shadow-lg p-6">
    <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">紫微命盤</h2>

    <!-- 傳統方格盤式佈局 -->
    <div class="palace-grid">
      <!-- 第一行：巳、午、未、申 -->
      <div class="palace-card" :class="getPalaceClass('父母宮')">
        <div class="palace-branch">巳</div>
        <div class="palace-name">父母宮</div>
        <div class="palace-stars">
          <span class="star main-star">紫微</span>
          <span class="star main-star">天府</span>
        </div>
      </div>

      <div class="palace-card" :class="getPalaceClass('福德宮')">
        <div class="palace-branch">午</div>
        <div class="palace-name">福德宮</div>
        <div class="palace-stars">
          <span class="star main-star">天機</span>
          <span class="star assistant-star">左輔</span>
        </div>
      </div>

      <div class="palace-card" :class="getPalaceClass('田宅宮')">
        <div class="palace-branch">未</div>
        <div class="palace-name">田宅宮</div>
        <div class="palace-stars">
          <span class="star main-star">貪狼[旺]</span>
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
      </div>

      <div class="palace-card" :class="getPalaceClass('事業宮')">
        <div class="palace-branch">申</div>
        <div class="palace-name">事業宮</div>
        <div class="palace-stars">
          <span class="star main-star">太陽</span>
          <span class="star assistant-star">文昌</span>
        </div>
      </div>

      <!-- 第二行：辰、空白、空白、酉 -->
      <div class="palace-card" :class="getPalaceClass('兄弟宮')">
        <div class="palace-branch">辰</div>
        <div class="palace-name">兄弟宮</div>
        <div class="palace-stars">
          <span class="star main-star">武曲</span>
        </div>
      </div>

      <div class="palace-center">
        <div class="center-content">
          <div class="center-title">紫微命盤</div>
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

      <div class="palace-card" :class="getPalaceClass('交友宮')">
        <div class="palace-branch">酉</div>
        <div class="palace-name">交友宮</div>
        <div class="palace-stars">
          <span class="star main-star">巨門</span>
          <span class="star assistant-star">天魁</span>
        </div>
      </div>

      <!-- 第三行：卯、空白、空白、戌 -->
      <div class="palace-card" :class="getPalaceClass('夫妻宮')">
        <div class="palace-branch">卯</div>
        <div class="palace-name">夫妻宮</div>
        <div class="palace-stars">
          <span class="star main-star">天同</span>
          <span class="star assistant-star">右弼</span>
        </div>
      </div>

      <div class="palace-spacer"></div>
      <div class="palace-spacer"></div>

      <div class="palace-card" :class="getPalaceClass('遷移宮')">
        <div class="palace-branch">戌</div>
        <div class="palace-name">遷移宮</div>
        <div class="palace-stars">
          <span class="star main-star">天相</span>
          <span class="star assistant-star">祿存</span>
        </div>
      </div>

      <!-- 第四行：寅、丑、子、亥 -->
      <div class="palace-card" :class="getPalaceClass('子女宮')">
        <div class="palace-branch">寅</div>
        <div class="palace-name">子女宮</div>
        <div class="palace-stars">
          <span class="star main-star">廉貞</span>
          <span class="star sha-star">陀羅</span>
        </div>
      </div>

      <div class="palace-card" :class="getPalaceClass('財帛宮')">
        <div class="palace-branch">丑</div>
        <div class="palace-name">財帛宮</div>
        <div class="palace-stars">
          <span class="star main-star">天梁</span>
        </div>
      </div>

      <div class="palace-card" :class="getPalaceClass('疾厄宮')">
        <div class="palace-branch">子</div>
        <div class="palace-name">疾厄宮</div>
        <div class="palace-stars">
          <span class="star main-star">七殺</span>
          <span class="star sha-star">地劫</span>
        </div>
      </div>

      <div class="palace-card life-palace" :class="getPalaceClass('命宮')">
        <div class="palace-branch">亥</div>
        <div class="palace-name">★命宮</div>
        <div class="palace-stars">
          <span class="star main-star">貪狼</span>
          <span class="star sihua sihua-lu">化祿</span>
        </div>
      </div>
    </div>

    <!-- 說明文字 -->
    <div class="mt-6 text-center text-sm text-gray-600">
      <p>※ 此為示例命盤，實際計算功能開發中</p>
    </div>
  </div>
</template>

<script setup>
import { PALACE_COLORS } from '../../utils/constants.js'

defineProps({
  birthDate: {
    type: Object,
    default: null
  }
})

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
  gap: 0.5rem;
  max-width: 800px;
  margin: 0 auto;
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

.palace-card {
  min-height: 150px;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 0.75rem;
  background: linear-gradient(to bottom, #f9fafb, white);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
  overflow-y: auto;
  max-height: 200px;
}

.palace-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.life-palace {
  border-color: #9c27b0;
  border-width: 3px;
  background: linear-gradient(to bottom, #f3e5f5, white);
  box-shadow: 0 0 0 2px rgba(156, 39, 176, 0.2);
}

.palace-branch {
  font-size: 1.25rem;
  font-weight: bold;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.palace-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
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
  border: 2px dashed #d1d5db;
  border-radius: 0.5rem;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  padding: 1rem;
}

.center-content {
  text-align: center;
}

.center-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #1e40af;
  margin-bottom: 0.5rem;
}

.center-info {
  color: #64748b;
  margin-bottom: 0.75rem;
}

.center-meta {
  font-size: 0.7rem;
  color: #475569;
  text-align: left;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 0.25rem;
}

.meta-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
}

.meta-label {
  color: #64748b;
  font-weight: 500;
}

.meta-value {
  color: #1e293b;
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
  color: #64748b;
  font-weight: 500;
}

.detail-value {
  color: #1e293b;
  font-weight: 500;
}

.palace-spacer {
  /* 空白區域，用於保持網格結構 */
  visibility: hidden;
}

/* 宮位顏色主題 */
.palace-life {
  border-left-color: #9c27b0;
}

.palace-sibling {
  border-left-color: #ff9800;
}

.palace-spouse {
  border-left-color: #e91e63;
}

.palace-children {
  border-left-color: #00bcd4;
}

.palace-wealth {
  border-left-color: #ffd700;
}

.palace-health {
  border-left-color: #4caf50;
}

.palace-travel {
  border-left-color: #ff5722;
}

.palace-friends {
  border-left-color: #9e9e9e;
}

.palace-career {
  border-left-color: #1976d2;
}

.palace-property {
  border-left-color: #795548;
}

.palace-fortune {
  border-left-color: #673ab7;
}

.palace-parents {
  border-left-color: #3f51b5;
}
</style>

