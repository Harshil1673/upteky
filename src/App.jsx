import { useState, useMemo } from 'react';
import Header from './components/Header';
import SearchFilter from './components/SearchFilter';
import StatsBar from './components/StatsBar';
import ApplicantCard from './components/ApplicantCard';
import ApplicantModal from './components/ApplicantModal';
import AddApplicantForm from './components/AddApplicantForm';
import Pagination from './components/Pagination';
import LoadingSkeleton from './components/LoadingSkeleton';
import { useDarkMode, useFetch, useDebounce } from './hooks/useHooks';
import { fetchApplicants } from './services/api';
import { AlertTriangle, UserX } from 'lucide-react';

export default function App() {
  const { dark, toggle: toggleDark } = useDarkMode();

  // State
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [localApplicants, setLocalApplicants] = useState([]);

  const debouncedSearch = useDebounce(search);

  // Fetch data
  const { data, loading, error, refetch } = useFetch(
    () => fetchApplicants(page, 12),
    [page]
  );

  // Combine API + locally added applicants
  const allApplicants = useMemo(() => {
    const apiApplicants = data?.applicants || [];
    return [...localApplicants, ...apiApplicants];
  }, [data, localApplicants]);

  // Filter
  const filtered = useMemo(() => {
    return allApplicants.filter((a) => {
      const matchesSearch =
        !debouncedSearch ||
        a.name.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesStatus = !statusFilter || a.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [allApplicants, debouncedSearch, statusFilter]);

  const handleAddApplicant = (newApplicant) => {
    setLocalApplicants((prev) => [newApplicant, ...prev]);
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      <Header
        dark={dark}
        onToggleDark={toggleDark}
        onAddClick={() => setShowAddForm(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Stats */}
        {!loading && !error && <StatsBar applicants={allApplicants} />}

        {/* Search & Filter */}
        <SearchFilter
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
        />

        {/* Results info */}
        {!loading && !error && (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing <span className="font-semibold text-slate-700 dark:text-slate-200">{filtered.length}</span> applicant{filtered.length !== 1 ? 's' : ''}
            {data?.total ? ` of ${data.total + localApplicants.length} total` : ''}
          </p>
        )}

        {/* Loading */}
        {loading && <LoadingSkeleton count={6} />}

        {/* Error */}
        {error && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <AlertTriangle size={48} className="text-red-400 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Failed to load applicants
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{error}</p>
            <button
              onClick={refetch}
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <UserX size={48} className="text-slate-300 dark:text-slate-600 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              No applicants found
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}

        {/* Applicant Grid */}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((applicant) => (
              <ApplicantCard
                key={applicant.id}
                applicant={applicant}
                onClick={setSelectedApplicant}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && data && (
          <Pagination
            page={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        )}
      </main>

      {/* Modals */}
      {selectedApplicant && (
        <ApplicantModal
          applicant={selectedApplicant}
          onClose={() => setSelectedApplicant(null)}
        />
      )}

      {showAddForm && (
        <AddApplicantForm
          onClose={() => setShowAddForm(false)}
          onSubmit={handleAddApplicant}
        />
      )}
    </div>
  );
}
