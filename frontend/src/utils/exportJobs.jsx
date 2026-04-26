export const exportJobsToCSV = (jobs) => {
  if (!jobs.length) return;

  const headers = ["Company", "Position", "Status", "Created At"];

  const rows = jobs.map((job) => [
    job.company,
    job.position,
    job.status,
    new Date(job.createdAt).toLocaleDateString(),
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "job_applications.csv");

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};