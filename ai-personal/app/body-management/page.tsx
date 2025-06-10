'use client'

import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useState , useEffect} from "react";

const ProgressInput = () => {
    // 本日までの日付リストを格納するstate
    const [datesOfMonth, setDatesOfMonth] = useState<string[]>([]);
    const [progressData,setProgressData] = useState({createdAt:'',progressWeight:'',progressFat:''});
    const router = useRouter();
    const [error,setError] = useState<{[key: string]: string}>({});

    // コンポーネントがマウントされた時に一度だけ日付リストを生成する
    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1; // getMonth()は0から始まるため+1する
        const day = today.getDate();

        const datesArray: string[] = [];
        // 今月の1日から今日までループ
        for (let i = 1; i <= day; i++) {
            // YYYY-MM-DD形式にフォーマットする
            const dateString = `${year}-${String(month).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            datesArray.push(dateString);
        }

        setDatesOfMonth(datesArray);
    }, []); // 空の依存配列[]を指定することで、初回レンダリング時のみ実行される

    const submitProgressData = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log(progressData.createdAt);

        try{
            const response = await fetch("http://localhost:8080/api/bodydata/progress",{
                method : 'POST',
                credentials : 'include',
                headers : {'Content-Type':'application/json'},
                body : JSON.stringify({
                    createdAt : progressData.createdAt,
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
        {error && (
        <p className="text-red-400 text-sm mb-4 text-center">
            {error.progressWeight}
        </p>
        )}
        <select
            className="w-full p-3 rounded bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => {
                const dateTimeString = e.target.value + 'T00:00:00';
                setProgressData({...progressData, createdAt: dateTimeString})
            }}
        >
        <option value="">日付を選択してください</option>
        {datesOfMonth.map((date) => (
            <option key={date} value={date}>
                {date}
            </option>
        ))}
        </select>
    </div>

        <div className="mb-6">
        {error.progressWeight && (
        <p className="text-red-400 text-sm mb-4 text-center">
            {error.progressWeight}
        </p>
        )}
          <input
            type="text"
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
            type="text"
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
