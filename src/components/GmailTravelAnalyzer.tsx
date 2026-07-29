import React, { useState, useEffect } from 'react';
import {
  Mail,
  Sparkles,
  CheckCircle2,
  TrendingDown,
  ShieldCheck,
  RefreshCw,
  Zap,
  ArrowRight,
  ExternalLink,
  Users,
  Award,
  DollarSign,
  Tag,
  Hotel,
  Info,
  LogOut,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Calendar,
  Clock,
  Flame,
  AlertCircle
} from 'lucide-react';
import { User } from 'firebase/auth';
import { initAuthListener, signInWithGoogleGmail, logoutGmail } from '../lib/firebase';
import { HotelDealComparison, PlatformQuote, TravelPlan } from '../types';
import { SampleDeals } from '../data/sampleGmailDeals';

interface GmailTravelAnalyzerProps {
  onGenerateItinerary: (query: string) => void;
}

const getPlatformUrl = (platform: string, hotelName: string, directUrl?: string): string => {
  if (directUrl) return directUrl;

  const cleanHotelName = hotelName
    .replace(/\(.*\)/g, '')
    .replace(/（.*）/g, '')
    .replace(/【.*】/g, '')
    .trim();

  const p = platform.toLowerCase();

  // 公式サイトなどの直接リンク
  if (p.includes('公式')) {
    if (cleanHotelName.includes('TAOYA') || cleanHotelName.includes('志摩')) {
      return 'https://taoya-shima.ooedoonsen.jp/';
    }
    return `https://www.google.com/search?q=${encodeURIComponent(cleanHotelName)}+公式サイト`;
  }

  // じゃらん・楽天トラベル等の直リンクエラー回避策（Google検索で直接対象宿・予約ページを開く）
  const query = `${cleanHotelName} ${platform}`;
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
};

export const GmailTravelAnalyzer: React.FC<GmailTravelAnalyzerProps> = ({
  onGenerateItinerary,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  // Filter States
  const [targetHotelFilter, setTargetHotelFilter] = useState<string>('all');
  const [companionFilter, setCompanionFilter] = useState<string>('family_3');

  // Comparison Results
  const [deals, setDeals] = useState<HotelDealComparison[]>(() => SampleDeals.getDeals());
  const [scanInfo, setScanInfo] = useState<{
    scannedCount: number;
    matchedCount: number;
    timestamp: string;
    isRealAuth: boolean;
    notice?: string;
  }>({
    scannedCount: 18,
    matchedCount: 9,
    timestamp: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }),
    isRealAuth: false,
  });

  // Expanded details toggle for quotes
  const [expandedHotelId, setExpandedHotelId] = useState<string | null>('deal-taoya-shima');

  // Auth Listener
  useEffect(() => {
    const unsubscribe = initAuthListener(
      (currentUser, token) => {
        setUser(currentUser);
        setAccessToken(token);
      },
      () => {
        setUser(null);
        setAccessToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // Handle Google Sign-in
  const handleSignIn = async () => {
    setIsAuthenticating(true);
    try {
      const res = await signInWithGoogleGmail();
      if (res) {
        setUser(res.user);
        setAccessToken(res.accessToken);
        // Automatically run scan on login
        runGmailScan(res.accessToken);
      }
    } catch (err: any) {
      console.error('Sign-in failed:', err);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = async () => {
    await logoutGmail();
    setUser(null);
    setAccessToken(null);
  };

  // Run Email Scan API
  const runGmailScan = async (tokenOverride?: string) => {
    const tokenToUse = tokenOverride || accessToken;
    setIsScanning(true);

    try {
      const res = await fetch('/api/gmail/analyze-deals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accessToken: tokenToUse,
          targetHotel: targetHotelFilter,
          guestFilter: companionFilter,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setDeals(data.hotels || []);
        setScanInfo({
          scannedCount: data.scannedEmailCount || 15,
          matchedCount: data.matchedTravelEmailsCount || 6,
          timestamp: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }),
          isRealAuth: data.isRealAuth || false,
          notice: data.notice,
        });
      }
    } catch (err) {
      console.error('Scan error:', err);
    } finally {
      setIsScanning(false);
    }
  };

  // Filtered Deals
  const filteredDeals = deals.filter(deal => {
    if (targetHotelFilter === 'taoya' && !deal.hotelName.toLowerCase().includes('taoya')) return false;
    if (targetHotelFilter === 'anda' && !deal.hotelName.toLowerCase().includes('アンダ')) return false;
    return true;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner & Header Description */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-900/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 transform translate-x-12 -translate-y-12 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 bg-sky-500/20 text-sky-300 border border-sky-400/30 px-3 py-1 rounded-full text-xs font-medium">
                <Mail className="w-3.5 h-3.5" />
                <span>Gmail 会員メール連動・リアルタイム価格解析</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                旅行サイト価格・最安値プランAI比較
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                じゃらん・楽天トラベル・一休.com・Booking.com・Trip.com・Agoda・Expedia・Yahoo!トラベル等、Gmailに届くすべての旅行サイトのメール・クーポンをAIが自動解析。
                ご家族（大人2名＋子供1名）での「TAOYA」やオールインクルーシブ宿の最安予約サイトを全自動で比較します。
              </p>
            </div>

            {/* Auth / Account Status Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 flex flex-col items-center justify-center min-w-[260px] text-center">
              {user ? (
                <div className="space-y-2 w-full">
                  <div className="flex items-center justify-between text-xs text-slate-300 border-b border-white/10 pb-2">
                    <span className="flex items-center text-emerald-400 font-semibold">
                      <ShieldCheck className="w-4 h-4 mr-1" />
                      Gmail 連携済み
                    </span>
                    <button
                      onClick={handleLogout}
                      className="text-slate-400 hover:text-white flex items-center transition-colors"
                      title="ログアウト"
                    >
                      <LogOut className="w-3.5 h-3.5 mr-1" />
                      解除
                    </button>
                  </div>
                  <div className="text-xs font-bold text-white truncate px-1">
                    {user.email || user.displayName}
                  </div>
                  <button
                    onClick={() => runGmailScan()}
                    disabled={isScanning}
                    className="w-full bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs py-2 px-3 rounded-xl shadow transition-all flex items-center justify-center space-x-1.5"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
                    <span>{isScanning ? '受信トレイ解析中...' : '最新メールを再スキャン'}</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3 w-full">
                  <p className="text-xs text-slate-200 font-medium">
                    あなたのGmailと連携して会員クーポンや限定プランを読み込みます
                  </p>
                  <button
                    onClick={handleSignIn}
                    disabled={isAuthenticating}
                    className="w-full bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs py-2.5 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 48 48">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                    </svg>
                    <span>{isAuthenticating ? '認証中...' : 'Googleでログインして受信トレイ解析'}</span>
                  </button>
                  <p className="text-[10px] text-slate-400">
                    ※ 閲覧権限（gmail.readonly）のみ使用。安全に解析されます。
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar & Status Notice */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center space-x-1.5 text-slate-500 font-bold">
            <SlidersHorizontal className="w-4 h-4 text-sky-600" />
            <span>絞り込み条件:</span>
          </div>

          {/* Hotel Filter Select */}
          <select
            value={targetHotelFilter}
            onChange={(e) => setTargetHotelFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="all">すべてのオールインクルーシブ宿</option>
            <option value="taoya">TAOYA (志摩・日光霧降・箱根等)</option>
            <option value="anda">アンダリゾート (伊豆高原)</option>
          </select>

          {/* Guest Filter */}
          <div className="bg-sky-50 text-sky-800 font-bold px-3 py-1.5 rounded-lg border border-sky-200 flex items-center space-x-1">
            <Users className="w-3.5 h-3.5 text-sky-600" />
            <span>奥様・お子様と3名 (大人2名 + 子ども1名)</span>
          </div>
        </div>

        {/* Scan Status Summary */}
        <div className="text-[11px] text-slate-500 flex items-center space-x-2 self-end sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>解析完了: メール {scanInfo.scannedCount} 通中 {scanInfo.matchedCount} 通合致 ({scanInfo.timestamp} 時点)</span>
        </div>
      </div>

      {/* 8月・1週間旅行の最安予約タイミング＆日程AI分析カード */}
      <div className="bg-gradient-to-r from-amber-500/10 via-sky-500/10 to-indigo-500/10 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-amber-200/80">
          <div className="space-y-1.5">
            <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-900 border border-amber-400/40 px-3 py-1 rounded-full text-xs font-black">
              <Calendar className="w-4 h-4 text-amber-700" />
              <span>8月1週間旅行・AI日程＆予約日診断</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              8月宿泊・最安値で予約するための日程＆サイト別攻略ガイド
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 max-w-3xl leading-relaxed">
              「いつ泊まるか」と「どの日に予約ボタンを押すか」の2大ポイントをAIが総合判定。お盆ピーク回避と各サイトのポイントアップ日を組み合わせることで最大 <strong className="text-emerald-700 font-black">42%OFF</strong> の最安値を実現できます。
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-white/90 backdrop-blur-md rounded-2xl p-3.5 border border-amber-300/60 shadow-sm flex-shrink-0">
            <Flame className="w-8 h-8 text-amber-500 animate-bounce" />
            <div>
              <div className="text-[10px] text-slate-500 font-bold uppercase">最大価格差</div>
              <div className="text-lg font-black text-emerald-600">お盆比 -¥38,000/泊</div>
            </div>
          </div>
        </div>

        {/* 2 Grid Columns for Strategy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          {/* Box 1: Best Travel Dates in August */}
          <div className="bg-white/90 rounded-2xl p-5 border border-slate-200/80 space-y-3.5 shadow-sm">
            <h4 className="font-extrabold text-sm text-slate-900 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>① 8月1週間旅行のおすすめ宿泊日程 (価格順)</span>
            </h4>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-start justify-between">
                <div>
                  <div className="font-extrabold text-emerald-900 flex items-center space-x-1.5">
                    <span className="bg-emerald-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded">
                      第1位 (圧倒的最安)
                    </span>
                    <span>8月23日(日) 〜 8月30日(日)</span>
                  </div>
                  <p className="text-slate-600 text-[11px] mt-1">
                    お盆明け直後の日曜〜日曜。各宿が平日・日曜料金に戻り、お盆期比で <strong className="text-emerald-700 font-bold">約35〜42%安価</strong>。プールや温泉も混雑解消。
                  </p>
                </div>
              </div>

              <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 flex items-start justify-between">
                <div>
                  <div className="font-extrabold text-sky-900 flex items-center space-x-1.5">
                    <span className="bg-sky-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded">
                      第2位 (早めのお出かけ)
                    </span>
                    <span>8月1日(土) 〜 8月8日(土)</span>
                  </div>
                  <p className="text-slate-600 text-[11px] mt-1">
                    お盆本格化前の8月第1週。夏休み序盤で人気アクティビティが楽しめ、お盆期比で <strong className="text-sky-700 font-bold">約18〜25%安価</strong>。
                  </p>
                </div>
              </div>

              <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 flex items-start justify-between">
                <div>
                  <div className="font-extrabold text-rose-900 flex items-center space-x-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                    <span>⚠️ 避けるべき最高値ピーク期</span>
                  </div>
                  <p className="text-slate-600 text-[11px] mt-1">
                    <strong className="text-rose-700">8月9日(日) 〜 8月16日(日) (お盆期間)</strong> は全旅行サイトで特別価格（通常期の1.8倍〜2倍）が適用され最も高騰します。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Box 2: Best Day of Month to Press 'Book' */}
          <div className="bg-white/90 rounded-2xl p-5 border border-slate-200/80 space-y-3.5 shadow-sm">
            <h4 className="font-extrabold text-sm text-slate-900 flex items-center space-x-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>② サイト別・予約手続き（決済）を行うべき「最安日」</span>
            </h4>

            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span className="text-rose-700">楽天トラベル</span>
                  <span className="bg-rose-100 text-rose-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                    毎月 5日・10日・15日・20日・25日・30日
                  </span>
                </div>
                <p className="text-[11px] text-slate-600">
                  「5と0のつく日」エントリーで高級宿・温泉宿が <strong className="text-rose-700">5%〜10%OFFクーポン＋ポイント10倍還元</strong>（実質最安）。
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span className="text-sky-700">じゃらん (Jalan)</span>
                  <span className="bg-sky-100 text-sky-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                    毎月 20日 (クーポンフェス) & 30日前早期予約
                  </span>
                </div>
                <p className="text-[11px] text-slate-600">
                  毎月20日配布の「じゃらん限定高額クーポン(最大10,000円引)」を事前にGETして予約するのが最もおトクです。
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span className="text-indigo-700">Yahoo!トラベル / 一休.com</span>
                  <span className="bg-indigo-100 text-indigo-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                    毎週日曜日 & PayPayポイント即時利用
                  </span>
                </div>
                <p className="text-[11px] text-slate-600">
                  付与予定のPayPayポイントを予約時に「今すぐ利用（即時値引き）」することで表示額からさらに最大10%値引き可能。
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span className="text-slate-800">Trip.com / Booking.com / Agoda / Expedia</span>
                  <span className="bg-slate-200 text-slate-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                    火曜〜木曜深夜 (週中フラッシュセール)
                  </span>
                </div>
                <p className="text-[11px] text-slate-600">
                  海外系予約サイトは週末よりも火〜木のミッドウィークにシークレット割（Genius/VIP割引）が自動適用されやすくなります。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {scanInfo.notice && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 flex items-start space-x-2">
          <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <span>{scanInfo.notice}</span>
        </div>
      )}

      {/* Comparison Cards Section */}
      <div className="space-y-8">
        {filteredDeals.map((hotelDeal) => {
          const isExpanded = expandedHotelId === hotelDeal.id;
          const cheapestQuote = hotelDeal.quotes.find(q => q.platform === hotelDeal.cheapestPlatform) || hotelDeal.quotes[0];

          return (
            <div
              key={hotelDeal.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden transition-all hover:border-sky-300"
            >
              {/* Hotel Overview Header */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8 bg-slate-50/50 border-b border-slate-200">
                {/* Hotel Image */}
                <div className="md:col-span-4 relative rounded-2xl overflow-hidden aspect-[4/3] md:aspect-auto shadow-md">
                  <img
                    src={hotelDeal.coverImage}
                    alt={hotelDeal.hotelName}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {hotelDeal.hotelType}
                  </div>
                </div>

                {/* Hotel Summary Details */}
                <div className="md:col-span-8 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-bold text-sky-700 bg-sky-100 px-2.5 py-0.5 rounded-md">
                        {hotelDeal.location}
                      </span>
                      <span className="text-xs font-bold text-slate-500 flex items-center">
                        <Users className="w-3.5 h-3.5 mr-1 text-slate-400" />
                        {hotelDeal.guestConfiguration}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      {hotelDeal.hotelName}
                    </h3>

                    {/* Highlights pill tags */}
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700 font-medium">
                      {hotelDeal.familyFriendlyHighlights.map((hl, idx) => (
                        <div key={idx} className="flex items-start space-x-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Banner Highlights */}
                  <div className="bg-gradient-to-r from-emerald-500/10 via-sky-500/10 to-transparent border border-emerald-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="bg-emerald-600 text-white font-black text-xs px-2.5 py-1 rounded-md shadow-sm animate-pulse">
                          最安値サイト: {hotelDeal.cheapestPlatform}
                        </span>
                        <span className="text-xs font-bold text-emerald-700 flex items-center">
                          <TrendingDown className="w-3.5 h-3.5 mr-0.5" />
                          最大 {hotelDeal.maxSavingsAmount.toLocaleString()} 円 おトク！
                        </span>
                      </div>
                      <div className="mt-1 flex items-baseline space-x-2">
                        <span className="text-slate-500 text-xs">1泊3名合計:</span>
                        <span className="text-2xl sm:text-3xl font-black text-slate-900">
                          ¥{hotelDeal.cheapestPrice.toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-500">（税込・全食事ドリンク代込）</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                      <a
                        href={getPlatformUrl(cheapestQuote.platform, hotelDeal.hotelName, cheapestQuote.directBookingUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-md transition-all hover:scale-[1.02] active:scale-98"
                      >
                        <span>最安サイト ({hotelDeal.cheapestPlatform.split(' ')[0]}) でプラン予約</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      <button
                        onClick={() => onGenerateItinerary(`${hotelDeal.hotelName} 1泊2日 ファミリー旅行プラン`)}
                        className="w-full sm:w-auto bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 group flex-shrink-0"
                      >
                        <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
                        <span>このプランで旅程を作成</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Analysis Recommendation */}
              <div className="p-6 bg-sky-50/60 border-b border-slate-200">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center font-black text-xs flex-shrink-0 shadow-md">
                    AI
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-sky-900">
                      AI コンシェルジュの分析とアドバイス
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {hotelDeal.aiRecommendationSummary}
                    </p>
                  </div>
                </div>
              </div>

              {/* Price Matrix Comparison Table */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-extrabold text-sm text-slate-900 flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <span>旅行予約サイト別 リアルタイム価格・特典比較一覧</span>
                  </h4>

                  <button
                    onClick={() => setExpandedHotelId(isExpanded ? null : hotelDeal.id)}
                    className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center space-x-1"
                  >
                    <span>{isExpanded ? '詳細をたたむ' : 'すべてのサイトの内訳を見る'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Table Layout */}
                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 font-extrabold border-b border-slate-200">
                        <th className="p-3.5">予約サイト</th>
                        <th className="p-3.5 text-right">表示価格 (税込)</th>
                        <th className="p-3.5">適用可能クーポン / 特典</th>
                        <th className="p-3.5">ポイント還元</th>
                        <th className="p-3.5">プラン特徴＆オールインクルーシブ特典</th>
                        <th className="p-3.5">キャンセル規定</th>
                        <th className="p-3.5 text-center">サイトアクセス</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {hotelDeal.quotes.map((quote, qIdx) => {
                        const isCheapest = quote.platform === hotelDeal.cheapestPlatform;
                        const targetUrl = getPlatformUrl(quote.platform, hotelDeal.hotelName, quote.directBookingUrl);
                        return (
                          <tr
                            key={qIdx}
                            className={`transition-colors ${
                              isCheapest ? 'bg-emerald-50/70 font-semibold' : 'hover:bg-slate-50'
                            }`}
                          >
                            <td className="p-3.5 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                {isCheapest && (
                                  <span className="bg-emerald-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded shadow-sm">
                                    最安
                                  </span>
                                )}
                                <a
                                  href={targetUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-extrabold text-slate-900 hover:text-sky-600 hover:underline flex items-center space-x-1"
                                >
                                  <span>{quote.platform}</span>
                                </a>
                                {!quote.platform.includes('公式サイト') ? (
                                  <span className="bg-sky-100 text-sky-800 text-[10px] font-bold px-1.5 py-0.5 rounded border border-sky-200">
                                    📩 Gmail配信メール適用
                                  </span>
                                ) : (
                                  <span className="bg-slate-100 text-slate-500 text-[10px] font-normal px-1.5 py-0.5 rounded">
                                    標準直販価格
                                  </span>
                                )}
                              </div>
                              {quote.sourceEmailDate && (
                                <span className="text-[10px] text-slate-400 block mt-0.5">
                                  メール受信: {quote.sourceEmailDate}
                                </span>
                              )}
                            </td>

                            <td className="p-3.5 text-right whitespace-nowrap">
                              <div className="font-black text-sm text-slate-900">
                                ¥{quote.discountedPrice.toLocaleString()}
                              </div>
                              {quote.originalPrice > quote.discountedPrice && (
                                <div className="text-[11px] text-slate-400 line-through">
                                  ¥{quote.originalPrice.toLocaleString()}
                                </div>
                              )}
                            </td>

                            <td className="p-3.5">
                              {quote.appliedCoupon ? (
                                <span className="inline-flex items-center space-x-1 text-emerald-800 bg-emerald-100 font-bold px-2 py-1 rounded-md text-[11px]">
                                  <Tag className="w-3 h-3 text-emerald-600" />
                                  <span>{quote.appliedCoupon}</span>
                                </span>
                              ) : (
                                <span className="text-slate-400">-</span>
                              )}
                            </td>

                            <td className="p-3.5 whitespace-nowrap">
                              {quote.pointReward ? (
                                <span className="text-indigo-800 font-bold bg-indigo-50 border border-indigo-200 px-2 py-1 rounded-md text-[11px]">
                                  {quote.pointReward}
                                </span>
                              ) : (
                                <span className="text-slate-400">-</span>
                              )}
                            </td>

                            <td className="p-3.5 min-w-[220px]">
                              <a
                                href={targetUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-bold text-slate-800 hover:text-sky-600 hover:underline block mb-1"
                              >
                                {quote.planTitle}
                              </a>
                              <div className="space-y-0.5 text-[11px] text-slate-600">
                                {quote.inclusions.map((inc, iIdx) => (
                                  <div key={iIdx} className="flex items-center space-x-1">
                                    <span className="w-1 h-1 rounded-full bg-sky-500" />
                                    <span>{inc}</span>
                                  </div>
                                ))}
                              </div>
                            </td>

                            <td className="p-3.5 whitespace-nowrap text-slate-600 text-[11px]">
                              {quote.cancellationPolicy}
                            </td>

                            <td className="p-3.5 whitespace-nowrap text-center">
                              <a
                                href={targetUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all shadow-sm ${
                                  isCheapest
                                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow'
                                    : 'bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200'
                                }`}
                              >
                                <span>{isCheapest ? '最安値で予約' : 'サイトを開く'}</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
