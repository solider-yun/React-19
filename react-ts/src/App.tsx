import { BrowserRouter } from "react-router";
import Router from "./router/router";
import { useEffect, useRef, useState } from "react";
import { MediaContext } from "./context/mediaContext";

import _debounce from "./util/debounce";
import { useResizeObserver } from "./hook/useHook";

function App() {
  const ref = useRef<HTMLDivElement>(null);
  const [resizeObj, deviceWidth] = useResizeObserver();

  useEffect(() => {
    if (ref.current) {
      resizeObj.observe(ref.current);
    }
    return () => resizeObj.disconnect();
  }, [resizeObj, ref]);

  return (
    <MediaContext.Provider value={deviceWidth}>
      <div ref={ref}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </div>
    </MediaContext.Provider>
  );
}
export default App;
