import { Task } from "../context/TaskContext";

// Helper to format Date to DD/MM/YYYY
function formatDate(date: Date): string {
  const d = date.getDate().toString().padStart(2, "0");
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

export function generateDummyTasks(): Task[] {
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

  return [
    {
      id: 1001,
      taskName: "Submit Calculus Assignment",
      course: "Math 101",
      deadline: formatDate(yesterday),
      deadlineTime: "23:59",
      completed: false,
      createdAt: now.getTime(),
    },
    {
      id: 1002,
      taskName: "Read Chapter 4-5",
      course: "History 201",
      deadline: formatDate(yesterday),
      deadlineTime: "10:00",
      completed: true,
      createdAt: now.getTime(),
    },
    {
      id: 1003,
      taskName: "Review React Native Docs",
      course: "Mobile Dev",
      deadline: formatDate(today),
      deadlineTime: "15:00",
      completed: false,
      createdAt: now.getTime(),
    },
    {
      id: 1004,
      taskName: "Buy Groceries",
      course: "Personal",
      deadline: formatDate(today),
      deadlineTime: "19:30",
      completed: false,
      createdAt: now.getTime(),
    },
    {
      id: 1005,
      taskName: "Prepare presentation slides",
      course: "Business 301",
      deadline: formatDate(tomorrow),
      deadlineTime: "08:00",
      completed: false,
      createdAt: now.getTime(),
    },
    {
      id: 1006,
      taskName: "Fix UI Bugs in Profile Screen",
      course: "Software Eng",
      deadline: formatDate(threeDaysFromNow),
      deadlineTime: "12:00",
      completed: false,
      createdAt: now.getTime(),
    },
    {
      id: 1007,
      taskName: "Complete Lab Report",
      course: "Physics 101",
      deadline: formatDate(threeDaysFromNow),
      deadlineTime: "23:59",
      completed: false,
      createdAt: now.getTime(),
    },
    {
      id: 1008,
      taskName: "Group Meeting prep",
      course: "Project Management",
      deadline: formatDate(nextWeek),
      deadlineTime: "16:00",
      completed: false,
      createdAt: now.getTime(),
    },
    {
      id: 1009,
      taskName: "Midterm Exam",
      course: "Math 101",
      deadline: formatDate(nextWeek),
      deadlineTime: "09:00",
      completed: false,
      createdAt: now.getTime(),
    },
    {
      id: 1010,
      taskName: "Final Project Submission",
      course: "Mobile Dev",
      deadline: formatDate(nextMonth),
      deadlineTime: "23:59",
      completed: false,
      createdAt: now.getTime(),
    }
  ];
}
