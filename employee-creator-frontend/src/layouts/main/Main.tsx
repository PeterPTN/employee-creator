import React from 'react'
import tw from 'twin.macro'

const MainContainer = tw.main`
    rounded-sm
    border-solid
    border-white
    border-2
    px-2
    py-2
`

const Main = ({ children }: {children: any}) => {
    return (
        <MainContainer>
            {children}
        </MainContainer>
    )
}

export default Main