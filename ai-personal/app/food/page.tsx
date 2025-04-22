'use client'

import { useState } from "react";
import Navbar from "@/components/Navbar";

// USDA APIのレスポンスに基づく型
interface Nutrient {
  nutrientName: string;
  value: number;
}

interface Food {
  fdcId: number;
  description: string;
  foodNutrients: Nutrient[];
}

export default function FoodTracker() {
  const [mealType, setMealType] = useState("breakfast");
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Food[]>([]);
  const [selectedFoods, setSelectedFoods] = useState<Food[]>([]);

  const API_KEY = "YOUR_USDA_API_KEY";

  const searchFood = async () => {
    if (!query) return;
    const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&api_key=${API_KEY}`);
    const data = await response.json();
    setSearchResults(data.foods || []);
  };

  const addFood = (food: Food) => {
    setSelectedFoods([...selectedFoods, food]);
  };

  const totalCalories = selectedFoods.reduce((sum, food) => (
    sum + (food.foodNutrients.find(n => n.nutrientName === "Energy")?.value || 0)
  ), 0);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 flex flex-col items-center">
      <Navbar />

      <h1 className="text-3xl font-bold text-center mt-20 mb-6 drop-shadow">食事記録</h1>

      <div className="flex flex-col md:flex-row w-full max-w-6xl gap-6">
        {/* 左カラム：検索と選択 */}
        <div className="w-full md:w-1/2 bg-slate-800 p-6 rounded-xl shadow-lg">
          <label className="block text-sm font-medium mb-2">食事の種類</label>
          <select
            className="w-full p-3 rounded bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
          >
            <option value="breakfast">朝食</option>
            <option value="lunch">昼食</option>
            <option value="snack">間食</option>
            <option value="dinner">夕飯</option>
          </select>

          <div className="mt-6">
            <input
              type="text"
              placeholder="食品を検索"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-3 rounded bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={searchFood}
              className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition"
            >
              検索
            </button>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">検索結果</h2>
            <ul className="divide-y divide-slate-600">
              {searchResults.map(food => (
                <li key={food.fdcId} className="py-2 flex justify-between items-center">
                  <span className="text-sm">{food.description}</span>
                  <button
                    onClick={() => addFood(food)}
                    className="px-3 py-1 bg-green-500 hover:bg-green-400 rounded text-sm font-semibold"
                  >
                    追加
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 右カラム：選択済みリストとカロリー合計 */}
        <div className="w-full md:w-1/2 bg-slate-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold mb-2">選択した食品</h2>
          <div className="p-4 bg-slate-700 rounded-lg border border-slate-600 min-h-[200px]">
            {selectedFoods.length === 0 ? (
              <p className="text-gray-400 text-sm">ここに追加された食品が表示されます。</p>
            ) : (
              <ul className="text-sm space-y-2">
                {selectedFoods.map((food, index) => (
                  <li key={index}>
                    {food.description}（{food.foodNutrients.find(n => n.nutrientName === "Energy")?.value || 0} kcal）
                  </li>
                ))}
              </ul>
            )}
          </div>
          <h3 className="text-xl font-bold mt-6 text-center">
            合計カロリー: <span className="text-blue-400">{totalCalories}</span> kcal
          </h3>
        </div>
      </div>
    </div>
  );
}
