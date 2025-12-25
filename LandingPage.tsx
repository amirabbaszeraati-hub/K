
import React, { useState } from 'react';
import { Info, User, Clock, ChevronDown, Calendar, Home } from 'lucide-react';
import { HistoryItem } from '../types';

interface LandingPageProps {
  onStart: () => void;
  history: HistoryItem[];
  onSelectHistory: (item: HistoryItem) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, history, onSelectHistory }) => {
  const [showAbout, setShowAbout] = useState(false);
  const [showDesc, setShowDesc] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Hero Section */}
      <div className="relative w-full min-h-[85vh] orange-gradient flex flex-col items-center justify-center text-white p-6 overflow-hidden shadow-2xl">
        {/* Background Decorations */}
        <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-80 h-80 bg-orange-900/10 rounded-full blur-3xl"></div>

        {/* Top Icons */}
        <div className="absolute top-6 right-6 flex gap-3 z-20">
          <button 
            onClick={() => setShowAbout(true)}
            className="p-2.5 bg-white/20 hover:bg-white/40 rounded-full transition-all flex items-center gap-2 group border border-white/30"
          >
            <User size={20} />
            <span className="hidden group-hover:inline font-yekan text-xs">درباره ما</span>
          </button>
          <button 
            onClick={() => setShowDesc(true)}
            className="p-2.5 bg-white/20 hover:bg-white/40 rounded-full transition-all flex items-center gap-2 group border border-white/30"
          >
            <Info size={20} />
            <span className="hidden group-hover:inline font-yekan text-xs">توضیحات</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="text-center z-10 animate-[fadeIn_1s_ease-out]">
          <h1 className="text-6xl md:text-7xl font-bold trace-mind-title mb-3 drop-shadow-2xl">Trace Mind</h1>
          <div className="w-20 h-1 bg-white/60 mx-auto mb-8 rounded-full shadow-inner"></div>
          <p className="text-xl md:text-2xl font-nazanin mb-10 opacity-95 max-w-2xl mx-auto leading-relaxed px-4">
            خط‌خطی‌های ذهن خود را به ما بسپارید تا لایه‌های پنهان روان شما را با هوش مصنوعی و اصول علمی تحلیل کنیم.
          </p>
          
          <button 
            onClick={onStart}
            className="group relative px-10 py-4 bg-white text-orange-600 rounded-full text-xl font-titr shadow-2xl hover:scale-105 active:scale-95 transition-all overflow-hidden"
          >
            <span className="relative z-10">شروع تحلیل</span>
            <div className="absolute inset-0 bg-orange-50 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>

          <div className="mt-12 animate-bounce opacity-50">
            <ChevronDown size={28} />
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="w-full max-w-6xl px-6 py-16">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-orange-500 p-2.5 rounded-xl text-white shadow-lg">
            <Clock size={24} />
          </div>
          <h2 className="text-2xl md:text-3xl font-titr text-orange-900">تاریخچه تحلیل‌های شما</h2>
        </div>

        {history.length === 0 ? (
          <div className="bg-white p-12 rounded-[2.5rem] text-center shadow-xl border border-orange-100">
            <p className="font-titr text-xl text-gray-400">هنوز هیچ تحلیلی انجام نشده است. اولین قدم را بردارید!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((item) => (
              <div 
                key={item.id}
                onClick={() => onSelectHistory(item)}
                className="bg-white p-5 rounded-[2rem] shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-orange-400 transition-all cursor-pointer group"
              >
                <div className="aspect-video rounded-2xl overflow-hidden mb-4 border border-orange-50">
                  <img src={item.imageUrl} alt="doodle" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-orange-400 font-yekan text-[10px]">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(item.timestamp).toLocaleDateString('fa-IR')}</span>
                    <span className="bg-orange-50 px-2 py-0.5 rounded-full text-orange-600 font-bold">تحلیل شده</span>
                  </div>
                  <h4 className="font-titr text-orange-800 text-lg line-clamp-1">{item.emotionalState}</h4>
                  <p className="font-nazanin text-gray-500 text-sm line-clamp-2 leading-relaxed">{item.detailedAnalysis}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* About Modal */}
      {showAbout && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={() => setShowAbout(false)}>
          <div className="bg-white text-gray-800 p-8 rounded-[2.5rem] max-w-sm w-full shadow-2xl animate-[scaleIn_0.3s_ease-out] border-t-[8px] border-orange-500" onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-titr text-orange-600 mb-6 text-center">درباره ما</h3>
            <div className="space-y-4 font-yekan text-base leading-relaxed text-right">
              <div className="bg-orange-50 p-5 rounded-2xl space-y-2">
                <p><strong className="text-orange-700">تهیه‌کننده:</strong> فاطمه زراعتی</p>
                <p><strong className="text-orange-700">استاد راهنما:</strong> دکتر کریمی</p>
              </div>
              <p className="text-gray-500 text-sm text-justify leading-relaxed">
                این پروژه با هدف تلفیق هنردرمانی سنتی با تکنولوژی‌های نوین هوش مصنوعی طراحی شده است تا بستری برای خودشناسی بصری فراهم آورد.
              </p>
            </div>
            <button 
              onClick={() => setShowAbout(false)}
              className="mt-8 w-full py-3 bg-orange-100 text-orange-700 rounded-xl font-titr text-lg hover:bg-orange-200 transition-colors shadow-sm"
            >
              بستن
            </button>
          </div>
        </div>
      )}

      {/* Description Modal */}
      {showDesc && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={() => setShowDesc(false)}>
          <div className="bg-white text-gray-800 p-8 rounded-[2.5rem] max-w-xl w-full shadow-2xl animate-[scaleIn_0.3s_ease-out] border-t-[8px] border-orange-500" onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-titr text-orange-600 mb-6 text-center">توضیحات و راهنما</h3>
            <div className="space-y-4 font-nazanin text-lg leading-relaxed text-justify px-2">
              <p className="text-orange-800 font-bold">سلام و درود!</p>
              <p>
                اپلیکیشن «Trace Mind» یک ابزار حرفه‌ای برای واکاوی ضمیر ناخودآگاه شماست. زمانی که ذهن آزاد است و دست شروع به کشیدن خطوط بدون هدف می‌کند، لایه‌های پنهانی از شخصیت و وضعیت روانی فعلی شما روی کاغذ نقش می‌بندد.
              </p>
              <div className="bg-orange-50 p-5 rounded-2xl space-y-3">
                <p className="text-orange-900 font-bold text-base">چگونه کار می‌کند؟</p>
                <ol className="list-decimal list-inside space-y-1 text-sm font-yekan text-orange-700">
                  <li>یک کاغذ سفید و قلم بردارید.</li>
                  <li>ذهن خود را آزاد کنید و اجازه دهید دستتان آزادانه حرکت کند.</li>
                  <li>از خط‌خطی نهایی یک عکس واضح بگیرید.</li>
                  <li>هوش مصنوعی ما با تحلیل فشار، جهت و الگوها، گزارشی علمی ارائه می‌دهد.</li>
                </ol>
              </div>
              <p className="text-xs text-gray-400 italic">
                این برنامه با رویکردی صمیمانه اما بر پایه اصول معتبر روان‌شناسی پروژکتیو طراحی شده است.
              </p>
            </div>
            <button 
              onClick={() => setShowDesc(false)}
              className="mt-8 w-full py-3 bg-orange-600 text-white rounded-xl font-titr text-lg hover:bg-orange-700 transition-all shadow-lg"
            >
              بسیار عالی، شروع کنیم!
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
};

export default LandingPage;
