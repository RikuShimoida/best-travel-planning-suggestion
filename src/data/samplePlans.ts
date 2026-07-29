import { TravelPlan } from '../types';

export const SAMPLE_TRAVEL_PLANS: TravelPlan[] = [
  {
    id: 'plan-kyoto-classic',
    title: '王道・京都2泊3日 嵐山竹林・伏見稲荷と老舗料亭＆抹茶カフェ巡り',
    subtitle: '歴史ある神社仏閣と最新のフォトジェニックカフェをバランスよく巡る京都完璧コース',
    destination: '京都府',
    coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    duration: '2泊3日',
    daysCount: 3,
    companion: '女子旅',
    theme: ['歴史・神社仏閣', 'グルメ', '映え・フォトジェニック'],
    budgetRange: '5万〜10万円',
    rating: 4.9,
    likesCount: 1420,
    bestSeason: ['春（3月〜5月）', '秋（10月〜11月）'],
    estimatedBudget: {
      transportCost: 18000,
      accommodationCost: 28000,
      foodCost: 18000,
      activitiesCost: 5000,
      shoppingBuffer: 6000,
      totalCost: 75000,
    },
    highlights: [
      '早朝の伏見稲荷大社で混雑なしの千本鳥居写真撮影',
      '嵐山・竹林の小径散策と渡月橋を望む絶景お抹茶カフェ',
      '清水寺の舞台と産寧坂での着物散歩＆お土産探し',
      '祇園の町家でいただく本格京懐石ディナー'
    ],
    packingItems: [
      '歩きやすいスニーカー',
      '御朱印帳',
      'モバイルバッテリー',
      '折りたたみ傘',
      'カメラ'
    ],
    days: [
      {
        dayNumber: 1,
        title: '【1日目】祇園・清水エリア散策と京懐石',
        description: '京都駅到着後、風情ある石畳の街並みと清水寺へ。夜は祇園の風情を愉しみます。',
        spots: [
          {
            id: 'k1-1',
            name: 'JR京都駅 到着 & 手荷物配送サービス',
            category: '交通',
            timeSlot: '10:00 - 10:30',
            durationMinutes: 30,
            locationName: '京都駅八条口',
            description: '駅のキャリーサービスを利用して荷物をホテルへ直行配送。手ぶらで観光開始！',
            cost: 1000,
            imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
            nextTransport: { mode: 'バス', durationMinutes: 20, note: '市バス206系統で五条坂へ', costEstimate: 230 },
            coordinates: { lat: 34.9858, lng: 135.7588 }
          },
          {
            id: 'k1-2',
            name: '清水寺 & 産寧坂（三年坂）散歩',
            category: '観光',
            timeSlot: '11:00 - 13:00',
            durationMinutes: 120,
            locationName: '京都市東山区清水',
            description: '清水の舞台からの絶景。参道の産寧坂で生八ツ橋の試食や和雑貨のショッピングを堪能。',
            cost: 500,
            imageUrl: 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=800&q=80',
            tips: '音羽の滝では学問・恋愛・健康のどれか一つのご利益を選択して柄杓ですくいましょう。',
            nextTransport: { mode: '徒歩', durationMinutes: 10, note: '徒歩で高台寺方面へ', costEstimate: 0 },
            coordinates: { lat: 34.9949, lng: 135.7850 }
          },
          {
            id: 'k1-3',
            name: 'Maccha House 抹茶館 清水産寧坂店',
            category: 'カフェ',
            timeSlot: '13:15 - 14:15',
            durationMinutes: 60,
            locationName: '産寧坂沿い',
            description: '升に入ったとろける「宇治抹茶ティラミス」が大人気。庭園を眺めながら一息。',
            cost: 1200,
            imageUrl: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
            nextTransport: { mode: '徒歩', durationMinutes: 15, note: 'ねねの道をとおって八坂神社へ', costEstimate: 0 },
            coordinates: { lat: 34.9975, lng: 135.7818 }
          },
          {
            id: 'k1-4',
            name: '八坂神社 & 花見小路通散策',
            category: '観光',
            timeSlot: '14:30 - 16:30',
            durationMinutes: 120,
            locationName: '祇園町北側',
            description: '美御前社で「美容水」をお肌につけて美髪・美肌祈願。夕暮れの石畳に舞妓さんが行き交う趣ある風景。',
            cost: 0,
            imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
            nextTransport: { mode: '徒歩', durationMinutes: 5, note: '祇園の料亭へ', costEstimate: 0 },
            coordinates: { lat: 35.0037, lng: 135.7772 }
          },
          {
            id: 'k1-5',
            name: '祇園 鹿六（京町家で楽しむ京料理）',
            category: 'グルメ',
            timeSlot: '17:30 - 19:30',
            durationMinutes: 120,
            locationName: '祇園町南側',
            description: '築100年の趣ある京町家で、旬の京野菜と黒毛和牛の上質なコースを堪能。',
            cost: 8500,
            imageUrl: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=800&q=80',
            coordinates: { lat: 35.0012, lng: 135.7745 }
          }
        ]
      },
      {
        dayNumber: 2,
        title: '【2日目】嵐山竹林ドライブ & 保津川下りと温泉',
        description: '大自然と風情溢れる嵐山へ。渡月橋を眺めながらのアラビカコーヒーと竹林の静寂を感じます。',
        spots: [
          {
            id: 'k2-1',
            name: '嵐山 渡月橋 & % ARABICA Kyoto Arashiyama',
            category: 'カフェ',
            timeSlot: '08:30 - 10:00',
            durationMinutes: 90,
            locationName: '右京区嵯峨天龍寺芒ノ馬場町',
            description: '桂川を目の前に望む人気のロースタリーカフェで濃厚ラテを味わいながら渡月橋をバックに記念撮影。',
            cost: 650,
            imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
            nextTransport: { mode: '徒歩', durationMinutes: 10, note: '竹林の小径へ', costEstimate: 0 },
            coordinates: { lat: 35.0134, lng: 135.6777 }
          },
          {
            id: 'k2-2',
            name: '竹林の小径 & 天龍寺 曹源池庭園',
            category: '観光',
            timeSlot: '10:15 - 12:15',
            durationMinutes: 120,
            locationName: '嵯峨小倉山',
            description: '風にそよぐ緑の竹林と世界遺産・天龍寺の素晴らしい回遊式庭園。',
            cost: 500,
            imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
            nextTransport: { mode: '徒歩', durationMinutes: 5, note: '湯豆腐店へ', costEstimate: 0 },
            coordinates: { lat: 35.0158, lng: 135.6720 }
          },
          {
            id: 'k2-3',
            name: '嵯峨野 湯豆腐 嵯峨野ランチ',
            category: 'グルメ',
            timeSlot: '12:30 - 14:00',
            durationMinutes: 90,
            locationName: '嵐山天龍寺芒ノ馬場町',
            description: '名物の嵯峨豆腐を使った本格的な湯豆腐会席。口の中で優しくほどける上質な食感。',
            cost: 4000,
            imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
            nextTransport: { mode: '電車', durationMinutes: 30, note: 'JR嵯峨野線で京都駅経由二条城方面へ', costEstimate: 240 },
            coordinates: { lat: 35.0165, lng: 135.6795 }
          }
        ]
      },
      {
        dayNumber: 3,
        title: '【3日目】千本鳥居の伏見稲荷 & 錦市場でお買い物',
        description: '早朝の赤い千本鳥居で圧巻の幻想景観を楽しんだ後、食べ歩きの天国・錦市場で締めくくります。',
        spots: [
          {
            id: 'k3-1',
            name: '伏見稲荷大社 (早朝参拝)',
            category: '観光',
            timeSlot: '08:00 - 10:00',
            durationMinutes: 120,
            locationName: '伏見区深草薮ノ内町',
            description: '朱色の鳥居が果てしなく続く朱の世界。朝の清々しい空気と光が鳥居の隙間から差し込みます。',
            cost: 0,
            imageUrl: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=800&q=80',
            nextTransport: { mode: '電車', durationMinutes: 15, note: '京阪本線で祇園四条・錦市場方面へ', costEstimate: 220 },
            coordinates: { lat: 34.9671, lng: 135.7727 }
          },
          {
            id: 'k3-2',
            name: '錦市場（京都の台所）で食べ歩き',
            category: 'グルメ',
            timeSlot: '10:30 - 12:30',
            durationMinutes: 120,
            locationName: '中京区錦小路通',
            description: '鱧の天ぷら、だし巻き卵串、湯波刺し、和菓子などの名物をその場で楽しむ贅沢な食べ歩き。',
            cost: 3000,
            imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
            coordinates: { lat: 35.0050, lng: 135.7649 }
          }
        ]
      }
    ]
  },

  {
    id: 'plan-hokkaido-drive',
    title: '北海道3泊4日 札幌・小樽・富良野を巡る絶景ドライブ＆海鮮三昧',
    subtitle: '広大な大地と満開の花畑、小樽運河のノスタルジーととれたて生うに・スープカレーを味わう旅',
    destination: '北海道',
    coverImage: 'https://images.unsplash.com/photo-1548625361-195fe57656ef?auto=format&fit=crop&w=1200&q=80',
    duration: '3泊4日',
    daysCount: 4,
    companion: 'カップル・夫婦',
    theme: ['絶景・自然', 'グルメ', 'アクティブ・体験'],
    budgetRange: '10万円〜',
    rating: 4.85,
    likesCount: 980,
    bestSeason: ['夏（6月〜8月）', '秋（9月〜10月）'],
    estimatedBudget: {
      transportCost: 35000,
      accommodationCost: 42000,
      foodCost: 28000,
      activitiesCost: 8000,
      shoppingBuffer: 10000,
      totalCost: 123000,
    },
    highlights: [
      'ファーム富田の絨毯のように広がるラベンダー畑とパッチワークの丘',
      '小樽運河の幻想的なガス灯ナイトクルーズ',
      '二条市場で食べる溢れんばかりのこぼれイクラ丼＆生ウニ丼',
      '新千歳空港でのラーメン道場＆本格焼き立てチーズタルト'
    ],
    packingItems: [
      '羽織れるジャケット（朝晩の寒暖差用）',
      'サングラス',
      '運転免許証（レンタカー利用時）',
      '日焼け止め',
      '広角カメラ'
    ],
    days: [
      {
        dayNumber: 1,
        title: '【1日目】新千歳空港〜札幌名物海鮮丼＆時計台・テレビ塔',
        description: '北の玄関口に到着後、レンタカーで札幌市内へ。夜はすすきので名物スープカレー。',
        spots: [
          {
            id: 'h1-1',
            name: '新千歳空港 到着 & レンタカーピックアップ',
            category: '交通',
            timeSlot: '10:00 - 11:00',
            durationMinutes: 60,
            locationName: '千歳市美々',
            description: '空港で手続きしドライブスタート。北海道の気持ちいい直線道路を走ります。',
            cost: 15000,
            imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
            nextTransport: { mode: 'レンタカー・車', durationMinutes: 50, note: '高速道路利用（道央自動車道）', costEstimate: 1400 },
            coordinates: { lat: 42.7752, lng: 141.6923 }
          },
          {
            id: 'h1-2',
            name: '札幌二条市場 大磯で贅沢海鮮丼ランチ',
            category: 'グルメ',
            timeSlot: '12:00 - 13:30',
            durationMinutes: 90,
            locationName: '札幌市中央区',
            description: 'バフンウニ・ボタンエビ・いくらがギッシリ敷き詰められた極上海鮮丼を堪能。',
            cost: 3800,
            imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
            coordinates: { lat: 43.0588, lng: 141.3582 }
          },
          {
            id: 'h1-3',
            name: 'スープカレー GARAKU 札幌本店',
            category: 'グルメ',
            timeSlot: '18:30 - 20:00',
            durationMinutes: 90,
            locationName: '札幌市中央区南3条',
            description: '和風だしの旨味が効いたコク旨スープカレー。やわらかチキンレッグとたっぷり和野菜。',
            cost: 1800,
            imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
            coordinates: { lat: 43.0573, lng: 141.3551 }
          }
        ]
      },
      {
        dayNumber: 2,
        title: '【2日目】美瑛のパッチワークの丘 & 富良野ファーム富田',
        description: '色彩豊かに輝くお花畑と青い池。息をのむような美しいロケーションドライブ。',
        spots: [
          {
            id: 'h2-1',
            name: '美瑛 白金青い池',
            category: '観光',
            timeSlot: '10:30 - 11:30',
            durationMinutes: 60,
            locationName: '上川郡美瑛町白金',
            description: '神秘的なコバルトブルーの水面と枯れたカラマツが立ち並ぶ幻想的な風景。',
            cost: 500,
            imageUrl: 'https://images.unsplash.com/photo-1548625361-195fe57656ef?auto=format&fit=crop&w=800&q=80',
            nextTransport: { mode: 'レンタカー・車', durationMinutes: 30, note: '富良野方面へドライブ', costEstimate: 0 },
            coordinates: { lat: 43.4932, lng: 142.6139 }
          },
          {
            id: 'h2-2',
            name: 'ファーム富田 (ラベンダー畑 & ラベンダーソフト)',
            category: '観光',
            timeSlot: '12:00 - 14:30',
            durationMinutes: 150,
            locationName: '空知郡中富良野町',
            description: ' 紫のラベンダー畑と虹色の花畑。オリジナルのラベンダーソフトクリームも必食！',
            cost: 1000,
            imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
            coordinates: { lat: 43.4183, lng: 142.4278 }
          }
        ]
      },
      {
        dayNumber: 3,
        title: '【3日目】ノスタルジック小樽運河 & 北一硝子ルタオ本店',
        description: '小樽のレトロな街並みでお買い物と絶品スイーツ、夕暮れからの小樽運河ナイトクルーズ。',
        spots: [
          {
            id: 'h3-1',
            name: '小樽オルゴール堂 & ルタオ（LeTAO）本店',
            category: 'カフェ',
            timeSlot: '13:00 - 15:30',
            durationMinutes: 150,
            locationName: '小樽市入船',
            description: 'ルタオ本店の2階喫茶で食べる奇跡の口どけ「ドゥーブルフロマージュ」生ケーキ。',
            cost: 1500,
            imageUrl: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80',
            coordinates: { lat: 43.1911, lng: 141.0083 }
          },
          {
            id: 'h3-2',
            name: '小樽運河ナイトクルーズ',
            category: '体験',
            timeSlot: '18:00 - 19:00',
            durationMinutes: 60,
            locationName: '小樽市港町',
            description: 'ガス灯のやわらかな光が水面に映る歴史ある運河をボートでめぐるロマンチックなひととき。',
            cost: 1800,
            imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
            coordinates: { lat: 43.1972, lng: 141.0022 }
          }
        ]
      },
      {
        dayNumber: 4,
        title: '【4日目】新千歳空港でお土産ハント＆ラーメン道場',
        description: '帰国前のお楽しみ！空港限定スイーツやえびそば一幻の極上海老ラーメンで旅を締めくくります。',
        spots: [
          {
            id: 'h4-1',
            name: 'えびそば一幻 新千歳空港店',
            category: 'グルメ',
            timeSlot: '12:00 - 13:00',
            durationMinutes: 60,
            locationName: '新千歳空港ターミナルビル 3F',
            description: '甘エビの頭を煮込んだ芳醇なコクのある海老スープが絶品の超有名ラーメン店。',
            cost: 980,
            imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
            coordinates: { lat: 42.7752, lng: 141.6923 }
          }
        ]
      }
    ]
  },

  {
    id: 'plan-hakone-onsen',
    title: '箱根1泊2日 富士山を望む絶景露天風呂と彫刻の森アート紀行',
    subtitle: '都心から約85分！ロマンスカーで行く大人女子＆カップル向け癒しの休日リフレッシュ',
    destination: '神奈川県',
    coverImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    duration: '1泊2日',
    daysCount: 2,
    companion: 'カップル・夫婦',
    theme: ['温泉・癒やし', 'アート・カルチャー', '絶景・自然'],
    budgetRange: '3万〜5万円',
    rating: 4.92,
    likesCount: 1120,
    bestSeason: ['秋（10月〜11月）', '冬（12月〜2月）'],
    estimatedBudget: {
      transportCost: 8000,
      accommodationCost: 22000,
      foodCost: 10000,
      activitiesCost: 5000,
      shoppingBuffer: 4000,
      totalCost: 49000,
    },
    highlights: [
      '特急ロマンスカー展望席での優雅な箱根アプローチ',
      '彫刻の森美術館のステンドグラスの塔（幸せをよぶシンフォニー彫刻）',
      '大涌谷の熱気あふれる噴煙地で食べる「黒たまご」で延命長寿祈願',
      '芦ノ湖の箱根海賊船と水上に浮かぶ箱根神社の平和の鳥居'
    ],
    packingItems: [
      '小田急箱根フリーパス',
      '温泉用手ぬぐい',
      'カメラ',
      '歩きやすいシューズ'
    ],
    days: [
      {
        dayNumber: 1,
        title: '【1日目】箱根湯本〜彫刻の森美術館 & 絶景温泉宿',
        description: '新宿駅からロマンスカーで箱根湯本へ。登山電車にゆられてオープンエアの美術館と温泉を堪能。',
        spots: [
          {
            id: 'hk1-1',
            name: '小田急ロマンスカー (新宿〜箱根湯本)',
            category: '交通',
            timeSlot: '09:00 - 10:25',
            durationMinutes: 85,
            locationName: '新宿駅〜箱根湯本駅',
            description: '大きな窓から四季折々の景色を楽しめるロマンスカーで優雅にスタート。',
            cost: 2470,
            imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
            nextTransport: { mode: '電車', durationMinutes: 35, note: '箱根登山電車で彫刻の森駅へ', costEstimate: 0 },
            coordinates: { lat: 35.2330, lng: 139.1038 }
          },
          {
            id: 'hk1-2',
            name: '彫刻の森美術館',
            category: '観光',
            timeSlot: '11:15 - 13:45',
            durationMinutes: 150,
            locationName: '足柄下郡箱根町二ノ平',
            description: '自然の中でアートを身近に体感。全面ステンドグラスの塔「幸せを呼ぶシンフォニー彫刻」は映え度No.1！',
            cost: 1600,
            imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
            coordinates: { lat: 35.2447, lng: 139.0514 }
          },
          {
            id: 'hk1-3',
            name: '箱根 翠松園（または小涌谷温泉のこだわり宿）',
            category: '宿泊',
            timeSlot: '15:30 - 翌10:00',
            durationMinutes: 1110,
            locationName: '足柄下郡箱根町小涌谷',
            description: '全室自家源泉掛け流し露天風呂付き。贅沢な懐石料理と緑に囲まれた癒やしの時間をゆったり享受。',
            cost: 22000,
            imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
            coordinates: { lat: 35.2392, lng: 139.0483 }
          }
        ]
      },
      {
        dayNumber: 2,
        title: '【2日目】大涌谷の噴煙 & 芦ノ湖 海賊船と箱根神社',
        description: 'ロープウェイでダイナミックな大涌谷へ！富士山を背景に芦ノ湖クルーズを楽しむ贅沢ルート。',
        spots: [
          {
            id: 'hk2-1',
            name: '箱根ロープウェイ & 大涌谷（黒たまご）',
            category: '観光',
            timeSlot: '10:30 - 12:00',
            durationMinutes: 90,
            locationName: '箱根町仙石原',
            description: '地熱と火山ガスの荒々しい大涌谷の谷底を見下ろす。1個食べると寿命が7年延びると言われる黒玉子！',
            cost: 500,
            imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
            nextTransport: { mode: 'フェリー', durationMinutes: 30, note: '桃源台港から箱根海賊船乗船', costEstimate: 0 },
            coordinates: { lat: 35.2428, lng: 139.0203 }
          },
          {
            id: 'hk2-2',
            name: '箱根神社 (平和の鳥居)',
            category: '観光',
            timeSlot: '13:30 - 15:30',
            durationMinutes: 120,
            locationName: '箱根町元箱根',
            description: '湖上にそびえ立つ大きな赤鳥居が神秘的。開運・金運・縁結びのパワースポット。',
            cost: 0,
            imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
            coordinates: { lat: 35.2049, lng: 139.0255 }
          }
        ]
      }
    ]
  },

  {
    id: 'plan-okinawa-beach',
    title: '沖縄本島2泊3日 映えビーチ・古宇利島ドライブ＆やちむんカフェ巡り',
    subtitle: 'エメラルドグリーンの海と南国カフェ、絶景古宇利大橋を渡る癒やしの沖縄リゾートアイランド',
    destination: '沖縄県',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    duration: '2泊3日',
    daysCount: 3,
    companion: '友人グループ',
    theme: ['映え・フォトジェニック', '絶景・自然', 'グルメ'],
    budgetRange: '5万〜10万円',
    rating: 4.88,
    likesCount: 1350,
    bestSeason: ['春（4月〜6月）', '夏（7月〜9月）', '秋（10月）'],
    estimatedBudget: {
      transportCost: 28000,
      accommodationCost: 24000,
      foodCost: 18000,
      activitiesCost: 6000,
      shoppingBuffer: 8000,
      totalCost: 84000,
    },
    highlights: [
      'エメラルドグリーンの海の上を疾走する全長2kmの古宇利大橋ドライブ',
      'やちむんの里での可愛い伝統焼き物器探しと森のカフェ',
      'アメリカンビレッジでのサンセットフォトジェニックスポット巡り',
      '沖縄そば名店でいただくホロホロソーキそばとタコライス'
    ],
    packingItems: [
      '水着・ビーチサンダル',
      'サングラス・麦わら帽子',
      'UV対策日焼け止め',
      '運転免許証（レンタカー必須）',
      '防水スマホケース'
    ],
    days: [
      {
        dayNumber: 1,
        title: '【1日目】那覇空港〜ウミカジテラス & 北谷アメリカンビレッジ',
        description: '那覇到着後、海沿いの真っ白いウミカジテラスと海外風のおしゃれなアメリカンビレッジへ。',
        spots: [
          {
            id: 'ok1-1',
            name: '瀬長島ウミカジテラス',
            category: 'カフェ',
            timeSlot: '12:00 - 14:00',
            durationMinutes: 120,
            locationName: '豊見城市瀬長',
            description: '地中海ギリシャを思わせる白亜の店舗群。離着陸する飛行機を目前にマンゴーパンケーキをパクリ。',
            cost: 1800,
            imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
            nextTransport: { mode: 'レンタカー・車', durationMinutes: 40, note: '国道58号線を北上', costEstimate: 0 },
            coordinates: { lat: 26.1756, lng: 127.6417 }
          },
          {
            id: 'ok1-2',
            name: '美浜アメリカンビレッジ (サンセット)',
            category: '観光',
            timeSlot: '16:00 - 19:30',
            durationMinutes: 210,
            locationName: '中頭郡北谷町美浜',
            description: 'カラフルなウォールアートと西海岸の美しい夕日。夜はアメリカンステーキで乾杯！',
            cost: 4500,
            imageUrl: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=800&q=80',
            coordinates: { lat: 26.3160, lng: 127.7573 }
          }
        ]
      },
      {
        dayNumber: 2,
        title: '【2日目】古宇利島ハートロック & 万座毛絶景ドライブ',
        description: '沖縄屈指の澄み渡る海！古宇利大橋を渡りハートロックがあるティーヌ浜へ。',
        spots: [
          {
            id: 'ok2-1',
            name: '万座毛 (まんざもう)',
            category: '観光',
            timeSlot: '09:30 - 10:30',
            durationMinutes: 60,
            locationName: '国頭郡恩納村',
            description: '象の鼻に似た隆起サンゴ礁の崖と、コバルトブルーの絶景広がる名勝地。',
            cost: 100,
            imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
            nextTransport: { mode: 'レンタカー・車', durationMinutes: 50, note: '許田IC経由で古宇利島へ', costEstimate: 0 },
            coordinates: { lat: 26.5048, lng: 127.8504 }
          },
          {
            id: 'ok2-2',
            name: '古宇利大橋 & ハートロック (ティーヌ浜)',
            category: '観光',
            timeSlot: '11:30 - 13:30',
            durationMinutes: 120,
            locationName: '国頭郡今帰仁村古宇利',
            description: 'まるで海の上を飛んでいるような爽快ドライブ！ハート型の岩で記念撮影。',
            cost: 500,
            imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
            coordinates: { lat: 26.7022, lng: 128.0200 }
          }
        ]
      },
      {
        dayNumber: 3,
        title: '【3日目】読谷村やちむんの里 & 国際通りでお買い物',
        description: 'ほっこり優しい沖縄の伝統焼き物を探して工房巡り。最後は国際通りの賑わいを楽しむ。',
        spots: [
          {
            id: 'ok3-1',
            name: '読谷村 やちむんの里',
            category: '体験',
            timeSlot: '10:00 - 12:00',
            durationMinutes: 120,
            locationName: '中頭郡読谷村座喜味',
            description: '赤瓦の登り窯と多くの工房が集まる集落。一点物の日常使いできる可愛い器を手に入れよう。',
            cost: 3000,
            imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
            coordinates: { lat: 26.4014, lng: 127.7533 }
          }
        ]
      }
    ]
  },

  {
    id: 'plan-kanazawa-culture',
    title: '金沢1泊2日 兼六園・ひがし茶屋街と加賀百万石の美食散歩',
    subtitle: '北陸新幹線で約2時間半！金箔ソフト、21世紀美術館、のどぐろ寿司を満喫する洗練旅',
    destination: '石川県',
    coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    duration: '1泊2日',
    daysCount: 2,
    companion: '一人旅',
    theme: ['歴史・神社仏閣', 'アート・カルチャー', 'グルメ'],
    budgetRange: '3万〜5万円',
    rating: 4.87,
    likesCount: 890,
    bestSeason: ['春（4月〜5月）', '秋（10月〜11月）', '冬（12月〜2月）'],
    estimatedBudget: {
      transportCost: 26000,
      accommodationCost: 12000,
      foodCost: 14000,
      activitiesCost: 3000,
      shoppingBuffer: 5000,
      totalCost: 60000,
    },
    highlights: [
      'ひがし茶屋街の出格子が並ぶ古い街並みで金箔贅沢ソフトクリーム',
      '金沢21世紀美術館のレアンドロ・エルリッヒ「スイミング・プール」',
      '日本三名園・兼六園の琴柱灯籠と季節の風情溢れる庭園美',
      '近江町市場で食べる炙りのどぐろ＆カニ・甘エビ贅沢丼'
    ],
    packingItems: [
      '折りたたみ傘（金沢は雨が多い「弁当忘れても傘忘れるな」）',
      'カメラ',
      '歩きやすい靴'
    ],
    days: [
      {
        dayNumber: 1,
        title: '【1日目】金沢駅鼓門〜ひがし茶屋街 & 21世紀美術館',
        description: '世界で最も美しい駅の一つ金沢駅から出発。和の情緒と現代アートを1日で巡る欲張りコース。',
        spots: [
          {
            id: 'kz1-1',
            name: '金沢駅 鼓門 (つづみもん)',
            category: '観光',
            timeSlot: '10:30 - 11:00',
            durationMinutes: 30,
            locationName: '金沢市木ノ新保町',
            description: '伝統芸能の能楽に使われる鼓をイメージした圧倒的建築美。旅の記念写真にぴったり。',
            cost: 0,
            imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
            nextTransport: { mode: 'バス', durationMinutes: 15, note: '城下まち金沢周遊バスでひがし茶屋街へ', costEstimate: 210 },
            coordinates: { lat: 36.5780, lng: 136.6482 }
          },
          {
            id: 'kz1-2',
            name: 'ひがし茶屋街 & 箔一 本店（金箔ソフト）',
            category: '観光',
            timeSlot: '11:30 - 13:30',
            durationMinutes: 120,
            locationName: '金沢市東山',
            description: '金箔がまるまる一枚豪快にのった「金箔かがやきソフト」を食べながら風情溢れる茶屋街散歩。',
            cost: 1500,
            imageUrl: 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=800&q=80',
            coordinates: { lat: 36.5725, lng: 136.6667 }
          },
          {
            id: 'kz1-3',
            name: '金沢21世紀美術館',
            category: 'アート・カルチャー',
            timeSlot: '14:30 - 17:00',
            durationMinutes: 150,
            locationName: '金沢市広坂',
            description: '円形のモダンなガラス張り美術館。スイミング・プールなど体感型のアート展示が目白押し。',
            cost: 1200,
            imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
            coordinates: { lat: 36.5609, lng: 136.6582 }
          }
        ]
      },
      {
        dayNumber: 2,
        title: '【2日目】兼六園散策〜近江町市場で海鮮ランチ',
        description: '朝一番に静かな兼六園を歩き、お腹をすかせて近江町市場で北陸最高の鮮魚を堪能！',
        spots: [
          {
            id: 'kz2-1',
            name: '兼六園 (名勝)',
            category: '観光',
            timeSlot: '08:30 - 10:30',
            durationMinutes: 120,
            locationName: '金沢市兼六町',
            description: '加賀百万石の文化を集約した日本三名園。徽軫灯籠（ことじとうろう）と霞ヶ池の美しい調和。',
            cost: 320,
            imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
            nextTransport: { mode: '徒歩', durationMinutes: 15, note: '近江町市場へ', costEstimate: 0 },
            coordinates: { lat: 36.5621, lng: 136.6625 }
          },
          {
            id: 'kz2-2',
            name: '近江町市場（のどぐろ炙り丼）',
            category: 'グルメ',
            timeSlot: '11:00 - 13:00',
            durationMinutes: 120,
            locationName: '金沢市上近江町',
            description: '約300年の歴史を持つ「金沢の市民の台所」。脂がのった高級魚のどぐろを炙りで香ばしく！',
            cost: 3500,
            imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
            coordinates: { lat: 36.5714, lng: 136.6564 }
          }
        ]
      }
    ]
  },

  {
    id: 'plan-tokyo-day',
    title: '東京映え日帰りプラン 表参道建築散歩・チームラボ＆浅草夜景スポット',
    subtitle: '最先端デザイン・最新没入型アートと下町伝統文化のコントラストを一日で体験',
    destination: '東京都',
    coverImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    duration: '日帰り',
    daysCount: 1,
    companion: '女子旅',
    theme: ['映え・フォトジェニック', 'アート・カルチャー', 'グルメ'],
    budgetRange: '〜3万円',
    rating: 4.80,
    likesCount: 720,
    bestSeason: ['通年'],
    estimatedBudget: {
      transportCost: 1500,
      accommodationCost: 0,
      foodCost: 6500,
      activitiesCost: 4200,
      shoppingBuffer: 3000,
      totalCost: 15200,
    },
    highlights: [
      '表参道の洗練されたカフェでいただくサクサククロワッサンフレンチトースト',
      'チームラボプラネッツTOKYOでの光と水の中を歩く幻想没入アート体験',
      '浅草寺の雷門とライトアップされた五重塔の美しすぎる夜景',
      '東京スカイツリーを望むリバーサイドテラスカフェ'
    ],
    packingItems: [
      'ハーフパンツまたは膝までめくれる服（チームラボの水深のある展示用）',
      '交通系ICカード/スマホ決済',
      'モバイルバッテリー'
    ],
    days: [
      {
        dayNumber: 1,
        title: '【1日目】表参道〜麻布台ヒルズ〜チームラボ〜浅草',
        description: 'トレンドの最先端を巡る最高にエネルギッシュな東京ワンデイトリップ！',
        spots: [
          {
            id: 't1-1',
            name: '表参道 BREAD, ESPRESSO & モーニング',
            category: 'カフェ',
            timeSlot: '09:00 - 10:30',
            durationMinutes: 90,
            locationName: '渋谷区神宮前',
            description: '名物食パン「ムー」を使った鉄板フレンチトースト。朝の柔らかな光差し込むテラス席。',
            cost: 1500,
            imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
            nextTransport: { mode: '電車', durationMinutes: 20, note: '東京メトロ銀座線・日比谷線で麻布台ヒルズへ', costEstimate: 210 },
            coordinates: { lat: 35.6662, lng: 139.7088 }
          },
          {
            id: 't1-2',
            name: 'チームラボプラネッツ TOKYO (豊洲)',
            category: '体験',
            timeSlot: '13:00 - 15:30',
            durationMinutes: 150,
            locationName: '江東区豊洲',
            description: '水に入る美術館と花々と一体化する庭園。巨大な作品空間の中に没入する非日常世界。',
            cost: 4200,
            imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
            nextTransport: { mode: '電車', durationMinutes: 30, note: '新豊洲〜有楽町〜浅草', costEstimate: 350 },
            coordinates: { lat: 35.6470, lng: 139.7891 }
          },
          {
            id: 't1-3',
            name: '浅草寺 ライトアップ & 仲見世通り night walk',
            category: '観光',
            timeSlot: '18:00 - 20:00',
            durationMinutes: 120,
            locationName: '台東区浅草',
            description: '昼間と一変して静けさに包まれる幻想的な夜の浅草寺。スカイツリーの灯りを背に江戸情緒を体感。',
            cost: 0,
            imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
            coordinates: { lat: 35.7148, lng: 139.7967 }
          }
        ]
      }
    ]
  }
];
