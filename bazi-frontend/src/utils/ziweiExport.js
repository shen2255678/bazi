/**
 * 紫微命盤導出工具
 * 用於生成 JSON 和 Prompt 格式的完整命盤資訊
 */

import { THREE_POSITIONS, FOUR_POSITIONS } from './ziweiCompleteInfo.js'

/**
 * 生成完整的命盤資訊（JSON 格式）
 */
export function generateZiweiJSON(birthInfo, chartData) {
  const { gender, birthDate, longitude, clockTime, trueSolarTime, lunarTime } = birthInfo
  
  // 構建基本資訊
  const basicInfo = {
    gender: gender === 'male' ? '男' : '女',
    longitude: longitude || 120.0,
    clockTime: clockTime || formatDateTime(birthDate),
    trueSolarTime: trueSolarTime || formatDateTime(birthDate),
    lunarTime: lunarTime || '',
    jieqiSizhu: '', // 需要從計算結果獲取
    feijieqiSizhu: '', // 需要從計算結果獲取
    wuxingJu: chartData?.wuxingJu || '土五局',
    mingzhu: chartData?.mingzhu || '文曲',
    shenzhu: chartData?.shenzhu || '天相',
    zinianDoujun: chartData?.zinianDoujun || '巳',
    shengong: chartData?.shengong || '未'
  }

  // 構建12宮位資訊
  const palaces = generatePalacesInfo(chartData)

  // 構建格局資訊
  const patterns = {
    sanhe: generateSanhePatterns(palaces),
    sihua: generateSihuaPatterns(palaces)
  }

  // 構建大限流年資訊
  const daxianLiunian = generateDaxianLiunian(birthDate, chartData)

  return {
    basicInfo,
    palaces,
    patterns,
    daxianLiunian,
    metadata: {
      calculatedAt: new Date().toISOString(),
      version: '1.0.0'
    }
  }
}

/**
 * 生成 Prompt 格式的命盤資訊
 */
export function generateZiweiPrompt(birthInfo, chartData) {
  const json = generateZiweiJSON(birthInfo, chartData)
  
  let prompt = `請根據以下紫微命盤資訊進行詳細分析：

【基本資訊】
│ ├性別 : ${json.basicInfo.gender}
│ ├地理經度 : ${json.basicInfo.longitude}
│ ├鐘錶時間 : ${json.basicInfo.clockTime}
│ ├真太陽時 : ${json.basicInfo.trueSolarTime}
│ ├農曆時間 : ${json.basicInfo.lunarTime}
│ ├節氣四柱 : ${json.basicInfo.jieqiSizhu || '待計算'}
│ ├非節氣四柱 : ${json.basicInfo.feijieqiSizhu || '待計算'}
│ ├五行局數 : ${json.basicInfo.wuxingJu}
│ └身主:${json.basicInfo.shenzhu}; 命主:${json.basicInfo.mingzhu}; 子年斗君:${json.basicInfo.zinianDoujun}; 身宮:${json.basicInfo.shengong}

【命盤十二宮】
`

  // 添加每個宮位的詳細資訊
  json.palaces.forEach((palace, index) => {
    prompt += `│ │  │ ├${palace.name}[${palace.heavenlyStem}${palace.earthlyBranch}]`
    if (palace.isShenGong) prompt += '[身宮]'
    if (palace.isLaiYin) prompt += '[來因]'
    prompt += '\n'
    
    // 主星
    if (palace.mainStars && palace.mainStars.length > 0) {
      const mainStarsStr = palace.mainStars.map(star => {
        let str = star.name
        if (star.brightness) str += `[${star.brightness}]`
        if (star.sihua) {
          if (star.yearSihua) str += `[生年${star.sihua}]`
          if (star.daxianSihua) str += `[大限${star.sihua}]`
          if (star.liunianSihua) str += `[流年${star.sihua}]`
          if (star.direction) str += `[${star.direction}${star.sihua}]`
        }
        return str
      }).join(',')
      prompt += `│ │ ├主星 : ${mainStarsStr}\n`
    } else {
      prompt += `│ │ ├主星 : 無\n`
    }
    
    // 輔星
    if (palace.assistantStars && palace.assistantStars.length > 0) {
      const assistantStarsStr = palace.assistantStars.map(star => {
        let str = star.name
        if (star.brightness) str += `[${star.brightness}]`
        if (star.sihua) str += `[${star.sihua}]`
        if (star.direction) str += `[${star.direction}]`
        return str
      }).join(',')
      prompt += `│ │ ├輔星 : ${assistantStarsStr}\n`
    } else {
      prompt += `│ │ ├輔星 : 無\n`
    }
    
    // 小星
    if (palace.minorStars && palace.minorStars.length > 0) {
      const minorStarsStr = palace.minorStars.map(star => {
        let str = star.name
        if (star.brightness) str += `[${star.brightness}]`
        return str
      }).join(',')
      prompt += `│ │ ├小星 : ${minorStarsStr}\n`
    } else {
      prompt += `│ │ ├小星 : 無\n`
    }
    
    // 神煞
    if (palace.shenSha) {
      prompt += `│ │ ├神煞\n`
      if (palace.shenSha.suiqian) {
        prompt += `│ │ │ ├歲前星 : ${palace.shenSha.suiqian}\n`
      }
      if (palace.shenSha.jiangqian) {
        prompt += `│ │ │ ├將前星 : ${palace.shenSha.jiangqian}\n`
      }
      if (palace.shenSha.shierchang) {
        prompt += `│ │ │ ├十二長生 : ${palace.shenSha.shierchang}\n`
      }
      if (palace.shenSha.taisui) {
        prompt += `│ │ │ └太歲煞祿 : ${palace.shenSha.taisui}\n`
      }
    }
    
    // 大限、小限、流年
    if (palace.daxian) {
      prompt += `│ │ ├大限 : ${palace.daxian.age}虛歲\n`
    }
    if (palace.xiaoxian && palace.xiaoxian.length > 0) {
      prompt += `│ │ ├小限 : ${palace.xiaoxian.join(',')}虛歲\n`
    }
    if (palace.liunian && palace.liunian.length > 0) {
      prompt += `│ │ ├流年 : ${palace.liunian.join(',')}虛歲\n`
    }
    prompt += `│ │ └限流疊宮 : ${palace.xianliuDiegong ? '有' : '無'}\n`
    
    if (index < json.palaces.length - 1) {
      prompt += `│ │  \n`
    }
  })

  // 添加格局資訊
  if (json.patterns.sanhe && json.patterns.sanhe.length > 0) {
    prompt += `\n【三合派格局】\n`
    json.patterns.sanhe.forEach(pattern => {
      prompt += `│ ├${pattern.name} [${pattern.level}]\n`
      prompt += `│ │ 描述: ${pattern.description}\n`
      prompt += `│ │ 相關宮位: ${pattern.palaces.join(', ')}\n`
    })
  }

  if (json.patterns.sihua && json.patterns.sihua.length > 0) {
    prompt += `\n【四化派格局】\n`
    json.patterns.sihua.forEach(pattern => {
      prompt += `│ ├${pattern.name} [${pattern.level}]\n`
      prompt += `│ │ 描述: ${pattern.description}\n`
      prompt += `│ │ 相關宮位: ${pattern.palaces.join(', ')}\n`
    })
  }

  // 添加大限流年資訊
  if (json.daxianLiunian && json.daxianLiunian.daxian) {
    prompt += `\n【大限流年信息】\n`
    json.daxianLiunian.daxian.forEach(daxian => {
      prompt += `│ ├${daxian.age}虛歲: ${daxian.palace} [${daxian.heavenlyStem}${daxian.earthlyBranch}]\n`
    })
  }

  return prompt
}

/**
 * 生成宮位資訊
 */
function generatePalacesInfo(chartData) {
  // 這裡應該從實際的計算結果獲取，目前使用示例數據
  const palaceNames = [
    '命宮', '兄弟宮', '夫妻宮', '子女宮', '財帛宮', '疾厄宮',
    '遷移宮', '交友宮', '事業宮', '田宅宮', '福德宮', '父母宮'
  ]
  
  const branches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
  
  return palaceNames.map((name, index) => {
    const branch = branches[index]
    const stem = getStemFromBranch(branch, index)
    
    return {
      name,
      heavenlyStem: stem,
      earthlyBranch: branch,
      mainStars: getMainStarsForPalace(name, chartData),
      assistantStars: getAssistantStarsForPalace(name, chartData),
      shaStars: getShaStarsForPalace(name, chartData),
      minorStars: getMinorStarsForPalace(name, chartData),
      shenSha: getShenShaForPalace(name, chartData),
      daxian: getDaxianForPalace(name, index, chartData),
      xiaoxian: getXiaoxianForPalace(name, index),
      liunian: getLiunianForPalace(name, index),
      xianliuDiegong: false,
      isShenGong: name === (chartData?.shengong || '未'),
      isLaiYin: false,
      threePositions: THREE_POSITIONS[name] || [],
      fourPositions: FOUR_POSITIONS[name] || {}
    }
  })
}

/**
 * 生成三合派格局
 */
function generateSanhePatterns(palaces) {
  const patterns = []
  
  // 檢查紫府同宮
  const hasZiwei = palaces.some(p => p.mainStars?.some(s => s.name === '紫微'))
  const hasTianfu = palaces.some(p => p.mainStars?.some(s => s.name === '天府'))
  if (hasZiwei && hasTianfu) {
    const ziweiPalace = palaces.find(p => p.mainStars?.some(s => s.name === '紫微'))
    const tianfuPalace = palaces.find(p => p.mainStars?.some(s => s.name === '天府'))
    if (ziweiPalace?.name === tianfuPalace?.name) {
      patterns.push({
        name: '紫府同宮',
        level: '上上',
        description: '紫微與天府同宮，為帝座格局，主貴顯。',
        palaces: [ziweiPalace.name]
      })
    }
  }
  
  // 可以添加更多格局檢查邏輯
  return patterns
}

/**
 * 生成四化派格局
 */
function generateSihuaPatterns(palaces) {
  const patterns = []
  
  // 檢查化祿入命
  const mingGong = palaces.find(p => p.name === '命宮')
  if (mingGong?.mainStars?.some(s => s.sihua === '化祿')) {
    patterns.push({
      name: '化祿入命',
      level: '上',
      description: '化祿在命宮，主一生財運佳。',
      palaces: ['命宮']
    })
  }
  
  // 可以添加更多四化格局檢查邏輯
  return patterns
}

/**
 * 生成大限流年資訊
 */
function generateDaxianLiunian(birthDate, chartData) {
  if (!birthDate || !birthDate.year) return null
  
  const birthYear = birthDate.year
  const wuxingJu = chartData?.wuxingJu || '土五局'
  
  // 根據五行局數計算大限起始年齡
  const daxianStartAge = getDaxianStartAge(wuxingJu, birthDate.gender)
  
  const daxian = []
  const palaceNames = [
    '命宮', '兄弟宮', '夫妻宮', '子女宮', '財帛宮', '疾厄宮',
    '遷移宮', '交友宮', '事業宮', '田宅宮', '福德宮', '父母宮'
  ]
  
  // 生成12個大限（每個大限10年）
  for (let i = 0; i < 12; i++) {
    const startAge = daxianStartAge + i * 10
    const endAge = startAge + 9
    daxian.push({
      age: `${startAge}~${endAge}虛歲`,
      palace: palaceNames[i],
      heavenlyStem: '', // 需要根據實際計算
      earthlyBranch: '' // 需要根據實際計算
    })
  }
  
  return {
    daxian,
    liunian: generateLiunianInfo(birthYear)
  }
}

// ==================== 輔助函數 ====================

function formatDateTime(birthDate) {
  if (!birthDate) return ''
  const { year, month, day, hour, minute } = birthDate
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
}

function getStemFromBranch(branch, index) {
  const stems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
  return stems[index % 10]
}

function getMainStarsForPalace(palaceName, chartData) {
  // 這裡應該從實際計算結果獲取
  // 目前返回示例數據
  const examples = {
    '命宮': [{ name: '貪狼', brightness: '廟', sihua: null }],
    '父母宮': [{ name: '紫微', brightness: '廟' }, { name: '天府', brightness: '廟' }],
    '福德宮': [{ name: '天機', brightness: '平' }],
    '田宅宮': [{ name: '貪狼', brightness: '旺' }],
    '事業宮': [{ name: '太陽', brightness: '廟' }],
    '兄弟宮': [{ name: '武曲', brightness: '得' }],
    '交友宮': [{ name: '巨門', brightness: '不' }],
    '夫妻宮': [{ name: '天同', brightness: '利' }],
    '遷移宮': [{ name: '天相', brightness: '廟' }],
    '子女宮': [{ name: '廉貞', brightness: '利' }],
    '財帛宮': [{ name: '天梁', brightness: '廟' }],
    '疾厄宮': [{ name: '七殺', brightness: '廟' }]
  }
  return examples[palaceName] || []
}

function getAssistantStarsForPalace(palaceName, chartData) {
  const examples = {
    '福德宮': [{ name: '左輔', brightness: '廟' }],
    '事業宮': [{ name: '文昌', brightness: '廟' }],
    '交友宮': [{ name: '天魁', brightness: '旺' }],
    '夫妻宮': [{ name: '右弼', brightness: '廟' }],
    '遷移宮': [{ name: '祿存', brightness: '廟' }]
  }
  return examples[palaceName] || []
}

function getShaStarsForPalace(palaceName, chartData) {
  const examples = {
    '子女宮': [{ name: '陀羅', brightness: '陷' }],
    '疾厄宮': [{ name: '地劫', brightness: '陷' }]
  }
  return examples[palaceName] || []
}

function getMinorStarsForPalace(palaceName, chartData) {
  const examples = {
    '田宅宮': [{ name: '天貴', brightness: '廟' }]
  }
  return examples[palaceName] || []
}

function getShenShaForPalace(palaceName, chartData) {
  // 這裡應該根據實際計算結果返回
  return {
    suiqian: null,
    jiangqian: null,
    shierchang: null,
    taisui: null
  }
}

function getDaxianForPalace(palaceName, index, chartData) {
  const wuxingJu = chartData?.wuxingJu || '土五局'
  const gender = chartData?.gender || 'male'
  const startAge = getDaxianStartAge(wuxingJu, gender) + index * 10
  return {
    age: `${startAge}~${startAge + 9}虛歲`,
    heavenlyStem: '',
    earthlyBranch: ''
  }
}

function getXiaoxianForPalace(palaceName, index) {
  // 小限：命宮1歲，兄弟宮2歲，以此類推，每12年循環
  const xiaoxian = []
  for (let i = 0; i < 5; i++) {
    xiaoxian.push(index + 1 + i * 12)
  }
  return xiaoxian
}

function getLiunianForPalace(palaceName, index) {
  // 流年：與小限類似，但起始點不同
  const liunian = []
  for (let i = 0; i < 5; i++) {
    liunian.push((index + 1) % 12 + i * 12)
  }
  return liunian
}

function getDaxianStartAge(wuxingJu, gender) {
  // 根據五行局數和性別計算大限起始年齡
  const ageMap = {
    '水二局': { male: 2, female: 8 },
    '木三局': { male: 3, female: 9 },
    '金四局': { male: 4, female: 10 },
    '土五局': { male: 5, female: 11 },
    '火六局': { male: 6, female: 12 }
  }
  
  const config = ageMap[wuxingJu] || ageMap['土五局']
  return gender === 'male' ? config.male : config.female
}

function generateLiunianInfo(birthYear) {
  // 生成流年資訊（示例）
  return []
}
