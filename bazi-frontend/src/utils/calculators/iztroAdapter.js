/**
 * iztro 适配器
 * 将 iztro 库的数据格式转换为现有 UI 组件期望的格式
 */

// 使用動態導入以避免構建時錯誤
// import { astro } from 'iztro'

// 十二地支順序
const BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

// 十二宮位順序（從命宮開始）
const PALACE_ORDER = ['命宮', '兄弟宮', '夫妻宮', '子女宮', '財帛宮', '疾厄宮', 
                      '遷移宮', '交友宮', '官祿宮', '田宅宮', '福德宮', '父母宮']

/**
 * 將時辰名稱轉換為數字（0-11）
 * iztro 的時辰索引：0=子時(23:00-01:00), 1=丑時(01:00-03:00), ..., 11=亥時(21:00-23:00)
 * @param {string} shichen - 時辰名稱，如 "子時"、"未時"
 * @returns {number} 時辰索引（0-11）
 */
function shichenToHour(shichen) {
  const shichenMap = {
    '子': 0, '丑': 1, '寅': 2, '卯': 3, '辰': 4, '巳': 5,
    '午': 6, '未': 7, '申': 8, '酉': 9, '戌': 10, '亥': 11
  }
  
  // 如果已經是數字，直接返回
  if (typeof shichen === 'number') {
    return shichen
  }
  
  // 去掉"時"字，只保留地支
  const branch = shichen.replace('時', '')
  return shichenMap[branch] !== undefined ? shichenMap[branch] : 0
}

/**
 * 轉換 iztro 的星曜數據為我們的格式
 * @param {Array} stars - iztro 的星曜數組
 * @returns {Array} 轉換後的星曜數組
 */
function convertStars(stars) {
  if (!stars || !Array.isArray(stars)) {
    return []
  }

  return stars.map(star => {
    // iztro 的星曜可能是字符串或對象
    if (typeof star === 'string') {
      return {
        name: star,
        brightness: null,
        sihua: null
      }
    }

    // iztro 的星曜對象結構：{ name, type, scope, brightness, mutagen? }
    const starName = star.name || String(star)
    const brightness = star.brightness || null

    // 處理四化：iztro 使用 mutagen 屬性，可能是字符串或對象
    let sihua = null
    let yearSihua = false
    let direction = null

    if (star.mutagen) {
      if (typeof star.mutagen === 'string') {
        // 如果是 '祿'、'權'、'科'、'忌' 直接使用
        // 如果是 '化祿'、'化權' 等，提取後面的字
        sihua = star.mutagen.includes('化') ? star.mutagen.replace('化', '') : star.mutagen
        yearSihua = true

        // 設置方向標記（祿和權向上↑，忌向下↓）
        if (sihua === '祿' || sihua === '權') {
          direction = '↑'
        } else if (sihua === '忌') {
          direction = '↓'
        }
      } else if (typeof star.mutagen === 'object') {
        // 如果是物件，嘗試不同的屬性
        const mutagenValue = star.mutagen.type || star.mutagen.name || star.mutagen.value || String(star.mutagen)
        sihua = mutagenValue.includes('化') ? mutagenValue.replace('化', '') : mutagenValue
        yearSihua = true

        if (sihua === '祿' || sihua === '權') {
          direction = '↑'
        } else if (sihua === '忌') {
          direction = '↓'
        }
      }
    }

    return {
      name: starName,
      brightness: brightness,
      sihua: sihua,
      yearSihua: yearSihua,
      direction: direction
    }
  })
}

/**
 * 使用 iztro 計算紫微斗數排盤
 * @param {Object} birthInfo - 出生資訊
 * @param {Object} baziResult - 八字計算結果（可選）
 * @returns {Object} 完整的命盤數據
 */
export async function calculateZiweiChartWithIztro(birthInfo, baziResult = null) {
  try {
    const { birthDate, gender } = birthInfo
    const { shichen } = baziResult || {}
    
    if (!birthDate || !birthDate.year || !birthDate.month || !birthDate.day) {
      console.warn('calculateZiweiChartWithIztro: 缺少必要數據', { birthDate })
      return null
    }
    
    // 格式化日期字符串
    const dateStr = `${birthDate.year}-${String(birthDate.month).padStart(2, '0')}-${String(birthDate.day).padStart(2, '0')}`
    
    // 轉換時辰
    const hour = shichenToHour(shichen || '子時')
    
    // 轉換性別：iztro 使用中文 '男' 或 '女'
    const genderStr = gender === 'male' || gender === 'male' ? '男' : '女'

    // 使用真太陽時（如果有的話）
    const fixLeap = true // 修正閏月

    // 動態導入 iztro
    const { astro } = await import('iztro')

    console.log('iztro 排盤參數:', {
      date: dateStr,
      hour: hour,
      gender: genderStr,
      fixLeap: fixLeap,
      locale: 'zh-TW'
    })

    // 調用 iztro 排盤
    // astro.bySolar(date, time, gender, fixLeap, locale)
    const astrolabe = astro.bySolar(dateStr, hour, genderStr, fixLeap, 'zh-TW')
    
    if (!astrolabe) {
      console.warn('iztro 排盤失敗')
      return null
    }
    
    console.log('iztro astrolabe:', astrolabe)
    console.log('iztro palaces 數量:', astrolabe.palaces?.length)

    // 獲取所有宮位
    // iztro 的 palaces 是一個數組，按順序排列（從命宮開始）
    const palaces = astrolabe.palaces || []

    if (palaces.length !== 12) {
      console.warn('iztro 返回的宮位數量不正確:', palaces.length)
      console.log('iztro astrolabe 完整對象:', JSON.stringify(astrolabe, null, 2))
      return null
    }

    console.log('iztro 第一個宮位:', palaces[0])
    console.log('iztro 第一個宮位的主星:', palaces[0]?.majorStars)

    // 找到命宮（iztro 中命宮可能不是第一個，需要查找 isOriginalPalace 或 name === '命宮'）
    const mingGongPalace = palaces.find(p => p.isOriginalPalace || p.name === '命宮') || palaces[0]
    if (!mingGongPalace) {
      console.warn('找不到命宮')
      return null
    }

    console.log('命宮資料:', mingGongPalace)

    // iztro 的宮位對象屬性名稱
    const mingGongBranch = mingGongPalace.earthlyBranch || mingGongPalace.branch || mingGongPalace.earthly
    const mingGongPos = BRANCHES.indexOf(mingGongBranch)
    
    if (mingGongPos === -1) {
      console.warn('命宮地支索引查找失敗:', mingGongBranch)
      return null
    }
    
    // 構建按地支索引排列的宮位數組
    // iztro 的 palaces 是按順序排列的（從命宮開始），我們需要按地支索引重新組織
    const place12 = []
    
    // 首先建立地支到宮位的映射
    const branchToPalace = {}
    palaces.forEach((palace, idx) => {
      // iztro 的宫位对象可能有不同的属性名
      const branch = palace.earthlyBranch || palace.branch || palace.earthly || null
      if (branch) {
        branchToPalace[branch] = palace
      } else {
        console.warn(`宮位 ${idx} (${palace.name}) 沒有地支信息:`, palace)
      }
    })
    
    console.log('branchToPalace 映射:', Object.keys(branchToPalace))
    
    // 按地支索引順序構建 place12
    for (let i = 0; i < 12; i++) {
      const branch = BRANCHES[i]
      const palace = branchToPalace[branch]
      
      if (!palace) {
        console.warn(`找不到地支 ${branch} 對應的宮位，創建空宮位`)
        // 計算從命宮開始的宮位索引
        const palaceIndex = (12 - mingGongPos + i) % 12
        place12[i] = {
          branchIndex: i,
          palaceIndex: palaceIndex,
          heavenlyStem: '',
          earthlyBranch: BRANCHES[i],
          name: PALACE_ORDER[palaceIndex],
          palaceName: PALACE_ORDER[palaceIndex],
          mainStars: [],
          assistantStars: [],
          shaStars: [],
          minorStars: [],
          isMingGong: i === mingGongPos,
          isShenGong: false
        }
        continue
      }
      
      // iztro 的星曜數據結構：
      // majorStars: 主星數組
      // minorStars: 輔星數組
      // adjectiveStars: 形容詞星數組（包含煞星、雜曜等）
      const mainStars = convertStars(palace.majorStars || [])
      const assistantStars = convertStars(palace.minorStars || [])

      // 從 adjectiveStars 中分離不同類型的星曜
      const adjectiveStars = palace.adjectiveStars || []

      // 煞星通常 type 包含 'malefic', 'adverse' 等
      // 雜曜/小星可能包含 'flower', 'helper' 等
      const shaStars = convertStars(adjectiveStars.filter(s =>
        s.type === 'malefic' || s.type === 'adverse' ||
        (s.name && (s.name.includes('煞') || s.name.includes('劫') || s.name.includes('空')))
      ))

      const minorStars = convertStars(adjectiveStars.filter(s =>
        s.type === 'flower' || s.type === 'helper' ||
        (!shaStars.find(sha => sha.name === s.name))
      ))
      
      // 計算從命宮開始的宮位索引
      const palaceIndex = (12 - mingGongPos + i) % 12
      
      place12[i] = {
        branchIndex: i, // 地支索引（0=子, 1=丑, ..., 11=亥）
        palaceIndex: palaceIndex, // 從命宮開始的宮位索引
        heavenlyStem: palace.heavenlyStem || palace.heavenly || '',
        earthlyBranch: BRANCHES[i],
        name: palace.name || PALACE_ORDER[palaceIndex],
        palaceName: palace.name || PALACE_ORDER[palaceIndex],
        mainStars: mainStars,
        assistantStars: assistantStars,
        shaStars: shaStars,
        minorStars: minorStars,
        isMingGong: i === mingGongPos,
        isShenGong: palace.isBodyPalace || false
      }
    }
    
    // 確保 place12 數組完整（12個元素）
    if (place12.length !== 12) {
      console.warn('place12 數組不完整，長度:', place12.length)
      // 填充缺失的元素
      for (let i = place12.length; i < 12; i++) {
        const palaceIndex = (12 - mingGongPos + i) % 12
        place12[i] = {
          branchIndex: i,
          palaceIndex: palaceIndex,
          heavenlyStem: '',
          earthlyBranch: BRANCHES[i],
          name: PALACE_ORDER[palaceIndex],
          palaceName: PALACE_ORDER[palaceIndex],
          mainStars: [],
          assistantStars: [],
          shaStars: [],
          minorStars: [],
          isMingGong: i === mingGongPos,
          isShenGong: false
        }
      }
    }
    
    // 獲取其他資訊
    // iztro 的 astrolabe 對象包含基本信息
    // 可能的屬性包括：fiveElementsClass, soulStar, bodyStar 等
    console.log('iztro astrolabe 屬性:', Object.keys(astrolabe))
    console.log('iztro fiveElementsClass:', astrolabe.fiveElementsClass)
    console.log('iztro soulStar:', astrolabe.soulStar)
    console.log('iztro bodyStar:', astrolabe.bodyStar)

    // 計算所有宮位的天干和地支
    const stems = []
    const branches = []
    for (let i = 0; i < 12; i++) {
      if (place12[i]) {
        stems.push(place12[i].heavenlyStem)
        branches.push(place12[i].earthlyBranch)
      }
    }

    // 獲取身宮位置
    const shenGongPalace = palaces.find(p => p.isBodyPalace)
    const shenGongBranch = shenGongPalace ? (shenGongPalace.earthlyBranch || shenGongPalace.branch || shenGongPalace.earthly) : null
    const shenGongPos = shenGongBranch ? BRANCHES.indexOf(shenGongBranch) : -1

    console.log('身宮位置:', shenGongBranch, '索引:', shenGongPos)

    // 構建結果
    const result = {
      mingGongIndex: mingGongPos,
      shenGongIndex: shenGongPos,
      branches,
      stems,
      mainStars: {}, // 保留向後兼容
      wuxingJu: astrolabe.fiveElementsClass || '土五局',
      mingzhu: astrolabe.soulStar || '文曲',
      shenzhu: astrolabe.bodyStar || '天相',
      zinianDoujun: astrolabe.earthlyBranchOfSoulPalace || '巳',
      shengong: shenGongBranch || '未',
      palaces: place12
    }
    
    console.log('iztro 第一個宮位示例:', palaces[0])
    if (palaces[0] && palaces[0].majorStars) {
      console.log('iztro 第一個宮位的主星:', palaces[0].majorStars)
      if (palaces[0].majorStars.length > 0) {
        console.log('第一個主星的完整對象:', palaces[0].majorStars[0])
        console.log('第一個主星的名稱:', palaces[0].majorStars[0]?.name)
      }
    }
    console.log('place12 數組長度:', place12.length)
    if (place12.length > 0 && place12[0].mainStars && place12[0].mainStars.length > 0) {
      console.log('place12[0] 的主星:', place12[0].mainStars)
      console.log('place12[0] 第一個主星名稱:', place12[0].mainStars[0]?.name)
    }
    
    console.log('calculateZiweiChartWithIztro 計算完成，返回結果:', result)
    return result
    
  } catch (error) {
    console.error('iztro 排盤錯誤:', error)
    return null
  }
}
