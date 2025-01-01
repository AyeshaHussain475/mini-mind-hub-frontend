import axios from "../../axios";
import React, { useEffect } from "react";

const Deaf = () => {
  const getDeafMedia = async () => {
    const deafMedia = await axios.get("/deaf/media");
    console.log(deafMedia);
  };

  useEffect(() => {
    getDeafMedia();
  }, []);
  return <div>Good</div>;
};

export default Deaf;
