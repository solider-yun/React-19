import { createContext } from "react";
import { initialSize, MediaSize } from "../hook/useResizeObserverHook";

//lg = 1920, md = 1280, sm=800, xs = 400
export type MediaSizeType = "lg" | "md" | "sm" | "xs" | null;

export const MediaContext = createContext<MediaSize>(initialSize);
