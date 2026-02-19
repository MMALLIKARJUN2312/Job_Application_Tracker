import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getJobById, updateJob } from "../api/jobs";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define Validation Schema
const jobSchema = z.object({
  company: z.string().min(2, "Company must be at least 2 characters"),
  position: z.string().min(2, "Position must be at least 2 characters"),
  status: z.enum(["applied", "interview", "offer", "rejected"]),
});

const EditJob = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(jobSchema),
  });

  useEffect(() => {
    const loadJob = async () => {
      try {
        const data = await getJobById(id);

        // Prefill form fields
        setValue("company", data.company);
        setValue("position", data.position);
        setValue("status", data.status);
      } catch {
        setError("Failed to load job details");
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await updateJob(id, data);
      navigate("/jobs");
    } catch {
      setError("Failed to update job");
    }
  };

  if (loading) return <p className="text-gray-500">Loading Job...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">Edit Job</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* Company */}
        <div>
          <input
            {...register("company")}
            placeholder="Company"
            className="w-full border rounded px-4 py-2"
          />
          {errors.company && (
            <p className="text-red-500 text-sm mt-1">
              {errors.company.message}
            </p>
          )}
        </div>

        {/* Position */}
        <div>
          <input
            {...register("position")}
            placeholder="Position"
            className="w-full border rounded px-4 py-2"
          />
          {errors.position && (
            <p className="text-red-500 text-sm mt-1">
              {errors.position.message}
            </p>
          )}
        </div>

        {/* Status */}
        <div>
          <select
            {...register("status")}
            className="w-full border rounded px-4 py-2"
          >
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          {isSubmitting ? "Updating..." : "Update Job"}
        </button>

      </form>
    </div>
  );
};

export default EditJob;
