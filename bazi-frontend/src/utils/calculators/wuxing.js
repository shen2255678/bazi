/**
 * 五行分析工具
 */

import {
  STEM_WUXING,
  BRANCH_WUXING,
  BRANCH_HIDDEN_STEMS,
  NAYIN_60,
  WUXING_SHENG,
  WUXING_KE
} from '../constants.js'

/**
 * 獲取天干的五行
 * @param {string} stem - 天干
 * @returns {string} 五行 (金/木/水/火/土)
 */
export function getStemWuxing(stem) {
  return STEM_WUXING[stem] || null
}

/**
 * 獲取地支的五行
 * @param {string} branch - 地支
 * @returns {string} 五行 (金/木/水/火/土)
 */
export function getBranchWuxing(branch) {
  return BRANCH_WUXING[branch] || null
}

/**
 * 獲取干支的納音五行
 * @param {string} ganzhi - 干支組合，如 "甲子"
 * @returns {string} 納音，如 "海中金"
 */
export function getNayin(ganzhi) {
  return NAYIN_60[ganzhi] || null
}

/**
 * 獲取地支藏干
 * @param {string} branch - 地支
 * @returns {array} 藏干數組
 */
export function getHiddenStems(branch) {
  return BRANCH_HIDDEN_STEMS[branch] || []
}

/**
 * 分析四柱五行分布
 * 包含天干、地支本氣、地支藏干
 * @param {object} pillars - 四柱數據 { year, month, day, hour }
 * @returns {object} 五行統計
 */
export function analyzeWuxingDistribution(pillars) {
  const distribution = {
    金: 0,
    木: 0,
    水: 0,
    火: 0,
    土: 0
  }

  const details = {
    stems: [],     // 天干五行
    branches: [],  // 地支本氣五行
    hidden: []     // 地支藏干五行
  }

  // 四柱順序
  const positions = ['year', 'month', 'day', 'hour']

  positions.forEach(pos => {
    const pillar = pillars[pos]

    // 1. 天干五行
    const stemWuxing = getStemWuxing(pillar.stem)
    if (stemWuxing) {
      distribution[stemWuxing]++
      details.stems.push({
        position: pos,
        stem: pillar.stem,
        wuxing: stemWuxing
      })
    }

    // 2. 地支本氣五行
    const branchWuxing = getBranchWuxing(pillar.branch)
    if (branchWuxing) {
      distribution[branchWuxing] += 0.5 // 地支本氣算半個
      details.branches.push({
        position: pos,
        branch: pillar.branch,
        wuxing: branchWuxing
      })
    }

    // 3. 地支藏干五行
    const hiddenStems = getHiddenStems(pillar.branch)
    hiddenStems.forEach((hiddenStem, index) => {
      const hiddenWuxing = getStemWuxing(hiddenStem)
      if (hiddenWuxing) {
        // 本氣算最重，中氣次之，餘氣最輕
        const weight = index === 0 ? 0.3 : (index === 1 ? 0.2 : 0.1)
        distribution[hiddenWuxing] += weight

        details.hidden.push({
          position: pos,
          branch: pillar.branch,
          hiddenStem,
          wuxing: hiddenWuxing,
          weight
        })
      }
    })
  })

  return {
    distribution,
    details,
    total: Object.values(distribution).reduce((sum, val) => sum + val, 0)
  }
}

/**
 * 判斷五行強弱
 * @param {object} distribution - 五行分布 { 金, 木, 水, 火, 土 }
 * @returns {object} 五行強弱評級
 */
export function analyzeWuxingStrength(distribution) {
  const total = Object.values(distribution).reduce((sum, val) => sum + val, 0)
  const average = total / 5

  const strength = {}
  const levels = []

  Object.entries(distribution).forEach(([element, count]) => {
    const ratio = count / average
    let level

    if (ratio >= 1.8) {
      level = 'very_strong' // 極強
    } else if (ratio >= 1.3) {
      level = 'strong'      // 強
    } else if (ratio >= 0.8) {
      level = 'medium'      // 中
    } else if (ratio >= 0.5) {
      level = 'weak'        // 弱
    } else {
      level = 'very_weak'   // 極弱
    }

    const percentage = ((count / total) * 100).toFixed(1)

    strength[element] = {
      count,
      ratio: ratio.toFixed(2),
      level,
      percentage
    }

    levels.push({
      element,
      level,
      count,
      ratio,
      percentage
    })
  })

  // 排序：從強到弱
  levels.sort((a, b) => b.count - a.count)

  return {
    strength,
    ranking: levels,
    strongest: levels[0].element,
    weakest: levels[levels.length - 1].element
  }
}

/**
 * 分析用神喜忌
 * 簡化版：根據五行強弱推算
 * @param {object} pillars - 四柱數據
 * @param {object} wuxingAnalysis - 五行分析結果
 * @returns {object} 用神、喜神、忌神
 */
export function analyzeYongshen(pillars, wuxingAnalysis) {
  const { strength, strongest, weakest } = wuxingAnalysis

  // 日主五行
  const dayMasterWuxing = getStemWuxing(pillars.day.stem)
  const dayMasterStrength = strength[dayMasterWuxing]

  let yongshen, xishen, jishen

  // 簡化判斷邏輯
  if (dayMasterStrength.level === 'strong' || dayMasterStrength.level === 'very_strong') {
    // 日主強 -> 用克洩耗
    yongshen = WUXING_KE[dayMasterWuxing] // 克我者為用神
    xishen = WUXING_SHENG[dayMasterWuxing] // 我生者為喜神
    jishen = dayMasterWuxing // 忌比劫

  } else {
    // 日主弱 -> 用生扶
    yongshen = WUXING_SHENG[dayMasterWuxing] // 生我者為用神（找相生的前一個）
    // 找出生日主的五行
    for (const [element, target] of Object.entries(WUXING_SHENG)) {
      if (target === dayMasterWuxing) {
        yongshen = element
        break
      }
    }
    xishen = dayMasterWuxing // 比劫為喜神
    jishen = WUXING_KE[dayMasterWuxing] // 克我者為忌神
  }

  return {
    yongshen,    // 用神
    xishen,      // 喜神
    jishen,      // 忌神
    dayMaster: {
      stem: pillars.day.stem,
      wuxing: dayMasterWuxing,
      strength: dayMasterStrength.level
    }
  }
}

/**
 * 完整五行分析
 * @param {object} pillars - 四柱數據
 * @returns {object} 完整五行分析結果
 */
export function fullWuxingAnalysis(pillars) {
  // 1. 五行分布
  const distributionResult = analyzeWuxingDistribution(pillars)

  // 2. 五行強弱
  const strengthResult = analyzeWuxingStrength(distributionResult.distribution)

  // 3. 用神分析
  const yongshenResult = analyzeYongshen(pillars, strengthResult)

  // 4. 補充日主數量資訊
  const dayMasterWuxing = getStemWuxing(pillars.day.stem)
  const dayMasterCount = distributionResult.distribution[dayMasterWuxing] || 0

  return {
    distribution: distributionResult.distribution,
    details: distributionResult.details,
    strength: strengthResult.strength,
    ranking: strengthResult.ranking,
    yongshen: yongshenResult.yongshen,
    xishen: yongshenResult.xishen,
    jishen: yongshenResult.jishen,
    dayMaster: {
      ...yongshenResult.dayMaster,
      count: dayMasterCount
    }
  }
}

/**
 * 五行相生關係判斷
 * @param {string} element1 - 五行1
 * @param {string} element2 - 五行2
 * @returns {string|null} 'sheng' (相生) 或 null
 */
export function checkSheng(element1, element2) {
  return WUXING_SHENG[element1] === element2 ? 'sheng' : null
}

/**
 * 五行相剋關係判斷
 * @param {string} element1 - 五行1
 * @param {string} element2 - 五行2
 * @returns {string|null} 'ke' (相剋) 或 null
 */
export function checkKe(element1, element2) {
  return WUXING_KE[element1] === element2 ? 'ke' : null
}

/**
 * 五行關係判斷（完整）
 * @param {string} element1 - 五行1
 * @param {string} element2 - 五行2
 * @returns {string} 關係類型 (same/sheng/bei_sheng/ke/bei_ke/none)
 */
export function getWuxingRelation(element1, element2) {
  if (element1 === element2) {
    return 'same' // 同類
  }
  if (WUXING_SHENG[element1] === element2) {
    return 'sheng' // 我生
  }
  if (WUXING_SHENG[element2] === element1) {
    return 'bei_sheng' // 生我
  }
  if (WUXING_KE[element1] === element2) {
    return 'ke' // 我克
  }
  if (WUXING_KE[element2] === element1) {
    return 'bei_ke' // 克我
  }
  return 'none'
}
