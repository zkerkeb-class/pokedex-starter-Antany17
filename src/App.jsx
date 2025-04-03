import Home from './assets/screens/home'
import { RouterProvider } from 'react-router'
import router from './config/router'

const App = () => {
  return (
   <RouterProvider router={router} />
  )
}

export default App