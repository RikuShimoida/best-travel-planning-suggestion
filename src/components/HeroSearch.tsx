import React, { useState } from 'react';
import { Search, Sparkles, Filter, X, MapPin, Calendar, Users, Wallet, Palette, ArrowUpDown, Wand2 } from 'lucide-react';
import { SearchFilters, TravelDuration, CompanionType, BudgetRange, TravelTheme } from '../types';

interface HeroSearchProps {
  filters: SearchFilters;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  onOpenAIGeneratorWithQuery?: (prompt: string) => void;
  resultsCount: number;
}

const DURATIONS: { label: string; value: string }[] = [
  { label: 'すべて', value: '' },
  { label: '日帰り', value: '日帰り' },
  { label: '1泊2日', value: '1泊2日' },
  { label: '2泊3日', value: '2泊3日' },
  { label: '3泊4日', value: '3泊4日' },
  { label: '4泊5日以上', value: '4泊5日以上' },
];

const COMPANIONS: { label: string; value: string }[] = [
  { label: 'すべて', value: '' },
  { label: '一人旅', value: '一人旅' },
  { label: 'カップル・夫婦', value: 'カップル・夫婦' },
  { label: '女子旅', value: '女子旅' },
  { label: '家族・子連れ', value: '家族・子連れ' },
  { label: '友人グループ', value: '友人グループ' },
];

const BUDGETS: { label: string; value: string }[] = [
  { label: 'すべて', value: '' },
  { label: '〜3万円', value: '〜3万円' },
  { label: '3万〜5万円', value: '3万〜5万円' },
  { label: '5万〜10万円', value: '5万〜10万円' },
  { label: '10万円〜', value: '10万円〜' },
];

const THEMES: TravelTheme[] = [
  'グルメ',
  '温泉・癒やし',
  '歴史・神社仏閣',
  '絶景・自然',
  'アート・カルチャー',
  '映え・フォトジェニック',
  'アクティブ・体験',
];

const QUICK_TAGS = [
  '京都 2泊3日 女子旅',
  '箱根 1泊2日 温泉',
  '北海道 3泊4日 ドライブ',
  '沖縄 映えビーチ',
  '金沢 1泊2日 アート',
  '東京 日帰り カフェ',
];

export const HeroSearch: React.FC<HeroSearchProps> = ({
  filters,
  setFilters,
  onOpenAIGeneratorWithQuery,
  resultsCount,
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, keyword: e.target.value }));
  };

  const handleQuickTagClick = (tag: string) => {
    setFilters(prev => ({ ...prev, keyword: tag }));
  };

  const handleClearFilters = () => {
    setFilters({
      destination: '',
      duration: '',
      companion: '',
      budget: '',
      theme: '',
      sortBy: 'popular',
      keyword: '',
    });
  };

  const activeFilterCount = [
    filters.destination,
    filters.duration,
    filters.companion,
    filters.budget,
    filters.theme,
    filters.keyword,
  ].filter(Boolean).length;

  return (
    <div id="hero-search-section" className="bg-[#F8F5F2] border-b border-[#2D2D2D] pt-10 pb-12 px-4 sm:px-6 lg:px-8 text-[#2D2D2D]">
      <div className="max-w-5xl mx-auto">
        {/* Editorial Eyebrow Tagline */}
        <div className="flex items-center justify-center space-x-2 mb-3">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#2D2D2D]/80 bg-[#EFECE6] px-3 py-1 border border-[#2D2D2D]/20">
            Curated Journeys & Custom AI Itineraries
          </span>
        </div>

        {/* Serif Hero Display Heading */}
        <div className="text-center">
          <h1 className="serif text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.02] tracking-tight text-[#2D2D2D]">
            Find your next <br className="hidden sm:inline" />
            <span className="italic">unwritten</span> chapter.
          </h1>
          <p className="mt-4 text-xs sm:text-sm text-[#2D2D2D]/70 max-w-xl mx-auto leading-relaxed font-sans">
            AIコンシェルジュがあなたの理想を学習し、洗練された時間割・ルート・概算費用を備えた完全カスタム旅程を構築します。
          </p>
        </div>

        {/* Editorial Search Box */}
        <div className="mt-8 bg-white border border-[#2D2D2D] p-4 sm:p-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-stretch gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#2D2D2D]/50">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={filters.keyword}
                onChange={handleKeywordChange}
                placeholder="行先やテーマを入力（例: 京都 2泊3日 カフェ、箱根 温泉）"
                className="w-full pl-10 pr-10 py-3 bg-[#F8F5F2]/50 border border-[#2D2D2D]/30 focus:border-[#2D2D2D] outline-none text-xs sm:text-sm text-[#2D2D2D] placeholder-[#2D2D2D]/40 font-medium transition-all"
              />
              {filters.keyword && (
                <button
                  onClick={() => setFilters(prev => ({ ...prev, keyword: '' }))}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#2D2D2D]/50 hover:text-[#2D2D2D]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`px-4 py-3 text-[10px] uppercase font-bold tracking-[0.2em] border transition-all flex items-center space-x-2 shrink-0 ${
                  showAdvancedFilters || activeFilterCount > 0
                    ? 'bg-[#2D2D2D] text-[#F8F5F2] border-[#2D2D2D]'
                    : 'bg-white text-[#2D2D2D] border-[#2D2D2D]/40 hover:border-[#2D2D2D]'
                }`}
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filter</span>
                {activeFilterCount > 0 && (
                  <span className="bg-[#F8F5F2] text-[#2D2D2D] text-[9px] px-1.5 py-0.2 font-bold ml-1">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {onOpenAIGeneratorWithQuery && (
                <button
                  type="button"
                  onClick={() => onOpenAIGeneratorWithQuery(filters.keyword || '京都 2泊3日')}
                  className="bg-[#2D2D2D] text-[#F8F5F2] hover:bg-black text-[10px] uppercase font-bold tracking-[0.2em] px-5 py-3 border border-[#2D2D2D] transition-all flex items-center space-x-2 shrink-0"
                >
                  <Wand2 className="w-3.5 h-3.5 text-amber-300" />
                  <span>Generate AI Plan</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Popular Search Tags */}
          <div className="mt-4 pt-3 border-t border-[#2D2D2D]/20 flex items-center space-x-2 overflow-x-auto no-scrollbar text-xs">
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#2D2D2D]/60 whitespace-nowrap flex items-center">
              <MapPin className="w-3 h-3 mr-1 text-[#2D2D2D]/50" />
              Suggested:
            </span>
            {QUICK_TAGS.map(tag => (
              <button
                key={tag}
                onClick={() => handleQuickTagClick(tag)}
                className="bg-[#F8F5F2] hover:bg-[#2D2D2D] hover:text-[#F8F5F2] text-[#2D2D2D] px-2.5 py-1 text-xs border border-[#2D2D2D]/30 transition-colors font-medium whitespace-nowrap"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Advanced Filter Panel */}
          {showAdvancedFilters && (
            <div className="mt-4 pt-4 border-t border-[#2D2D2D]/30 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-[#F8F5F2] p-4 border border-[#2D2D2D]/20">
              {/* Duration Filter */}
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-[0.15em] text-[#2D2D2D] mb-1 flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  Duration
                </label>
                <select
                  value={filters.duration}
                  onChange={e => setFilters(prev => ({ ...prev, duration: e.target.value }))}
                  className="w-full bg-white border border-[#2D2D2D]/40 text-xs px-2.5 py-2 text-[#2D2D2D] font-medium outline-none focus:border-[#2D2D2D]"
                >
                  {DURATIONS.map(d => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Companion Filter */}
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-[0.15em] text-[#2D2D2D] mb-1 flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  Companion
                </label>
                <select
                  value={filters.companion}
                  onChange={e => setFilters(prev => ({ ...prev, companion: e.target.value }))}
                  className="w-full bg-white border border-[#2D2D2D]/40 text-xs px-2.5 py-2 text-[#2D2D2D] font-medium outline-none focus:border-[#2D2D2D]"
                >
                  {COMPANIONS.map(c => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Budget Filter */}
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-[0.15em] text-[#2D2D2D] mb-1 flex items-center">
                  <Wallet className="w-3 h-3 mr-1" />
                  Budget
                </label>
                <select
                  value={filters.budget}
                  onChange={e => setFilters(prev => ({ ...prev, budget: e.target.value }))}
                  className="w-full bg-white border border-[#2D2D2D]/40 text-xs px-2.5 py-2 text-[#2D2D2D] font-medium outline-none focus:border-[#2D2D2D]"
                >
                  {BUDGETS.map(b => (
                    <option key={b.value} value={b.value}>
                      {b.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Theme Filter */}
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-[0.15em] text-[#2D2D2D] mb-1 flex items-center">
                  <Palette className="w-3 h-3 mr-1" />
                  Theme
                </label>
                <select
                  value={filters.theme}
                  onChange={e => setFilters(prev => ({ ...prev, theme: e.target.value }))}
                  className="w-full bg-white border border-[#2D2D2D]/40 text-xs px-2.5 py-2 text-[#2D2D2D] font-medium outline-none focus:border-[#2D2D2D]"
                >
                  <option value="">すべて</option>
                  {THEMES.map(t => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort & Reset Actions */}
              <div className="sm:col-span-2 lg:col-span-4 flex items-center justify-between pt-2 border-t border-[#2D2D2D]/20">
                <div className="flex items-center space-x-2 text-xs">
                  <ArrowUpDown className="w-3.5 h-3.5 text-[#2D2D2D]/60" />
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#2D2D2D]/70">Sort By:</span>
                  <select
                    value={filters.sortBy}
                    onChange={e => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                    className="bg-white border border-[#2D2D2D]/40 text-xs px-2 py-1 text-[#2D2D2D] font-semibold outline-none"
                  >
                    <option value="popular">人気順</option>
                    <option value="rating">高評価順</option>
                    <option value="budget_low">予算が安い順</option>
                    <option value="budget_high">予算が高い順</option>
                    <option value="newest">新着順</option>
                  </select>
                </div>

                {activeFilterCount > 0 && (
                  <button
                    onClick={handleClearFilters}
                    className="text-[10px] uppercase tracking-widest font-bold text-rose-700 hover:underline flex items-center"
                  >
                    <X className="w-3 h-3 mr-0.5" />
                    Reset
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Results Counter Bar */}
        <div className="mt-4 flex items-center justify-between text-xs text-[#2D2D2D]/70 font-medium">
          <span className="text-[11px] uppercase tracking-widest font-bold">
            Catalog Index: <strong className="serif text-base italic font-bold text-[#2D2D2D] ml-1">{resultsCount}</strong> Items
          </span>
          {activeFilterCount > 0 && (
            <span className="text-[10px] uppercase tracking-widest font-bold bg-[#2D2D2D] text-[#F8F5F2] px-2.5 py-0.5">
              Filters Active ({activeFilterCount})
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
