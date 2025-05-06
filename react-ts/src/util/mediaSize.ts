import { MediaSizeType } from "../context/mediaContext";

export const MediaSize = (width: number): MediaSizeType => {
  //lg = 1920, md = 1280, sm=800, xs = 400
  console.log(width);
  if (width > 1920) return "lg";
  else if (width > 1280) return "md";
  else if (width > 800) return "sm";
  else return "xs";
};
