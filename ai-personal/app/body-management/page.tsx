'use client'

import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ProgressInput = () => {
    const [progressData,setProgressData] = useState({progressWeight:'',progressFat:''});
    const router = useRouter();
    const [error,setError] = useState<{[key: string]: string}>({});

    const submitProgressData = async (e: React.FormEvent) => {
        e.preventDefault();

        try{
            const response = await fetch("http://localhost:8080/api/bodydata/progress",{
                method : 'POST',
                credentials : 'include',
                headers : {'Content-Type':'application/json'},
                body : JSON.stringify({
                    progressWeight: progressData.progressWeight,
                    progressFat: progressData.progressFat,
                })
            });
    
            const data = await response.json();
    
            if(response.ok) {
                router.push("/main");
            } else {
                setError(data);
            }

        } catch (e: any) {
            console.error(e.message);
            setError({general : "サーバーエラー発生"});
          }
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-6">
      <Navbar />

      <h1 className="text-3xl font-bold text-center mt-20 mb-6 drop-shadow">進捗データ入力</h1>

      <form onSubmit={submitProgressData} className="bg-slate-800 p-8 rounded-xl shadow-xl w-full max-w-md">

        <div className="mb-6">
        {error.progressWeight && (
        <p className="text-red-400 text-sm mb-4 text-center">
            {error.progressWeight}
        </p>
        )}
          <input
            type="number"
            placeholder="体重 (kg)"
            className="w-full p-3 rounded bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setProgressData({...progressData, progressWeight: e.target.value})}
          />
        </div>

        <div className="mb-6">
        {error.progressFat && (
        <p className="text-red-400 text-sm mb-4 text-center">
            {error.progressFat}
        </p>
        )}
          <input
            type="number"
            placeholder="体脂肪率 (%)"
            className="w-full p-3 rounded bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setProgressData({...progressData, progressFat: e.target.value})}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition"
        >
          登録
        </button>

        <button
          type="button"
          onClick={() => window.location.href = '/main'}
          className="w-full py-3 mt-4 bg-slate-600 hover:bg-slate-500 rounded-lg font-semibold transition"
        >
          戻る
        </button>
      </form>
    </div>
  );
};

export default ProgressInput;
