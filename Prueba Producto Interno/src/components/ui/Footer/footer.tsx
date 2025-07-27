// src/components/Footer/Footer.jsx
import "./Footer.css";

export default function Footer() {

  return (
     <footer className="footer-container">
      <div className="footer-content">
        {/* Column 1 */}
        <div className="footer-column">
          <h4>Rastrea tu pedido</h4>
          <ul>
            <li><a href="/consulta-factura-electronica">Consulta tu factura electrónica</a></li>
            <li><a href="/politica-cambios-devoluciones">Política de cambios y devoluciones</a></li>
            <li><a href="/terminos-condiciones">Términos y condiciones</a></li>
            <li><a href="/condiciones-actividades-comerciales">Condiciones de actividades comerciales</a></li>
            <li><a href="/nuestras-politicas">Nuestras políticas</a></li>
            <li><a href="/linea-transparencia">Línea de transparencia</a></li>
            <li><a href="/contactanos">Contáctanos</a></li>
            <li><a href="/como-comprar">¿Cómo comprar?</a></li>
          </ul>
        </div>

        {/* Column 2 */}
        <div className="footer-column">
          <h4>Sobre nosotros</h4>
          <ul>
            <li><a href="/programa-fidelizacion">Programa de fidelización</a></li>
            <li><a href="/personal-shopper">Personal Shopper</a></li>
            <li><a href="/credito-leather-lovers">Crédito Leather Lovers</a></li>
            <li><a href="/leather-for-good">Leather For Good</a></li>
            <li><a href="/nuestras-tiendas">Nuestras tiendas</a></li>
            <li><a href="/sitemap">Sitemap</a></li>
            {/* The "Países" dropdown would be a more complex component if it's interactive. 
                For a static footer, it might just be text or a simple link. */}
            <li>Países <span className="dropdown-arrow">&#9660;</span></li> 
          </ul>
        </div>

        {/* Column 3 */}
        <div className="footer-column">
          <h4>Crece con nosotros</h4>
          <ul>
            <li><a href="/quieres-ser-distribuidor">¿Quieres ser distribuidor?</a></li>
            <li><a href="/ventas-institucionales">Ventas institucionales</a></li>
          </ul>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="social-media-links">
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">TikTok</a>
        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">Pinterest</a>
      </div>
    </footer>
  );
}
