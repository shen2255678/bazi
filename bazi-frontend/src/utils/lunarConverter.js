/**
 * 農曆轉換工具
 * 使用 lunar-javascript 進行國曆與農曆轉換
 */

import { Solar, Lunar } from 'lunar-javascript'

/**
 * 將國曆日期轉換為農曆格式字符串
 * @param {object} birthDate - 出生日期 {year, month, day, hour, minute}
 * @returns {string} 農曆格式字符串，例如：丁丑年正月廿九日亥時
 */
export async function solarToLunarString(birthDate) {
  if (!birthDate || !birthDate.year || !birthDate.month || !birthDate.day) {
    return ''
  }

  try {
    const { year, month, day, hour = 0, minute = 0 } = birthDate

    // 創建國曆日期對象
    const solar = Solar.fromYmd(year, month, day)

    // 轉換為農曆
    const lunar = solar.getLunar()

    // 獲取農曆年干支
    const yearGanZhi = lunar.getYearInGanZhi()

    // 獲取農曆月份
    const lunarMonth = lunar.getMonth()
    const monthInChinese = lunar.getMonthInChinese()
    
    // 檢查是否為閏月
    // lunar-javascript 1.7.7 版本中，閏月信息可以通過以下方式獲取：
    // 1. 檢查月份字符串是否包含"閏"字（最可靠）
    // 2. 或者使用 LunarYear.getLeapMonth() 方法
    let isLeapMonth = false
    try {
      // 方法1：檢查月份中文名稱是否包含"閏"
      if (monthInChinese && monthInChinese.includes('閏')) {
        isLeapMonth = true
      } else {
        // 方法2：使用 LunarYear 獲取閏月信息
        const { LunarYear } = await import('lunar-javascript')
        const lunarYear = LunarYear.fromYear(lunar.getYear())
        const leapMonth = lunarYear.getLeapMonth()
        // 如果當前月份等於閏月，則為閏月
        if (leapMonth > 0 && leapMonth === lunarMonth) {
          isLeapMonth = true
        }
      }
    } catch (e) {
      // 如果以上方法都失敗，使用最簡單的方法：檢查字符串
      isLeapMonth = monthInChinese && monthInChinese.includes('閏')
    }

    // 獲取農曆日期
    const lunarDay = lunar.getDay()
    const dayInChinese = lunar.getDayInChinese()

    // 獲取時辰
    const shichen = getShichenFromHour(hour, minute)

    // 組合成完整的農曆字符串
    let lunarStr = `${yearGanZhi}年`

    if (isLeapMonth) {
      lunarStr += `閏${monthInChinese}`
    } else {
      lunarStr += monthInChinese
    }

    lunarStr += `${dayInChinese}日${shichen}`

    return lunarStr
  } catch (error) {
    console.error('農曆轉換失敗:', error)
    return ''
  }
}

/**
 * 根據時分獲取時辰
 * @param {number} hour - 小時
 * @param {number} minute - 分鐘
 * @returns {string} 時辰名稱
 */
function getShichenFromHour(hour, minute) {
  // 子時特殊處理（23:00-00:59）
  if (hour === 23 || hour === 0) return '子時'
  if (hour >= 1 && hour < 3) return '丑時'
  if (hour >= 3 && hour < 5) return '寅時'
  if (hour >= 5 && hour < 7) return '卯時'
  if (hour >= 7 && hour < 9) return '辰時'
  if (hour >= 9 && hour < 11) return '巳時'
  if (hour >= 11 && hour < 13) return '午時'
  if (hour >= 13 && hour < 15) return '未時'
  if (hour >= 15 && hour < 17) return '申時'
  if (hour >= 17 && hour < 19) return '酉時'
  if (hour >= 19 && hour < 21) return '戌時'
  if (hour >= 21 && hour < 23) return '亥時'

  return '未知'
}

/**
 * 獲取農曆詳細資訊
 * @param {object} birthDate - 出生日期
 * @returns {object} 農曆詳細資訊
 */
export async function getLunarDetails(birthDate) {
  if (!birthDate || !birthDate.year || !birthDate.month || !birthDate.day) {
    return null
  }

  try {
    const { year, month, day, hour = 0 } = birthDate

    const solar = Solar.fromYmd(year, month, day)
    const lunar = solar.getLunar()

    // 檢查是否為閏月
    let isLeapMonth = false
    try {
      const monthStr = lunar.getMonthInChinese()
      // 方法1：檢查月份中文名稱是否包含"閏"
      if (monthStr && monthStr.includes('閏')) {
        isLeapMonth = true
      } else {
        // 方法2：使用 LunarYear 獲取閏月信息
        const { LunarYear } = await import('lunar-javascript')
        const lunarYear = LunarYear.fromYear(lunar.getYear())
        const leapMonth = lunarYear.getLeapMonth()
        if (leapMonth > 0 && leapMonth === lunar.getMonth()) {
          isLeapMonth = true
        }
      }
    } catch (e) {
      // 如果以上方法都失敗，使用最簡單的方法：檢查字符串
      const monthStr = lunar.getMonthInChinese()
      isLeapMonth = monthStr && monthStr.includes('閏')
    }

    return {
      yearGanZhi: lunar.getYearInGanZhi(),      // 年干支
      monthGanZhi: lunar.getMonthInGanZhi(),    // 月干支
      dayGanZhi: lunar.getDayInGanZhi(),        // 日干支
      yearInChinese: lunar.getYearInChinese(),  // 農曆年
      monthInChinese: lunar.getMonthInChinese(),// 農曆月
      dayInChinese: lunar.getDayInChinese(),    // 農曆日
      isLeapMonth,                              // 是否閏月
      shichen: getShichenFromHour(hour, 0),     // 時辰
      yearShengXiao: lunar.getYearShengXiao(),  // 生肖
      solarTerm: (() => {
        try {
          // 嘗試不同的方法獲取節氣
          if (typeof solar.getJieQi === 'function') {
            return solar.getJieQi()
          } else if (typeof solar.getTerm === 'function') {
            return solar.getTerm()
          } else {
            return lunar.getJieQi ? lunar.getJieQi() : ''
          }
        } catch (e) {
          return ''
        }
      })()         // 節氣
    }
  } catch (error) {
    console.error('獲取農曆詳細資訊失敗:', error)
    return null
  }
}
