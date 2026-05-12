import { Users, UserCheck, Clock, XCircle } from 'lucide-react';

export default function StatsBar({ applicants }) {
  const total = applicants.length;
  const hired = applicants.filter((a) => a.status === 'Hired').length;
  const inProcess = applicants.filter((a) =>
    ['Screening', 'Interview', 'Offered'].includes(a.status)
  ).length;
  const rejected = applicants.filter((a) => a.status === 'Rejected').length;

  const stats = [
    { label: 'Total', value: total, icon: <Users size={18} />, color: 'text-primary-600 bg-primary-50 dark:bg-primary-900/30 dark:text-primary-400' },
    { label: 'Hired', value: hired, icon: <UserCheck size={18} />, color: 'text-green-600 bg-green-50 dark:bg-green-900/30 dark:text-green-400' },
    { label: 'In Process', value: inProcess, icon: <Clock size={18} />, color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/30 dark:text-amber-400' },
    { label: 'Rejected', value: rejected, icon: <XCircle size={18} />, color: 'text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((s) => (
        <div
          key={s.label}
          className="flex items-center gap-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4"
        >
          <div className={`p-2 rounded-lg ${s.color}`}>{s.icon}</div>
          <div>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{s.value}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
