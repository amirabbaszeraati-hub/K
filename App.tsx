
import React, { useState, useEffect } from 'react';
import { Page, AnalysisData, HistoryItem } from './types';
import LandingPage from './components/LandingPage';
import FileUpload from './components/FileUpload';
import ResultPage from './components/ResultPage';
import { analyzeScribble } from './geminiService';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Landing);
  const [analysisResult, setAnalysisResult] = useState<AnalysisData | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedHistory = localStorage.getItem('trace_mind_history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const saveToHistory = (data: AnalysisData) => {
    const newItem: HistoryItem = { ...data, id: Date.now().toString() };
    const updatedHistory = [newItem, ...history];
    setHistory(updatedHistory);
    localStorage.setItem('trace_mind_history', JSON.stringify(updatedHistory));
  };

  const handleStart = () => setCurrentPage(Page.Upload);
  const handleGoHome = () => {
    setCurrentPage(Page.Landing);
    setAnalysisResult(null);
  };

  const handleFileUpload = async (base64: string) => {
    setLoading(true);
    setCurrentPage(Page.Processing);
    try {
      const result = await analyzeScribble(base64);
      setAnalysisResult(result);
      saveToHistory(result);
      setCurrentPage(Page.Result);
    } catch (error) {
      console.error("Analysis failed", error);
      alert("خطا در تحلیل تصویر. لطفا دوباره تلاش کنید.");
      setCurrentPage(Page.Upload);
    } finally {
      setLoading(false);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.Landing:
        return (
          <LandingPage 
            onStart={handleStart} 
            history={history} 
            onSelectHistory={(item) => {
              setAnalysisResult(item);
              setCurrentPage(Page.Result);
            }} 
          />
        );
      case Page.Upload:
        return <FileUpload onUpload={handleFileUpload} onBack={handleGoHome} />;
      case Page.Processing:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50 p-8">
            <div className="relative w-24 h-24 mb-8">
              <div className="absolute inset-0 border-4 border-orange-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <h2 className="text-2xl font-titr text-orange-800 animate-pulse text-center">در حال واکاوی خطوط ذهن شما...</h2>
            <p className="mt-4 text-orange-600 font-nazanin text-lg text-center">روان‌شناس هوشمند ما در حال تحلیل لایه‌های پنهان نقاشی شماست.</p>
          </div>
        );
      case Page.Result:
        return analysisResult ? (
          <ResultPage 
            data={analysisResult} 
            onBack={handleGoHome} 
          />
        ) : null;
      default:
        return <LandingPage onStart={handleStart} history={history} onSelectHistory={() => {}} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf0]">
      {renderPage()}
    </div>
  );
};

export default App;
