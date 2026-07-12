import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import { Task } from "../../context/TaskContext";
import {
    sortTasksByDeadline,
    getDeadlineStatus,
} from "../../utils/deadline";

import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";
import { Typography } from "../../theme/typography";
import HomeCard from "./HomeCard";

type UpcomingDeadlineCardProps = {
    tasks: Task[];
};

export default function UpcomingDeadlineCard({
    tasks,
}: UpcomingDeadlineCardProps) {

    const upcomingTasks = sortTasksByDeadline(
        tasks.filter((task) => !task.completed)
    );

    const nextTask = upcomingTasks[0];
    const status = nextTask
        ? getDeadlineStatus(
            nextTask.deadline,
            nextTask.deadlineTime
        )
        : null;

    return (
        <HomeCard>
            <Text style={styles.title}>
                Upcoming Deadline
            </Text>

            {nextTask ? (
                <>
                    <Text style={styles.taskName}>
                        {nextTask.taskName}
                    </Text>

                    <Text style={styles.course}>
                        {nextTask.course}
                    </Text>

                    <Text style={styles.deadline}>
                        {nextTask.deadline}
                    </Text>

                    <Text style={styles.time}>
                        {nextTask.deadlineTime}
                    </Text>

                    <Text
                        style={[
                            styles.status,
                            {
                                color: status?.color,
                            },
                        ]}
                    >
                        {status?.text}
                    </Text>
                </>
            ) : (
                <Text style={styles.empty}>
                    No upcoming tasks.
                </Text>
            )}
        </HomeCard>
    );
}

const styles = StyleSheet.create({

    title: {
        ...Typography.h3,
        color: Colors.text,
        marginBottom: Spacing.sm,
    },

    taskName: {
        ...Typography.body,
        fontWeight: "700",
        color: Colors.text,
    },

    course: {
        marginTop: 4,
        ...Typography.caption,
        color: Colors.textSecondary,
    },

    deadline: {
        marginTop: 8,
        ...Typography.caption,
        color: Colors.primary,
        fontWeight: "600",
    },

    time: {
        marginTop: 2,
        ...Typography.caption,
        color: Colors.primary,
        fontWeight: "600",
    },

    status: {
        marginTop: 6,
        ...Typography.caption,
        fontWeight: "700",
    },

    empty: {
        ...Typography.body,
        color: Colors.textSecondary,
    },
});