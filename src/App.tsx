import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Body from "./components/Body";
import "./index.css";
import "preline";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 60 * 1000, // One hour stale time
      refetchOnWindowFocus: false,
      networkMode: "always",
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Body />
    </QueryClientProvider>
  );
}

export default App;
