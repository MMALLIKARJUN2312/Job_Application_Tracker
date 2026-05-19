import { useState } from "react";
import apiInstance from "../api/axios";
import toast from "react-hot-toast";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a resume");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", file);

      const response = await apiInstance.post(
        "/resume/upload",
        formData
      );

      setSkills(response.data.matchedSkills);

      toast.success("Resume parsed successfully");
    } catch (error) {
      toast.error("Failed to upload resume", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6">
      
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Resume Skill Matching
      </h2>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="text-sm text-gray-700 dark:text-gray-300"
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload Resume"}
        </button>
      </div>

      {skills.length > 0 && (
        <div className="mt-6">
          
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            Matched Skills
          </h3>

          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full text-sm bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;