import React from 'react';
import { Compass, Sparkles, Bookmark, MessageSquareText, Search, PlusCircle, Mail } from 'lucide-react';

interface HeaderProps {
  activeTab: 'explore' | 'gmail' | 'ai-generator' | 'saved' | 'chat';
  setActiveTab: (tab: 'explore' | 'gmail' | 'ai-generator' | 'saved' | 'chat') => void;
  savedCount: number;
  onOpenAIGenerator: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  onOpenAIGenerator,
}) => {
  return (
    <header id="main-header" className="sticky top-0 z-40 bg-[#F8F5F2]/95 backdrop-blur-md border-b border-[#2D2D2D] text-[#2D2D2D] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Editorial Volume Tag */}
        <div 
          className="flex flex-col cursor-pointer group"
          onClick={() => setActiveTab('explore')}
        >
          <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#2D2D2D]/70">
            Volume 01 — Journey
          </span>
          <div className="flex items-center space-x-2 mt-0.5">
            <h1 className="serif text-2xl sm:text-3xl italic font-normal tracking-tight text-[#2D2D2D]">
              TabiPlan
            </h1>
            <span className="text-[10px] uppercase tracking-widest bg-[#2D2D2D] text-[#F8F5F2] px-2 py-0.5 font-bold">
              AI Journal
            </span>
          </div>
        </div>

        {/* Navigation Tabs - Editorial Uppercase */}
        <nav className="hidden md:flex items-center space-x-6 text-[11px] font-bold tracking-wider">
          <button
            id="nav-explore-btn"
            onClick={() => setActiveTab('explore')}
            className={`transition-all py-1 border-b-2 flex items-center space-x-1.5 ${
              activeTab === 'explore'
                ? 'border-[#2D2D2D] text-[#2D2D2D]'
                : 'border-transparent text-[#2D2D2D]/60 hover:text-[#2D2D2D]'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>プランを探す</span>
          </button>

          <button
            id="nav-gmail-btn"
            onClick={() => setActiveTab('gmail')}
            className={`transition-all py-1 border-b-2 flex items-center space-x-1.5 relative ${
              activeTab === 'gmail'
                ? 'border-sky-600 text-sky-700 font-extrabold'
                : 'border-transparent text-[#2D2D2D]/60 hover:text-[#2D2D2D]'
            }`}
          >
            <Mail className="w-3.5 h-3.5 text-sky-600" />
            <span>Gmail最安値解析</span>
            <span className="bg-sky-600 text-white text-[9px] px-1.5 py-0.2 rounded-full font-bold">New</span>
          </button>

          <button
            id="nav-ai-gen-btn"
            onClick={onOpenAIGenerator}
            className={`transition-all py-1 border-b-2 flex items-center space-x-1.5 ${
              activeTab === 'ai-generator'
                ? 'border-[#2D2D2D] text-[#2D2D2D]'
                : 'border-transparent text-[#2D2D2D]/60 hover:text-[#2D2D2D]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>AIコンシェルジュ</span>
          </button>

          <button
            id="nav-saved-btn"
            onClick={() => setActiveTab('saved')}
            className={`transition-all py-1 border-b-2 flex items-center space-x-1.5 relative ${
              activeTab === 'saved'
                ? 'border-[#2D2D2D] text-[#2D2D2D]'
                : 'border-transparent text-[#2D2D2D]/60 hover:text-[#2D2D2D]'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>保存済み ({savedCount})</span>
          </button>

          <button
            id="nav-chat-btn"
            onClick={() => setActiveTab('chat')}
            className={`transition-all py-1 border-b-2 flex items-center space-x-1.5 ${
              activeTab === 'chat'
                ? 'border-[#2D2D2D] text-[#2D2D2D]'
                : 'border-transparent text-[#2D2D2D]/60 hover:text-[#2D2D2D]'
            }`}
          >
            <MessageSquareText className="w-3.5 h-3.5" />
            <span>AI相談室</span>
          </button>
        </nav>

        {/* Primary CTA Action Button */}
        <div className="flex items-center space-x-3">
          <button
            id="header-ai-create-cta"
            onClick={onOpenAIGenerator}
            className="bg-[#2D2D2D] text-[#F8F5F2] hover:bg-black text-[11px] font-bold tracking-wider px-5 py-2.5 transition-all shadow-sm flex items-center space-x-2 border border-[#2D2D2D]"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">AIで旅行プランを作成</span>
            <span className="sm:hidden">AI作成</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Bottom Bar */}
      <div className="md:hidden flex items-center justify-around bg-[#F8F5F2] border-t border-[#2D2D2D] px-2 py-2 text-[10px] font-bold text-[#2D2D2D]">
        <button
          onClick={() => setActiveTab('explore')}
          className={`flex flex-col items-center p-1 ${
            activeTab === 'explore' ? 'text-[#2D2D2D] font-extrabold' : 'opacity-60'
          }`}
        >
          <Search className="w-4 h-4 mb-0.5" />
          <span>探す</span>
        </button>

        <button
          onClick={() => setActiveTab('gmail')}
          className={`flex flex-col items-center p-1 ${
            activeTab === 'gmail' ? 'text-sky-700 font-extrabold' : 'opacity-60'
          }`}
        >
          <Mail className="w-4 h-4 mb-0.5 text-sky-600" />
          <span>最安比較</span>
        </button>

        <button
          onClick={onOpenAIGenerator}
          className="flex flex-col items-center p-1 text-[#2D2D2D] font-extrabold"
        >
          <PlusCircle className="w-4 h-4 mb-0.5 text-amber-700" />
          <span>AI作成</span>
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`flex flex-col items-center p-1 relative ${
            activeTab === 'saved' ? 'text-[#2D2D2D] font-extrabold' : 'opacity-60'
          }`}
        >
          <Bookmark className="w-4 h-4 mb-0.5" />
          <span>保存 ({savedCount})</span>
        </button>

        <button
          onClick={() => setActiveTab('chat')}
          className={`flex flex-col items-center p-1 ${
            activeTab === 'chat' ? 'text-[#2D2D2D] font-extrabold' : 'opacity-60'
          }`}
        >
          <MessageSquareText className="w-4 h-4 mb-0.5" />
          <span>相談</span>
        </button>
      </div>
    </header>
  );
};

