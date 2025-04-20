import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-300 text-white p-4 fixed top-0 left-0 w-full shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-2xl font-bold">🏃 AI Personal</a>
        
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li><a href="/main" className="hover:underline">ダッシュボード</a></li>
          <li><a href="/body-metrics" className="hover:underline">目標設定(データ入力)</a></li>
          <li><a href="/food" className="hover:underline">食事内容入力</a></li>
          <li><a href="/body-management" className="hover:underline">体重・体脂肪入力</a></li>
          <li><a href="/" className="hover:underline">ログアウト</a></li>
        </ul>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden mt-2 space-y-2 bg-blue-300 p-5">
          <li><a href="/main" className="hover:underline">ダッシュボード</a></li>
          <li className="mt-3"><a href="/body-metrics" className="hover:underline">目標設定(データ入力)</a></li>
          <li className="mt-3"><a href="food" className="hover:underline">食事内容入力</a></li>
          <li className="mt-3"><a href="/body-management" className="hover:underline">体重・体脂肪入力</a></li>
          <li className="mt-3"><a href="/" className="hover:underline">ログアウト</a></li>
        </ul>
      )}
    </nav>
  );
}
