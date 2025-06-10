'use client'

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';

const BodyMetrics = () => {
  const [bodyData, setBodyData] = useState({
    user_height: '',
    user_weight: '',
    user_fat: '',
    user_goal_weight: '',
    user_goal_fat: '',
    user_goal_type: '',
    user_sport_type: '',
    user_taget_period: '',
  });

  const [error, setError] = useState<{[key: string]: string}>({});
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/bodydata/input", {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            user_height: bodyData.user_height === '' ? null : parseFloat(bodyData.user_height), // 空ならnull、そうでなければ数値に変換
            user_weight: bodyData.user_weight === '' ? null : parseFloat(bodyData.user_weight),
            user_fat: bodyData.user_fat === '' ? null : parseFloat(bodyData.user_fat),
            user_goal_weight: bodyData.user_goal_weight === '' ? null : parseFloat(bodyData.user_goal_weight),
            user_goal_fat: bodyData.user_goal_fat === '' ? null : parseFloat(bodyData.user_goal_fat),
            user_goal_type: bodyData.user_goal_type === '' ? null : bodyData.user_goal_type, // これは既に修正済み
            user_sport_type: bodyData.user_sport_type === '' ? null : bodyData.user_sport_type, // これは既に修正済み
            user_target_period: bodyData.user_taget_period === '' ? null : bodyData.user_taget_period, // String型も空ならnullに
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
          setError(data);
          console.log(data); 
      }

    } catch (e: any) {
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
          { key: 'user_height', label: '身長 (cm)' },
          { key: 'user_weight', label: '体重 (kg)' },
          { key: 'user_fat', label: '体脂肪率 (%)' },
          { key: 'user_goal_weight', label: '目標体重 (kg)' },
          { key: 'user_goal_fat', label: '目標体脂肪 (%)' },
        ].map(({ key, label }) => (
          <div key={key} className="mb-4">
            {error[key] && (
            <p className="text-red-400 text-sm mb-4 text-center">
                {error[key]}
            </p>
            )}
            <input
              type="text"
              placeholder={label}
              value={(bodyData as any)[key]}
              onChange={(e) => setBodyData({ ...bodyData, [key]: e.target.value })}
              className="w-full p-3 rounded bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        <div className="mb-4">
            {error.user_goal_type && (
                <p className="text-red-400 text-sm mb-4 text-center">
                {error.user_goal_type}
            </p>
            )}
          <select
            className="w-full p-3 rounded bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={bodyData.user_goal_type}
            onChange={(e) => setBodyData({ ...bodyData, user_goal_type: e.target.value })}
          >
            <option value="" disabled>目標タイプを選択</option>
            <option value="筋肥大">筋肥大</option>
            <option value="減量">減量</option>
            <option value="健康">健康</option>
          </select>
        </div>

        <div className="mb-4">
            {error.user_sport_type && (
                <p className="text-red-400 text-sm mb-4 text-center">
                {error.user_sport_type}
            </p>
            )}
          <select
            className="w-full p-3 rounded bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={bodyData.user_sport_type}
            onChange={(e) => setBodyData({ ...bodyData, user_sport_type: e.target.value })}
          >
            <option value="" disabled>運動タイプを選択</option>
            <option value="ジム">ジム</option>
            <option value="自宅">自宅</option>
          </select>
        </div>

        <div className="mb-6">
            {error.user_target_period && (
                <p className="text-red-400 text-sm mb-4 text-center">
                    {error.user_target_period}
                </p>
            )}
          <input
            type="text"
            placeholder="目標期間 (例: 3ヶ月)"
            value={bodyData.user_taget_period}
            onChange={(e) => setBodyData({ ...bodyData,user_taget_period: e.target.value })}
            className="w-full p-3 rounded bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

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
