const Teams = () => {
  const teams = [
    { id: 1, name: '湖人队', city: '洛杉矶', logo: 'https://via.placeholder.com/150' },
    { id: 2, name: '勇士队', city: '金州', logo: 'https://via.placeholder.com/150' },
    { id: 3, name: '篮网队', city: '布鲁克林', logo: 'https://via.placeholder.com/150' },
    // 更多球队...
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">NBA 球队</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {teams.map(team => (
          <div key={team.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <img src={team.logo} alt={team.name} className="w-32 h-32 mx-auto mb-4" />
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800">{team.name}</h2>
              <p className="text-gray-600">{team.city}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;
