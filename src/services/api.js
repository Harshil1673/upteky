const STATUSES = ['Applied', 'Screening', 'Interview', 'Offered', 'Hired', 'Rejected'];

const SKILLS_POOL = [
  'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'TypeScript',
  'SQL', 'MongoDB', 'AWS', 'Docker', 'Git', 'CSS', 'HTML',
  'GraphQL', 'Redux', 'Next.js', 'Vue.js', 'Angular', 'Kotlin',
  'Swift', 'Go', 'Rust', 'C++', 'PHP', 'Ruby', 'Django',
  'Flask', 'Spring Boot', 'TensorFlow', 'Machine Learning',
];

const COLLEGES = [
  'MIT', 'Stanford University', 'Harvard University', 'IIT Bombay',
  'IIT Delhi', 'NIT Trichy', 'BITS Pilani', 'UC Berkeley',
  'Georgia Tech', 'Carnegie Mellon', 'Oxford University',
  'Cambridge University', 'ETH Zurich', 'University of Toronto',
  'NUS Singapore', 'IIIT Hyderabad', 'DTU Delhi', 'VIT Vellore',
];

/**
 * Transform DummyJSON user data into applicant format
 */
function transformUser(user, index) {
  const skillCount = 2 + Math.floor(Math.random() * 4);
  const shuffled = [...SKILLS_POOL].sort(() => 0.5 - Math.random());
  const skills = shuffled.slice(0, skillCount);
  const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];
  const college = COLLEGES[Math.floor(Math.random() * COLLEGES.length)];

  return {
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    phone: user.phone || '',
    image: user.image || '',
    college,
    skills,
    status,
    appliedDate: new Date(
      Date.now() - Math.floor(Math.random() * 90) * 86400000
    ).toISOString().split('T')[0],
    experience: `${Math.floor(Math.random() * 8)} years`,
    bio: `Passionate developer with experience in ${skills.slice(0, 2).join(' and ')}. Graduate of ${college}.`,
  };
}

/**
 * Fetch applicants from DummyJSON API
 */
export async function fetchApplicants(page = 1, limit = 12) {
  const skip = (page - 1) * limit;
  const response = await fetch(
    `https://dummyjson.com/users?limit=${limit}&skip=${skip}&select=id,firstName,lastName,email,phone,image`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch applicants');
  }

  const data = await response.json();

  return {
    applicants: data.users.map((user, i) => transformUser(user, skip + i)),
    total: data.total,
    page,
    limit,
    totalPages: Math.ceil(data.total / limit),
  };
}

/**
 * Fetch a single applicant by ID
 */
export async function fetchApplicantById(id) {
  const response = await fetch(
    `https://dummyjson.com/users/${id}?select=id,firstName,lastName,email,phone,image`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch applicant');
  }

  const user = await response.json();
  return transformUser(user, id);
}

export { STATUSES, SKILLS_POOL, COLLEGES };
