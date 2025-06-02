'use client'

import { useState } from "react";
import Navbar from "@/components/Navbar";

interface Food {
  id: number;
  foodName: string;
  calories: number;
  protein: number;
  fat: number;
  carbohydrates: number;
  servingSize?: number;
  servingSizeUnit?: string;
}

interface SelectedFood extends Food {
    quantity: number;
    unit: "g" | "個";
}

export default function FoodTracker() {
  const [mealType, setMealType] = useState("breakfast");
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Food[]>([]);
  const [translatedNames, setTranslatedNames] = useState<Record<number, string>>({});
  const [selectedFoods, setSelectedFoods] = useState<SelectedFood[]>([]);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [units, setUnits] = useState<Record<number, "g" | "個">>({});
  const [isSaving, setIsSaving] = useState(false);
  const [searchMessage, setSearchMessage] = useState<string>("");

    const searchFood = async () => {
        console.log(query);
        setSearchMessage("検索中...");

        const response = await fetch(`http://localhost:8080/api/fooddata/foodlist?query=${query}`,{
            method : "GET",
            credentials : "include"
        });
        const data : Food[] = await response.json();
        console.log(data);
        setSearchResults(data);
        setSearchMessage(data.length > 0 ? `${data.length}件の食品が見つかりました` : "該当する食品が見つかりませんでした");
    }

    const addFood = (food: Food) => {
        const selectedQuantity = quantities[food.id];
        const selectedUnit = units[food.id] || "g";

        const newSelectedFood: SelectedFood = {
            ...food,
            quantity: selectedQuantity,
            unit: selectedUnit,
        };

        setSelectedFoods(prev => [...prev, newSelectedFood]);
        setSearchMessage(`${food.foodName}を追加しました`);
    }

    const saveCalories = async () => {
        setIsSaving(true);
        try {
            const response = await fetch("http://localhost:8080/api/fooddata/input", {
                method: "POST",
                credentials: 'include',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    mealType,
                    foods: selectedFoods.map(food => {
                        const multiplier = food.unit === "g" 
                            ? (food.quantity / (food.servingSize || 100)) 
                            : food.quantity;
                        
                        return {
                            description: food.foodName,
                            calories: (food.calories || 0) * multiplier,
                            protein: (food.protein || 0) * multiplier,
                            fat: (food.fat || 0) * multiplier,
                            carbohydrates: (food.carbohydrates || 0) * multiplier
                        };
                    })
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
            {searchMessage && (
              <p className="mt-2 text-sm text-blue-400">{searchMessage}</p>
            )}
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">検索結果</h2>
            <ul className="divide-y divide-slate-600">
              {searchResults.map(food => {
                const energyPerUnit = food.calories || 0;
                const servingSize = food.servingSize || 100;
                const unit = units[food.id] || "g";
                const quantity = quantities[food.id] || 0;

                let totalCalories = 0;
                
                if (unit === "g") {
                  totalCalories = quantity ? ((energyPerUnit / servingSize) * quantity) : 0;
                } else {
                  totalCalories = quantity ? (energyPerUnit * quantity) : 0;
                }

                return (
                  <li key={food.id} className="py-2 flex flex-col gap-2">
                    <span className="text-sm">
                      {translatedNames[food.id] || food.foodName}
                      （{servingSize}{food.servingSizeUnit || "g"}あたり {energyPerUnit}kcal）
                    </span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        value={quantities[food.id] || ""}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          setQuantities(prev => ({ ...prev, [food.id]: value }));
                        }}
                        className="w-20 p-1 rounded bg-slate-700 border border-slate-600 text-white text-sm"
                        placeholder="数量"
                      />
                      <select
                        value={units[food.id] || "g"}
                        onChange={(e) => {
                          const value = e.target.value as "g" | "個";
                          setUnits(prev => ({ ...prev, [food.id]: value }));
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
                {selectedFoods.map((food, index) => {
                  const multiplier = food.unit === "g" ? (food.quantity / (food.servingSize || 100)) : food.quantity;
                  return (
                    <li key={index}>
                      {food.foodName}
                      ({food.quantity}{food.unit})
                      :<span className="mr-2">{((food.calories || 0) * multiplier).toFixed(1)} kcal</span>
                      <span className="mr-1">P: {((food.protein || 0) * multiplier).toFixed(1)}</span>
                      <span className="mr-1">F:{((food.fat || 0) * multiplier).toFixed(1)} </span>
                      C:{((food.carbohydrates || 0) * multiplier).toFixed(1)} 
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <h3 className="text-xl font-bold mt-6 text-center">
            合計カロリー: <span className="text-blue-400">
              {selectedFoods.reduce((total, food) => {
                const multiplier = food.unit === "g" ? (food.quantity / (food.servingSize || 100)) : food.quantity;
                return total + (food.calories * multiplier);
              }, 0).toFixed(1)}
            </span> kcal
            <p>P: <span className="text-blue-400">
              {selectedFoods.reduce((total, food) => {
                const multiplier = food.unit === "g" ? (food.quantity / (food.servingSize || 100)) : food.quantity;
                return total + (food.protein * multiplier);
              }, 0).toFixed(1)}
            </span>g</p>
            <p>F: <span className="text-blue-400">
              {selectedFoods.reduce((total, food) => {
                const multiplier = food.unit === "g" ? (food.quantity / (food.servingSize || 100)) : food.quantity;
                return total + (food.fat * multiplier);
              }, 0).toFixed(1)}
            </span>g</p>
            <p>C: <span className="text-blue-400">
              {selectedFoods.reduce((total, food) => {
                const multiplier = food.unit === "g" ? (food.quantity / (food.servingSize || 100)) : food.quantity;
                return total + (food.carbohydrates * multiplier);
              }, 0).toFixed(1)}
            </span>g</p>
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

