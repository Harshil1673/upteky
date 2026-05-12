import { X, Mail, Phone, GraduationCap, Briefcase, Calendar, User } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function ApplicantModal({ applicant, onClose }) {
  if (!applicant) return null;

  return (
    <div
      id="applicant-detail-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        id="applicant-detail-modal"
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 pb-4 border-b border-slate-100 dark:border-slate-700">
          <button
            id="close-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-white dark:hover:bg-slate-700 transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-4">
            <img
              src={applicant.image}
              alt={applicant.name}
              className="w-16 h-16 rounded-full object-cover ring-4 ring-primary-100 dark:ring-primary-900/40"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(applicant.name)}&background=3b82f6&color=fff&size=64`;
              }}
            />
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {applicant.name}
              </h2>
              <StatusBadge status={applicant.status} />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Contact Information
            </h3>
            <div className="space-y-2">
              <InfoRow icon={<Mail size={16} />} label="Email" value={applicant.email} />
              {applicant.phone && (
                <InfoRow icon={<Phone size={16} />} label="Phone" value={applicant.phone} />
              )}
            </div>
          </div>

          {/* Education & Experience */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Background
            </h3>
            <div className="space-y-2">
              <InfoRow icon={<GraduationCap size={16} />} label="College" value={applicant.college} />
              <InfoRow icon={<Briefcase size={16} />} label="Experience" value={applicant.experience} />
              <InfoRow icon={<Calendar size={16} />} label="Applied" value={applicant.appliedDate} />
            </div>
          </div>

          {/* Bio */}
          {applicant.bio && (
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                About
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {applicant.bio}
              </p>
            </div>
          )}

          {/* Skills */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {applicant.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-sm rounded-lg bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium"
                >
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

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-slate-400 dark:text-slate-500">{icon}</span>
      <span className="text-slate-500 dark:text-slate-400 w-24 flex-shrink-0">{label}</span>
      <span className="text-slate-800 dark:text-slate-200 font-medium">{value}</span>
    </div>
  );
}
