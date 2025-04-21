import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface Player {
  id: number;
  name: string;
  team: string;
  position: string;
  number: string;
  height: string;
  weight: string;
  image: string;
  stats?: {
    ppg?: string;
    rpg?: string;
    apg?: string;
  };
}

const Players = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  
  const players: Player[] = [
    {
      id: 1,
      name: '勒布朗·詹姆斯',
      team: '洛杉矶湖人队',
      position: '小前锋',
      number: '23',
      height: '2.06m',
      weight: '113kg',
      image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png',
      stats: { ppg: '25.4', rpg: '7.2', apg: '8.1' }
    },
    {
      id: 2,
      name: '斯蒂芬·库里',
      team: '金州勇士队',
      position: '控球后卫',
      number: '30',
      height: '1.88m',
      weight: '84kg',
      image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3975.png',
      stats: { ppg: '28.3', rpg: '4.5', apg: '6.2' }
    },
    {
      id: 3,
      name: '凯文·杜兰特',
      team: '菲尼克斯太阳队',
      position: '大前锋',
      number: '35',
      height: '2.08m',
      weight: '109kg',
      image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3202.png',
      stats: { ppg: '27.1', rpg: '6.6', apg: '5.0' }
    },
    {
      id: 4,
      name: '扬尼斯·阿德托昆博',
      team: '密尔沃基雄鹿队',
      position: '大前锋',
      number: '34',
      height: '2.11m',
      weight: '110kg',
      image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3032977.png',
      stats: { ppg: '30.2', rpg: '11.3', apg: '5.7' }
    },
    {
      id: 5,
      name: '卢卡·东契奇',
      team: '达拉斯独行侠队',
      position: '控球后卫',
      number: '77',
      height: '2.01m',
      weight: '104kg',
      image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3945274.png',
      stats: { ppg: '32.5', rpg: '8.7', apg: '9.8' }
    }
  ];

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-3xl font-bold text-gray-800">NBA 球员</h1>
      <div className="max-w-xl relative">
        <div className="relative">
          <input
            type="text"
            placeholder="搜索球员、球队或位置..."
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlayers.map(player => (
          <div key={player.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="relative">
              <img 
                src={player.image} 
                alt={player.name} 
                className="w-40 h-40 mx-auto mb-4 rounded-lg object-cover bg-gray-100" 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/150?text=No+Image';
                }}
              />
              <div className="absolute top-0 right-0 bg-blue-600 text-white px-2 py-1 rounded-bl-lg rounded-tr-lg">
                #{player.number}
              </div>
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-xl font-semibold text-gray-800">{player.name}</h2>
              <p className="text-blue-600 font-medium">{player.team}</p>
              <p className="text-gray-600">{player.position}</p>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mt-2">
                <div>身高: {player.height}</div>
                <div>体重: {player.weight}</div>
              </div>
              {player.stats && (
                <div className="border-t pt-3 mt-3">
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <div className="text-gray-500">得分</div>
                      <div className="font-semibold text-blue-600">{player.stats.ppg}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">篮板</div>
                      <div className="font-semibold text-blue-600">{player.stats.rpg}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">助攻</div>
                      <div className="font-semibold text-blue-600">{player.stats.apg}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {filteredPlayers.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          没有找到匹配的球员
        </div>
      )}
    </div>
  );
};

export default Players;
