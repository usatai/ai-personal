import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-slate-800 text-white p-4 fixed top-0 left-0 w-full shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center max-w-7xl px-4">
        <a href="/" className="text-2xl font-bold tracking-tight hover:text-blue-400 transition">
          🏃 AI Personal
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-sm font-medium">
          <li>
            <a href="/main" className="hover:text-blue-400 transition">ダッシュボード</a>
          </li>
          <li>
            <a href="/body-metrics" className="hover:text-blue-400 transition">目標設定</a>
          </li>
          <li>
            <a href="/food" className="hover:text-blue-400 transition">食事内容入力</a>
          </li>
          <li>
            <a href="/body-management" className="hover:text-blue-400 transition">進捗記録</a>
          </li>
          <li>
            <a href="/" className="hover:text-red-400 transition">ログアウト</a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden mt-2 space-y-4 bg-slate-800 p-6 rounded-b-xl shadow-md text-sm font-medium">
          <li><a href="/main" className="block hover:text-blue-400">ダッシュボード</a></li>
          <li><a href="/body-metrics" className="block hover:text-blue-400">目標設定</a></li>
          <li><a href="/food" className="block hover:text-blue-400">食事内容入力</a></li>
          <li><a href="/body-management" className="block hover:text-blue-400">進捗記録</a></li>
          <li><a href="/" className="block hover:text-red-400">ログアウト</a></li>
        </ul>
      )}
    </nav>
  );
}
