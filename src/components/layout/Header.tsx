import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useLogout } from "../../hooks/useLogout";

const Header = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);
  const logout = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // 現在のページがログインページか新規登録ページかを判定
  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";

  // トグル以外をクリックしたら閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">Vdot ランニング記録アプリ</h1>

      <nav className="relative flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="text-white hover:underline">ダッシュボード</Link>
            {/* ユーザー名クリックでトグル */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-gray-700 px-4 py-2 rounded focus:outline-none"
              >
                {user?.name}
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">
                    プロフィール
                  </Link>
                  <Link to="/vdot-formula" className="block px-4 py-2 hover:bg-gray-200">
                    vdot計算
                  </Link>
                  <Link to="/workout" className="block px-4 py-2 hover:bg-gray-200">
                    ワークアウト
                  </Link>
                  <Link to="/specialty-event" className="block px-4 py-2 hover:bg-gray-200">
                    自己ベスト
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    ログアウト
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {isLoginPage && (
              <Link to="/signup" className="bg-green-500 px-3 py-1 rounded">新規登録</Link>
            )}
            {isSignupPage && (
              <Link to="/login" className="bg-blue-500 px-3 py-1 rounded">ログイン</Link>
            )}
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;