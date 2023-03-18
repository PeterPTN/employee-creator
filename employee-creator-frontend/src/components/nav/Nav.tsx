import { Link } from "react-router-dom"
import tw from "twin.macro"

const Navbar = tw.nav`
    flex
`

const Navlinks = tw.ul`
    flex
    gap-x-4
`

const Navlink = tw.li`
    rounded-sm
    bg-[#C92C6D]
    px-2
    py-1
    hover:brightness-90
    transition-all
`

const Nav = () => {
    return (
        <Navbar>
            <Navlinks>
                <Navlink><Link to="/">View</Link></Navlink>
                <Navlink><Link to="/">Manage</Link></Navlink>
            </Navlinks>
        </Navbar>
    )
}

export default Nav