export const generateNotifications = (jobs) => {
  const notifications = [];

  const now = new Date();

  jobs.forEach((job) => {
    const created = new Date(job.createdAt);
    const diffDays = Math.floor(
      (now - created) / (1000 * 60 * 60 * 24)
    );

    // Follow-up reminder
    if (job.status === "applied" && diffDays > 7) {
      notifications.push({
        id: job._id,
        message: `Follow up with ${job.company} (${diffDays} days ago)`,
        type: "reminder",
      });
    }

    // Stale application
    if (diffDays >= 7) {
      notifications.push({
        id: job._id + "-stale",
        message: `No update from ${job.company} for ${diffDays} days`,
        type: "warning",
      });
    }

    // Interview alert
    if (job.status === "interview") {
      notifications.push({
        id: job._id + "-interview",
        message: `Interview scheduled with ${job.company}`,
        type: "success",
      });
    }
  });

  return notifications;
};