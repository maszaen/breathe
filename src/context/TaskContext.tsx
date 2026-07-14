import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { generateDynamicTasks } from "../utils/dummyTasks";

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
  resetTasks: (level: "low" | "medium" | "high") => void;
  clearTasks: () => void;
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
  const [isLoaded, setIsLoaded] = useState(false);

  // Load tasks on mount
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const stored = await AsyncStorage.getItem("BREATHE_TASKS");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setTasks(parsed);
          } else {
            setTasks(generateDynamicTasks("low"));
          }
        } else {
          setTasks(generateDynamicTasks("low"));
        }
      } catch (error) {
        console.error("Failed to load tasks from storage", error);
        setTasks(generateDynamicTasks("low"));
      } finally {
        setIsLoaded(true);
      }
    };

    loadTasks();
  }, []);

  // Save tasks on change
  useEffect(() => {
    if (isLoaded) {
      AsyncStorage.setItem("BREATHE_TASKS", JSON.stringify(tasks)).catch(err => {
        console.error("Failed to save tasks to storage", err);
      });
    }
  }, [tasks, isLoaded]);

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

  const resetTasks = (level: "low" | "medium" | "high") => {
    setTasks(generateDynamicTasks(level));
  };

  const clearTasks = () => {
    setTasks([]);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        toggleTask,
        updateTask,
        resetTasks,
        clearTasks,
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