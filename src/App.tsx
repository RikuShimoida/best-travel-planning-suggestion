import React, { useState, useEffect, useMemo } from 'react';
import { SAMPLE_TRAVEL_PLANS } from './data/samplePlans';
import { TravelPlan, SearchFilters } from './types';
import { Header } from './components/Header';
import { HeroSearch } from './components/HeroSearch';
import { PlanCard } from './components/PlanCard';
import { PlanDetailModal } from './components/PlanDetailModal';
import { AIPlanGeneratorModal } from './components/AIPlanGeneratorModal';
import { AITravelAssistant } from './components/AITravelAssistant';
import { GmailTravelAnalyzer } from './components/GmailTravelAnalyzer';
import { Sparkles, Bookmark, Compass, Heart, MapPin, Search, PlusCircle, ArrowUpRight } from 'lucide-react';

export default function App() {
  // Travel Plans State
  const [plans, setPlans] = useState<TravelPlan[]>(() => {
    try {
      const saved = localStorage.getItem('tabiplan_created_plans');
      if (saved) {
        const customPlans = JSON.parse(saved);
        return [...customPlans, ...SAMPLE_TRAVEL_PLANS];
      }
    } catch (e) {
      console.error('Failed to parse stored plans', e);
    }
    return SAMPLE_TRAVEL_PLANS;
  });

  // Saved Bookmarks State
  const [savedPlanIds, setSavedPlanIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tabiplan_saved_ids');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved ids', e);
    }
    return ['plan-kyoto-classic'];
  });

  // Navigation Active Tab State
  const [activeTab, setActiveTab] = useState<'explore' | 'gmail' | 'ai-generator' | 'saved' | 'chat'>('gmail');


  // Search Filters State
  const [filters, setFilters] = useState<SearchFilters>({
    destination: '',
    duration: '',
    companion: '',
    budget: '',
    theme: '',
    sortBy: 'popular',
    keyword: '',
  });

  // Selected Plan Modal State
  const [selectedPlan, setSelectedPlan] = useState<TravelPlan | null>(null);

  // AI Generator Modal State
  const [showAIGeneratorModal, setShowAIGeneratorModal] = useState<boolean>(false);
  const [aiInitialQuery, setAiInitialQuery] = useState<string>('');

  // Save state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tabiplan_saved_ids', JSON.stringify(savedPlanIds));
    } catch (e) {
      console.error('Failed to save bookmarks', e);
    }
  }, [savedPlanIds]);

  const handleToggleSave = (planId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedPlanIds(prev =>
      prev.includes(planId) ? prev.filter(id => id !== planId) : [...prev, planId]
    );
  };

  const handleOpenAIGenerator = (query: string = '') => {
    setAiInitialQuery(query);
    setShowAIGeneratorModal(true);
  };

  const handlePlanGenerated = (newPlan: TravelPlan) => {
    setPlans(prev => [newPlan, ...prev]);
    setSelectedPlan(newPlan);

    try {
      const customPlans = plans.filter(p => p.isAIGenerated);
      localStorage.setItem('tabiplan_created_plans', JSON.stringify([newPlan, ...customPlans]));
    } catch (e) {
      console.error('Failed to persist custom plan', e);
    }
  };

  const handleUpdatePlan = (updatedPlan: TravelPlan) => {
    setPlans(prev => prev.map(p => p.id === updatedPlan.id ? updatedPlan : p));
    setSelectedPlan(updatedPlan);
  };

  // Filter & Sort Logic
  const filteredPlans = useMemo(() => {
    return plans.filter(plan => {
      // Keyword match
      if (filters.keyword.trim()) {
        const kw = filters.keyword.toLowerCase().trim();
        const textToSearch = `${plan.title} ${plan.subtitle} ${plan.destination} ${plan.highlights.join(' ')} ${plan.theme.join(' ')} ${plan.duration} ${plan.companion}`.toLowerCase();
        if (!textToSearch.includes(kw)) return false;
      }

      // Duration match
      if (filters.duration && plan.duration !== filters.duration) return false;

      // Companion match
      if (filters.companion && plan.companion !== filters.companion) return false;

      // Budget match
      if (filters.budget && plan.budgetRange !== filters.budget) return false;

      // Theme match
      if (filters.theme && !plan.theme.includes(filters.theme as any)) return false;

      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'rating': return b.rating - a.rating;
        case 'budget_low': return a.estimatedBudget.totalCost - b.estimatedBudget.totalCost;
        case 'budget_high': return b.estimatedBudget.totalCost - a.estimatedBudget.totalCost;
        case 'newest': return (b.createdAt || '').localeCompare(a.createdAt || '');
        case 'popular': default: return b.likesCount - a.likesCount;
      }
    });
  }, [plans, filters]);

  // Saved Plans filter
  const savedPlans = useMemo(() => {
    return plans.filter(p => savedPlanIds.includes(p.id));
  }, [plans, savedPlanIds]);

  return (
    <div id="app-root" className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedPlanIds.length}
        onOpenAIGenerator={() => handleOpenAIGenerator()}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* VIEW 1: EXPLORE & SEARCH */}
        {activeTab === 'explore' && (
          <div>
            {/* Search Hero Header */}
            <HeroSearch
              filters={filters}
              setFilters={setFilters}
              onOpenAIGeneratorWithQuery={(q) => handleOpenAIGenerator(q)}
              resultsCount={filteredPlans.length}
            />

            {/* Travel Plan Cards Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {filteredPlans.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm p-8 max-w-xl mx-auto">
                  <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 mx-auto mb-4">
                    <Search className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900">
                    条件に一致するプランが見つかりませんでした
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 mb-6">
                    キーワードを変更するか、AIにリクエストしてあなた専用のプランを作成してみましょう。
                  </p>
                  <button
                    onClick={() => handleOpenAIGenerator(filters.keyword || '旅行')}
                    className="bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md inline-flex items-center space-x-2"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>AIで『{filters.keyword || 'カスタム'}』プランを作成する</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPlans.map(plan => (
                    <PlanCard
                      key={plan.id}
                      plan={plan}
                      isSaved={savedPlanIds.includes(plan.id)}
                      onToggleSave={handleToggleSave}
                      onClick={setSelectedPlan}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 2: GMAIL TRAVEL DEAL ANALYZER */}
        {activeTab === 'gmail' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <GmailTravelAnalyzer
              onGenerateItinerary={(query) => handleOpenAIGenerator(query)}
            />
          </div>
        )}

        {/* VIEW 3: SAVED BOOKMARKS */}
        {activeTab === 'saved' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center">
                  <Bookmark className="w-7 h-7 mr-2 text-sky-600" />
                  保存した旅行プラン
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  ブックマークしたお気に入りプランです。いつでも時間割やルートマップを確認できます。
                </p>
              </div>

              <span className="bg-sky-100 text-sky-800 font-bold text-xs px-3 py-1 rounded-full border border-sky-200">
                全 {savedPlans.length} 件
              </span>
            </div>

            {savedPlans.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm p-8 max-w-md mx-auto">
                <Bookmark className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="font-bold text-base text-slate-800">まだ保存されたプランはありません</h3>
                <p className="text-xs text-slate-500 mt-1 mb-6">
                  気になるプランを見つけたら、右上のブックマークマークを押して保存できます。
                </p>
                <button
                  onClick={() => setActiveTab('explore')}
                  className="bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm"
                >
                  プランを探しに行く
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedPlans.map(plan => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    isSaved={true}
                    onToggleSave={handleToggleSave}
                    onClick={setSelectedPlan}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 3: AI TRAVEL CHAT ASSISTANT */}
        {activeTab === 'chat' && (
          <div className="max-w-4xl mx-auto px-4 py-8">
            <AITravelAssistant onSearchQuery={(q) => {
              setFilters(prev => ({ ...prev, keyword: q }));
              setActiveTab('explore');
            }} />
          </div>
        )}
      </main>

      {/* PLAN DETAIL MODAL */}
      {selectedPlan && (
        <PlanDetailModal
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
          isSaved={savedPlanIds.includes(selectedPlan.id)}
          onToggleSave={(id) => handleToggleSave(id)}
          onUpdatePlan={handleUpdatePlan}
        />
      )}

      {/* AI PLAN GENERATOR WIZARD MODAL */}
      {showAIGeneratorModal && (
        <AIPlanGeneratorModal
          initialQuery={aiInitialQuery}
          onClose={() => setShowAIGeneratorModal(false)}
          onPlanGenerated={handlePlanGenerated}
        />
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-10 px-4 sm:px-6 lg:px-8 border-t border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-sky-600 text-white flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
            <span className="text-white font-extrabold text-base">TabiPlan</span>
            <span className="text-slate-500 text-[11px]">｜ AI旅行プラン検索・作成プラットフォーム</span>
          </div>

          <div className="flex items-center space-x-4 text-slate-400 text-[11px]">
            <span>Powered by Gemini 3.6 Flash AI</span>
            <span>© 2026 TabiPlan All Rights Reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
