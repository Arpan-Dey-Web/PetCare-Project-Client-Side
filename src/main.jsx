import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./components/Routes/Routes.jsx";
import { RouterProvider } from "react-router";
import AuthProvider from "./components/context/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Lenis from "lenis";

const queryClient = new QueryClient();

// Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
});

lenis.on("scroll", (e) => {});
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
