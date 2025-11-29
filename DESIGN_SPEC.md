# 紫微命盤視覺化設計規格書
## Ziwei Chart Visualization & Design Specification

---

## 📊 紫微斗數可預測的生活面向

紫微斗數透過十二宮位系統，可以提供以下生活面向的深入洞察：

### 1. **事業發展 (Career Development)**
- **對應宮位**: 事業宮、官祿宮
- **分析內容**:
  - 適合的職業類型（技術、管理、創意、銷售等）
  - 事業發展時機與高峰期
  - 職場人際關係與貴人運
  - 創業適性與風險評估
  - 升遷運勢與時機點
  - 工作環境偏好（大企業 vs 創業）

### 2. **財富運勢 (Wealth & Fortune)**
- **對應宮位**: 財帛宮
- **分析內容**:
  - 財富累積能力與方式
  - 正財運（薪資、穩定收入）
  - 偏財運（投資、意外之財）
  - 理財能力與投資傾向
  - 破財風險與時間點
  - 適合的賺錢方式（勞力、智力、資本）

### 3. **感情婚姻 (Love & Marriage)**
- **對應宮位**: 夫妻宮、福德宮
- **分析內容**:
  - 感情模式與戀愛觀
  - 配偶特質與外貌傾向
  - 婚姻運勢與結婚時機
  - 感情穩定度與桃花運
  - 婚後相處模式
  - 感情危機與化解方法

### 4. **健康狀況 (Health & Wellness)**
- **對應宮位**: 疾厄宮
- **分析內容**:
  - 先天體質與易患疾病
  - 身體弱點器官系統
  - 意外傷害風險
  - 健康低谷時期預警
  - 適合的養生方式
  - 心理健康狀態

### 5. **家庭關係 (Family Relationships)**
- **對應宮位**: 父母宮、子女宮、兄弟宮、田宅宮
- **分析內容**:
  - 與父母的關係與緣分
  - 子女運勢與教育
  - 兄弟姊妹互動
  - 家庭和諧度
  - 居住環境與不動產運
  - 家族遺產狀況

### 6. **教育與學習 (Education & Learning)**
- **對應宮位**: 文昌文曲星、命宮
- **分析內容**:
  - 學習能力與天賦
  - 適合的學習領域
  - 考試運勢與學業表現
  - 深造機會與留學運
  - 學歷發展潛力
  - 專業技能培養方向

### 7. **人際社交 (Social Relationships)**
- **對應宮位**: 交友宮、遷移宮
- **分析內容**:
  - 社交能力與人脈品質
  - 貴人運與小人運
  - 朋友類型與互動模式
  - 團隊合作能力
  - 異地發展機會
  - 出國運與移居適性

### 8. **個人成長 (Personal Growth)**
- **對應宮位**: 命宮、福德宮
- **分析內容**:
  - 性格特質與優缺點
  - 人生使命與價值觀
  - 精神層面發展
  - 興趣愛好傾向
  - 內在修養與智慧成長
  - 人生轉折點與關鍵決策時機

### 9. **流年運勢 (Annual Forecast)**
- **分析內容**:
  - 每年運勢起伏
  - 重大事件預警
  - 吉凶時機把握
  - 各面向年度展望
  - 趨吉避凶建議

### 10. **大限運程 (10-Year Cycle)**
- **分析內容**:
  - 每十年人生主題
  - 長期發展趨勢
  - 人生階段性任務
  - 大限宮位影響力

---

## 🎨 紫微命盤視覺化設計

### 設計方案一：傳統方格盤式 (Grid Layout)

```
┌─────────┬─────────┬─────────┬─────────┐
│   巳    │   午    │   未    │   申    │
│  父母宮  │  福德宮  │  田宅宮  │  事業宮  │
│  紫微   │  天機   │         │  太陽   │
│  天府   │  左輔   │         │  文昌   │
├─────────┼─────────┴─────────┼─────────┤
│   辰    │                   │   酉    │
│  兄弟宮  │                   │  交友宮  │
│  武曲   │    紫微命盤圖      │  巨門   │
│         │                   │  天魁   │
├─────────┤                   ├─────────┤
│   卯    │                   │   戌    │
│  夫妻宮  │                   │  遷移宮  │
│  天同   │                   │  天相   │
│  右弼   │                   │  祿存   │
├─────────┼─────────┬─────────┼─────────┤
│   寅    │   丑    │   子    │   亥    │
│  子女宮  │  財帛宮  │  疾厄宮  │ ★命宮  │
│  廉貞   │  天梁   │  七殺   │  貪狼   │
│  陀羅   │         │  地劫   │  化祿   │
└─────────┴─────────┴─────────┴─────────┘
```

#### 設計規格：
- **佈局**: 4x3 網格（共12宮位）
- **每個宮位顯示**:
  - 宮位名稱（中英雙語）
  - 地支位置
  - 主星列表（最多2-3顆）
  - 輔星、煞星（小圖示）
  - 四化標記（祿、權、科、忌）
  - 宮位五行顏色邊框

- **顏色編碼**:
  ```css
  命宮: #9C27B0 (紫色) - 主角光環
  財帛宮: #FFD700 (金色) - 財富
  事業宮: #1976D2 (藍色) - 穩重
  夫妻宮: #E91E63 (粉紅) - 愛情
  健康宮: #4CAF50 (綠色) - 健康
  遷移宮: #FF9800 (橙色) - 動態
  ```

- **星曜圖示設計**:
  - 主星：大圓形圖標，星星符號
  - 輔星：小菱形圖標
  - 煞星：三角形警告標誌
  - 四化：特殊光暈效果

### 設計方案二：圓盤式 (Circular Layout)

```
                  午 (福德宮)
                    天機
        未 (田宅宮)         巳 (父母宮)
                             紫微
    申 (事業宮)                   辰 (兄弟宮)
      太陽                           武曲

  酉 (交友宮)                         卯 (夫妻宮)
    巨門              中心              天同
                    命主資訊

  戌 (遷移宮)                         寅 (子女宮)
    天相                              廉貞

    亥 (命宮)                   丑 (財帛宮)
      貪狼★                        天梁
        子 (疾厄宮)
          七殺
```

#### 設計規格：
- **佈局**: 360度圓形排列，每宮30度
- **中心區域**: 顯示命主基本資訊
  - 姓名/代號
  - 出生日期
  - 命宮主星
  - 整體命格評級（S/A/B/C）

- **交互功能**:
  - 滑鼠懸停：放大該宮位，顯示詳細資訊
  - 點擊宮位：開啟浮動面板顯示完整分析
  - 旋轉功能：可旋轉圓盤查看

---

## 📋 表格展示設計

### 表格一：十二宮位總覽表

| 宮位 | 位置 | 主星 | 輔星 | 煞星 | 四化 | 廟旺平陷 | 宮位強度 | 重點提示 |
|------|------|------|------|------|------|----------|----------|----------|
| 命宮 ★ | 亥 | 貪狼 | 文昌、左輔 | - | 化祿 | 廟 | ⭐⭐⭐⭐⭐ | 桃花重，創意佳 |
| 兄弟宮 | 辰 | 武曲 | - | 擎羊 | - | 旺 | ⭐⭐⭐ | 兄弟少或緣薄 |
| 夫妻宮 | 卯 | 天同 | 右弼 | - | 化權 | 平 | ⭐⭐⭐⭐ | 配偶溫柔體貼 |
| 子女宮 | 寅 | 廉貞 | - | 陀羅 | - | 陷 | ⭐⭐ | 子女個性強 |
| 財帛宮 | 丑 | 天梁 | 天魁 | - | - | 廟 | ⭐⭐⭐⭐ | 理財穩健 |
| 疾厄宮 | 子 | 七殺 | - | 地劫 | - | 平 | ⭐⭐ | 注意筋骨、意外 |
| 遷移宮 | 戌 | 天相 | 祿存 | - | - | 旺 | ⭐⭐⭐⭐⭐ | 出外得利 |
| 交友宮 | 酉 | 巨門 | - | 火星 | 化忌 | 陷 | ⭐ | 口舌是非多 |
| 事業宮 | 申 | 太陽 | 文曲 | - | 化科 | 旺 | ⭐⭐⭐⭐⭐ | 事業光明 |
| 田宅宮 | 未 | - | 天馬 | - | - | - | ⭐⭐⭐ | 多次搬遷 |
| 福德宮 | 午 | 天機 | - | - | - | 廟 | ⭐⭐⭐⭐ | 思慮周密 |
| 父母宮 | 巳 | 紫微、天府 | 天鉞 | - | - | 廟 | ⭐⭐⭐⭐⭐ | 父母地位高 |

**表格特色**:
- ★ 標記命宮位置
- 星級評分（1-5星）
- 顏色編碼：綠色（強）、黃色（中）、紅色（弱）
- 可排序、篩選功能
- 點擊行展開詳細解析

### 表格二：主星特質對照表

| 主星 | 五行 | 性格關鍵詞 | 職業傾向 | 感情特質 | 財運類型 | 健康注意 |
|------|------|-----------|----------|----------|----------|----------|
| 紫微 | 土 | 領導、尊貴、自尊 | 管理、政治、決策 | 要求高、需尊重 | 正財、權力財 | 脾胃、高血壓 |
| 天機 | 木 | 智慧、機巧、善變 | 策劃、技術、設計 | 善變、理性 | 智慧財、投資 | 神經、失眠 |
| 太陽 | 火 | 光明、熱情、外向 | 公眾、教育、領導 | 熱情、主動 | 名氣財、事業 | 眼睛、心臟 |
| 武曲 | 金 | 剛毅、財星、果斷 | 財務、軍警、技術 | 直接、不浪漫 | 財務、武市 | 呼吸、肺部 |
| 天同 | 水 | 溫和、享樂、懶散 | 服務、娛樂、藝術 | 溫柔、被動 | 偏財、享受財 | 腎臟、泌尿 |
| 廉貞 | 火 | 熱情、桃花、變動 | 公關、娛樂、創意 | 桃花重、多變 | 偏財、娛樂財 | 心血管、婦科 |
| 天府 | 土 | 穩重、保守、財庫 | 金融、管理、守成 | 穩定、務實 | 正財、積累財 | 脾胃、糖尿病 |
| 太陰 | 水 | 柔順、內斂、母性 | 策劃、幕後、照護 | 體貼、重情 | 不動產、穩健財 | 婦科、眼睛 |
| 貪狼 | 水/木 | 慾望、桃花、多才 | 娛樂、交際、業務 | 桃花旺、善交際 | 偏財、投機財 | 肝膽、性病 |
| 巨門 | 水 | 口才、是非、深思 | 法律、傳媒、教育 | 多疑、口舌 | 口才財、辛苦財 | 口腔、腸胃 |
| 天相 | 水 | 協調、印星、隨和 | 行政、服務、協調 | 和平、重形象 | 正財、服務財 | 皮膚、腎臟 |
| 天梁 | 土 | 蔭星、清高、長輩 | 醫療、教育、公職 | 晚婚、穩重 | 正財、專業財 | 頭部、神經 |
| 七殺 | 金 | 剛烈、冒險、孤獨 | 軍警、技術、競爭 | 冷漠、獨立 | 武市、冒險財 | 意外、筋骨 |
| 破軍 | 水 | 破壞、創新、變動 | 創業、改革、技術 | 變動大、刺激 | 投機財、變動財 | 意外、泌尿 |

### 表格三：流年運勢表（2024-2033）

| 年份 | 歲數 | 流年宮位 | 主要星曜 | 整體運勢 | 事業 | 財運 | 感情 | 健康 | 重點事件預測 |
|------|------|----------|----------|----------|------|------|------|------|-------------|
| 2024 | 34 | 命宮 | 貪狼化祿 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | 財運極佳、桃花旺、新機會 |
| 2025 | 35 | 兄弟宮 | 武曲化權 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | 事業突破、權力提升 |
| 2026 | 36 | 夫妻宮 | 天同化科 | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 婚姻美滿、感情穩定 |
| 2027 | 37 | 子女宮 | 廉貞化忌 | ⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐⭐ | 子女問題、感情波折 |
| 2028 | 38 | 財帛宮 | 天梁入廟 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | 財運亨通、穩健成長 |
| 2029 | 39 | 疾厄宮 | 七殺地劫 | ⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐ | 注意健康、避免意外 |
| 2030 | 40 | 遷移宮 | 天相祿存 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | 外出得利、遠方貴人 |
| 2031 | 41 | 交友宮 | 巨門化忌 | ⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | 人際紛爭、口舌是非 |
| 2032 | 42 | 事業宮 | 太陽化科 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 事業巔峰、名聲大噪 |
| 2033 | 43 | 田宅宮 | 天馬星動 | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | 搬家、不動產變動 |

**互動功能**:
- 懸停顯示當年詳細分析
- 點擊年份跳轉到詳細解析頁
- 篩選特定運勢類型（事業/財運/感情）
- 圖表化趨勢線

### 表格四：四化飛星速查表

| 天干 | 化祿 | 化權 | 化科 | 化忌 |
|------|------|------|------|------|
| 甲 | 廉貞 | 破軍 | 武曲 | 太陽 |
| 乙 | 天機 | 天梁 | 紫微 | 太陰 |
| 丙 | 天同 | 天機 | 文昌 | 廉貞 |
| 丁 | 太陰 | 天同 | 天機 | 巨門 |
| 戊 | 貪狼 | 太陰 | 右弼 | 天機 |
| 己 | 武曲 | 貪狼 | 天梁 | 文曲 |
| 庚 | 太陽 | 武曲 | 太陰 | 天同 |
| 辛 | 巨門 | 太陽 | 文曲 | 文昌 |
| 壬 | 天梁 | 紫微 | 左輔 | 武曲 |
| 癸 | 破軍 | 巨門 | 太陰 | 貪狼 |

---

## 🖼️ 星盤圖片生成規格

### 技術方案

#### 方案 A：Canvas API（前端生成）
```javascript
// 使用 HTML5 Canvas 繪製命盤
import { fabric } from 'fabric'; // 或使用 Konva.js

const generateZiweiChart = (chartData) => {
  const canvas = new fabric.Canvas('chart', {
    width: 1200,
    height: 1200,
    backgroundColor: '#f5f5f5'
  });

  // 繪製12宮位方格
  drawPalaceGrid(canvas, chartData.palaces);

  // 繪製星曜
  drawStars(canvas, chartData.stars);

  // 繪製四化標記
  drawSihua(canvas, chartData.sihua);

  // 匯出為圖片
  return canvas.toDataURL('image/png');
};
```

**優點**: 即時生成、無需後端、客戶端處理
**缺點**: 複雜圖形效能考量

#### 方案 B：SVG 轉圖片
```vue
<template>
  <div id="chart-svg">
    <svg width="1200" height="1200" xmlns="http://www.w3.org/2000/svg">
      <!-- SVG 繪製命盤 -->
      <g v-for="palace in palaces" :key="palace.id">
        <rect :x="palace.x" :y="palace.y" width="300" height="400" />
        <text>{{ palace.name }}</text>
      </g>
    </svg>
  </div>
</template>

<script>
import html2canvas from 'html2canvas';

const exportChart = async () => {
  const element = document.getElementById('chart-svg');
  const canvas = await html2canvas(element);
  return canvas.toDataURL('image/png');
};
</script>
```

**優點**: 易於維護、可縮放、高品質
**缺點**: 需額外轉換庫

#### 方案 C：後端生成（Python）
```python
# 使用 Pillow + matplotlib
from PIL import Image, ImageDraw, ImageFont
import matplotlib.pyplot as plt

def generate_ziwei_chart(chart_data):
    # 建立畫布
    img = Image.new('RGB', (1200, 1200), color='white')
    draw = ImageDraw.Draw(img)
    font = ImageFont.truetype('NotoSansCJK-Regular.ttf', 24)

    # 繪製宮位
    for palace in chart_data['palaces']:
        draw.rectangle(palace['coords'], outline='black', width=2)
        draw.text(palace['text_pos'], palace['name'], font=font, fill='black')

    # 繪製星曜
    for star in chart_data['stars']:
        draw.ellipse(star['coords'], fill=star['color'])

    # 儲存圖片
    img.save(f'/tmp/ziwei_chart_{chart_data["id"]}.png')
    return img
```

**優點**: 伺服器端統一處理、高品質、可批次生成
**缺點**: 增加後端負擔

### 推薦方案：混合模式
- **前端**: 使用 **Vue + SVG** 即時渲染互動式命盤
- **匯出**: 使用 **html2canvas** 或 **dom-to-image** 轉換成圖片
- **備份**: 後端提供 Python Pillow 高解析度生成 API

### 圖片規格

| 用途 | 尺寸 | 格式 | DPI |
|------|------|------|-----|
| 網頁顯示 | 800x800 | PNG/WebP | 72 |
| 社群分享 | 1200x1200 | PNG | 96 |
| 列印輸出 | 3000x3000 | PNG/PDF | 300 |
| 縮圖預覽 | 300x300 | JPEG | 72 |

### 圖片內容元素

1. **浮水印**: 網站 Logo + URL（半透明）
2. **生成時間**: 右下角時間戳
3. **QR Code**: 可選，連結到線上命盤
4. **配色方案**: 支援亮色/暗色模式切換

---

## 🤖 給 Gemini 的 UI 設計提示詞

```
You are a professional UI/UX designer specializing in traditional Chinese astrology web applications. Please generate a modern, clean design for a Ziwei Doushu (Purple Star Astrology) chart visualization system.

**Design Requirements:**

1. **Layout Type**: Grid-based palace layout (4 columns x 3 rows = 12 palaces)

2. **Color Palette**:
   - Primary: #9C27B0 (Purple) - represents the Life Palace
   - Secondary: #FFD700 (Gold) - represents Wealth
   - Accent: #2196F3 (Blue) - represents Career
   - Background: Gradient from #F5F5F5 to #FFFFFF
   - Use Five Elements colors for highlights:
     * Metal (金): #E8E8E8 (Silver)
     * Wood (木): #4CAF50 (Green)
     * Water (水): #2196F3 (Blue)
     * Fire (火): #F44336 (Red)
     * Earth (土): #795548 (Brown)

3. **Each Palace Card Should Include**:
   - Palace name in Chinese and English (e.g., "命宮 Life Palace")
   - Earthly Branch position (地支: 子丑寅卯...)
   - Main stars with icons (紫微, 天機, 太陽...)
   - Minor stars as small badges
   - Sihua indicators (化祿, 化權, 化科, 化忌) with special glow effects
   - Palace strength rating (1-5 stars)
   - Hover effect: lift card with shadow, show detailed tooltip

4. **Visual Elements**:
   - Use gradients for depth
   - Subtle shadows for card elevation
   - Icon set for 14 main stars (create symbolic representations)
   - Animated transitions when switching between views
   - Responsive design: desktop (grid), tablet (2x6), mobile (scrollable list)

5. **Typography**:
   - Headings: Noto Sans TC (Bold)
   - Body: Noto Sans TC (Regular)
   - Accent: Traditional Chinese calligraphy style for star names

6. **Interactive Features**:
   - Highlight connected palaces on hover
   - Click palace to expand detailed analysis panel
   - Toggle between traditional square layout and modern circular layout
   - Export button with dropdown (PNG, PDF, Print)

7. **Additional Components**:
   - Top navigation: Date input, Calculate button, Language switcher (EN/繁中/简中)
   - Side panel: Personal info, chart summary, AI analysis trigger
   - Bottom panel: Data tables (12 palaces overview, annual forecast)
   - Floating action button: Quick actions (save, share, compare)

8. **Mood & Style**:
   - Modern minimalist meets traditional Chinese aesthetics
   - Use gold accents and purple gradients to evoke mystical/royal feeling
   - Incorporate subtle Chinese patterns (clouds, waves) as background textures
   - Glass morphism effect for cards (semi-transparent with blur)

9. **Accessibility**:
   - High contrast mode toggle
   - Font size adjustment
   - Keyboard navigation support
   - Screen reader friendly labels

10. **Example Components to Design**:
    - Palace card (default state, hover state, selected state)
    - Star icon set (14 main stars)
    - Sihua badge design (4 types)
    - Data table with sortable columns
    - AI analysis result card with markdown support
    - Export modal dialog

Please create a comprehensive design system with:
- Component library (Figma or Sketch format preferred)
- Color palette with hex codes
- Spacing system (8px grid)
- Typography scale
- Icon set
- Interactive prototypes for key user flows

The design should feel trustworthy, professional, yet approachable for users unfamiliar with astrology.
```

---

## 🌍 多語系支援規格

### 支援語言
1. **繁體中文** (zh-TW) - 預設
2. **簡體中文** (zh-CN)
3. **英文** (en-US)

### i18n 實作方案

#### 使用 Vue I18n

```bash
npm install vue-i18n
```

```javascript
// src/i18n/index.js
import { createI18n } from 'vue-i18n';
import zhTW from './locales/zh-TW.json';
import zhCN from './locales/zh-CN.json';
import enUS from './locales/en-US.json';

const i18n = createI18n({
  legacy: false,
  locale: 'zh-TW', // 預設語言
  fallbackLocale: 'zh-TW',
  messages: {
    'zh-TW': zhTW,
    'zh-CN': zhCN,
    'en-US': enUS
  }
});

export default i18n;
```

### 翻譯檔案結構

```json
// locales/zh-TW.json
{
  "common": {
    "appName": "紫微命盤解析",
    "calculate": "開始計算",
    "export": "匯出",
    "save": "儲存",
    "share": "分享",
    "loading": "計算中...",
    "error": "發生錯誤"
  },
  "palaces": {
    "life": "命宮",
    "sibling": "兄弟宮",
    "spouse": "夫妻宮",
    "children": "子女宮",
    "wealth": "財帛宮",
    "health": "疾厄宮",
    "travel": "遷移宮",
    "friends": "交友宮",
    "career": "事業宮",
    "property": "田宅宮",
    "fortune": "福德宮",
    "parents": "父母宮"
  },
  "stars": {
    "ziwei": "紫微",
    "tianji": "天機",
    "taiyang": "太陽",
    "wuqu": "武曲",
    "tiantong": "天同",
    "lianzhen": "廉貞",
    "tianfu": "天府",
    "taiyin": "太陰",
    "tanlang": "貪狼",
    "jumen": "巨門",
    "tianxiang": "天相",
    "tianliang": "天梁",
    "qisha": "七殺",
    "pojun": "破軍"
  },
  "analysis": {
    "general": "整體分析",
    "personality": "性格特質",
    "career": "事業發展",
    "wealth": "財運狀況",
    "relationship": "感情婚姻",
    "health": "健康注意",
    "annual": "流年運勢",
    "suggestions": "建議事項"
  },
  "aspects": {
    "title": "紫微斗數可預測的生活面向",
    "career": {
      "name": "事業發展",
      "desc": "職業類型、發展時機、升遷運勢、創業適性"
    },
    "wealth": {
      "name": "財富運勢",
      "desc": "財富累積、正財偏財、投資理財、破財風險"
    },
    "love": {
      "name": "感情婚姻",
      "desc": "感情模式、配偶特質、婚姻運勢、桃花運"
    },
    "health": {
      "name": "健康狀況",
      "desc": "先天體質、易患疾病、意外風險、養生方式"
    },
    "family": {
      "name": "家庭關係",
      "desc": "父母緣分、子女運勢、兄弟互動、家庭和諧"
    },
    "education": {
      "name": "教育學習",
      "desc": "學習能力、適合領域、考試運勢、深造機會"
    },
    "social": {
      "name": "人際社交",
      "desc": "社交能力、貴人小人、朋友類型、異地發展"
    },
    "growth": {
      "name": "個人成長",
      "desc": "性格特質、人生使命、精神發展、轉折時機"
    }
  }
}
```

```json
// locales/en-US.json
{
  "common": {
    "appName": "Ziwei Doushu Chart Analysis",
    "calculate": "Calculate",
    "export": "Export",
    "save": "Save",
    "share": "Share",
    "loading": "Calculating...",
    "error": "An error occurred"
  },
  "palaces": {
    "life": "Life Palace",
    "sibling": "Sibling Palace",
    "spouse": "Spouse Palace",
    "children": "Children Palace",
    "wealth": "Wealth Palace",
    "health": "Health Palace",
    "travel": "Travel Palace",
    "friends": "Friends Palace",
    "career": "Career Palace",
    "property": "Property Palace",
    "fortune": "Fortune Palace",
    "parents": "Parents Palace"
  },
  "stars": {
    "ziwei": "Purple Star",
    "tianji": "Heavenly Strategist",
    "taiyang": "Sun",
    "wuqu": "Military Minister",
    "tiantong": "Heavenly Unity",
    "lianzhen": "Pure Virtue",
    "tianfu": "Southern Star",
    "taiyin": "Moon",
    "tanlang": "Greedy Wolf",
    "jumen": "Giant Gate",
    "tianxiang": "Heavenly Minister",
    "tianliang": "Heavenly Beam",
    "qisha": "Seven Killings",
    "pojun": "Army Breaker"
  },
  "analysis": {
    "general": "General Analysis",
    "personality": "Personality Traits",
    "career": "Career Development",
    "wealth": "Wealth Fortune",
    "relationship": "Love & Marriage",
    "health": "Health Notes",
    "annual": "Annual Forecast",
    "suggestions": "Suggestions"
  },
  "aspects": {
    "title": "Life Aspects Predicted by Ziwei Doushu",
    "career": {
      "name": "Career Development",
      "desc": "Job types, timing, promotions, entrepreneurship"
    },
    "wealth": {
      "name": "Wealth Fortune",
      "desc": "Accumulation, income types, investments, risks"
    },
    "love": {
      "name": "Love & Marriage",
      "desc": "Relationship patterns, spouse traits, marriage luck"
    },
    "health": {
      "name": "Health Condition",
      "desc": "Constitution, diseases, accident risks, wellness"
    },
    "family": {
      "name": "Family Relations",
      "desc": "Parents, children, siblings, harmony"
    },
    "education": {
      "name": "Education & Learning",
      "desc": "Learning ability, suitable fields, exam luck"
    },
    "social": {
      "name": "Social Relations",
      "desc": "Social skills, mentors, friends, relocation"
    },
    "growth": {
      "name": "Personal Growth",
      "desc": "Personality, life mission, spiritual growth"
    }
  }
}
```

### 語言切換元件

```vue
<!-- components/LanguageSwitcher.vue -->
<template>
  <div class="language-switcher">
    <select v-model="currentLocale" @change="changeLanguage" class="locale-select">
      <option value="zh-TW">繁體中文</option>
      <option value="zh-CN">简体中文</option>
      <option value="en-US">English</option>
    </select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const currentLocale = ref(locale.value);

const changeLanguage = () => {
  locale.value = currentLocale.value;
  localStorage.setItem('locale', currentLocale.value);
};

// 從 localStorage 載入語言偏好
const savedLocale = localStorage.getItem('locale');
if (savedLocale) {
  currentLocale.value = savedLocale;
  locale.value = savedLocale;
}
</script>

<style scoped>
.locale-select {
  @apply px-4 py-2 border border-gray-300 rounded-lg;
  @apply focus:ring-2 focus:ring-purple-500 focus:border-transparent;
  @apply transition-all duration-200;
}
</style>
```

### 使用範例

```vue
<template>
  <div class="palace-card">
    <h3>{{ t('palaces.life') }}</h3>
    <div class="stars">
      <span>{{ t('stars.ziwei') }}</span>
      <span>{{ t('stars.tianfu') }}</span>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>
```

### 後端多語系支援

```python
# app/services/i18n_service.py
TRANSLATIONS = {
    'zh-TW': {
        'analysis_intro': '根據您的紫微命盤...',
        'career_strong': '事業運勢強勁',
        'wealth_moderate': '財運平穩'
    },
    'zh-CN': {
        'analysis_intro': '根据您的紫微命盘...',
        'career_strong': '事业运势强劲',
        'wealth_moderate': '财运平稳'
    },
    'en-US': {
        'analysis_intro': 'According to your Ziwei chart...',
        'career_strong': 'Strong career prospects',
        'wealth_moderate': 'Moderate wealth fortune'
    }
}

def get_translation(key: str, locale: str = 'zh-TW') -> str:
    return TRANSLATIONS.get(locale, {}).get(key, key)
```

### AI Prompt 多語系

```python
def generate_ziwei_prompt(chart_data, locale='zh-TW'):
    if locale == 'en-US':
        prompt = f"""
You are a professional Ziwei Doushu astrologer. Analyze the following chart:

【Basic Info】
Birth Date: {chart_data['metadata']['solarDate']}
Gender: {chart_data['gender']}

【Main Stars】
Life Palace: {chart_data['life_palace']['stars']}
Wealth Palace: {chart_data['wealth_palace']['stars']}
...

Please provide analysis in the following aspects:
1. Overall personality
2. Career development
3. Wealth fortune
4. Relationship & marriage
5. Health notes
6. Annual forecast
7. Specific suggestions (3-5 points)
"""
    else:  # zh-TW / zh-CN
        prompt = f"""
你是一位專業的紫微斗數命理師。請分析以下命盤：

【基本資料】
出生日期：{chart_data['metadata']['solarDate']}
性別：{chart_data['gender']}

【主要星曜】
命宮：{chart_data['life_palace']['stars']}
財帛宮：{chart_data['wealth_palace']['stars']}
...

請從以下方面進行分析：
1. 整體性格特質
2. 事業發展
3. 財運狀況
4. 感情婚姻
5. 健康注意事項
6. 流年運勢
7. 具體建議（3-5條）
"""
    return prompt
```

---

## 📤 匯出功能規格

### PDF 匯出

```javascript
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const exportToPDF = async (chartData) => {
  const pdf = new jsPDF('p', 'mm', 'a4');

  // 封面頁
  pdf.setFontSize(24);
  pdf.text('紫微命盤解析報告', 105, 50, { align: 'center' });
  pdf.setFontSize(12);
  pdf.text(`姓名：${chartData.name}`, 20, 80);
  pdf.text(`出生日期：${chartData.birthDate}`, 20, 90);

  // 新增命盤圖片
  const chartElement = document.getElementById('ziwei-chart');
  const canvas = await html2canvas(chartElement);
  const imgData = canvas.toDataURL('image/png');
  pdf.addPage();
  pdf.addImage(imgData, 'PNG', 10, 10, 190, 190);

  // 新增分析文字
  pdf.addPage();
  pdf.setFontSize(16);
  pdf.text('AI 命盤解析', 20, 20);
  pdf.setFontSize(12);
  const splitText = pdf.splitTextToSize(chartData.analysis, 170);
  pdf.text(splitText, 20, 30);

  // 下載
  pdf.save(`ziwei_chart_${chartData.id}.pdf`);
};
```

### 圖片匯出

```javascript
const exportToImage = async (format = 'png') => {
  const element = document.getElementById('ziwei-chart');
  const canvas = await html2canvas(element, {
    scale: 2, // 高解析度
    backgroundColor: '#ffffff'
  });

  const link = document.createElement('a');
  link.download = `ziwei_chart_${Date.now()}.${format}`;
  link.href = canvas.toDataURL(`image/${format}`);
  link.click();
};
```

---

## 🎯 總結

這份設計規格書涵蓋：

✅ **紫微斗數預測面向**：8大生活領域詳細說明
✅ **視覺化設計**：方格盤 + 圓盤雙方案
✅ **表格展示**：4種專業數據表
✅ **星盤圖片生成**：3種技術方案
✅ **Gemini 設計提示**：完整的 UI 設計需求
✅ **多語系支援**：繁中/簡中/英文三語系
✅ **匯出功能**：PDF + 圖片多種格式

下一步建議：
1. 使用 Gemini 提示詞生成設計稿
2. 實作 SVG 命盤繪製元件
3. 整合 Vue I18n 多語系
4. 開發圖片匯出功能

需要我開始建立實際的前端元件嗎？
