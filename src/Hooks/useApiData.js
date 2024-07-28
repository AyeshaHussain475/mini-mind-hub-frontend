import { useEffect, useState } from "react";
import axios from "../axios";
import { toast } from "react-toastify";

export const useApiData = (
  url,
  page,
  limit,
  errorMessage = "Failed to fetch data"
) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [refetch, setRefetch] = useState(0);

  const getData = async () => {
    try {
      const result = await axios.get(url);
      console.log("limit:", limit);
      console.log("pages", page);

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
  }, [url, refetch, page, limit]);

  return {
    data,
    isLoading,
    error,
    refetch: () => setRefetch((r) => r + 1),
  };
};
