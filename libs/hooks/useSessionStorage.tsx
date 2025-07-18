
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

    return [storedValue, setStoredValue];
}

export default useSessionStorage;
