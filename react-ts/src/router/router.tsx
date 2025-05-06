import { Route, Routes } from "react-router";
import Main from "../pages/Main";
import Game from "../pages/Game";

const Router = () => {
  return (
    <Routes>
      <Route index path="/" element={<Main />} />
      <Route path="game" element={<Game />} />
    </Routes>
  );
};

export default Router;
