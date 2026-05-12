import { useState } from 'react';
import { X } from 'lucide-react';
import { STATUSES, SKILLS_POOL } from '../services/api';

const INITIAL_FORM = {
  name: '',
  email: '',
  college: '',
  skills: '',
  status: 'Applied',
};

function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = 'Name is required';
  } else if (form.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!form.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email';
  }

  if (!form.college.trim()) {
    errors.college = 'College name is required';
  }

  if (!form.skills.trim()) {
    errors.skills = 'At least one skill is required';
  }

  if (!form.status) {
    errors.status = 'Status is required';
  }

  return errors;
}

export default function AddApplicantForm({ onClose, onSubmit }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    try {
      const newApplicant = {
        id: Date.now(),
        name: form.name.trim(),
        email: form.email.trim(),
        college: form.college.trim(),
        skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
        status: form.status,
        phone: '',
        image: `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name.trim())}&background=3b82f6&color=fff&size=64`,
        appliedDate: new Date().toISOString().split('T')[0],
        experience: '0 years',
        bio: `New applicant from ${form.college.trim()}.`,
      };

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      onSubmit(newApplicant);
    } catch {
      setErrors({ form: 'Failed to add applicant. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      id="add-applicant-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        id="add-applicant-modal"
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-slate-100 dark:border-slate-700">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Add New Applicant
          </h2>
          <button
            id="close-add-form-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-white dark:hover:bg-slate-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errors.form && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
              {errors.form}
            </div>
          )}

          <FormField
            id="form-name"
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="e.g. John Doe"
          />

          <FormField
            id="form-email"
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="e.g. john@example.com"
          />

          <FormField
            id="form-college"
            label="College / University"
            name="college"
            value={form.college}
            onChange={handleChange}
            error={errors.college}
            placeholder="e.g. MIT"
          />

          <FormField
            id="form-skills"
            label="Skills"
            name="skills"
            value={form.skills}
            onChange={handleChange}
            error={errors.skills}
            placeholder="e.g. React, Node.js, Python"
            hint="Separate skills with commas"
          />

          {/* Status Select */}
          <div>
            <label
              htmlFor="form-status"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
            >
              Application Status
            </label>
            <select
              id="form-status"
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-colors"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {errors.status && (
              <p className="mt-1 text-xs text-red-500">{errors.status}</p>
            )}
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              id="submit-applicant-btn"
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 px-4 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium text-sm rounded-lg transition-colors shadow-sm"
            >
              {submitting ? 'Adding...' : 'Add Applicant'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormField({ id, label, name, type = 'text', value, onChange, error, placeholder, hint }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 ${
          error
            ? 'border-red-300 dark:border-red-500'
            : 'border-slate-200 dark:border-slate-600'
        }`}
      />
      {hint && !error && (
        <p className="mt-1 text-xs text-slate-400">{hint}</p>
      )}
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
