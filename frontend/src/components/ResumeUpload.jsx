import { useState } from "react";
import apiInstance from "../api/axios";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [skills, setSkills] = useState([]);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("resume", file);

    const res = await apiInstance.post("/resume/upload", formData);
    setSkills(res.data.matchedSkills);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Resume Matching
      </h3>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-3"
      />

      <button
        onClick={handleUpload}
        className="bg-purple-600 text-white px-4 py-2 rounded-lg"
      >
        Upload Resume
      </button>

      {skills.length > 0 && (
        <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
          <p>Matched Skills:</p>
          <ul className="list-disc ml-5">
            {skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;