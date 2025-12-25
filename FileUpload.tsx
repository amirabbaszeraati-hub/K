
import React, { useRef, useState } from 'react';
import { Upload, ArrowRight, Home, Image as ImageIcon } from 'lucide-react';

interface FileUploadProps {
  onUpload: (base64: string) => void;
  onBack: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload, onBack }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreview(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = () => {
    if (preview) onUpload(preview);
  };

  return (
    <div className="min-h-screen bg-orange-50 p-6 flex flex-col items-center justify-center relative">
      <button 
        onClick={onBack}
        className="absolute top-6 right-6 flex items-center gap-2 text-orange-600 font-titr text-lg bg-white px-4 py-2 rounded-xl shadow-md border border-orange-100 hover:scale-105 transition-all"
      >
        <Home size={20} /> بازگشت به خانه
      </button>

      <div className="max-w-xl w-full bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 text-center animate-[fadeIn_0.5s_ease-out]">
        <h2 className="text-2xl md:text-3xl font-titr text-orange-900 mb-2">ارسال تصویر خط‌خطی</h2>
        <p className="font-nazanin text-orange-600 mb-8 text-lg">تصویری واضح از نقاشی ناخودآگاه خود را انتخاب کنید.</p>

        {!preview ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-4 border-dashed border-orange-200 rounded-[2rem] p-10 hover:border-orange-400 hover:bg-orange-50 transition-all cursor-pointer group flex flex-col items-center"
          >
            <div className="bg-orange-100 p-6 rounded-full inline-block mb-6 group-hover:scale-110 transition-transform shadow-inner">
              <Upload className="text-orange-600 w-12 h-12" />
            </div>
            <p className="font-titr text-xl text-orange-800">انتخاب تصویر یا دوربین</p>
            <p className="font-yekan text-orange-400 mt-2 text-sm text-center">برای کشف دنیای درون، نقاشی خود را اینجا بارگذاری کنید.</p>
          </div>
        ) : (
          <div className="relative group rounded-3xl overflow-hidden shadow-xl">
            <img src={preview} alt="Preview" className="w-full h-72 object-cover mb-1 transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <button 
                onClick={() => setPreview(null)}
                className="bg-red-500 text-white px-6 py-2 rounded-full font-titr text-lg shadow-lg hover:bg-red-600 transition-colors"
              >
                حذف و تغییر تصویر
              </button>
            </div>
          </div>
        )}

        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />

        <div className="mt-8 flex gap-4">
          <button 
            disabled={!preview}
            onClick={handleConfirm}
            className={`flex-1 py-4 rounded-2xl font-titr text-xl shadow-lg transition-all ${
              preview 
              ? 'bg-orange-500 text-white hover:bg-orange-600 hover:scale-[1.02] active:scale-95' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
            }`}
          >
            {preview ? 'تحلیل هوشمند ذهن' : 'تصویر را انتخاب کنید'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
