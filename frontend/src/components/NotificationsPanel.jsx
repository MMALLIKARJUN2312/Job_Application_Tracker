const NotificationsPanel = ({ notifications }) => {
  if (!notifications.length) return null;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border mb-6">
      <h3 className="text-lg font-semibold mb-4">
        Notifications
      </h3>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-sm"
          >
            {n.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPanel;