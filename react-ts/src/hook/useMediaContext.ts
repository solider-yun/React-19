import { useContext } from "react";
import { MediaContext } from "../context/mediaContext";

export const useMediaContextState = () => {
  const state = useContext(MediaContext);
  if (!state) throw new Error("MediaContext NotFound");
  return state;
};