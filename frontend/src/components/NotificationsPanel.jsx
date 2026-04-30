const NotificationsPanel = ({ notifications }) => {
  if (!notifications.length) return null;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Notifications
      </h3>

      {/* List */}
      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="p-3 rounded-lg text-sm 
                       bg-gray-100 dark:bg-gray-700 
                       text-gray-800 dark:text-gray-200
                       border border-gray-200 dark:border-gray-600"
          >
            {n.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPanel;