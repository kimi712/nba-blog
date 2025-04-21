import { useState, useEffect } from 'react';
import { fetchNBANews, type NBANews } from '../services/nbaService';

const Home = () => {
  const [news, setNews] = useState<NBANews[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadNews = async () => {
      try {
        const newsData = await fetchNBANews();
        setNews(newsData);
      } catch (err) {
        setError('无法加载新闻，请稍后再试');
        console.error('Error loading news:', err);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (error) return (
    <div className="text-red-600 text-center py-8">{error}</div>
  );

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">NBA 最新动态</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item, index) => (
          <a 
            key={index} 
            href={item.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {item.image && (
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-48 object-cover" 
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600">
                {item.title}
              </h2>
              {item.summary && (
                <p className="mt-2 text-gray-600">{item.summary}</p>
              )}
              {item.date && (
                <p className="mt-2 text-sm text-gray-500">{item.date}</p>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Home;
