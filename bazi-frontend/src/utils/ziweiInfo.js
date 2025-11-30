/**
 * 紫微斗數說明資料
 */

// 十二宮位說明
export const PALACE_INFO = {
  '命宮': {
    name: '命宮',
    nameEn: 'Life Palace',
    description: '代表個人的基本性格、天賦、命運走向，是整個命盤的核心。',
    meaning: '命宮是紫微斗數中最重要的宮位，反映一個人的本質、性格特質、人生觀和價值觀。',
    keywords: ['性格', '天賦', '命運', '本質'],
    related: ['身宮', '福德宮']
  },
  '兄弟宮': {
    name: '兄弟宮',
    nameEn: 'Sibling Palace',
    description: '代表兄弟姐妹的關係、數量、緣分，也反映同輩朋友關係。',
    meaning: '觀察與兄弟姐妹的互動、手足情誼，以及同輩朋友的人際關係。',
    keywords: ['手足', '同輩', '朋友', '人際'],
    related: ['交友宮', '父母宮']
  },
  '夫妻宮': {
    name: '夫妻宮',
    nameEn: 'Spouse Palace',
    description: '代表配偶的特質、婚姻狀況、感情運勢，以及婚後生活。',
    meaning: '反映擇偶標準、配偶性格、婚姻品質，以及感情生活的和諧程度。',
    keywords: ['婚姻', '配偶', '感情', '戀愛'],
    related: ['福德宮', '子女宮']
  },
  '子女宮': {
    name: '子女宮',
    nameEn: 'Children Palace',
    description: '代表子女的數量、緣分、教育，也反映創造力和投資運。',
    meaning: '觀察子女運勢、親子關係，以及個人的創造力和投資理財能力。',
    keywords: ['子女', '創造', '投資', '教育'],
    related: ['夫妻宮', '財帛宮']
  },
  '財帛宮': {
    name: '財帛宮',
    nameEn: 'Wealth Palace',
    description: '代表財富累積方式、理財能力、賺錢途徑，以及金錢觀。',
    meaning: '反映正財、偏財運勢，理財方式，以及對金錢的態度和處理能力。',
    keywords: ['財富', '理財', '賺錢', '金錢'],
    related: ['事業宮', '田宅宮']
  },
  '疾厄宮': {
    name: '疾厄宮',
    nameEn: 'Health Palace',
    description: '代表身體健康狀況、易患疾病、體質強弱，以及意外風險。',
    meaning: '觀察先天體質、健康弱點、易患疾病類型，以及意外傷害的風險。',
    keywords: ['健康', '疾病', '體質', '意外'],
    related: ['父母宮', '命宮']
  },
  '遷移宮': {
    name: '遷移宮',
    nameEn: 'Travel Palace',
    description: '代表外出運勢、遷移、旅遊，以及在外的人際關係和發展。',
    meaning: '反映外出發展的運勢、遷移的適宜性，以及在外地的人際關係。',
    keywords: ['外出', '遷移', '旅遊', '發展'],
    related: ['命宮', '交友宮']
  },
  '交友宮': {
    name: '交友宮',
    nameEn: 'Friends Palace',
    description: '代表朋友關係、下屬運勢、人際網絡，以及合作夥伴。',
    meaning: '觀察朋友品質、下屬關係、人際網絡的建立，以及合作運勢。',
    keywords: ['朋友', '下屬', '合作', '人際'],
    related: ['兄弟宮', '遷移宮']
  },
  '事業宮': {
    name: '事業宮',
    nameEn: 'Career Palace',
    description: '代表事業發展、工作運勢、職業傾向，以及社會地位。',
    meaning: '反映適合的職業類型、事業發展方向、工作運勢，以及社會成就。',
    keywords: ['事業', '工作', '職業', '成就'],
    related: ['財帛宮', '命宮']
  },
  '田宅宮': {
    name: '田宅宮',
    nameEn: 'Property Palace',
    description: '代表不動產運勢、居住環境、家庭和諧，以及祖產。',
    meaning: '觀察不動產運勢、居住環境品質、家庭和諧度，以及祖產繼承。',
    keywords: ['不動產', '居住', '家庭', '祖產'],
    related: ['財帛宮', '父母宮']
  },
  '福德宮': {
    name: '福德宮',
    nameEn: 'Fortune Palace',
    description: '代表精神層面、福氣、享受，以及晚年的運勢。',
    meaning: '反映精神享受、福氣厚薄、生活品質，以及晚年的運勢和享受。',
    keywords: ['福氣', '享受', '精神', '晚年'],
    related: ['命宮', '夫妻宮']
  },
  '父母宮': {
    name: '父母宮',
    nameEn: 'Parents Palace',
    description: '代表與父母的關係、父母運勢、長輩緣分，以及遺傳特質。',
    meaning: '觀察與父母的緣分、父母運勢、長輩關係，以及遺傳的性格特質。',
    keywords: ['父母', '長輩', '遺傳', '緣分'],
    related: ['疾厄宮', '田宅宮']
  }
}

// 14主星特點說明
export const MAIN_STAR_INFO = {
  '紫微': {
    name: '紫微',
    nameEn: 'Purple Star',
    type: '主星',
    element: '土',
    description: '帝星，代表尊貴、領導、權威。',
    personality: '具有領導才能，喜歡掌控全局，有責任感和使命感。',
    career: '適合管理、領導、政治、高階職位。',
    wealth: '正財為主，通過地位和權力獲得財富。',
    relationship: '感情專一，但可能較為強勢，需要被尊重。',
    health: '注意心血管、消化系統問題。',
    brightness: ['廟', '旺', '得', '利', '平', '不', '陷']
  },
  '天機': {
    name: '天機',
    nameEn: 'Heavenly Machine',
    type: '主星',
    element: '木',
    description: '智慧星，代表機智、變通、學習能力。',
    personality: '聰明靈活，善於思考，喜歡學習新事物，但可能較為善變。',
    career: '適合教育、研究、技術、策劃、顧問等工作。',
    wealth: '通過智慧和知識獲得財富，偏財運佳。',
    relationship: '感情豐富但可能不夠穩定，需要精神層面的交流。',
    health: '注意神經系統、肝膽問題。',
    brightness: ['廟', '旺', '得', '利', '平', '不', '陷']
  },
  '太陽': {
    name: '太陽',
    nameEn: 'Sun',
    type: '主星',
    element: '火',
    description: '光明星，代表熱情、光明、名聲。',
    personality: '熱情開朗，光明正大，喜歡幫助他人，有正義感。',
    career: '適合公職、教育、媒體、服務業，容易獲得名聲。',
    wealth: '正財運佳，通過名聲和服務獲得財富。',
    relationship: '感情熱烈，但可能過於直接，需要學會體貼。',
    health: '注意眼睛、心血管、血壓問題。',
    brightness: ['廟', '旺', '得', '利', '平', '不', '陷']
  },
  '武曲': {
    name: '武曲',
    nameEn: 'Military Star',
    type: '主星',
    element: '金',
    description: '財星，代表剛強、果斷、財運。',
    personality: '剛強果斷，做事認真，有執行力，但可能較為固執。',
    career: '適合金融、軍警、工程、技術等需要執行力的工作。',
    wealth: '財運佳，善於理財，但需要努力才能獲得。',
    relationship: '感情較為直接，可能缺乏浪漫，需要學會表達。',
    health: '注意呼吸系統、骨骼、牙齒問題。',
    brightness: ['廟', '旺', '得', '利', '平', '不', '陷']
  },
  '天同': {
    name: '天同',
    nameEn: 'Heavenly Harmony',
    type: '主星',
    element: '水',
    description: '福星，代表和諧、享受、人緣。',
    personality: '溫和善良，喜歡享受生活，人緣佳，但可能較為懶散。',
    career: '適合服務業、餐飲、娛樂、藝術等輕鬆的工作。',
    wealth: '財運平穩，通過人際關係獲得機會，但需要主動。',
    relationship: '感情和諧，容易獲得異性青睞，但需要專一。',
    health: '注意腎臟、泌尿系統、代謝問題。',
    brightness: ['廟', '旺', '得', '利', '平', '不', '陷']
  },
  '廉貞': {
    name: '廉貞',
    nameEn: 'Upright Star',
    type: '主星',
    element: '火',
    description: '次桃花星，代表感情、藝術、變化。',
    personality: '感情豐富，有藝術天分，喜歡變化，但情緒可能較為波動。',
    career: '適合藝術、設計、娛樂、公關等創意工作。',
    wealth: '財運起伏較大，需要穩定投資，偏財運佳。',
    relationship: '感情豐富但可能較為複雜，需要專一和穩定。',
    health: '注意心血管、情緒、精神問題。',
    brightness: ['廟', '旺', '得', '利', '平', '不', '陷']
  },
  '天府': {
    name: '天府',
    nameEn: 'Heavenly Storehouse',
    type: '主星',
    element: '土',
    description: '庫星，代表儲蓄、穩定、保守。',
    personality: '穩重保守，善於儲蓄，有責任感，但可能較為固執。',
    career: '適合金融、會計、管理、公職等穩定工作。',
    wealth: '財運穩定，善於儲蓄和理財，但需要開源。',
    relationship: '感情穩定，重視家庭，但可能缺乏浪漫。',
    health: '注意消化系統、代謝問題。',
    brightness: ['廟', '旺', '得', '利', '平', '不', '陷']
  },
  '太陰': {
    name: '太陰',
    nameEn: 'Moon',
    type: '主星',
    element: '水',
    description: '母星，代表溫柔、細膩、財運。',
    personality: '溫柔細膩，有母性特質，善於照顧他人，但可能較為敏感。',
    career: '適合服務業、教育、醫療、藝術等需要細心的工作。',
    wealth: '財運佳，善於理財，偏財運也不錯。',
    relationship: '感情細膩，重視精神層面，但需要學會表達。',
    health: '注意婦科、腎臟、情緒問題。',
    brightness: ['廟', '旺', '得', '利', '平', '不', '陷']
  },
  '貪狼': {
    name: '貪狼',
    nameEn: 'Greedy Wolf',
    type: '主星',
    element: '木',
    description: '桃花星，代表慾望、才華、交際。',
    personality: '多才多藝，善於交際，慾望較強，但可能較為貪心。',
    career: '適合娛樂、公關、銷售、創意等需要交際的工作。',
    wealth: '財運起伏大，偏財運佳，但需要節制。',
    relationship: '桃花運旺，感情豐富，但需要專一。',
    health: '注意肝膽、泌尿系統、情緒問題。',
    brightness: ['廟', '旺', '得', '利', '平', '不', '陷']
  },
  '巨門': {
    name: '巨門',
    nameEn: 'Giant Gate',
    type: '主星',
    element: '水',
    description: '暗星，代表口才、是非、研究。',
    personality: '口才好，善於表達，喜歡研究，但可能容易引起是非。',
    career: '適合教育、研究、法律、媒體等需要口才的工作。',
    wealth: '通過口才和知識獲得財富，但需要謹慎理財。',
    relationship: '感情表達直接，但可能因為口舌引起誤會。',
    health: '注意口腔、消化系統、情緒問題。',
    brightness: ['廟', '旺', '得', '利', '平', '不', '陷']
  },
  '天相': {
    name: '天相',
    nameEn: 'Heavenly Minister',
    type: '主星',
    element: '水',
    description: '印星，代表輔佐、協調、穩定。',
    personality: '善於協調，有責任感，喜歡幫助他人，但可能缺乏主見。',
    career: '適合助理、秘書、公關、服務等輔助性工作。',
    wealth: '財運穩定，通過合作獲得財富。',
    relationship: '感情穩定，重視和諧，但需要主動表達。',
    health: '注意腎臟、泌尿系統問題。',
    brightness: ['廟', '旺', '得', '利', '平', '不', '陷']
  },
  '天梁': {
    name: '天梁',
    nameEn: 'Heavenly Beam',
    type: '主星',
    element: '土',
    description: '蔭星，代表長輩、保護、醫療。',
    personality: '有長者風範，善於照顧他人，有責任感，但可能較為保守。',
    career: '適合醫療、教育、公職、長照等服務性工作。',
    wealth: '財運穩定，通過服務和專業獲得財富。',
    relationship: '感情穩定，重視責任，但需要浪漫。',
    health: '注意骨骼、關節、代謝問題。',
    brightness: ['廟', '旺', '得', '利', '平', '不', '陷']
  },
  '七殺': {
    name: '七殺',
    nameEn: 'Seven Killers',
    type: '主星',
    element: '金',
    description: '將星，代表果斷、衝勁、變化。',
    personality: '果斷勇敢，有衝勁，喜歡挑戰，但可能較為衝動。',
    career: '適合軍警、運動、工程、創業等需要衝勁的工作。',
    wealth: '財運起伏大，需要努力和冒險，但可能有大收穫。',
    relationship: '感情直接，但可能較為衝動，需要學會溝通。',
    health: '注意意外傷害、呼吸系統、骨骼問題。',
    brightness: ['廟', '旺', '得', '利', '平', '不', '陷']
  },
  '破軍': {
    name: '破軍',
    nameEn: 'Army Breaker',
    type: '主星',
    element: '水',
    description: '耗星，代表變化、破壞、重建。',
    personality: '喜歡變化，有創造力，敢於突破，但可能較為衝動。',
    career: '適合創業、改革、創新、藝術等需要變化的工作。',
    wealth: '財運起伏大，需要創新和冒險，但可能有大收穫。',
    relationship: '感情豐富但可能較為不穩定，需要學會專一。',
    health: '注意意外傷害、泌尿系統、情緒問題。',
    brightness: ['廟', '旺', '得', '利', '平', '不', '陷']
  }
}



