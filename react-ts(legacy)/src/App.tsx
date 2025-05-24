import { BrowserRouter } from "react-router";
import Router from "./router/Router";
import { useRef } from "react";
import { MediaContext } from "./context/mediaContext";
import { useResizeObserver } from "./hook/useResizeObserverHook";

function App() {
  const ref = useRef<HTMLDivElement>(null);
  const media = useResizeObserver({ ref });

  return (
    <MediaContext.Provider value={media}>
      <div ref={ref}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </div>
    </MediaContext.Provider>
  );
}
export default App;
