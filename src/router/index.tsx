import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "@/app/main";
import Error from "@/app/error/404.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
  },
]);

export const Routers = () => {
  return <RouterProvider router={router} />;
};
