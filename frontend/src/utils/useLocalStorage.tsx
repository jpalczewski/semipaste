import React, { useState, useEffect } from "react";

type ReturnType<T> = [
  T | undefined,
  React.Dispatch<React.SetStateAction<T | undefined>>
];
export const useLocalStorage = <T,>(key: any, initVal?: T): ReturnType<T> => {
  const [state, setState] = useState<T | undefined>(() => {
    if (!initVal) return;
    try {
      const value = localStorage.getItem(key);
      if (!initVal && !value) return;
      return value ? JSON.parse(value) : initVal;
    } catch (err) {
      return initVal;
    }
  });

  useEffect(() => {
    if (state) {
      try {
        localStorage.setItem(key, JSON.stringify(state));
      } catch (err) {
        console.log(err);
      }
    }
  }, [state]);
  return [state, setState];
};
