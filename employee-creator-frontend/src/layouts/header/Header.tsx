import Nav from "../../components/nav/Nav"
import tw from "twin.macro"

const Bannerbar = tw.div`
    flex
    justify-between
    items-center
`

const UserAid = tw.ul`
    flex
    gap-x-4
`

const Neospective = tw.h1`
    text-[2rem] 
`

const Header = () => {
    return (
        <div className="flex flex-col gap-y-2 my-2">
            <Bannerbar>
                <Neospective>Neospective</Neospective>

                <UserAid>
                    <li className="cursor-pointer">
                        {/* Notification bell */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="rgb(245,245,245)" d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6V9c0-3.31-2.69-6-6-6s-6 2.69-6 6v7l-2 2v1h16v-1l-2-2zm-6 4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                        </svg>

                    </li>
                    <li><img src="" alt="User avatar" className="cursor-pointer" /></li>
                </UserAid>
            </Bannerbar>

            <div>
                {/* Consider use params */}
                <h2 className="leading-10 text-[1.5rem]">Employees</h2>
            </div>

            <Nav />
        </div>
    )
}

export default Header