import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/RootLayout/RootLayout'
import Home from './pages/Home/Home'
import Shop from './pages/Shop/Shop'

function App() {
  const router = createBrowserRouter (
    createRoutesFromElements (
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
      </Route>
    )
  )
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App