import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Routes from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import { CountryProvider } from "./context/CountryContext";

const Wrapper = () => {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <CountryProvider>
          <AuthProvider>
            <Routes />
            <ToastContainer />
          </AuthProvider>
        </CountryProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default Wrapper;
