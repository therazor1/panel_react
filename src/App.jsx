import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Clientes from './pages/Clientes'
import Inicio from './pages/Inicio'
import Login from './pages/Login'
import Panel from './pages/Panel'
import Usuarios from './pages/Usuarios'
import AuthLayout from './layout/AuthLayout'
import RutaProtegida from './layout/RutaProtegida'
import { UsersProvider } from './context/UsersProvider'
import { ClientsProvider } from './context/ClientProvider'
import { AuthProvider } from './context/AuthProvider'
import Cerrar from './pages/Cerrar'
import { TaskProvider } from './context/TaskProvider'
import { PanelProvider } from './context/PanelProvider'



const App = () => {


  return (
    <BrowserRouter>
      <AuthProvider>
        <UsersProvider>
          <ClientsProvider>
            <TaskProvider>
              <PanelProvider>
                <Routes>
                  <Route path="/login" element={<AuthLayout />}>
                    <Route index element={<Login />} />
                  </Route>

                  <Route path='/' element={<RutaProtegida />}>
                    <Route index element={<Inicio />} />
                    <Route path='/panel' element={<Panel />} />
                    <Route path='/clientes' element={<Clientes />} />
                    <Route path='/usuarios' element={<Usuarios />} />
                    <Route path='/cerrar' element={<Cerrar />} />
                  </Route>
                </Routes>
              </PanelProvider>
            </TaskProvider>
          </ClientsProvider>
        </UsersProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App