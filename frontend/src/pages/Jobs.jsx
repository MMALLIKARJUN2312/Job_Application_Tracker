import { useState, useEffect, useMemo } from "react";
import { fetchJobs } from "../api/getJobs";
import { Link } from "react-router";
import { deleteJob, getJobStats } from "../api/jobs";
import StatsCards from "../components/StatsCards";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import JobCard from "../components/JobsCard";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ErrorMessage from "../components/ErrorMessage";
import JobsChart from "../components/JobsChart";
import AdvancedCharts from "../components/AdvancedCharts";
import NotificationsPanel from "../components/NotificationsPanel";
import { generateNotifications } from "../utils/notifications.js";
import { exportJobsToCSV } from "../utils/exportJobs";
import { exportJobsToPDF } from "../utils/exportPDF.js";
import InsightsPanel from "../components/InsightsPanel";

const Jobs = () => {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("latest");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Jobs Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["jobs", page, status, sort, debouncedSearch],
    queryFn: () =>
      fetchJobs({
        page,
        limit: 10,
        status,
        sort,
        search: debouncedSearch,
      }),
    keepPreviousData: true,
  });

  const jobs = useMemo(() => data?.jobs || [], [data]);
  const notifications = generateNotifications(jobs);

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    notifications.forEach((n) => {
      new Notification(n.message);
    });
  }, [notifications]);

  // Stats Query
  const { data: stats } = useQuery({
    queryKey: ["jobStats"],
    queryFn: getJobStats,
    staleTime: 0,
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: deleteJob,
    onMutate: () => {
      toast.loading("Deleting job...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Job deleted");

      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["jobStats"] });
    },
    onError: () => {
      toast.dismiss();
      toast.error("Delete failed");
    },
  });

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (!confirmed) return;

    deleteMutation.mutate(id);
  };

  if (isLoading) return <LoadingSkeleton />;

  if (isError) return <ErrorMessage />;

  return (
    <div className="max-w-8xl mx-auto px-6 py-8 space-y-8 bg-gray-50 dark:bg-gray-900" id="jobs-dashboard">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Your Job Applications
        </h2>

        <div className="flex gap-3">
          <Link
            to="/jobs/new"
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2 rounded-lg shadow"
          >
            + Add Job
          </Link>

          <button
            onClick={() => exportJobsToCSV(jobs)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Export CSV
          </button>

          <button
            onClick={exportJobsToPDF}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Export PDF
          </button>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by company or position..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-4 py-2 text-sm w-full lg:w-80 shadow-sm focus:ring-2 focus:ring-purple-500 outline-none"
        />

        {/* Filters */}
        <div className="flex gap-4">
          <select
            value={status}
            onChange={(e) => {
              setPage(1);
              setStatus(e.target.value);
            }}
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-3 py-2 text-sm shadow-sm"
          >
            <option value="">All Status</option>
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            value={sort}
            onChange={(e) => {
              setPage(1);
              setSort(e.target.value);
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="a-z">Company A-Z</option>
            <option value="z-a">Company Z-A</option>
          </select>
        </div>
      </div>

      <NotificationsPanel notifications={notifications} />

      {/* Stats */}
      {stats && <StatsCards stats={stats} />}

      {/* Insights */}
      {stats && <InsightsPanel stats={stats} />}

      {stats && jobs.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Analytics Dashboard
          </h2>

          <AdvancedCharts stats={stats} jobs={jobs} />
        </div>
      )}

      {/* Jobs Charts */}
      {stats && <JobsChart stats={stats} />}

      {/* Empty State */}
      {jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">No jobs yet 🚀</h3>
          <p className="text-gray-500 mb-4">
            Start tracking your job applications
          </p>

          <Link
            to="/jobs/new"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Add First Job
          </Link>
        </div>
      ) : (
        <>
          {/* Job Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={() =>
                setPage((prev) => Math.max(prev - 1, 1))
              }
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              Previous
            </button>

            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Page {page}
            </span>

            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Jobs;