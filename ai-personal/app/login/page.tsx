'use client'

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { ReactFormState } from 'react-dom/client';

const Login = () => {
    const [loginForm,setLoginForm] = useState({user_name:'',user_password:''});
    const router = useRouter();
    const [error,setError] = useState<string | null>(null);

    const getLoginSubmit = async (e : React.FormEvent) => {
        e.preventDefault();

        try{
            const response = await fetch("http://localhost:8080/api/user/login",{
                method : 'POST',
                credentials : 'include',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify({
                    user_name : loginForm.user_name,
                    user_password : loginForm.user_password,
                })
            });

            console.log(loginForm);

            const data = await response.json();

            if(response.ok){
                router.push("/main");
            } else {
                if (data.errors) {
                    setError(data.errors);
                }
            }

        }catch(e : any){
            console.log(e);
        }

    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen  bg-gradient-to-r from-blue-200 to-blue-700 p-6 relative overflow-hidden">
            <h1 className="text-5xl font-extrabold text-white mb-4 text-center">ログイン</h1>
            <p className="text-lg text-white mb-6 text-center">あなたのアカウントにアクセスしましょう。</p>

            <form onSubmit={getLoginSubmit} className="bg-gray-200 bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md">
                <label className="block mb-4">
                    <input 
                        type="text" 
                        name="username" 
                        placeholder='ユーザー名' 
                        required 
                        className="mt-1 block w-full border border-gray-600 rounded p-2 bg-white" 
                        value={loginForm.user_name}
                        onChange={(e) => setLoginForm({...loginForm, user_name: e.target.value})}
                    />
                </label>
                <label className="block mb-4">
                    <input 
                        type="password" 
                        name="password" 
                        placeholder='パスワード' 
                        required 
                        className="mt-8 block w-full border border-gray-600 rounded p-2 bg-white" 
                        value={loginForm.user_password}
                        onChange={(e) => setLoginForm({...loginForm, user_password: e.target.value})}
                    />
                </label>
                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-500 transition duration-300 mt-5">ログイン</button>
                <button onClick={() => window.location.href = '/'} type="button" className="bg-gray-600 text-white py-2 px-4 rounded-lg w-full hover:bg-gray-500 transition duration-300 mt-5">戻る</button>
            </form>

            <p className="text-center text-white mt-4">
                パスワードをお忘れの方 <Link href="/signup" className="text-blue-200 hover:underline">こちら</Link>
            </p>
        </div>
    );
};

export default Login; 