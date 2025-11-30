/**
 * 大運計算模組
 * 計算十年一運的大運排盤
 */

import { HEAVENLY_STEMS, EARTHLY_BRANCHES } from '../constants.js'
import { getStemYinYang } from './shishen.js'

/**
 * 判斷大運順逆
 * @param {string} gender - 性別 'male' 或 'female'
 * @param {string} yearStem - 年柱天干
 * @returns {string} 'forward'(順排) 或 'backward'(逆排)
 */
export function getDayunDirection(gender, yearStem) {
  const yearYinYang = getStemYinYang(yearStem)

  // 陽男陰女順排，陰男陽女逆排
  if (gender === 'male') {
    return yearYinYang === 'yang' ? 'forward' : 'backward'
  } else {
    return yearYinYang === 'yin' ? 'forward' : 'backward'
  }
}

/**
 * 獲取下一個天干
 * @param {string} stem - 當前天干
 * @param {boolean} forward - 是否順排
 * @returns {string} 下一個天干
 */
function getNextStem(stem, forward) {
  const index = HEAVENLY_STEMS.indexOf(stem)
  if (index === -1) return stem

  if (forward) {
    return HEAVENLY_STEMS[(index + 1) % 10]
  } else {
    return HEAVENLY_STEMS[(index - 1 + 10) % 10]
  }
}

/**
 * 獲取下一個地支
 * @param {string} branch - 當前地支
 * @param {boolean} forward - 是否順排
 * @returns {string} 下一個地支
 */
function getNextBranch(branch, forward) {
  const index = EARTHLY_BRANCHES.indexOf(branch)
  if (index === -1) return branch

  if (forward) {
    return EARTHLY_BRANCHES[(index + 1) % 12]
  } else {
    return EARTHLY_BRANCHES[(index - 1 + 12) % 12]
  }
}

/**
 * 計算起運歲數（簡化版本）
 * 實際應該根據節氣來計算，這裡使用簡化算法
 * @param {object} birthDate - 出生日期 {year, month, day, hour, minute}
 * @param {string} gender - 性別
 * @param {string} yearStem - 年柱天干
 * @returns {number} 起運歲數
 */
export function calculateStartAge(birthDate, gender, yearStem) {
  // 簡化算法：根據月份和性別計算
  // 實際應該計算到下一個/上一個節氣的天數，然後除以3得出歲數

  const direction = getDayunDirection(gender, yearStem)
  const { month, day } = birthDate

  // 這是簡化版本，實際需要用節氣計算
  // 假設每月中旬為節氣分界
  let daysToTerm

  if (direction === 'forward') {
    // 順排：計算到下一個節氣的天數
    if (day < 15) {
      daysToTerm = 15 - day
    } else {
      daysToTerm = 45 - day // 到下個月中旬
    }
  } else {
    // 逆排：計算到上一個節氣的天數
    if (day > 15) {
      daysToTerm = day - 15
    } else {
      daysToTerm = day + 15 // 到上個月中旬
    }
  }

  // 3天 = 1歲，1天 = 4個月
  const startAge = Math.floor(daysToTerm / 3)

  return startAge
}

/**
 * 生成大運干支序列
 * @param {object} monthPillar - 月柱 {stem, branch}
 * @param {boolean} forward - 是否順排
 * @param {number} count - 生成數量（默認8個大運，共80年）
 * @returns {array} 大運干支數組
 */
export function generateDayunPillars(monthPillar, forward, count = 8) {
  const dayuns = []
  let currentStem = monthPillar.stem
  let currentBranch = monthPillar.branch

  for (let i = 0; i < count; i++) {
    // 從月柱的下一柱開始
    currentStem = getNextStem(currentStem, forward)
    currentBranch = getNextBranch(currentBranch, forward)

    dayuns.push({
      stem: currentStem,
      branch: currentBranch,
      pillar: `${currentStem}${currentBranch}`
    })
  }

  return dayuns
}

/**
 * 計算完整大運資訊
 * @param {object} pillars - 四柱數據
 * @param {object} birthDate - 出生日期
 * @param {string} gender - 性別
 * @returns {object} 大運完整資訊
 */
export function calculateDayun(pillars, birthDate, gender) {
  const yearStem = pillars.year.stem
  const direction = getDayunDirection(gender, yearStem)
  const startAge = calculateStartAge(birthDate, gender, yearStem)
  const isForward = direction === 'forward'

  // 生成8個大運（80年）
  const dayunPillars = generateDayunPillars(pillars.month, isForward, 8)

  // 為每個大運添加年齡範圍
  const dayunsWithAge = dayunPillars.map((dayun, index) => {
    const startYear = startAge + (index * 10)
    const endYear = startYear + 9

    return {
      ...dayun,
      index: index + 1,
      startAge: startYear,
      endAge: endYear,
      ageRange: `${startYear}-${endYear}歲`
    }
  })

  return {
    direction: direction,
    directionText: isForward ? '順排' : '逆排',
    startAge: startAge,
    startAgeText: `${startAge}歲起運`,
    pillars: dayunsWithAge,
    summary: `${gender === 'male' ? '男命' : '女命'}${getStemYinYang(yearStem) === 'yang' ? '陽年' : '陰年'}生，大運${isForward ? '順' : '逆'}排，${startAge}歲起運`
  }
}

/**
 * 獲取當前大運
 * @param {object} dayunData - 大運數據
 * @param {number} currentAge - 當前年齡
 * @returns {object|null} 當前大運資訊
 */
export function getCurrentDayun(dayunData, currentAge) {
  if (!dayunData || !dayunData.pillars) return null

  return dayunData.pillars.find(dayun =>
    currentAge >= dayun.startAge && currentAge <= dayun.endAge
  ) || null
}

/**
 * 獲取大運的五行屬性
 * @param {object} dayun - 大運資訊
 * @returns {object} 五行屬性
 */
export function getDayunWuxing(dayun) {
  // 這裡需要引入 wuxing 計算
  // 暫時返回基本結構
  return {
    stem: '', // 需要從 wuxing.js 導入 getStemWuxing
    branch: '', // 需要從 wuxing.js 導入 getBranchWuxing
  }
}

/**
 * 分析大運吉凶
 * @param {object} dayun - 大運資訊
 * @param {object} pillars - 四柱
 * @param {object} wuxingAnalysis - 五行分析
 * @returns {object} 吉凶分析
 */
export function analyzeDayunFortune(dayun, pillars, wuxingAnalysis) {
  // 這是簡化版本，實際需要複雜的命理分析
  // 1. 分析大運干支與日主的關係（十神）
  // 2. 分析大運五行與命局用神的關係
  // 3. 綜合判斷吉凶

  return {
    rating: 'neutral', // 'good', 'neutral', 'bad'
    description: '此大運需結合具體命局分析',
    keyPoints: [
      '大運天干作用',
      '大運地支作用',
      '與用神的關係'
    ]
  }
}

/**
 * 獲取大運詳細說明
 * @param {object} dayun - 大運資訊
 * @returns {object} 詳細說明
 */
export function getDayunInfo(dayun) {
  return {
    pillar: dayun.pillar,
    ageRange: dayun.ageRange,
    period: `第${dayun.index}步大運`,
    description: `${dayun.startAge}歲至${dayun.endAge}歲行${dayun.stem}${dayun.branch}運`,
    notes: [
      '大運主管十年運勢',
      '天干管前五年，地支管後五年',
      '需配合流年具體分析'
    ]
  }
}
