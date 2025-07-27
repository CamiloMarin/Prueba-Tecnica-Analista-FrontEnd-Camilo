import { useLocation } from "react-router-dom";
import { useEffect } from "react";


export default function NotFound() {
    const location = useLocation();
    useEffect(() => {
        console.error(
        "404 Error: El usuario intentó acceder a una rota no existente:",
        location.pathname
        );
    }, [location.pathname]);


  return (
    <div className="parent_class_error_pr">
      <div className="error_pr text-center">
        <h1 className="error_pr_title">404</h1>
        <p className="error_pr_text_p">Oops! Página no encontrada</p>
        <a href="/" className="error_pr_anchor_p">
          Volver a inicio
        </a>
      </div>
    </div>
  );

}