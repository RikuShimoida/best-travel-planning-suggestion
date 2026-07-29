export type TravelDuration = '日帰り' | '1泊2日' | '2泊3日' | '3泊4日' | '4泊5日以上';

export type CompanionType = '一人旅' | 'カップル・夫婦' | '女子旅' | '家族・子連れ' | '友人グループ';

export type BudgetRange = '〜3万円' | '3万〜5万円' | '5万〜10万円' | '10万円〜';

export type TravelTheme = 
  | 'グルメ' 
  | '温泉・癒やし' 
  | '歴史・神社仏閣' 
  | '絶景・自然' 
  | 'アート・カルチャー' 
  | '映え・フォトジェニック'
  | 'アクティブ・体験';

export type SpotCategory = '観光' | 'グルメ' | 'カフェ' | '宿泊' | '交通' | '体験' | 'ショッピング' | 'アート・カルチャー';

export interface TransportDetail {
  mode: '徒歩' | '電車' | 'バス' | 'タクシー' | 'レンタカー・車' | 'フェリー' | '新幹線';
  durationMinutes: number;
  note?: string;
  costEstimate?: number;
}

export interface TravelSpot {
  id: string;
  name: string;
  category: SpotCategory;
  timeSlot: string; // e.g. "09:30 - 11:00"
  durationMinutes: number;
  description: string;
  locationName: string;
  address?: string;
  cost: number;
  imageUrl?: string;
  tips?: string;
  nextTransport?: TransportDetail;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface DayItinerary {
  dayNumber: number;
  title: string;
  description: string;
  spots: TravelSpot[];
}

export interface BudgetBreakdown {
  transportCost: number;
  accommodationCost: number;
  foodCost: number;
  activitiesCost: number;
  shoppingBuffer: number;
  totalCost: number;
}

export interface TravelPlan {
  id: string;
  title: string;
  subtitle: string;
  destination: string;
  coverImage: string;
  duration: TravelDuration;
  daysCount: number;
  companion: CompanionType;
  theme: TravelTheme[];
  budgetRange: BudgetRange;
  estimatedBudget: BudgetBreakdown;
  rating: number;
  likesCount: number;
  bestSeason: string[];
  days: DayItinerary[];
  packingItems?: string[];
  highlights: string[];
  isAIGenerated?: boolean;
  createdAt?: string;
}

export interface SearchFilters {
  destination: string;
  duration: string;
  companion: string;
  budget: string;
  theme: string;
  sortBy: 'popular' | 'rating' | 'budget_low' | 'budget_high' | 'newest';
  keyword: string;
}

export interface AIPlanRequest {
  destination: string;
  origin?: string;
  daysCount: number;
  durationLabel: TravelDuration;
  companion: CompanionType;
  budgetLabel: BudgetRange;
  themes: TravelTheme[];
  mustVisitSpots?: string;
  specialRequests?: string;
  preferredPace?: 'のんびり' | '標準' | '充実・効率重視';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedAction?: {
    label: string;
    actionType: 'search' | 'generate' | 'apply_filter';
    payload: string;
  };
}

export interface PlatformQuote {
  platform: 'じゃらん (Jalan)' | '楽天トラベル (Rakuten)' | 'Expedia' | 'Yahoo!トラベル' | '一休.com' | '公式サイト (Direct)' | string;
  originalPrice: number; // JPY for 1 night (2 adults + 1 child)
  discountedPrice: number; // JPY after coupons
  appliedCoupon?: string;
  pointReward?: string; // e.g. "10% (4,500pt)"
  planTitle: string;
  inclusions: string[]; // e.g. ["オールインクルーシブ（夕朝食バイキング＋ラウンジ飲み放題）", "子供用アメニティ・浴衣貸出", "貸切温泉風呂30分サービス"]
  cancellationPolicy: string; // e.g. "3日前までキャンセル無料"
  directBookingUrl?: string;
  sourceEmailSubject?: string;
  sourceEmailDate?: string;
}

export interface HotelDealComparison {
  id: string;
  hotelName: string; // e.g. "TAOYA 志摩 (TAOYA Shima)"
  location: string; // e.g. "三重県 鳥羽市"
  hotelType: string; // e.g. "オールインクルーシブ 温泉リゾート"
  coverImage: string;
  guestConfiguration: string; // e.g. "大人2名 + 子ども1名 (小学生/幼児)"
  quotes: PlatformQuote[];
  cheapestPlatform: string; // e.g. "じゃらん (Jalan)"
  cheapestPrice: number; // JPY
  highestPrice: number; // JPY
  maxSavingsAmount: number; // JPY savings vs highest
  bestValuePlatform: string;
  aiRecommendationSummary: string;
  familyFriendlyHighlights: string[];
  lastScannedAt: string;
}

export interface GmailScanResult {
  scannedEmailCount: number;
  matchedTravelEmailsCount: number;
  scanTimestamp: string;
  hotels: HotelDealComparison[];
}

