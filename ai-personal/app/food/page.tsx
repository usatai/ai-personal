'use client'

import { useState } from "react";
import Navbar from "@/components/Navbar";

interface Nutrient {
  nutrientName: string;
  value: number;
}

interface Food {
  fdcId: number;
  description: string;
  foodNutrients: Nutrient[];
  servingSize?: number;
  servingSizeUnit?: string;
}

export default function FoodTracker() {
  const [mealType, setMealType] = useState("breakfast");
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Food[]>([]);
  const [translatedNames, setTranslatedNames] = useState<Record<number, string>>({});
  const [selectedFoods, setSelectedFoods] = useState<Food[]>([]);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [units, setUnits] = useState<Record<number, "g" | "個">>({});
  const [isSaving, setIsSaving] = useState(false);

  const API_KEY = process.env.NEXT_PUBLIC_USDA_API_KEY;
  const GAS_TRANSLATE_URL = "https://script.google.com/macros/s/AKfycbzXnn0SVvd9XbrNN5pgsMYdgtceJUgC-RIwaiRMu_XWa4kPSDSAlD8PtiqUtFoGoZwx5g/exec";

  const translateText = async (text: string, sourceLang: string, targetLang: string): Promise<string> => {
    try {
      const response = await fetch(`${GAS_TRANSLATE_URL}?text=${encodeURIComponent(text)}&source=${sourceLang}&target=${targetLang}`);
      const data = await response.json();
      return data.text || text;
    } catch (e) {
      console.log("翻訳エラー:", e);
      return text;
    }
  };

  const searchFood = async () => {
    if (!query) return;

    const englishQuery = await translateText(query, "ja", "en");

    const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${englishQuery}&api_key=${API_KEY}`);
    const data = await response.json();
    const foods: Food[] = data.foods || [];
    setSearchResults(foods);

    // 翻訳処理
    const translations: Record<number, string> = {};
    await Promise.all(
      foods.map(async (food) => {
        const translated = await translateText(food.description, "en", "ja");
        translations[food.fdcId] = translated;        
      })
    );
    setTranslatedNames(translations);
  };

  const addFood = async (food: Food) => {
    const quantity = quantities[food.fdcId] || 1;
    const unit = units[food.fdcId] || "g";
    const energyPerUnit = food.foodNutrients.find(n => n.nutrientName === "Energy")?.value || 0;
    const proteinPerUnit = food.foodNutrients.find(n => n.nutrientName === "Protein")?.value || 0;
    const fatPerUnit = food.foodNutrients.find(n => n.nutrientName === "Total lipid (fat)")?.value || 0;
    const carbPerUnit = food.foodNutrients.find(n => n.nutrientName === "Carbohydrate, by difference")?.value || 0;

    const servingSize = food.servingSize || 100;

    let totalCalories = 0;
    let totalProtein  = 0
    let totalFat = 0
    let totalCarb = 0;

    if (unit === "g") {
      totalCalories = (energyPerUnit / servingSize) * quantity;
      totalProtein = (proteinPerUnit / servingSize) * quantity;
      totalFat = (fatPerUnit / servingSize) * quantity;
      totalCarb = (carbPerUnit / servingSize) * quantity;
    } else {
      totalCalories = energyPerUnit * quantity;
      totalProtein = proteinPerUnit  * quantity;
      totalFat = fatPerUnit * quantity;
      totalCarb = carbPerUnit  * quantity;
    }

    const translatedDescription = await translateText(food.description,"en","ja");

    const newFood: Food = {
        ...food,
        description: translatedDescription, // 翻訳済みの名前で保存
        servingSize: quantity,
        servingSizeUnit: unit,
        foodNutrients: [
        {nutrientName: "Energy",value: totalCalories},
        {nutrientName: "Protein",value: totalProtein},
        {nutrientName: "Total lipid (fat)",value: totalFat},
        {nutrientName: "Carbohydrate, by difference",value: totalCarb}
        ]
    };

    setSelectedFoods([...selectedFoods, newFood]);
  };

  const totalCalories = selectedFoods.reduce((sum, food) => (
    sum + (food.foodNutrients.find(n => n.nutrientName === "Energy")?.value || 0)
  ), 0);

  const totalProteins = selectedFoods.reduce((sum, food) => (
    sum + (food.foodNutrients.find(n => n.nutrientName === "Protein")?.value || 0)
  ), 0);

  const totalFats = selectedFoods.reduce((sum, food) => (
    sum + (food.foodNutrients.find(n => n.nutrientName === "Total lipid (fat)")?.value || 0)
  ), 0);

  const totalCarbos = selectedFoods.reduce((sum, food) => (
    sum + (food.foodNutrients.find(n => n.nutrientName === "Carbohydrate, by difference")?.value || 0)
  ), 0);

  const saveCalories = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("http://localhost:8080/api/fooddata/input", {
        method: "POST",
        credentials: 'include',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          mealType,
          foods: selectedFoods.map(food => ({
            description: food.description,
            calories: food.foodNutrients.find(n => n.nutrientName === "Energy")?.value || 0,
            protein : food.foodNutrients.find(n => n.nutrientName === "Protein")?.value || 0,
            fat : food.foodNutrients.find(n => n.nutrientName === "Total lipid (fat)")?.value || 0,
            carbohydrates : food.foodNutrients.find(n => n.nutrientName === "Carbohydrate, by difference")?.value || 0
          }))
        })
      });

      if (response.ok) {
        alert("データを保存しました！");
        setSelectedFoods([]);
      } else {
        alert("保存に失敗しました。");
      }
    } catch (error) {
      alert("エラーが発生しました。");
      console.error(error);
    }
    setIsSaving(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 flex flex-col items-center">
      <Navbar />

      <h1 className="text-3xl font-bold text-center mt-20 mb-6 drop-shadow">食事記録</h1>

      <div className="flex flex-col md:flex-row w-full max-w-6xl gap-6">
        {/* 左カラム */}
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
              {searchResults.map(food => {
                const energyPerUnit = food.foodNutrients.find(n => n.nutrientName === "Energy")?.value || 0;
                const servingSize = food.servingSize || 100;
                const unit = units[food.fdcId] || "g";
                const quantity = quantities[food.fdcId] || 0;

                let totalCalories = 0;
                
                if (unit === "g") {
                  totalCalories = quantity ? ((energyPerUnit / servingSize) * quantity) : 0;
                } else {
                  totalCalories = quantity ? (energyPerUnit * quantity) : 0;
                }

                return (
                  <li key={food.fdcId} className="py-2 flex flex-col gap-2">
                    <span className="text-sm">
                      {translatedNames[food.fdcId] || food.description}
                      （{servingSize}{food.servingSizeUnit || "g"}あたり {energyPerUnit}kcal）
                    </span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        value={quantities[food.fdcId] || ""}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          setQuantities(prev => ({ ...prev, [food.fdcId]: value }));
                        }}
                        className="w-20 p-1 rounded bg-slate-700 border border-slate-600 text-white text-sm"
                        placeholder="数量"
                      />
                      <select
                        value={units[food.fdcId] || "g"}
                        onChange={(e) => {
                          const value = e.target.value as "g" | "個";
                          setUnits(prev => ({ ...prev, [food.fdcId]: value }));
                        }}
                        className="p-1 rounded bg-slate-700 border border-slate-600 text-white text-sm"
                      >
                        <option value="g">g</option>
                        <option value="個">個</option>
                      </select>
                      <span className="text-sm">{totalCalories.toFixed(1)} kcal</span>
                      <button
                        onClick={() => addFood(food)}
                        className="px-3 py-1 bg-green-500 hover:bg-green-400 rounded text-sm font-semibold"
                      >
                        追加
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* 右カラム */}
        <div className="w-full md:w-1/2 bg-slate-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold mb-2">選択した食品</h2>
          <div className="p-4 bg-slate-700 rounded-lg border border-slate-600 min-h-[200px]">
            {selectedFoods.length === 0 ? (
              <p className="text-gray-400 text-sm">ここに追加された食品が表示されます。</p>
            ) : (
              <ul className="text-sm space-y-2">
                {selectedFoods.map((food, index) => (
                  <li key={index}>
                    {translatedNames[food.fdcId] || food.description}
                    （{food.servingSize}{food.servingSizeUnit}）
                    :<span className="mr-2">{food.foodNutrients.find(n => n.nutrientName === "Energy")?.value.toFixed(1) || 0} kcal</span>
                    <span className="mr-1">P: {food.foodNutrients.find(n => n.nutrientName === "Protein")?.value.toFixed(1) || 0}</span>
                    <span className="mr-1">F:{food.foodNutrients.find(n => n.nutrientName === "Total lipid (fat)")?.value.toFixed(1) || 0} </span>
                    C:{food.foodNutrients.find(n => n.nutrientName === "Carbohydrate, by difference")?.value.toFixed(1) || 0} 
                  </li>
                ))}
              </ul>
            )}
          </div>
          <h3 className="text-xl font-bold mt-6 text-center">
            合計カロリー: <span className="text-blue-400">{totalCalories.toFixed(1)}</span> kcal
            <p>P: <span className="text-blue-400">{totalProteins.toFixed(1)}</span></p>
            <p>F: <span className="text-blue-400">{totalFats.toFixed(1)}</span></p>
            <p>C: <span className="text-blue-400">{totalCarbos.toFixed(1)}</span></p>

          </h3>

          {selectedFoods.length > 0 && (
            <button
              onClick={saveCalories}
              disabled={isSaving}
              className="w-full mt-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-semibold transition"
            >
              {isSaving ? "保存中..." : "登録"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
