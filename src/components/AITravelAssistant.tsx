import React, { useState } from 'react';
import { ChatMessage } from '../types';
import { Send, Bot, User, Sparkles, MessageSquare, X, RefreshCw } from 'lucide-react';

interface AITravelAssistantProps {
  onClose?: () => void;
  onSearchQuery?: (query: string) => void;
}

const DEFAULT_SUGGESTIONS = [
  '京都で雨の日でも楽しめるおすすめスポットは？',
  '北海道3泊4日ドライブで気を付けるポイントは？',
  '箱根でおすすめの立ち寄り温泉と名物グルメ',
  '予算5万円以内で行ける一人旅でおすすめの場所は？',
];

export const AITravelAssistant: React.FC<AITravelAssistantProps> = ({
  onClose,
  onSearchQuery,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'assistant',
      text: 'こんにちは！旅行AIコンシェルジュ「たびナビ」です。おすすめの観光地、時期、交通手段、グルメ情報など、旅のことなら何でもお気軽にご質問ください！',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/travel-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'エラーが発生しました');
      }

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: '申し訳ありません。通信中にエラーが発生しました。時間を置いて再度お試しください。',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="ai-chat-container" className="bg-[#F8F5F2] border border-[#2D2D2D] shadow-xl overflow-hidden flex flex-col h-[600px] max-w-2xl mx-auto text-[#2D2D2D]">
      {/* Chat Header */}
      <div className="bg-[#2D2D2D] p-5 text-[#F8F5F2] flex items-center justify-between border-b border-[#2D2D2D]">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 border border-[#F8F5F2]/30 flex items-center justify-center bg-[#2D2D2D]">
            <Bot className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#F8F5F2]/70 font-bold block">
              Editorial Travel Desk
            </span>
            <h3 className="serif text-lg font-normal italic text-[#F8F5F2]">AI Travel Assistant</h3>
          </div>
        </div>

        {onClose && (
          <button onClick={onClose} className="p-2 border border-[#F8F5F2]/30 text-[#F8F5F2] hover:bg-[#F8F5F2] hover:text-[#2D2D2D] transition-colors">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#F8F5F2]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-2.5 ${
              msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <div
              className={`w-8 h-8 flex items-center justify-center shrink-0 border border-[#2D2D2D] ${
                msg.sender === 'user' ? 'bg-[#2D2D2D] text-[#F8F5F2]' : 'bg-[#EFECE6] text-[#2D2D2D]'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className={`max-w-[80%] p-4 text-xs sm:text-sm leading-relaxed border border-[#2D2D2D] ${
              msg.sender === 'user'
                ? 'bg-[#2D2D2D] text-[#F8F5F2]'
                : 'bg-white text-[#2D2D2D]'
            }`}>
              <p className="whitespace-pre-line font-sans">{msg.text}</p>
              <div className={`text-[10px] mt-1 text-right tracking-wider ${
                msg.sender === 'user' ? 'text-[#F8F5F2]/60' : 'text-[#2D2D2D]/50'
              }`}>
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center space-x-2 text-[#2D2D2D]/70 text-xs p-2">
            <RefreshCw className="w-4 h-4 animate-spin text-[#2D2D2D]" />
            <span className="serif italic">Curating response...</span>
          </div>
        )}
      </div>

      {/* Suggested Questions */}
      <div className="bg-[#EFECE6] border-t border-[#2D2D2D] px-4 py-2.5 flex items-center space-x-2 overflow-x-auto no-scrollbar text-xs">
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#2D2D2D]/60 shrink-0">Prompts:</span>
        {DEFAULT_SUGGESTIONS.map((q) => (
          <button
            key={q}
            onClick={() => handleSendMessage(q)}
            className="bg-white hover:bg-[#2D2D2D] hover:text-[#F8F5F2] text-[#2D2D2D] px-2.5 py-1 border border-[#2D2D2D]/40 text-[11px] whitespace-nowrap transition-colors font-medium shrink-0"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-3 bg-[#F8F5F2] border-t border-[#2D2D2D]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="旅に関する質問を入力（例: 京都でおすすめのカフェは？）"
            className="flex-1 border border-[#2D2D2D] bg-white px-4 py-2.5 text-xs sm:text-sm outline-none text-[#2D2D2D]"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-[#2D2D2D] hover:bg-black disabled:opacity-50 text-[#F8F5F2] p-2.5 border border-[#2D2D2D] transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
