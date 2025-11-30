# 八字紫微命理計算機 - Claude AI 專案文檔

> 專業的八字命盤與紫微斗數排盤系統，採用現代化 Vue 3 技術棧開發

## 📋 專案概述

這是一個全功能的命理計算網頁應用程式，整合了八字排盤、紫微斗數命盤分析、真太陽時修正等專業功能。設計目標是提供準確、易用的命理計算工具，並支援 AI 命理分析。

### 🎯 核心功能

1. **八字排盤**
   - 四柱八字計算（年月日時）
   - 真太陽時修正（經度時差 + 均時差）
   - 五行分布分析與強弱判斷
   - 用神、喜神、忌神推算
   - 地支藏干展示
   - 納音五行計算

2. **紫微斗數**
   - 12 宮位排列與視覺化
   - 14 主星安星邏輯
   - 宮位與主星資訊查詢
   - 方格盤（Discord 風格）佈局
   - 詳細命理解說

3. **AI 分析整合**
   - JSON 格式導出（結構化數據）
   - Prompt 格式導出（自然語言）
   - 支援 OpenAI、Claude、Gemini 等 LLM
   - 一鍵複製至剪貼板

4. **專業特性**
   - 性別選擇（影響大運順逆）
   - 精確到分鐘的時間輸入
   - 12 時辰快速選擇
   - 25 個中國城市預設座標
   - 自訂經度支援
   - 國曆農曆轉換（待完成）

---

## 🏗️ 技術架構

### 前端技術棧

```
Vue 3.5.13           - 漸進式框架
Vite 6.0.3           - 建置工具
Tailwind CSS 4.0.0   - 樣式框架
shadcn/ui            - UI 元件庫
Pinia                - 狀態管理（計劃中）
Vue I18n             - 國際化（計劃中）
```

### 專案結構

```
bazi-frontend/
├── src/
│   ├── components/
│   │   ├── common/              # 共用元件
│   │   │   ├── BirthInfoForm.vue         # 出生資料表單
│   │   │   ├── ShichenSelector.vue       # 時辰快速選擇
│   │   │   ├── LocationSelector.vue      # 地點選擇器
│   │   │   ├── SolarTimeSettings.vue     # 真太陽時設定
│   │   │   └── InfoDrawer.vue            # 通用抽屜
│   │   │
│   │   ├── bazi/                # 八字模組
│   │   │   ├── BaziChart.vue             # 命盤視覺化
│   │   │   └── BaziResult.vue            # 結果展示
│   │   │
│   │   ├── ziwei/               # 紫微模組
│   │   │   ├── ZiweiChart.vue            # 紫微命盤
│   │   │   └── PalaceCard.vue            # 宮位卡片
│   │   │
│   │   ├── layout/              # 佈局元件
│   │   │   └── DiscordLayout.vue         # Discord 風格佈局
│   │   │
│   │   └── ui/                  # shadcn/ui 元件
│   │       ├── button/
│   │       ├── card/
│   │       ├── input/
│   │       ├── calendar/
│   │       ├── hover-card/
│   │       └── ...
│   │
│   ├── utils/
│   │   ├── calculators/         # 計算引擎
│   │   │   ├── ganzhi.js                 # 干支計算
│   │   │   └── wuxing.js                 # 五行分析
│   │   │
│   │   ├── constants.js         # 常數定義
│   │   ├── solarTime.js         # 真太陽時計算
│   │   ├── calendar.js          # 曆法轉換
│   │   ├── ziweiInfo.js         # 紫微資料庫
│   │   ├── ziweiExport.js       # AI 導出功能
│   │   └── ziweiCompleteInfo.js # 完整紫微資訊
│   │
│   ├── App.vue                  # 主應用
│   ├── main.js                  # 入口文件
│   └── style.css                # 全域樣式
│
├── public/                      # 靜態資源
├── vite.config.js              # Vite 配置
├── tailwind.config.js          # Tailwind 配置
└── package.json                # 依賴管理
```

---

## 🎨 UI/UX 設計

### Discord 風格佈局

採用現代化的側邊欄導航設計：
- 左側：功能標籤（八字排盤、紫微命盤、命理分析）
- 中央：主要內容區
- 右側：抽屜式詳情面板

### 設計系統

**配色方案**：
- Primary: `hsl(263.4, 70%, 50.4%)` - 紫色主題
- Background: `hsl(240, 10%, 3.9%)` - 深色背景
- Card: `hsl(240, 10%, 3.9%)` - 卡片背景
- Muted: `hsl(240, 3.7%, 15.9%)` - 靜音色

**五行顏色**：
- 金：`#9ca3af` (灰色)
- 木：`#22c55e` (綠色)
- 水：`#3b82f6` (藍色)
- 火：`#ef4444` (紅色)
- 土：`#f59e0b` (黃色)

---

## 📊 數據結構

### 表單數據 (formData)

```javascript
{
  gender: 'male' | 'female',        // 性別
  birthDate: {
    year: Number,                   // 年份 (1900-2100)
    month: Number,                  // 月份 (1-12)
    day: Number,                    // 日期 (1-31)
    hour: Number,                   // 小時 (0-23)
    minute: Number                  // 分鐘 (0-59)
  },
  selectedCity: String,             // 選擇城市
  customLocation: {
    enabled: Boolean,               // 是否自訂經度
    lng: Number                     // 經度 (-180 ~ 180)
  },
  useSolarTime: Boolean             // 是否使用真太陽時
}
```

### 八字計算結果 (result)

```javascript
{
  pillars: {
    year: { stem, branch, ganzhi },   // 年柱
    month: { stem, branch, ganzhi },  // 月柱
    day: { stem, branch, ganzhi },    // 日柱
    hour: { stem, branch, ganzhi },   // 時柱
    baziString: String                // 完整八字字串
  },
  wuxing: {
    distribution: Object,             // 五行分布 { 金, 木, 水, 火, 土 }
    strength: Object,                 // 五行強弱
    ranking: Array,                   // 排序陣列
    dayMaster: {                      // 日主資訊
      stem: String,
      wuxing: String,
      strength: String,
      count: Number
    },
    yongshen: String,                 // 用神
    xishen: String,                   // 喜神
    jishen: String                    // 忌神
  },
  shichen: String,                    // 時辰名稱
  gender: String,                     // 性別
  location: String,                   // 地點
  usedSolarTime: Boolean,             // 是否使用真太陽時
  solarTimeCorrection: Object         // 真太陽時修正資訊
}
```

---

## 🔧 核心算法

### 1. 干支計算 (`ganzhi.js`)

**年柱計算**：
```javascript
export function getYearGanzhi(year, afterLichun = true) {
  // 立春前使用前一年的干支
  const adjustedYear = afterLichun ? year : year - 1
  const offset = adjustedYear - 1984 // 1984 是甲子年
  const stemIndex = offset % 10
  const branchIndex = offset % 12

  return {
    stem: HEAVENLY_STEMS[stemIndex],
    branch: EARTHLY_BRANCHES[branchIndex],
    ganzhi: HEAVENLY_STEMS[stemIndex] + EARTHLY_BRANCHES[branchIndex]
  }
}
```

**月柱計算（五虎遁）**：
```javascript
export function getMonthGanzhi(yearStem, monthOrder) {
  // 五虎遁：甲己之年丙作首
  const monthStemStart = MONTH_STEM_START[yearStem]
  const stemIndex = (monthStemStart + monthOrder - 1) % 10

  return {
    stem: HEAVENLY_STEMS[stemIndex],
    branch: EARTHLY_BRANCHES[monthOrder],
    ganzhi: HEAVENLY_STEMS[stemIndex] + EARTHLY_BRANCHES[monthOrder]
  }
}
```

**時柱計算（五鼠遁）**：
```javascript
export function getHourGanzhi(dayStem, hour) {
  const shichen = getShichenByTime(hour)
  const branchIndex = EARTHLY_BRANCHES.indexOf(shichen.branch)

  // 五鼠遁：甲己還加甲
  const hourStemStart = HOUR_STEM_START[dayStem]
  const stemIndex = (hourStemStart + branchIndex) % 10

  return {
    stem: HEAVENLY_STEMS[stemIndex],
    branch: shichen.branch,
    ganzhi: HEAVENLY_STEMS[stemIndex] + shichen.branch
  }
}
```

### 2. 真太陽時修正 (`solarTime.js`)

**經度時差計算**：
```javascript
const longitudeDiff = Math.round((actualLongitude - 120) * 4)
// 東經每度差 4 分鐘
```

**均時差計算（傅立葉級數近似）**：
```javascript
export function calculateEquationOfTime(date) {
  const dayOfYear = Math.floor((date - startOfYear) / (1000 * 60 * 60 * 24)) + 1
  const B = (2 * Math.PI * (dayOfYear - 81)) / 365

  // 傅立葉級數近似
  const E = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B)
  return Math.round(E)
}
```

**總修正量**：
```javascript
totalCorrection = longitudeDiff + equationOfTime
```

### 3. 五行分析 (`wuxing.js`)

**五行分布計算**：
```javascript
export function analyzeWuxingDistribution(pillars) {
  const distribution = { 金: 0, 木: 0, 水: 0, 火: 0, 土: 0 }

  // 天干五行（權重 1.0）
  for (const pillar of [pillars.year, pillars.month, pillars.day, pillars.hour]) {
    const stemWuxing = getStemWuxing(pillar.stem)
    distribution[stemWuxing] += 1.0

    // 地支藏干（權重 0.6/0.3/0.1）
    const hiddenStems = getHiddenStems(pillar.branch)
    for (const hidden of hiddenStems) {
      const hiddenWuxing = getStemWuxing(hidden.stem)
      distribution[hiddenWuxing] += hidden.weight
    }
  }

  return { distribution }
}
```

**強弱判斷**：
```javascript
export function analyzeWuxingStrength(distribution) {
  const total = Object.values(distribution).reduce((sum, val) => sum + val, 0)
  const maxCount = Math.max(...Object.values(distribution))

  for (const [element, count] of Object.entries(distribution)) {
    const ratio = count / maxCount

    let level
    if (ratio >= 0.9) level = 'very_strong'  // 極強
    else if (ratio >= 0.7) level = 'strong'  // 強
    else if (ratio >= 0.5) level = 'medium'  // 中
    else if (ratio >= 0.3) level = 'weak'    // 弱
    else level = 'very_weak'                 // 極弱

    strength[element] = {
      count,
      ratio: ratio.toFixed(2),
      level,
      percentage: ((count / total) * 100).toFixed(1)
    }
  }

  return { strength }
}
```

---

## 🎯 元件化設計

### 設計原則

1. **單一職責原則** - 每個元件專注於一個功能
2. **Props Down, Events Up** - 單向數據流
3. **可重用性** - 元件可在不同場景使用
4. **可測試性** - 元件獨立，易於測試

### Props & Emits 規範

**所有表單元件使用 v-model 模式**：

```vue
<!-- 父元件 -->
<BirthInfoForm v-model="formData" />

<!-- 子元件 -->
<script setup>
const props = defineProps({
  modelValue: { type: Object, required: true }
})
const emit = defineEmits(['update:modelValue'])

function updateGender(value) {
  emit('update:modelValue', {
    ...props.modelValue,
    gender: value
  })
}
</script>
```

### 元件通信

```
App.vue (formData)
    ↓ props (v-model)
表單元件 (BirthInfoForm, ShichenSelector, etc.)
    ↓ emits (update:modelValue)
App.vue 更新 formData
    ↓ 計算函數
App.vue (result)
    ↓ props
BaziResult → BaziChart
```

---

## 🚀 開發指南

### 環境要求

- **Node.js**: 20.19+ 或 22.12+
- **npm**: 10+
- **現代瀏覽器**: Chrome 100+, Firefox 100+, Safari 15+

### 安裝步驟

```bash
# 進入前端目錄
cd bazi-frontend

# 安裝依賴
npm install

# 啟動開發服務器
npm run dev

# 建置生產版本
npm run build

# 預覽生產版本
npm run preview
```

### 開發服務器

啟動後訪問：**http://localhost:5173/**

### 專案指令

```bash
npm run dev          # 開發模式
npm run build        # 建置生產版本
npm run preview      # 預覽建置結果
npm run lint         # 代碼檢查（計劃中）
npm run test         # 運行測試（計劃中）
```

---

## 📝 API 文檔

### 計算器 API

#### `calculateBaziPillars(date, afterLichun, monthOrder)`

計算四柱八字

**參數**：
- `date` (Object): 出生日期時間
  - `year` (Number): 年份
  - `month` (Number): 月份
  - `day` (Number): 日期
  - `hour` (Number): 小時
  - `minute` (Number): 分鐘
- `afterLichun` (Boolean): 是否在立春後
- `monthOrder` (Number): 月令（節氣月份）

**返回值**：
```javascript
{
  year: { stem, branch, ganzhi },
  month: { stem, branch, ganzhi },
  day: { stem, branch, ganzhi },
  hour: { stem, branch, ganzhi },
  baziString: String
}
```

#### `fullWuxingAnalysis(pillars)`

完整五行分析

**參數**：
- `pillars` (Object): 四柱數據

**返回值**：
```javascript
{
  distribution: Object,    // 五行分布
  strength: Object,        // 五行強弱
  ranking: Array,          // 排序陣列
  dayMaster: Object,       // 日主資訊
  yongshen: String,        // 用神
  xishen: String,          // 喜神
  jishen: String           // 忌神
}
```

#### `convertToSolarTime(dateTime, longitude, timezone)`

真太陽時轉換

**參數**：
- `dateTime` (Object): 日期時間
- `longitude` (Number): 經度
- `timezone` (String): 時區

**返回值**：
```javascript
{
  solarHour: Number,
  solarMinute: Number,
  correction: {
    longitudeDiff: Number,
    equationOfTime: Number,
    totalDiff: Number
  },
  dayAdjusted: Boolean
}
```

---

## 🎓 命理知識庫

### 八字基礎

**四柱**：
- 年柱：代表祖上、父母、童年
- 月柱：代表父母、兄弟姐妹、青年
- 日柱：代表自己、配偶、中年（日干為日主）
- 時柱：代表子女、晚年

**十天干**：
甲、乙、丙、丁、戊、己、庚、辛、壬、癸

**十二地支**：
子、丑、寅、卯、辰、巳、午、未、申、酉、戌、亥

**五行屬性**：
- 木：甲乙（天干）、寅卯（地支）
- 火：丙丁（天干）、巳午（地支）
- 土：戊己（天干）、辰戌丑未（地支）
- 金：庚辛（天干）、申酉（地支）
- 水：壬癸（天干）、子亥（地支）

### 紫微斗數基礎

**12 宮位**：
命宮、兄弟、夫妻、子女、財帛、疾厄、遷移、奴僕、官祿、田宅、福德、父母

**14 主星**：
- 北斗：紫微、天機、太陽、武曲、天同、廉貞
- 南斗：天府、太陰、貪狼、巨門、天相、天梁、七殺、破軍

**四化**：
化祿、化權、化科、化忌

---

## 🐛 已知問題

### 待修復

1. ~~時辰快速選擇 bug~~（已修復）
2. ~~計算按鈕無反應~~（已修復）
3. ~~命盤文字顏色問題~~（已修復）
4. 農曆轉換尚未完成

### 待開發功能

1. **lunar-javascript 整合** - 專業農曆庫
2. **十神計算** - 正官、偏官、正印、偏印等
3. **大運排盤** - 10 年一大運
4. **流年計算** - 每年運勢
5. **神煞系統** - 天乙貴人、桃花等
6. **多語言支援** - 繁中/簡中/英文

---

## 📚 參考資料

### 命理典籍

- 《淵海子平》- 八字命理經典
- 《三命通會》- 明代命理集大成之作
- 《紫微斗數全書》- 紫微斗數經典
- 《星命總括》- 紫微斗數系統論述

### 技術文檔

- [Vue 3 官方文檔](https://vuejs.org/)
- [Vite 官方文檔](https://vitejs.dev/)
- [Tailwind CSS 官方文檔](https://tailwindcss.com/)
- [shadcn/ui Vue 版本](https://www.shadcn-vue.com/)

### 算法參考

- 真太陽時計算：參考天文學均時差公式
- 萬年曆算法：蔡勒公式（Zeller's Formula）
- 節氣計算：壽星天文曆算法

---

## 🤝 貢獻指南

### 代碼規範

1. **命名規範**
   - 元件：PascalCase（例如：`BaziChart.vue`）
   - 函數：camelCase（例如：`calculateBazi`）
   - 常數：UPPER_SNAKE_CASE（例如：`HEAVENLY_STEMS`）

2. **註釋規範**
   - 所有公開函數必須有 JSDoc 註釋
   - 複雜邏輯需要行內註釋說明

3. **Commit 規範**
   ```
   feat: 新增功能
   fix: 修復 bug
   docs: 文檔更新
   style: 格式調整
   refactor: 重構代碼
   test: 測試相關
   chore: 建置工具或輔助工具變動
   ```

### Pull Request 流程

1. Fork 專案
2. 創建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交變更 (`git commit -m 'feat: Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

---

## 📄 授權

本專案採用 MIT 授權條款

---

## 👨‍💻 作者

**Claude AI** + **開發者**

專案由 Claude AI 協助開發，採用現代化技術棧實現專業命理計算功能。

---

## 🙏 致謝

- 感謝所有命理學前輩的理論貢獻
- 感謝開源社群提供的優秀工具和框架
- 感謝所有測試用戶的反饋和建議

---

## 📞 聯繫方式

- **GitHub Issues**: [專案 Issues 頁面](https://github.com/your-repo/bazi/issues)
- **Email**: your-email@example.com

---

**最後更新**：2025-11-29
**版本**：v1.3 - 元件化重構完成
**文檔版本**：1.0
