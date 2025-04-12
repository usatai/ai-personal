'use client'

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend ,ResponsiveContainer} from 'recharts';
import Navbar from '@/components/Navbar';

const data = {
  todayMonth: [
    { name: '2025-01-01', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
    { name: '2025-01-02', weight: 64, caloriesBurned: 2200, caloriesIntake: 2400 },
    { name: '2025-01-03', weight: 63, caloriesBurned: 2100, caloriesIntake: 2300 },
    { name: '2025-01-04', weight: 62, caloriesBurned: 2500, caloriesIntake: 2600 },
    { name: '2025-01-05', weight: 61, caloriesBurned: 3000, caloriesIntake: 2500 },
    { name: '2025-01-06', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
    { name: '2025-01-07', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
    { name: '2025-01-08', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
    { name: '2025-01-09', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
    { name: '2025-01-10', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
    { name: '2025-01-11', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
    { name: '2025-01-12', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
    { name: '2025-01-13', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
    { name: '2025-01-14', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
    { name: '2025-01-15', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
    { name: '2025-01-16', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
    { name: '2025-01-17', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
    { name: '2025-01-18', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
    { name: '2025-01-19', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
    { name: '2025-01-20', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
    { name: '2025-01-21', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
    { name: '2025-01-22', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
    { name: '2025-01-23', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
    { name: '2025-01-24', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
    { name: '2025-01-25', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
    { name: '2025-01-26', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
    { name: '2025-01-27', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
    { name: '2025-01-28', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
    { name: '2025-01-29', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
    { name: '2025-01-30', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
    { name: '2025-01-31', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
    

  ],
  past: {
    '2025-1': [
        { name: '2025-01-01', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
        { name: '2025-01-02', weight: 64, caloriesBurned: 2200, caloriesIntake: 2400 },
        { name: '2025-01-03', weight: 63, caloriesBurned: 2100, caloriesIntake: 2300 },
        { name: '2025-01-04', weight: 62, caloriesBurned: 2500, caloriesIntake: 2600 },
        { name: '2025-01-05', weight: 61, caloriesBurned: 3000, caloriesIntake: 2500 },
        { name: '2025-01-06', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
        { name: '2025-01-07', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
        { name: '2025-01-08', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
        { name: '2025-01-09', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
        { name: '2025-01-10', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
        { name: '2025-01-11', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
        { name: '2025-01-12', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
        { name: '2025-01-13', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
        { name: '2025-01-14', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
        { name: '2025-01-15', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
        { name: '2025-01-16', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
        { name: '2025-01-17', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
        { name: '2025-01-18', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
        { name: '2025-01-19', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
        { name: '2025-01-20', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
        { name: '2025-01-21', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
        { name: '2025-01-22', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
        { name: '2025-01-23', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
        { name: '2025-01-24', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
        { name: '2025-01-25', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
        { name: '2025-01-26', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
        { name: '2025-01-27', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
        { name: '2025-01-28', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
        { name: '2025-01-29', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
        { name: '2025-01-30', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
        { name: '2025-01-31', weight: 65, caloriesBurned: 2000, caloriesIntake: 2500 },
      // 他の日付のデータ...
    ],
    // 他の日付のデータ...
  }
};

export default function Main() {
    const [chartData, setChartData] = useState(data.todayMonth);
  
    return (
      <div className="p-4 bg-blue-400 min-h-screen">

        <Navbar />

        <h1 className="text-2xl font-bold mb-4 text-blue-900 text-center pt-20">AI Personal</h1>
        
        <div className="mb-6 flex flex-col items-center">
          <label className="text-white mb-2">月を選択:</label>
          <select className="p-2 rounded bg-white w-full max-w-xs">
            <option value="2025-1">2025年1月</option>
            <option value="今日">2025年3月</option>
          </select>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg shadow-lg mb-20">
            <h3 className="text-lg font-bold mb-2 text-white text-center">食事内容 & トレーニング概要</h3>
            <p className="text-white text-center">ここに目標達成までの食事内容とトレーニングの詳細を表示します。</p>
        </div>
        
        <div className="bg-gray-700 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-2 text-white text-center">体重の推移</h2>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="weight" stroke="#8884d8" name="体重" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        </div>
  
        <div className="grid grid-cols-1 gap-6 mt-6">
          <div className="bg-gray-700 p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4 text-white text-center">摂取カロリー vs 目標摂取カロリー</h3>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="caloriesBurned" stroke="#82ca9d" name="消費カロリー" />
                  <Line type="monotone" dataKey="caloriesIntake" stroke="#ff7300" name="目標摂取カロリー" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }