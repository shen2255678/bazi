/**
 * 八字計算功能測試文件
 * 用於驗證核心計算邏輯的正確性
 */

import { calculateBaziPillars, getShichenName } from './calculators/ganzhi.js'
import { fullWuxingAnalysis } from './calculators/wuxing.js'
import { getNayin } from './calculators/wuxing.js'

/**
 * 測試案例：1990年1月15日14時30分
 */
export function testBaziCalculation() {
  console.log('=== 八字計算測試 ===\n')

  const birthDate = {
    year: 1990,
    month: 1,
    day: 15,
    hour: 14
  }

  console.log('出生時間：')
  console.log(`  國曆：${birthDate.year}年${birthDate.month}月${birthDate.day}日 ${birthDate.hour}時`)
  console.log(`  時辰：${getShichenName(birthDate.hour)}\n`)

  // 計算四柱
  const pillars = calculateBaziPillars(birthDate, true)

  console.log('四柱八字：')
  console.log(`  年柱：${pillars.year.ganzhi} (${getNayin(pillars.year.ganzhi)})`)
  console.log(`  月柱：${pillars.month.ganzhi} (${getNayin(pillars.month.ganzhi)})`)
  console.log(`  日柱：${pillars.day.ganzhi} (${getNayin(pillars.day.ganzhi)})`)
  console.log(`  時柱：${pillars.hour.ganzhi} (${getNayin(pillars.hour.ganzhi)})`)
  console.log(`\n  完整八字：${pillars.baziString}\n`)

  // 五行分析
  const wuxingResult = fullWuxingAnalysis(pillars)

  console.log('五行分析：')
  console.log('  五行分布：')
  Object.entries(wuxingResult.distribution).forEach(([element, count]) => {
    const strength = wuxingResult.strength[element]
    const bar = '█'.repeat(Math.round(count * 2))
    console.log(`    ${element}: ${count.toFixed(1)} ${bar} (${strength.percentage}%)`)
  })

  console.log('\n  五行排序：')
  wuxingResult.ranking.forEach((item, index) => {
    console.log(`    ${index + 1}. ${item.element} (${item.count.toFixed(1)}) - ${item.level}`)
  })

  console.log('\n  日主分析：')
  console.log(`    日干：${wuxingResult.dayMaster.stem}`)
  console.log(`    五行：${wuxingResult.dayMaster.wuxing}`)
  console.log(`    強弱：${wuxingResult.dayMaster.strength}`)

  console.log('\n  用神喜忌：')
  console.log(`    用神：${wuxingResult.yongshen}`)
  console.log(`    喜神：${wuxingResult.xishen}`)
  console.log(`    忌神：${wuxingResult.jishen}`)

  console.log('\n=== 測試完成 ===\n')

  return {
    pillars,
    wuxingResult
  }
}

/**
 * 測試多個案例
 */
export function testMultipleCases() {
  console.log('=== 多案例測試 ===\n')

  const testCases = [
    { year: 1990, month: 1, day: 15, hour: 14, name: '案例1' },
    { year: 1985, month: 6, day: 20, hour: 8, name: '案例2' },
    { year: 2000, month: 12, day: 31, hour: 23, name: '案例3' }
  ]

  testCases.forEach(testCase => {
    console.log(`\n--- ${testCase.name}: ${testCase.year}/${testCase.month}/${testCase.day} ${testCase.hour}時 ---`)

    const pillars = calculateBaziPillars(testCase, true)
    console.log(`八字：${pillars.baziString}`)

    const wuxing = fullWuxingAnalysis(pillars)
    console.log(`日主：${wuxing.dayMaster.stem}(${wuxing.dayMaster.wuxing}) - ${wuxing.dayMaster.strength}`)
    console.log(`用神：${wuxing.yongshen}`)
  })

  console.log('\n=== 多案例測試完成 ===\n')
}

// 如果在瀏覽器環境直接執行
if (typeof window !== 'undefined') {
  window.testBazi = testBaziCalculation
  window.testMultiple = testMultipleCases

  console.log('✅ 測試函數已掛載到 window 物件')
  console.log('  執行 window.testBazi() 測試單一案例')
  console.log('  執行 window.testMultiple() 測試多個案例')
}
