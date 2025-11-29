# 八字計算機與紫微命盤解析系統 - 專案規格書

## 專案概述

一個整合八字命理和紫微斗數的網頁應用系統，支援國曆/農曆輸入，透過 AI API 進行命盤解析。

### 技術棧
- **前端**: Vue 3 + Pinia + Tailwind CSS + Vue I18n
- **後端**: Python (FastAPI/Flask - 待定)
- **AI 整合**: OpenAI API / Claude API / Google Gemini API
- **視覺化**: SVG / Canvas / Fabric.js
- **圖片生成**: html2canvas / dom-to-image
- **多語系**: 繁體中文 / 簡體中文 / 英文

> 📖 **詳細設計規格請參考**: [DESIGN_SPEC.md](DESIGN_SPEC.md)

---

## 功能需求規格

### 1. 核心功能模組

#### 1.1 日期輸入模組
- [ ] 國曆輸入介面
  - 年月日時選擇器
  - 支援西元年 1900-2100
  - 時辰選擇（子時 00:00-01:00 至 亥時 21:00-23:00）

- [ ] 農曆輸入介面
  - 農曆年月日選擇
  - 閏月處理
  - 時辰選擇

- [ ] 曆法轉換功能
  - 國曆 ⟷ 農曆雙向轉換
  - 即時顯示轉換結果

#### 1.2 八字計算模組
- [ ] 基礎八字計算
  - 年柱（天干地支）
  - 月柱（天干地支）
  - 日柱（天干地支）
  - 時柱（天干地支）

- [ ] 五行分析
  - 五行統計（金木水火土）
  - 五行強弱分析
  - 用神喜忌

- [ ] 十神計算
  - 比肩、劫財、食神、傷官
  - 偏財、正財、七殺、正官
  - 偏印、正印

- [ ] 大運流年
  - 大運排盤（10年一運）
  - 流年運勢
  - 起運歲數計算

#### 1.3 紫微斗數模組
- [ ] 命盤排列
  - 十二宮位安排（命宮、兄弟宮、夫妻宮等）
  - 主星安置（14主星）
  - 輔星、煞星、吉星配置

- [ ] 四化飛星
  - 生年四化
  - 大限四化
  - 流年四化

- [ ] 大限流年
  - 大限盤（10年）
  - 流年盤
  - 流月、流日（進階功能）

- [ ] **視覺化展示**
  - 方格盤式佈局（傳統）
  - 圓盤式佈局（現代）
  - 星盤圖片生成（PNG/SVG）
  - 互動式宮位展示
  - 星曜圖示系統

- [ ] **表格展示**
  - 十二宮位總覽表
  - 主星特質對照表
  - 流年運勢表（10年）
  - 四化飛星速查表

- [ ] **生活面向預測**
  - 事業發展分析
  - 財富運勢評估
  - 感情婚姻洞察
  - 健康狀況預警
  - 家庭關係分析
  - 教育學習建議
  - 人際社交指引
  - 個人成長規劃
  - 流年重點事件
  - 大限運程趨勢

#### 1.4 AI 解析模組
- [ ] 命盤解讀提示詞設計
  - 八字結構化數據輸入
  - 紫微命盤結構化數據輸入
  - 特定問題查詢（事業、感情、健康等）

- [ ] AI API 整合
  - API 請求封裝
  - 錯誤處理與重試機制
  - 回應解析與格式化

- [ ] 解析結果展示
  - 整體運勢分析
  - 分類解讀（性格、事業、財運、感情、健康）
  - 流年運勢預測
  - 建議與注意事項

#### 1.5 使用者介面功能
- [ ] 歷史記錄
  - 查詢歷史保存（LocalStorage）
  - 快速載入歷史命盤
  - 歷史記錄管理（刪除、編輯備註）

- [ ] 命盤對比
  - 雙人命盤對比（合婚分析）
  - 差異標註

- [ ] 匯出功能
  - PDF 匯出（含命盤圖 + 分析文字）
  - 圖片匯出（PNG/JPEG，多種解析度）
  - SVG 向量圖匯出
  - 文字複製
  - 社群分享圖（1200x1200，含浮水印）

- [ ] **多語系支援**
  - 繁體中文（預設）
  - 簡體中文
  - 英文
  - 語言切換即時生效
  - AI 解析多語系回應

---

## 前端技術規格

### 2.1 專案結構

```
bazi-frontend/
├── public/
│   └── index.html
├── src/
│   ├── assets/          # 靜態資源
│   │   ├── images/
│   │   └── styles/
│   ├── components/      # 元件
│   │   ├── common/      # 通用元件
│   │   │   ├── DatePicker.vue
│   │   │   ├── LoadingSpinner.vue
│   │   │   └── Modal.vue
│   │   ├── bazi/        # 八字相關元件
│   │   │   ├── BaziInput.vue
│   │   │   ├── BaziChart.vue
│   │   │   ├── WuXingAnalysis.vue
│   │   │   ├── ShiShenTable.vue
│   │   │   └── DayunDisplay.vue
│   │   └── ziwei/       # 紫微相關元件
│   │       ├── ZiweiInput.vue
│   │       ├── ZiweiPalace.vue
│   │       ├── ZiweiChartGrid.vue    # 方格盤
│   │       ├── ZiweiChartCircle.vue  # 圓盤
│   │       ├── StarDisplay.vue
│   │       ├── StarIcon.vue          # 星曜圖示
│   │       ├── SiHuaAnalysis.vue
│   │       ├── PalaceTable.vue       # 宮位表格
│   │       ├── AnnualForecast.vue    # 流年表
│   │       └── ChartExporter.vue     # 匯出功能
│   ├── views/           # 頁面視圖
│   │   ├── HomePage.vue
│   │   ├── BaziPage.vue
│   │   ├── ZiweiPage.vue
│   │   ├── AIAnalysisPage.vue
│   │   └── HistoryPage.vue
│   ├── stores/          # Pinia 狀態管理
│   │   ├── userInput.js
│   │   ├── baziData.js
│   │   ├── ziweiData.js
│   │   ├── aiAnalysis.js
│   │   └── history.js
│   ├── services/        # API 服務
│   │   ├── api.js
│   │   ├── baziService.js
│   │   ├── ziweiService.js
│   │   └── aiService.js
│   ├── utils/           # 工具函數
│   │   ├── calendar.js      # 曆法轉換
│   │   ├── baziCalculator.js # 八字計算
│   │   ├── ziweiCalculator.js # 紫微計算
│   │   ├── chartRenderer.js  # 命盤繪製
│   │   ├── imageExporter.js  # 圖片匯出
│   │   ├── constants.js     # 常數定義
│   │   └── validators.js    # 驗證函數
│   ├── i18n/            # 多語系
│   │   ├── index.js
│   │   └── locales/
│   │       ├── zh-TW.json
│   │       ├── zh-CN.json
│   │       └── en-US.json
│   ├── router/
│   │   └── index.js
│   ├── App.vue
│   └── main.js
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

### 2.2 Pinia Store 規格

#### userInput Store
```javascript
{
  state: {
    dateType: 'solar', // 'solar' | 'lunar'
    birthDate: {
      year: null,
      month: null,
      day: null,
      hour: null,
      minute: null,
      isLeapMonth: false // 僅農曆
    },
    timezone: 'Asia/Taipei',
    gender: null // 'male' | 'female'
  },
  actions: {
    setDateType(),
    updateBirthDate(),
    convertCalendar(),
    reset()
  }
}
```

#### baziData Store
```javascript
{
  state: {
    pillars: {
      year: { heavenlyStem: '', earthlyBranch: '' },
      month: { heavenlyStem: '', earthlyBranch: '' },
      day: { heavenlyStem: '', earthlyBranch: '' },
      hour: { heavenlyStem: '', earthlyBranch: '' }
    },
    wuxing: {
      metal: 0, wood: 0, water: 0, fire: 0, earth: 0
    },
    shishen: {},
    dayun: [],
    liunian: []
  },
  actions: {
    calculateBazi(),
    analyzeWuxing(),
    calculateShishen(),
    generateDayun()
  }
}
```

#### ziweiData Store
```javascript
{
  state: {
    palaces: [], // 12宮位資料
    mainStars: [], // 主星配置
    minorStars: [], // 輔星配置
    sihua: {
      lu: null,
      quan: null,
      ke: null,
      ji: null
    },
    daxian: [],
    liunian: []
  },
  actions: {
    calculateZiwei(),
    arrangePalaces(),
    placeStars(),
    calculateSihua()
  }
}
```

#### aiAnalysis Store
```javascript
{
  state: {
    isLoading: false,
    analysisType: null, // 'bazi' | 'ziwei' | 'comprehensive'
    prompt: '',
    response: {
      general: '',
      personality: '',
      career: '',
      wealth: '',
      relationship: '',
      health: '',
      suggestions: []
    },
    error: null
  },
  actions: {
    requestAnalysis(),
    clearAnalysis(),
    retryAnalysis()
  }
}
```

#### history Store
```javascript
{
  state: {
    records: [] // { id, name, birthDate, type, createdAt, notes }
  },
  actions: {
    addRecord(),
    loadRecord(),
    deleteRecord(),
    updateNotes(),
    clearHistory()
  },
  persist: true // 使用 pinia-plugin-persistedstate
}
```

### 2.3 UI/UX 設計規範

#### 色彩系統（五行配色）
```javascript
// tailwind.config.js 擴展
colors: {
  wuxing: {
    metal: '#E8E8E8',   // 金 - 白/銀
    wood: '#4CAF50',    // 木 - 綠
    water: '#2196F3',   // 水 - 藍
    fire: '#F44336',    // 火 - 紅
    earth: '#795548'    // 土 - 棕
  },
  palace: {
    life: '#9C27B0',    // 命宮 - 紫
    sibling: '#FF9800', // 兄弟宮 - 橙
    spouse: '#E91E63',  // 夫妻宮 - 粉
    // ... 其他宮位
  }
}
```

#### 響應式設計斷點
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

#### 關鍵頁面佈局

**首頁 (HomePage.vue)**
- Hero Section：簡介與快速開始
- 功能選擇：八字 / 紫微 / AI 解析
- 最近記錄快速訪問

**八字頁面 (BaziPage.vue)**
- 左側：日期輸入區
- 中央：八字命盤展示（四柱）
- 右側：五行分析、十神、大運

**紫微頁面 (ZiweiPage.vue)**
- 上方：日期輸入 + 佈局切換（方格盤/圓盤）
- 中央：12宮位互動式展示
  - 方格盤：4x3網格佈局
  - 圓盤：360度圓形排列
  - 懸停效果：宮位放大、詳情顯示
- 右側：星曜圖例、四化分析
- 下方：四種表格（宮位總覽、主星特質、流年運勢、四化速查）
- 底部：匯出按鈕（PDF/圖片/SVG）

**AI 解析頁面 (AIAnalysisPage.vue)**
- 命盤摘要（可折疊）
- 解析類型選擇
- AI 生成內容展示（支援 Markdown）
- 重新生成 / 匯出按鈕

---

## 後端技術規格

### 3.1 專案結構（Python）

```
bazi-backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI 應用入口
│   ├── config.py            # 配置管理
│   ├── models/              # 資料模型
│   │   ├── __init__.py
│   │   ├── bazi.py
│   │   ├── ziwei.py
│   │   └── schemas.py       # Pydantic 模型
│   ├── services/            # 業務邏輯
│   │   ├── __init__.py
│   │   ├── calendar_service.py
│   │   ├── bazi_service.py
│   │   ├── ziwei_service.py
│   │   └── ai_service.py
│   ├── calculators/         # 核心計算邏輯
│   │   ├── __init__.py
│   │   ├── ganzhi.py        # 干支計算
│   │   ├── wuxing.py        # 五行計算
│   │   ├── shishen.py       # 十神計算
│   │   ├── ziwei_stars.py   # 紫微星曜
│   │   └── sihua.py         # 四化計算
│   ├── api/                 # API 路由
│   │   ├── __init__.py
│   │   ├── v1/
│   │   │   ├── __init__.py
│   │   │   ├── calendar.py
│   │   │   ├── bazi.py
│   │   │   ├── ziwei.py
│   │   │   └── ai.py
│   ├── utils/               # 工具函數
│   │   ├── __init__.py
│   │   ├── lunar_calendar.py
│   │   └── constants.py
│   └── middleware/
│       ├── __init__.py
│       └── cors.py
├── tests/
│   ├── test_bazi.py
│   ├── test_ziwei.py
│   └── test_calendar.py
├── requirements.txt
├── .env.example
└── README.md
```

### 3.2 API 端點規格

#### 曆法轉換 API

**POST /api/v1/calendar/solar-to-lunar**
```json
Request:
{
  "year": 1990,
  "month": 1,
  "day": 15,
  "hour": 14,
  "minute": 30
}

Response:
{
  "lunar": {
    "year": 1989,
    "month": 12,
    "day": 19,
    "isLeapMonth": false,
    "ganzhiYear": "己巳",
    "ganzhiMonth": "丁丑",
    "ganzhiDay": "戊子"
  },
  "solar": {
    "year": 1990,
    "month": 1,
    "day": 15
  }
}
```

**POST /api/v1/calendar/lunar-to-solar**
```json
Request:
{
  "year": 1989,
  "month": 12,
  "day": 19,
  "isLeapMonth": false
}

Response:
{
  "solar": {
    "year": 1990,
    "month": 1,
    "day": 15
  },
  "lunar": {
    "year": 1989,
    "month": 12,
    "day": 19,
    "isLeapMonth": false
  }
}
```

#### 八字計算 API

**POST /api/v1/bazi/calculate**
```json
Request:
{
  "birthDate": {
    "year": 1990,
    "month": 1,
    "day": 15,
    "hour": 14,
    "minute": 30
  },
  "gender": "male",
  "timezone": "Asia/Taipei",
  "dateType": "solar"
}

Response:
{
  "pillars": {
    "year": {
      "heavenlyStem": "己",
      "earthlyBranch": "巳",
      "nayin": "大林木",
      "hidden": ["戊", "庚", "丙"]
    },
    "month": {
      "heavenlyStem": "丁",
      "earthlyBranch": "丑",
      "nayin": "澗下水",
      "hidden": ["己", "癸", "辛"]
    },
    "day": {
      "heavenlyStem": "戊",
      "earthlyBranch": "子",
      "nayin": "霹靂火",
      "hidden": ["癸"]
    },
    "hour": {
      "heavenlyStem": "己",
      "earthlyBranch": "未",
      "nayin": "天上火",
      "hidden": ["己", "丁", "乙"]
    }
  },
  "wuxing": {
    "distribution": {
      "metal": 1,
      "wood": 1,
      "water": 2,
      "fire": 2,
      "earth": 2
    },
    "strength": {
      "metal": "weak",
      "wood": "weak",
      "water": "medium",
      "fire": "medium",
      "earth": "strong"
    },
    "yongshen": "金",
    "xishen": "水",
    "jishen": "火"
  },
  "shishen": {
    "year": ["偏印", "七殺"],
    "month": ["傷官", "正財"],
    "day": ["日主", "正財"],
    "hour": ["劫財", "比肩"]
  },
  "dayun": [
    {
      "age": 8,
      "startYear": 1998,
      "endYear": 2007,
      "heavenlyStem": "戊",
      "earthlyBranch": "寅",
      "description": "正印大運"
    }
    // ... 更多大運
  ],
  "specialPatterns": ["身強財旺", "食神生財"],
  "metadata": {
    "calculatedAt": "2025-11-29T10:00:00Z",
    "solarDate": "1990-01-15",
    "lunarDate": "1989-12-19"
  }
}
```

#### 紫微斗數 API

**POST /api/v1/ziwei/calculate**
```json
Request:
{
  "birthDate": {
    "year": 1990,
    "month": 1,
    "day": 15,
    "hour": 14,
    "minute": 30
  },
  "gender": "male",
  "dateType": "solar"
}

Response:
{
  "palaces": [
    {
      "name": "命宮",
      "position": 1,
      "heavenlyStem": "甲",
      "earthlyBranch": "子",
      "mainStars": ["紫微", "天府"],
      "minorStars": ["文昌", "左輔"],
      "shaStars": [],
      "sihua": {
        "lu": false,
        "quan": true,
        "ke": false,
        "ji": false
      },
      "brightness": "廟",
      "description": "命宮在子位，紫微天府同宮，為帝座格"
    }
    // ... 其他11宮
  ],
  "mingzhu": {
    "palace": "命宮",
    "position": 1
  },
  "shenzhu": {
    "palace": "遷移宮",
    "position": 7
  },
  "sihua": {
    "nian": {
      "lu": "廉貞",
      "quan": "破軍",
      "ke": "武曲",
      "ji": "太陽"
    },
    "daxian": {},
    "liunian": {}
  },
  "daxian": [
    {
      "age": "10-19",
      "palace": "兄弟宮",
      "heavenlyStem": "乙",
      "earthlyBranch": "丑"
    }
    // ... 更多大限
  ],
  "specialPatterns": ["紫府同宮", "君臣慶會"],
  "metadata": {
    "calculatedAt": "2025-11-29T10:00:00Z",
    "solarDate": "1990-01-15",
    "lunarDate": "1989-12-19"
  }
}
```

#### AI 解析 API

**POST /api/v1/ai/analyze**
```json
Request:
{
  "type": "bazi", // "bazi" | "ziwei" | "comprehensive"
  "data": {
    // 八字或紫微的完整計算結果
  },
  "focus": ["career", "wealth"], // 可選：特定關注面向
  "additionalContext": "最近想要轉職", // 可選：額外資訊
  "aiProvider": "openai", // "openai" | "claude" | "custom"
  "model": "gpt-4" // 可選：指定模型
}

Response:
{
  "analysis": {
    "general": "整體命格分析...",
    "personality": "性格特質分析...",
    "career": "事業運勢與建議...",
    "wealth": "財運分析...",
    "relationship": "感情婚姻分析...",
    "health": "健康注意事項...",
    "currentYear": "流年運勢...",
    "suggestions": [
      "建議一：...",
      "建議二：..."
    ]
  },
  "metadata": {
    "aiProvider": "openai",
    "model": "gpt-4",
    "tokensUsed": 1500,
    "responseTime": 3.2,
    "generatedAt": "2025-11-29T10:00:00Z"
  }
}
```

### 3.3 核心計算邏輯要點

#### 干支計算
- 使用萬年曆演算法或查表法
- 考慮節氣交接時間（立春定年、月令）
- 真太陽時修正（經度時差）

#### 八字五行計算
- 天干五行：甲乙木、丙丁火、戊己土、庚辛金、壬癸水
- 地支五行及藏干
- 天干通根、地支會合刑沖害

#### 紫微斗數排盤
- 命宮定位：根據生月、生時
- 身宮定位：月系星
- 五虎遁起月、五鼠遁起日、五鼠遁起時
- 14主星安星法則
- 輔星、煞星、雜曜安置

#### AI Prompt 設計範例

```python
# bazi_prompt_template.py

def generate_bazi_prompt(bazi_data, user_context=None):
    prompt = f"""
你是一位專業的命理師，精通八字命理學。請根據以下八字資料進行詳細分析：

【基本資料】
出生時間：{bazi_data['metadata']['solarDate']} ({bazi_data['metadata']['lunarDate']})
性別：{bazi_data['gender']}

【八字四柱】
年柱：{bazi_data['pillars']['year']['heavenlyStem']}{bazi_data['pillars']['year']['earthlyBranch']} ({bazi_data['pillars']['year']['nayin']})
月柱：{bazi_data['pillars']['month']['heavenlyStem']}{bazi_data['pillars']['month']['earthlyBranch']} ({bazi_data['pillars']['month']['nayin']})
日柱：{bazi_data['pillars']['day']['heavenlyStem']}{bazi_data['pillars']['day']['earthlyBranch']} ({bazi_data['pillars']['day']['nayin']})
時柱：{bazi_data['pillars']['hour']['heavenlyStem']}{bazi_data['pillars']['hour']['earthlyBranch']} ({bazi_data['pillars']['hour']['nayin']})

【五行分析】
金:{bazi_data['wuxing']['distribution']['metal']}
木:{bazi_data['wuxing']['distribution']['wood']}
水:{bazi_data['wuxing']['distribution']['water']}
火:{bazi_data['wuxing']['distribution']['fire']}
土:{bazi_data['wuxing']['distribution']['earth']}

用神：{bazi_data['wuxing']['yongshen']}
喜神：{bazi_data['wuxing']['xishen']}

【格局特點】
{', '.join(bazi_data['specialPatterns'])}

{f"【補充資訊】{user_context}" if user_context else ""}

請從以下方面進行分析：
1. 整體命格評價與特色
2. 性格特質分析
3. 事業發展方向與建議
4. 財運狀況
5. 感情婚姻
6. 健康注意事項
7. 今年運勢重點
8. 具體建議（3-5條）

請使用專業但易懂的語言，避免過於艱澀的術語。分析要客觀中肯，既指出優勢也提醒注意事項。
"""
    return prompt
```

### 3.4 Python 依賴套件

```txt
# requirements.txt

# Web Framework
fastapi==0.104.1
uvicorn[standard]==0.24.0
pydantic==2.5.0
pydantic-settings==2.1.0

# CORS
fastapi-cors==0.0.6

# AI API Clients
openai==1.3.0
anthropic==0.7.0

# 曆法計算
cnlunar==0.1.4
python-dateutil==2.8.2
pytz==2023.3

# 工具庫
python-dotenv==1.0.0
httpx==0.25.0

# 測試
pytest==7.4.3
pytest-asyncio==0.21.1

# 資料驗證
python-multipart==0.0.6
email-validator==2.1.0
```

---

## AI 整合規格

### 4.1 支援的 AI Provider

| Provider | 模型選項 | 適用場景 | 多語系 |
|----------|---------|---------|--------|
| OpenAI | GPT-4, GPT-3.5-turbo | 通用解析、對話式分析 | ✅ |
| Anthropic | Claude 3 Opus/Sonnet | 深度分析、專業解讀 | ✅ |
| Google Gemini | Gemini Pro, Gemini Flash | 圖像理解、快速分析 | ✅ |
| 自定義 API | 自行部署模型 | 成本控制、隱私需求 | 依模型 |

### 4.2 Prompt 工程策略

#### 結構化輸出
使用 JSON Schema 約束 AI 輸出格式：

```json
{
  "type": "object",
  "properties": {
    "general": {"type": "string"},
    "personality": {"type": "string"},
    "career": {"type": "string"},
    "wealth": {"type": "string"},
    "relationship": {"type": "string"},
    "health": {"type": "string"},
    "suggestions": {
      "type": "array",
      "items": {"type": "string"},
      "minItems": 3,
      "maxItems": 5
    }
  },
  "required": ["general", "suggestions"]
}
```

#### 分段式請求（降低 Token 消耗）
1. 第一階段：基礎命格分析（300 tokens）
2. 第二階段：用戶點選特定面向深入分析（200 tokens/次）

### 4.3 錯誤處理與重試

```python
# 重試邏輯
max_retries = 3
retry_delay = 2  # 秒

# 錯誤類型
- API Key 無效 → 返回 401
- Rate Limit → 等待後重試
- Timeout → 重試 3 次後失敗
- Invalid Response → 解析錯誤，重新請求
```

---

## 資料常數定義

### 5.1 天干地支

```python
# constants.py

HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

STEM_WUXING = {
    '甲': '木', '乙': '木',
    '丙': '火', '丁': '火',
    '戊': '土', '己': '土',
    '庚': '金', '辛': '金',
    '壬': '水', '癸': '水'
}

BRANCH_WUXING = {
    '寅': '木', '卯': '木',
    '巳': '火', '午': '火',
    '辰': '土', '戌': '土', '丑': '土', '未': '土',
    '申': '金', '酉': '金',
    '子': '水', '亥': '水'
}

# 地支藏干
BRANCH_HIDDEN_STEMS = {
    '子': ['癸'],
    '丑': ['己', '癸', '辛'],
    '寅': ['甲', '丙', '戊'],
    '卯': ['乙'],
    '辰': ['戊', '乙', '癸'],
    '巳': ['丙', '戊', '庚'],
    '午': ['丁', '己'],
    '未': ['己', '丁', '乙'],
    '申': ['庚', '壬', '戊'],
    '酉': ['辛'],
    '戌': ['戊', '辛', '丁'],
    '亥': ['壬', '甲']
}
```

### 5.2 紫微斗數星曜

```python
# 14 主星
MAIN_STARS = [
    '紫微', '天機', '太陽', '武曲', '天同', '廉貞', '天府',
    '太陰', '貪狼', '巨門', '天相', '天梁', '七殺', '破軍'
]

# 輔星
ASSISTANT_STARS = [
    '左輔', '右弼', '文昌', '文曲', '天魁', '天鉞',
    '祿存', '天馬', '化祿', '化權', '化科', '化忌'
]

# 煞星
SHA_STARS = [
    '擎羊', '陀羅', '火星', '鈴星', '地空', '地劫'
]

# 十二宮位
TWELVE_PALACES = [
    '命宮', '兄弟宮', '夫妻宮', '子女宮', '財帛宮', '疾厄宮',
    '遷移宮', '交友宮', '事業宮', '田宅宮', '福德宮', '父母宮'
]
```

---

## 開發階段規劃

### Phase 1: 基礎建設（2-3 週）
- [ ] 專案初始化（Vue 3 + Vite + Tailwind）
- [ ] 路由與基礎佈局
- [ ] Pinia Stores 架構
- [ ] 曆法轉換功能（前端 + 後端）
- [ ] 基礎 UI 元件庫

### Phase 2: 八字模組（3-4 週）
- [ ] 八字計算核心演算法
- [ ] 四柱八字展示 UI
- [ ] 五行分析視覺化
- [ ] 十神、大運計算
- [ ] 後端 API 開發

### Phase 3: 紫微模組（3-4 週）
- [ ] 紫微排盤演算法
- [ ] 12 宮位佈局 UI
- [ ] 星曜安置邏輯
- [ ] 四化計算
- [ ] 後端 API 開發

### Phase 4: AI 整合（2 週）
- [ ] OpenAI/Claude API 整合
- [ ] Prompt 設計與優化
- [ ] 結果解析與展示
- [ ] 錯誤處理

### Phase 5: 進階功能（2 週）
- [ ] 歷史記錄功能
- [ ] 命盤對比
- [ ] PDF/圖片匯出
- [ ] 響應式優化

### Phase 6: 測試與上線（1-2 週）
- [ ] 單元測試
- [ ] E2E 測試
- [ ] 效能優化
- [ ] 部署與 CI/CD

---

## 測試策略

### 前端測試
- **單元測試**: Vitest
  - Utils 函數測試（曆法轉換、計算邏輯）
  - Store Actions 測試

- **元件測試**: Vue Test Utils
  - 關鍵元件互動測試

- **E2E 測試**: Playwright
  - 完整流程測試（輸入 → 計算 → AI 解析）

### 後端測試
- **單元測試**: pytest
  - 計算邏輯準確性
  - API 端點回應

- **整合測試**
  - 資料庫操作（如有）
  - 外部 API 呼叫（Mock）

### 測試案例範例

```python
# test_bazi.py
def test_bazi_calculation_1990_01_15():
    result = calculate_bazi(
        year=1990, month=1, day=15, hour=14, minute=30
    )
    assert result['pillars']['year']['heavenlyStem'] == '己'
    assert result['pillars']['year']['earthlyBranch'] == '巳'
    assert result['wuxing']['distribution']['wood'] == 1
```

---

## 部署架構

### 建議部署方案

**方案一：全棧部署（簡單）**
- Frontend: Vercel / Netlify
- Backend: Railway / Render
- 優點：快速上線、免費額度
- 缺點：冷啟動延遲

**方案二：雲端部署（專業）**
- Frontend: AWS S3 + CloudFront
- Backend: AWS EC2 / GCP Cloud Run
- Database: (如需) PostgreSQL on RDS
- 優點：可擴展、效能佳
- 缺點：成本較高

### 環境變數配置

```bash
# Frontend (.env)
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_AI_PROVIDER=openai

# Backend (.env)
OPENAI_API_KEY=sk-xxx
ANTHROPIC_API_KEY=sk-ant-xxx
CORS_ORIGINS=https://yourdomain.com
DATABASE_URL=postgresql://user:pass@host:5432/db
```

---

## 安全性考量

1. **API Key 保護**
   - 後端環境變數儲存
   - 前端絕不暴露 Key

2. **Rate Limiting**
   - 限制 API 請求頻率
   - 防止濫用

3. **輸入驗證**
   - 日期範圍檢查
   - 防止 SQL Injection（如有資料庫）

4. **HTTPS**
   - 強制使用加密連線

---

## 效能優化

1. **前端**
   - 路由懶加載
   - 圖片壓縮與 CDN
   - Tailwind CSS Purge

2. **後端**
   - 計算結果快取（Redis）
   - API 回應壓縮 (gzip)

3. **AI 請求**
   - Streaming 回應（打字機效果）
   - 分段請求降低延遲

---

## 未來擴展功能

- [x] ~~多語言支援（英文、繁中、簡中）~~ → 已納入核心功能
- [x] ~~星盤圖片生成與匯出~~ → 已納入核心功能
- [ ] 使用者帳號系統（儲存多個命盤）
- [ ] 合婚分析專項功能（雙人命盤對比）
- [ ] 流月、流日精細分析
- [ ] 擇日功能（選擇吉日良辰）
- [ ] 手機 App (React Native / Flutter)
- [ ] 付費進階解析（更深入的 AI 分析）
- [ ] 社群功能（命盤分享、討論區）
- [ ] 命理師認證系統
- [ ] 即時通訊諮詢

---

## 參考資料與工具

### 命理演算法參考
- 《子平真詮》、《淵海子平》
- 《紫微斗數全書》
- 開源專案：lunar-calendar, chinese-calendar

### 開發工具
- VS Code + Volar
- Postman / Bruno (API 測試)
- Figma (UI 設計)

### AI Prompt 參考
- OpenAI Cookbook
- Anthropic Prompt Library

---

## 附錄

### A. 名詞解釋
- **天干**: 甲乙丙丁戊己庚辛壬癸
- **地支**: 子丑寅卯辰巳午未申酉戌亥
- **納音**: 六十甲子納音五行
- **用神**: 八字中最需要的五行
- **四化**: 紫微斗數中的化祿、化權、化科、化忌

### B. 聯絡與支援
- 專案 GitHub: (待建立)
- 問題回報: Issues
- 貢獻指南: CONTRIBUTING.md

---

**文件版本**: v1.0
**最後更新**: 2025-11-29
**維護者**: [Your Name]
