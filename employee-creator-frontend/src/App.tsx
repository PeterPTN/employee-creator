import { QueryClient, QueryClientProvider } from 'react-query';
import { Outlet } from "react-router-dom"
import RouteHighlighterProvider from './contexts/RouteHighlighterProvider';
import ModalProvider from './contexts/ModalProvider';
import Footer from "./layouts/footer/Footer";
import Header from "./layouts/header/Header";

export const queryClient = new QueryClient();

function App() {
  return (
    <RouteHighlighterProvider>
      <ModalProvider>
        <QueryClientProvider client={queryClient}>
          <div style={{ width: "1400px", margin: "auto", position: "relative" }}>
            <Header />
            <Outlet />
            <Footer />
          </div>
        </QueryClientProvider>
      </ModalProvider>
    </RouteHighlighterProvider>
  )
}

export default App
