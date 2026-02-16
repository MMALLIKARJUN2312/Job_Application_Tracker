const StatCard = ({ title, value, color }) => (
    <div className={`p-6 rounded-lg shadow-sm bg-white border-l-4 ${color}`}>
        <h4 className="text-sm font-medium text-gray-500">{title}</h4>
        <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
);

const StatsCards = ({ stats }) => {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
            <StatCard title="Total Jobs" value={stats.totalJobs} color="border-indigo-500" />
            <StatCard title="Applied" value={stats.applied} color="border-blue-500" />
            <StatCard title="Interview" value={stats.interview} color="border-yellow-500" />
            <StatCard title="Offer" value={stats.offer} color="border-green-500" />
            <StatCard title="Rejected" value={stats.rejected} color="border-red-500" />
        </div>
    );
};

export default StatsCards;
