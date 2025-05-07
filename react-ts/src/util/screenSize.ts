import { MediaSizeType } from "../context/mediaContext";

export const ScreenSize = (width: number): MediaSizeType => {
  //lg = 1920, md = 1280, sm=800, xs = 400
  if (width >= 1920) return "lg";
  else if (width >= 1280) return "md";
  else if (width >= 800) return "sm";
  else return "xs";
};
