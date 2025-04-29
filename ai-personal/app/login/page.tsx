'use client'

import React, { useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';

const Login = () => {
  const [loginForm, setLoginForm] = useState({ user_name: '', user_password: '' });
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const getLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/user/login", {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: loginForm.user_name,
          userPassword: loginForm.user_password,
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("userId",data.userId);
        localStorage.setItem("createdAt",data.createdAt);
        router.push("/main");
      } else {
        if (data.errors) {
          setError(data.errors);
        }
      }

    } catch (e: any) {
      console.error(e);
      setError(e.message);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-4 text-center">ログイン</h1>
      <p className="text-gray-300 mb-8 text-center">あなたのアカウントにアクセスしましょう。</p>

      <form onSubmit={getLoginSubmit} className="bg-slate-800 p-8 rounded-xl shadow-xl w-full max-w-md">
        <div className="mb-6">
          <input
            type="text"
            name="username"
            placeholder="ユーザー名"
            required
            className="w-full p-3 rounded bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={loginForm.user_name}
            onChange={(e) => setLoginForm({ ...loginForm, user_name: e.target.value })}
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            name="password"
            placeholder="パスワード"
            required
            className="w-full p-3 rounded bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={loginForm.user_password}
            onChange={(e) => setLoginForm({ ...loginForm, user_password: e.target.value })}
          />
        </div>

        {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

        <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition">
          ログイン
        </button>

        <button type="button" onClick={() => router.push('/')} className="w-full py-3 mt-4 bg-slate-600 hover:bg-slate-500 rounded-lg font-semibold transition">
          戻る
        </button>
      </form>

      <p className="text-center mt-6 text-gray-400">
        パスワードをお忘れの方は{" "}
        <Link href="/signup" className="text-blue-400 hover:underline">こちら</Link>
      </p>
    </div>
  );
};

export default Login;
