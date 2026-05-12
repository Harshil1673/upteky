const STATUS_COLORS = {
  Applied: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  Screening: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
  Interview: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  Offered: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  Hired: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  Rejected: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
};

export default function StatusBadge({ status }) {
  const classes = STATUS_COLORS[status] || 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300';

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${classes}`}>
      {status}
    </span>
  );
}
