import { useEffect, useState } from "react";
import axios from "../axios";
import { toast } from "react-toastify";

export const useApiData = (url, errorMessage = "Failed to fetch data") => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [refetch, setRefetch] = useState(0);

  const getData = async () => {
    try {
      setIsLoading(true);
      const result = await axios.get(url);

      if (result.statusText === "OK") {
        setData(result.data);
      } else {
        toast.error(errorMessage);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err);
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    getData();
  }, [url, refetch]);

  return {
    data,
    isLoading,
    error,
    refetch: () => setRefetch((r) => r + 1),
  };
};
