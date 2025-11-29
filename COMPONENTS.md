# 元件化架構說明

## 📦 元件結構

```
src/
├── components/
│   ├── common/                    # 共用元件
│   │   ├── BirthInfoForm.vue     # 出生資料表單
│   │   ├── ShichenSelector.vue   # 時辰快速選擇器
│   │   ├── LocationSelector.vue  # 地點選擇器
│   │   └── SolarTimeSettings.vue # 真太陽時設定
│   │
│   └── bazi/                      # 八字相關元件
│       ├── BaziChart.vue          # 八字命盤視覺化
│       └── BaziResult.vue         # 八字結果展示
│
├── utils/                         # 工具函數
│   ├── constants.js               # 常數定義
│   ├── solarTime.js               # 真太陽時計算
│   ├── calendar.js                # 曆法轉換
│   └── calculators/
│       ├── ganzhi.js              # 干支計算
│       └── wuxing.js              # 五行分析
│
└── App.vue                        # 主應用程式
```

## 🔧 元件功能說明

### 1. BirthInfoForm.vue
**職責**：出生資料輸入
- 性別選擇（男性/女性）
- 出生日期（年/月/日）
- 出生時間（時/分）
- 即時顯示當前時辰

**Props**：
- `modelValue` - 表單數據物件

**Emits**：
- `update:modelValue` - 更新表單數據

---

### 2. ShichenSelector.vue
**職責**：12 時辰快速選擇
- 顯示 12 時辰按鈕網格
- 高亮當前選中時辰
- 點擊時辰快速設定時間

**Props**：
- `modelValue` - 表單數據物件

**Emits**：
- `update:modelValue` - 更新時辰時間

**關鍵方法**：
- `isCurrentShichen(shichen)` - 判斷是否為當前時辰
- `selectShichen(shichen)` - 選擇時辰並設定時間

---

### 3. LocationSelector.vue
**職責**：出生地點選擇
- 25 個城市選單
- 自訂經度開關
- 即時顯示當前座標

**Props**：
- `modelValue` - 表單數據物件

**Emits**：
- `update:modelValue` - 更新地點數據

**Computed**：
- `currentCoordinates` - 計算當前經緯度

---

### 4. SolarTimeSettings.vue
**職責**：真太陽時設定
- 真太陽時開關
- 修正資訊即時顯示
- 經度時差 + 均時差展示

**Props**：
- `modelValue` - 表單數據物件
- `birthDate` - 出生日期
- `solarTimeInfo` - 真太陽時修正資訊

**Emits**：
- `update:modelValue` - 更新真太陽時設定

---

### 5. BaziChart.vue
**職責**：八字命盤視覺化
- 四柱卡片展示（年月日時）
- 地支藏干展示
- 五行分布圖表
- 日主分析卡片
- 用神喜忌卡片

**Props**：
- `pillars` - 四柱數據
- `wuxingAnalysis` - 五行分析結果

---

### 6. BaziResult.vue
**職責**：八字結果整合展示
- 命主基本資料卡片
- 整合 BaziChart 元件

**Props**：
- `result` - 完整計算結果
- `birthDate` - 出生日期

---

## 🎯 數據流設計

### 單向數據流
```
App.vue (formData)
    ↓ props (v-model)
各個表單元件
    ↓ emits (update:modelValue)
App.vue 更新 formData
    ↓ 計算函數
App.vue (result)
    ↓ props
BaziResult → BaziChart
```

### 關鍵數據結構

```javascript
// formData - 主要表單數據
{
  gender: 'male' | 'female',
  birthDate: {
    year: Number,
    month: Number,
    day: Number,
    hour: Number,
    minute: Number
  },
  selectedCity: String,
  customLocation: {
    enabled: Boolean,
    lng: Number
  },
  useSolarTime: Boolean
}

// result - 計算結果
{
  pillars: {
    year: { stem, branch, ganzhi },
    month: { stem, branch, ganzhi },
    day: { stem, branch, ganzhi },
    hour: { stem, branch, ganzhi },
    baziString: String
  },
  wuxing: {
    distribution: Object,
    strength: Object,
    ranking: Array,
    dayMaster: Object,
    yongshen: String,
    xishen: String,
    jishen: String
  },
  shichen: String,
  gender: String,
  location: String,
  usedSolarTime: Boolean,
  solarTimeCorrection: Object
}
```

## ✨ 元件化優勢

### 1. **關注點分離**
- 每個元件專注於單一功能
- 易於理解和維護
- 減少 App.vue 的複雜度

### 2. **可重用性**
- 元件可在其他頁面重用
- 便於擴展（如未來新增紫微斗數）

### 3. **可測試性**
- 元件獨立，易於單元測試
- Props 和 Emits 清晰定義

### 4. **可維護性**
- 修改某個功能只需改對應元件
- 降低程式碼耦合度

### 5. **開發效率**
- 團隊可並行開發不同元件
- 問題定位更快速

## 🔄 v-model 雙向綁定

所有表單元件都使用 Vue 3 的 v-model 模式：

```vue
<!-- App.vue -->
<BirthInfoForm v-model="formData" />

<!-- BirthInfoForm.vue -->
<script setup>
const props = defineProps({
  modelValue: Object
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

這種模式確保：
- 單一數據源（App.vue 的 formData）
- 數據流向清晰
- 易於追蹤數據變化

## 📝 未來擴展

### 計劃新增元件
- `DayunChart.vue` - 大運排盤
- `ShishenChart.vue` - 十神關係圖
- `ZiweiPalace.vue` - 紫微命盤
- `LunarCalendar.vue` - 農曆轉換器

### 元件通信
- 使用 Pinia 作為全域狀態管理（計劃中）
- 複雜元件間通信使用 provide/inject
- 事件總線（Event Bus）處理跨元件事件

---

**最後更新**：2025-11-29
**版本**：v1.3 - 元件化重構
