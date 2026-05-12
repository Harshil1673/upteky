import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchFilter from "./components/SearchFilter";
import ApplicantCard from "./components/ApplicantCard";
import ApplicantModal from "./components/ApplicantModal";
import AddApplicantForm from "./components/AddApplicantForm";
import { fetchApplicants } from "./api";

export default function App() {
  // Dark mode
  const [dark, setDark] = useState(false);

  // Applicant data
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search and filter
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Modals
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Toggle dark class on html element
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // Fetch applicants on mount
  useEffect(() => {
    fetchApplicants()
      .then((data) => setApplicants(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Filter applicants based on search and status
  const filtered = applicants.filter((a) => {
    const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Add new applicant to the list
  function handleAddApplicant(newApplicant) {
    setApplicants([newApplicant, ...applicants]);
    setShowAddForm(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header dark={dark} setDark={setDark} onAddClick={() => setShowAddForm(true)} />

      <main className="max-w-5xl mx-auto px-4 py-6">
        <SearchFilter
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {/* Loading state */}
        {loading && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-10">Loading applicants...</p>
        )}

        {/* Error state */}
        {error && (
          <p className="text-center text-red-500 py-10">Error: {error}</p>
        )}

        {/* No results */}
        {!loading && !error && filtered.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-10">No applicants found.</p>
        )}

        {/* Applicant grid */}
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
      </main>

      {/* Detail modal */}
      {selectedApplicant && (
        <ApplicantModal
          applicant={selectedApplicant}
          onClose={() => setSelectedApplicant(null)}
        />
      )}

      {/* Add form modal */}
      {showAddForm && (
        <AddApplicantForm
          onClose={() => setShowAddForm(false)}
          onSubmit={handleAddApplicant}
        />
      )}
    </div>
  );
}
