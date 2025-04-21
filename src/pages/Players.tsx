import { useState } from 'react';

const Players = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const players = [
    { id: 1, name: '勒布朗·詹姆斯', team: '湖人队', position: '前锋', image: 'https://via.placeholder.com/150' },
    { id: 2, name: '斯蒂芬·库里', team: '勇士队', position: '后卫', image: 'https://via.placeholder.com/150' },
    { id: 3, name: '凯文·杜兰特', team: '太阳队', position: '前锋', image: 'https://via.placeholder.com/150' },
    // 更多球员...
  ];

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.team.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">NBA 球员</h1>
      <div className="max-w-xl">
        <input
          type="text"
          placeholder="搜索球员或球队..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlayers.map(player => (
          <div key={player.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <img src={player.image} alt={player.name} className="w-32 h-32 mx-auto mb-4 rounded-full object-cover" />
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800">{player.name}</h2>
              <p className="text-gray-600">{player.team}</p>
              <p className="text-gray-500">{player.position}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Players;
