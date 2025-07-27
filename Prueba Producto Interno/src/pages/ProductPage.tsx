import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { getProduct, type Product } from "@/components/services/productData.ts"; 

export default function ProductPage() {

  // Llave del producto
  const productId = "125829257";

  // Usando useQuery para obtener el producto
  const { data: product } = useQuery< Product | undefined, Error >({
    queryKey: ["product", productId],
    queryFn: getProduct
  });

   if (!product) {
    return null; // Retorno nulo si no hay producto
  }
  /*
  
        {imagenesUrl.map((imgUrl, index) => (
          <img key={index} src={imgUrl} alt={`${altImagenes}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
        ))}
  
  */

  const {product_Id, product_titulo, marca, colecciones, referencia} = product;

  return (
    <div className="index-page">
      <section>
        <div>
             <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
  
      </div>
        </div>
        <div className="first_container_product_information">
          <div>
            <span>{product_Id}</span>
            <h2>{colecciones}</h2>
            <h1>{product_titulo}</h1>
            <h3>{marca}</h3>
            <p>{referencia}</p>
          </div>
        </div>
        <div className="second_container_product_information"></div>
      </section>
      {/* Add your content here */}
    </div>
  );
}
