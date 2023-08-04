import { useEffect, useState } from 'react';
import { getUserId } from '../config/user';
import { convertData } from '../utils/data';

export function useFetchQuests(fetchFunc, { refetchFlag }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchFunc(getUserId());

        // convert data to special format
        setData(convertData(response));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [refetchFlag, fetchFunc]);

  return [data, setData];
}
