import React, { useState } from 'react';
import { TravelSpot } from '../types';
import { MapPin, Navigation, Clock, Footprints, Bus, Car, Train, Info } from 'lucide-react';

interface InteractiveMapProps {
  spots: TravelSpot[];
  activeSpotId?: string;
  onSelectSpot?: (spotId: string) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  spots,
  activeSpotId,
  onSelectSpot,
}) => {
  const [selectedPinId, setSelectedPinId] = useState<string | null>(activeSpotId || spots[0]?.id || null);

  const activeSpot = spots.find(s => s.id === (selectedPinId || activeSpotId)) || spots[0];

  const getTransportIcon = (mode?: string) => {
    switch (mode) {
      case '徒歩': return <Footprints className="w-3.5 h-3.5" />;
      case 'バス': return <Bus className="w-3.5 h-3.5" />;
      case '電車': return <Train className="w-3.5 h-3.5" />;
      case 'レンタカー・車': case 'タクシー': return <Car className="w-3.5 h-3.5" />;
      default: return <Navigation className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div id="interactive-map-container" className="bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-800 text-white flex flex-col">
      {/* Map Canvas Header */}
      <div className="bg-slate-950/80 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-sm tracking-wide font-sans">スポット巡りルートマップ</span>
        </div>
        <span className="text-xs text-slate-400">
          全 {spots.length} スポット
        </span>
      </div>

      {/* Stylized Visual Map Representation */}
      <div className="relative min-h-[320px] sm:min-h-[380px] bg-slate-950 p-6 flex flex-col justify-between overflow-hidden">
        {/* Subtle Map Grid Pattern Background */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#38bdf8 1px, transparent 1px), radial-gradient(#1e293b 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
            backgroundPosition: '0 0, 12px 12px',
          }}
        />

        {/* Route Connecting Path Vector */}
        <div className="relative z-10 my-auto py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
            {spots.map((spot, index) => {
              const isSelected = spot.id === activeSpot?.id;
              const isLast = index === spots.length - 1;

              return (
                <React.Fragment key={spot.id}>
                  {/* Spot Marker Card */}
                  <div
                    onClick={() => {
                      setSelectedPinId(spot.id);
                      if (onSelectSpot) onSelectSpot(spot.id);
                    }}
                    className={`relative cursor-pointer transition-all duration-300 transform hover:-translate-y-1 p-3 rounded-xl border flex-1 w-full md:w-auto ${
                      isSelected
                        ? 'bg-sky-900/80 border-sky-400 ring-2 ring-sky-400/50 shadow-lg shadow-sky-500/20'
                        : 'bg-slate-900/90 border-slate-700/80 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {/* Number Pin Badge */}
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm shrink-0 ${
                        isSelected
                          ? 'bg-sky-400 text-slate-950 shadow-md'
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}>
                        {index + 1}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span className="font-mono">{spot.timeSlot}</span>
                          <span className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded text-[10px]">
                            {spot.category}
                          </span>
                        </div>
                        <div className="font-bold text-sm text-slate-100 truncate mt-0.5">
                          {spot.name}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate mt-0.5">
                          {spot.locationName}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Route Connector Arrow */}
                  {!isLast && spot.nextTransport && (
                    <div className="flex md:flex-col items-center justify-center text-sky-400 px-2 py-1 bg-slate-900/60 rounded-lg border border-slate-800 text-xs shrink-0 font-medium">
                      <div className="flex items-center space-x-1">
                        {getTransportIcon(spot.nextTransport.mode)}
                        <span>{spot.nextTransport.mode} {spot.nextTransport.durationMinutes}分</span>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Selected Spot Detail Popup Footer */}
        {activeSpot && (
          <div className="relative z-10 bg-slate-900/95 border border-sky-500/40 p-4 rounded-xl backdrop-blur-md mt-4 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                {activeSpot.imageUrl && (
                  <img
                    src={activeSpot.imageUrl}
                    alt={activeSpot.name}
                    className="w-14 h-14 rounded-lg object-cover shrink-0 border border-slate-700"
                  />
                )}
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="bg-sky-500 text-slate-950 font-black text-xs px-2 py-0.5 rounded">
                      スポット詳細
                    </span>
                    <span className="text-xs text-sky-300 font-medium">{activeSpot.timeSlot}</span>
                  </div>
                  <h4 className="font-bold text-base text-white mt-1">{activeSpot.name}</h4>
                  <p className="text-xs text-slate-300 line-clamp-1">{activeSpot.description}</p>
                </div>
              </div>

              <div className="text-right sm:border-l border-slate-800 sm:pl-4 shrink-0">
                <div className="text-[11px] text-slate-400">想定費用</div>
                <div className="text-base font-extrabold text-emerald-400 font-sans">
                  {activeSpot.cost > 0 ? `¥${activeSpot.cost.toLocaleString()}` : '無料'}
                </div>
              </div>
            </div>

            {activeSpot.tips && (
              <div className="mt-2.5 pt-2 border-t border-slate-800/80 text-xs text-amber-300/90 flex items-start">
                <Info className="w-3.5 h-3.5 mr-1.5 shrink-0 mt-0.5 text-amber-400" />
                <span>ワンポイント: {activeSpot.tips}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
