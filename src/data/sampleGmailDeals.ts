import { HotelDealComparison } from '../types';

export class SampleDeals {
  static getDeals(): HotelDealComparison[] {
    return [
      {
        id: 'deal-taoya-shima',
        hotelName: 'TAOYA 志摩 (大江戸温泉物語 プレミアム)',
        location: '三重県 鳥羽市 浦村町',
        hotelType: 'オールインクルーシブ 温泉オーシャンリゾート',
        coverImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
        guestConfiguration: '大人2名 ＋ 子ども1名 (小学生/アメニティ付)',
        lastScannedAt: new Date().toISOString(),
        familyFriendlyHighlights: [
          '夕食・朝食の豪華グルメバイキング＋生ビール・地酒・ソフトドリンク飲み放題（追加料金0円）',
          'オーシャンビューのラウンジで湯上り生ビール＆アイスキャンディ無料食べ放題',
          'キッズコーナー＆ファミリールーム完備、子ども用浴衣・アメニティ無料貸出',
          '海を望むインフィニティ露天風呂と星空テラス'
        ],
        cheapestPlatform: 'じゃらん (Jalan)',
        cheapestPrice: 42800,
        highestPrice: 51200,
        maxSavingsAmount: 8400,
        bestValuePlatform: '楽天トラベル (Rakuten)',
        aiRecommendationSummary: '【最安値判明】「じゃらん」の「全館オールインクルーシブ体験＆ファミリー特別優待プラン」が【総額 42,800円】で最安です！さらに「じゃらん夏休み特別クーポン(3,000円引)」と「ポイント5%還元」が自動適用されています。一方、「楽天トラベル」は44,500円ですが「楽天ポイント10倍（4,450pt還元）」が付くため、実質価格では楽天トラベルも非常に強力です。Expediaは海外決済通貨換算のためやや高めの設定となっています。お子様(小学生)の食事・ドリンク代もオールインクルーシブに含まれているため追加出費がかかりません。',
        quotes: [
          {
            platform: 'じゃらん (Jalan)',
            originalPrice: 45800,
            discountedPrice: 42800,
            appliedCoupon: 'じゃらん全館クーポン (3,000円OFF)',
            pointReward: 'Pontaポイント 5% (2,140pt)',
            planTitle: '【直前メール限定】TAOYA志摩 オールインクルーシブ家族旅プラン（夕朝食バイキング＆ラウンジフリー）',
            inclusions: [
              '夕朝食バイキング（伊勢志摩の旬の味覚・海鮮）',
              '滞在中すべてのドリンク＆アルコール飲み放題',
              '湯上りラウンジ（ビール・アイス・ソフトドリンク）',
              '子ども用アメニティ・貸切キッズアタッチメント'
            ],
            cancellationPolicy: '前日まで無料キャンセル可能',
            sourceEmailSubject: '【じゃらん】TAOYA志摩の限定会員クーポンをお届け！ご家族3名様オールインクルーシブ特別枠',
            sourceEmailDate: '2026/07/26 10:15'
          },
          {
            platform: '楽天トラベル (Rakuten)',
            originalPrice: 48500,
            discountedPrice: 44500,
            appliedCoupon: '楽天トラベル 高級宿5%OFFクーポン',
            pointReward: '楽天ポイント10倍還元 (4,450pt獲得)',
            planTitle: '【5と0のつく日限定】TAOYA志摩 家族3人で楽しむオーシャンビュー温泉＆和洋バイキング',
            inclusions: [
              '夕朝食和洋バイキング＆フリードリンク',
              '星空テラス＆足湯ラウンジアクセス',
              '湯上りアイス・生ビールサービス',
              '楽天会員限定チェックアウト11:00延長'
            ],
            cancellationPolicy: '2日前までキャンセル無料',
            sourceEmailSubject: '【楽天トラベル】5と0のつく日！TAOYA志摩がポイント10倍＆限定クーポン配布中',
            sourceEmailDate: '2026/07/25 18:30'
          },
          {
            platform: 'Yahoo!トラベル',
            originalPrice: 47200,
            discountedPrice: 45000,
            appliedCoupon: 'PayPayポイント今すぐ利用 (2,200円分即時割引)',
            pointReward: 'PayPayポイント 2% (900pt)',
            planTitle: '【PayPay今すぐ利用OK】オールインクルーシブステイ TAOYA志摩 ファミリー和洋室',
            inclusions: [
              '全食事＆ラウンジドリンクオールインクルーシブ',
              '大浴場＆インフィニティ露天風呂',
              'ファミリー向けアメニティセット'
            ],
            cancellationPolicy: '3日前までキャンセル無料',
            sourceEmailSubject: '【Yahoo!トラベル】PayPayポイント今すぐ利用でTAOYA志摩がおトク！',
            sourceEmailDate: '2026/07/24 14:00'
          },
          {
            platform: 'Expedia',
            originalPrice: 51200,
            discountedPrice: 49800,
            appliedCoupon: 'Expedia Gold会員 3%OFF',
            pointReward: 'OneKeyCash 2%',
            planTitle: 'TAOYA Shima All-Inclusive Ocean View Family Room (2 Adults + 1 Child)',
            inclusions: [
              'All Meals & Free Lounge Drinks',
              'Onsen Hot Spring Access',
              'Free Parking & Wi-Fi'
            ],
            cancellationPolicy: '48時間前まで無料キャンセル',
            sourceEmailSubject: 'Expedia: Member Deals for TAOYA Shima All-Inclusive Resort',
            sourceEmailDate: '2026/07/23 09:20'
          },
          {
            platform: '一休.com',
            originalPrice: 49000,
            discountedPrice: 46550,
            appliedCoupon: '一休会員即時利用 5%還元',
            pointReward: '一休ポイント 2% (930pt)',
            planTitle: '【一休限定】TAOYA志摩 プレミアムオールインクルーシブ オーシャンビュー和洋室',
            inclusions: [
              '夕朝食和洋バイキング＋アルコール飲み放題',
              'プレミアムラウンジアクセス',
              'レイトチェックアウト11:00'
            ],
            cancellationPolicy: '3日前まで無料キャンセル',
            sourceEmailSubject: '【一休.com】TAOYA志摩 ポイント即時利用でお得なファミリープラン',
            sourceEmailDate: '2026/07/24 19:00'
          },
          {
            platform: 'Booking.com',
            originalPrice: 50500,
            discountedPrice: 47975,
            appliedCoupon: 'Genius Level 2 会員5%割引',
            pointReward: 'Geniusリワード',
            planTitle: 'TAOYA Shima - All Inclusive Resort (2 Adults + 1 Child)',
            inclusions: [
              'All Meals & Drinks Included',
              'Free Parking & Wi-Fi'
            ],
            cancellationPolicy: '2日前まで無料キャンセル',
            sourceEmailSubject: 'Booking.com: Genius会員特典 TAOYA志摩のご案内',
            sourceEmailDate: '2026/07/22 15:10'
          },
          {
            platform: 'Agoda',
            originalPrice: 51000,
            discountedPrice: 47430,
            appliedCoupon: 'Agoda Vip 7%OFFクーポン',
            pointReward: 'アゴダコイン還元',
            planTitle: 'TAOYA Shima (大江戸温泉物語 プレミアム) All Inclusive',
            inclusions: [
              '夕朝食バイキング＆ラウンジドリンクフリー',
              '大浴場・露天風呂利用無料'
            ],
            cancellationPolicy: '3日前までキャンセル無料',
            sourceEmailSubject: 'Agoda: アゴダ限定のアグレッシブ割引クーポン TAOYA志摩',
            sourceEmailDate: '2026/07/21 13:40'
          },
          {
            platform: 'Trip.com',
            originalPrice: 50800,
            discountedPrice: 48260,
            appliedCoupon: 'Trip.com ファミリー特別5%引',
            pointReward: 'TripCoins 2%',
            planTitle: 'TAOYA Shima All-Inclusive Ocean View Room',
            inclusions: [
              'All Meals & Beverages Included',
              'Hot Spring Access'
            ],
            cancellationPolicy: '3日前までキャンセル無料',
            sourceEmailSubject: 'Trip.com: Member Deal TAOYA Shima',
            sourceEmailDate: '2026/07/20 18:00'
          },
          {
            platform: '公式サイト (Direct)',
            originalPrice: 46000,
            discountedPrice: 46000,
            appliedCoupon: '直営会員ポイント付与',
            pointReward: '大江戸温泉会員ポイント 3%',
            planTitle: '【ベストレート保証】TAOYA志摩 オールインクルーシブ標準ファミリープラン',
            inclusions: [
              '夕朝食バイキング＆アルコールフリー',
              '館内全ラウンジサービス',
              '売店ご利用1000円券（1室につき1枚）'
            ],
            cancellationPolicy: '3日前までキャンセル無料',
            sourceEmailSubject: '【大江戸温泉物語】TAOYA志摩の最新空室状況・ベストレートのご案内',
            sourceEmailDate: '2026/07/20 11:45'
          }
        ]
      },
      {
        id: 'deal-taoya-nikko',
        hotelName: 'TAOYA 日光霧降',
        location: '栃木県 日光市 霧降高原',
        hotelType: '高原オールインクルーシブ 温泉リゾート',
        coverImage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
        guestConfiguration: '大人2名 ＋ 子ども1名 (未就学児・添い寝無料)',
        lastScannedAt: new Date().toISOString(),
        familyFriendlyHighlights: [
          '標高1,000mの高原絶景インフィニティ温泉露天風呂',
          '夕食・朝食時のライブキッチン＆ソフトクリーム・お酒フリー飲み放題',
          '暖炉のあるラウンジで焼きマシュマロ＆生ビール体験',
          '屋内温水プール＆子ども用遊具エリア併設'
        ],
        cheapestPlatform: '楽天トラベル (Rakuten)',
        cheapestPrice: 38500,
        highestPrice: 46000,
        maxSavingsAmount: 7500,
        bestValuePlatform: '楽天トラベル (Rakuten)',
        aiRecommendationSummary: '【最安値判明】「楽天トラベル」の「夏休みファミリー先着クーポン」適用により【総額 38,500円】で圧倒的最安値です！じゃらんの39,800円と比較しても1,300円安く、さらに楽天ポイント2倍還元が付きます。日光高原の豊かな自然の中、暖炉ラウンジでの焼きマシュマロや生ビールフリー、温水プールがすべて追加料金なしで利用できるため、お子様連れの思い出づくりに最適です。',
        quotes: [
          {
            platform: '楽天トラベル (Rakuten)',
            originalPrice: 42500,
            discountedPrice: 38500,
            appliedCoupon: '夏のおでかけファミリークーポン (4,000円OFF)',
            pointReward: '楽天ポイント 2% (770pt)',
            planTitle: '【ファミリー人気No.1】TAOYA日光霧降 オールインクルーシブ高原リゾート★温水プール＆温泉バイキング',
            inclusions: [
              '夕朝食バイキング（生ビール・ワイン飲み放題）',
              '暖炉ラウンジ（焼きマシュマロ・生ビール）',
              'インフィニティ露天風呂＆大浴場',
              '温水プールご利用券サービス'
            ],
            cancellationPolicy: '3日前まで無料キャンセル可能',
            sourceEmailSubject: '【楽天トラベル】TAOYA日光霧降で使えるファミリー特別クーポンをGET！',
            sourceEmailDate: '2026/07/26 15:40'
          },
          {
            platform: 'じゃらん (Jalan)',
            originalPrice: 43800,
            discountedPrice: 39800,
            appliedCoupon: 'じゃらん夏旅クーポン (4,000円引)',
            pointReward: 'Pontaポイント 2% (796pt)',
            planTitle: '【早期割り】TAOYA日光霧降 オールインクルーシブステイ☆家族で楽しむ日光温泉旅行',
            inclusions: [
              'バイキング夕朝食＆フリードリンク',
              '暖炉ラウンジ＆湯上りドリンク',
              'キッズアメニティ貸出'
            ],
            cancellationPolicy: '3日前まで無料キャンセル可能',
            sourceEmailSubject: '【じゃらん】日光・鬼怒川の直前割引メール！TAOYA日光霧降',
            sourceEmailDate: '2026/07/25 11:20'
          },
          {
            platform: 'Yahoo!トラベル',
            originalPrice: 44000,
            discountedPrice: 41800,
            appliedCoupon: 'PayPayポイント即時利用 (5%値引き)',
            pointReward: 'PayPayポイント 1%',
            planTitle: 'TAOYA日光霧降 オールインクルーシブ・ファミリーツインルーム',
            inclusions: [
              '夕朝食バイキング＋全飲み放題',
              '館内全ラウンジフリー'
            ],
            cancellationPolicy: '2日前まで無料キャンセル可能',
            sourceEmailSubject: '【Yahoo!トラベル】日光霧降高原の涼しい夏旅特集',
            sourceEmailDate: '2026/07/22 17:00'
          },
          {
            platform: 'Expedia',
            originalPrice: 46000,
            discountedPrice: 44200,
            appliedCoupon: 'Expedia 会員特別価格',
            pointReward: 'OneKeyCash 2%',
            planTitle: 'TAOYA Nikko Kirifuri - All Inclusive Family Room',
            inclusions: [
              'All Meals Included',
              'Hot Spring Access'
            ],
            cancellationPolicy: '3日前までキャンセル無料',
            sourceEmailSubject: 'Expedia: Special Rate for TAOYA Nikko Kirifuri',
            sourceEmailDate: '2026/07/21 10:00'
          }
        ]
      },
      {
        id: 'deal-anda-resort',
        hotelName: 'アンダリゾート伊豆高原 (バリ風オールインクルーシブ)',
        location: '静岡県 伊東市 八幡野',
        hotelType: 'バリ風オールインクルーシブ 温泉リゾート',
        coverImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
        guestConfiguration: '大人2名 ＋ 子ども1名 (小学生)',
        lastScannedAt: new Date().toISOString(),
        familyFriendlyHighlights: [
          '貸切露天風呂10施設がすべて予約不要・無料で何度でも入れる！',
          'バータイム（夜食ラーメン・おつまみ・カクテル全80種無料）',
          'カラオケ・卓球・ダーツ・パターゴルフ・キッズル−ム完全無料',
          '子ども向けスタンプラリー＆焼きマシュマロ体験'
        ],
        cheapestPlatform: 'じゃらん (Jalan)',
        cheapestPrice: 49800,
        highestPrice: 58000,
        maxSavingsAmount: 8200,
        bestValuePlatform: 'じゃらん (Jalan)',
        aiRecommendationSummary: '【最安値判明】「じゃらん」の「直前メール限定アクティビティ全無料プラン」が【総額 49,800円】で最安値！カラオケ、卓球、10個の貸切風呂、夜食バータイムまで全て追加料金0円のフル・オールインクルーシブ。楽天トラベル（52,000円）より2,200円安く予約できます。お子様向けのアクティビティ（スタンプラリー、キッズルーム）が非常に充実しているため、家族全員がホテル内だけで1日中楽しめます。',
        quotes: [
          {
            platform: 'じゃらん (Jalan)',
            originalPrice: 54800,
            discountedPrice: 49800,
            appliedCoupon: 'じゃらん伊豆エリア限定クーポン (5,000円OFF)',
            pointReward: 'Pontaポイント 2% (996pt)',
            planTitle: '【直前メール限定】アンダリゾート伊豆高原 オールインクルーシブ★10の貸切風呂＆無料カラオケ＆バータイム',
            inclusions: [
              '夕食コース＋バータイム（夜食＆お酒・ドリンク飲み放題）',
              '貸切温泉風呂10ヶ所すべて無料',
              'カラオケ、卓球、パターゴルフ、キッズエリア完全無料',
              '子ども用スタンプラリー＆お菓子プレゼント'
            ],
            cancellationPolicy: '3日前までキャンセル無料',
            sourceEmailSubject: '【じゃらん】アンダリゾート伊豆高原からのご案内！最大5000円引ファミリークーポン',
            sourceEmailDate: '2026/07/26 08:30'
          },
          {
            platform: '楽天トラベル (Rakuten)',
            originalPrice: 56000,
            discountedPrice: 52000,
            appliedCoupon: '楽天トラベル 4,000円引クーポン',
            pointReward: '楽天ポイント 5% (2,600pt)',
            planTitle: '【ファミリー人気】伊豆高原アンダリゾート オールインクルーシブ贅沢バリ風温泉ステイ',
            inclusions: [
              '夕朝食＋バータイム飲み放題＆夜食',
              '無料アクティビティ＆貸切風呂無料',
              'キッズアメニティ完備'
            ],
            cancellationPolicy: '3日前までキャンセル無料',
            sourceEmailSubject: '【楽天トラベル】バリ風オールインクルーシブ・アンダリゾート伊豆高原のご紹介',
            sourceEmailDate: '2026/07/24 16:15'
          },
          {
            platform: 'Yahoo!トラベル',
            originalPrice: 57000,
            discountedPrice: 54150,
            appliedCoupon: 'PayPayポイント今すぐ利用 (5%値引き)',
            pointReward: 'PayPayポイント 1%',
            planTitle: 'アンダリゾート伊豆高原 ファミリーバリ風スイート',
            inclusions: [
              'オールインクルーシブ食事＆ドリンク',
              '貸切温泉＆アミューズメント無料'
            ],
            cancellationPolicy: '3日前まで無料キャンセル',
            sourceEmailSubject: '【Yahoo!トラベル】伊豆高原のファミリー人気宿特集',
            sourceEmailDate: '2026/07/23 12:00'
          }
        ]
      }
    ];
  }
}
