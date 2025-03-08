import Main from "../components/Main";
import Header from "../components/Header";
import { useState } from "react";
import { userDataContext } from "../components/Context";

export default function Home() {
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
