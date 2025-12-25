
import React from 'react';
import { HistoryItem } from '../types';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';

interface HistoryPageProps {
  history: HistoryItem[];
  onBack: () => void;
  onSelect: (item: HistoryItem) => void;
}

const HistoryPage: React.FC<HistoryPageProps> = ({ history, onBack, onSelect }) => {
  return (
    <div className="min-h-screen bg-orange-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-titr text-orange-800">تاریخچه تحلیل‌های شما</h2>
          <button onClick={onBack} className="flex items-center gap-2 text-orange-600 font-titr text-xl hover:translate-x-1 transition-transform">
            <ArrowLeft /> بازگشت
          </button>
        </div>

        {history.length === 0 ? (
          <div className="bg-white p-20 rounded-[3rem] text-center shadow-xl">
            <div className="bg-orange-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-300">
              <Clock size={48} />
            </div>
            <p className="font-titr text-2xl text-gray-400">هنوز هیچ تحلیلی انجام نشده است.</p>
            <button 
              onClick={onBack}
              className="mt-8 px-10 py-3 bg-orange-500 text-white rounded-full font-titr hover:bg-orange-600 transition-all"
            >
              اولین نقاشی را بفرستید
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {history.map((item) => (
              <div 
                key={item.id}
                onClick={() => onSelect(item)}
                className="bg-white p-6 rounded-[2rem] shadow-lg border-2 border-transparent hover:border-orange-300 transition-all cursor-pointer group flex gap-4 overflow-hidden"
              >
                <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0 border border-orange-100">
                  <img src={item.imageUrl} alt="doodle" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex flex-col justify-between py-1">
                  <div>
                    <div className="flex items-center gap-2 text-orange-400 font-yekan text-xs mb-2">
                      <Calendar size={14} />
                      {new Date(item.timestamp).toLocaleDateString('fa-IR')}
                    </div>
                    <h4 className="font-titr text-orange-800 text-lg mb-1 line-clamp-1">{item.emotionalState}</h4>
                    <p className="font-nazanin text-gray-500 text-sm line-clamp-2">{item.detailedAnalysis}</p>
                  </div>
                  <div className="flex gap-4 items-center mt-2">
                    <span className="text-xs font-yekan text-orange-600 bg-orange-50 px-2 py-1 rounded">استرس: {item.stressLevel}%</span>
                    <span className="text-xs font-yekan text-orange-600 bg-orange-50 px-2 py-1 rounded">خلاقیت: {item.creativityLevel}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
