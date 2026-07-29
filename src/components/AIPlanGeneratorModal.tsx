import React, { useState } from 'react';
import { TravelPlan, AIPlanRequest, TravelDuration, CompanionType, BudgetRange, TravelTheme } from '../types';
import { X, Sparkles, MapPin, Calendar, Users, Wallet, Palette, Compass, ArrowRight, ArrowLeft, Check, AlertCircle } from 'lucide-react';

interface AIPlanGeneratorModalProps {
  onClose: () => void;
  onPlanGenerated: (plan: TravelPlan) => void;
  initialQuery?: string;
}

const DESTINATION_SUGGESTIONS = [
  '京都', '北海道', '箱根', '沖縄', '金沢', '福岡', '軽井沢', '大阪', '伊豆', '草津温泉', '広島', '東京'
];

const THEME_OPTIONS: TravelTheme[] = [
  'グルメ',
  '温泉・癒やし',
  '歴史・神社仏閣',
  '絶景・自然',
  'アート・カルチャー',
  '映え・フォトジェニック',
  'アクティブ・体験',
];

const LOADING_TIPS = [
  '💡 伏見稲荷大社は早朝参拝（7〜8時）が鳥居を静かに撮影できる絶好のタイミングです。',
  '💡 北海道ドライブでは野生のキツネや鹿の飛び出しに注意！ゆとりのある行程が快適です。',
  '💡 箱根フリーパスを活用すると、ロープウェイや海賊船、バス乗り放題でお得になります。',
  '💡 金沢の21世紀美術館「スイミング・プール」地下部は事前WEB予約がおすすめです。',
  '💡 沖縄の古宇利大橋は午前中の潮が引いて日が差し込む時間帯が最も青く映えます。'
];

export const AIPlanGeneratorModal: React.FC<AIPlanGeneratorModalProps> = ({
  onClose,
  onPlanGenerated,
  initialQuery = '',
}) => {
  const [step, setStep] = useState<number>(1);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loadingTipIndex, setLoadingTipIndex] = useState<number>(0);

  // Form State
  const [destination, setDestination] = useState<string>(initialQuery || '京都');
  const [origin, setOrigin] = useState<string>('東京');
  const [durationLabel, setDurationLabel] = useState<TravelDuration>('2泊3日');
  const [companion, setCompanion] = useState<CompanionType>('女子旅');
  const [budgetLabel, setBudgetLabel] = useState<BudgetRange>('5万〜10万円');
  const [selectedThemes, setSelectedThemes] = useState<TravelTheme[]>(['グルメ', '歴史・神社仏閣', '映え・フォトジェニック']);
  const [mustVisitSpots, setMustVisitSpots] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [preferredPace, setPreferredPace] = useState<'のんびり' | '標準' | '充実・効率重視'>('標準');

  const handleToggleTheme = (theme: TravelTheme) => {
    if (selectedThemes.includes(theme)) {
      setSelectedThemes(selectedThemes.filter(t => t !== theme));
    } else {
      setSelectedThemes([...selectedThemes, theme]);
    }
  };

  const getDaysCountFromLabel = (label: TravelDuration): number => {
    switch (label) {
      case '日帰り': return 1;
      case '1泊2日': return 2;
      case '2泊3日': return 3;
      case '3泊4日': return 4;
      case '4泊5日以上': return 5;
      default: return 2;
    }
  };

  const handleGenerateSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!destination.trim()) {
      setErrorMsg('目的地を入力してください。');
      return;
    }

    setIsGenerating(true);
    setErrorMsg(null);

    // Tip rotation timer
    const interval = setInterval(() => {
      setLoadingTipIndex(prev => (prev + 1) % LOADING_TIPS.length);
    }, 2500);

    const payload: AIPlanRequest = {
      destination,
      origin,
      daysCount: getDaysCountFromLabel(durationLabel),
      durationLabel,
      companion,
      budgetLabel,
      themes: selectedThemes,
      mustVisitSpots,
      specialRequests,
      preferredPace,
    };

    try {
      const res = await fetch('/api/generate-travel-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      clearInterval(interval);

      if (!res.ok || !data.success || !data.plan) {
        throw new Error(data.error || 'プラン生成に失敗しました。');
      }

      onPlanGenerated(data.plan);
      onClose();
    } catch (err: any) {
      console.error('API Error:', err);
      clearInterval(interval);
      setErrorMsg(err.message || 'AI接続中にエラーが発生しました。時間を置いて再度お試しください。');
      setIsGenerating(false);
    }
  };

  return (
    <div id="ai-generator-modal-backdrop" className="fixed inset-0 z-50 bg-[#2D2D2D]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="bg-[#F8F5F2] w-full max-w-2xl border border-[#2D2D2D] shadow-2xl overflow-hidden flex flex-col text-[#2D2D2D]">
        {/* Modal Header */}
        <div className="bg-[#2D2D2D] p-6 text-[#F8F5F2] flex items-center justify-between border-b border-[#2D2D2D]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 border border-[#F8F5F2]/30 flex items-center justify-center bg-[#2D2D2D]">
              <Sparkles className="w-5 h-5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#F8F5F2]/70 font-bold block">
                Custom Itinerary Concierge
              </span>
              <h2 className="serif text-xl sm:text-2xl font-normal italic text-[#F8F5F2]">
                AI Travel Planner
              </h2>
            </div>
          </div>

          {!isGenerating && (
            <button
              onClick={onClose}
              className="p-2 border border-[#F8F5F2]/30 text-[#F8F5F2] hover:bg-[#F8F5F2] hover:text-[#2D2D2D] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Progress Indicator */}
        {!isGenerating && (
          <div className="bg-[#EFECE6] border-b border-[#2D2D2D] px-6 py-3 flex items-center justify-between text-[11px] uppercase tracking-widest font-bold text-[#2D2D2D]/60">
            <div className={`flex items-center space-x-2 ${step === 1 ? 'text-[#2D2D2D]' : ''}`}>
              <span className={`w-5 h-5 border border-[#2D2D2D] flex items-center justify-center text-[10px] ${
                step === 1 ? 'bg-[#2D2D2D] text-[#F8F5F2]' : 'bg-white text-[#2D2D2D]'
              }`}>1</span>
              <span>Destination</span>
            </div>
            <div className="w-8 h-px bg-[#2D2D2D]/30" />

            <div className={`flex items-center space-x-2 ${step === 2 ? 'text-[#2D2D2D]' : ''}`}>
              <span className={`w-5 h-5 border border-[#2D2D2D] flex items-center justify-center text-[10px] ${
                step === 2 ? 'bg-[#2D2D2D] text-[#F8F5F2]' : 'bg-white text-[#2D2D2D]'
              }`}>2</span>
              <span>Preferences</span>
            </div>
            <div className="w-8 h-px bg-[#2D2D2D]/30" />

            <div className={`flex items-center space-x-2 ${step === 3 ? 'text-[#2D2D2D]' : ''}`}>
              <span className={`w-5 h-5 border border-[#2D2D2D] flex items-center justify-center text-[10px] ${
                step === 3 ? 'bg-[#2D2D2D] text-[#F8F5F2]' : 'bg-white text-[#2D2D2D]'
              }`}>3</span>
              <span>Details</span>
            </div>
          </div>
        )}

        {/* Modal Form Body */}
        <div className="p-6 sm:p-8 flex-1 min-h-[360px] bg-[#F8F5F2]">
          {errorMsg && (
            <div className="mb-4 bg-rose-50 border border-rose-300 text-rose-900 p-3 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-700 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* LOADING STATE */}
          {isGenerating ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 border border-[#2D2D2D] animate-ping opacity-25" />
                <div className="absolute inset-0 border-2 border-[#2D2D2D] border-t-transparent animate-spin" />
                <Compass className="w-8 h-8 text-[#2D2D2D] absolute inset-0 m-auto" />
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#2D2D2D]/60 font-bold block">
                  Curating Travel Journal
                </span>
                <h3 className="serif text-2xl font-normal italic text-[#2D2D2D] mt-1">
                  Drafting itinerary for 『{destination}』...
                </h3>
                <p className="text-xs text-[#2D2D2D]/70 mt-1 font-sans">
                  ルートの最適化、現地時間の割り振り、概算費用の計算を行っています
                </p>
              </div>

              {/* Rotating Tip Box */}
              <div className="bg-[#EFECE6] border border-[#2D2D2D] p-5 max-w-md text-xs text-[#2D2D2D] animate-fadeIn">
                <div className="font-bold text-[10px] uppercase tracking-widest text-[#2D2D2D] mb-1 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 mr-1 text-[#2D2D2D]" />
                  Editorial Tip
                </div>
                <p className="font-sans text-[#2D2D2D]/90">{LOADING_TIPS[loadingTipIndex]}</p>
              </div>
            </div>
          ) : (
            <>
              {/* STEP 1: Destination & Duration */}
              {step === 1 && (
                <div className="space-y-5 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#2D2D2D] mb-1.5 flex items-center">
                      <MapPin className="w-4 h-4 mr-1 text-[#2D2D2D]" />
                      行きたい場所（目的地） *
                    </label>
                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="例：京都、北海道、箱根、沖縄、金沢"
                      className="w-full border border-[#2D2D2D] bg-white p-3 text-sm text-[#2D2D2D] outline-none font-medium"
                    />

                    {/* Quick Suggestions */}
                    <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#2D2D2D]/50">Popular:</span>
                      {DESTINATION_SUGGESTIONS.map(s => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setDestination(s)}
                          className="bg-white hover:bg-[#2D2D2D] hover:text-[#F8F5F2] text-[#2D2D2D] border border-[#2D2D2D]/30 px-2.5 py-1 text-[11px] transition-colors font-medium"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[#2D2D2D] mb-1.5 flex items-center">
                        <Calendar className="w-4 h-4 mr-1 text-[#2D2D2D]" />
                        旅行期間
                      </label>
                      <select
                        value={durationLabel}
                        onChange={(e) => setDurationLabel(e.target.value as TravelDuration)}
                        className="w-full border border-[#2D2D2D] bg-white p-3 text-sm text-[#2D2D2D] outline-none font-medium"
                      >
                        <option value="日帰り">日帰り (1日)</option>
                        <option value="1泊2日">1泊2日</option>
                        <option value="2泊3日">2泊3日</option>
                        <option value="3泊4日">3泊4日</option>
                        <option value="4泊5日以上">4泊5日以上</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[#2D2D2D] mb-1.5 flex items-center">
                        <Compass className="w-4 h-4 mr-1 text-[#2D2D2D]" />
                        出発地 / 拠点
                      </label>
                      <input
                        type="text"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        placeholder="例：東京、大阪、名古屋"
                        className="w-full border border-[#2D2D2D] bg-white p-3 text-sm text-[#2D2D2D] outline-none font-medium"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Companion, Budget & Themes */}
              {step === 2 && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[#2D2D2D] mb-1.5 flex items-center">
                        <Users className="w-4 h-4 mr-1 text-[#2D2D2D]" />
                        同行者
                      </label>
                      <select
                        value={companion}
                        onChange={(e) => setCompanion(e.target.value as CompanionType)}
                        className="w-full border border-[#2D2D2D] bg-white p-3 text-sm text-[#2D2D2D] outline-none font-medium"
                      >
                        <option value="女子旅">女子旅</option>
                        <option value="カップル・夫婦">カップル・夫婦</option>
                        <option value="一人旅">一人旅</option>
                        <option value="家族・子連れ">家族・子連れ</option>
                        <option value="友人グループ">友人グループ</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[#2D2D2D] mb-1.5 flex items-center">
                        <Wallet className="w-4 h-4 mr-1 text-[#2D2D2D]" />
                        予算感（1人あたり）
                      </label>
                      <select
                        value={budgetLabel}
                        onChange={(e) => setBudgetLabel(e.target.value as BudgetRange)}
                        className="w-full border border-[#2D2D2D] bg-white p-3 text-sm text-[#2D2D2D] outline-none font-medium"
                      >
                        <option value="〜3万円">〜3万円（コスパ重視）</option>
                        <option value="3万〜5万円">3万〜5万円（標準的）</option>
                        <option value="5万〜10万円">5万〜10万円（こだわり）</option>
                        <option value="10万円〜">10万円〜（高級リゾート・贅沢）</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#2D2D2D] mb-2 flex items-center">
                      <Palette className="w-4 h-4 mr-1 text-[#2D2D2D]" />
                      旅のテーマ（複数選択可）
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {THEME_OPTIONS.map((theme) => {
                        const isSelected = selectedThemes.includes(theme);
                        return (
                          <button
                            key={theme}
                            type="button"
                            onClick={() => handleToggleTheme(theme)}
                            className={`px-3.5 py-2 text-xs font-bold tracking-wider border transition-all flex items-center space-x-1.5 ${
                              isSelected
                                ? 'bg-[#2D2D2D] text-[#F8F5F2] border-[#2D2D2D]'
                                : 'bg-white text-[#2D2D2D] border-[#2D2D2D]/30 hover:border-[#2D2D2D]'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                            <span>#{theme}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Must-Visit & Special Requests */}
              {step === 3 && (
                <div className="space-y-5 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#2D2D2D] mb-1.5">
                      絶対に行きたい場所・食べたい料理 (任意)
                    </label>
                    <input
                      type="text"
                      value={mustVisitSpots}
                      onChange={(e) => setMustVisitSpots(e.target.value)}
                      placeholder="例：嵐山の竹林、抹茶ティラミス、のどぐろ寿司"
                      className="w-full border border-[#2D2D2D] bg-white p-3 text-sm text-[#2D2D2D] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#2D2D2D] mb-1.5">
                      移動ペース
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['のんびり', '標準', '充実・効率重視'] as const).map(p => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setPreferredPace(p)}
                          className={`p-3 border text-xs font-bold uppercase tracking-wider transition-all ${
                            preferredPace === p
                              ? 'bg-[#2D2D2D] text-[#F8F5F2] border-[#2D2D2D]'
                              : 'bg-white text-[#2D2D2D] border-[#2D2D2D]/30 hover:border-[#2D2D2D]'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#2D2D2D] mb-1.5">
                      その他こだわり・ご要望 (任意)
                    </label>
                    <textarea
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="例：レンタカーなしで公共交通機関のみ、映え写真を撮りやすいルート、雨でも楽しめる場所を入れてほしい"
                      rows={3}
                      className="w-full border border-[#2D2D2D] bg-white p-3 text-sm text-[#2D2D2D] outline-none"
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Wizard Navigation Footer */}
        {!isGenerating && (
          <div className="bg-[#EFECE6] border-t border-[#2D2D2D] p-4 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-5 py-2.5 bg-white border border-[#2D2D2D] font-bold text-[#2D2D2D] text-xs uppercase tracking-wider hover:bg-[#2D2D2D] hover:text-[#F8F5F2] transition-colors flex items-center space-x-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : <div />}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="bg-[#2D2D2D] hover:bg-black text-[#F8F5F2] font-bold text-xs uppercase tracking-widest px-6 py-2.5 border border-[#2D2D2D] flex items-center space-x-1.5"
              >
                <span>Next Step</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleGenerateSubmit()}
                className="bg-[#2D2D2D] hover:bg-black text-[#F8F5F2] font-bold text-xs uppercase tracking-widest px-6 py-2.5 border border-[#2D2D2D] flex items-center space-x-2 active:scale-95 transition-transform"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Create Journal Plan</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
