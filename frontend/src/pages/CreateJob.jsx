import { useNavigate } from "react-router";
import { createJob } from "../api/jobs";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";

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
                    <Input
                        label="Company"
                        {...register("company")}
                        error={errors.company?.message}
                    />
                </div>

                <div>
                    <Input
                        label="Position"
                        {...register("position")}
                        error={errors.position?.message}
                    />
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

                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create Job"}
                </Button>

            </form>
        </div>
    );
};

export default CreateJob;
