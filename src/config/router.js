import {
    createBrowserRouter
} from "react-router"

import Home from "../assets/screens/home"
import Pokemon from "../assets/screens/pokemon"

const router = createBrowserRouter([
    {
        path: "/",
        Component: Home
    },
    {
        path: "/pokemon/:id",
        Component: Pokemon
    }
])

export default router;