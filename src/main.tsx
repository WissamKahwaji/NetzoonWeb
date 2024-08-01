import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import Wrapper from "./Wrapper";
import "./i18n";
const container = document.getElementById("root")!;
const root = createRoot(container);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
    },
  },
});

root.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <Wrapper />
    </React.StrictMode>
  </QueryClientProvider>
);
