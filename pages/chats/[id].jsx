import Main from "../../components/Main";
import Header from "../../components/Header";
import { useState } from "react";
import { userDataContext } from "../../components/Context";
import { useRouter } from 'next/router'

export default function Chats() {
    const router = useRouter()
    const { id } = router.query
    const [userHasLoggedIn, setUserHasLoggedIn] = useState(false);

    return (
        <>
            <userDataContext.Provider value={{userHasLoggedIn, setUserHasLoggedIn}}>
                <Header />
                <div id="root">
                    <Main />
                </div>
            </userDataContext.Provider>
        </>
    )
}
