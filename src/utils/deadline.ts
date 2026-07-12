export function getDeadlineDate(
    deadline: string,
    deadlineTime: string
) {
    const [day, month, year] = deadline
        .split("/")
        .map(Number);

    const [hour, minute] = deadlineTime
        .split(":")
        .map(Number);

    return new Date(
        year,
        month - 1,
        day,
        hour,
        minute
    );
}

export function sortTasksByDeadline(tasks: any[]) {
    return [...tasks].sort((a, b) => {

        const deadlineDiff =
            getDeadlineDate(
                a.deadline,
                a.deadlineTime
            ).getTime() -
            getDeadlineDate(
                b.deadline,
                b.deadlineTime
            ).getTime();

        if (deadlineDiff !== 0) {
            return deadlineDiff;
        }

        return a.createdAt - b.createdAt;
    });
}

export function getDeadlineStatus(
    deadline: string,
    deadlineTime: string
) {
    const now = new Date();

    const due = getDeadlineDate(
        deadline,
        deadlineTime
    );

    const diff = due.getTime() - now.getTime();

    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // =========================
    // OVERDUE
    // =========================
    if (diff < 0) {

        const overdueMinutes = Math.max(
            1,
            Math.floor(Math.abs(diff) / minute)
        );

        if (overdueMinutes < 60) {
            return {
                text:
                    overdueMinutes === 1
                        ? "Overdue by 1 minute"
                        : `Overdue by ${overdueMinutes} minutes`,
                color: "#F44336",
            };
        }

        const overdueHours = Math.floor(
            Math.abs(diff) / hour
        );

        if (overdueHours < 24) {
            return {
                text:
                    overdueHours === 1
                        ? "Overdue by 1 hour"
                        : `Overdue by ${overdueHours} hours`,
                color: "#F44336",
            };
        }

        const overdueDays = Math.floor(
            Math.abs(diff) / day
        );

        return {
            text:
                overdueDays === 1
                    ? "Overdue by 1 day"
                    : `Overdue by ${overdueDays} days`,
            color: "#F44336",
        };
    }

    // =========================
    // BELUM OVERDUE
    // =========================

    const remainingMinutes = Math.ceil(diff / minute);

    if (remainingMinutes < 60) {
        return {
            text:
                remainingMinutes === 1
                    ? "1 minute left"
                    : `${remainingMinutes} minutes left`,
            color: "#FFC107",
        };
    }

    const remainingHours = Math.ceil(diff / hour);

    if (remainingHours < 24) {
        return {
            text:
                remainingHours === 1
                    ? "1 hour left"
                    : `${remainingHours} hours left`,
            color: "#26C6DA",
        };
    }

    const today = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    );

    const dueDay = new Date(
        due.getFullYear(),
        due.getMonth(),
        due.getDate()
    );

    const dayDiff = Math.round(
        (dueDay.getTime() - today.getTime()) / day
    );

    if (dayDiff === 1) {
        return {
            text: "Tomorrow",
            color: "#26C6DA",
        };
    }

    return {
        text:
            dayDiff === 1
                ? "1 day left"
                : `${dayDiff} days left`,
        color: "#4CAF50",
    };
}