'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";

const Signup = () => {
    const [userForm,setUserForm] = useState({user_name:'',user_email:'',user_password:''});
    const router = useRouter();
    const [error,setError] = useState<string | null>(null);

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setUserForm({...userForm,[e.target.name]:e.target.value})
    }

    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();
        
        console.log(userForm);
        
        try{
            const response = await fetch("http://localhost:8080/api/user/signup",{
                method : 'POST',
                credentials : 'include',
                headers : {'Content-Type':'application/json'},
                body : JSON.stringify({
                    user_name : userForm.user_name,
                    user_email : userForm.user_email,
                    user_password : userForm.user_password,
                })
            });

            const data = await response.json();

            console.log(data);

            if(response.ok){
                router.push("/body-metrics");
            }else{
                if(data.errors){
                    setError(data.errors);
                }
            }

        }catch(e : any){
            console.log(e.message);
            setError(e.message);
        }
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-200 to-green-700 p-6 relative overflow-hidden">
      <h1 className="text-5xl font-extrabold text-white mb-4 text-center">新規登録</h1>
      <p className="text-lg text-white mb-6 text-center">健康的なライフスタイルを始めましょう！</p>
      <form onSubmit={handleSubmit} className="bg-gray-200 bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md">
        <label className="block mb-4">
          <input 
                type="text" 
                name="user_name" 
                placeholder='ユーザー名' 
                className="mt-1 block w-full border border-gray-600 rounded p-2 bg-white" 
                autoComplete='off'
                value={userForm.user_name}
                onChange={handleChange}
                />
        </label>
        <label className="block mb-4">
          <input 
                type="email" 
                name="user_email" 
                placeholder='メールアドレス'
                className="mt-8 block w-full border border-gray-600 rounded p-2 bg-white" 
                autoComplete='off' 
                value={userForm.user_email}
                onChange={handleChange}
                />
        </label>
        <label className="block mb-4">
          <input 
                type="password" 
                name="user_password" 
                placeholder='パスワード'
                className="mt-8 block w-full border border-gray-600 rounded p-2 bg-white" 
                autoComplete='off' 
                value={userForm.user_password}
                onChange={handleChange}
                />
        </label>
        <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded-lg w-full hover:bg-green-500 transition duration-300 mt-5">登録</button>
        <button onClick={() => window.location.href = '/'} type="button" className="bg-gray-600 text-white py-2 px-4 rounded-lg w-full hover:bg-gray-500 transition duration-300 mt-5">戻る</button>
      </form>
      <p className="text-center text-white mt-4">
        すでにアカウントをお持ちですか？ <Link href="/login" className="text-green-200 hover:underline">ログイン</Link>
      </p>
    </div>
  );
};

export default Signup; 