import { Provider } from 'react-redux'
import { cartStore } from './store'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Restaurants from './pages/Restaurants'

import Footer from './container/Footer'

import EstiloGlobal from './styles'
import SideBar from './container/SideBar'

const Rotas = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/restaurantes/:id" element={<Restaurants />} />
  </Routes>
)

function App() {
  return (
    <Provider store={cartStore}>
      <BrowserRouter>
        <EstiloGlobal />
        <Rotas />
        <SideBar />
        <Footer />
      </BrowserRouter>
    </Provider>
  )
}

export default App
