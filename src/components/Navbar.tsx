import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <span className="text-xl font-bold">NBA Blog</span>
          </Link>
          
          {/* 桌面端导航 */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-blue-200">首页</Link>
            <Link to="/news" className="hover:text-blue-200">新闻</Link>
            <Link to="/teams" className="hover:text-blue-200">球队</Link>
            <Link to="/players" className="hover:text-blue-200">球员</Link>
          </div>

          {/* 移动端汉堡菜单按钮 */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-blue-700 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* 移动端下拉菜单 */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="hover:bg-blue-700 px-3 py-2 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                首页
              </Link>
              <Link 
                to="/news" 
                className="hover:bg-blue-700 px-3 py-2 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                新闻
              </Link>
              <Link 
                to="/teams" 
                className="hover:bg-blue-700 px-3 py-2 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                球队
              </Link>
              <Link 
                to="/players" 
                className="hover:bg-blue-700 px-3 py-2 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                球员
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
