/**
 * 中文數字轉換工具
 * 將中文數字（如：廿九、初十）轉換為阿拉伯數字
 */

// 中文數字映射
const CHINESE_NUMBERS = {
  '零': 0, '一': 1, '二': 2, '三': 3, '四': 4, '五': 5,
  '六': 6, '七': 7, '八': 8, '九': 9, '十': 10,
  '廿': 20, '卅': 30
}

/**
 * 將中文日期字符串轉換為數字
 * @param {string} chineseDay - 中文日期（如："廿九"、"初十"、"十五"）
 * @returns {number} 對應的數字（1-30）
 */
export function convertChineseDayToNumber(chineseDay) {
  if (!chineseDay || typeof chineseDay !== 'string') {
    return 1
  }

  // 如果是純數字，直接返回
  const num = parseInt(chineseDay)
  if (!isNaN(num) && num >= 1 && num <= 30) {
    return num
  }

  // 處理"初X"格式（初一、初二...初十）
  if (chineseDay.startsWith('初')) {
    const rest = chineseDay.substring(1)
    if (rest === '十') return 10
    const digit = CHINESE_NUMBERS[rest]
    if (digit !== undefined && digit >= 1 && digit <= 9) {
      return digit
    }
  }

  // 處理"廿X"格式（廿一、廿二...廿九）
  if (chineseDay.startsWith('廿')) {
    const rest = chineseDay.substring(1)
    if (rest === '') return 20
    const digit = CHINESE_NUMBERS[rest]
    if (digit !== undefined && digit >= 1 && digit <= 9) {
      return 20 + digit
    }
  }

  // 處理"卅"（三十）
  if (chineseDay === '卅' || chineseDay === '三十') {
    return 30
  }

  // 處理"十X"格式（十一、十二...十九）
  if (chineseDay.startsWith('十')) {
    const rest = chineseDay.substring(1)
    if (rest === '') return 10
    const digit = CHINESE_NUMBERS[rest]
    if (digit !== undefined && digit >= 1 && digit <= 9) {
      return 10 + digit
    }
  }

  // 處理"X十"格式（二十、三十）
  if (chineseDay.endsWith('十')) {
    const prefix = chineseDay.substring(0, chineseDay.length - 1)
    const digit = CHINESE_NUMBERS[prefix]
    if (digit !== undefined && digit >= 2 && digit <= 3) {
      return digit * 10
    }
  }

  // 處理"X十Y"格式（二十一、二十二...二十九）
  if (chineseDay.includes('十')) {
    const parts = chineseDay.split('十')
    if (parts.length === 2) {
      const tens = CHINESE_NUMBERS[parts[0]] || 0
      const ones = CHINESE_NUMBERS[parts[1]] || 0
      if (tens > 0 && ones >= 0) {
        return tens * 10 + ones
      }
    }
  }

  // 處理單個中文數字（一、二、三...九）
  const single = CHINESE_NUMBERS[chineseDay]
  if (single !== undefined && single >= 1 && single <= 9) {
    return single
  }

  // 如果無法解析，返回默認值
  console.warn('無法解析中文日期:', chineseDay)
  return 1
}
