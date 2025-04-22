import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-8 font-sans">
      {/* ヒーローセクション */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold drop-shadow-md mb-4">AI Personal</h1>
        <p className="text-xl text-gray-300">生活習慣の改善で、なりたい自分へ</p>
      </div>

      {/* CTAボタン */}
      <div className="flex flex-col md:flex-row gap-4 mb-16">
        <Link href="/signup" className="bg-white text-slate-900 font-semibold py-3 px-6 rounded-full shadow hover:bg-slate-700 transition">
          新規登録
        </Link>
        <Link href="/login" className="border border-white text-white py-3 px-6 rounded-full shadow hover:bg-white hover:text-slate-900 transition">
          ログイン
        </Link>
      </div>

      {/* 特徴紹介 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
        <FeatureCard
          icon="🏋️"
          title="自動トレーニング提案"
          description="AIがあなたの身体データに基づき、最適なトレーニングと摂取カロリーを提案します。"
        />
        <FeatureCard
          icon="🍽️"
          title="食事記録"
          description="食材を入力するだけで、カロリー計算を自動で行い、健康的な食生活をサポート。"
        />
        <FeatureCard
          icon="📊"
          title="進捗管理"
          description="目標に対して、体重・体脂肪率・筋肉量の推移を可視化します。"
        />
        <FeatureCard
          icon="⏰"
          title="リマインダー機能"
          description="やるべきことを明確化し、リマインダーであなたのモチベーションを維持。"
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="relative bg-slate-800 p-6 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}
