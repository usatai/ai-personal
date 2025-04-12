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

  const addFood = (food : Food) => {
    setSelectedFoods([...selectedFoods, food]);
  };

  const totalCalories = selectedFoods.reduce((sum, food) => sum + (food.foodNutrients.find(n => n.nutrientName === "Energy")?.value || 0), 0);

  return (
    <div className="p-4 bg-blue-400 min-h-screen flex flex-col items-center">
        <Navbar />
        <h1 className="text-3xl font-bold mb-4 text-blue-900 text-center pt-20">食事記録</h1>

        <div className="flex flex-col md:flex-row w-full max-w-4xl gap-6">
      
            <div className="w-full md:w-1/2 bg-gray-200 p-4 rounded-lg shadow-md mt-10">
                <label className="mb-6 flex flex-col items-center">食事の種類を選択</label>
                    <select className="p-2 rounded border border-gray-600 bg-white w-full" value={mealType} onChange={(e) => setMealType(e.target.value)}>
                        <option value="breakfast">朝食</option>
                        <option value="lunch">昼食</option>
                        <option value="snack">間食</option>
                        <option value="dinner">夕飯</option>
                    </select>
            
                
                <div className="mt-4 flex flex-col">
                    <input
                    type="text"
                    placeholder="食品を検索"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="p-2 rounded border border-gray-600 bg-white w-full"
                    />
                    <button onClick={searchFood} className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-500 transition duration-300 mt-5">検索</button>
                </div>
                
                <div className="mt-4">
                    <h2 className="text-lg font-bold">検索結果</h2>
                    <ul>
                    {searchResults.map(food => (
                        <li key={food.fdcId} className="flex justify-between p-2 border-b">
                        <span>{food.description}</span>
                        <button onClick={() => addFood(food)} className="p-1 bg-green-500 text-white rounded">追加</button>
                        </li>
                    ))}
                    </ul>
                </div>
            </div>

            {/* 追加された食品を表示する空白のボックス */}
            <div className="w-full md:w-1/2 bg-gray-200 p-4 rounded-lg shadow-md mt-10">
                <h2 className="text-lg font-bold">選択した食品</h2>
                <div className="p-4 border-2 border-dashed border-gray-400 bg-gray-50">
                {selectedFoods.length === 0 ? (
                    <p className="text-gray-600">ここに追加された食品が表示されます</p>
                ) : (
                    <ul>
                    {selectedFoods.map((food, index) => (
                        <li key={index} className="p-2 border-b">
                        {food.description} ({food.foodNutrients.find(n => n.nutrientName === "Energy")?.value || 0} kcal)
                        </li>
                    ))}
                    </ul>
                )}
                </div>
                <h3 className="text-xl font-bold mt-4">合計カロリー: {totalCalories} kcal</h3>
            </div>
        </div>
    </div>
  );
}