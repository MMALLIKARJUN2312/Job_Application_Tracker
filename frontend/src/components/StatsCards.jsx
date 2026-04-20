const StatCard = ({ title, value, color, icon }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 border hover:shadow-md transition flex items-center justify-between">
    
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold mt-1 text-gray-800">{value}</h3>
    </div>

    <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${color}`}>
      {icon}
    </div>
  </div>
);

const StatsCards = ({ stats }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
      
      <StatCard
        title="Total Jobs"
        value={stats.totalJobs}
        color="bg-indigo-100 text-indigo-600"
        icon="📊"
      />

      <StatCard
        title="Applied"
        value={stats.applied}
        color="bg-blue-100 text-blue-600"
        icon="📄"
      />

      <StatCard
        title="Interview"
        value={stats.interview}
        color="bg-yellow-100 text-yellow-600"
        icon="🎯"
      />

      <StatCard
        title="Offer"
        value={stats.offer}
        color="bg-green-100 text-green-600"
        icon="🏆"
      />

      <StatCard
        title="Rejected"
        value={stats.rejected}
        color="bg-red-100 text-red-600"
        icon="❌"
      />
    </div>
  );
};

export default StatsCards;