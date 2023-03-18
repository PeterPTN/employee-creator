import { Outlet } from "react-router-dom"
import tw from 'twin.macro';
import Footer from "./layouts/footer/Footer";
import Header from "./layouts/header/Header";

const AppContainer = tw.div`
  flex
  flex-col
  w-[75rem]
  m-auto
`

function App() {
  return (
    <AppContainer>
      <Header />
      <Outlet />
      <Footer />
    </AppContainer>
  )
}

export default App
