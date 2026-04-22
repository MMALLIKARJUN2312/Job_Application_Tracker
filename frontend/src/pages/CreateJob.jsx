import { useNavigate } from "react-router";
import { createJob } from "../api/jobs";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const jobSchema = z.object({
    company: z.string().min(2, "Company name must be at least 2 characters"),
    position: z.string().min(2, "Position must be at least 2 characters"),
    status: z.enum(["applied", "interview", "offer", "rejected"])
});

const CreateJob = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: createJob,

        onMutate: () => {
            toast.loading("Creating job...");
        },

        onSuccess: () => {
            toast.dismiss();
            toast.success("Job created successfully");

            queryClient.invalidateQueries({ queryKey: ["jobs"] });
            queryClient.invalidateQueries({ queryKey: ["jobStats"] });

            navigate("/jobs");
        },

        onError: () => {
            toast.dismiss();
            toast.error("Failed to create job");
        }
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(jobSchema),
        defaultValues: {
            status: "applied"
        }
    });

    const onSubmit = (data) => {
        createMutation.mutate(data);
    };

    return (
        <div className="max-w-xl mx-auto p-8 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-900">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Add New Job</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                <div>
                    <Input
                        aria-label="Company"
                        placeholder="Enter the company"
                        label="Company"
                        {...register("company")}
                        error={errors.company?.message}
                    />
                </div>

                <div>
                    <Input
                        aria-label="Position"
                        placeholder="Enter the position"
                        label="Position"
                        {...register("position")}
                        error={errors.position?.message}
                    />
                </div>

                <div>
                    <select
                        aria-label="Status"
                        placeholder="Enter the status"
                        {...register("status")}
                        className="w-full border rounded px-4 py-2"
                    >
                        <option value="applied">Applied</option>
                        <option value="interview">Interview</option>
                        <option value="offer">Offer</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>

                <Button type="submit" disabled={createMutation.isPending}>
                    {createMutation.isPending ? "Creating..." : "Create Job"}
                </Button>

            </form>
        </div>
    );
};

export default CreateJob;
