# CandidateHub - Candidate Management Dashboard

A modern, responsive Candidate Management Dashboard built with **React.js**, **Vite**, and **Tailwind CSS v4**.

## Features

- **Applicant Listing** — View applicants in a responsive card grid with name, email, college, skills, and status
- **Search & Filter** — Search by name, filter by application status
- **Applicant Detail View** — Click any card to open a modal with full applicant details
- **Add Applicant Form** — Add new applicants with full form validation and error handling
- **API Integration** — Fetches real user data from [DummyJSON API](https://dummyjson.com/)
- **Dark Mode** — Toggle between light and dark themes (persisted in localStorage)
- **Pagination** — Navigate through pages of applicants
- **Loading States** — Skeleton loading UI for smooth data fetching experience
- **Responsive Design** — Fully responsive from mobile to desktop

## Tech Stack

| Technology    | Purpose              |
|---------------|----------------------|
| React 19      | UI Framework         |
| Vite          | Build Tool           |
| Tailwind CSS 4| Styling              |
| Lucide React  | Icons                |
| DummyJSON API | Mock Data Source     |

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Clone or navigate to the project
cd upteky

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── AddApplicantForm.jsx   # New applicant form with validation
│   ├── ApplicantCard.jsx      # Individual applicant card
│   ├── ApplicantModal.jsx     # Detail view modal
│   ├── Header.jsx             # Top navigation bar
│   ├── LoadingSkeleton.jsx    # Loading placeholder UI
│   ├── Pagination.jsx         # Page navigation
│   ├── SearchFilter.jsx       # Search & status filter controls
│   ├── StatsBar.jsx           # Dashboard statistics
│   └── StatusBadge.jsx        # Reusable status badge
├── hooks/
│   └── useHooks.js            # Custom hooks (useFetch, useDarkMode, useDebounce)
├── services/
│   └── api.js                 # API service & data transformation
├── App.jsx                    # Main application component
├── index.css                  # Tailwind CSS entry
└── main.jsx                   # React entry point
```

## API

Data is fetched from the [DummyJSON Users API](https://dummyjson.com/users) and transformed into applicant format with randomized skills, colleges, and application statuses.

## Application Status Types

| Status     | Color   |
|------------|---------|
| Applied    | Blue    |
| Screening  | Yellow  |
| Interview  | Purple  |
| Offered    | Emerald |
| Hired      | Green   |
| Rejected   | Red     |
