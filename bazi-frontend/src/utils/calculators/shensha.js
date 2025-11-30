/**
 * 神煞計算模組
 * 計算紫微斗數中的各種神煞
 */

// 歲前十二神煞
const SUI_QIAN_STARS = [
  '將星', '攀鞍', '歲驛', '息神', '華蓋', '劫煞',
  '災煞', '天煞', '指背', '咸池', '月煞', '亡神'
]

// 歲前十二神煞（對應地支順序）
const SUI_QIAN_MAP = {
  '子': '將星', '丑': '攀鞍', '寅': '歲驛', '卯': '息神',
  '辰': '華蓋', '巳': '劫煞', '午': '災煞', '未': '天煞',
  '申': '指背', '酉': '咸池', '戌': '月煞', '亥': '亡神'
}

// 將前十二神煞
const JIANG_QIAN_MAP = {
  '子': '將星', '丑': '攀鞍', '寅': '歲驛', '卯': '息神',
  '辰': '華蓋', '巳': '劫煞', '午': '災煞', '未': '天煞',
  '申': '指背', '酉': '咸池', '戌': '月煞', '亥': '亡神'
}

// 十二長生
const SHI_ER_CHANG_SHENG = {
  '木': ['長生', '沐浴', '冠帶', '臨官', '帝旺', '衰', '病', '死', '墓', '絕', '胎', '養'],
  '火': ['長生', '沐浴', '冠帶', '臨官', '帝旺', '衰', '病', '死', '墓', '絕', '胎', '養'],
  '金': ['長生', '沐浴', '冠帶', '臨官', '帝旺', '衰', '病', '死', '墓', '絕', '胎', '養'],
  '水': ['長生', '沐浴', '冠帶', '臨官', '帝旺', '衰', '病', '死', '墓', '絕', '胎', '養'],
  '土': ['長生', '沐浴', '冠帶', '臨官', '帝旺', '衰', '病', '死', '墓', '絕', '胎', '養']
}

// 長生對應地支起始位置
const CHANG_SHENG_START = {
  '甲': '亥', '丙': '寅', '戊': '寅', '庚': '巳', '壬': '申',
  '乙': '午', '丁': '酉', '己': '酉', '辛': '子', '癸': '卯'
}

// 太歲煞祿（歲建系統）
const TAI_SUI_MAP = [
  '歲建', '晦氣', '喪門', '貫索', '官符', '小耗',
  '歲破', '龍德', '白虎', '天德', '弔客', '病符'
]

/**
 * 計算歲前星
 * @param {string} branch - 宮位地支
 * @param {string} yearBranch - 出生年地支
 * @returns {string} 歲前星名稱
 */
export function calculateSuiQianStar(branch, yearBranch) {
  // 簡化計算：從年支起算
  const branches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
  const yearIndex = branches.indexOf(yearBranch)
  const branchIndex = branches.indexOf(branch)

  if (yearIndex === -1 || branchIndex === -1) return null

  // 從年支順數
  const offset = (branchIndex - yearIndex + 12) % 12
  return SUI_QIAN_STARS[offset]
}

/**
 * 計算將前星
 * @param {string} branch - 宮位地支
 * @param {string} yearBranch - 出生年地支
 * @returns {string} 將前星名稱
 */
export function calculateJiangQianStar(branch, yearBranch) {
  // 簡化計算：與歲前星類似，但起點不同
  return calculateSuiQianStar(branch, yearBranch)
}

/**
 * 計算十二長生
 * @param {string} branch - 宮位地支
 * @param {string} dayStem - 日主天干
 * @returns {string} 十二長生名稱
 */
export function calculateShiErChangSheng(branch, dayStem) {
  const branches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
  const startBranch = CHANG_SHENG_START[dayStem]

  if (!startBranch) return null

  const startIndex = branches.indexOf(startBranch)
  const branchIndex = branches.indexOf(branch)

  if (startIndex === -1 || branchIndex === -1) return null

  const offset = (branchIndex - startIndex + 12) % 12
  const changShengList = SHI_ER_CHANG_SHENG['木'] // 簡化版本，實際需根據五行

  return changShengList[offset]
}

/**
 * 計算太歲煞祿
 * @param {string} branch - 宮位地支
 * @param {string} yearBranch - 出生年地支
 * @returns {string} 太歲煞祿名稱
 */
export function calculateTaiSuiShaLu(branch, yearBranch) {
  const branches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
  const yearIndex = branches.indexOf(yearBranch)
  const branchIndex = branches.indexOf(branch)

  if (yearIndex === -1 || branchIndex === -1) return null

  // 從年支起歲建
  const offset = (branchIndex - yearIndex + 12) % 12
  return TAI_SUI_MAP[offset]
}

/**
 * 計算宮位所有神煞
 * @param {string} branch - 宮位地支
 * @param {string} yearBranch - 出生年地支
 * @param {string} dayStem - 日主天干
 * @returns {object} 神煞資訊
 */
export function calculatePalaceShenSha(branch, yearBranch, dayStem) {
  return {
    suiqian: calculateSuiQianStar(branch, yearBranch),
    jiangqian: calculateJiangQianStar(branch, yearBranch),
    shierchang: calculateShiErChangSheng(branch, dayStem),
    taisui: calculateTaiSuiShaLu(branch, yearBranch)
  }
}
