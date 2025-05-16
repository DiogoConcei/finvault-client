// src/App.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import type { RouteObject } from "react-router-dom";

import Home from "./pages/home/home";
import Register from "./pages/register/register";

import "./styles/base.scss";

const routes: RouteObject[] = [
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/register",
    Component: Register,
  },
];

const router = createBrowserRouter(routes);

export default function App() {
  return <RouterProvider router={router} />;
}
