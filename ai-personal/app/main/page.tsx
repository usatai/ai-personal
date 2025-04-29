'use client'

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Navbar from '@/components/Navbar';

interface YearMonth {
    year: number;
    month: number;
  }

export default function Main() {
    const [userInfo,setUserInfo] = useState<any>();
    const [selectOptions, setSelectOptions] = useState<YearMonth[]>([]);
    const [selectedMonth,setSelectedMonth] = useState<string>("");

    useEffect(() => {
        const createdAt = localStorage.getItem("createdAt");
        const options: YearMonth[] = [];
        const today = new Date();

        if (createdAt !== null) {
            const registerDate = new Date(createdAt);
            let year = registerDate.getFullYear();
            let month = registerDate.getMonth() + 1;

            while (year < today.getFullYear() || (year === today.getFullYear() && month <= today.getMonth() + 1)) {
                options.push({ year, month });
          
                month++;
                if (month > 12) {
                  month = 1;
                  year++;
                }
            }
        }
        setSelectOptions(options);
    },[])
 
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const fetchTodayMonthData = async () => {
            if (userId == null || typeof userId === 'undefined') {
                return;
            }

            const getResponse = await fetch(`http://localhost:8080/api/bodydata/userinfo?userId=${userId}`,{
                method : "GET",
                credentials : "include",
                headers : {'Content-Type' : 'application/json'}
            });
            const userInfo = await getResponse.json();
                if (getResponse.ok) {
                    setUserInfo(userInfo.todayMonth);            
                }
        };
        fetchTodayMonthData();
    },[])

    const handleChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(e.target.value);
    }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <Navbar />

      <h1 className="text-3xl font-bold text-center mt-20 mb-6 drop-shadow">AI Personal ダッシュボード</h1>

      <div className="flex flex-col items-center mb-10">
        <select 
            value={selectedMonth}
            onChange={handleChange}
            className="bg-slate-800 border border-gray-600 rounded px-4 py-2 text-white w-full max-w-xs"
        >
            <option value="">月を選択</option>
            {selectOptions.map((ym,idx) => (
                <option key={idx} value={`${ym.year}-${ym.month}`}>
                    {ym.year}年{ym.month}月
                </option>
            ))}
        </select>
      </div>

      <section className="bg-slate-800 p-6 rounded-xl shadow-lg mb-10">
        <h2 className="text-xl font-semibold text-center mb-2">食事 & トレーニング概要</h2>
        <p className="text-gray-300 text-center">ここに目標達成までの食事内容とトレーニングの詳細を表示します。</p>
      </section>

      <section className="bg-slate-800 p-6 rounded-xl shadow-lg mb-10">
        <h2 className="text-xl font-semibold text-center mb-4">体重・体脂肪の推移</h2>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={userInfo}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="weight" stroke="#4caf50" name="体重" />
              <Line type="monotone" dataKey="fat" stroke="#ff9800" name="体脂肪" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="bg-slate-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-center mb-4">摂取カロリーの推移</h2>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={userInfo}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="caloriesBurned" stroke="#4caf50" name="目標摂取カロリー" />
              <Line type="monotone" dataKey="caloriesIntake" stroke="#ff9800" name="摂取カロリー" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
