/**
 * 真太陽時計算工具
 * 用於將鐘錶時間（平太陽時）轉換為真太陽時
 */

/**
 * 中國主要城市經度數據
 */
export const CHINA_CITIES = {
  '北京': { lng: 116.4074, lat: 39.9042, timezone: 'Asia/Shanghai' },
  '上海': { lng: 121.4737, lat: 31.2304, timezone: 'Asia/Shanghai' },
  '廣州': { lng: 113.2644, lat: 23.1291, timezone: 'Asia/Shanghai' },
  '深圳': { lng: 114.0579, lat: 22.5431, timezone: 'Asia/Shanghai' },
  '成都': { lng: 104.0668, lat: 30.5728, timezone: 'Asia/Shanghai' },
  '重慶': { lng: 106.5516, lat: 29.5630, timezone: 'Asia/Shanghai' },
  '武漢': { lng: 114.3055, lat: 30.5931, timezone: 'Asia/Shanghai' },
  '西安': { lng: 108.9398, lat: 34.3416, timezone: 'Asia/Shanghai' },
  '杭州': { lng: 120.1551, lat: 30.2741, timezone: 'Asia/Shanghai' },
  '南京': { lng: 118.7969, lat: 32.0603, timezone: 'Asia/Shanghai' },
  '天津': { lng: 117.2008, lat: 39.0842, timezone: 'Asia/Shanghai' },
  '蘇州': { lng: 120.5954, lat: 31.2989, timezone: 'Asia/Shanghai' },
  '鄭州': { lng: 113.6254, lat: 34.7466, timezone: 'Asia/Shanghai' },
  '長沙': { lng: 112.9388, lat: 28.2282, timezone: 'Asia/Shanghai' },
  '瀋陽': { lng: 123.4328, lat: 41.8045, timezone: 'Asia/Shanghai' },
  '青島': { lng: 120.3826, lat: 36.0671, timezone: 'Asia/Shanghai' },
  '哈爾濱': { lng: 126.6433, lat: 45.7567, timezone: 'Asia/Shanghai' },
  '昆明': { lng: 102.8329, lat: 25.0406, timezone: 'Asia/Shanghai' },
  '烏魯木齊': { lng: 87.6278, lat: 43.7928, timezone: 'Asia/Urumqi' },
  '拉薩': { lng: 91.1175, lat: 29.6475, timezone: 'Asia/Shanghai' },
  '台北': { lng: 121.5654, lat: 25.0330, timezone: 'Asia/Taipei' },
  '台中': { lng: 120.6736, lat: 24.1477, timezone: 'Asia/Taipei' },
  '高雄': { lng: 120.3014, lat: 22.6273, timezone: 'Asia/Taipei' },
  '香港': { lng: 114.1694, lat: 22.3193, timezone: 'Asia/Hong_Kong' },
  '澳門': { lng: 113.5439, lat: 22.1987, timezone: 'Asia/Macau' }
}

/**
 * 時區對應的標準經度
 */
const TIMEZONE_STANDARD_LONGITUDE = {
  'Asia/Shanghai': 120,    // 東八區標準經度
  'Asia/Taipei': 120,      // 東八區標準經度
  'Asia/Hong_Kong': 114,   // 香港使用東經 114° 作為標準
  'Asia/Macau': 113.5,     // 澳門
  'Asia/Urumqi': 87.6      // 烏魯木齊（東六區，但實際使用北京時間）
}

/**
 * 計算經度時差（分鐘）
 * 地球自轉一圈 360°，24 小時 = 1440 分鐘
 * 每經度差 = 4 分鐘
 *
 * @param {number} actualLng - 實際經度
 * @param {number} standardLng - 時區標準經度
 * @returns {number} 時差（分鐘），正數表示需要加，負數表示需要減
 */
export function calculateLongitudeDiff(actualLng, standardLng = 120) {
  // 每度經度差 = 4 分鐘
  const diffMinutes = (actualLng - standardLng) * 4
  return Math.round(diffMinutes)
}

/**
 * 計算時間修正量（真太陽時修正）
 *
 * 包含兩部分：
 * 1. 經度時差修正
 * 2. 均時差修正（Equation of Time）
 *
 * @param {number} longitude - 經度
 * @param {Date} date - 日期
 * @param {string} timezone - 時區
 * @returns {object} { longitudeDiff, equationOfTime, totalDiff }
 */
export function calculateSolarTimeCorrection(longitude, date, timezone = 'Asia/Shanghai') {
  // 1. 經度時差修正
  const standardLng = TIMEZONE_STANDARD_LONGITUDE[timezone] || 120
  const longitudeDiff = calculateLongitudeDiff(longitude, standardLng)

  // 2. 均時差修正（簡化版）
  // 完整計算需要複雜的天文公式，這裡使用簡化估算
  const equationOfTime = calculateEquationOfTime(date)

  // 總修正量（分鐘）
  const totalDiff = longitudeDiff + equationOfTime

  return {
    longitudeDiff,        // 經度時差（分鐘）
    equationOfTime,       // 均時差（分鐘）
    totalDiff,            // 總修正量（分鐘）
    standardLng,          // 時區標準經度
    actualLng: longitude  // 實際經度
  }
}

/**
 * 計算均時差（Equation of Time）
 *
 * 均時差是由於地球橢圓軌道和地軸傾斜造成的真太陽時與平太陽時的差異
 * 範圍約 -16 到 +14 分鐘
 *
 * @param {Date} date - 日期
 * @returns {number} 均時差（分鐘）
 */
export function calculateEquationOfTime(date) {
  // 簡化公式（基於年內天數）
  const startOfYear = new Date(date.getFullYear(), 0, 1)
  const dayOfYear = Math.floor((date - startOfYear) / (1000 * 60 * 60 * 24)) + 1

  // 使用傅立葉級數近似
  const B = (2 * Math.PI * (dayOfYear - 81)) / 365

  // 簡化的均時差公式（分鐘）
  const E = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B)

  return Math.round(E)
}

/**
 * 將鐘錶時間轉換為真太陽時
 *
 * @param {object} dateTime - { year, month, day, hour, minute }
 * @param {number} longitude - 經度
 * @param {string} timezone - 時區
 * @returns {object} { solarHour, solarMinute, correction, originalHour, originalMinute }
 */
export function convertToSolarTime(dateTime, longitude, timezone = 'Asia/Shanghai') {
  const { year, month, day, hour, minute } = dateTime

  // 創建日期物件用於計算均時差
  const date = new Date(year, month - 1, day, hour, minute)

  // 計算修正量
  const correction = calculateSolarTimeCorrection(longitude, date, timezone)

  // 應用修正
  let totalMinutes = hour * 60 + minute + correction.totalDiff

  // 處理跨日情況
  let adjustedDay = day
  if (totalMinutes < 0) {
    totalMinutes += 1440 // 加一天
    adjustedDay -= 1
  } else if (totalMinutes >= 1440) {
    totalMinutes -= 1440 // 減一天
    adjustedDay += 1
  }

  const solarHour = Math.floor(totalMinutes / 60)
  const solarMinute = totalMinutes % 60

  return {
    solarHour,
    solarMinute,
    correction,
    originalHour: hour,
    originalMinute: minute,
    dayAdjusted: adjustedDay !== day,
    adjustedDay
  }
}

/**
 * 根據城市名稱獲取經緯度
 *
 * @param {string} cityName - 城市名稱
 * @returns {object|null} { lng, lat, timezone } 或 null
 */
export function getCityCoordinates(cityName) {
  return CHINA_CITIES[cityName] || null
}

/**
 * 格式化時間顯示
 *
 * @param {number} hour - 小時
 * @param {number} minute - 分鐘
 * @returns {string} 格式化後的時間字串
 */
export function formatTime(hour, minute) {
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
}

/**
 * 時辰對照表（含分鐘區間）
 */
export const SHICHEN_RANGES = [
  { name: '子時', branch: '子', start: { h: 23, m: 0 }, end: { h: 0, m: 59 }, display: '23:00-00:59' },
  { name: '丑時', branch: '丑', start: { h: 1, m: 0 }, end: { h: 2, m: 59 }, display: '01:00-02:59' },
  { name: '寅時', branch: '寅', start: { h: 3, m: 0 }, end: { h: 4, m: 59 }, display: '03:00-04:59' },
  { name: '卯時', branch: '卯', start: { h: 5, m: 0 }, end: { h: 6, m: 59 }, display: '05:00-06:59' },
  { name: '辰時', branch: '辰', start: { h: 7, m: 0 }, end: { h: 8, m: 59 }, display: '07:00-08:59' },
  { name: '巳時', branch: '巳', start: { h: 9, m: 0 }, end: { h: 10, m: 59 }, display: '09:00-10:59' },
  { name: '午時', branch: '午', start: { h: 11, m: 0 }, end: { h: 12, m: 59 }, display: '11:00-12:59' },
  { name: '未時', branch: '未', start: { h: 13, m: 0 }, end: { h: 14, m: 59 }, display: '13:00-14:59' },
  { name: '申時', branch: '申', start: { h: 15, m: 0 }, end: { h: 16, m: 59 }, display: '15:00-16:59' },
  { name: '酉時', branch: '酉', start: { h: 17, m: 0 }, end: { h: 18, m: 59 }, display: '17:00-18:59' },
  { name: '戌時', branch: '戌', start: { h: 19, m: 0 }, end: { h: 20, m: 59 }, display: '19:00-20:59' },
  { name: '亥時', branch: '亥', start: { h: 21, m: 0 }, end: { h: 22, m: 59 }, display: '21:00-22:59' }
]

/**
 * 根據小時和分鐘獲取時辰信息
 *
 * @param {number} hour - 小時 (0-23)
 * @param {number} minute - 分鐘 (0-59)
 * @returns {object} 時辰信息
 */
export function getShichenByTime(hour, minute = 0) {
  // 處理子時的特殊情況（跨日：23:00-00:59）
  if (hour === 23 || hour === 0) {
    return SHICHEN_RANGES[0] // 子時
  }

  // 其他時辰：每個時辰佔 2 小時
  // 丑時 1-2, 寅時 3-4, 卯時 5-6, 辰時 7-8, 巳時 9-10, 午時 11-12
  // 未時 13-14, 申時 15-16, 酉時 17-18, 戌時 19-20, 亥時 21-22
  for (const shichen of SHICHEN_RANGES) {
    if (hour >= shichen.start.h && hour <= shichen.end.h) {
      return shichen
    }
  }

  // 預設返回子時
  return SHICHEN_RANGES[0]
}

/**
 * 生成真太陽時說明文字
 *
 * @param {object} solarTimeResult - convertToSolarTime 的返回結果
 * @returns {string} 說明文字
 */
export function generateSolarTimeExplanation(solarTimeResult) {
  const { correction, originalHour, originalMinute, solarHour, solarMinute } = solarTimeResult

  const originalTime = formatTime(originalHour, originalMinute)
  const solarTime = formatTime(solarHour, solarMinute)

  const diff = correction.totalDiff
  const diffStr = diff > 0 ? `+${diff}` : `${diff}`

  let explanation = `鐘錶時間：${originalTime}\n`
  explanation += `經度修正：${correction.longitudeDiff > 0 ? '+' : ''}${correction.longitudeDiff} 分鐘\n`
  explanation += `均時差修正：${correction.equationOfTime > 0 ? '+' : ''}${correction.equationOfTime} 分鐘\n`
  explanation += `總修正量：${diffStr} 分鐘\n`
  explanation += `真太陽時：${solarTime}`

  if (solarTimeResult.dayAdjusted) {
    explanation += `\n⚠️ 修正後跨日`
  }

  return explanation
}

/**
 * 驗證經度範圍
 *
 * @param {number} lng - 經度
 * @returns {boolean}
 */
export function isValidLongitude(lng) {
  return lng >= -180 && lng <= 180
}

/**
 * 驗證緯度範圍
 *
 * @param {number} lat - 緯度
 * @returns {boolean}
 */
export function isValidLatitude(lat) {
  return lat >= -90 && lat <= 90
}
