import { QueryClient, QueryClientProvider } from 'react-query';
import { Outlet } from "react-router-dom"
import Footer from "./layouts/footer/Footer";
import Header from "./layouts/header/Header";
import styles from "./App.module.scss"

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.App}>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </QueryClientProvider>
  )
}

export default App
