// Simple color mapping for status badges
const STATUS_COLORS = {
  Applied: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  Screening: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  Interview: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  Offered: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  Hired: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
  Rejected: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
};

export default function ApplicantCard({ applicant, onClick }) {
  return (
    <div
      onClick={() => onClick(applicant)}
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
    >
      {/* Name and status */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-gray-800 dark:text-white text-sm">
          {applicant.name}
        </h3>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[applicant.status] || "bg-gray-100 text-gray-700"}`}>
          {applicant.status}
        </span>
      </div>

      {/* Email */}
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
        {applicant.email}
      </p>

      {/* College */}
      <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
        🎓 {applicant.college}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-1">
        {applicant.skills.map((skill) => (
          <span
            key={skill}
            className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
