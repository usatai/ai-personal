'use client'

import { useState , useEffect} from 'react';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';

const BodyMetrics = () => {
    const [bodyData,setBodyData] = useState({
        height : '', // 身長
        weight : '', // 体重
        fat : '', // 体脂肪率
        goalWeight : '', // 目標体重
        goalFat : '', // 目標体脂肪
        goalType : '', // 目標タイプ
        tagetPeriod : '', // 目標期間
    });

    const [errors,setError] = useState(null);
    const router = useRouter();

  const handleSubmit = async (event : React.FormEvent) => {
    event.preventDefault();

    try {
        const response = await fetch("http://localhost:8080/api/bodydata/input",{
            method : 'POST',
            credentials : 'include',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({
                user_height : bodyData.height,
                user_weight : bodyData.weight,
                user_fat : bodyData.fat,
                user_goal_weight : bodyData.goalWeight,
                user_goal_fat : bodyData.goalFat,
                user_goal_Type : bodyData.goalType,
                user_target_period : bodyData.tagetPeriod,
            })            
        });

        const data = await response.json();

        console.log(data.message);

        if(response.ok){
            router.push("/main");
        }else{
            if(data.errors){
                setError(data.errors);
            }
        }

    }catch(e : any){
        console.log(e.message);
        setError(e.message);
    }
    
    console.log(bodyData);
    // ここでAIからの応答を処理するロジックを追加
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-blue-400 min-h-screen">

      <Navbar />

      <h1 className="text-4xl font-extrabold text-blue-900 mb-4 text-center pt-20">データ入力画面</h1>
      <p className="text-lg text-white mb-6 text-center">まずは目標達成のためのデータを入力してください。<br />AIが目標に沿ったプランニングをしてくれます。</p>
      <form onSubmit={handleSubmit} className="bg-gray-200 bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md">
        <label className="block mb-4">
          <input
            type="number"
            placeholder="身長 (cm)"
            value={bodyData.height}
            onChange={(e) => setBodyData({...bodyData,height: e.target.value})}
            required
            className="mt-1 block w-full border border-gray-600 rounded p-2 bg-white"
          />
        </label>
        <label className="block mb-4">
          <input
            type="number"
            placeholder="体重 (kg)"
            value={bodyData.weight}
            onChange={(e) => setBodyData({...bodyData,weight: e.target.value})}
            required
            className="mt-1 block w-full border border-gray-600 rounded p-2 bg-white"
          />
        </label>
        <label className="block mb-4">
          <input
            type="number"
            placeholder="体脂肪率 (%)"
            value={bodyData.fat}
            onChange={(e) => setBodyData({...bodyData,fat: e.target.value})}
            required
            className="mt-1 block w-full border border-gray-600 rounded p-2 bg-white"
          />
        </label>
        <label className="block mb-4">
          <input
            type="number"
            placeholder="目標体重 (kg)"
            value={bodyData.goalWeight}
            onChange={(e) => setBodyData({...bodyData,goalWeight: e.target.value})}
            required
            className="mt-1 block w-full border border-gray-600 rounded p-2 bg-white"
          />
        </label>
        <label className="block mb-4">
          <input
            type="number"
            placeholder="目標体脂肪 (%)"
            value={bodyData.goalFat}
            onChange={(e) => setBodyData({...bodyData,goalFat: e.target.value})}
            required
            className="mt-1 block w-full border border-gray-600 rounded p-2 bg-white"
          />
        </label>
        <label className="block mb-4">
          <select 
                className="mt-1 block w-full border border-gray-600 rounded p-2 bg-white"
                onChange={(e) => setBodyData({...bodyData,goalType:e.target.value})}
                value={bodyData.goalType}
            >
            <option value="" disabled>選択してください</option>
            <option value="筋肥大">筋肥大</option>
            <option value="減量">減量</option>
            <option value="健康">健康</option>
          </select>
        </label>
        <label className="block mb-4">
          <input
            type="text"
            placeholder="目標期間 (例: 3ヶ月)"
            value={bodyData.tagetPeriod}
            onChange={(e) => setBodyData({...bodyData,tagetPeriod: e.target.value})}
            required
            className="mt-1 block w-full border border-gray-600 rounded p-2 bg-white"
          />
        </label>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-500 transition duration-300 mt-5">登録</button>
        <button onClick={() => window.location.href = '/main'} type="button" className="bg-gray-600 text-white py-2 px-4 rounded-lg w-full hover:bg-gray-500 transition duration-300 mt-5">戻る</button>
      </form>
    </div>
  );
};

export default BodyMetrics;