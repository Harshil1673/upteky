import { useState } from "react";
import { X } from "lucide-react";
import { STATUSES } from "../api";

export default function AddApplicantForm({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    college: "",
    skills: "",
    status: "Applied",
  });
  const [errors, setErrors] = useState({});

  // Simple validation
  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!form.email.includes("@")) errs.email = "Invalid email";
    if (!form.college.trim()) errs.college = "College is required";
    if (!form.skills.trim()) errs.skills = "Add at least one skill";
    return errs;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    // Create new applicant object
    const newApplicant = {
      id: Date.now(),
      name: form.name.trim(),
      email: form.email.trim(),
      college: form.college.trim(),
      skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
      status: form.status,
      phone: "",
      image: "",
    };

    onSubmit(newApplicant);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">Add Applicant</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Name */}
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Name</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input name="email" value={form.email} onChange={handleChange} placeholder="john@example.com"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* College */}
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">College</label>
            <input name="college" value={form.college} onChange={handleChange} placeholder="MIT"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {errors.college && <p className="text-red-500 text-xs mt-1">{errors.college}</p>}
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Skills (comma separated)</label>
            <input name="skills" value={form.skills} onChange={handleChange} placeholder="React, Node.js"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {errors.skills && <p className="text-red-500 text-xs mt-1">{errors.skills}</p>}
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Status</label>
            <select name="status" value={form.status} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <button type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium mt-2">
            Add Applicant
          </button>
        </form>
      </div>
    </div>
  );
}
