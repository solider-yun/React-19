import { useContext, useEffect } from "react";
import { MediaContext } from "../context/mediaContext";

const Main = () => {
  const media = useContext(MediaContext);

  const handle = () => {
    console.log(media);
  };

  useEffect(() => {
    console.log(media);
  }, [media]);

  return (
    <>
      <button onClick={handle}>zmfflr</button>
    </>
  );
};

export default Main;
