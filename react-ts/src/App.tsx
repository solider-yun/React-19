import { BrowserRouter } from "react-router";
import Router from "./router/Router";
import { useRef } from "react";
import { MediaContext } from "./context/mediaContext";
import { useResizeObserver } from "./hook/useResizeObserverHook";

function App() {
  const ref = useRef<HTMLDivElement>(null);
  const { type } = useResizeObserver({ ref });

  return (
    <MediaContext.Provider value={type}>
      <div ref={ref}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </div>
    </MediaContext.Provider>
  );
}
export default App;
