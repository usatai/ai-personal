'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";

const Signup = () => {
  const [userForm, setUserForm] = useState({ user_name: '', user_email: '', user_password: '' });
  const router = useRouter();
  const [error, setError] = useState<{[key: string]: string}>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/user/signup", {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: userForm.user_name,
          userEmail: userForm.user_email,
          userPassword: userForm.user_password,
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("userId",data.userId);
        router.push("/body-metrics");
      } else {
        setError(data);
      }

    } catch (e: any) {
      console.error(e.message);
      setError({general : "サーバーエラー発生"});
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-4 text-center">新規登録</h1>
      <p className="text-gray-300 mb-8 text-center">健康的なライフスタイルを始めましょう！</p>

      <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded-xl shadow-xl w-full max-w-md">
        <div className="mb-6">
        {error.userName && (
        <p className="text-red-400 text-sm mb-4 text-center">
            {error.userName}
        </p>
        )}
          <input
            type="text"
            name="user_name"
            placeholder="ユーザー名"
            className="w-full p-3 rounded bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={userForm.user_name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
        {error.userEmail && (
        <p className="text-red-400 text-sm mb-4 text-center">
            {error.userEmail}
        </p>
        )}
          <input
            type="email"
            name="user_email"
            placeholder="メールアドレス"
            className="w-full p-3 rounded bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={userForm.user_email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
        {error.userPassword && (
        <p className="text-red-400 text-sm mb-4 text-center">
            {error.userPassword}
        </p>
        )}
          <input
            type="password"
            name="user_password"
            placeholder="パスワード"
            className="w-full p-3 rounded bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={userForm.user_password}
            onChange={handleChange}
          />
        </div>


        <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition">
          登録
        </button>

        <button type="button" onClick={() => router.push('/')} className="w-full py-3 mt-4 bg-slate-600 hover:bg-slate-500 rounded-lg font-semibold transition">
          戻る
        </button>
      </form>

      <p className="text-center mt-6 text-gray-400">
        すでにアカウントをお持ちですか？{" "}
        <Link href="/login" className="text-blue-400 hover:underline">ログイン</Link>
      </p>
    </div>
  );
};

export default Signup;
