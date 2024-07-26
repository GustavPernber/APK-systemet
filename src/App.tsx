import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Body from "./components/Body";
import "./index.css";
import "preline";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Body />
    </QueryClientProvider>
  );
}

export default App;
