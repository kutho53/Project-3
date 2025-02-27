import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import Login from "./pages/login";
import ClientList from "./pages/clientList";
import ClientDetail from "./pages/clientDetail";
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Login/>} />
          <Route path='clientList' element={<ClientList/>} />
          <Route path='clientDetail' element={<ClientDetail/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

