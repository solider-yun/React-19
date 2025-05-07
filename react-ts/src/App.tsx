import { BrowserRouter } from "react-router";
import Router from "./router/router";
import { useRef } from "react";
import { MediaContext } from "./context/mediaContext";
import { useResizeObserver } from "./hook/useHook";

function App() {
  const ref = useRef<HTMLDivElement>(null);
  const { type } = useResizeObserver<HTMLDivElement>({ ref });

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
