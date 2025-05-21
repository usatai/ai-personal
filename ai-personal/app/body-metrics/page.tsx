'use client'

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';

const BodyMetrics = () => {
  const [bodyData, setBodyData] = useState({
    height: '',
    weight: '',
    fat: '',
    goalWeight: '',
    goalFat: '',
    goalType: '',
    sportType: '',
    tagetPeriod: '',
  });

  const [errors, setError] = useState<any>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/bodydata/input", {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_height: bodyData.height,
          user_weight: bodyData.weight,
          user_fat: bodyData.fat,
          user_goal_weight: bodyData.goalWeight,
          user_goal_fat: bodyData.goalFat,
          user_goal_Type: bodyData.goalType,
          user_sport_Type: bodyData.sportType,
          user_target_period: bodyData.tagetPeriod,
        })
      });

      const data = await response.json();
      const aiAdvice = data.aiAdvice;
      localStorage.setItem("aiAdvice",aiAdvice);

      if (response.ok) {
        const userId = localStorage.getItem("userId");
        const getResponse = await fetch(`http://localhost:8080/api/bodydata/userinfo?userId=${userId}`, {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        });

        if (getResponse.ok) {
          const userInfo = await getResponse.json();
          console.log(userInfo);
          router.push("/main");
        } else {
          console.error("ユーザー情報の取得に失敗しました");
        }
      } else {
        if (data.errors) {
          setError(data.errors);
        }
      }

    } catch (e: any) {
      console.log(e.message);
      setError(e.message);
    }

    console.log(bodyData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-6">
      <Navbar />

      <h1 className="text-4xl font-bold text-center mt-20 mb-2">データ入力画面</h1>
      <p className="text-gray-300 mb-8 text-center">目標達成のためのデータを入力してください。<br />AIがプランニングをサポートします。</p>

      <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded-xl shadow-xl w-full max-w-md">
        {[
          { key: 'height', label: '身長 (cm)' },
          { key: 'weight', label: '体重 (kg)' },
          { key: 'fat', label: '体脂肪率 (%)' },
          { key: 'goalWeight', label: '目標体重 (kg)' },
          { key: 'goalFat', label: '目標体脂肪 (%)' },
        ].map(({ key, label }) => (
          <div key={key} className="mb-4">
            <input
              type="text"
              placeholder={label}
              required
              value={(bodyData as any)[key]}
              onChange={(e) => setBodyData({ ...bodyData, [key]: e.target.value })}
              className="w-full p-3 rounded bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        <div className="mb-4">
          <select
            className="w-full p-3 rounded bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={bodyData.goalType}
            onChange={(e) => setBodyData({ ...bodyData, goalType: e.target.value })}
            required
          >
            <option value="" disabled>目標タイプを選択</option>
            <option value="筋肥大">筋肥大</option>
            <option value="減量">減量</option>
            <option value="健康">健康</option>
          </select>
        </div>

        <div className="mb-4">
          <select
            className="w-full p-3 rounded bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={bodyData.sportType}
            onChange={(e) => setBodyData({ ...bodyData, sportType: e.target.value })}
            required
          >
            <option value="" disabled>運動タイプを選択</option>
            <option value="ジム">ジム</option>
            <option value="自宅">自宅</option>
          </select>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="目標期間 (例: 3ヶ月)"
            value={bodyData.tagetPeriod}
            onChange={(e) => setBodyData({ ...bodyData, tagetPeriod: e.target.value })}
            required
            className="w-full p-3 rounded bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {errors && <p className="text-red-400 text-sm mb-4 text-center">{errors}</p>}

        <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition">
          登録
        </button>

        <button type="button" onClick={() => router.push('/main')} className="w-full py-3 mt-4 bg-slate-600 hover:bg-slate-500 rounded-lg font-semibold transition">
          戻る
        </button>
      </form>
    </div>
  );
};

export default BodyMetrics;
