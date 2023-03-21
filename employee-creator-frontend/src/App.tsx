import { QueryClient, QueryClientProvider } from 'react-query';
import { Outlet } from "react-router-dom"
import Footer from "./layouts/footer/Footer";
import Header from "./layouts/header/Header";

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ width: "1400px", margin: "auto" }}>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </QueryClientProvider>
  )
}

export default App
