import { useState, useEffect, useMemo } from 'react';
import { fetchJobs } from '../api/getJobs';
import { Link } from 'react-router'
import { deleteJob } from '../api/jobs';
import StatsCards from "../components/StatsCards";
import { getJobStats } from "../api/jobs";
import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import JobCard from '../components/JobsCard';
import LoadingSkeleton from "../components/LoadingSkeleton";
import ErrorMessage from "../components/ErrorMessage";

const Jobs = () => {
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState("");
    const [sort, setSort] = useState("latest")
    const [search, setSearch] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    const {
        data,
        isLoading,
        isError
    } = useQuery({
        queryKey: ["jobs", page, status, sort, debouncedSearch],
        queryFn: () =>
            fetchJobs({
                page,
                limit: 10,
                status,
                sort,
                search: debouncedSearch
            }),
        keepPreviousData: true,
        enabled: !!localStorage.getItem("token"), 
    });

    const jobs = useMemo(() => {
        return data?.jobs || [];
    }, [data]);

    const { data: stats } = useQuery({
        queryKey: ["jobStats"],
        queryFn: getJobStats,
        enabled: !!localStorage.getItem("token"),
    });

    const deleteMutation = useMutation({
        mutationFn: deleteJob,
        onMutate: () => {
            toast.loading("Deleting job...");
        },
        onSuccess: () => {
            toast.dismiss();
            toast.success("Job deleted");
        },
        onError: () => {
            toast.dismiss();
            toast.error("Delete failed");
        }
    });

    const handleDelete = (id) => {
        const confirmed = window.confirm("Are you sure you want to delete the job?");
        if (!confirmed) return;

        deleteMutation.mutate(id);
    };

    if (isLoading) return <LoadingSkeleton />;
    if (isError) return <ErrorMessage />;

    if (jobs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <h3 className="text-xl font-semibold mb-2">
                    No jobs yet 🚀
                </h3>
                <p className="text-gray-500 mb-4">
                    Start tracking your job applications now
                </p>

                <Link
                    to="/jobs/new"
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                >
                    Add First Job
                </Link>
            </div>
        );
    }

    return (
        <div>
            <div className='flex items-center justify-between'>
                <h2 className='text-2xl font-semibold m-6'>Your Job Applications</h2>
                <Link
                    to="/jobs/new"
                    className="inline-block mx-4 mb-6 bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition"
                >
                    + Add Job
                </Link>
            </div>

            <input
                aria-label="Company or Position"
                type="text"
                placeholder="Search by company or position..."
                value={search}
                onChange={(e) => {
                    setPage(1);
                    setSearch(e.target.value);
                }}
                className="border rounded-md px-3 py-2 text-sm w-full sm:w-64"
            />

            {stats && <StatsCards stats={stats} />}

            {/* Filters and Sorting */}

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mx-6 mb-6">
                <select value={status} onChange={(event) => {
                    setPage(1);
                    setStatus(event.target.value)
                }} className="text-sm border rounded-md px-3 py-2">
                    <option value="">All Status</option>
                    <option value="applied">Applied</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                </select>

                <select value={sort} onChange={(event) => {
                    setPage(1);
                    setSort(event.target.value)
                }} className="text-sm border rounded-md px-3 py-2">
                    <option value="latest">Latest</option>
                    <option value="oldest">Oldest</option>
                    <option value="a-z">Company A-Z</option>
                    <option value="z-a">Company Z-A</option>
                </select>
            </div>
            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 m-6'>
                {
                    jobs.map((job) => (
                        <JobCard key={job._id} job={job} onDelete={handleDelete} />
                    ))
                }
            </div>

            {/* Pagination */}

            <div className='flex items-center justify-center gap-4 mt-8'>
                <button onClick={() => setPage((previous) => Math.max(previous - 1, 1))} disabled={page === 1} className="bg-gray-200 rounded disabled:opacity-50 px-4 py-2">
                    Previous
                </button>

                <span className="text-sm font-medium">Page {page}</span>

                <button onClick={() => setPage((previous) => previous + 1)} className="bg-gray-200 rounded px-4 py-2">
                    Next
                </button>
            </div>
        </div>
    )
}

export default Jobs;
