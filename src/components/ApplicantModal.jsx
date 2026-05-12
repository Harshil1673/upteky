import { X } from "lucide-react";

export default function ApplicantModal({ applicant, onClose }) {
  if (!applicant) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">
            {applicant.name}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Details */}
        <div className="space-y-3 text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400">Email: </span>
            <span className="text-gray-800 dark:text-white">{applicant.email}</span>
          </div>
          {applicant.phone && (
            <div>
              <span className="text-gray-500 dark:text-gray-400">Phone: </span>
              <span className="text-gray-800 dark:text-white">{applicant.phone}</span>
            </div>
          )}
          <div>
            <span className="text-gray-500 dark:text-gray-400">College: </span>
            <span className="text-gray-800 dark:text-white">{applicant.college}</span>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Status: </span>
            <span className="text-gray-800 dark:text-white">{applicant.status}</span>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Skills: </span>
            <div className="flex flex-wrap gap-1 mt-1">
              {applicant.skills.map((skill) => (
                <span key={skill} className="text-xs px-2 py-0.5 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
