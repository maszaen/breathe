import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export type Task = {
  id: number;
  taskName: string;
  course: string;
  deadline: string;
  deadlineTime: string;
  completed: boolean;
  createdAt: number;
};

type TaskContextType = {
  tasks: Task[];
  addTask: (
    task: Omit<Task, "id" | "completed" | "createdAt">
  ) => void;
  deleteTask: (id: number) => void;
  toggleTask: (id: number) => void;
  updateTask: (task: Task) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

export function TaskProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (
    task: Omit<Task, "id" | "completed" | "createdAt">
  ) => {
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        completed: false,
        createdAt: Date.now(),
        ...task,
      }
    ]);
  };

  const deleteTask = (id: number) => {
    setTasks((prev) =>
      prev.filter((task) => task.id !== id)
    );
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
            ...task,
            completed: !task.completed,
          }
          : task
      )
    );
  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === updatedTask.id
          ? updatedTask
          : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        toggleTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error(
      "useTask must be used inside TaskProvider"
    );
  }

  return context;
}