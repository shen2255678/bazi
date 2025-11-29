/**
 * 紫微斗數完整資訊結構
 * 包含12宮位、14主星、輔星、煞星、格局、三方四正等完整資訊
 */

// ==================== 三方四正關係 ====================
export const THREE_POSITIONS = {
  '命宮': ['遷移宮', '財帛宮', '事業宮'],
  '兄弟宮': ['疾厄宮', '田宅宮', '福德宮'],
  '夫妻宮': ['官祿宮', '子女宮', '父母宮'],
  '子女宮': ['田宅宮', '夫妻宮', '兄弟宮'],
  '財帛宮': ['命宮', '事業宮', '福德宮'],
  '疾厄宮': ['兄弟宮', '父母宮', '田宅宮'],
  '遷移宮': ['命宮', '交友宮', '官祿宮'],
  '交友宮': ['遷移宮', '兄弟宮', '疾厄宮'],
  '事業宮': ['命宮', '財帛宮', '夫妻宮'],
  '田宅宮': ['子女宮', '疾厄宮', '兄弟宮'],
  '福德宮': ['財帛宮', '兄弟宮', '父母宮'],
  '父母宮': ['疾厄宮', '福德宮', '夫妻宮']
}

// 四正：本宮、對宮、三合宮
export const FOUR_POSITIONS = {
  '命宮': {
    main: '命宮',
    opposite: '遷移宮',
    three: ['財帛宮', '事業宮']
  },
  '兄弟宮': {
    main: '兄弟宮',
    opposite: '疾厄宮',
    three: ['田宅宮', '福德宮']
  },
  '夫妻宮': {
    main: '夫妻宮',
    opposite: '官祿宮',
    three: ['子女宮', '父母宮']
  },
  '子女宮': {
    main: '子女宮',
    opposite: '田宅宮',
    three: ['夫妻宮', '兄弟宮']
  },
  '財帛宮': {
    main: '財帛宮',
    opposite: '命宮',
    three: ['事業宮', '福德宮']
  },
  '疾厄宮': {
    main: '疾厄宮',
    opposite: '兄弟宮',
    three: ['父母宮', '田宅宮']
  },
  '遷移宮': {
    main: '遷移宮',
    opposite: '命宮',
    three: ['交友宮', '官祿宮']
  },
  '交友宮': {
    main: '交友宮',
    opposite: '遷移宮',
    three: ['兄弟宮', '疾厄宮']
  },
  '事業宮': {
    main: '事業宮',
    opposite: '命宮',
    three: ['財帛宮', '夫妻宮']
  },
  '田宅宮': {
    main: '田宅宮',
    opposite: '子女宮',
    three: ['疾厄宮', '兄弟宮']
  },
  '福德宮': {
    main: '福德宮',
    opposite: '財帛宮',
    three: ['兄弟宮', '父母宮']
  },
  '父母宮': {
    main: '父母宮',
    opposite: '疾厄宮',
    three: ['福德宮', '夫妻宮']
  }
}

// ==================== 地支對應天干 ====================
export const BRANCH_TO_STEM = {
  '子': ['甲', '丙', '戊', '庚', '壬'],
  '丑': ['乙', '丁', '己', '辛', '癸'],
  '寅': ['甲', '丙', '戊', '庚', '壬'],
  '卯': ['乙', '丁', '己', '辛', '癸'],
  '辰': ['甲', '丙', '戊', '庚', '壬'],
  '巳': ['乙', '丁', '己', '辛', '癸'],
  '午': ['甲', '丙', '戊', '庚', '壬'],
  '未': ['乙', '丁', '己', '辛', '癸'],
  '申': ['甲', '丙', '戊', '庚', '壬'],
  '酉': ['乙', '丁', '己', '辛', '癸'],
  '戌': ['甲', '丙', '戊', '庚', '壬'],
  '亥': ['乙', '丁', '己', '辛', '癸']
}

// ==================== 輔星詳細資訊 ====================
export const ASSISTANT_STAR_INFO = {
  '左輔': {
    name: '左輔',
    nameEn: 'Left Assistant',
    type: '輔星',
    element: '土',
    description: '貴人星，代表助力、輔佐、貴人運。',
    effects: {
      positive: ['貴人相助', '助力', '合作', '穩定'],
      negative: ['依賴', '缺乏主見']
    },
    brightness: ['廟', '旺', '得', '利', '平', '不', '陷']
  },
  '右弼': {
    name: '右弼',
    nameEn: 'Right Assistant',
    type: '輔星',
    element: '水',
    description: '貴人星，代表助力、輔佐、貴人運。',
    effects: {
      positive: ['貴人相助', '助力', '合作', '穩定'],
      negative: ['依賴', '缺乏主見']
    },
    brightness: ['廟', '旺', '得', '利', '平', '不', '陷']
  },
  '文昌': {
    name: '文昌',
    nameEn: 'Literary Talent',
    type: '輔星',
    element: '金',
    description: '文星，代表學業、文才、考試運。',
    effects: {
      positive: ['學業佳', '文才', '考試運', '文書'],
      negative: ['過於文弱', '缺乏行動力']
    },
    brightness: ['廟', '旺', '得', '利', '平', '不', '陷']
  },
  '文曲': {
    name: '文曲',
    nameEn: 'Literary Star',
    type: '輔星',
    element: '水',
    description: '文星，代表才藝、口才、文藝。',
    effects: {
      positive: ['才藝', '口才', '文藝', '表達'],
      negative: ['過於文弱', '缺乏實際']
    },
    brightness: ['廟', '旺', '得', '利', '平', '不', '陷']
  },
  '天魁': {
    name: '天魁',
    nameEn: 'Heavenly Noble',
    type: '輔星',
    element: '火',
    description: '貴人星，代表男性貴人、助力。',
    effects: {
      positive: ['男性貴人', '助力', '機會'],
      negative: []
    },
    brightness: ['廟', '旺', '得', '利', '平', '不', '陷']
  },
  '天鉞': {
    name: '天鉞',
    nameEn: 'Heavenly Noble',
    type: '輔星',
    element: '火',
    description: '貴人星，代表女性貴人、助力。',
    effects: {
      positive: ['女性貴人', '助力', '機會'],
      negative: []
    },
    brightness: ['廟', '旺', '得', '利', '平', '不', '陷']
  },
  '祿存': {
    name: '祿存',
    nameEn: 'Wealth Star',
    type: '輔星',
    element: '土',
    description: '財星，代表財富、儲蓄、穩定收入。',
    effects: {
      positive: ['財富', '儲蓄', '穩定收入'],
      negative: ['保守', '缺乏冒險']
    },
    brightness: ['廟', '旺', '得', '利', '平', '不', '陷']
  },
  '天馬': {
    name: '天馬',
    nameEn: 'Heavenly Horse',
    type: '輔星',
    element: '火',
    description: '動星，代表變動、遷移、奔波。',
    effects: {
      positive: ['變動', '遷移', '機會'],
      negative: ['奔波', '不穩定']
    },
    brightness: ['廟', '旺', '得', '利', '平', '不', '陷']
  }
}

// ==================== 煞星詳細資訊 ====================
export const SHA_STAR_INFO = {
  '擎羊': {
    name: '擎羊',
    nameEn: 'Sheep Blade',
    type: '煞星',
    element: '金',
    description: '刑星，代表衝動、傷害、競爭。',
    effects: {
      positive: ['衝勁', '競爭力', '果斷'],
      negative: ['衝動', '傷害', '刑剋', '意外']
    },
    brightness: ['廟', '旺', '得', '利', '平', '不', '陷']
  },
  '陀羅': {
    name: '陀羅',
    nameEn: 'Troll',
    type: '煞星',
    element: '金',
    description: '忌星，代表拖延、阻礙、糾纏。',
    effects: {
      positive: ['謹慎', '持久'],
      negative: ['拖延', '阻礙', '糾纏', '是非']
    },
    brightness: ['廟', '旺', '得', '利', '平', '不', '陷']
  },
  '火星': {
    name: '火星',
    nameEn: 'Mars',
    type: '煞星',
    element: '火',
    description: '暴星，代表急躁、火爆、意外。',
    effects: {
      positive: ['積極', '行動力'],
      negative: ['急躁', '火爆', '意外', '衝突']
    },
    brightness: ['廟', '旺', '得', '利', '平', '不', '陷']
  },
  '鈴星': {
    name: '鈴星',
    nameEn: 'Bell Star',
    type: '煞星',
    element: '火',
    description: '暴星，代表急躁、火爆、意外。',
    effects: {
      positive: ['積極', '行動力'],
      negative: ['急躁', '火爆', '意外', '衝突']
    },
    brightness: ['廟', '旺', '得', '利', '平', '不', '陷']
  },
  '地空': {
    name: '地空',
    nameEn: 'Earth Void',
    type: '煞星',
    element: '火',
    description: '空星，代表空虛、損失、不穩定。',
    effects: {
      positive: ['超脫', '靈性'],
      negative: ['空虛', '損失', '不穩定', '破財']
    },
    brightness: ['廟', '旺', '得', '利', '平', '不', '陷']
  },
  '地劫': {
    name: '地劫',
    nameEn: 'Earth Robber',
    type: '煞星',
    element: '火',
    description: '劫星，代表損失、破財、不穩定。',
    effects: {
      positive: ['超脫', '靈性'],
      negative: ['損失', '破財', '不穩定', '意外']
    },
    brightness: ['廟', '旺', '得', '利', '平', '不', '陷']
  }
}

// ==================== 四化星 ====================
export const SIHUA_STARS = {
  '化祿': {
    name: '化祿',
    nameEn: 'Transformation Wealth',
    type: '四化',
    description: '代表財富、享受、人緣、機會。',
    effects: ['財富', '享受', '人緣', '機會', '順利']
  },
  '化權': {
    name: '化權',
    nameEn: 'Transformation Power',
    type: '四化',
    description: '代表權力、地位、領導、競爭。',
    effects: ['權力', '地位', '領導', '競爭', '積極']
  },
  '化科': {
    name: '化科',
    nameEn: 'Transformation Fame',
    type: '四化',
    description: '代表名聲、學業、文才、貴人。',
    effects: ['名聲', '學業', '文才', '貴人', '和諧']
  },
  '化忌': {
    name: '化忌',
    nameEn: 'Transformation Taboo',
    type: '四化',
    description: '代表阻礙、困難、是非、損失。',
    effects: ['阻礙', '困難', '是非', '損失', '謹慎']
  }
}

// ==================== 格局（三合派） ====================
export const PATTERNS_SANHE = {
  // 帝星格局
  '紫府同宮': {
    name: '紫府同宮',
    level: '上上',
    description: '紫微與天府同宮，為帝座格局，主貴顯。',
    requirements: ['紫微', '天府'],
    effects: ['貴顯', '權力', '地位', '財富']
  },
  '紫微獨坐': {
    name: '紫微獨坐',
    level: '上',
    description: '紫微獨坐命宮，主領導才能。',
    requirements: ['紫微'],
    effects: ['領導', '權威', '責任']
  },
  // 財星格局
  '武曲貪狼': {
    name: '武曲貪狼',
    level: '中上',
    description: '武曲與貪狼同宮，主財運與才華。',
    requirements: ['武曲', '貪狼'],
    effects: ['財運', '才華', '交際']
  },
  // 桃花格局
  '廉貞貪狼': {
    name: '廉貞貪狼',
    level: '中',
    description: '廉貞與貪狼同宮，主桃花運。',
    requirements: ['廉貞', '貪狼'],
    effects: ['桃花', '才藝', '變化']
  },
  // 其他格局
  '天機天梁': {
    name: '天機天梁',
    level: '中上',
    description: '天機與天梁同宮，主智慧與長者風範。',
    requirements: ['天機', '天梁'],
    effects: ['智慧', '長者', '醫療']
  },
  '太陽太陰': {
    name: '太陽太陰',
    level: '中',
    description: '太陽與太陰同宮，主光明與財運。',
    requirements: ['太陽', '太陰'],
    effects: ['光明', '財運', '名聲']
  }
}

// ==================== 格局（四化派） ====================
export const PATTERNS_SIHUA = {
  // 化祿格局
  '祿存同宮': {
    name: '祿存同宮',
    level: '上',
    description: '祿存與主星同宮，主財運亨通。',
    requirements: ['祿存'],
    effects: ['財運', '穩定', '儲蓄']
  },
  '化祿入命': {
    name: '化祿入命',
    level: '上',
    description: '化祿在命宮，主一生財運佳。',
    requirements: ['化祿'],
    effects: ['財運', '人緣', '機會']
  },
  // 化權格局
  '化權入命': {
    name: '化權入命',
    level: '上',
    description: '化權在命宮，主權力與地位。',
    requirements: ['化權'],
    effects: ['權力', '地位', '領導']
  },
  // 化科格局
  '化科入命': {
    name: '化科入命',
    level: '中上',
    description: '化科在命宮，主名聲與學業。',
    requirements: ['化科'],
    effects: ['名聲', '學業', '貴人']
  },
  // 化忌格局
  '化忌入命': {
    name: '化忌入命',
    level: '中下',
    description: '化忌在命宮，主阻礙與困難。',
    requirements: ['化忌'],
    effects: ['阻礙', '困難', '謹慎']
  },
  // 四化組合
  '祿權科會': {
    name: '祿權科會',
    level: '上上',
    description: '化祿、化權、化科三會，主大富大貴。',
    requirements: ['化祿', '化權', '化科'],
    effects: ['富貴', '權力', '名聲']
  },
  '忌沖命': {
    name: '忌沖命',
    level: '下',
    description: '化忌沖命宮，主阻礙與困難。',
    requirements: ['化忌'],
    effects: ['阻礙', '困難', '是非']
  }
}

// ==================== 神煞 ====================
export const SHEN_SHA = {
  // 歲前星
  '歲建': { name: '歲建', type: '歲前星', description: '主建設、發展' },
  '晦氣': { name: '晦氣', type: '歲前星', description: '主阻礙、不順' },
  '喪門': { name: '喪門', type: '歲前星', description: '主喪事、不吉' },
  '貫索': { name: '貫索', type: '歲前星', description: '主束縛、限制' },
  '官符': { name: '官符', type: '歲前星', description: '主官非、是非' },
  '小耗': { name: '小耗', type: '歲前星', description: '主小損失' },
  '歲破': { name: '歲破', type: '歲前星', description: '主破敗、損失' },
  '龍德': { name: '龍德', type: '歲前星', description: '主貴人、助力' },
  '白虎': { name: '白虎', type: '歲前星', description: '主凶險、意外' },
  '天德': { name: '天德', type: '歲前星', description: '主德行、貴人' },
  '弔客': { name: '弔客', type: '歲前星', description: '主喪事、不吉' },
  '病符': { name: '病符', type: '歲前星', description: '主疾病、健康' },
  
  // 將前星
  '將星': { name: '將星', type: '將前星', description: '主權力、領導' },
  '攀鞍': { name: '攀鞍', type: '將前星', description: '主進取、發展' },
  '歲驛': { name: '歲驛', type: '將前星', description: '主變動、遷移' },
  '息神': { name: '息神', type: '將前星', description: '主休息、停滯' },
  '華蓋': { name: '華蓋', type: '將前星', description: '主才藝、藝術' },
  '劫煞': { name: '劫煞', type: '將前星', description: '主損失、破財' },
  '災煞': { name: '災煞', type: '將前星', description: '主災難、意外' },
  '天煞': { name: '天煞', type: '將前星', description: '主天災、意外' },
  '指背': { name: '指背', type: '將前星', description: '主是非、口舌' },
  '咸池': { name: '咸池', type: '將前星', description: '主桃花、感情' },
  '月煞': { name: '月煞', type: '將前星', description: '主陰性、女性' },
  '亡神': { name: '亡神', type: '將前星', description: '主損失、破敗' },
  
  // 十二長生
  '長生': { name: '長生', type: '十二長生', description: '主生機、發展' },
  '沐浴': { name: '沐浴', type: '十二長生', description: '主變化、桃花' },
  '冠帶': { name: '冠帶', type: '十二長生', description: '主成長、學習' },
  '臨官': { name: '臨官', type: '十二長生', description: '主事業、地位' },
  '帝旺': { name: '帝旺', type: '十二長生', description: '主極盛、權力' },
  '衰': { name: '衰', type: '十二長生', description: '主衰退、下降' },
  '病': { name: '病', type: '十二長生', description: '主疾病、弱點' },
  '死': { name: '死', type: '十二長生', description: '主停滯、結束' },
  '墓': { name: '墓', type: '十二長生', description: '主收藏、儲蓄' },
  '絕': { name: '絕', type: '十二長生', description: '主極弱、困難' },
  '胎': { name: '胎', type: '十二長生', description: '主孕育、開始' },
  '養': { name: '養', type: '十二長生', description: '主培養、準備' },
  
  // 太歲煞祿
  '奏書': { name: '奏書', type: '太歲煞祿', description: '主文書、文才' },
  '飛廉': { name: '飛廉', type: '太歲煞祿', description: '主變動、遷移' },
  '喜神': { name: '喜神', type: '太歲煞祿', description: '主喜慶、好事' },
  '病符': { name: '病符', type: '太歲煞祿', description: '主疾病、健康' },
  '大耗': { name: '大耗', type: '太歲煞祿', description: '主大損失' },
  '伏兵': { name: '伏兵', type: '太歲煞祿', description: '主隱藏、暗害' },
  '官符': { name: '官符', type: '太歲煞祿', description: '主官非、是非' },
  '死符': { name: '死符', type: '太歲煞祿', description: '主死亡、結束' },
  '歲破': { name: '歲破', type: '太歲煞祿', description: '主破敗、損失' },
  '龍德': { name: '龍德', type: '太歲煞祿', description: '主貴人、助力' },
  '白虎': { name: '白虎', type: '太歲煞祿', description: '主凶險、意外' },
  '天德': { name: '天德', type: '太歲煞祿', description: '主德行、貴人' }
}

// ==================== 完整宮位資訊結構範例 ====================
export const COMPLETE_PALACE_STRUCTURE = {
  name: '宮位名稱',
  heavenlyStem: '天干',
  earthlyBranch: '地支',
  mainStars: [
    {
      name: '主星名稱',
      brightness: '廟/旺/得/利/平/不/陷',
      sihua: '化祿/化權/化科/化忌',
      direction: '↑/↓', // 四化方向
      yearSihua: true, // 是否為生年四化
      daxianSihua: false, // 是否為大限四化
      liunianSihua: false // 是否為流年四化
    }
  ],
  assistantStars: [
    {
      name: '輔星名稱',
      brightness: '廟/旺/得/利/平/不/陷',
      sihua: '化祿/化權/化科/化忌',
      direction: '↑/↓'
    }
  ],
  shaStars: [
    {
      name: '煞星名稱',
      brightness: '廟/旺/得/利/平/不/陷'
    }
  ],
  minorStars: [
    {
      name: '小星名稱',
      brightness: '廟/旺/得/利/平/不/陷'
    }
  ],
  shenSha: {
    suiqian: '歲前星',
    jiangqian: '將前星',
    shierchang: '十二長生',
    taisui: '太歲煞祿'
  },
  daxian: {
    age: '大限年齡範圍',
    heavenlyStem: '大限天干',
    earthlyBranch: '大限地支'
  },
  xiaoxian: [1, 13, 25, 37, 49], // 小限虛歲
  liunian: [1, 13, 25, 37, 49], // 流年虛歲
  xianliuDiegong: false, // 限流疊宮
  isShenGong: false, // 是否為身宮
  isLaiYin: false, // 是否為來因宮
  threePositions: ['三方宮位1', '三方宮位2', '三方宮位3'], // 三方
  fourPositions: {
    main: '本宮',
    opposite: '對宮',
    three: ['三合宮1', '三合宮2']
  }
}

// ==================== 完整命盤資訊結構 ====================
export const COMPLETE_CHART_STRUCTURE = {
  basicInfo: {
    gender: '男/女',
    longitude: 120.0,
    clockTime: '1997-3-7 10:59',
    trueSolarTime: '1997-3-7 10:47',
    lunarTime: '丁丑年正月廿九日巳時',
    jieqiSizhu: '丁丑 癸卯 戊申 丁巳',
    feijieqiSizhu: '丁丑 壬寅 戊申 丁巳',
    wuxingJu: '土五局',
    mingzhu: '文曲',
    shenzhu: '天相',
    zinianDoujun: '巳',
    shengong: '未'
  },
  palaces: [
    // 12個宮位的完整資訊
  ],
  patterns: {
    sanhe: [
      {
        name: '格局名稱',
        level: '上上/上/中上/中/中下/下',
        description: '格局描述',
        palaces: ['相關宮位']
      }
    ],
    sihua: [
      {
        name: '格局名稱',
        level: '上上/上/中上/中/中下/下',
        description: '格局描述',
        palaces: ['相關宮位']
      }
    ]
  },
  daxianLiunian: {
    // 大限流年資訊
  }
}
