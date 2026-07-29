import React from 'react';
import { Bookmark, Star, MapPin, Calendar, Wallet, Users, Sparkles, Clock, ChevronRight } from 'lucide-react';
import { TravelPlan } from '../types';

interface PlanCardProps {
  plan: TravelPlan;
  isSaved: boolean;
  onToggleSave: (planId: string, e: React.MouseEvent) => void;
  onClick: (plan: TravelPlan) => void;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  isSaved,
  onToggleSave,
  onClick,
}) => {
  return (
    <div
      id={`plan-card-${plan.id}`}
      onClick={() => onClick(plan)}
      className="group bg-white border border-[#2D2D2D] transition-all duration-300 flex flex-col overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-0.5"
    >
      {/* Editorial Thumbnail Frame */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E5E1D8] border-b border-[#2D2D2D]">
        <img
          src={plan.coverImage}
          alt={plan.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.02]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D2D2D]/80 via-[#2D2D2D]/20 to-transparent" />

        {/* Top Badges - Editorial Caps */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <div className="flex items-center space-x-1.5">
            <span className="bg-[#2D2D2D] text-[#F8F5F2] font-bold text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 border border-[#F8F5F2]/20 shadow-xs flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              {plan.destination}
            </span>
            <span className="bg-[#F8F5F2] text-[#2D2D2D] font-bold text-[10px] uppercase tracking-widest px-2.5 py-1 border border-[#2D2D2D]">
              {plan.duration}
            </span>
          </div>

          <button
            onClick={(e) => onToggleSave(plan.id, e)}
            className={`p-2 transition-all border ${
              isSaved
                ? 'bg-rose-600 border-rose-600 text-white'
                : 'bg-[#2D2D2D]/70 border-white/40 text-white hover:bg-[#2D2D2D]'
            }`}
            title={isSaved ? '保存を解除' : 'プランを保存'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* AI Tag / Rating on Bottom Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[#F8F5F2] z-10">
          <div className="flex items-center space-x-2">
            <span className="bg-[#2D2D2D]/80 text-[#F8F5F2] text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 border border-[#F8F5F2]/30 flex items-center">
              <Users className="w-3 h-3 mr-1" />
              {plan.companion}
            </span>
            {plan.isAIGenerated && (
              <span className="bg-amber-300 text-[#2D2D2D] font-bold text-[10px] uppercase tracking-widest px-2 py-0.5 border border-[#2D2D2D] flex items-center">
                <Sparkles className="w-3 h-3 mr-1" />
                AI Custom
              </span>
            )}
          </div>

          <div className="flex items-center space-x-1 bg-[#2D2D2D] text-[#F8F5F2] font-bold text-[10px] px-2 py-0.5 border border-[#F8F5F2]/30">
            <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
            <span>{plan.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Themes Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {plan.theme.slice(0, 3).map((t) => (
              <span
                key={t}
                className="bg-[#F8F5F2] text-[#2D2D2D] text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 border border-[#2D2D2D]/20"
              >
                #{t}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="serif text-xl sm:text-2xl font-normal italic text-[#2D2D2D] line-clamp-2 leading-tight group-hover:underline decoration-1 underline-offset-4">
            {plan.title}
          </h3>

          {/* Subtitle */}
          <p className="mt-2 text-xs text-[#2D2D2D]/70 line-clamp-2 leading-relaxed font-sans">
            {plan.subtitle}
          </p>

          {/* Highlights */}
          <ul className="mt-3 space-y-1 border-t border-[#2D2D2D]/15 pt-3 text-xs text-[#2D2D2D]/80">
            {plan.highlights.slice(0, 2).map((h, i) => (
              <li key={i} className="flex items-start">
                <span className="text-xs mr-1.5 text-[#2D2D2D] font-serif">—</span>
                <span className="line-clamp-1">{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Budget & Action CTA */}
        <div className="mt-5 pt-3 border-t border-[#2D2D2D] flex items-end justify-between">
          <div>
            <div className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#2D2D2D]/60">Estimated Cost</div>
            <div className="serif text-xl italic font-bold text-[#2D2D2D]">
              ¥{plan.estimatedBudget.totalCost.toLocaleString()}
              <span className="text-xs font-sans not-italic text-[#2D2D2D]/60 ml-0.5">/ person</span>
            </div>
          </div>

          <div className="flex items-center text-[10px] uppercase tracking-[0.2em] font-bold text-[#2D2D2D] group-hover:translate-x-1 transition-transform">
            <span>View Plan</span>
            <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
