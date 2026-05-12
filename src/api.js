// List of possible statuses for applicants
export const STATUSES = ["Applied", "Screening", "Interview", "Offered", "Hired", "Rejected"];

// Skills to randomly assign to fetched users
const SKILLS = [
  "JavaScript", "React", "Node.js", "Python", "Java",
  "CSS", "HTML", "SQL", "MongoDB", "Git",
];

const COLLEGES = [
  "IIT Bombay", "IIT Delhi", "NIT Trichy", "BITS Pilani",
  "MIT", "Stanford", "VIT Vellore", "DTU Delhi",
];

// Pick random items from an array
function pickRandom(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Convert a DummyJSON user into our applicant format
function toApplicant(user) {
  return {
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    phone: user.phone,
    image: user.image,
    college: pickRandom(COLLEGES, 1)[0],
    skills: pickRandom(SKILLS, 2 + Math.floor(Math.random() * 3)),
    status: pickRandom(STATUSES, 1)[0],
  };
}

// Fetch applicants from DummyJSON
export async function fetchApplicants() {
  const res = await fetch("https://dummyjson.com/users?limit=10&select=id,firstName,lastName,email,phone,image");
  if (!res.ok) throw new Error("Failed to fetch");
  const data = await res.json();
  return data.users.map(toApplicant);
}
