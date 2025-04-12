import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-blue-700 p-6 relative overflow-hidden">
      <h1 className="text-4xl font-extrabold text-blue-900 mb-4 text-center transform transition-transform duration-500 hover:scale-105">AI Personal</h1>
      <h2 className="text-4xl font-extrabold text-white mb-4 text-center transform transition-transform duration-500 hover:scale-105 mt-5">目標達成のための<br />生活習慣プランニングツール</h2>
      <p className="text-1xl text-white mb-6 opacity-90 transition-opacity duration-500 hover:opacity-100 text-center">あなたの健康をサポートします。新規登録またはログインしてください。</p>
      <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 mb-6">
        <Link href="/signup" className="bg-green-700 text-white py-4 px-8 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-110 hover:bg-green-600 hover:shadow-2xl mb-3 md:mb-0">新規登録</Link>
        <Link href="/login" className="bg-blue-700 text-white py-4 px-8 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-110 hover:bg-blue-600 hover:shadow-2xl">ログイン</Link>
      </div>
      <div className="max-w-3xl text-center text-white mb-10">
        <h2 className="text-2xl font-bold mb-4 mt-4">自分に合ったトレーニングってなんだろう？何から始めればいいんだろう？を解決します。</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <div className="bg-gray-900 bg-opacity-90 p-8 rounded-lg shadow-lg transition-transform duration-300 hover:shadow-2xl hover:scale-105 mt-5">
            <h3 className="text-2xl font-bold mb-2">🏋️‍♀️ 自動トレーニング提案</h3>
            <p>身長、体重、体脂肪、目標を入力するだけで、AIがあなたが達成したい目標に対しての最適なトレーニングと摂取カロリーを自動で提案します。</p>
          </div>
          <div className="bg-gray-900 bg-opacity-90 p-8 rounded-lg shadow-lg transition-transform duration-300 hover:shadow-2xl hover:scale-105 mt-5">
            <h3 className="text-2xl font-bold mb-2">🍽️ 食事記録</h3>
            <p>食材を入力するだけで、カロリー計算を自動で行い、健康的な食生活をサポートします。</p>
          </div>
          <div className="bg-gray-900 bg-opacity-90 p-8 rounded-lg shadow-lg transition-transform duration-300 hover:shadow-2xl hover:scale-105 mt-5">
            <h3 className="text-2xl font-bold mb-2">📊 進捗管理</h3>
            <p>目標に対して、体重 / 体脂肪率 / 筋肉量の推移を可視化します。</p>
          </div>
          <div className="bg-gray-900 bg-opacity-90 p-8 rounded-lg shadow-lg transition-transform duration-300 hover:shadow-2xl hover:scale-105 mt-5">
            <h3 className="text-2xl font-bold mb-2">⏰ リマインダー機能</h3>
            <p>やるべきことを明確化し、リマインダーであなたのモチベーションを維持します。</p>
          </div>
        </div>
      </div>
    </div>
  );
}