import { useState, useEffect } from 'react';
import { generateNBANews, fetchNBANews, type NBANews } from '../services/nbaService';
import { SparklesIcon } from '@heroicons/react/24/outline';

const News = () => {
  const [news, setNews] = useState<NBANews[]>([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  // 获取真实新闻
  const loadRealNews = async () => {
    setLoading(true);
    try {
      const newsData = await fetchNBANews();
      setNews(newsData);
    } catch (error) {
      console.error('Error loading news:', error);
    }
    setLoading(false);
  };

  // 生成AI新闻
  const handleGenerateNews = async () => {
    setGenerating(true);
    try {
      const generatedNews = await generateNBANews();
      setNews(prev => [generatedNews, ...prev]);
    } catch (error) {
      console.error('Error generating news:', error);
    }
    setGenerating(false);
  };

  // 首次加载时获取新闻
  useEffect(() => {
    loadRealNews();
  }, []);

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">NBA 新闻</h1>
        <button
          className={`flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all ${generating ? 'opacity-75 cursor-not-allowed' : ''}`}
          onClick={handleGenerateNews}
          disabled={generating}
        >
          <SparklesIcon className="h-5 w-5 mr-2" />
          {generating ? '正在生成...' : '生成AI新闻'}
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">努力加载中...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${item.isGenerated ? 'border-2 border-blue-500' : ''}`}
            >
              <img 
                src={item.image || 'https://a.espncdn.com/combiner/i?img=/i/espn/misc_logos/500/nba.png'} 
                alt={item.title} 
                className="w-full h-48 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://a.espncdn.com/combiner/i?img=/i/espn/misc_logos/500/nba.png';
                }}
              />
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h2>
                  {item.isGenerated && (
                    <SparklesIcon className="h-5 w-5 text-blue-500 flex-shrink-0 ml-2" />
                  )}
                </div>
                <p className="text-gray-600 mb-4">{item.summary}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{item.date}</span>
                  {item.link && item.link !== '#' && (
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                    >
                      阅读更多
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && news.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          暂无新闻内容
        </div>
      )}
    </div>
  );
};

export default News;
