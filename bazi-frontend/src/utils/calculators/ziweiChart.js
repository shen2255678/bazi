/**
 * 紫微斗數排盤核心計算器
 * 實現真正的紫微斗數排盤算法
 */

// 十二宮位順序（逆時針）
const PALACE_ORDER = ['命宮', '兄弟宮', '夫妻宮', '子女宮', '財帛宮', '疾厄宮', 
                      '遷移宮', '交友宮', '官祿宮', '田宅宮', '福德宮', '父母宮']

// 十二地支順序
const BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

// 十天干順序
const STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']

/**
 * 根據生月生時定位命宮
 * @param {number} month - 生月（1-12）
 * @param {string} shichen - 時辰（子、丑、寅...）
 * @returns {number} 命宮在地支中的位置（0-11）
 */
export function calculateMingGong(month, shichen) {
  // 命宮定位：從寅宮起正月，順時針數到生月，再從該宮位起子時，逆時針數到生時
  const shichenIndex = BRANCHES.indexOf(shichen)
  if (shichenIndex === -1) return 0
  
  // 從寅宮（索引2）起正月，順時針數到生月
  let mingGongIndex = (2 + month - 1) % 12
  
  // 從命宮起子時，逆時針數到生時
  mingGongIndex = (mingGongIndex - shichenIndex + 12) % 12
  
  return mingGongIndex
}

/**
 * 根據生月定位身宮
 * @param {number} month - 生月（1-12）
 * @param {string} shichen - 時辰
 * @returns {number} 身宮在地支中的位置（0-11）
 */
export function calculateShenGong(month, shichen) {
  // 身宮定位：從寅宮起正月，順時針數到生月，再從該宮位起子時，順時針數到生時
  const shichenIndex = BRANCHES.indexOf(shichen)
  if (shichenIndex === -1) return 0
  
  // 從寅宮（索引2）起正月，順時針數到生月
  let shenGongIndex = (2 + month - 1) % 12
  
  // 從該宮位起子時，順時針數到生時
  shenGongIndex = (shenGongIndex + shichenIndex) % 12
  
  return shenGongIndex
}

/**
 * 根據命宮位置計算所有宮位的地支
 * @param {number} mingGongIndex - 命宮位置
 * @returns {Array} 12個宮位的地支
 */
export function calculatePalaceBranches(mingGongIndex) {
  const branches = []
  for (let i = 0; i < 12; i++) {
    const branchIndex = (mingGongIndex + i) % 12
    branches.push(BRANCHES[branchIndex])
  }
  return branches
}

/**
 * 根據年干計算命宮天干
 * @param {string} yearStem - 年干
 * @param {number} mingGongIndex - 命宮位置
 * @returns {string} 命宮天干
 */
export function calculateMingGongStem(yearStem, mingGongIndex) {
  // 五虎遁：甲己之年丙作首，乙庚之年戊為頭，丙辛之年尋庚起，丁壬壬寅順水流，若問戊癸何處起，甲寅之上好追求
  const yearStemIndex = STEMS.indexOf(yearStem)
  if (yearStemIndex === -1) return '甲'
  
  // 寅宮的天干
  let yinStemIndex = 0
  if (yearStemIndex % 5 === 0) yinStemIndex = 2 // 甲己 -> 丙
  else if (yearStemIndex % 5 === 1) yinStemIndex = 4 // 乙庚 -> 戊
  else if (yearStemIndex % 5 === 2) yinStemIndex = 6 // 丙辛 -> 庚
  else if (yearStemIndex % 5 === 3) yinStemIndex = 8 // 丁壬 -> 壬
  else if (yearStemIndex % 5 === 4) yinStemIndex = 0 // 戊癸 -> 甲
  
  // 從寅宮順時針數到命宮
  const stemIndex = (yinStemIndex + (mingGongIndex - 2 + 12) % 12) % 10
  return STEMS[stemIndex]
}

/**
 * 計算每個宮位的天干
 * @param {string} yearStem - 年干
 * @param {Array} branches - 12個宮位的地支
 * @returns {Array} 12個宮位的天干
 */
export function calculatePalaceStems(yearStem, branches) {
  const stems = []
  const yearStemIndex = STEMS.indexOf(yearStem)
  if (yearStemIndex === -1) return branches.map(() => '甲')
  
  // 找到寅宮的位置
  const yinIndex = branches.indexOf('寅')
  if (yinIndex === -1) return branches.map(() => '甲')
  
  // 寅宮的天干
  let yinStemIndex = 0
  if (yearStemIndex % 5 === 0) yinStemIndex = 2 // 甲己 -> 丙
  else if (yearStemIndex % 5 === 1) yinStemIndex = 4 // 乙庚 -> 戊
  else if (yearStemIndex % 5 === 2) yinStemIndex = 6 // 丙辛 -> 庚
  else if (yearStemIndex % 5 === 3) yinStemIndex = 8 // 丁壬 -> 壬
  else if (yearStemIndex % 5 === 4) yinStemIndex = 0 // 戊癸 -> 甲
  
  // 從寅宮順時針計算每個宮位的天干
  for (let i = 0; i < 12; i++) {
    const offset = (i - yinIndex + 12) % 12
    const stemIndex = (yinStemIndex + offset) % 10
    stems.push(STEMS[stemIndex])
  }
  
  return stems
}

/**
 * 安紫微星（根據農曆生日）
 * 紫微星安星法：根據農曆日期確定紫微星位置
 * @param {number} lunarDay - 農曆生日（1-30）
 * @param {Array} branches - 12個宮位的地支
 * @returns {number} 紫微星所在宮位索引
 */
export function placeZiwei(lunarDay, branches) {
  // 紫微星安星表（根據農曆日期）
  // 正確的紫微星安星法：
  // 農曆初一在子，初二在亥，初三在戌...依此類推
  const day = parseInt(lunarDay) || 1
  const ziweiTable = {
    1: '子', 2: '亥', 3: '戌', 4: '酉', 5: '申', 6: '未',
    7: '午', 8: '巳', 9: '辰', 10: '卯', 11: '寅', 12: '丑',
    13: '子', 14: '亥', 15: '戌', 16: '酉', 17: '申', 18: '未',
    19: '午', 20: '巳', 21: '辰', 22: '卯', 23: '寅', 24: '丑',
    25: '子', 26: '亥', 27: '戌', 28: '酉', 29: '申', 30: '未'
  }
  
  const ziweiBranch = ziweiTable[day] || '子'
  const index = branches.indexOf(ziweiBranch)
  return index >= 0 ? index : 0
}

/**
 * 安天府星（與紫微相對）
 * @param {number} ziweiIndex - 紫微星位置
 * @returns {number} 天府星所在宮位索引
 */
export function placeTianfu(ziweiIndex) {
  // 天府與紫微相對（對宮）
  return (ziweiIndex + 6) % 12
}

/**
 * 安14主星
 * 根據紫微星位置，按照正確的安星法則排列14主星
 * @param {number} ziweiIndex - 紫微星位置
 * @param {Array} branches - 12個宮位的地支
 * @returns {Object} 每個宮位的主星陣列
 */
export function placeMainStars(ziweiIndex, branches) {
  // 初始化所有宮位為空陣列
  const stars = {}
  PALACE_ORDER.forEach(name => {
    stars[name] = []
  })
  
  // 紫微星系（6顆星）：紫微、天機、太陽、武曲、天同、廉貞
  // 紫微星位置已知，其他星按固定順序排列
  const ziweiGroup = ['紫微', '天機', '太陽', '武曲', '天同', '廉貞']
  // 紫微星系相對位置：紫微(0), 天機(1), 太陽(3), 武曲(4), 天同(5), 廉貞(6)
  const ziweiOffsets = [0, 1, 3, 4, 5, 6]
  
  ziweiOffsets.forEach((offset, index) => {
    const palaceIndex = (ziweiIndex + offset) % 12
    const starName = ziweiGroup[index]
    stars[PALACE_ORDER[palaceIndex]].push(starName)
  })
  
  // 天府星系（8顆星）：天府、太陰、貪狼、巨門、天相、天梁、七殺、破軍
  // 天府與紫微相對（對宮）
  const tianfuIndex = placeTianfu(ziweiIndex)
  const tianfuGroup = ['天府', '太陰', '貪狼', '巨門', '天相', '天梁', '七殺', '破軍']
  // 天府星系相對位置：天府(0), 太陰(1), 貪狼(2), 巨門(3), 天相(4), 天梁(5), 七殺(6), 破軍(7)
  const tianfuOffsets = [0, 1, 2, 3, 4, 5, 6, 7]
  
  tianfuOffsets.forEach((offset, index) => {
    const palaceIndex = (tianfuIndex + offset) % 12
    const starName = tianfuGroup[index]
    stars[PALACE_ORDER[palaceIndex]].push(starName)
  })
  
  return stars
}

/**
 * 計算五行局數（已移至 calculateWuxingJuByPalace）
 * @deprecated 使用 calculateWuxingJuByPalace 代替
 */
export function calculateWuxingJu(yearStem, yearBranch, shichen) {
  return '土五局'
}

/**
 * 計算命主
 * @param {string} mingGongBranch - 命宮地支
 * @returns {string} 命主星名
 */
export function calculateMingzhu(mingGongBranch) {
  const mingzhuTable = {
    '子': '貪狼', '丑': '巨門', '寅': '祿存', '卯': '文曲',
    '辰': '廉貞', '巳': '武曲', '午': '破軍', '未': '武曲',
    '申': '廉貞', '酉': '文曲', '戌': '祿存', '亥': '巨門'
  }
  return mingzhuTable[mingGongBranch] || '文曲'
}

/**
 * 計算身主
 * @param {string} yearBranch - 年支
 * @returns {string} 身主星名
 */
export function calculateShenzhu(yearBranch) {
  const shenzhuTable = {
    '子': '火星', '丑': '天相', '寅': '天梁', '卯': '天同',
    '辰': '文昌', '巳': '天機', '午': '火星', '未': '天相',
    '申': '天梁', '酉': '天同', '戌': '文昌', '亥': '天機'
  }
  return shenzhuTable[yearBranch] || '天相'
}

/**
 * 計算子年斗君
 * @param {string} yearBranch - 年支
 * @param {number} month - 生月
 * @returns {string} 子年斗君地支
 */
export function calculateZinianDoujun(yearBranch, month) {
  // 子年斗君：從年支起正月，順時針數到生月
  const yearBranchIndex = BRANCHES.indexOf(yearBranch)
  if (yearBranchIndex === -1) return '巳'
  
  const doujunIndex = (yearBranchIndex + month - 1) % 12
  return BRANCHES[doujunIndex]
}

/**
 * 完整的紫微斗數排盤計算
 * @param {Object} birthInfo - 出生資訊
 * @param {Object} baziResult - 八字計算結果
 * @returns {Object} 完整的命盤數據
 */
export async function calculateZiweiChart(birthInfo, baziResult) {
  const { birthDate, gender } = birthInfo
  const { pillars, shichen } = baziResult || {}
  
  if (!birthDate || !pillars) {
    return null
  }
  
  // 獲取農曆日期（用於紫微星安星）
  let lunarDay = birthDate.day || 1
  try {
    // 使用動態 import 來避免 CommonJS require 問題
    const lunarConverter = await import('../lunarConverter.js')
    const { convertChineseDayToNumber } = await import('../chineseNumberConverter.js')
    const lunarDetails = lunarConverter.getLunarDetails(birthDate)
    if (lunarDetails && lunarDetails.dayInChinese) {
      // 從農曆日期字符串中提取數字（例如："廿九" -> 29）
      const dayStr = lunarDetails.dayInChinese
      lunarDay = convertChineseDayToNumber(dayStr)
    }
  } catch (error) {
    console.warn('獲取農曆日期失敗，使用公曆日期:', error)
    // 如果無法獲取農曆日期，使用公曆日期作為備選
    lunarDay = birthDate.day || 1
  }
  
  // 獲取基本信息
  const yearStem = pillars.year.stem
  const yearBranch = pillars.year.branch
  const month = birthDate.month || 1
  const shichenName = shichen || '子'
  
  // 計算命宮和身宮
  const mingGongIndex = calculateMingGong(month, shichenName)
  const shenGongIndex = calculateShenGong(month, shichenName)
  
  // 計算所有宮位的地支和天干
  const branches = calculatePalaceBranches(mingGongIndex)
  const stems = calculatePalaceStems(yearStem, branches)
  
  // 安主星（使用農曆日期）
  const ziweiIndex = placeZiwei(lunarDay, branches)
  const mainStars = placeMainStars(ziweiIndex, branches)
  
  // 計算五行局數（根據命宮天干地支）
  const mingGongStem = stems[0]
  const mingGongBranch = branches[0]
  const wuxingJu = calculateWuxingJuByPalace(mingGongStem, mingGongBranch)
  
  // 計算其他資訊
  const mingzhu = calculateMingzhu(branches[0])
  const shenzhu = calculateShenzhu(yearBranch)
  const zinianDoujun = calculateZinianDoujun(yearBranch, month)
  const shengongBranch = branches[shenGongIndex]
  
  return {
    mingGongIndex,
    shenGongIndex,
    branches,
    stems,
    mainStars,
    wuxingJu,
    mingzhu,
    shenzhu,
    zinianDoujun,
    shengong: shengongBranch,
    palaces: PALACE_ORDER.map((name, index) => ({
      name,
      heavenlyStem: stems[index],
      earthlyBranch: branches[index],
      mainStars: mainStars[name] || [],
      isMingGong: index === 0,
      isShenGong: index === shenGongIndex
    }))
  }
}

/**
 * 根據命宮天干地支計算五行局數
 * 根據正確的五行局數表計算
 * @param {string} stem - 命宮天干
 * @param {string} branch - 命宮地支
 * @returns {string} 五行局數
 */
function calculateWuxingJuByPalace(stem, branch) {
  const stemIndex = STEMS.indexOf(stem)
  const branchIndex = BRANCHES.indexOf(branch)
  
  if (stemIndex === -1 || branchIndex === -1) return '土五局'
  
  // 根據天干分組（甲己、乙庚、丙辛、丁壬、戊癸）
  const stemGroup = stemIndex % 5
  
  // 根據地支分組（子丑、寅卯、辰巳、午未、申酉、戌亥）
  const branchGroup = Math.floor(branchIndex / 2)
  
  // 五行局數表（根據搜索結果的正確表格）
  const wuxingJuTable = {
    // 甲、己
    0: {
      0: '水二局', // 子、丑
      1: '火六局', // 寅、卯
      2: '木三局', // 辰、巳
      3: '土五局', // 午、未
      4: '金四局', // 申、酉
      5: '火六局'  // 戌、亥
    },
    // 乙、庚
    1: {
      0: '火六局', // 子、丑
      1: '土五局', // 寅、卯
      2: '金四局', // 辰、巳
      3: '木三局', // 午、未
      4: '水二局', // 申、酉
      5: '土五局'  // 戌、亥
    },
    // 丙、辛
    2: {
      0: '土五局', // 子、丑
      1: '木三局', // 寅、卯（注意：搜索結果顯示為"水三局"，但標準應該是木三局）
      2: '水二局', // 辰、巳
      3: '金四局', // 午、未
      4: '火六局', // 申、酉
      5: '木三局'  // 戌、亥
    },
    // 丁、壬
    3: {
      0: '木三局', // 子、丑
      1: '金四局', // 寅、卯
      2: '火六局', // 辰、巳
      3: '水二局', // 午、未
      4: '土五局', // 申、酉
      5: '金四局'  // 戌、亥
    },
    // 戊、癸
    4: {
      0: '金四局', // 子、丑
      1: '水二局', // 寅、卯
      2: '土五局', // 辰、巳
      3: '火六局', // 午、未
      4: '木三局', // 申、酉
      5: '水二局'  // 戌、亥
    }
  }
  
  const groupTable = wuxingJuTable[stemGroup]
  if (!groupTable) return '土五局'
  
  return groupTable[branchGroup] || '土五局'
}
