import { useState } from "react";
import { useApiData } from "../../hooks/useApiData";
import { useDebounce } from "../../hooks/useDebounce";
import { defaultLimit } from "../../utils/constants";
import { toast } from "react-toastify";
import axios from "../../axios";

export default function useFormState() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(defaultLimit);
  const [searchByName, setSearchByName] = useState("");
  const [disable, setDisable] = useState(false);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [soundUrl, setSoundUrl] = useState("");

  const debounceValue = useDebounce(searchByName);

  const animalQuery = useApiData(
    `/animal/media?page=${page}&limit=${limit}&search=${debounceValue}`,
    "Failed to fetch animals"
  );

  const postMedia = async () => {
    const formData = new FormData();

    formData.append("imageUrl", imageUrl);
    formData.append("name", name);
    formData.append("soundUrl", soundUrl);

    try {
      const result = await axios.post("/animal/media", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (result.status === 201) {
        toast.success("Media is uploaded successfully");
        animalQuery.refetch();
      } else {
        toast.error("Failed to upload media. Try again!");
      }
    } catch (error) {
      toast.error("Media is failed to upload");
      console.log(error);
    }
  };

  const toggleForm = () => {
    setDisable(!disable);
  };

  const onAudioChange = (e) => {
    setSoundUrl(e.target.files[0]);
  };

  const handleLimitChange = (e) => {
    setLimit(e.target.value);
    setPage(1);
  };

  return {
    page,
    limit,
    animalQuery,
    postMedia,
    disable,
    name,
    imageUrl,
    soundUrl,
    toggleForm,
    onAudioChange,
    handleLimitChange,
    setName,
    setImageUrl,
    setPage,
    searchByName,
    setSearchByName,
  };
}
