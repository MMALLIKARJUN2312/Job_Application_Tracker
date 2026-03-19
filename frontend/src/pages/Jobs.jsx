import { useState, useEffect } from 'react';
import { fetchJobs } from '../api/getJobs';
import { Link } from 'react-router'
import { deleteJob } from '../api/jobs';
import StatsCards from "../components/StatsCards";
import { getJobStats } from "../api/jobs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ErrorMessage from "../components/ErrorMessage";

const Jobs = () => {
    const queryClient = useQueryClient();
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
        keepPreviousData: true
    });

    const jobs = data?.jobs || [];

    const { data: stats } = useQuery({
        queryKey: ["jobStats"],
        queryFn: getJobStats
    });

    const deleteMutation = useMutation({
        mutationFn: deleteJob,
        onSuccess: () => {
            toast.success("Job deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["jobs"] });
            queryClient.invalidateQueries({ queryKey: ["jobStats"] });
        },
        onError: () => {
            toast.error("Failed to delete job");
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
            <div className="text-gray-500 text-center py-10">
                No Jobs found.
            </div>
        )
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
                        <div key={job._id} className="bg-white rounded-lg border shadow-sm hover:shadow-md transition p-5">
                            <h3 className='text-lg font-bold'>{job.company}</h3>
                            <p className="font-semibold mt-1">{job.position}</p>
                            <span className="inline-block text-xs capitalize font-medium rounded-full bg-purple-600 text-white px-3 py-2 mt-4">{job.status}</span>

                            <div className="flex gap-4 mt-4">
                                <Link to={`/jobs/${job._id}/edit`} className="text-sm text-purple-600 hover:underline">Edit</Link>
                                <button
                                    onClick={() => handleDelete(job._id)}
                                    disabled={deleteMutation.isPending}
                                    className="text-sm text-red-500 hover:underline disabled:opacity-50"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
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
