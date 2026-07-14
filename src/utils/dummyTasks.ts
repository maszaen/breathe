import { Task } from "../context/TaskContext";

// Helper to format Date to DD/MM/YYYY
function formatDate(date: Date): string {
  const d = date.getDate().toString().padStart(2, "0");
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

export function generateDynamicTasks(level: "low" | "medium" | "high" = "low"): Task[] {
  const now = new Date();
  
  // Create relative dates
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);

  const today = new Date(now);
  
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const threeDaysFromNow = new Date(now);
  threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);

  const nextWeek = new Date(now);
  nextWeek.setDate(nextWeek.getDate() + 7);

  const nextMonth = new Date(now);
  nextMonth.setMonth(nextMonth.getMonth() + 1);

  const baseTasks: Task[] = [];

  if (level === "low") {
    // Low Stress (Target ~30 Stress -> 70% Mental Health "Healthy/Good")
    // 2 Completed, 1 in 3 days, 1 next week, 1 next month
    baseTasks.push(
      { id: Date.now() + 1, taskName: "Membaca Jurnal", course: "Keamanan Jaringan", deadline: formatDate(yesterday), deadlineTime: "10:00", completed: true, createdAt: now.getTime() },
      { id: Date.now() + 2, taskName: "Review Materi Kelas", course: "Sistem Operasi", deadline: formatDate(yesterday), deadlineTime: "12:00", completed: true, createdAt: now.getTime() },
      { id: Date.now() + 3, taskName: "Latihan Soal Ujian", course: "Math Discrete", deadline: formatDate(threeDaysFromNow), deadlineTime: "15:00", completed: false, createdAt: now.getTime() },
      { id: Date.now() + 4, taskName: "Membuat Laporan Praktikum", course: "Multimedia", deadline: formatDate(nextWeek), deadlineTime: "23:59", completed: false, createdAt: now.getTime() },
      { id: Date.now() + 5, taskName: "Kumpulkan Proposal Skripsi", course: "Metodologi Penelitian", deadline: formatDate(nextMonth), deadlineTime: "17:00", completed: false, createdAt: now.getTime() }
    );
  } else if (level === "medium") {
    // Medium Stress (Target ~75 Stress -> 25% Mental Health "High Stress")
    // 1 Today (35), 1 Tomorrow (25), 1 in 3 Days (15) = 75 Stress
    baseTasks.push(
      { id: Date.now() + 1, taskName: "Catatan Kuliah", course: "Pengantar TI", deadline: formatDate(yesterday), deadlineTime: "08:00", completed: true, createdAt: now.getTime() },
      { id: Date.now() + 2, taskName: "Kuis Online", course: "Statistika", deadline: formatDate(today), deadlineTime: "23:59", completed: false, createdAt: now.getTime() },
      { id: Date.now() + 3, taskName: "Mengerjakan PR", course: "Pemrograman Web", deadline: formatDate(tomorrow), deadlineTime: "10:00", completed: false, createdAt: now.getTime() },
      { id: Date.now() + 4, taskName: "Presentasi Mingguan", course: "Kecerdasan Buatan", deadline: formatDate(threeDaysFromNow), deadlineTime: "14:00", completed: false, createdAt: now.getTime() },
      { id: Date.now() + 5, taskName: "Meeting Kelompok", course: "Rekayasa Perangkat Lunak", deadline: formatDate(yesterday), deadlineTime: "16:00", completed: true, createdAt: now.getTime() }
    );
  } else {
    // High Stress (Target ~95 Stress -> 5% Mental Health "Critical")
    // 1 Overdue (35), 1 Today (35), 1 Tomorrow (25) = 95 Stress
    baseTasks.push(
      { id: Date.now() + 1, taskName: "Tugas Besar", course: "Grafika Komputer", deadline: formatDate(yesterday), deadlineTime: "23:59", completed: false, createdAt: now.getTime() },
      { id: Date.now() + 2, taskName: "Revisi Makalah", course: "Bahasa Indonesia", deadline: formatDate(today), deadlineTime: "18:00", completed: false, createdAt: now.getTime() },
      { id: Date.now() + 3, taskName: "Submit Proyek Akhir", course: "Mobile Development", deadline: formatDate(tomorrow), deadlineTime: "12:00", completed: false, createdAt: now.getTime() },
      { id: Date.now() + 4, taskName: "Desain UI/UX", course: "HCI", deadline: formatDate(yesterday), deadlineTime: "09:00", completed: true, createdAt: now.getTime() },
      { id: Date.now() + 5, taskName: "Quiz Dadakan", course: "Arsitektur Komputer", deadline: formatDate(today), deadlineTime: "10:00", completed: false, createdAt: now.getTime() } // This brings stress > 100, capped at 100
    );
  }

  return baseTasks;
}
