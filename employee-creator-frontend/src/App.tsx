import { QueryClient, QueryClientProvider } from 'react-query';
import { Outlet } from "react-router-dom"
import RouteHighlighterProvider from './contexts/RouteHighlighterProvider';
import ModalProvider from './contexts/ModalProvider';
import Footer from "./layouts/footer/Footer";
import Header from "./layouts/header/Header";
import styles from "./App.module.scss"

export const queryClient = new QueryClient();

function App() {
  return (
    <RouteHighlighterProvider>
      <ModalProvider>
        <QueryClientProvider client={queryClient}>
          <div className={styles.App}>
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
