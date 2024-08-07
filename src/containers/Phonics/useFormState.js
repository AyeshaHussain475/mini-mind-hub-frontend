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
  const [images, setImages] = useState([]);
  const [sound, setSound] = useState();
  const [type, setType] = useState("");

  const debounceValue = useDebounce(searchByName);

  const animalQuery = useApiData(
    `/animal/media?page=${page}&limit=${limit}&search=${debounceValue}&type=${type}`,
    "Failed to fetch animals"
  );

  console.log({ type });

  const postMedia = async () => {
    const formData = new FormData();

    images.forEach((image) => {
      formData.append("images", image);
    });
    formData.append("name", name);
    formData.append("sound", sound);
    formData.append("description", "is hard coded");
    formData.append("type", "mammals");

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
    setSound(e.target.files[0]);
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
    images,
    sound,
    toggleForm,
    onAudioChange,
    handleLimitChange,
    setName,
    setImages,
    setPage,
    searchByName,
    setSearchByName,
    type,
    setType,
  };
}
