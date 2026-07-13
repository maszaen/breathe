import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type SettingsContextType = {
  isDarkMode: boolean;
  isNotifEnabled: boolean;
  isSoundEnabled: boolean;
  toggleDarkMode: () => void;
  toggleNotif: () => void;
  toggleSound: () => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const SETTINGS_KEY = "@breathe_settings";

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotifEnabled, setIsNotifEnabled] = useState(true);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const stored = await AsyncStorage.getItem(SETTINGS_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setIsDarkMode(parsed.isDarkMode ?? false);
          setIsNotifEnabled(parsed.isNotifEnabled ?? true);
          setIsSoundEnabled(parsed.isSoundEnabled ?? true);
        }
      } catch (error) {
        console.error("Failed to load settings", error);
      }
    };
    loadSettings();
  }, []);

  const saveSettings = async (newSettings: { isDarkMode: boolean; isNotifEnabled: boolean; isSoundEnabled: boolean }) => {
    try {
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
    } catch (error) {
      console.error("Failed to save settings", error);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      saveSettings({ isDarkMode: next, isNotifEnabled, isSoundEnabled });
      return next;
    });
  };

  const toggleNotif = () => {
    setIsNotifEnabled((prev) => {
      const next = !prev;
      saveSettings({ isDarkMode, isNotifEnabled: next, isSoundEnabled });
      return next;
    });
  };

  const toggleSound = () => {
    setIsSoundEnabled((prev) => {
      const next = !prev;
      saveSettings({ isDarkMode, isNotifEnabled, isSoundEnabled: next });
      return next;
    });
  };

  return (
    <SettingsContext.Provider value={{
      isDarkMode,
      isNotifEnabled,
      isSoundEnabled,
      toggleDarkMode,
      toggleNotif,
      toggleSound,
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
