import { Outlet } from "react-router-dom"
import Footer from "./layouts/footer/Footer";
import Header from "./layouts/header/Header";


function App() {
  return (
    <div style={{width: "1400px", margin:"auto"}}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
