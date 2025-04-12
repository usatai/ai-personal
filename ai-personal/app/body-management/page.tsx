'use client'

import Navbar from "@/components/Navbar";
import { useState } from "react";

const page = () => {

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-blue-400 min-h-screen">

            <Navbar />
            <h1 className="text-3xl font-extrabold text-blue-900 mb-4 text-center">進捗データ入力</h1>
            <form className="bg-gray-200 bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md mt-5">
                <label className="block mb-4">
                    <input
                        type="number"
                        placeholder="体重 (kg)"
                        required
                        className="mt-1 block w-full border border-gray-600 rounded p-2 bg-white"
                    />
                </label>
                <label className="block mb-4">
                    <input
                        type="number"
                        placeholder="体脂肪率 (%)"
                        required
                        className="mt-1 block w-full border border-gray-600 rounded p-2 bg-white"
                    />
                </label>
                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-500 transition duration-300 mt-5">登録</button>
                <button type="button" onClick={() => window.location.href = '/main'} className="bg-gray-600 text-white py-2 px-4 rounded-lg w-full hover:bg-gray-500 transition duration-300 mt-5">戻る</button>
            </form>
        </div>
    );
}

export default page;