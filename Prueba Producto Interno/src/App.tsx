import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastProvider } from './lib/toast-context';

import ProductPage from "./pages/ProductPage";
import NotFound from "./pages/NotFound";
import MainLayout from "./layout/layout";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
             <Route path="/" element={<MainLayout />}>
              <Route index element={<ProductPage />} />
              {/* Ruta para manejar páginas no encontradas recordar poner todo arriba de este path*/}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </QueryClientProvider>
  );
}
