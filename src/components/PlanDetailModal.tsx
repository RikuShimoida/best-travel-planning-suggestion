import React, { useState } from 'react';
import { TravelPlan, TravelSpot, DayItinerary } from '../types';
import { InteractiveMap } from './InteractiveMap';
import { 
  X, MapPin, Calendar, Clock, Wallet, Users, Star, Bookmark, Share2, 
  Printer, Plus, Trash2, ArrowUp, ArrowDown, Sparkles, CheckSquare, 
  Info, Edit3, Navigation, Footprints, Bus, Train, Car, ChevronRight,
  Download, Copy, Check
} from 'lucide-react';

interface PlanDetailModalProps {
  plan: TravelPlan;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (planId: string) => void;
  onUpdatePlan?: (updatedPlan: TravelPlan) => void;
  onRefineWithAI?: (refinePrompt: string) => void;
}

export const PlanDetailModal: React.FC<PlanDetailModalProps> = ({
  plan: initialPlan,
  onClose,
  isSaved,
  onToggleSave,
  onUpdatePlan,
  onRefineWithAI,
}) => {
  const [currentPlan, setCurrentPlan] = useState<TravelPlan>(initialPlan);
  const [activeTab, setActiveTab] = useState<'timeline' | 'map' | 'budget' | 'packing'>('timeline');
  const [activeDayNumber, setActiveDayNumber] = useState<number>(1);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [aiRefineInput, setAiRefineInput] = useState<string>('');
  const [isRefining, setIsRefining] = useState<boolean>(false);

  // New Spot Form State
  const [showAddSpotModal, setShowAddSpotModal] = useState<boolean>(false);
  const [newSpotData, setNewSpotData] = useState<Partial<TravelSpot>>({
    name: '',
    category: '観光',
    timeSlot: '14:00 - 15:30',
    durationMinutes: 90,
    locationName: '',
    description: '',
    cost: 1000,
  });

  // Checked packing items
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const activeDay = currentPlan.days.find(d => d.dayNumber === activeDayNumber) || currentPlan.days[0];

  const handleToggleCheckItem = (item: string) => {
    setCheckedItems(prev => ({ ...prev, [item]: !prev[item] }));
  };

  // Spot Edit Actions
  const handleDeleteSpot = (spotId: string) => {
    const updatedDays = currentPlan.days.map(day => {
      if (day.dayNumber === activeDayNumber) {
        return {
          ...day,
          spots: day.spots.filter(s => s.id !== spotId),
        };
      }
      return day;
    });

    const updated = { ...currentPlan, days: updatedDays };
    setCurrentPlan(updated);
    if (onUpdatePlan) onUpdatePlan(updated);
  };

  const handleMoveSpot = (index: number, direction: 'up' | 'down') => {
    const daySpots = [...activeDay.spots];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= daySpots.length) return;

    const temp = daySpots[index];
    daySpots[index] = daySpots[targetIndex];
    daySpots[targetIndex] = temp;

    const updatedDays = currentPlan.days.map(day => {
      if (day.dayNumber === activeDayNumber) {
        return { ...day, spots: daySpots };
      }
      return day;
    });

    const updated = { ...currentPlan, days: updatedDays };
    setCurrentPlan(updated);
    if (onUpdatePlan) onUpdatePlan(updated);
  };

  const handleAddSpotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSpotData.name) return;

    const newSpot: TravelSpot = {
      id: `custom-spot-${Date.now()}`,
      name: newSpotData.name || '新しいスポット',
      category: newSpotData.category || '観光',
      timeSlot: newSpotData.timeSlot || '15:00 - 16:00',
      durationMinutes: newSpotData.durationMinutes || 60,
      locationName: newSpotData.locationName || newSpotData.name || '',
      description: newSpotData.description || '',
      cost: Number(newSpotData.cost) || 0,
      tips: newSpotData.tips,
      imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    };

    const updatedDays = currentPlan.days.map(day => {
      if (day.dayNumber === activeDayNumber) {
        return {
          ...day,
          spots: [...day.spots, newSpot],
        };
      }
      return day;
    });

    const updated = { ...currentPlan, days: updatedDays };
    setCurrentPlan(updated);
    if (onUpdatePlan) onUpdatePlan(updated);

    setShowAddSpotModal(false);
    setNewSpotData({
      name: '',
      category: '観光',
      timeSlot: '14:00 - 15:30',
      durationMinutes: 90,
      locationName: '',
      description: '',
      cost: 1000,
    });
  };

  const handleCopyPlanText = () => {
    let text = `【旅程】${currentPlan.title}\n`;
    text += `目的地: ${currentPlan.destination} (${currentPlan.duration})\n`;
    text += `概算予算: ¥${currentPlan.estimatedBudget.totalCost.toLocaleString()}\n\n`;

    currentPlan.days.forEach(day => {
      text += `■ Day ${day.dayNumber}: ${day.title}\n`;
      day.spots.forEach(spot => {
        text += `・${spot.timeSlot} ${spot.name} (${spot.category}) - ${spot.locationName}\n`;
      });
      text += `\n`;
    });

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAiRefineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiRefineInput || isRefining) return;
    setIsRefining(true);

    try {
      if (onRefineWithAI) {
        await onRefineWithAI(aiRefineInput);
      }
      setAiRefineInput('');
    } catch (err) {
      console.error('Refining failed:', err);
    } finally {
      setIsRefining(false);
    }
  };

  return (
    <div id="plan-detail-modal-backdrop" className="fixed inset-0 z-50 overflow-y-auto bg-[#2D2D2D]/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-fadeIn">
      <div className="bg-[#F8F5F2] w-full max-w-5xl border border-[#2D2D2D] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-[#2D2D2D]">
        {/* Header Hero Banner - Dark Editorial Spread */}
        <div className="relative bg-[#2D2D2D] text-[#F8F5F2] min-h-[220px] sm:min-h-[280px] flex flex-col justify-between p-6 sm:p-8 border-b border-[#2D2D2D]">
          <img
            src={currentPlan.coverImage}
            alt={currentPlan.title}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-35 filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2D2D2D] via-[#2D2D2D]/60 to-transparent" />

          {/* Top Control Bar */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="bg-[#F8F5F2] text-[#2D2D2D] font-bold text-[10px] uppercase tracking-[0.2em] px-3 py-1 border border-[#2D2D2D] flex items-center">
                <MapPin className="w-3.5 h-3.5 mr-1" />
                {currentPlan.destination}
              </span>
              <span className="bg-[#2D2D2D] text-[#F8F5F2] font-bold text-[10px] uppercase tracking-widest px-3 py-1 border border-[#F8F5F2]/40">
                {currentPlan.duration}
              </span>
              <span className="bg-[#2D2D2D] text-[#F8F5F2] font-bold text-[10px] uppercase tracking-widest px-3 py-1 border border-[#F8F5F2]/40 hidden sm:inline">
                {currentPlan.companion}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => onToggleSave(currentPlan.id)}
                className={`p-2.5 transition-all border ${
                  isSaved ? 'bg-rose-600 border-rose-600 text-white' : 'bg-[#2D2D2D]/80 border-[#F8F5F2]/30 text-[#F8F5F2] hover:bg-[#2D2D2D]'
                }`}
                title="プランを保存"
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={handleCopyPlanText}
                className="p-2.5 bg-[#2D2D2D]/80 hover:bg-[#2D2D2D] text-[#F8F5F2] border border-[#F8F5F2]/30 transition-all"
                title="テキストでコピー・共有"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>

              <button
                onClick={onClose}
                className="p-2.5 bg-[#2D2D2D]/80 hover:bg-rose-600 text-[#F8F5F2] border border-[#F8F5F2]/30 transition-all"
                title="閉じる"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Title & Stats */}
          <div className="relative z-10 mt-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#F8F5F2]/70 font-bold block mb-1">
              Journal Entry — {currentPlan.destination}
            </span>
            <h2 className="serif text-2xl sm:text-3xl md:text-4xl font-normal italic text-[#F8F5F2] tracking-tight leading-tight">
              {currentPlan.title}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#F8F5F2]/80 line-clamp-2 font-sans">
              {currentPlan.subtitle}
            </p>

            {/* Quick Summary Bar */}
            <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-[#F8F5F2]">
              <div className="bg-[#2D2D2D] border border-[#F8F5F2]/30 px-3.5 py-1.5 flex items-center space-x-2">
                <Wallet className="w-3.5 h-3.5 text-amber-300" />
                <span className="text-[11px] uppercase tracking-widest">Est. Cost: <strong className="serif text-sm italic text-amber-300 font-bold">¥{currentPlan.estimatedBudget.totalCost.toLocaleString()}</strong> / person</span>
              </div>

              <div className="bg-[#2D2D2D] border border-[#F8F5F2]/30 px-3.5 py-1.5 flex items-center space-x-2">
                <Calendar className="w-3.5 h-3.5 text-sky-300" />
                <span className="text-[11px] uppercase tracking-widest">Best Season: <strong className="font-bold">{currentPlan.bestSeason.join(', ')}</strong></span>
              </div>

              <div className="bg-[#2D2D2D] border border-[#F8F5F2]/30 px-3.5 py-1.5 flex items-center space-x-2">
                <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                <span className="text-[11px] uppercase tracking-widest">Rating <strong className="font-bold">{currentPlan.rating.toFixed(1)}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="bg-[#EFECE6] border-b border-[#2D2D2D] px-6 flex items-center justify-between text-xs overflow-x-auto">
          <div className="flex space-x-6 py-3 font-bold uppercase tracking-[0.2em]">
            <button
              onClick={() => setActiveTab('timeline')}
              className={`transition-all pb-1 border-b-2 flex items-center space-x-1.5 ${
                activeTab === 'timeline'
                  ? 'border-[#2D2D2D] text-[#2D2D2D]'
                  : 'border-transparent text-[#2D2D2D]/60 hover:text-[#2D2D2D]'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Itinerary</span>
            </button>

            <button
              onClick={() => setActiveTab('map')}
              className={`transition-all pb-1 border-b-2 flex items-center space-x-1.5 ${
                activeTab === 'map'
                  ? 'border-[#2D2D2D] text-[#2D2D2D]'
                  : 'border-transparent text-[#2D2D2D]/60 hover:text-[#2D2D2D]'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Route Map</span>
            </button>

            <button
              onClick={() => setActiveTab('budget')}
              className={`transition-all pb-1 border-b-2 flex items-center space-x-1.5 ${
                activeTab === 'budget'
                  ? 'border-[#2D2D2D] text-[#2D2D2D]'
                  : 'border-transparent text-[#2D2D2D]/60 hover:text-[#2D2D2D]'
              }`}
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>Budget</span>
            </button>

            <button
              onClick={() => setActiveTab('packing')}
              className={`transition-all pb-1 border-b-2 flex items-center space-x-1.5 ${
                activeTab === 'packing'
                  ? 'border-[#2D2D2D] text-[#2D2D2D]'
                  : 'border-transparent text-[#2D2D2D]/60 hover:text-[#2D2D2D]'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Checklist</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center space-x-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-3 py-1.5 text-[10px] uppercase font-bold tracking-widest border transition-colors flex items-center space-x-1 ${
                isEditing
                  ? 'bg-[#2D2D2D] text-[#F8F5F2] border-[#2D2D2D]'
                  : 'bg-white text-[#2D2D2D] border-[#2D2D2D]/40 hover:border-[#2D2D2D]'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Done Editing' : 'Customize Plan'}</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-[#F8F5F2]">
          {/* Day Selector Tabs (for Timeline & Map) */}
          {(activeTab === 'timeline' || activeTab === 'map') && (
            <div className="flex items-center justify-between bg-white p-3 border border-[#2D2D2D]">
              <div className="flex items-center space-x-2 overflow-x-auto">
                {currentPlan.days.map((day) => (
                  <button
                    key={day.dayNumber}
                    onClick={() => setActiveDayNumber(day.dayNumber)}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
                      activeDayNumber === day.dayNumber
                        ? 'bg-[#2D2D2D] text-[#F8F5F2]'
                        : 'bg-[#F8F5F2] text-[#2D2D2D] border border-[#2D2D2D]/30 hover:border-[#2D2D2D]'
                    }`}
                  >
                    Day 0{day.dayNumber}
                  </button>
                ))}
              </div>

              {isEditing && activeTab === 'timeline' && (
                <button
                  onClick={() => setShowAddSpotModal(true)}
                  className="bg-[#2D2D2D] hover:bg-black text-[#F8F5F2] text-[10px] uppercase tracking-widest font-bold px-3 py-2 border border-[#2D2D2D] flex items-center space-x-1 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Spot</span>
                </button>
              )}
            </div>
          )}

          {/* TAB 1: Timeline View */}
          {activeTab === 'timeline' && activeDay && (
            <div className="space-y-6">
              {/* Day Header */}
              <div className="bg-white border border-[#2D2D2D] p-5">
                <div className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#2D2D2D]/70">
                  Day 0{activeDay.dayNumber} Schedule & Theme
                </div>
                <h3 className="serif text-xl sm:text-2xl font-normal italic text-[#2D2D2D] mt-1">
                  {activeDay.title}
                </h3>
                <p className="text-xs text-[#2D2D2D]/80 mt-1 font-sans">
                  {activeDay.description}
                </p>
              </div>

              {/* Spot Timeline List */}
              <div className="relative pl-6 sm:pl-8 border-l-2 border-[#2D2D2D] space-y-6">
                {activeDay.spots.map((spot, index) => (
                  <div key={spot.id} className="relative group">
                    {/* Time Slot Node Pin */}
                    <div className="absolute -left-[31px] sm:-left-[39px] top-2 w-7 h-7 sm:w-8 sm:h-8 bg-[#2D2D2D] text-[#F8F5F2] font-serif font-bold text-xs sm:text-sm flex items-center justify-center border-2 border-[#F8F5F2]">
                      {index + 1}
                    </div>

                    {/* Spot Card */}
                    <div className="bg-white border border-[#2D2D2D] p-5 transition-all">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-3 border-b border-[#2D2D2D]/20">
                        <div className="flex items-center space-x-2">
                          <span className="bg-[#2D2D2D] text-[#F8F5F2] font-mono text-[11px] px-2.5 py-0.5 font-bold">
                            {spot.timeSlot}
                          </span>
                          <span className="bg-[#EFECE6] text-[#2D2D2D] text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 border border-[#2D2D2D]/30">
                            {spot.category}
                          </span>
                          <span className="text-[11px] text-[#2D2D2D]/60 font-medium">
                            約{spot.durationMinutes}分
                          </span>
                        </div>

                        {/* Reorder / Delete Controls in Edit Mode */}
                        {isEditing && (
                          <div className="flex items-center space-x-1 bg-[#EFECE6] p-1 border border-[#2D2D2D]">
                            <button
                              onClick={() => handleMoveSpot(index, 'up')}
                              disabled={index === 0}
                              className="p-1 hover:bg-[#2D2D2D] hover:text-[#F8F5F2] text-[#2D2D2D] disabled:opacity-30"
                              title="上に移動"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleMoveSpot(index, 'down')}
                              disabled={index === activeDay.spots.length - 1}
                              className="p-1 hover:bg-[#2D2D2D] hover:text-[#F8F5F2] text-[#2D2D2D] disabled:opacity-30"
                              title="下に移動"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteSpot(spot.id)}
                              className="p-1 hover:bg-rose-700 hover:text-white text-rose-700"
                              title="削除"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Spot Details Grid */}
                      <div className="mt-4 flex flex-col sm:flex-row gap-5">
                        {spot.imageUrl && (
                          <img
                            src={spot.imageUrl}
                            alt={spot.name}
                            className="w-full sm:w-40 h-32 object-cover border border-[#2D2D2D] shrink-0"
                          />
                        )}

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <h4 className="serif text-lg font-bold italic text-[#2D2D2D]">
                              {spot.name}
                            </h4>
                            <span className="text-xs font-bold text-[#2D2D2D] bg-[#EFECE6] border border-[#2D2D2D] px-2.5 py-0.5 shrink-0 ml-2">
                              {spot.cost > 0 ? `¥${spot.cost.toLocaleString()}` : '無料'}
                            </span>
                          </div>

                          <div className="text-xs text-[#2D2D2D]/80 font-medium flex items-center mt-1">
                            <MapPin className="w-3.5 h-3.5 mr-1 shrink-0" />
                            <span>{spot.locationName}</span>
                          </div>

                          <p className="mt-2 text-xs text-[#2D2D2D]/80 leading-relaxed font-sans">
                            {spot.description}
                          </p>

                          {spot.tips && (
                            <div className="mt-3 bg-[#EFECE6] border border-[#2D2D2D]/30 p-2.5 text-xs text-[#2D2D2D] flex items-start">
                              <Info className="w-3.5 h-3.5 text-[#2D2D2D] mr-2 shrink-0 mt-0.5" />
                              <span>{spot.tips}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Next Transport Connector Banner */}
                      {spot.nextTransport && (
                        <div className="mt-4 pt-3 border-t border-dashed border-[#2D2D2D]/30 flex items-center space-x-2 text-xs text-[#2D2D2D]/80 bg-[#EFECE6]/50 -mx-5 -mb-5 p-3">
                          <Navigation className="w-3.5 h-3.5 text-[#2D2D2D]" />
                          <span className="font-bold uppercase tracking-wider text-[10px]">Next Leg:</span>
                          <span>{spot.nextTransport.mode} 約{spot.nextTransport.durationMinutes}分</span>
                          {spot.nextTransport.note && (
                            <span className="text-[#2D2D2D]/60">({spot.nextTransport.note})</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Interactive Route Map */}
          {activeTab === 'map' && activeDay && (
            <div>
              <InteractiveMap spots={activeDay.spots} />
            </div>
          )}

          {/* TAB 3: Budget Breakdown */}
          {activeTab === 'budget' && (
            <div className="space-y-6">
              <div className="bg-[#2D2D2D] text-[#F8F5F2] p-8 border border-[#2D2D2D]">
                <div className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#F8F5F2]/70">Total Estimated Cost</div>
                <div className="serif text-4xl italic font-normal text-amber-300 mt-1">
                  ¥{currentPlan.estimatedBudget.totalCost.toLocaleString()}
                </div>
                <p className="text-xs text-[#F8F5F2]/80 mt-2 font-sans">
                  交通費、宿泊費、食事、アクティビティ、お土産予備費のリアルなシミュレーション値です。
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-5 bg-white border border-[#2D2D2D]">
                  <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#2D2D2D]/60">Transportation</div>
                  <div className="serif text-2xl italic font-bold text-[#2D2D2D] mt-1">
                    ¥{currentPlan.estimatedBudget.transportCost.toLocaleString()}
                  </div>
                </div>

                <div className="p-5 bg-white border border-[#2D2D2D]">
                  <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#2D2D2D]/60">Accommodation</div>
                  <div className="serif text-2xl italic font-bold text-[#2D2D2D] mt-1">
                    ¥{currentPlan.estimatedBudget.accommodationCost.toLocaleString()}
                  </div>
                </div>

                <div className="p-5 bg-white border border-[#2D2D2D]">
                  <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#2D2D2D]/60">Dining & Cafes</div>
                  <div className="serif text-2xl italic font-bold text-[#2D2D2D] mt-1">
                    ¥{currentPlan.estimatedBudget.foodCost.toLocaleString()}
                  </div>
                </div>

                <div className="p-5 bg-white border border-[#2D2D2D]">
                  <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#2D2D2D]/60">Activities & Sightseeing</div>
                  <div className="serif text-2xl italic font-bold text-[#2D2D2D] mt-1">
                    ¥{currentPlan.estimatedBudget.activitiesCost.toLocaleString()}
                  </div>
                </div>

                <div className="p-5 bg-white border border-[#2D2D2D]">
                  <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#2D2D2D]/60">Shopping & Misc Buffer</div>
                  <div className="serif text-2xl italic font-bold text-[#2D2D2D] mt-1">
                    ¥{currentPlan.estimatedBudget.shoppingBuffer.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Packing Checklist */}
          {activeTab === 'packing' && (
            <div className="space-y-4">
              <h3 className="serif text-2xl italic font-normal text-[#2D2D2D]">
                Pre-departure Checklist
              </h3>
              <p className="text-xs text-[#2D2D2D]/70 font-sans">
                ご出発前の最終確認にご活用ください。タップしてチェックを管理できます。
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {(currentPlan.packingItems || ['モバイルバッテリー', '歩きやすいスニーカー', 'カメラ', '折りたたみ傘', '着替え']).map((item) => {
                  const isChecked = !!checkedItems[item];
                  return (
                    <div
                      key={item}
                      onClick={() => handleToggleCheckItem(item)}
                      className={`p-4 border flex items-center space-x-3 cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-[#EFECE6] border-[#2D2D2D]/40 text-[#2D2D2D]/50 line-through'
                          : 'bg-white border-[#2D2D2D] text-[#2D2D2D]'
                      }`}
                    >
                      <div className={`w-5 h-5 flex items-center justify-center border ${
                        isChecked ? 'bg-[#2D2D2D] border-[#2D2D2D] text-[#F8F5F2]' : 'border-[#2D2D2D] bg-white'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider">{item}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* AI Refine Bar Footer */}
        <div className="bg-[#EFECE6] border-t border-[#2D2D2D] p-4">
          <form onSubmit={handleAiRefineSubmit} className="flex items-center gap-2">
            <div className="relative flex-1">
              <Sparkles className="w-4 h-4 text-[#2D2D2D] absolute left-3 top-3" />
              <input
                type="text"
                value={aiRefineInput}
                onChange={(e) => setAiRefineInput(e.target.value)}
                placeholder="AIコンシェルジュに修正を依頼（例：2日目の午後に嵐山を追加して、予算を1万円安くして）"
                className="w-full pl-9 pr-4 py-2.5 text-xs bg-white border border-[#2D2D2D] outline-none focus:ring-1 focus:ring-[#2D2D2D] text-[#2D2D2D] font-medium"
              />
            </div>
            <button
              type="submit"
              disabled={isRefining || !aiRefineInput.trim()}
              className="bg-[#2D2D2D] hover:bg-black disabled:opacity-50 text-[#F8F5F2] font-bold text-xs uppercase tracking-widest px-5 py-2.5 border border-[#2D2D2D] flex items-center space-x-1 shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{isRefining ? 'Re-writing...' : 'AI Refine'}</span>
            </button>
          </form>
        </div>
      </div>

      {/* Add Spot Modal */}
      {showAddSpotModal && (
        <div className="fixed inset-0 z-60 bg-[#2D2D2D]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#F8F5F2] w-full max-w-md border border-[#2D2D2D] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#2D2D2D] pb-3">
              <h3 className="serif text-lg italic font-bold text-[#2D2D2D]">Add Custom Location</h3>
              <button onClick={() => setShowAddSpotModal(false)} className="text-[#2D2D2D]/60 hover:text-[#2D2D2D]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSpotSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-[#2D2D2D] mb-1">Spot Name *</label>
                <input
                  type="text"
                  required
                  value={newSpotData.name}
                  onChange={e => setNewSpotData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="例：伏見稲荷大社、伏見茶屋"
                  className="w-full border border-[#2D2D2D] bg-white p-2.5 text-[#2D2D2D]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#2D2D2D] mb-1">Category</label>
                  <select
                    value={newSpotData.category}
                    onChange={e => setNewSpotData(prev => ({ ...prev, category: e.target.value as any }))}
                    className="w-full border border-[#2D2D2D] bg-white p-2.5 text-[#2D2D2D]"
                  >
                    <option value="観光">観光</option>
                    <option value="グルメ">グルメ</option>
                    <option value="カフェ">カフェ</option>
                    <option value="体験">体験</option>
                    <option value="ショッピング">ショッピング</option>
                    <option value="宿泊">宿泊</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#2D2D2D] mb-1">Time Slot</label>
                  <input
                    type="text"
                    value={newSpotData.timeSlot}
                    onChange={e => setNewSpotData(prev => ({ ...prev, timeSlot: e.target.value }))}
                    placeholder="14:00 - 15:30"
                    className="w-full border border-[#2D2D2D] bg-white p-2.5 text-[#2D2D2D]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-[#2D2D2D] mb-1">Cost (JPY)</label>
                <input
                  type="number"
                  value={newSpotData.cost}
                  onChange={e => setNewSpotData(prev => ({ ...prev, cost: Number(e.target.value) }))}
                  placeholder="1000"
                  className="w-full border border-[#2D2D2D] bg-white p-2.5 text-[#2D2D2D]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-[#2D2D2D] mb-1">Notes / Description</label>
                <textarea
                  value={newSpotData.description}
                  onChange={e => setNewSpotData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="見どころや食べたい料理など"
                  rows={2}
                  className="w-full border border-[#2D2D2D] bg-white p-2.5 text-[#2D2D2D]"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddSpotModal(false)}
                  className="px-4 py-2 border border-[#2D2D2D] text-[#2D2D2D] font-bold text-xs uppercase tracking-wider bg-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2D2D2D] text-[#F8F5F2] font-bold text-xs uppercase tracking-wider border border-[#2D2D2D]"
                >
                  Save Spot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
