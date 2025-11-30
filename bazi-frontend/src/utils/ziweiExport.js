/**
 * 紫微命盤導出工具
 * 用於生成 JSON 和 Prompt 格式的完整命盤資訊
 */

import { THREE_POSITIONS, FOUR_POSITIONS } from './ziweiCompleteInfo.js'
import { calculatePalaceShenSha } from './calculators/shensha.js'
import { getStarBrightness, getStarSiHua, formatStarDisplay } from './calculators/ziweiStars.js'

/**
 * 生成完整的命盤資訊（JSON 格式）
 */
export function generateZiweiJSON(birthInfo, chartData, baziResult = null) {
  const { gender, birthDate, longitude, clockTime, trueSolarTime, lunarTime } = birthInfo

  // 構建基本資訊
  const basicInfo = {
    gender: gender === 'male' ? '男' : '女',
    longitude: longitude || 120.0,
    clockTime: clockTime || formatDateTime(birthDate),
    trueSolarTime: trueSolarTime || formatDateTime(birthDate),
    lunarTime: lunarTime || '',
    jieqiSizhu: baziResult ? formatSizhu(baziResult.pillars) : '', // 從八字結果獲取
    feijieqiSizhu: baziResult?.nonJieqiPillars ? formatSizhu(baziResult.nonJieqiPillars) : '', // 非節氣四柱
    wuxingJu: chartData?.wuxingJu || '土五局',
    mingzhu: chartData?.mingzhu || '文曲',
    shenzhu: chartData?.shenzhu || '天相',
    zinianDoujun: chartData?.zinianDoujun || '巳',
    shengong: chartData?.shengong || '未'
  }

  // 構建八字資訊
  const baziInfo = baziResult ? {
    pillars: {
      year: baziResult.pillars.year,
      month: baziResult.pillars.month,
      day: baziResult.pillars.day,
      hour: baziResult.pillars.hour
    },
    wuxing: {
      distribution: baziResult.wuxing.distribution,
      strength: baziResult.wuxing.strength,
      ranking: baziResult.wuxing.ranking,
      dayMaster: baziResult.wuxing.dayMaster,
      yongshen: baziResult.wuxing.yongshen,
      xishen: baziResult.wuxing.xishen,
      jishen: baziResult.wuxing.jishen
    },
    shishen: {
      year: baziResult.shishen.year,
      month: baziResult.shishen.month,
      day: baziResult.shishen.day,
      hour: baziResult.shishen.hour,
      analysis: baziResult.shishenAnalysis
    },
    dayun: {
      direction: baziResult.dayun.direction,
      directionText: baziResult.dayun.directionText,
      startAge: baziResult.dayun.startAge,
      pillars: baziResult.dayun.pillars
    }
  } : null

  // 構建12宮位資訊
  const palaces = generatePalacesInfo(chartData, baziResult)

  // 構建格局資訊
  const patterns = {
    sanhe: generateSanhePatterns(palaces),
    sihua: generateSihuaPatterns(palaces)
  }

  // 構建大限流年資訊
  const daxianLiunian = generateDaxianLiunian(birthDate, chartData)

  return {
    basicInfo,
    bazi: baziInfo,
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
export function generateZiweiPrompt(birthInfo, chartData, baziResult = null) {
  const json = generateZiweiJSON(birthInfo, chartData, baziResult)

  let prompt = `請根據以下命理資訊進行詳細分析：

├基本信息
│ ├性別 : ${json.basicInfo.gender}
│ ├地理經度 : ${json.basicInfo.longitude}
│ ├鐘錶時間 : ${json.basicInfo.clockTime}
│ ├真太陽時 : ${json.basicInfo.trueSolarTime}
│ ├農曆時間 : ${json.basicInfo.lunarTime || '待計算'}
│ ├節氣四柱 : ${json.basicInfo.jieqiSizhu || '待計算'}
│ ├非節氣四柱 : ${json.basicInfo.feijieqiSizhu || '待計算'}
│ ├五行局數 : ${json.basicInfo.wuxingJu}
│ └身主:${json.basicInfo.shenzhu}; 命主:${json.basicInfo.mingzhu}; 子年斗君:${json.basicInfo.zinianDoujun}; 身宮:${json.basicInfo.shengong}
`

  // 添加八字資訊
  if (json.bazi) {
    prompt += `├八字命盤
│ ├四柱
│ │ ├年柱 : ${json.bazi.pillars.year.stem}${json.bazi.pillars.year.branch} (${json.bazi.shishen.year.stem})
│ │ ├月柱 : ${json.bazi.pillars.month.stem}${json.bazi.pillars.month.branch} (${json.bazi.shishen.month.stem})
│ │ ├日柱 : ${json.bazi.pillars.day.stem}${json.bazi.pillars.day.branch} (${json.bazi.shishen.day.stem})
│ │ └時柱 : ${json.bazi.pillars.hour.stem}${json.bazi.pillars.hour.branch} (${json.bazi.shishen.hour.stem})
│ ├五行分析
│ │ ├日主 : ${json.bazi.wuxing.dayMaster.element} (${json.bazi.wuxing.dayMaster.strength})
│ │ ├五行分布 : 金${json.bazi.wuxing.distribution['金'] || 0} 木${json.bazi.wuxing.distribution['木'] || 0} 水${json.bazi.wuxing.distribution['水'] || 0} 火${json.bazi.wuxing.distribution['火'] || 0} 土${json.bazi.wuxing.distribution['土'] || 0}
│ │ ├用神 : ${json.bazi.wuxing.yongshen}
│ │ ├喜神 : ${json.bazi.wuxing.xishen}
│ │ └忌神 : ${json.bazi.wuxing.jishen}
│ ├十神分析
│ │ ├主要十神 : ${json.bazi.shishen.analysis.dominant || '均衡'} (出現${json.bazi.shishen.analysis.dominantCount || 0}次)
│ │ └分布統計 : ${formatShishenCount(json.bazi.shishen.analysis.count)}
│ └大運排盤
│   ├起運年齡 : ${json.bazi.dayun.startAge}歲
│   ├大運方向 : ${json.bazi.dayun.directionText}
│   └大運列表 :
${formatDayunList(json.bazi.dayun.pillars)}
`
  }

  prompt += `├命盤十二宮
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
          // 按照正確格式：生年四化、自化等
          if (star.yearSihua) str += `[生年${star.sihua}]`
          if (star.daxianSihua) str += `[大限${star.sihua}]`
          if (star.liunianSihua) str += `[流年${star.sihua}]`
          // 方向標記（↑祿、↓忌等）
          if (star.direction && !star.yearSihua && !star.daxianSihua && !star.liunianSihua) {
            str += `[${star.direction}${star.sihua}]`
          } else if (star.direction) {
            // 如果有生年四化，方向標記在後面
            str += `[${star.direction}${star.sihua}]`
          }
        }
        return str
      }).join(',')
      prompt += `│ │ ├主星 : ${mainStarsStr}\n`
    } else {
      prompt += `│ │ ├主星 : 無\n`
    }
    
    // 輔星
    if (palace.assistantStars && palace.assistantStars.length > 0) {
      const assistantStarsStr = palace.assistantStars.map(starData => {
        // 處理星曜數據：可能是字符串或對象
        const starName = typeof starData === 'string' ? starData : (starData?.name || String(starData))

        if (typeof starData === 'object' && starData !== null) {
          let str = starName
          if (starData.brightness) str += `[${starData.brightness}]`
          if (starData.sihua) str += `[${starData.sihua}]`
          if (starData.direction) str += `[${starData.direction}]`
          return str
        }

        // 如果是字符串，直接返回
        return starName
      }).join(',')
      prompt += `│ │ ├輔星 : ${assistantStarsStr}\n`
    } else {
      prompt += `│ │ ├輔星 : 無\n`
    }
    
    // 小星
    if (palace.minorStars && palace.minorStars.length > 0) {
      const minorStarsStr = palace.minorStars.map(starData => {
        // 處理星曜數據：可能是字符串或對象
        const starName = typeof starData === 'string' ? starData : (starData?.name || String(starData))
        const brightness = (typeof starData === 'object' && starData?.brightness) ? starData.brightness : ''

        let str = starName
        if (brightness) str += `[${brightness}]`
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
      // 去掉重複的"虛歲"
      const daxianAge = palace.daxian.age.replace('虛歲', '')
      prompt += `│ │ ├大限 : ${daxianAge}虛歲\n`
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
    prompt += `\n├三合派格局\n`
    json.patterns.sanhe.forEach(pattern => {
      prompt += `│ ├${pattern.name} [${pattern.level}]\n`
      prompt += `│ │ 描述: ${pattern.description}\n`
      prompt += `│ │ 相關宮位: ${pattern.palaces.join(', ')}\n`
    })
  }

  if (json.patterns.sihua && json.patterns.sihua.length > 0) {
    prompt += `\n├四化派格局\n`
    json.patterns.sihua.forEach(pattern => {
      prompt += `│ ├${pattern.name} [${pattern.level}]\n`
      prompt += `│ │ 描述: ${pattern.description}\n`
      prompt += `│ │ 相關宮位: ${pattern.palaces.join(', ')}\n`
    })
  }

  // 添加大限流年資訊
  if (json.daxianLiunian && json.daxianLiunian.daxian) {
    prompt += `\n├大限流年信息\n`
    json.daxianLiunian.daxian.forEach(daxian => {
      const ageStr = daxian.age.replace('虛歲', '')
      prompt += `│ ├${ageStr}虛歲: ${daxian.palace} [${daxian.heavenlyStem}${daxian.earthlyBranch}]\n`
    })
  }

  return prompt
}

/**
 * 生成宮位資訊
 * 使用真正的紫微斗數排盤計算結果
 */
function generatePalacesInfo(chartData, baziResult = null) {
  const palaceNames = [
    '命宮', '兄弟宮', '夫妻宮', '子女宮', '財帛宮', '疾厄宮',
    '遷移宮', '交友宮', '官祿宮', '田宅宮', '福德宮', '父母宮'
  ]

  // 如果有真正的排盤結果，使用它
  const ziweiChart = chartData?.ziweiChart
  console.log('generatePalacesInfo: chartData =', chartData)
  console.log('generatePalacesInfo: ziweiChart =', ziweiChart)
  console.log('generatePalacesInfo: ziweiChart.palaces =', ziweiChart?.palaces)
  console.log('generatePalacesInfo: palaces 是數組？', Array.isArray(ziweiChart?.palaces))

  if (ziweiChart && ziweiChart.palaces && Array.isArray(ziweiChart.palaces)) {
    console.log('✅ 使用真實排盤結果，宮位數量:', ziweiChart.palaces.length)
    const yearBranch = baziResult?.pillars?.year?.branch || '子'
    const yearStem = baziResult?.pillars?.year?.stem || '甲'
    const dayStem = baziResult?.pillars?.day?.stem || '甲'

    // iztro 返回的 palaces 是按地支索引排列的（place12），需要按宫位名称顺序重新组织
    // iztro 的宮位名稱可能是簡稱（如 '僕役'），需要映射到標準名稱（如 '交友宮'）
    const nameMap = {
      '命宮': '命宮',
      '兄弟': '兄弟宮',
      '兄弟宮': '兄弟宮',
      '夫妻': '夫妻宮',
      '夫妻宮': '夫妻宮',
      '子女': '子女宮',
      '子女宮': '子女宮',
      '財帛': '財帛宮',
      '財帛宮': '財帛宮',
      '疾厄': '疾厄宮',
      '疾厄宮': '疾厄宮',
      '遷移': '遷移宮',
      '遷移宮': '遷移宮',
      '交友': '交友宮',
      '僕役': '交友宮',  // iztro 使用 '僕役' 代表交友宮
      '交友宮': '交友宮',
      '僕役宮': '交友宮',
      '官祿': '官祿宮',
      '事業': '官祿宮',  // 有些版本可能叫事業宮
      '官祿宮': '官祿宮',
      '事業宮': '官祿宮',
      '田宅': '田宅宮',
      '田宅宮': '田宅宮',
      '福德': '福德宮',
      '福德宮': '福德宮',
      '父母': '父母宮',
      '相貌': '父母宮',  // 有些版本可能叫相貌宮
      '父母宮': '父母宮',
      '相貌宮': '父母宮'
    }

    const palacesByName = {}
    ziweiChart.palaces.forEach(palace => {
      if (palace && palace.name) {
        const standardName = nameMap[palace.name] || palace.name
        palacesByName[standardName] = palace
      }
    })
    console.log('palacesByName keys (標準化後):', Object.keys(palacesByName))

    // 按照标准宫位顺序返回
    return palaceNames.map((palaceName, index) => {
      const palace = palacesByName[palaceName]
      const branch = palace?.earthlyBranch || ziweiChart.branches?.[index] || ''
      const stem = palace?.heavenlyStem || ziweiChart.stems?.[index] || ''
      
      // 從排盤結果獲取主星
      // 確保 palace 存在且有 mainStars
      if (!palace) {
        console.warn(`generatePalacesInfo: 找不到宮位 ${palaceName}`)
        // 返回空宮位
        return {
          name: palaceName,
          heavenlyStem: ziweiChart.stems?.[index] || '',
          earthlyBranch: ziweiChart.branches?.[index] || '',
          mainStars: [],
          assistantStars: [],
          shaStars: [],
          minorStars: [],
          shenSha: {},
          daxian: null,
          xiaoxian: [],
          liunian: [],
          xianliuDiegong: false,
          isMingGong: false,
          isShenGong: false,
          isLaiYin: false,
          threePositions: THREE_POSITIONS[palaceName] || [],
          fourPositions: FOUR_POSITIONS[palaceName] || {}
        }
      }
      
      const mainStarsList = palace.mainStars || ziweiChart.mainStars?.[palaceName] || []
      const mainStars = mainStarsList.map(starData => {
        // 處理星曜數據：可能是字符串或對象
        const starName = typeof starData === 'string' ? starData : (starData?.name || starData)

        // 如果已經是完整的星曜對象，保留其屬性
        if (typeof starData === 'object' && starData !== null && starData.name) {
          return {
            name: starData.name,
            brightness: starData.brightness || getStarBrightness(starData.name, branch) || '平',
            sihua: starData.sihua,
            yearSihua: starData.yearSihua,
            daxianSihua: starData.daxianSihua,
            liunianSihua: starData.liunianSihua,
            direction: starData.direction
          }
        }

        // 如果是字符串，計算亮度和四化
        const brightness = getStarBrightness(starName, branch)
        const sihua = getStarSiHua(starName, yearStem)

        const star = {
          name: starName,
          brightness: brightness || '平'
        }

        if (sihua) {
          star.sihua = sihua.symbol
          star.yearSihua = true
          star.direction = sihua.direction
        }

        return star
      })
      
      // 處理輔星 - 從排盤結果獲取
      const assistantStarsList = palace.assistantStars || []
      const assistantStars = assistantStarsList.map(starData => {
        const starName = typeof starData === 'string' ? starData : (starData?.name || starData)

        if (typeof starData === 'object' && starData !== null && starData.name) {
          return {
            name: starData.name,
            brightness: starData.brightness || getStarBrightness(starData.name, branch) || '平',
            sihua: starData.sihua,
            direction: starData.direction
          }
        }

        const brightness = getStarBrightness(starName, branch)
        const sihua = getStarSiHua(starName, yearStem)

        const star = {
          name: starName,
          brightness: brightness || '平'
        }

        if (sihua) {
          star.sihua = sihua.symbol
          star.direction = sihua.direction
        }

        return star
      })

      // 處理煞星 - 從排盤結果獲取
      const shaStarsList = palace.shaStars || []

      // 處理小星 - 從排盤結果獲取
      const minorStarsList = palace.minorStars || []
      const minorStars = minorStarsList.map(starData => {
        const starName = typeof starData === 'string' ? starData : (starData?.name || starData)

        if (typeof starData === 'object' && starData !== null && starData.name) {
          return {
            name: starData.name,
            brightness: starData.brightness || '廟'
          }
        }

        return {
          name: starName,
          brightness: '廟'
        }
      })

      return {
        name: palaceName,
        heavenlyStem: stem,
        earthlyBranch: branch,
        mainStars: mainStars,
        assistantStars: assistantStars,
        shaStars: shaStarsList,
        minorStars: minorStars,
        shenSha: getShenShaForPalace(palaceName, branch, yearBranch, dayStem),
        daxian: getDaxianForPalace(palaceName, index, chartData),
        xiaoxian: getXiaoxianForPalace(palaceName, index),
        liunian: getLiunianForPalace(palaceName, index),
        xianliuDiegong: false,
        isMingGong: palace?.isMingGong || false,  // 從排盤結果取得，不使用預設值
        isShenGong: palace?.isShenGong || false,  // 從排盤結果取得，不使用預設值
        isLaiYin: palace?.isLaiYin || false,
        threePositions: THREE_POSITIONS[palaceName] || [],
        fourPositions: FOUR_POSITIONS[palaceName] || {}
      }
    })
  }
  
  console.log('generatePalacesInfo: 沒有使用排盤結果，使用默認數據')

  // 如果沒有排盤結果，使用默認數據（向後兼容）
  const branches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
  const yearBranch = baziResult?.pillars?.year?.branch || '子'
  const yearStem = baziResult?.pillars?.year?.stem || '甲'
  const dayStem = baziResult?.pillars?.day?.stem || '甲'

  return palaceNames.map((name, index) => {
    const branch = branches[index]
    const stem = getStemFromBranch(branch, index)

    return {
      name,
      heavenlyStem: stem,
      earthlyBranch: branch,
      mainStars: getMainStarsForPalace(name, chartData, branch, yearStem),
      assistantStars: getAssistantStarsForPalace(name, chartData, branch, yearStem),
      shaStars: getShaStarsForPalace(name, chartData),
      minorStars: getMinorStarsForPalace(name, chartData, branch),
      shenSha: getShenShaForPalace(name, branch, yearBranch, dayStem),
      daxian: getDaxianForPalace(name, index, chartData),
      xiaoxian: getXiaoxianForPalace(name, index),
      liunian: getLiunianForPalace(name, index),
      xianliuDiegong: false,
      isShenGong: false,  // 不使用預設身宮，等待真實排盤數據
      isLaiYin: false,
      isMingGong: false,  // 不使用預設命宮，等待真實排盤數據
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
    '遷移宮', '交友宮', '官祿宮', '田宅宮', '福德宮', '父母宮'
  ]
  
  // 生成12個大限（每個大限10年）
  for (let i = 0; i < 12; i++) {
    const startAge = daxianStartAge + i * 10
    const endAge = startAge + 9
    daxian.push({
      age: `${startAge}~${endAge}`,
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

function getMainStarsForPalace(palaceName, chartData, branch, yearStem) {
  // 這裡應該從實際計算結果獲取
  // 目前返回示例數據，但加入廟旺平陷和四化計算
  const examples = {
    '命宮': ['貪狼'],
    '父母宮': ['紫微', '天府'],
    '福德宮': ['天機'],
    '田宅宮': ['貪狼'],
    '官祿宮': ['太陽'],
    '兄弟宮': ['武曲'],
    '交友宮': ['巨門'],
    '夫妻宮': ['天同'],
    '遷移宮': ['天相'],
    '子女宮': ['廉貞'],
    '財帛宮': ['天梁'],
    '疾厄宮': ['七殺']
  }

  const stars = examples[palaceName] || []

  return stars.map(starName => {
    const brightness = getStarBrightness(starName, branch)
    const sihua = getStarSiHua(starName, yearStem)

    const star = {
      name: starName,
      brightness: brightness
    }

    // 添加四化資訊
    if (sihua) {
      star.sihua = sihua.symbol
      star.yearSihua = true  // 生年四化
      star.direction = sihua.direction
    }

    return star
  })
}

function getAssistantStarsForPalace(palaceName, chartData, branch, yearStem) {
  const examples = {
    '福德宮': ['左輔'],
    '官祿宮': ['文昌'],
    '交友宮': ['天魁'],
    '夫妻宮': ['右弼'],
    '遷移宮': ['祿存']
  }

  const stars = examples[palaceName] || []

  return stars.map(starData => {
    // 處理星曜數據：可能是字符串或對象
    const starName = typeof starData === 'string' ? starData : (starData?.name || starData)

    // 如果已經是完整的星曜對象，保留其屬性
    if (typeof starData === 'object' && starData !== null && starData.name) {
      return {
        name: starData.name,
        brightness: starData.brightness || getStarBrightness(starData.name, branch) || '平',
        sihua: starData.sihua,
        direction: starData.direction
      }
    }

    // 如果是字符串，計算亮度和四化
    const brightness = getStarBrightness(starName, branch)
    const sihua = getStarSiHua(starName, yearStem)

    const star = {
      name: starName,
      brightness: brightness || '平'
    }

    if (sihua) {
      star.sihua = sihua.symbol
      star.direction = sihua.direction
    }

    return star
  })
}

function getShaStarsForPalace(palaceName, chartData) {
  const examples = {
    '子女宮': [{ name: '陀羅', brightness: '陷' }],
    '疾厄宮': [{ name: '地劫', brightness: '陷' }]
  }
  return examples[palaceName] || []
}

function getMinorStarsForPalace(palaceName, chartData, branch) {
  const examples = {
    '田宅宮': ['天貴']
  }

  const stars = examples[palaceName] || []

  return stars.map(starData => {
    // 處理星曜數據：可能是字符串或對象
    const starName = typeof starData === 'string' ? starData : (starData?.name || starData)

    // 如果已經是完整的星曜對象，保留其屬性
    if (typeof starData === 'object' && starData !== null && starData.name) {
      return {
        name: starData.name,
        brightness: starData.brightness || '廟'
      }
    }

    // 如果是字符串，使用默認亮度
    return {
      name: starName,
      brightness: '廟'  // 小星的廟旺平陷較少記載，簡化處理
    }
  })
}

function getShenShaForPalace(palaceName, branch, yearBranch, dayStem) {
  // 使用神煞計算模組
  return calculatePalaceShenSha(branch, yearBranch, dayStem)
}

function getDaxianForPalace(palaceName, index, chartData) {
  const wuxingJu = chartData?.wuxingJu || '土五局'
  const gender = chartData?.gender || 'male'
  const startAge = getDaxianStartAge(wuxingJu, gender) + index * 10
  return {
    age: `${startAge}~${startAge + 9}`,
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

/**
 * 格式化四柱為字符串
 */
function formatSizhu(pillars) {
  if (!pillars) return ''
  return `${pillars.year.stem}${pillars.year.branch} ${pillars.month.stem}${pillars.month.branch} ${pillars.day.stem}${pillars.day.branch} ${pillars.hour.stem}${pillars.hour.branch}`
}

/**
 * 格式化十神統計
 */
function formatShishenCount(count) {
  if (!count) return '無'
  const entries = Object.entries(count)
  if (entries.length === 0) return '無'
  return entries.map(([name, num]) => `${name}${num}個`).join('、')
}

/**
 * 格式化大運列表
 */
function formatDayunList(pillars) {
  if (!pillars || pillars.length === 0) return '│       無\n'
  return pillars.map(dayun => {
    return `│       ${dayun.index}. ${dayun.stem}${dayun.branch} (${dayun.ageRange})`
  }).join('\n') + '\n'
}
