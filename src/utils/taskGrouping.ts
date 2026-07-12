import {
    getDeadlineDate,
    sortTasksByDeadline,
} from "./deadline";

export function groupTasks(tasks: any[]) {
    const now = new Date();

    const today = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    );

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    const overdue: any[] = [];
    const todayTasks: any[] = [];
    const tomorrowTasks: any[] = [];
    const thisWeek: any[] = [];
    const later: any[] = [];

    tasks.forEach((task) => {

        if (task.completed) return;

        const due = getDeadlineDate(
            task.deadline,
            task.deadlineTime
        );

        if (due < now) {
            overdue.push(task);
            return;
        }

        if (
            due.getFullYear() === today.getFullYear() &&
            due.getMonth() === today.getMonth() &&
            due.getDate() === today.getDate()
        ) {
            todayTasks.push(task);
            return;
        }

        if (
            due.getFullYear() === tomorrow.getFullYear() &&
            due.getMonth() === tomorrow.getMonth() &&
            due.getDate() === tomorrow.getDate()
        ) {
            tomorrowTasks.push(task);
            return;
        }

        if (due <= nextWeek) {
            thisWeek.push(task);
            return;
        }

        later.push(task);
    });

    const sections = [];

    const sortedOverdue =
        sortTasksByDeadline(overdue);

    const sortedToday =
        sortTasksByDeadline(todayTasks);

    const sortedTomorrow =
        sortTasksByDeadline(tomorrowTasks);

    const sortedThisWeek =
        sortTasksByDeadline(thisWeek);

    const sortedLater =
        sortTasksByDeadline(later);

    if (sortedOverdue.length > 0) {
        sections.push({
            title: "OVERDUE",
            count: sortedOverdue.length,
            color: "#F44336",
            data: sortedOverdue,
        });
    }

    if (sortedToday.length > 0) {
        sections.push({
            title: "TODAY",
            count: sortedToday.length,
            color: "#FFC107",
            data: sortedToday,
        });
    }

    if (sortedTomorrow.length > 0) {
        sections.push({
            title: "TOMORROW",
            count: sortedTomorrow.length,
            color: "#2196F3",
            data: sortedTomorrow,
        });
    }

    if (sortedThisWeek.length > 0) {
        sections.push({
            title: "THIS WEEK",
            count: sortedThisWeek.length,
            color: "#4CAF50",
            data: sortedThisWeek,
        });
    }

    if (sortedLater.length > 0) {
        sections.push({
            title: "UPCOMING",
            count: sortedLater.length,
            color: "#9E9E9E",
            data: sortedLater,
        });
    }

    return sections;
}