export type Role = "student" | "teacher" | "admin";
export type AttendanceStatus = "present" | "sick" | "permit" | "alpha";

export type User = {
  id: string;
  nis: string;
  name: string;
  kelas: string;
  role?: string;
};

export type AttendanceRecord = {
  id: string;
  userId: string;
  dateISO: string; // yyyy-mm-dd
  time: string; // hh:mm:ss
  status: AttendanceStatus;
};

// 🔹 data awal (read-only untuk import luar)
export const users: User[] = [
  { id: "u1", nis: "1001", name: "Vincentius Ferrer Pioraka", kelas: "XI RPL 5", role: "student" },
  { id: "u2", nis: "1002", name: "Rairu Riri Rarura", kelas: "XI RPL 5", role: "student" },
  { id: "u3", nis: "2001", name: "Drs. Lalio Lio", kelas: "Teacher", role: "teacher" },
  { id: "u4", nis: "2002", name: "Dra. Mihu or Mahi Mahi", kelas: "Teacher", role: "teacher" },
];

// 🔹 versi internal yang bisa diubah oleh fungsi CRUD
let usersData = [...users];

// sample attendance records
let attendance: AttendanceRecord[] = [
  { id: "a1", userId: "u1", dateISO: "2025-11-01", time: "07:05:12", status: "present" },
  { id: "a2", userId: "u1", dateISO: "2025-11-02", time: "07:08:45", status: "present" },
  { id: "a3", userId: "u2", dateISO: "2025-11-02", time: "07:10:09", status: "present" },
];

function generateId(prefix = "id") {
  return prefix + Math.random().toString(36).slice(2, 9);
}

/** Users */
export async function getUsers() {
  await new Promise(r => setTimeout(r, 150));
  return [...usersData];
}

export async function getUserById(idOrNis: string) {
  await new Promise(r => setTimeout(r, 100));
  return usersData.find(u => u.id === idOrNis || u.nis === idOrNis) || null;
}

export async function addUser(payload: Omit<User, "id">) {
  await new Promise(r => setTimeout(r, 150));
  const newUser: User = { ...payload, id: generateId("u") };
  usersData.push(newUser);
  return newUser;
}

export async function updateUser(id: string, patch: Partial<User>) {
  await new Promise(r => setTimeout(r, 150));
  usersData = usersData.map(u => (u.id === id ? { ...u, ...patch } : u));
  return usersData.find(u => u.id === id) || null;
}

/** Attendance */
export async function recordAttendance(userId: string, status: AttendanceStatus) {
  await new Promise(r => setTimeout(r, 120));
  const now = new Date();
  const rec: AttendanceRecord = {
    id: generateId("a"),
    userId,
    dateISO: now.toISOString().slice(0, 10),
    time: now.toTimeString().slice(0, 8),
    status,
  };
  attendance.push(rec);
  return rec;
}

export async function getAttendanceHistoryByUser(userId: string) {
  await new Promise(r => setTimeout(r, 120));
  return attendance
    .filter(a => a.userId === userId)
    .sort((x, y) => y.dateISO.localeCompare(x.dateISO) || y.time.localeCompare(x.time));
}

export async function getAllAttendance() {
  await new Promise(r => setTimeout(r, 150));
  return [...attendance];
}

/** Summaries & analysis */
export async function getMonthlySummary(userId: string, monthISO = "2025-11") {
  await new Promise(r => setTimeout(r, 150));
  const records = attendance.filter(a => a.userId === userId && a.dateISO.startsWith(monthISO));
  const summary = { present: 0, sick: 0, permit: 0, alpha: 0 };
  records.forEach(r => {
    if (r.status === "present") summary.present++;
    if (r.status === "sick") summary.sick++;
    if (r.status === "permit") summary.permit++;
    if (r.status === "alpha") summary.alpha++;
  });
  return { monthISO, ...summary, totalDaysRecorded: records.length };
}

export async function analyzeByClass(monthISO = "2025-11") {
  await new Promise(r => setTimeout(r, 180));
  const classes: Record<string, number> = {};
  attendance.forEach(a => {
    if (!a.dateISO.startsWith(monthISO)) return;
    const u = usersData.find(x => x.id === a.userId);
    if (!u) return;
    const k = u.kelas || "Unknown";
    if (!classes[k]) classes[k] = 0;
    if (a.status === "present") classes[k]++;
  });
  const result = Object.entries(classes).sort((a, b) => b[1] - a[1]);
  return result.map(([klass, presentCount]) => ({ klass, presentCount }));
}