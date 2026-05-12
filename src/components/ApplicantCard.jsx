import { Mail, GraduationCap, Calendar } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function ApplicantCard({ applicant, onClick }) {
  return (
    <div
      id={`applicant-card-${applicant.id}`}
      onClick={() => onClick(applicant)}
      className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 cursor-pointer hover:shadow-md hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200"
    >
      {/* Top row: Avatar + Name + Status */}
      <div className="flex items-start gap-3 mb-4">
        <img
          src={applicant.image}
          alt={applicant.name}
          className="w-11 h-11 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-700 flex-shrink-0"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(applicant.name)}&background=3b82f6&color=fff&size=44`;
          }}
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {applicant.name}
          </h3>
          <div className="flex items-center gap-1.5 mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            <Mail size={12} />
            <span className="truncate">{applicant.email}</span>
          </div>
        </div>
        <StatusBadge status={applicant.status} />
      </div>

      {/* College */}
      <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 mb-3">
        <GraduationCap size={14} className="text-slate-400 flex-shrink-0" />
        <span className="truncate">{applicant.college}</span>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {applicant.skills.slice(0, 4).map((skill) => (
          <span
            key={skill}
            className="px-2 py-0.5 text-xs rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
          >
            {skill}
          </span>
        ))}
        {applicant.skills.length > 4 && (
          <span className="px-2 py-0.5 text-xs rounded-md bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
            +{applicant.skills.length - 4}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-700">
        <Calendar size={12} />
        <span>Applied {applicant.appliedDate}</span>
      </div>
    </div>
  );
}
