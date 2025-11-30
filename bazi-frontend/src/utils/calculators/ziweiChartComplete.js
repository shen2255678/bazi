/**
 * 完整的紫微斗數排盤計算器
 * 參考 https://github.com/cubshuang/ZiWeiDouShu 實現
 */

// 十二宮位順序（逆時針）
const PALACE_ORDER = ['命宮', '兄弟宮', '夫妻宮', '子女宮', '財帛宮', '疾厄宮', 
                      '遷移宮', '交友宮', '官祿宮', '田宅宮', '福德宮', '父母宮']

// 十二地支順序
const BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

// 十天干順序
const STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']

// 五行局
const FIVE_ELEMENTS = ['水二局', '火六局', '土五局', '木三局', '金四局']

// 14主星名稱
const STAR_A14 = ['紫微', '天機', '太陽', '武曲', '天同', '廉貞', '天府', '太陰', '貪狼', '巨門', '天相', '天梁', '七殺', '破軍']

// 輔星名稱
const STAR_A07 = ['文昌', '文曲', '左輔', '右弼', '天魁', '天鉞', '祿存']

// 四化星名稱
const STAR_S04 = ['化祿', '化權', '化科', '化忌']

// 煞星名稱
const STAR_B06 = ['擎羊', '陀羅', '火星', '鈴星', '天空', '地劫']

// 雜曜名稱
const STAR_OS5 = ['天馬', '龍池', '鳳閣', '紅鸞', '天喜']

// 五行局對應的紫微星安星表（根據農曆日期1-30）
const FIVE_ELE_TABLE = [
  // 水二局
  [1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,0,0,1,1,2,2,3,3,4],
  // 火六局
  [9,6,11,4,1,2,10,7,0,5,2,3,11,8,1,6,3,4,0,9,2,7,4,5,1,10,3,8,5,6],
  // 土五局
  [6,11,4,1,2,7,0,5,2,3,8,1,6,3,4,9,2,7,4,5,10,3,8,5,6,11,4,9,6,7],
  // 木三局
  [4,1,2,5,2,3,6,3,4,7,4,5,8,5,6,9,6,7,10,7,8,11,8,9,0,9,10,1,10,11],
  // 金四局
  [11,4,1,2,0,5,2,3,1,6,3,4,2,7,4,5,3,8,5,6,4,9,6,7,5,10,7,8,6,11]
]

// 五行局數對應表（根據年干和命宮地支）
const FIVE_ELE_ARR = [
  [0,1,3,2,4,1], // 甲、己
  [1,2,4,3,0,2], // 乙、庚
  [2,3,0,4,1,3], // 丙、辛
  [3,4,1,0,2,4], // 丁、壬
  [4,0,2,1,3,0]  // 戊、癸
]

// 14主星安星表（根據紫微星位置）
const STAR_A14_TABLE = [
  [[0],[],[13],[],[5,6],[7],[8],[4,9],[3,10],[2,11],[12],[1]],
  [[1],[0,13],[],[6],[7],[5,8],[9],[10],[4,11],[3,12],[2],[]],
  [[13],[1],[0,6],[7],[8],[9],[5,10],[11],[12],[10],[3],[2]],
  [[2],[6],[1,7],[0,8],[9],[10],[11],[5,12],[],[],[4],[3,13]],
  [[3,6],[2,7],[8],[1,9],[0,10],[11],[12],[],[5],[],[13],[4]],
  [[4,7],[3,8],[2,9],[10],[1,10],[0,12],[],[],[],[5,13],[],[6]],
  [[8],[4,9],[3,10],[2,11],[12],[1],[0],[],[13],[],[5,6],[7]],
  [[9],[10],[4,11],[3,12],[2],[],[1],[0,13],[],[6],[7],[5,8]],
  [[5,10],[11],[12],[10],[3],[2],[13],[1],[0,6],[7],[8],[9]],
  [[11],[5,12],[],[],[4],[3,13],[2],[6],[1,7],[0,8],[9],[10]],
  [[12],[],[5],[],[13],[4],[3,6],[2,7],[8],[1,9],[0,10],[11]],
  [[],[],[],[5,13],[],[6],[4,7],[3,8],[2,9],[10],[1,10],[0,12]]
]

// 紫微星系安星表（6顆星）
const STAR_Z06 = [
  [0,1,2,3,4,5,6,7,8,9,10,11],
  [11,0,1,2,3,4,5,6,7,8,9,10],
  [9,10,11,0,1,2,3,4,5,6,7,8],
  [8,9,10,11,0,1,2,3,4,5,6,7],
  [7,8,9,10,11,0,1,2,3,4,5,6],
  [4,5,6,7,8,9,10,11,0,1,2,3],
  [4,3,2,1,0,11,10,9,8,7,6,5]
]

// 天府星系安星表（8顆星）
const STAR_T08 = [
  [0,1,2,3,4,5,6,7,8,9,10,11],
  [1,2,3,4,5,6,7,8,9,10,11,0],
  [2,3,4,5,6,7,8,9,10,11,0,1],
  [3,4,5,6,7,8,9,10,11,0,1,2],
  [4,5,6,7,8,9,10,11,0,1,2,3],
  [5,6,7,8,9,10,11,0,1,2,3,4],
  [6,7,8,9,10,11,0,1,2,3,4,5],
  [10,11,0,1,2,3,4,5,6,7,8,9]
]

// 輔星安星表（7顆星）
// 0:文昌 1:文曲 (時) 2:左輔 3:右弼 (月) 4:天魁 5:天鉞 6:祿存(年干)
const STAR_G07 = [
  [10,9,8,7,6,5,4,3,2,1,0,11], // 文昌（根據時辰）
  [4,5,6,7,8,9,10,11,0,1,2,3], // 文曲（根據時辰）
  [4,5,6,7,8,9,10,11,0,1,2,3], // 左輔（根據月份）
  [10,9,8,7,6,5,4,3,2,1,0,11], // 右弼（根據月份）
  [1,0,11,11,1,0,1,6,3,3],     // 天魁（根據年干）
  [7,8,9,9,7,8,7,2,5,5],       // 天鉞（根據年干）
  [2,3,5,6,5,6,8,9,11,0]       // 祿存（根據年干）
]

// 四化星表（根據年干）
// 參考：Star_S04[0-3] 分別對應化祿、化權、化科、化忌
// Star_S04[0][y1Pos] = 化祿星, Star_S04[1][y1Pos] = 化權星, 等等
// 0:化祿 1:化權 2:化科 3:化忌
const STAR_S04_TABLE = [
  // 化祿星列表（10個年干）
  [STAR_A14[5], STAR_A14[13], STAR_A14[3], STAR_A14[2], STAR_A14[8], STAR_A14[3], STAR_A14[2], STAR_A14[9], STAR_A14[11], STAR_A14[13]],
  // 化權星列表
  [STAR_A14[1], STAR_A14[11], STAR_A14[0], STAR_A14[7], STAR_A14[7], STAR_A14[8], STAR_A14[3], STAR_A14[2], STAR_A14[0], STAR_A14[9]],
  // 化科星列表
  [STAR_A14[4], STAR_A14[1], STAR_A07[0], STAR_A14[1], STAR_A07[3], STAR_A14[11], STAR_A14[7], STAR_A07[1], STAR_A07[2], STAR_A14[7]],
  // 化忌星列表
  [STAR_A14[7], STAR_A14[8], STAR_A14[5], STAR_A14[9], STAR_A14[1], STAR_A07[1], STAR_A14[4], STAR_A07[0], STAR_A14[3], STAR_A14[8]]
]

// 煞星安星表
const STAR_B06_TABLE = [
  [3,4,6,7,6,7,9,10,0,1], // 擎羊（根據年干）
  [1,2,4,5,4,5,7,8,10,11], // 陀羅（根據年干）
  [[2,3,4,5,6,7,8,9,10,11,0,1],[3,4,5,6,7,8,9,10,11,0,1,2],[1,2,3,4,5,6,7,8,9,10,11,0],[9,10,11,0,1,2,3,4,5,6,7,8]], // 火星（根據年支和時辰）
  [[10,11,0,1,2,3,4,5,6,7,8,9],[10,11,0,1,2,3,4,5,6,7,8,9],[3,4,5,6,7,8,9,10,11,0,1,2],[10,11,0,1,2,3,4,5,6,7,8,9]], // 鈴星（根據年支和時辰）
  [11,10,9,8,7,6,5,4,3,2,1,0], // 天空（根據時辰）
  [11,0,1,2,3,4,5,6,7,8,9,10]  // 地劫（根據時辰）
]

// 雜曜安星表
const STAR_OS5_TABLE = [
  [2,11,8,5,2,11,8,5,2,11,8,5], // 天馬（根據年支）
  [4,5,6,7,8,9,10,11,0,1,2,3], // 龍池（根據年支）
  [10,9,8,7,6,5,4,3,2,1,0,11], // 鳳閣（根據年支）
  [3,2,1,0,11,10,9,8,7,6,5,4], // 紅鸞（根據年支）
  [9,8,7,6,5,4,3,2,1,0,11,10]  // 天喜（根據年支）
]

/**
 * 計算命宮位置
 * @param {number} month - 生月（1-12）
 * @param {number} hourIndex - 時辰索引（0-11）
 * @returns {number} 命宮位置索引
 */
function calculateMingGongPos(month, hourIndex) {
  // 參考：l=EarthlyBranches[((12-hPos)+1+m*1.0)%12]
  return ((12 - hourIndex) + 1 + month) % 12
}

/**
 * 計算身宮位置
 * @param {number} month - 生月（1-12）
 * @param {number} hourIndex - 時辰索引（0-11）
 * @returns {number} 身宮位置索引
 */
function calculateShenGongPos(month, hourIndex) {
  // 參考：b=EarthlyBranches[(12-((22-hPos)+1-m*1.0)%12)%12]
  return (12 - ((22 - hourIndex) + 1 - month) % 12) % 12
}

/**
 * 計算五行局數
 * @param {number} yearStemIndex - 年干索引（0-9）
 * @param {number} mingGongPos - 命宮位置索引（0-11）
 * @returns {string} 五行局數
 */
function calculateWuxingJu(yearStemIndex, mingGongPos) {
  // 參考：f=FiveElements[FiveEleArr[y1Pos%5][((lPos-(lPos%2==0?0:1))/2)%6]]
  const stemGroup = yearStemIndex % 5
  const branchGroup = Math.floor((mingGongPos - (mingGongPos % 2 === 0 ? 0 : 1)) / 2) % 6
  const wuxingIndex = FIVE_ELE_ARR[stemGroup][branchGroup]
  return FIVE_ELEMENTS[wuxingIndex]
}

/**
 * 計算紫微星位置
 * @param {string} wuxingJu - 五行局數
 * @param {number} lunarDay - 農曆日期（1-30）
 * @returns {number} 紫微星位置索引
 */
function calculateZiweiPos(wuxingJu, lunarDay) {
  // 參考：z=EarthlyBranches[FiveEleTable[FiveElements.indexOf(f)][d-1]]
  const wuxingIndex = FIVE_ELEMENTS.indexOf(wuxingJu)
  if (wuxingIndex === -1) return 0
  const dayIndex = Math.max(0, Math.min(29, lunarDay - 1))
  return FIVE_ELE_TABLE[wuxingIndex][dayIndex]
}

/**
 * 獲取星曜在指定宮位的位置
 * @param {Array} starTable - 星曜表
 * @param {number} pos - 位置索引
 * @returns {Array} 星曜索引陣列
 */
function getStarArr(starTable, size, pos) {
  const starArray = []
  for (let i = 0; i < size; i++) {
    if (Array.isArray(starTable[i])) {
      starArray.push(starTable[i][pos])
    } else {
      starArray.push(starTable[i])
    }
  }
  return starArray
}

/**
 * 獲取星曜在指定位置陣列中的位置
 * @param {Array} starTable - 星曜表
 * @param {number} size - 大小
 * @param {Array} posArr - 位置陣列
 * @returns {Array} 星曜索引陣列
 */
function getStarArrByPosArr(starTable, size, posArr) {
  const starArray = []
  for (let i = 0; i < size; i++) {
    if (Array.isArray(starTable[i])) {
      starArray.push(starTable[i][posArr[i]])
    } else {
      starArray.push(starTable[i][posArr[i]])
    }
  }
  return starArray
}

/**
 * 獲取四化星標記
 * @param {string} starName - 星曜名稱
 * @param {Array} sS04 - 四化星陣列 [化祿星, 化權星, 化科星, 化忌星]
 * @returns {string} 四化標記（祿、權、科、忌）
 * 參考：getS04Str: return (STAR.indexOf(starName)>=0)?StarM_S04[STAR.indexOf(starName)]:""
 * 注意：StarM_S04 = ['化祿','化權','化科','化忌']
 * 所以返回的是完整的四化名稱，但我們只需要標記，所以返回第二個字符
 */
function getS04Str(starName, sS04) {
  if (!sS04 || sS04.length !== 4) return ''
  
  // 參考代碼：sS04.indexOf(starName) 找到索引，然後返回對應的四化名稱
  // sS04[0] = 化祿星名稱, sS04[1] = 化權星名稱, sS04[2] = 化科星名稱, sS04[3] = 化忌星名稱
  const index = sS04.indexOf(starName)
  if (index >= 0 && index < 4) {
    // 返回對應的四化標記：'祿'、'權'、'科'、'忌'
    return STAR_S04[index].substring(1, 2)
  }
  
  return ''
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
  
  console.log('calculateZiweiChart 輸入:', { birthDate, gender, pillars, shichen })
  
  if (!birthDate || !pillars) {
    console.warn('calculateZiweiChart: 缺少必要數據', { birthDate, pillars })
    return null
  }
  
  // 獲取農曆日期
  let lunarDay = birthDate.day || 1
  try {
    // 直接使用 lunar-javascript 獲取農曆日期
    const { Solar } = await import('lunar-javascript')
    const solar = Solar.fromYmd(birthDate.year, birthDate.month, birthDate.day)
    const lunar = solar.getLunar()
    const dayInChinese = lunar.getDayInChinese()
    
    if (dayInChinese) {
      const { convertChineseDayToNumber } = await import('../chineseNumberConverter.js')
      lunarDay = convertChineseDayToNumber(dayInChinese)
      if (!lunarDay || lunarDay < 1 || lunarDay > 30) {
        console.warn('農曆日期轉換失敗，使用公曆日期:', dayInChinese)
        lunarDay = birthDate.day || 1
      }
    }
  } catch (error) {
    console.warn('獲取農曆日期失敗，使用公曆日期:', error)
    lunarDay = birthDate.day || 1
  }
  
  // 獲取基本信息
  const yearStem = pillars.year.stem
  const yearBranch = pillars.year.branch
  
  // 獲取農曆月份（參考：m=lunar.m）
  let month = birthDate.month || 1
  try {
    const { Solar } = await import('lunar-javascript')
    const solar = Solar.fromYmd(birthDate.year, birthDate.month, birthDate.day)
    const lunar = solar.getLunar()
    month = lunar.getMonth() // 獲取農曆月份（1-12）
  } catch (error) {
    console.warn('獲取農曆月份失敗，使用公曆月份:', error)
    month = birthDate.month || 1
  }
  
  const shichenName = shichen || '子'
  
  // 從時辰名稱中提取地支（去掉"時"字）
  // 例如："未時" -> "未", "子時" -> "子"
  const shichenBranch = shichenName.replace('時', '') || '子'
  
  // 計算索引
  const yearStemIndex = STEMS.indexOf(yearStem)
  const yearBranchIndex = BRANCHES.indexOf(yearBranch)
  const hourIndex = BRANCHES.indexOf(shichenBranch)
  
  console.log('索引計算結果:', { yearStem, yearBranch, shichenName, shichenBranch, yearStemIndex, yearBranchIndex, hourIndex })
  
  if (yearStemIndex === -1 || yearBranchIndex === -1 || hourIndex === -1) {
    console.warn('索引查找失敗:', { yearStemIndex, yearBranchIndex, hourIndex })
    return null
  }
  
  // 計算命宮和身宮位置
  const mingGongPos = calculateMingGongPos(month, hourIndex)
  const shenGongPos = calculateShenGongPos(month, hourIndex)
  
  // 計算五行局數
  const wuxingJu = calculateWuxingJu(yearStemIndex, mingGongPos)
  
  // 計算紫微星位置
  const ziweiPos = calculateZiweiPos(wuxingJu, lunarDay)
  
  // 安14主星
  const s14 = STAR_A14_TABLE[ziweiPos]
  const sZ06 = getStarArr(STAR_Z06, 7, ziweiPos)
  const sT08 = getStarArr(STAR_T08, 8, sZ06[6]) // 天府位置
  
  // 安輔星
  const sG07 = getStarArrByPosArr(STAR_G07, 7, [hourIndex, hourIndex, month - 1, month - 1, yearStemIndex, yearStemIndex, yearStemIndex])
  
  // 安四化星（根據年干）
  // 參考：sS04=this.getStarArr(Star_S04,4,y1Pos)
  // getStarArr(Star_S04,4,y1Pos) 表示從 Star_S04 的每一行（共4行）中取第 y1Pos 列
  // sS04[0]=化祿星, sS04[1]=化權星, sS04[2]=化科星, sS04[3]=化忌星
  const sS04 = getStarArr(STAR_S04_TABLE, 4, yearStemIndex)
  
  // 安煞星
  const yearBranchGroup = yearBranchIndex % 4
  const sB06 = [
    STAR_B06_TABLE[0][yearStemIndex], // 擎羊
    STAR_B06_TABLE[1][yearStemIndex], // 陀羅
    Array.isArray(STAR_B06_TABLE[2][yearBranchGroup]) ? STAR_B06_TABLE[2][yearBranchGroup][hourIndex] : STAR_B06_TABLE[2][yearBranchGroup], // 火星
    Array.isArray(STAR_B06_TABLE[3][yearBranchGroup]) ? STAR_B06_TABLE[3][yearBranchGroup][hourIndex] : STAR_B06_TABLE[3][yearBranchGroup], // 鈴星
    STAR_B06_TABLE[4][hourIndex], // 天空
    STAR_B06_TABLE[5][hourIndex]  // 地劫
  ]
  
  // 安雜曜
  const OS05 = getStarArr(STAR_OS5_TABLE, 5, yearBranchIndex)
  
  // 組裝12宮位
  // 參考代碼：Place12[i] 中 i 是地支索引（0=子, 1=丑, ..., 11=亥）
  // MangB: Palace[(12-lPos+i)%12] 表示該地支對應的宮位名稱
  // 注意：參考代碼中，Place12[i] 保持地支索引順序，不重新排列
  const place12 = []
  for (let i = 0; i < 12; i++) {
    // i 是地支索引（從子開始：0=子, 1=丑, ..., 11=亥）
    const mainStars = []
    const assistantStars = []
    const shaStars = []
    const minorStars = []
    
    // 紫微星系（6顆）
    for (let k = 0; k < 6; k++) {
      if (sZ06[k] === i) {
        const starName = STAR_A14[k]
        const sihua = getS04Str(starName, sS04)
        mainStars.push({
          name: starName,
          sihua: sihua || null,
          yearSihua: !!sihua
        })
      }
    }
    
    // 天府星系（8顆）
    for (let k = 0; k < 8; k++) {
      if (sT08[k] === i) {
        const starName = STAR_A14[k + 6]
        const sihua = getS04Str(starName, sS04)
        mainStars.push({
          name: starName,
          sihua: sihua || null,
          yearSihua: !!sihua
        })
      }
    }
    
    // 輔星（7顆）
    for (let k = 0; k < 7; k++) {
      if (sG07[k] === i) {
        const starName = STAR_A07[k]
        const sihua = getS04Str(starName, sS04)
        assistantStars.push({
          name: starName,
          sihua: sihua || null
        })
      }
    }
    
    // 煞星（6顆）
    for (let k = 0; k < 6; k++) {
      if (sB06[k] === i) {
        shaStars.push({
          name: STAR_B06[k]
        })
      }
    }
    
    // 雜曜（5顆）
    for (let k = 0; k < 5; k++) {
      if (OS05[k] === i) {
        minorStars.push({
          name: STAR_OS5[k]
        })
      }
    }
    
    // 計算該地支對應的宮位名稱（參考：Palace[(12-lPos+i)%12]）
    const palaceIndex = (12 - mingGongPos + i) % 12
    // 計算天干（參考：MangA: HeavenlyStems[((y1Pos%5)*2+(i<2?i+2:i)%10)%10]）
    const stemIndex = ((yearStemIndex % 5) * 2 + (i < 2 ? i + 2 : i) % 10) % 10
    
    place12[i] = {
      branchIndex: i, // 地支索引（0=子, 1=丑, ..., 11=亥）
      palaceIndex: palaceIndex, // 從命宮開始的宮位索引（0=命宮, 1=兄弟宮, ...）
      heavenlyStem: STEMS[stemIndex],
      earthlyBranch: BRANCHES[i],
      name: PALACE_ORDER[palaceIndex], // 該地支對應的宮位名稱（動態計算）
      palaceName: PALACE_ORDER[palaceIndex], // 保留向後兼容
      mainStars: mainStars,
      assistantStars: assistantStars,
      shaStars: shaStars,
      minorStars: minorStars,
      isMingGong: i === mingGongPos,
      isShenGong: i === shenGongPos
    }
  }
  
  // 計算其他資訊
  // 命主：根據命宮地支計算
  const mingzhu = calculateMingzhu(BRANCHES[mingGongPos])
  const shenzhu = calculateShenzhu(yearBranch)
  const zinianDoujun = calculateZinianDoujun(yearBranch, month)
  
  // 計算所有宮位的天干（按地支索引順序）
  const stems = []
  for (let i = 0; i < 12; i++) {
    stems.push(place12[i].heavenlyStem)
  }
  
  // 計算所有宮位的地支（按地支索引順序）
  const branches = []
  for (let i = 0; i < 12; i++) {
    branches.push(place12[i].earthlyBranch)
  }
  
  // 參考代碼中，Place12[i] 的 i 是地支索引（0=子, 1=丑, ..., 11=亥）
  // 每個 Place12[i] 包含動態計算的宮位名稱（通過 Palace[(12-lPos+i)%12]）
  // 因此直接返回 place12，讓 UI 組件根據地支索引來查找對應的宮位數據
  const result = {
    mingGongIndex: mingGongPos,
    shenGongIndex: shenGongPos,
    branches,
    stems,
    mainStars: {}, // 保留向後兼容
    wuxingJu,
    mingzhu,
    shenzhu,
    zinianDoujun,
    shengong: BRANCHES[shenGongPos],
    palaces: place12 // 直接返回按地支索引的數組
  }
  
  console.log('calculateZiweiChart 計算完成，返回結果:', result)
  return result
}

/**
 * 計算命主
 */
function calculateMingzhu(mingGongBranch) {
  const mingzhuTable = {
    '子': '貪狼', '丑': '巨門', '寅': '祿存', '卯': '文曲',
    '辰': '廉貞', '巳': '武曲', '午': '破軍', '未': '武曲',
    '申': '廉貞', '酉': '文曲', '戌': '祿存', '亥': '巨門'
  }
  return mingzhuTable[mingGongBranch] || '文曲'
}

/**
 * 計算身主
 */
function calculateShenzhu(yearBranch) {
  const shenzhuTable = {
    '子': '火星', '丑': '天相', '寅': '天梁', '卯': '天同',
    '辰': '文昌', '巳': '天機', '午': '火星', '未': '天相',
    '申': '天梁', '酉': '天同', '戌': '文昌', '亥': '天機'
  }
  return shenzhuTable[yearBranch] || '天相'
}

/**
 * 計算子年斗君
 */
function calculateZinianDoujun(yearBranch, month) {
  const yearBranchIndex = BRANCHES.indexOf(yearBranch)
  if (yearBranchIndex === -1) return '巳'
  const doujunIndex = (yearBranchIndex + month - 1) % 12
  return BRANCHES[doujunIndex]
}
