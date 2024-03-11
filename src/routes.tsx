import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Detail from "./pages/detail";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

export { router };
