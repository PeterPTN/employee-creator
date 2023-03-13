import { Outlet } from "react-router-dom"
import tw, { styled } from 'twin.macro';

const TextComponent = tw.h1`
  text-3xl 
  font-bold 
  underline
  text-purple-500
`

function App() {
  return (
    <>
      <div>
        <TextComponent>Hello World</TextComponent>

        <Outlet />

        <footer>
          <span>&copy; 2023 <a href="https://pptn-portfolio.netlify.app" target="_blank" rel="noopener noreferrer">Peter Nguyen</a></span>
        </footer>
      </div>
    </>
  )
}

export default App
