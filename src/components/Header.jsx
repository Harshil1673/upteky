import { Moon, Sun, Users } from 'lucide-react';

export default function Header({ dark, onToggleDark, onAddClick }) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary-600 text-white">
              <Users size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                CandidateHub
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                Management Dashboard
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              id="dark-mode-toggle"
              onClick={onToggleDark}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              id="add-applicant-btn"
              onClick={onAddClick}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
            >
              <span className="text-lg leading-none">+</span>
              <span className="hidden sm:inline">Add Applicant</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
