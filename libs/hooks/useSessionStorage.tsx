"use client";
import { useEffect, useState } from "react";

type SetValue<T> = T | ((val: T) => T);

function useSessionStorage<T>(
  key: string,
  initialValue: T
): [T, (value: SetValue<T>) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window !== "undefined") {
        const item = window.sessionStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }
    } catch (error) {
      console.log(error);
    }
    return initialValue;
  });

  // Update sessionStorage when storedValue changes
  useEffect(() => {
    try {
      const valueToStore =
        typeof storedValue === "function"
          ? (storedValue as (val: T) => T)(storedValue)
          : storedValue;
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  }, [key, storedValue]);

  // Listen to sessionStorage changes (note: won't trigger in same tab)
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.storageArea === window.sessionStorage && event.key === key) {
        try {
          const newValue = event.newValue
            ? JSON.parse(event.newValue)
            : initialValue;
          setStoredValue(newValue);
        } catch (error) {
          console.error("Failed to parse sessionStorage change", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, initialValue]);

  return [storedValue, setStoredValue];
}

export default useSessionStorage;
