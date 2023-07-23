import { useState, useEffect } from 'react';

const useLocalStorageWithExpiry = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const currentTime = new Date().getTime();

      if (storedValue && currentTime - storedValue.time > 24 * 60 * 60 * 1000) {
        localStorage.removeItem(key);
        setStoredValue(null);
      }
    } catch (error) {
      console.log(error);
    }
  }, [key, storedValue]);

  const setValue = value => {
    try {
      const valueToStore = {
        value: value,
        time: new Date().getTime()
      };

      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue ? storedValue.value : null, setValue];
};

export default useLocalStorageWithExpiry;
