// src/components/Header/Header.jsx

import velezLogo from '@/assets/velez-logo-final.svg'
import { useState } from "react";

import "./Header.css"; // Importamos los estilos CSS



// Puedes reemplazar este SVG con tu propio logo
const Logo = () => (
    <object data={velezLogo} type="image/svg+xml" height="40" className="logo" />
);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="main-header">
      <nav className="navbar">
        {/* Menú Izquierdo (Categorías) */}
        <div className={`navbar-left ${isMenuOpen ? "active" : ""}`}>
          <ul>
            <li>
              <a href="/mujer">Mujer</a>
            </li>
            <li>
              <a href="/hombre">Hombre</a>
            </li>
            <li>
              <a className="strong_case" href="/rebajas">Rebajas</a>
            </li>
            <li>
              <a href="/mundo-velez">Mundo Vélez</a>
            </li>
            <li>
              <a className="strong_case" href="/fly-up">Fly Up</a>
            </li>
          </ul>
        </div>

        {/* Logo Central */}
        <div className="navbar-center">
          <a href="/" aria-label="Página de inicio" className='main-logo'>
            <Logo />
          </a>
        </div>

        {/* Menú Derecho (Iconos) */}
        <div className="navbar-right">
          <button className="icon-button" aria-label="Buscar">
            {/* Icono Lupa */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          <button className="icon-button" aria-label="Bolsa de compra">
            {/* Icono Bolsa */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </button>
          <button className="icon-button" aria-label="Perfil de usuario">
            {/* Icono Usuario */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
          <button
            className="icon-button"
            aria-label="Cambiar idioma a Colombia"
          >
            {/* Icono Bandera Colombia (simplificado) */}
            <svg width="24" height="24" viewBox="0 0 3 2">
              <rect width="3" height="1" fill="#FFD500" />
              <rect y="1" width="3" height="0.5" fill="#003893" />
              <rect y="1.5" width="3" height="0.5" fill="#CE1126" />
            </svg>
          </button>
        </div>

        {/* Botón de Menú Móvil (Hamburguesa) */}
        <button
          className="mobile-menu-toggle"
          onClick={toggleMenu}
          aria-label="Abrir menú"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </nav>
    </header>
  );
}
