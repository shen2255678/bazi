/**
 * 紫微星曜計算模組
 * 包含主星廟旺平陷、四化等計算
 */

// 主星廟旺平陷表
export const STAR_BRIGHTNESS = {
  '紫微': {
    '子': '平', '丑': '廟', '寅': '旺', '卯': '旺', '辰': '廟', '巳': '廟',
    '午': '平', '未': '旺', '申': '旺', '酉': '平', '戌': '旺', '亥': '旺'
  },
  '天機': {
    '子': '旺', '丑': '旺', '寅': '得', '卯': '廟', '辰': '得', '巳': '平',
    '午': '平', '未': '平', '申': '得', '酉': '廟', '戌': '得', '亥': '旺'
  },
  '太陽': {
    '子': '陷', '丑': '平', '寅': '旺', '卯': '廟', '辰': '旺', '巳': '廟',
    '午': '廟', '未': '旺', '申': '平', '酉': '陷', '戌': '不', '亥': '平'
  },
  '武曲': {
    '子': '平', '丑': '廟', '寅': '利', '卯': '平', '辰': '廟', '巳': '平',
    '午': '陷', '未': '平', '申': '利', '酉': '廟', '戌': '利', '亥': '得'
  },
  '天同': {
    '子': '廟', '丑': '不', '寅': '利', '卯': '旺', '辰': '得', '巳': '平',
    '午': '旺', '未': '不', '申': '利', '酉': '平', '戌': '得', '亥': '平'
  },
  '廉貞': {
    '子': '平', '丑': '陷', '寅': '不', '卯': '利', '辰': '平', '巳': '廟',
    '午': '旺', '未': '平', '申': '得', '酉': '廟', '戌': '平', '亥': '平'
  },
  '天府': {
    '子': '平', '丑': '廟', '寅': '旺', '卯': '旺', '辰': '廟', '巳': '旺',
    '午': '平', '未': '旺', '申': '旺', '酉': '旺', '戌': '廟', '亥': '廟'
  },
  '太陰': {
    '子': '旺', '丑': '旺', '寅': '平', '卯': '廟', '辰': '旺', '巳': '平',
    '午': '陷', '未': '平', '申': '平', '酉': '廟', '戌': '平', '亥': '得'
  },
  '貪狼': {
    '子': '平', '丑': '平', '寅': '不', '卯': '廟', '辰': '平', '巳': '平',
    '午': '陷', '未': '平', '申': '得', '酉': '旺', '戌': '平', '亥': '廟'
  },
  '巨門': {
    '子': '平', '丑': '利', '寅': '旺', '卯': '廟', '辰': '旺', '巳': '平',
    '午': '陷', '未': '不', '申': '旺', '酉': '廟', '戌': '旺', '亥': '平'
  },
  '天相': {
    '子': '利', '丑': '平', '寅': '廟', '卯': '廟', '辰': '廟', '巳': '旺',
    '午': '廟', '未': '旺', '申': '廟', '酉': '廟', '戌': '廟', '亥': '利'
  },
  '天梁': {
    '子': '平', '丑': '廟', '寅': '旺', '卯': '廟', '辰': '廟', '巳': '平',
    '午': '陷', '未': '平', '申': '旺', '酉': '廟', '戌': '廟', '亥': '平'
  },
  '七殺': {
    '子': '廟', '丑': '平', '寅': '利', '卯': '平', '辰': '廟', '巳': '廟',
    '午': '廟', '未': '平', '申': '得', '酉': '平', '戌': '廟', '亥': '平'
  },
  '破軍': {
    '子': '廟', '丑': '平', '寅': '得', '卯': '平', '辰': '陷', '巳': '平',
    '午': '廟', '未': '平', '申': '得', '酉': '平', '戌': '陷', '亥': '平'
  }
}

// 生年四化表（根據出生年天干）
export const SI_HUA_BY_YEAR_STEM = {
  '甲': { lu: '廉貞', quan: '破軍', ke: '武曲', ji: '太陽' },
  '乙': { lu: '天機', quan: '天梁', ke: '紫微', ji: '太陰' },
  '丙': { lu: '天同', quan: '天機', ke: '文昌', ji: '廉貞' },
  '丁': { lu: '太陰', quan: '天同', ke: '天機', ji: '巨門' },
  '戊': { lu: '貪狼', quan: '太陰', ke: '右弼', ji: '天機' },
  '己': { lu: '武曲', quan: '貪狼', ke: '天梁', ji: '文曲' },
  '庚': { lu: '太陽', quan: '武曲', ke: '太陰', ji: '天同' },
  '辛': { lu: '巨門', quan: '太陽', ke: '文曲', ji: '文昌' },
  '壬': { lu: '天梁', quan: '紫微', ke: '左輔', ji: '武曲' },
  '癸': { lu: '破軍', quan: '巨門', ke: '太陰', ji: '貪狼' }
}

/**
 * 獲取主星的廟旺平陷
 * @param {string} starName - 星曜名稱
 * @param {string} branch - 地支
 * @returns {string} 廟旺平陷狀態
 */
export function getStarBrightness(starName, branch) {
  if (!STAR_BRIGHTNESS[starName]) return null
  return STAR_BRIGHTNESS[starName][branch] || '平'
}

/**
 * 獲取星曜的四化
 * @param {string} starName - 星曜名稱
 * @param {string} yearStem - 出生年天干
 * @returns {object} 四化資訊 {type: '化祿'|'化權'|'化科'|'化忌', symbol: '祿'|'權'|'科'|'忌'}
 */
export function getStarSiHua(starName, yearStem) {
  const sihua = SI_HUA_BY_YEAR_STEM[yearStem]
  if (!sihua) return null

  if (sihua.lu === starName) return { type: '化祿', symbol: '祿', direction: '↑' }
  if (sihua.quan === starName) return { type: '化權', symbol: '權', direction: '↑' }
  if (sihua.ke === starName) return { type: '化科', symbol: '科', direction: '↑' }
  if (sihua.ji === starName) return { type: '化忌', symbol: '忌', direction: '↓' }

  return null
}

/**
 * 格式化星曜顯示（包含廟旺平陷和四化）
 * @param {string} starName - 星曜名稱
 * @param {string} branch - 地支
 * @param {string} yearStem - 出生年天干
 * @returns {string} 格式化後的星曜顯示
 */
export function formatStarDisplay(starName, branch, yearStem) {
  let display = starName

  // 添加廟旺平陷
  const brightness = getStarBrightness(starName, branch)
  if (brightness) {
    display += `[${brightness}]`
  }

  // 添加四化
  const sihua = getStarSiHua(starName, yearStem)
  if (sihua) {
    display += `[生年${sihua.symbol}]`
    display += `[${sihua.direction}${sihua.symbol}]`
  }

  return display
}

/**
 * 判斷主星類型
 * @param {string} starName - 星曜名稱
 * @returns {string} 星曜類型：'major'(主星), 'assistant'(輔星), 'minor'(小星)
 */
export function getStarType(starName) {
  const majorStars = ['紫微', '天機', '太陽', '武曲', '天同', '廉貞', '天府', '太陰', '貪狼', '巨門', '天相', '天梁', '七殺', '破軍']
  const assistantStars = ['左輔', '右弼', '文昌', '文曲', '祿存', '天馬', '天魁', '天鉞', '擎羊', '陀羅', '火星', '鈴星', '地空', '地劫']

  if (majorStars.includes(starName)) return 'major'
  if (assistantStars.includes(starName)) return 'assistant'
  return 'minor'
}
