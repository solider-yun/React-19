import { BrowserRouter } from "react-router";
import Router from "./router/router";
import { useEffect, useState } from "react";
import { MediaContext, MediaSizeType } from "./context/mediaContext";
import { MediaSize } from "./util/mediaSize";
import _debounce from "./util/debounce";

function App() {
  const [media, setMedia] = useState<MediaSizeType>(null);

  return (
    <MediaContext.Provider value={media}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </MediaContext.Provider>
  );
}
export default App;
