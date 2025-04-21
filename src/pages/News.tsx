import { useState } from 'react';

const News = () => {
  const [newsContent, setNewsContent] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');

  const generateNews = async () => {
    // 这里将集成 OpenAI API 来生成新闻内容
    const mockGeneratedNews = "今日NBA赛事精彩纷呈，多支球队展现出色表现...";
    setNewsContent(mockGeneratedNews);
    
    // 这里将集成图片生成 API
    setGeneratedImage('https://via.placeholder.com/600x400');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">NBA 新闻生成器</h1>
      <div className="flex space-x-4">
        <button
          onClick={generateNews}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          一键生成新闻
        </button>
      </div>
      {newsContent && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="prose max-w-none">
            <p>{newsContent}</p>
          </div>
          {generatedImage && (
            <img
              src={generatedImage}
              alt="Generated news image"
              className="mt-4 rounded-lg w-full max-w-2xl"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default News;
