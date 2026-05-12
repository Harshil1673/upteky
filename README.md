# Candidate Management Dashboard

A simple React dashboard to manage job applicants. Built as part of an internship assignment.

## Features

- View applicants in a card layout
- Search applicants by name
- Filter by application status
- View applicant details in a modal
- Add new applicants with form validation
- Dark mode toggle
- Responsive design

## Tech Stack

- React.js (Vite)
- Tailwind CSS
- Lucide React (icons)
- DummyJSON API (mock data)

## Setup

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`

## Folder Structure

```
src/
├── components/
│   ├── AddApplicantForm.jsx
│   ├── ApplicantCard.jsx
│   ├── ApplicantModal.jsx
│   ├── Header.jsx
│   └── SearchFilter.jsx
├── api.js
├── App.jsx
├── index.css
└── main.jsx
```

## API

Uses [DummyJSON Users API](https://dummyjson.com/users) to fetch sample user data which is mapped to applicant format.
