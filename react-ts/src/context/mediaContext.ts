import { createContext } from "react";

//lg = 1920, md = 1280, sm=800, xs = 400
export type MediaSizeType = "lg" | "md" | "sm" | "xs" | null;

export const MediaContext = createContext<MediaSizeType>(null);
