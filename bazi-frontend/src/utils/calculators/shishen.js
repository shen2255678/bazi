/**
 * 十神計算模組
 * 根據日主與其他干支的關係，判斷十神
 */

import { HEAVENLY_STEMS } from '../constants.js'
import { getStemWuxing } from './wuxing.js'

/**
 * 判斷天干陰陽
 * @param {string} stem - 天干
 * @returns {string} 'yang'(陽) 或 'yin'(陰)
 */
export function getStemYinYang(stem) {
  const yangStems = ['甲', '丙', '戊', '庚', '壬']
  return yangStems.includes(stem) ? 'yang' : 'yin'
}

/**
 * 判斷五行生克關係
 * @param {string} myWuxing - 我的五行
 * @param {string} otherWuxing - 對方五行
 * @returns {string} 'sheng'(生), 'ke'(克), 'bei_sheng'(被生), 'bei_ke'(被克), 'bi'(比)
 */
function getWuxingRelation(myWuxing, otherWuxing) {
  const shengMap = {
    '木': '火',
    '火': '土',
    '土': '金',
    '金': '水',
    '水': '木'
  }

  const keMap = {
    '木': '土',
    '火': '金',
    '土': '水',
    '金': '木',
    '水': '火'
  }

  if (myWuxing === otherWuxing) {
    return 'bi' // 比和
  } else if (shengMap[myWuxing] === otherWuxing) {
    return 'sheng' // 我生他
  } else if (keMap[myWuxing] === otherWuxing) {
    return 'ke' // 我克他
  } else if (shengMap[otherWuxing] === myWuxing) {
    return 'bei_sheng' // 他生我
  } else if (keMap[otherWuxing] === myWuxing) {
    return 'bei_ke' // 他克我
  }

  return 'unknown'
}

/**
 * 計算十神
 * @param {string} dayMasterStem - 日主天干
 * @param {string} targetStem - 目標天干
 * @returns {string} 十神名稱
 */
export function calculateShishen(dayMasterStem, targetStem) {
  // 如果是日主自己，返回「日主」
  if (dayMasterStem === targetStem) {
    return '日主'
  }

  const dayMasterWuxing = getStemWuxing(dayMasterStem)
  const targetWuxing = getStemWuxing(targetStem)

  const dayMasterYinYang = getStemYinYang(dayMasterStem)
  const targetYinYang = getStemYinYang(targetStem)

  // 判斷同性還是異性
  const isSameYinYang = dayMasterYinYang === targetYinYang

  // 判斷五行關係
  const relation = getWuxingRelation(dayMasterWuxing, targetWuxing)

  // 根據五行關係和陰陽屬性判斷十神
  switch (relation) {
    case 'bi': // 比和
      return isSameYinYang ? '比肩' : '劫財'

    case 'sheng': // 我生他
      return isSameYinYang ? '食神' : '傷官'

    case 'ke': // 我克他
      return isSameYinYang ? '偏財' : '正財'

    case 'bei_ke': // 他克我
      return isSameYinYang ? '七殺' : '正官'

    case 'bei_sheng': // 他生我
      return isSameYinYang ? '偏印' : '正印'

    default:
      return '未知'
  }
}

/**
 * 計算四柱的十神
 * @param {object} pillars - 四柱數據
 * @returns {object} 十神數據
 */
export function calculatePillarsShishen(pillars) {
  const dayMasterStem = pillars.day.stem

  return {
    year: {
      stem: calculateShishen(dayMasterStem, pillars.year.stem),
      branch: '地支十神待實作' // 地支十神較複雜，先標記
    },
    month: {
      stem: calculateShishen(dayMasterStem, pillars.month.stem),
      branch: '地支十神待實作'
    },
    day: {
      stem: '日主',
      branch: '日支配偶宮'
    },
    hour: {
      stem: calculateShishen(dayMasterStem, pillars.hour.stem),
      branch: '地支十神待實作'
    }
  }
}

/**
 * 獲取十神的詳細說明
 * @param {string} shishen - 十神名稱
 * @returns {object} 十神詳細資訊
 */
export function getShishenInfo(shishen) {
  const shishenData = {
    '比肩': {
      name: '比肩',
      type: '同類',
      meaning: '與日主同類同性的五行，代表兄弟姐妹、朋友、競爭者',
      positive: ['獨立自主', '堅持己見', '自信', '競爭力強'],
      negative: ['固執', '不善妥協', '爭財', '孤僻'],
      career: '適合獨立創業、自由職業、競爭性行業',
      wealth: '靠自己努力賺錢，不易得偏財',
      relationship: '異性緣一般，易有爭奪對象'
    },
    '劫財': {
      name: '劫財',
      type: '同類',
      meaning: '與日主同類異性的五行，代表競爭、奪取、合夥',
      positive: ['行動力強', '果斷', '善於合作', '重義氣'],
      negative: ['破財', '劫奪', '好勝', '衝動'],
      career: '適合合夥事業、銷售、業務',
      wealth: '財來財去，易破財，需謹慎理財',
      relationship: '桃花旺，但感情易有波折'
    },
    '食神': {
      name: '食神',
      type: '洩秀',
      meaning: '日主所生同性五行，代表才華、口福、享受',
      positive: ['有才華', '善表達', '樂觀', '享受生活'],
      negative: ['好吃懶做', '不務實', '揮霍', '缺乏進取心'],
      career: '適合文藝、美食、教育、演藝',
      wealth: '有口福，財源穩定，善理財',
      relationship: '溫和體貼，感情穩定'
    },
    '傷官': {
      name: '傷官',
      type: '洩秀',
      meaning: '日主所生異性五行，代表才華、創意、叛逆',
      positive: ['才華橫溢', '創意無限', '口才佳', '勇於挑戰'],
      negative: ['傲慢', '刻薄', '叛逆', '不遵守規則'],
      career: '適合創意、設計、藝術、評論',
      wealth: '財運波動大，靠才華賺錢',
      relationship: '感情易有波折，要求高'
    },
    '偏財': {
      name: '偏財',
      type: '我克',
      meaning: '日主所克同性五行，代表偏財、意外之財',
      positive: ['善理財', '機會多', '慷慨', '社交廣'],
      negative: ['財來財去', '投機', '不穩定', '桃花多'],
      career: '適合投資、貿易、業務、金融',
      wealth: '偏財運佳，投資機會多',
      relationship: '桃花旺，易有多角關係'
    },
    '正財': {
      name: '正財',
      type: '我克',
      meaning: '日主所克異性五行，代表正財、妻財',
      positive: ['勤儉', '穩定', '務實', '責任感強'],
      negative: ['守財', '保守', '缺乏冒險精神'],
      career: '適合穩定工作、公務員、會計',
      wealth: '財運穩定，靠薪資收入',
      relationship: '重視家庭，婚姻穩定'
    },
    '七殺': {
      name: '七殺',
      type: '克我',
      meaning: '克日主同性五行，代表權威、壓力、挑戰',
      positive: ['有魄力', '決斷力強', '勇敢', '不畏挑戰'],
      negative: ['壓力大', '衝動', '暴躁', '易有災厄'],
      career: '適合軍警、武職、管理、競爭性行業',
      wealth: '財運波動，需制煞',
      relationship: '感情壓力大，易有爭吵'
    },
    '正官': {
      name: '正官',
      type: '克我',
      meaning: '克日主異性五行，代表官職、名聲、丈夫',
      positive: ['正直', '守規矩', '有責任感', '名聲好'],
      negative: ['保守', '壓力大', '缺乏創意'],
      career: '適合公職、管理、法律、教育',
      wealth: '財運穩定，名利雙收',
      relationship: '婚姻美滿，配偶優秀'
    },
    '偏印': {
      name: '偏印',
      type: '生我',
      meaning: '生日主同性五行，代表偏母、繼母、非正統學問',
      positive: ['聰明', '領悟力強', '獨特見解', '神秘'],
      negative: ['孤僻', '多疑', '缺乏溫情', '偏激'],
      career: '適合研究、玄學、藝術、設計',
      wealth: '財運不穩，靠智慧賺錢',
      relationship: '感情淡漠，不善表達'
    },
    '正印': {
      name: '正印',
      type: '生我',
      meaning: '生日主異性五行，代表母親、學問、庇護',
      positive: ['善良', '有學問', '受人尊敬', '貴人多'],
      negative: ['依賴', '缺乏行動力', '保守'],
      career: '適合教育、文化、研究、慈善',
      wealth: '財運平穩，不愁吃穿',
      relationship: '感情穩定，受長輩喜愛'
    }
  }

  return shishenData[shishen] || {
    name: shishen,
    type: '未知',
    meaning: '資料尚未完善',
    positive: [],
    negative: [],
    career: '',
    wealth: '',
    relationship: ''
  }
}

/**
 * 分析十神組合
 * @param {object} shishenData - 十神數據
 * @returns {object} 十神組合分析
 */
export function analyzeShishenCombination(shishenData) {
  // 統計各十神出現次數（只計算天干）
  const count = {}
  const shishens = [
    shishenData.year.stem,
    shishenData.month.stem,
    shishenData.hour.stem // 不計算日主
  ]

  shishens.forEach(shishen => {
    if (shishen !== '日主') {
      count[shishen] = (count[shishen] || 0) + 1
    }
  })

  // 找出最多的十神
  let maxShishen = null
  let maxCount = 0
  for (const [shishen, num] of Object.entries(count)) {
    if (num > maxCount) {
      maxCount = num
      maxShishen = shishen
    }
  }

  return {
    count,
    dominant: maxShishen,
    dominantCount: maxCount,
    summary: maxShishen ? `命格中${maxShishen}最多(${maxCount}個)，${getShishenInfo(maxShishen).meaning}` : '命格均衡'
  }
}
