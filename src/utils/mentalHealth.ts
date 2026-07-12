import { Task } from "../context/TaskContext";

import { Colors } from "../theme/colors";

type MentalHealthResult = {
  percentage: number;
  status: string;
  color: string;
  analysis: string;
  recommendation: string;
};

export function calculateMentalHealth(
  tasks: Task[]
): MentalHealthResult {
  let stress = 0;

  const today = new Date();

  tasks.forEach((task) => {
    if (task.completed) return;

    const parts = task.deadline.split("/");

    if (parts.length !== 3) return;

    const deadline = new Date(
      Number(parts[2]),
      Number(parts[1]) - 1,
      Number(parts[0])
    );

    const diffTime =
      deadline.getTime() - today.getTime();

    const diffDays = Math.ceil(
      diffTime / (1000 * 60 * 60 * 24)
    );

    if (diffDays <= 0) {
      stress += 35;
    } else if (diffDays <= 1) {
      stress += 25;
    } else if (diffDays <= 3) {
      stress += 15;
    } else if (diffDays <= 7) {
      stress += 10;
    } else {
      stress += 5;
    }
  });

  if (stress > 100) stress = 100;

  const percentage = 100 - stress;

  let status = "";
  let color = "";

  let analysis = "";
  let recommendation = "";

  if (percentage >= 80) {
    status = "Healthy";
    color = Colors.success;

    analysis =
      "Your workload is well balanced today.";

    recommendation =
      "Keep maintaining your current pace.";

  } else if (percentage >= 60) {
    status = "Good";
    color = Colors.success; // Or a slightly lighter green, but success is fine

    analysis =
      "You have a manageable workload.";

    recommendation =
      "Take short breaks while working.";

  } else if (percentage >= 40) {
    status = "Need To Rest";
    color = Colors.warning;

    analysis =
      "Your workload is starting to increase.";

    recommendation =
      "Finish one task before starting another.";

  } else if (percentage >= 20) {
    status = "High Stress";
    color = Colors.warning;

    analysis =
      "Several deadlines are approaching.";

    recommendation =
      "Focus on the nearest deadline first.";

  } else {
    status = "Critical";
    color = Colors.danger;

    analysis =
      "Your workload is extremely heavy.";

    recommendation =
      "Take a short break before continuing your work.";
  }

  return {
    percentage,
    status,
    color,
    analysis,
    recommendation,
  };
}