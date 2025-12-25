import React from 'react';
import { AnalysisData } from '../types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { FileJson, Home, Printer } from 'lucide-react';

interface ResultPageProps {
  data: AnalysisData;
  onBack: () => void;
}

const ResultPage: React.FC<ResultPageProps> = ({ data, onBack }) => {
  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trace-mind-analysis-${data.timestamp}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const chartData = data.personalityTraits.map(t => ({
    name: t.trait,
    score: t.score
  }));

  const indicators = [
    { label: 'سطح استرس', value: data.stressLevel, color: '#f97316' },
    { label: 'سطح خلاقیت', value: data.creativityLevel, color: '#fb923c' }
  ];

  return (
    <div className="min-h-screen bg-[#fffaf0] p-4 md:p-10 flex flex-col items-center">
      <div className="max-w-5xl w-full space-y-6 animate-[fadeIn_0.5s_ease-out]">
        
        {/* Header Actions */}
        <div className="flex flex-wrap justify-between items-center no-print gap-3">
          <button 
            onClick={onBack} 
            className="flex items-center gap-2 text-orange-600 font-titr text-lg hover:scale-105 transition-all bg-white px-4 py-2 rounded-xl shadow-sm border border-orange-100"
          >
            <Home size={20} /> خانه
          </button>
          
          <div className="flex gap-3">
            <button 
              onClick={handlePrint} 
              className="flex items-center gap-2 bg-white text-orange-600 px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md font-titr text-base border border-orange-200"
            >
              <Printer size={18} /> ذخیره PDF
            </button>
            <button 
              onClick={downloadJson} 
              className="flex items-center gap-2 bg-orange-600 text-white px-5 py-2.5 rounded-xl shadow-md hover:bg-orange-700 font-titr text-base"
            >
              <FileJson size={18} /> فایل JSON
            </button>
          </div>
        </div>

        {/* Main Report Card */}
        <div className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-xl overflow-hidden border-[4px] md:border-[8px] border-white p-5 md:p-12 relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-orange-50 rounded-full blur-3xl -z-10 opacity-40"></div>
          
          <div className="grid lg:grid-cols-3 gap-10">
            
            {/* Visual Column */}
            <div className="lg:col-span-1 space-y-8">
              <div className="rounded-[2rem] overflow-hidden shadow-lg border-4 border-orange-50 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                <img src={data.imageUrl} alt="User Doodle" className="w-full h-64 object-cover" />
                <div className="bg-orange-500 text-white p-3 text-center font-titr text-xl">نقاشی شما</div>
              </div>

              <div className="bg-orange-50 p-4 md:p-6 rounded-[2rem] space-y-4">
                <h3 className="text-lg font-titr text-orange-800 border-r-4 border-orange-500 pr-3">نمودار شخصیت</h3>
                {/* اصلاح بخش نمودار برای موبایل */}
                <div className="h-64 w-full min-h-[250px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="65%" data={chartData}>
                      <PolarGrid stroke="#fed7aa" />
                      <PolarAngleAxis dataKey="name" tick={{ fontSize: 10, fill: '#9a3412', fontWeight: 'bold' }} />
                      <PolarRadiusAxis angle={30} domain={[0, 10]} stroke="#fdba74" tick={false} />
                      <Radar name="شخصیت" dataKey="score" stroke="#f97316" fill="#f97316" fillOpacity={0.6} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Analysis Text Column */}
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-titr text-orange-950 leading-tight text-center md:text-right">گزارش روان‌شناختی</h2>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full font-yekan text-[10px] font-bold">تحلیل هوشمند Trace Mind</span>
                  <span className="text-orange-300 font-yekan text-[10px] flex items-center gap-1 border-r pr-3">
                    {new Date(data.timestamp).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {indicators.map((ind, idx) => (
                  <div key={idx} className="bg-orange-50/50 p-5 rounded-[1.5rem] border border-orange-100 shadow-inner">
                    <p className="font-yekan text-orange-800 mb-2 text-sm">{ind.label}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-titr text-orange-600">{ind.value}%</span>
                      <div className="flex-1 h-2.5 bg-orange-100 rounded-full overflow-hidden shadow-inner">
                        <div className="h-full bg-orange-500 shadow-md" style={{ width: `${ind.value}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-8">
                <section>
                  <h4 className="text-xl font-titr text-orange-900 mb-4 flex items-center gap-2">
                    <div className="w-2 h-6 bg-orange-500 rounded-full"></div>
                    وضعیت عاطفی فعلی
                  </h4>
                  <p className="text-lg md:text-xl font-nazanin text-orange-800 italic bg-gradient-to-l from-orange-50 to-white p-5 rounded-[1.5rem] border-r-8 border-orange-500 shadow-sm text-justify">
                    «{data.emotionalState}»
                  </p>
                </section>

                <section>
                  <h4 className="text-xl font-titr text-orange-900 mb-4 flex items-center gap-2">
                    <div className="w-2 h-6 bg-orange-500 rounded-full"></div>
                    تحلیل تفصیلی و علمی
                  </h4>
                  <div className="text-base md:text-lg font-nazanin text-gray-800 leading-relaxed text-justify space-y-4 bg-white p-1">
                    {data.detailedAnalysis.split('\n').filter(p => p.trim()).map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </section>

                <section>
                  <h4 className="text-xl font-titr text-orange-900 mb-6 flex items-center gap-2">
                    <div className="w-2 h-6 bg-orange-500 rounded-full"></div>
                    توصیه‌های بهبود و خودشناسی
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.recommendations.map((rec, i) => (
                      <div key={i} className="flex gap-3 bg-orange-50/30 border border-orange-100 p-4 rounded-[1.2rem] hover:bg-white transition-all shadow-sm group">
                        <span className="w-8 h-8 bg-orange-500 text-white rounded-xl flex items-center justify-center shrink-0 font-titr text-base group-hover:scale-110 transition-transform">{i+1}</span>
                        <p className="font-yekan text-orange-950 text-xs md:text-sm leading-relaxed">{rec}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="pt-10 mt-10 border-t-2 border-orange-50 text-center">
                <p className="font-nazanin text-gray-400 italic text-[10px] md:text-sm max-w-xl mx-auto leading-relaxed">
                  این گزارش یک تحلیل روان‌شناختی پروژکتیو است که توسط هوش مصنوعی Trace Mind تولید شده است. لطفاً برای موارد حاد بالینی به متخصص مراجعه کنید.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
