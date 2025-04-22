'use client'

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Navbar from '@/components/Navbar';

const data = {
  todayMonth: [
    { name: '2025-01-01', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
    { name: '2025-01-02', weight: 64, caloriesBurned: 2200, caloriesIntake: 2400 },
    { name: '2025-01-03', weight: 63, caloriesBurned: 2100, caloriesIntake: 2300 },
    { name: '2025-01-04', weight: 62, caloriesBurned: 2500, caloriesIntake: 2600 },
    { name: '2025-01-05', weight: 61, caloriesBurned: 3000, caloriesIntake: 2500 },
    { name: '2025-01-06', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
  ],
};

export default function Main() {
  const [chartData, setChartData] = useState(data.todayMonth);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <Navbar />

      <h1 className="text-3xl font-bold text-center mt-20 mb-6 drop-shadow">AI Personal ダッシュボード</h1>

      <div className="flex flex-col items-center mb-10">
        <label className="mb-2 text-gray-300">月を選択:</label>
        <select className="bg-slate-800 border border-gray-600 rounded px-4 py-2 text-white w-full max-w-xs">
          <option value="2025-1">2025年1月</option>
          <option value="2025-3">2025年3月</option>
        </select>
      </div>

      <section className="bg-slate-800 p-6 rounded-xl shadow-lg mb-10">
        <h2 className="text-xl font-semibold text-center mb-2">食事 & トレーニング概要</h2>
        <p className="text-gray-300 text-center">ここに目標達成までの食事内容とトレーニングの詳細を表示します。</p>
      </section>

      <section className="bg-slate-800 p-6 rounded-xl shadow-lg mb-10">
        <h2 className="text-xl font-semibold text-center mb-4">体重の推移</h2>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="weight" stroke="#00bcd4" name="体重" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="bg-slate-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-center mb-4">カロリーの推移</h2>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="caloriesBurned" stroke="#4caf50" name="消費カロリー" />
              <Line type="monotone" dataKey="caloriesIntake" stroke="#ff9800" name="摂取カロリー" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
