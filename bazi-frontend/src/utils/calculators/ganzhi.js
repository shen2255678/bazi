/**
 * 天干地支計算工具
 */

import { HEAVENLY_STEMS, EARTHLY_BRANCHES } from '../constants.js'

/**
 * 根據數字獲取天干
 * @param {number} num - 數字（0-9 或任意整數）
 * @returns {string} 天干
 */
export function getStem(num) {
  const index = ((num % 10) + 10) % 10
  return HEAVENLY_STEMS[index]
}

/**
 * 根據數字獲取地支
 * @param {number} num - 數字（0-11 或任意整數）
 * @returns {string} 地支
 */
export function getBranch(num) {
  const index = ((num % 12) + 12) % 12
  return EARTHLY_BRANCHES[index]
}

/**
 * 獲取干支組合
 * @param {number} num - 數字（0-59 或任意整數）
 * @returns {object} { stem: 天干, branch: 地支, ganzhi: 干支組合 }
 */
export function getGanzhi(num) {
  const index = ((num % 60) + 60) % 60
  const stem = getStem(index)
  const branch = getBranch(index)
  return {
    stem,
    branch,
    ganzhi: stem + branch
  }
}

/**
 * 計算年柱天干地支
 * 注意：立春為界，立春前算上一年
 * @param {number} year - 西元年份
 * @param {boolean} afterLichun - 是否已過立春（預設 true）
 * @returns {object} { stem, branch, ganzhi }
 */
export function getYearGanzhi(year, afterLichun = true) {
  // 調整年份（立春前算上一年）
  const adjustedYear = afterLichun ? year : year - 1

  // 西元4年為甲子年（第1年）
  // 公式：(年份 - 4) % 60
  const offset = adjustedYear - 4
  return getGanzhi(offset)
}

/**
 * 計算月柱天干地支
 * 使用五虎遁口訣：甲己之年丙作首，乙庚之歲戊為頭，丙辛必定尋庚起，丁壬壬位順行流，若問戊癸何方發，甲寅之上好追求
 * @param {number} year - 西元年份
 * @param {number} monthOrder - 月令（1-12，對應寅月-丑月，已根據節氣確定）
 * @returns {object} { stem, branch, ganzhi }
 */
export function getMonthGanzhi(year, monthOrder, afterLichun = true) {
  // 先獲取年干（需要考慮是否在立春之後）
  const yearGanzhi = getYearGanzhi(year, afterLichun)
  const yearStem = yearGanzhi.stem

  // 月地支：從寅月開始（立春，對應1）
  // EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
  // 索引：子=0, 丑=1, 寅=2, 卯=3, 辰=4, 巳=5, 午=6, 未=7, 申=8, 酉=9, 戌=10, 亥=11
  // monthOrder: 1=寅月, 2=卯月, 3=辰月, ..., 12=丑月
  // 所以：branchIndex = (monthOrder + 1) % 12
  // 驗證：monthOrder=1(寅月) -> (1+1)%12=2(寅) ✓, monthOrder=2(卯月) -> (2+1)%12=3(卯) ✓
  const branchIndex = (monthOrder + 1) % 12
  const branch = EARTHLY_BRANCHES[branchIndex]

  // 五虎遁：根據年干定月干起點
  // 甲己之年丙作首（寅月天干為丙，索引2）
  // 乙庚之歲戊為頭（寅月天干為戊，索引4）
  // 丙辛必定尋庚起（寅月天干為庚，索引6）
  // 丁壬壬位順行流（寅月天干為壬，索引8）
  // 若問戊癸何方發，甲寅之上好追求（寅月天干為甲，索引0）
  const monthStemStart = {
    '甲': 2,  // 丙
    '己': 2,  // 丙
    '乙': 4,  // 戊
    '庚': 4,  // 戊
    '丙': 6,  // 庚
    '辛': 6,  // 庚
    '丁': 8,  // 壬
    '壬': 8,  // 壬
    '戊': 0,  // 甲
    '癸': 0   // 甲
  }

  const startIndex = monthStemStart[yearStem]
  // 月令從1開始（寅月），所以減1
  const stemIndex = (startIndex + monthOrder - 1) % 10
  const stem = HEAVENLY_STEMS[stemIndex]

  return {
    stem,
    branch,
    ganzhi: stem + branch
  }
}

/**
 * 計算日柱天干地支
 * 使用萬年曆公式（蔡勒公式改進版）
 * @param {number} year - 西元年份
 * @param {number} month - 月份（1-12）
 * @param {number} day - 日期（1-31）
 * @returns {object} { stem, branch, ganzhi }
 */
export function getDayGanzhi(year, month, day) {
  // 使用1900年1月1日作為基準點
  // 根據驗證，1900-01-01 是 甲戌日（索引10）
  const baseDate = new Date(1900, 0, 1)
  const targetDate = new Date(year, month - 1, day)

  // 計算天數差
  const diffTime = targetDate - baseDate
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  // 1900-01-01 為甲戌日（索引10）
  const baseGanzhiIndex = 10
  const ganzhiIndex = ((baseGanzhiIndex + diffDays) % 60 + 60) % 60

  return getGanzhi(ganzhiIndex)
}

/**
 * 計算時柱天干地支
 * 使用五鼠遁口訣：甲己還加甲，乙庚丙作初，丙辛從戊起，丁壬庚子居，戊癸何方發，壬子是真途
 * @param {string} dayStem - 日干
 * @param {number} hour - 小時（0-23）
 * @returns {object} { stem, branch, ganzhi }
 */
export function getHourGanzhi(dayStem, hour) {
  // 時地支：根據時間確定
  // 23-1點: 子, 1-3點: 丑, 3-5點: 寅, ...
  let branchIndex
  if (hour === 23) {
    branchIndex = 0 // 子時（23:00-00:59）
  } else {
    branchIndex = Math.floor((hour + 1) / 2) % 12
  }
  const branch = EARTHLY_BRANCHES[branchIndex]

  // 五鼠遁：根據日干定時干起點
  const hourStemStart = {
    '甲': 0,  // 甲
    '己': 0,  // 甲
    '乙': 2,  // 丙
    '庚': 2,  // 丙
    '丙': 4,  // 戊
    '辛': 4,  // 戊
    '丁': 6,  // 庚
    '壬': 6,  // 庚
    '戊': 8,  // 壬
    '癸': 8   // 壬
  }

  const startIndex = hourStemStart[dayStem]
  const stemIndex = (startIndex + branchIndex) % 10
  const stem = HEAVENLY_STEMS[stemIndex]

  return {
    stem,
    branch,
    ganzhi: stem + branch
  }
}

/**
 * 根據時辰地支獲取時間範圍
 * @param {string} branch - 地支
 * @returns {string} 時間範圍，如 "23:00-01:00"
 */
export function getBranchTimeRange(branch) {
  const timeRanges = {
    '子': '23:00-01:00',
    '丑': '01:00-03:00',
    '寅': '03:00-05:00',
    '卯': '05:00-07:00',
    '辰': '07:00-09:00',
    '巳': '09:00-11:00',
    '午': '11:00-13:00',
    '未': '13:00-15:00',
    '申': '15:00-17:00',
    '酉': '17:00-19:00',
    '戌': '19:00-21:00',
    '亥': '21:00-23:00'
  }
  return timeRanges[branch] || '未知'
}

/**
 * 根據小時獲取時辰名稱
 * @param {number} hour - 小時（0-23）
 * @returns {string} 時辰名稱，如 "子時"
 */
export function getShichenName(hour) {
  const branches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
  let index
  if (hour === 23) {
    index = 0
  } else {
    index = Math.floor((hour + 1) / 2) % 12
  }
  return branches[index] + '時'
}

/**
 * 計算完整的四柱八字
 * @param {object} date - { year, month, day, hour, minute? }
 * @param {boolean} afterLichun - 是否已過立春（預設需要調用其他函數判斷）
 * @param {number} monthOrder - 月令（1-12，對應寅月-丑月），如果提供則使用，否則根據節氣計算
 * @returns {object} 四柱八字數據
 */
export function calculateBaziPillars(date, afterLichun = true, monthOrder = null) {
  const { year, month, day, hour } = date

  // 年柱：根據立春判斷
  const yearPillar = getYearGanzhi(year, afterLichun)

  // 月柱：根據節氣計算月令
  // 如果沒有提供 monthOrder，需要調用者自己計算
  // 這裡使用傳入的 monthOrder，如果沒有則使用 month（不準確，但作為後備）
  const actualMonthOrder = monthOrder || month
  const monthPillar = getMonthGanzhi(year, actualMonthOrder, afterLichun)

  // 日柱：直接計算
  const dayPillar = getDayGanzhi(year, month, day)

  // 時柱：根據日干和時辰計算
  const hourPillar = getHourGanzhi(dayPillar.stem, hour)

  return {
    year: yearPillar,
    month: monthPillar,
    day: dayPillar,
    hour: hourPillar,
    // 完整八字字串
    baziString: `${yearPillar.ganzhi} ${monthPillar.ganzhi} ${dayPillar.ganzhi} ${hourPillar.ganzhi}`
  }
}
