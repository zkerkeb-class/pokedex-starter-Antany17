import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './assets/screens/home'
import Pokemon from './assets/screens/pokemon'
import Login from './assets/screens/login'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/home',
        element: <Home />
    },
    {
        path: '/pokemon/:id',
        element: <Pokemon />
    }
])

const App = () => {
    return <RouterProvider router={router} />
}

export default App