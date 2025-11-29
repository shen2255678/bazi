/**
 * 曆法轉換工具
 * 注意：這是簡化版本，實際應用建議使用專業農曆庫如 lunar-javascript
 * 本版本僅供開發初期測試使用
 */

/**
 * 農曆數據表（1900-2100）
 * 每個數值代表該年的農曆信息
 * 格式：16進制數值，包含閏月信息和每月天數
 *
 * TODO: 完整實作需要完整的農曆數據表
 * 建議後續使用專業庫如：
 * - lunar-javascript (https://github.com/6tail/lunar-javascript)
 * - chinese-lunar (https://www.npmjs.com/package/chinese-lunar)
 */

const LUNAR_INFO = [
  // 示例數據（需要完整數據表）
  // 格式：[年份, 閏月, 月份天數...]
  // 這裡僅作為結構示例
]

/**
 * 簡化的國曆轉農曆（臨時方案）
 * @param {number} year - 西元年
 * @param {number} month - 月份 (1-12)
 * @param {number} day - 日期 (1-31)
 * @returns {object} 農曆日期
 */
export function solarToLunar(year, month, day) {
  // TODO: 實作完整的國曆轉農曆邏輯
  // 目前返回估算值

  // 簡化估算：農曆約比國曆晚一個月
  let lunarYear = year
  let lunarMonth = month - 1
  let lunarDay = day

  if (lunarMonth <= 0) {
    lunarMonth = 12
    lunarYear -= 1
  }

  return {
    year: lunarYear,
    month: lunarMonth,
    day: lunarDay,
    isLeapMonth: false,
    // 干支年月日
    ganzhiYear: null, // 需要結合節氣計算
    ganzhiMonth: null,
    ganzhiDay: null
  }
}

/**
 * 簡化的農曆轉國曆（臨時方案）
 * @param {number} year - 農曆年
 * @param {number} month - 農曆月 (1-12)
 * @param {number} day - 農曆日 (1-30)
 * @param {boolean} isLeapMonth - 是否閏月
 * @returns {object} 國曆日期
 */
export function lunarToSolar(year, month, day, isLeapMonth = false) {
  // TODO: 實作完整的農曆轉國曆邏輯
  // 目前返回估算值

  let solarYear = year
  let solarMonth = month + 1
  let solarDay = day

  if (solarMonth > 12) {
    solarMonth = 1
    solarYear += 1
  }

  return {
    year: solarYear,
    month: solarMonth,
    day: solarDay
  }
}

/**
 * 判斷是否為閏年
 * @param {number} year - 西元年
 * @returns {boolean}
 */
export function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)
}

/**
 * 獲取某月的天數
 * @param {number} year - 年份
 * @param {number} month - 月份 (1-12)
 * @returns {number} 天數
 */
export function getDaysInMonth(year, month) {
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  if (month === 2 && isLeapYear(year)) {
    return 29
  }

  return days[month - 1]
}

/**
 * 獲取節氣日期（改進版，使用簡化的節氣計算公式）
 * 參考：簡化的節氣計算公式（基於回歸年）
 * @param {number} year - 年份
 * @param {number} term - 節氣序號 (0-23)
 * @returns {Date} 節氣日期
 */
export function getSolarTerm(year, term) {
  // 部分年份的精確節氣日期表（可擴展）
  // 參考：https://github.com/china-testing/bazi 的計算方式
  const preciseTerms = {
    1997: {
      0: [2, 3],   // 立春 2月3日
      1: [2, 18],  // 雨水 2月18日
      2: [3, 5],   // 驚蟄 3月5日
      3: [3, 20],  // 春分 3月20日
      4: [4, 5],   // 清明 4月5日
      5: [4, 20],  // 穀雨 4月20日
    }
  }

  // 如果有精確數據，使用精確數據
  if (preciseTerms[year] && preciseTerms[year][term] !== undefined) {
    const [month, day] = preciseTerms[year][term]
    return new Date(year, month - 1, day)
  }

  // 使用簡化的節氣計算（考慮閏年）
  // 基於1900年2月4日為立春的基準點
  const baseYear = 1900
  const baseDate = new Date(baseYear, 1, 4) // 1900年2月4日
  
  // 計算從基準年到目標年的年數差
  const yearDiff = year - baseYear
  
  // 每個節氣大約15.2天，一年24個節氣
  // 考慮閏年：每4年一個閏年（簡化，不考慮世紀年規則）
  const leapYears = Math.floor(yearDiff / 4)
  const daysFromBase = yearDiff * 365 + leapYears + term * 15.2184 // 365.2422/24 ≈ 15.2184
  
  // 計算節氣日期
  const termDate = new Date(baseDate)
  termDate.setDate(termDate.getDate() + Math.floor(daysFromBase))
  
  // 如果計算結果偏差太大，使用近似日期表
  const termDates = [
    [2, 4],   // 立春
    [2, 19],  // 雨水
    [3, 6],   // 驚蟄
    [3, 21],  // 春分
    [4, 5],   // 清明
    [4, 20],  // 穀雨
    [5, 6],   // 立夏
    [5, 21],  // 小滿
    [6, 6],   // 芒種
    [6, 21],  // 夏至
    [7, 7],   // 小暑
    [7, 23],  // 大暑
    [8, 8],   // 立秋
    [8, 23],  // 處暑
    [9, 8],   // 白露
    [9, 23],  // 秋分
    [10, 8],  // 寒露
    [10, 23], // 霜降
    [11, 7],  // 立冬
    [11, 22], // 小雪
    [12, 7],  // 大雪
    [12, 22], // 冬至
    [1, 6],   // 小寒
    [1, 20]   // 大寒
  ]

  // 檢查計算結果是否合理（與近似日期相差不超過2天）
  const [approxMonth, approxDay] = termDates[term]
  const approxDate = new Date(year, approxMonth - 1, approxDay)
  const diffDays = Math.abs((termDate - approxDate) / (1000 * 60 * 60 * 24))
  
  if (diffDays > 2) {
    // 如果偏差太大，使用近似日期
    return approxDate
  }
  
  return termDate
}

/**
 * 判斷日期是否在立春之後
 * @param {number} year - 年份
 * @param {number} month - 月份
 * @param {number} day - 日期
 * @returns {boolean}
 */
export function isAfterLichun(year, month, day) {
  const lichun = getSolarTerm(year, 0) // 立春是第0個節氣
  const targetDate = new Date(year, month - 1, day)

  return targetDate >= lichun
}

/**
 * 獲取月令（根據節氣）
 * @param {number} year - 年份
 * @param {number} month - 月份
 * @param {number} day - 日期
 * @returns {number} 月令 (1-12，對應寅月-丑月)
 */
export function getMonthOrder(year, month, day) {
  // 節氣月份表
  // 立春開始為寅月(1)，驚蟄為卯月(2)，以此類推
  // 參考：https://github.com/china-testing/bazi 的計算方式
  const targetDate = new Date(year, month - 1, day)
  targetDate.setHours(12, 0, 0, 0) // 設置為中午，避免時區問題

  // 查找當前處於哪個節氣區間
  const termMonths = [
    0,  // 立春 -> 寅月(1)
    2,  // 驚蟄 -> 卯月(2)
    4,  // 清明 -> 辰月(3)
    6,  // 立夏 -> 巳月(4)
    8,  // 芒種 -> 午月(5)
    10, // 小暑 -> 未月(6)
    12, // 立秋 -> 申月(7)
    14, // 白露 -> 酉月(8)
    16, // 寒露 -> 戌月(9)
    18, // 立冬 -> 亥月(10)
    20, // 大雪 -> 子月(11)
    22  // 小寒 -> 丑月(12)
  ]

  for (let i = 0; i < termMonths.length; i++) {
    const termDate = getSolarTerm(year, termMonths[i])
    termDate.setHours(12, 0, 0, 0) // 設置為中午
    
    const nextTermIndex = i < termMonths.length - 1 ? termMonths[i + 1] : 0
    const nextTermYear = i < termMonths.length - 1 ? year : year + 1
    const nextTermDate = getSolarTerm(nextTermYear, nextTermIndex)
    nextTermDate.setHours(12, 0, 0, 0) // 設置為中午

    // 判斷是否在這個節氣區間內
    if (targetDate >= termDate && targetDate < nextTermDate) {
      return i + 1 // 返回 1-12（對應寅月-丑月）
    }
  }

  // 如果沒找到，可能是跨年情況，檢查上一年的小寒到立春
  const lastYearXiaohan = getSolarTerm(year - 1, 22) // 小寒
  lastYearXiaohan.setHours(12, 0, 0, 0)
  const thisYearLichun = getSolarTerm(year, 0) // 立春
  thisYearLichun.setHours(12, 0, 0, 0)
  
  if (targetDate >= lastYearXiaohan && targetDate < thisYearLichun) {
    return 12 // 丑月
  }

  return 1 // 預設寅月
}

/**
 * 驗證日期有效性
 * @param {number} year - 年份
 * @param {number} month - 月份
 * @param {number} day - 日期
 * @returns {boolean}
 */
export function isValidDate(year, month, day) {
  if (year < 1900 || year > 2100) return false
  if (month < 1 || month > 12) return false

  const maxDay = getDaysInMonth(year, month)
  if (day < 1 || day > maxDay) return false

  return true
}

/**
 * 格式化日期顯示
 * @param {object} date - 日期物件 { year, month, day }
 * @param {string} format - 格式 ('YYYY-MM-DD' | 'YYYY/MM/DD' | 'Chinese')
 * @returns {string}
 */
export function formatDate(date, format = 'YYYY-MM-DD') {
  const { year, month, day } = date

  switch (format) {
    case 'YYYY-MM-DD':
      return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`

    case 'YYYY/MM/DD':
      return `${year}/${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}`

    case 'Chinese':
      return `${year}年${month}月${day}日`

    default:
      return `${year}-${month}-${day}`
  }
}

/**
 * 臨時提示信息
 */
export const CALENDAR_NOTICE = `
⚠️ 曆法轉換功能提示：
當前使用的是簡化版曆法轉換，僅供測試使用。

生產環境建議使用專業農曆庫：
1. lunar-javascript (推薦)
   npm install lunar-javascript

2. chinese-lunar
   npm install chinese-lunar

這些庫提供精確的：
- 農曆計算
- 節氣計算
- 干支計算
- 節假日信息
`

// 導出提示
if (process.env.NODE_ENV === 'development') {
  console.warn(CALENDAR_NOTICE)
}
