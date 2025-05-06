'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await fetch('http://localhost:8080/api/user/password-reset-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('パスワード再設定用のメールを送信しました。');
      } else {
        setError(data.message || 'エラーが発生しました。');
      }
    } catch (err: any) {
      setError('サーバーに接続できませんでした。');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">パスワード再設定</h1>
      <p className="text-gray-300 mb-8 text-center">
        登録したメールアドレスを入力してください。<br />
        再設定用のリンクを送信します。
      </p>

      <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded-xl shadow-xl w-full max-w-md">
        {message && <p className="text-green-400 text-sm mb-4 text-center">{message}</p>}
        {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

        <div className="mb-6">
          <input
            type="email"
            placeholder="メールアドレス"
            className="w-full p-3 rounded bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition"
        >
          再設定リンクを送信
        </button>

        <button
          type="button"
          onClick={() => router.push('/login')}
          className="w-full py-3 mt-4 bg-slate-600 hover:bg-slate-500 rounded-lg font-semibold transition"
        >
          ログインに戻る
        </button>
      </form>
    </div>
  );
};

export default PasswordResetRequest;
