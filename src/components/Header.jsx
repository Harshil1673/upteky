import { Sun, Moon, Plus } from "lucide-react";

export default function Header({ dark, setDark, onAddClick }) {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">
        📋 Candidate Dashboard
      </h1>

      <div className="flex items-center gap-3">
        {/* Dark mode toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          title="Toggle dark mode"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Add applicant button */}
        <button
          onClick={onAddClick}
          className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
        >
          <Plus size={16} />
          Add Applicant
        </button>
      </div>
    </header>
  );
}
