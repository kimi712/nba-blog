import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <span className="text-xl font-bold">NBA Blog</span>
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-blue-200">首页</Link>
            <Link to="/news" className="hover:text-blue-200">新闻</Link>
            <Link to="/teams" className="hover:text-blue-200">球队</Link>
            <Link to="/players" className="hover:text-blue-200">球员</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
