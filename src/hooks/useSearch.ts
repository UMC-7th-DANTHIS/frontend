import { useState, useEffect } from 'react';

import axiosInstance from '../api/axios-instance';

const useSearch = (select, temp, currentPage) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!select || !temp) return;

    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await axiosInstance.get(
          `/search/${select}?query=${temp}&page=${currentPage}`
        );
        setData(response.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [select, temp, currentPage]);

  return { data, isLoading, isError };
};

export default useSearch;
