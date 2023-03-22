import { QueryClient, QueryClientProvider } from 'react-query';
import { Outlet } from "react-router-dom"
import ModalProvider from './contexts/ModalProvider';
import Footer from "./layouts/footer/Footer";
import Header from "./layouts/header/Header";

export const queryClient = new QueryClient();

function App() {
  return (
    <ModalProvider>
      <QueryClientProvider client={queryClient}>
        <div style={{ width: "1400px", margin: "auto" }}>
          <Header />
          <Outlet />
          <Footer />
        </div>
      </QueryClientProvider>
    </ModalProvider>
  )
}

export default App
