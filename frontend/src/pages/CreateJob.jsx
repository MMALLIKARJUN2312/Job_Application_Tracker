import { useNavigate } from "react-router";
import { createJob } from "../api/jobs";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const jobSchema = z.object({
    company: z.string().min(2, "Company name must be at least 2 characters"),
    position: z.string().min(2, "Position must be at least 2 characters"),
    status: z.enum(["applied", "interview", "offer", "rejected"])
});

const CreateJob = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(jobSchema),
        defaultValues: {
            status: "applied"
        }
    });

    const onSubmit = async (data) => {
        await createJob(data);
        navigate("/jobs");
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Add New Job</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

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

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                >
                    {isSubmitting ? "Creating..." : "Create Job"}
                </button>

            </form>
        </div>
    );
};

export default CreateJob;
