import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App"; // ajuste o caminho conforme sua estrutura // ajuste o caminho conforme sua estrutura
import type { JSX } from "react";
import Home from "../layout/home";
import EditBlocks from "../layout/EditBlocks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/review/:id",
        element: <EditBlocks />,
      },
    ],
  },
]);

function Root(): JSX.Element {
  return <RouterProvider router={router} />;
}

export default Root;
